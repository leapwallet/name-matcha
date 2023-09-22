/**
 * This file contains helper functions that are used in Space ID .inj and .sei domain resolution and lookups
 * Reference: https://github.com/Space-ID/injective-sidjs/tree/main/src/utils
 */

import * as jsSha3 from 'js-sha3'
import { toUnicode } from 'idna-uts46-hx'

const { keccak_256: sha3 } = jsSha3

const normalize = (name: string) => {
  return name ? toUnicode(name, { useStd3ASCII: true }) : name
}

const decodeLabelhash = (hash: string) => {
  if (!(hash.startsWith('[') && hash.endsWith(']'))) {
    throw Error(
      'Expected encoded labelhash to start and end with square brackets'
    )
  }

  if (hash.length !== 66) {
    throw Error('Expected encoded labelhash to have a length of 66')
  }

  return `${hash.slice(1, -1)}`
}

const isEncodedLabelhash = (hash: string) => {
  return hash.startsWith('[') && hash.endsWith(']') && hash.length === 66
}

const namehash = (inputName: string) => {
  let node = ''
  for (let i = 0; i < 32; i++) {
    node += '00'
  }

  if (inputName) {
    const labels = inputName.split('.')

    for (let i = labels.length - 1; i >= 0; i--) {
      let labelSha
      if (isEncodedLabelhash(labels[i])) {
        labelSha = decodeLabelhash(labels[i])
      } else {
        const normalisedLabel = normalize(labels[i])
        labelSha = sha3(normalisedLabel)
      }
      node = sha3(Buffer.from(node + labelSha, 'hex'))
    }
  }
  return '0x' + node
}

export function domainNode(domain: string) {
  if (!domain) {
    return []
  }
  const hash = namehash(domain)
  return Array.from(Buffer.from(hash.slice(2), 'hex'))
}
