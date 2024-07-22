import {
  MatchaError,
  MatchaErrorType,
  NameService,
  Network
} from './name-service'

export const serviceID = 'degeNS'

const rpcUrls = {
  mainnet: 'https://rpc.sei-apis.com:443',
}

export class DegeNS extends NameService {
  serviceID = serviceID
  chain = 'sei'
  contractAddress = {
    mainnet: 'sei10nulnfpdhx2wf7lp9kqa8aez2yxuyxwjyfw9rzlrexd500nhal0sl7mtzm',
    testnet: ''
  }

  async resolve(name: string, network: Network): Promise<string> {
    if (network === 'testnet') {
      throw new MatchaError(`Resolve is unavailable for ${name} on ${network}`, MatchaErrorType.UNAVAILABLE_METHOD)
    }
    const client = await this.getCosmWasmClient(rpcUrls[network])
    if (this.contractAddress[network] == '') {
      throw new MatchaError('', MatchaErrorType.NOT_FOUND)
    }
    try {
      const result = await client.queryContractSmart(
        this.contractAddress[network],
        {
          extension: {
            msg: {
              resolves_to: {
                domain_name: name
              }
            }
          }
        }
      )
      if (result == '' || result == null) {
        throw new MatchaError('', MatchaErrorType.NOT_FOUND)
      }
      return result?.address
    } catch (err) {
      throw new MatchaError('', MatchaErrorType.NOT_FOUND)
    }
  }

  async lookup(address: string, network: Network): Promise<string> {
    if (network === 'testnet') {
      throw new MatchaError(`Lookup is unavailable for ${address} on ${network}`, MatchaErrorType.UNAVAILABLE_METHOD)
    }
    const client = await this.getCosmWasmClient(rpcUrls[network])
    if (this.contractAddress[network] == '') {
      throw new MatchaError('', MatchaErrorType.NOT_FOUND)
    }
    try {
      const result = await client.queryContractSmart(
        this.contractAddress[network],
        {
          extension: {
            msg: {
              primary_of: {
                owner: address
              }
            }
          }
        }
      )
      if (result == '' || result == null) {
        throw new MatchaError('', MatchaErrorType.NOT_FOUND)
      }
      return result?.domain_name
    } catch (err) {
      throw new MatchaError('', MatchaErrorType.NOT_FOUND)
    }
  }
}
