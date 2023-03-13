import * as bech32 from 'bech32'
import {
  MatchaError,
  MatchaErrorType,
  NameService,
  Network
} from './name-service'

const rpcUrls = {
  mainnet: 'https://rpc.cosmos.directory/juno',
  testnet: 'https://rpc.uni.kingnodes.com'
}

export class IBCDomains extends NameService {
  serviceID = 'ibc-domains'
  chain = 'juno'
  contractAddress = {
    mainnet: 'juno1ce7wjfsuk79t2mdvpdjtv8280pcc64yh9mh62qptuvxe64twt4pqa68z2a',
    testnet: 'juno19al2ptpxz3xk6q8nl3eyvyslkz8g6nz25w48dfpaepwaxavq3mhqsjjqe5'
  }

  async resolve(name: string, network: Network): Promise<string> {
    const client = await this.getCosmWasmClient(rpcUrls.mainnet)

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
      if (!res?.owner) {
        throw new MatchaError('', MatchaErrorType.NOT_FOUND)
      }
      try {
        const { words } = bech32.decode(res.owner)
        return bech32.encode(prefix, words)
      } catch {
        throw new MatchaError('', MatchaErrorType.NOT_FOUND)
      }
    } catch (e) {
      throw new MatchaError('', MatchaErrorType.NOT_FOUND)
    }
  }

  async lookup(address: string, network: Network): Promise<string[]> {
    throw new Error('Method not implemented.' + address + network)
  }
}
