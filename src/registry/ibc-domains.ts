import {
  LookupResult,
  MatchaError,
  MatchaErrorType,
  NameService,
  Network,
  ResolutionResult
} from './name-service'

const rpcUrls = {
  mainnet: 'https://rpc.juno.giansalex.dev',
  testnet: 'https://rpc.testnet.juno.giansalex.dev'
}

export class IBCDomains extends NameService {
  serviceID = 'ibc-domains'
  chain = 'juno'
  contractAddress = {
    mainnet: 'juno1ce7wjfsuk79t2mdvpdjtv8280pcc64yh9mh62qptuvxe64twt4pqa68z2a',
    testnet: 'juno19al2ptpxz3xk6q8nl3eyvyslkz8g6nz25w48dfpaepwaxavq3mhqsjjqe5'
  }

  async resolve(name: string, network: Network): Promise<ResolutionResult> {
    const client = await this.getCosmWasmClient(rpcUrls.mainnet)

    const [username] = name.split('.')
    const res = await client?.queryContractSmart(
      this.contractAddress[network],
      {
        owner_of: {
          token_id: username
        }
      }
    )
    if (!res?.owner) {
      return {
        success: false,
        error: new MatchaError('', MatchaErrorType.NOT_FOUND)
      }
    }
    return {
      success: true,
      data: res.owner
    }
  }

  async lookup(address: string, network: Network): Promise<LookupResult> {
    throw new Error('Method not implemented.' + address)
  }
}
