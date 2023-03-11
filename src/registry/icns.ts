import {
  LookupResult,
  MatchaError,
  MatchaErrorType,
  NameService,
  Network,
  ResolutionResult
} from './name-service'

const rpcUrls = {
  mainnet: 'https://rpc-osmosis.keplr.app',
  testnet: 'https://rpc-osmosis-testnet.keplr.app'
}

export class ICNS extends NameService {
  serviceID = 'icns'
  chain = 'osmosis'
  contractAddress = {
    mainnet: 'osmo1xk0s8xgktn9x5vwcgtjdxqzadg88fgn33p8u9cnpdxwemvxscvast52cdd',
    testnet: 'osmo1q2qpencrnnlamwalxt6tac2ytl35z5jejn0v4frnp6jff7gwp37sjcnhu5'
  }

  async resolve(name: string, network: Network): Promise<ResolutionResult> {
    const client = await this.getCosmWasmClient(rpcUrls[network])

    const [username, bech32_prefix] = name.split('.')
    const res = await client?.queryContractSmart(
      this.contractAddress[network],
      {
        address: {
          name: username,
          bech32_prefix
        }
      }
    )
    if (!res?.address) {
      return {
        success: false,
        error: new MatchaError('', MatchaErrorType.NOT_FOUND)
      }
    }
    return {
      success: true,
      data: res.address
    }
  }

  async lookup(address: string, network: Network): Promise<LookupResult> {
    throw new Error('Method not implemented.' + address)
  }
}
