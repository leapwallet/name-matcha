import { decode, encode } from 'bech32'
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
  mainnet: 'https://rpc.cosmos.directory/juno',
  testnet: 'https://rpc.uni.kingnodes.com'
}

export const serviceID = 'ibcDomains'

export class IBCDomains extends NameService {
  serviceID = serviceID
  chain = 'juno'
  contractAddress = {
    mainnet: 'juno1ce7wjfsuk79t2mdvpdjtv8280pcc64yh9mh62qptuvxe64twt4pqa68z2a',
    testnet: 'juno19al2ptpxz3xk6q8nl3eyvyslkz8g6nz25w48dfpaepwaxavq3mhqsjjqe5'
  }

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

    const [username, prefix] = name.split('.')
    try {
      const res = await client?.queryContractSmart(
        this.contractAddress[network],
        {
          owner_of: {
            token_id: username
          }
        }
      )
      if (
        !res?.owner ||
        options?.allowedTopLevelDomains?.ibcDomains?.indexOf(prefix) === -1
      ) {
        throw new MatchaError('', MatchaErrorType.NOT_FOUND)
      }
      try {
        const { words } = decode(res.owner)
        return encode(prefix, words)
      } catch {
        throw new MatchaError('', MatchaErrorType.NOT_FOUND)
      }
    } catch (e) {
      throw new MatchaError('', MatchaErrorType.NOT_FOUND)
    }
  }

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
    const junoAddress = encode('juno', addr.words)
    try {
      const res = await client?.queryContractSmart(
        this.contractAddress[network],
        {
          primary_domain: {
            address: junoAddress
          }
        }
      )
      if (!res?.domain) {
        throw new MatchaError('', MatchaErrorType.NOT_FOUND)
      }
      return `${res.domain}.${addr.prefix}`
    } catch (e) {
      throw new MatchaError('', MatchaErrorType.NOT_FOUND)
    }
  }
}
