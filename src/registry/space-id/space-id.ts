import {
  Addr,
  AllowedTopLevelDomains,
  MatchaError,
  MatchaErrorType,
  NameService,
  Network
} from '../name-service'
import { domainNode } from '../../utils/space-id-helper'
import { decode } from 'bech32'

type SupportedSpaceIdDomains = 'inj' | 'sei'

const chainRpcUrls: Record<SupportedSpaceIdDomains, Record<Network, string>> = {
  inj: {
    mainnet: 'https://tm.injective.network',
    testnet: 'https://testnet.tm.injective.dev'
  },
  sei: {
    mainnet: 'https://rpc.wallet.pacific-1.sei.io',
    testnet: 'https://sei-testnet-rpc.polkachu.com'
  }
}

export const serviceID = 'spaceIds'

export class SpaceIds extends NameService {
  serviceID = serviceID
  chain = ['injective', 'sei']
  contractAddress: Record<SupportedSpaceIdDomains, Record<Network, string>> = {
    inj: {
      mainnet: 'inj1x9m0hceug9qylcyrrtwqtytslv2jrph433thgu',
      testnet: 'inj1ppneyx6qfnye26k9mwnf3ngyelvqng67f5v948'
    },
    sei: {
      mainnet: 'sei1qujw7gxacyk08fpg0lsf377f727ldq8f9cmjlrxt6awdkag9ypjsdnkh98',
      testnet: 'sei1a59k7mc9hsvtaeu532etl2geqmqdyufjncjkg0h3lxsu5u2rpensanaxwf'
    }
  }

  async resolve(
    name: string,
    network: Network,
    options?: {
      allowedTopLevelDomains?: AllowedTopLevelDomains
    }
  ): Promise<string> {
    try {
      const [, prefix] = name.split('.')
      const rpcUrl =
        chainRpcUrls?.[prefix as SupportedSpaceIdDomains]?.[network]
      const contractAddress =
        this.contractAddress[prefix as SupportedSpaceIdDomains][network]
      if (rpcUrl && contractAddress) {
        const client = await this.getCosmWasmClient(rpcUrl)
        const res = await client?.queryContractSmart(contractAddress, {
          address: {
            node: domainNode(name)
          }
        })
        if (
          !res?.address ||
          options?.allowedTopLevelDomains?.spaceIds?.indexOf(prefix) === -1
        ) {
          throw new MatchaError('', MatchaErrorType.NOT_FOUND)
        }
        return res?.address
      } else {
        throw new MatchaError('', MatchaErrorType.NOT_FOUND)
      }
    } catch (e) {
      throw new MatchaError('', MatchaErrorType.NOT_FOUND)
    }
  }

  async lookup(address: string, network: Network): Promise<string> {
    const addr: Addr = {
      prefix: null,
      words: null
    }
    try {
      const { prefix, words } = decode(address)
      addr.prefix = prefix
      addr.words = words
    } catch (e) {
      throw new MatchaError('', MatchaErrorType.INVALID_ADDRESS)
    }
    try {
      const rpcUrl =
        chainRpcUrls?.[addr.prefix as SupportedSpaceIdDomains]?.[network]
      const contractAddress =
        this.contractAddress[addr.prefix as SupportedSpaceIdDomains][network]
      if (rpcUrl && contractAddress) {
        const client = await this.getCosmWasmClient(rpcUrl)
        const res = await client?.queryContractSmart(contractAddress, {
          name: {
            address: address.toLowerCase()
          }
        })

        if (!res?.name) {
          throw new MatchaError('', MatchaErrorType.NOT_FOUND)
        }
        const domain = res.name.endsWith(addr.prefix)
          ? res.name
          : res.name + addr.prefix
        return domain
      } else {
        throw new MatchaError('', MatchaErrorType.NOT_FOUND)
      }
    } catch (e) {
      throw new MatchaError('', MatchaErrorType.NOT_FOUND)
    }
  }
}
