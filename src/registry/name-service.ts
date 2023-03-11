import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate'

/**
 * Types of errors
 */
export enum MatchaErrorType {
  NETWORK = 'network',
  NOT_FOUND = 'not-found',
  UNREGISTERED_SERVICE = 'unregistered-service',
  DUPLICATE_SERVICE = 'duplicate-service'
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

export type NSResult<T> =
  | { success: false; error: MatchaError }
  | { success: true; data: T }

export type ResolutionResult = NSResult<string>

export type LookupResult = NSResult<string[]>

export type Network = 'mainnet' | 'testnet'

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
  abstract chain: string
  /**
   * The contract address of the name service
   */
  abstract contractAddress: {
    [key in Network]: string
  }
  /**
   * @param name Resolve this name into an address
   */
  abstract resolve(name: string, network: Network): Promise<ResolutionResult>
  /**
   * @param address Lookup this address and return a list of all associated names
   */
  abstract lookup(address: string, network: Network): Promise<LookupResult>
  /**
   * @param network The network to use
   */
  getCosmWasmClient(rpcUrl: string): Promise<CosmWasmClient> {
    return CosmWasmClientHandler.getClient(rpcUrl)
  }
}
