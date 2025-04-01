import { hexToDecimal } from '../utils'
import {
  AllowedTopLevelDomains,
  ChainAddressResult,
  MatchaError,
  MatchaErrorType,
  NameResult,
  NameService,
  Network,
  RpcURLs
} from './name-service'

const rpcUrls = {
  mainnet: 'https://api.celestials.id',
  testnet: 'https://api.stage.celestials.id'
}

export const serviceID = 'celestialsId'

interface Chain {
  name: string
  chain_id: string
}

interface ChainAddress {
  address: string | null
  status: 'NOT_VERIFIED' | 'VERIFIED'
}

interface CelestialsLookupResponse {
  addresses: (ChainAddress | null)[]
}

interface CelestialsReverseLookupResponse {
  celestial_ids: {
    celestial_id: string
    status: 'NOT_VERIFIED' | 'VERIFIED'
  }[][]
}

interface CelestialsResponse {
  chains: Chain[]
}

export class CelestialsId extends NameService {
  serviceID = serviceID
  chain = 'celestia-1'
  contractAddress = {
    mainnet: '',  
    testnet: ''  
  }

  private async getSupportedChains(
    network: Network,
    options?: {
      rpcUrls?: RpcURLs
    }
  ): Promise<Chain[]> {
    const baseUrl = options?.rpcUrls?.[serviceID]?.[network] ?? rpcUrls[network]
    
    try {
      const response = await fetch(`${baseUrl}/api/resolver/chains`)
      if (!response.ok) {
        throw new MatchaError('', MatchaErrorType.NOT_FOUND)
      }

      const res = await response.json() as CelestialsResponse
      return res.chains
    } catch (e) {
      throw new MatchaError('', MatchaErrorType.NOT_FOUND)
    }
  }

  async resolve(
    name: string,
    network: Network,
    options?: {
      allowedTopLevelDomains?: AllowedTopLevelDomains
      rpcUrls?: RpcURLs
    }
  ): Promise<ChainAddressResult[]> {
    const baseUrl = options?.rpcUrls?.[serviceID]?.[network] ?? rpcUrls[network]
    const [username, prefix] = name.split('.')

    if (prefix && options?.allowedTopLevelDomains?.celestialsId?.indexOf(prefix) === -1) {
      throw new MatchaError('', MatchaErrorType.NOT_FOUND)
    }

    try {
      const chains = await this.getSupportedChains(network, options)
      // Construct lookup request for all supported chains
      const celestialChains = chains.map(chain => ({
        celestials_id: username,
        chain_id: chain.chain_id
      }))

      const response = await fetch(`${baseUrl}/api/resolver/lookup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          celestial_chain: celestialChains
        })
      })

      if (!response.ok) {
        throw new MatchaError('', MatchaErrorType.NOT_FOUND)
      }

      const res = await response.json() as CelestialsLookupResponse
      
      if (!res?.addresses?.length) {
        throw new MatchaError('', MatchaErrorType.NOT_FOUND)
      }

      const resolveResult: ChainAddressResult[] = []
      chains.forEach((chain, index) => {
        const address = res.addresses[index]?.address
        if (address) {
          resolveResult.push({
            chain_id: hexToDecimal(chain.chain_id),
            address
          })
        }
      })

      if (resolveResult.length === 0) {
        throw new MatchaError('', MatchaErrorType.NOT_FOUND)
      }

      return resolveResult
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
  ): Promise<NameResult[]> {
    const baseUrl = options?.rpcUrls?.[serviceID]?.[network] ?? rpcUrls[network]

    try {
      const chains = await this.getSupportedChains(network, options)
      
      // Construct lookup request for all chains
      const chainAddresses = chains.map(chain => ({
        address,
        chain_id: chain.chain_id
      }))

      const response = await fetch(`${baseUrl}/api/resolver/reverse_lookup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          chain_addresses: chainAddresses
        })
      })

      if (!response.ok) {
        throw new MatchaError('', MatchaErrorType.NOT_FOUND)
      }

      const res = await response.json() as CelestialsReverseLookupResponse
      
      const lookupResult: NameResult[] = []
      res.celestial_ids.forEach((chainResults, index) => {
        const chain = chains[index]
        if (chainResults?.[0]?.celestial_id) {
          lookupResult.push({
            name: chainResults[0].celestial_id,
            chain_id: hexToDecimal(chain.chain_id)
          })
        }
      })

      if (lookupResult.length === 0) {
        throw new MatchaError('', MatchaErrorType.NOT_FOUND)
      }

      return lookupResult
    } catch (e) {
      throw new MatchaError('', MatchaErrorType.NOT_FOUND)
    }
  }
}
