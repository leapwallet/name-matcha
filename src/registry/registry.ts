import { ICNS, serviceID as _icnsID } from './icns'
import { IBCDomains, serviceID as _ibcDomainsID } from './ibc-domains'
import { StargazeNames, serviceID as _stargazeNamesID } from './stargaze-names'
import { ArchIdNames, serviceID as _archId } from './arch-id'
import {
  SpaceIds,
  SupportedSpaceIdEcosystems,
  serviceID as _spaceId
} from './space-id/space-id'
import { SNS, serviceID as _sns } from './sns'
import { BDD, serviceID as _bdd } from './bdd'
import { NibId, serviceID as _nibId } from './nib-id'
import { DegeNS, serviceID as _degeNS } from './degens'
import { CelestialsId, serviceID as _celestialsId } from './celestials'
import {
  AllowedTopLevelDomains,
  MatchaError,
  MatchaErrorType,
  NameService,
  NameServiceLookupResult,
  NameServiceResolveResult,
  Network,
  RpcURLs
} from './name-service'
import { allowedTopLevelDomains as allowedTopLevelDomainData } from '../utils/domain'

export const services = {
  icns: _icnsID,
  ibcDomains: _ibcDomainsID,
  stargazeNames: _stargazeNamesID,
  archIds: _archId,
  spaceIds: _spaceId,
  sns: _sns,
  bdd: _bdd,
  nibId: _nibId,
  degeNS: _degeNS,
  celestialsId: _celestialsId
}

export const allowedTopLevelDomains = allowedTopLevelDomainData

export class Registry {
  private services: { [key: string]: NameService } = {}

  constructor(private network: Network) {
    this.network = network
    this.registerService(new ICNS())
    this.registerService(new IBCDomains())
    this.registerService(new StargazeNames())
    this.registerService(new ArchIdNames())
    this.registerService(new SpaceIds())
    this.registerService(new SNS())
    this.registerService(new BDD())
    this.registerService(new NibId())
    this.registerService(new DegeNS())
    this.registerService(new CelestialsId())
  }

  registerService(service: NameService) {
    if (this.services[service.serviceID]) {
      throw new MatchaError(
        'Service already registered',
        MatchaErrorType.DUPLICATE_SERVICE
      )
    }
    this.services[service.serviceID] = service
  }

  private getService(serviceID: string): NameService {
    const service = this.services[serviceID]
    if (!service) {
      throw new MatchaError(
        'Service not registered',
        MatchaErrorType.UNREGISTERED_SERVICE
      )
    }
    return service
  }

  listServices(): string[] {
    return Object.keys(this.services)
  }

  setNetwork(network: Network) {
    this.network = network
  }

  getNetwork(): Network {
    return this.network
  }

  async resolve(
    name: string,
    serviceID: string,
    options?: {
      allowedTopLevelDomains?: AllowedTopLevelDomains
      rpcUrls?: RpcURLs
      paymentIdEcosystem?: SupportedSpaceIdEcosystems
    }
  ): Promise<NameServiceResolveResult> {
    const service = this.getService(serviceID)
    return service.resolve(name, this.network, options)
  }

  async lookup(
    address: string,
    serviceID: string,
    options?: {
      rpcUrls?: RpcURLs
      chainId?: string
    }
  ): Promise<NameServiceLookupResult> {
    const service = this.getService(serviceID)
    return service.lookup(address, this.network, options)
  }

  async resolveAll(
    name: string,
    options?: {
      allowedTopLevelDomains?: AllowedTopLevelDomains
      rpcUrls?: {
        [key: string]: { [key in Network]: string }
      }
      paymentIdEcosystem?: SupportedSpaceIdEcosystems
    }
  ) {
    const record: Record<string, NameServiceResolveResult | null> = {}
    await Promise.all(
      Object.entries(this.services).map(async ([serviceID, service]) => {
        try {
          const result = await service.resolve(name, this.network, options)
          record[serviceID] = result
        } catch (e) {
          record[serviceID] = null
        }
      })
    )
    return record
  }

  async lookupAll(
    address: string,
    options?: {
      rpcUrls?: {
        [key: string]: { [key in Network]: string }
      }
      chainId?: string
    }
  ) {
    const record: Record<string, NameServiceLookupResult | null> = {}
    await Promise.all(
      Object.entries(this.services).map(async ([serviceID, service]) => {
        try {
          const result = await service.lookup(address, this.network, options)
          record[serviceID] = result
        } catch (e) {
          record[serviceID] = null
        }
      })
    )
    return record
  }
}
