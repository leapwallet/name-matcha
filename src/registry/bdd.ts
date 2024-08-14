import {
  Addr,
  MatchaError,
  MatchaErrorType,
  NameService,
  Network,
  RpcURLs
} from './name-service'
import { decode, encode } from 'bech32'

export const serviceID = 'bdd'

const rpcUrls = {
  mainnet: 'https://full-node.mainnet-1.coreum.dev:26657',
  testnet: 'https://full-node.testnet-1.coreum.dev:26657'
}

export class BDD extends NameService {
  serviceID = serviceID
  chain = 'coreum'
  contractAddress = {
    mainnet: 'core1z22n0xy004sxm5w9fms48exwpl3vwqxd890nt8ve0kwjj048tgqstlqf6f',
    testnet: 'testcore1uwe9yemth6gr58tm56sx3u37t0c5rhmk963fjt480y4nz3cfxers9fn2kh'
  }

  async resolve(name: string, network: Network): Promise<string> {
    const client = await this.getCosmWasmClient(rpcUrls[network])
    try {
      const result = await client.queryContractSmart(
        this.contractAddress[network],
        {
          resolve: {
            name
          }
        }
      )
      if (!result) {
        throw new MatchaError('', MatchaErrorType.NOT_FOUND)
      }
      return result
    } catch (err) {
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

    const prefix = network === 'mainnet' ? 'core' : 'testcore'
    const coreAddress = encode(prefix, addr.words)
    try {
      const res = await client?.queryContractSmart(
        this.contractAddress[network],
        {
          primary: {
            address: coreAddress
          }
        }
      )
      if (!res) {
        throw new MatchaError('', MatchaErrorType.NOT_FOUND)
      }
      return res
    } catch (e) {
      throw new MatchaError('', MatchaErrorType.NOT_FOUND)
    }
  }
}
