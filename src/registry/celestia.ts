import {
  AllowedTopLevelDomains,
  MatchaError,
  MatchaErrorType,
  NameService,
  Network,
  RpcURLs
} from './name-service'

const rpcUrls = {
  mainnet: 'https://api.celestials.id',
  testnet: 'https://api.stage.celestials.id'
}

export const serviceID = 'celestiaIds'

export class CelestiaIds extends NameService {
  serviceID = serviceID
  chain = 'celestia-1'
  contractAddress = {
    mainnet: '',  
    testnet: ''  
  }

  async resolve(
    name: string,
    network: Network,
    options?: {
      allowedTopLevelDomains?: AllowedTopLevelDomains
      rpcUrls?: RpcURLs
    }
  ): Promise<string> {
    const baseUrl = options?.rpcUrls?.[serviceID]?.[network] ?? rpcUrls[network]
    const [username, prefix] = name.split('.')

    if (prefix && options?.allowedTopLevelDomains?.celestiaIds?.indexOf(prefix) === -1) {
      throw new MatchaError('', MatchaErrorType.NOT_FOUND)
    }

    try {
      const response = await fetch(`${baseUrl}/api/resolver/lookup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          celestial_chain: [{
            celestials_id: username,
            chain_id: this.chain
          }]
        })
      })

      if (!response.ok) {
        throw new MatchaError('', MatchaErrorType.NOT_FOUND)
      }

      const res = await response.json()
      
      if (!res?.addresses?.[0]?.address) {
        throw new MatchaError('', MatchaErrorType.NOT_FOUND)
      }

      return res.addresses[0].address
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
    const baseUrl = options?.rpcUrls?.[serviceID]?.[network] ?? rpcUrls[network]

    try {
      const response = await fetch(`${baseUrl}/api/resolver/reverse_lookup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          chain_addresses: [{
            address: address,
            chain_id: this.chain
          }]
        })
      })

      if (!response.ok) {
        throw new MatchaError('', MatchaErrorType.NOT_FOUND)
      }

      const res = await response.json()
      
      if (!res?.celestial_ids?.[0]?.[0]?.celestial_id) {
        throw new MatchaError('', MatchaErrorType.NOT_FOUND)
      }

      return res.celestial_ids[0][0].celestial_id
    } catch (e) {
      throw new MatchaError('', MatchaErrorType.NOT_FOUND)
    }
  }
}
