import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate'
/**
 * Types of errors
 */
export enum MatchaErrorType {
  NETWORK = 'network',
  NOT_FOUND = 'not-found',
  UNREGISTERED_SERVICE = 'unregistered-service',
  DUPLICATE_SERVICE = 'duplicate-service',
  INVALID_ADDRESS = 'invalid-address'
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
   * @param name Resolve this name into an address
   */
  abstract resolve(
    name: string,
    network: Network,
    allowedTopLevelDomains?: AllowedTopLevelDomains
  ): Promise<string>
  /**
   * @param address Lookup this address and returns primary name
   */
  abstract lookup(address: string, network: Network): Promise<string>
  /**
   * @param network The network to use
   */
  getCosmWasmClient(rpcUrl: string): Promise<CosmWasmClient> {
    return CosmWasmClientHandler.getClient(rpcUrl)
  }
}
