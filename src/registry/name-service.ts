import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate'

/**
 * Types of errors
 */
export enum MatchaErrorType {
  NETWORK = 'network',
  NOT_FOUND = 'not-found',
  UNREGISTERED_SERVICE = 'unregistered-service',
  DUPLICATE_SERVICE = 'duplicate-service',
  INVALID_ADDRESS = 'invalid-address',
  UNAVAILABLE_METHOD = 'invalid-address',
  INVALID_ECOSYSTEM = 'invalid-ecosystem',
}

/**
 * Custom error class
 */
export class MatchaError extends Error {
  public type: MatchaErrorType
  constructor(message: string, errorType: MatchaErrorType) {
    super(message)
    this.name = 'MatchaError'
    this.type = errorType
  }
}

export type Addr = {
  prefix: string | null
  words: number[] | null
}

export type Network = 'mainnet' | 'testnet'

export type AllowedTopLevelDomains = {
  icns?: string[]
  ibcDomains?: string[]
  archIds?: string[]
  stargazeNames?: string[]
  spaceIds?: string[]
  sns?: string[]
  bdd?: string[]
  nibId?: string[]
  degeNS?: string[]
  celestialsId?: string[]
}

export type rpcUrls = Record<Network, string>

export type RpcURLs = {
  icns?: rpcUrls
  ibcDomains?: rpcUrls
  archIds?: rpcUrls
  stargazeNames?: rpcUrls
  spaceIds?: rpcUrls
  sns?: rpcUrls,
  bdd?: rpcUrls
  nibId?: rpcUrls
  degeNS?: rpcUrls
  celestialsId?: rpcUrls
}

class CosmWasmClientHandler {
  private static clients: { [key: string]: CosmWasmClient } = {}

  static getClient = async (rpcUrl: string) => {
    let _client = this.clients[rpcUrl]
    if (_client === undefined) {
      _client = await CosmWasmClient.connect(rpcUrl)
      this.clients[rpcUrl] = _client
    }
    return _client
  }
}

/**
 * The result of resolving a name through a name service
 * An array of objects containing chain_id and address pairs or a single name string
 */
export interface ChainAddressResult {
  chain_id: string
  address: string
}
export type NameServiceResolveResult = string | ChainAddressResult[]

/**
 * The result of looking up an address through a name service
 * An array of objects containing name and chain_id pairs or a single name string
 */
export interface NameResult {
  name: string
  chain_id: string
}
export type NameServiceLookupResult = string | NameResult[]

/**
 * What a NameService class needs to implement
 */
export abstract class NameService {
  /**
   * The unique identifier of the name service
   */
  abstract serviceID: string
  /**
   * The chain on which the name service is deployed
   */
  abstract chain: string | string[]
  /**
   * The contract address of the name service
   */
  abstract contractAddress:
    | {
        [key in Network]: string
      }
    | Record<string, { [key in Network]: string }>
  /**
   * @param name Resolve this name into an address or an array of objects with chain_id and address
   */
  abstract resolve(
    name: string,
    network: Network,
    options?: {
      allowedTopLevelDomains?: AllowedTopLevelDomains
      rpcUrls?: RpcURLs
    }
  ): Promise<NameServiceResolveResult>
  /**
   * @param address Lookup this address and returns primary name
   */
  abstract lookup(
    address: string,
    network: Network,
    options?: {
      rpcUrls?: RpcURLs
      chainId?: string
    }
  ): Promise<NameServiceLookupResult>
  /**
   * @param network The network to use
   */
  getCosmWasmClient(rpcUrl: string): Promise<CosmWasmClient> {
    return CosmWasmClientHandler.getClient(rpcUrl)
  }
}
