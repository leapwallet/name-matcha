import {
  Registry,
  NameService,
  MatchaError,
  MatchaErrorType,
  services,
  allowedTopLevelDomains,
  AllowedTopLevelDomains,
  Network,
  RpcURLs,
  NameServiceResolveResult,
  NameServiceLookupResult
} from './registry'

/**
 * Instance of registry class
 *
 * It has all required methods - resolve, lookup, resolveAll, lookupAll
 *
 * For advanced users: you can register your own name service via registerService method. It
 * accepts NameService (abstract) class instance as an argument.
 */
const registry = new Registry('mainnet')

export type {
  Registry,
  NameService,
  MatchaError,
  MatchaErrorType,
  AllowedTopLevelDomains,
  Network,
  RpcURLs,
  NameServiceResolveResult,
  NameServiceLookupResult
}

export { services, allowedTopLevelDomains, registry }
