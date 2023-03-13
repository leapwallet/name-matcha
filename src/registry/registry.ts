import { ICNS, serviceID as _icnsID } from './icns'
import { IBCDomains, serviceID as _ibcDomainsID } from './ibc-domains'
import { StargazeNames, serviceID as _stargazeNamesID } from './stargaze-names'
import {
  MatchaError,
  MatchaErrorType,
  NameService,
  Network
} from './name-service'

export const services = {
  icns: _icnsID,
  ibcDomains: _ibcDomainsID,
  stargazeNames: _stargazeNamesID
}

export class Registry {
  private services: { [key: string]: NameService } = {}

  constructor(private network: Network) {
    this.network = network
    this.registerService(new ICNS())
    this.registerService(new IBCDomains())
    this.registerService(new StargazeNames())
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

  async resolve(name: string, serviceID: string): Promise<string> {
    const service = this.getService(serviceID)
    return service.resolve(name, this.network)
  }

  async lookup(address: string, serviceID: string): Promise<string> {
    const service = this.getService(serviceID)
    return service.lookup(address, this.network)
  }

  async resolveAll(name: string) {
    return Promise.allSettled(
      Object.entries(this.services).map(async ([serviceID, service]) => {
        const result = await service.resolve(name, this.network)
        return { address: result, serviceID }
      })
    )
  }

  async lookupAll(address: string) {
    return Promise.allSettled(
      Object.entries(this.services).map(async ([serviceID, service]) => {
        const result = await service.lookup(address, this.network)
        return { address: result, serviceID }
      })
    )
  }
}
