import {
  MatchaError,
  MatchaErrorType,
  NameService,
  Network
} from './name-service'

const rpcUrls = {
  mainnet: 'https://rpc.cosmos.directory/osmosis',
  testnet: 'https://rpc-test.osmosis.zone'
}

export class ICNS extends NameService {
  serviceID = 'icns'
  chain = 'osmosis'
  contractAddress = {
    mainnet: 'osmo1xk0s8xgktn9x5vwcgtjdxqzadg88fgn33p8u9cnpdxwemvxscvast52cdd',
    testnet: 'osmo1q2qpencrnnlamwalxt6tac2ytl35z5jejn0v4frnp6jff7gwp37sjcnhu5'
  }

  async resolve(name: string, network: Network): Promise<string> {
    const client = await this.getCosmWasmClient(rpcUrls[network])

    const [username, prefix] = name.split('.')
    try {
      const res = await client?.queryContractSmart(
        this.contractAddress[network],
        {
          address: {
            name: username,
            bech32_prefix: prefix
          }
        }
      )
      if (!res?.address) {
        throw new MatchaError('', MatchaErrorType.NOT_FOUND)
      }
      return res.address
    } catch (e) {
      throw new MatchaError('', MatchaErrorType.NOT_FOUND)
    }
  }

  async lookup(address: string, network: Network): Promise<string[]> {
    throw new Error('Method not implemented.' + address + network)
  }
}
