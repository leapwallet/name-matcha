import { decode } from 'bech32'
import {
  Addr,
  AllowedTopLevelDomains,
  MatchaError,
  MatchaErrorType,
  NameService,
  Network,
  RpcURLs
} from './name-service'

const rpcUrls = {
  mainnet: 'https://rpc.mainnet.archway.io',
  testnet: 'https://rpc.constantine.archway.tech'
}

export const serviceID = 'archIds'

export class ArchIdNames extends NameService {
  serviceID = serviceID
  chain = 'archway'
  contractAddress = {
    mainnet:
      'archway1275jwjpktae4y4y0cdq274a2m0jnpekhttnfuljm6n59wnpyd62qppqxq0',
    testnet:
      'archway1lr8rstt40s697hqpedv2nvt27f4cuccqwvly9gnvuszxmcevrlns60xw4r'
  }

  // reference: https://gist.github.com/drewstaylor/088af645dd36c013c02a2b4d05110479#file-archid-resolve-address-js

  async resolve(
    name: string,
    network: Network,
    options?: {
      allowedTopLevelDomains?: AllowedTopLevelDomains
      rpcUrls?: RpcURLs
    }
  ): Promise<string> {
    const client = await this.getCosmWasmClient(
      options?.rpcUrls?.[serviceID]?.[network] ?? rpcUrls[network]
    )

    const [, prefix] = name.split('.')
    try {
      const res = await client?.queryContractSmart(
        this.contractAddress[network],
        {
          resolve_record: {
            name: name
          }
        }
      )
      if (
        !res?.address ||
        options?.allowedTopLevelDomains?.archIds?.indexOf(prefix) === -1
      ) {
        throw new MatchaError('', MatchaErrorType.NOT_FOUND)
      }
      return res.address
    } catch (e) {
      throw new MatchaError('', MatchaErrorType.NOT_FOUND)
    }
  }

  // reference: https://gist.github.com/drewstaylor/088af645dd36c013c02a2b4d05110479#file-archid-check-domains-resolve-to-address-js

  async lookup(
    address: string,
    network: Network,
    options?: {
      rpcUrls?: RpcURLs
    }
  ): Promise<string> {
    const client = await this.getCosmWasmClient(
      options?.rpcUrls?.[serviceID]?.[network] ?? rpcUrls[network]
    )

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
      const res = await client?.queryContractSmart(
        this.contractAddress[network],
        {
          resolve_address: {
            address: address
          }
        }
      )
      if (!res?.names || !res?.names?.length) {
        throw new MatchaError('', MatchaErrorType.NOT_FOUND)
      }
      return res.names.join(', ')
    } catch (e) {
      throw new MatchaError('', MatchaErrorType.NOT_FOUND)
    }
  }
}
