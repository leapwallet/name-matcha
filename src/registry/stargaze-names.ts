import * as bech32 from 'bech32'
import {
  MatchaError,
  MatchaErrorType,
  NameService,
  Network
} from './name-service'

const rpcUrls = {
  mainnet: 'https://rpc.cosmos.directory/stargaze',
  testnet: 'https://rpc.elgafar-1.stargaze-apis.com'
}

export class StargazeNames extends NameService {
  serviceID = 'stargaze-names'
  chain = 'stargaze'
  contractAddress = {
    mainnet: 'stars1fx74nkqkw2748av8j7ew7r3xt9cgjqduwn8m0ur5lhe49uhlsasszc5fhr',
    testnet: 'stars1rp5ttjvd5g0vlpltrkyvq62tcrdz949gjtpah000ynh4n2laz52qarz2z8'
  }

  async resolve(name: string, network: Network): Promise<string> {
    const client = await this.getCosmWasmClient(rpcUrls[network])
    const [username, prefix] = name.split('.')
    try {
      const res = await client.queryContractSmart(
        this.contractAddress[network],
        {
          nft_info: {
            token_id: username
          }
        }
      )
      if (!res?.token_uri) {
        throw new MatchaError('', MatchaErrorType.NOT_FOUND)
      }
      try {
        const { words } = bech32.decode(res.token_uri.trim())
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
