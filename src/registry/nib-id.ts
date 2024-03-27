import {
    MatchaError,
    MatchaErrorType,
    NameService,
    Network
  } from './name-service'
  
  export const serviceID = 'nibId'
  
  const rpcUrls = {
    mainnet: 'https://rpc.nibiru.fi:443',
    testnet: 'https://rpc.testnet-2.nibiru.fi:443'
  }
  
  const trimTld = (x: string): string => {
    if (x.endsWith('.nibi')) {
      return x.slice(0, -5)
    }
    return x
  }
  
  export class NibId extends NameService {
    serviceID = serviceID
    chain = 'nibiru'
    contractAddress = {
      mainnet: 'nibi1q0e70vhrv063eah90mu97sazhywmeegptx642t5px7yfcrf0rrsq2dylen',
      testnet: ''
    }
  
    async resolve(name: string, network: Network): Promise<string> {
      const client = await this.getCosmWasmClient(rpcUrls[network])
      if (this.contractAddress[network] == '') {
        throw new MatchaError('', MatchaErrorType.NOT_FOUND);
      }
      try {
        const result = await client.queryContractSmart(
          this.contractAddress[network],
          {
            resolve_record: {
              name: trimTld(name)
            }
          }
        )
        if (result == "" || result == null) {
          throw new MatchaError('', MatchaErrorType.NOT_FOUND)
        }
        return result
      } catch (err) {
        throw new MatchaError('', MatchaErrorType.NOT_FOUND)
      }
    }
  
    async lookup(address: string, network: Network): Promise<string> {
      throw new MatchaError('', MatchaErrorType.UNAVAILABLE_METHOD);
    }
  }