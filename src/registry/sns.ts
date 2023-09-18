import {
  MatchaError,
  MatchaErrorType,
  NameService,
  Network
} from './name-service'
import { decode, fromWords } from 'bech32'

export const serviceID = 'sns'

const rpcUrls = {
  mainnet: 'TODO',
  testnet: 'https://k8s.testnet.tm.injective.network:443'
}

const trimTld = (x: string): string => {
  if (x.endsWith('.sol')) {
    return x.slice(0, -4)
  }
  return x
}

export class SNS extends NameService {
  serviceID = serviceID
  chain = 'injective'
  contractAddress = {
    mainnet: 'TODO',
    testnet: 'inj1q79ujqyh72p43mhr2ldaly3x6d50rzp3354at3'
  }

  async resolve(name: string, network: Network): Promise<string> {
    const client = await this.getCosmWasmClient(rpcUrls[network])
    try {
      const result = await client.queryContractSmart(
        this.contractAddress[network],
        {
          resolve: {
            domain_name: trimTld(name)
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

  async lookup(address: string, network: Network): Promise<string> {
    const client = await this.getCosmWasmClient(rpcUrls[network])
    try {
      const decoded = decode(address)
      const bytes = fromWords(decoded.words)
      const addressBytes = [...new Array(12).fill(0), ...bytes]

      const result = await client.queryContractSmart(
        this.contractAddress[network],
        {
          get_domains_for_owner: {
            owner_chain: 19,
            owner_address: addressBytes,
            max_len: 1,
            domain_offset: undefined
          }
        }
      )

      if (!result) {
        throw new MatchaError('', MatchaErrorType.NOT_FOUND)
      }
      return result.domains.pop() + '.sol'
    } catch (err) {
      throw new MatchaError('', MatchaErrorType.NOT_FOUND)
    }
  }
}
