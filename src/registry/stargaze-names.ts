import {
  LookupResult,
  MatchaError,
  MatchaErrorType,
  NameService,
  Network,
  ResolutionResult
} from './name-service'

const rpcUrls = {
  mainnet: 'https://rpc.stargaze.cosmos.network',
  testnet: 'https://rpc.testnet.stargaze.cosmos.network'
}

export class StargazeNames extends NameService {
  serviceID = 'stargaze-names'
  chain = 'stargaze'
  contractAddress = {
    mainnet: 'stars1fx74nkqkw2748av8j7ew7r3xt9cgjqduwn8m0ur5lhe49uhlsasszc5fhr',
    testnet: 'stars1rp5ttjvd5g0vlpltrkyvq62tcrdz949gjtpah000ynh4n2laz52qarz2z8'
  }

  async resolve(name: string, network: Network): Promise<ResolutionResult> {
    const client = await this.getCosmWasmClient(rpcUrls[network])

    const [username] = name.split('.')
    const res = await client.queryContractSmart(this.contractAddress[network], {
      nft_info: {
        token_id: username
      }
    })
    if (!res?.token_uri) {
      return {
        success: false,
        error: new MatchaError('', MatchaErrorType.NOT_FOUND)
      }
    }
    return {
      success: true,
      data: res.token_uri
    }
  }

  async lookup(address: string, network: Network): Promise<LookupResult> {
    throw new Error('Method not implemented.' + address)
  }
}
