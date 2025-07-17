import axios from 'axios'
import {
  AllowedTopLevelDomains,
  MatchaError,
  MatchaErrorType,
  NameService,
  Network
} from '../name-service'

const SPACEID_API = 'https://nameapi.space.id'

type SpaceIdDomainResponse = {
  address: string
  code: 0 | 1 | -1
  msg: string
}

type SpaceIdNameResponse = {
  data: {
    name: string
    chainID: number
  }
  code: 0 | 1 | -1
  msg: string
}

export type SupportedSpaceIdEcosystems = 'btc' | 'evm' | 'sol' | 'aptos' | 'sui'
export const serviceID = 'spaceIds'

export class SpaceIds extends NameService {
  serviceID = serviceID
  chain = ['injective', 'sei', 'ethereum', 'binance', 'solana', 'arbitrum', 'manta', 'lightlink', 'story']
  contractAddress = {}

  async resolve(
    name: string,
    _network: Network,
    options?: {
      allowedTopLevelDomains?: AllowedTopLevelDomains
      paymentIdEcosystem?: SupportedSpaceIdEcosystems
    }
  ): Promise<string> {
    try {
      const delimiter = name.includes('@') ? '@' : '.'
      const [, prefix] = name.split(delimiter)
      if (options?.paymentIdEcosystem && delimiter === '@') {
        const res = await axios.get<SpaceIdDomainResponse>(
          `${SPACEID_API}/getPaymentIdName/${name}/${options.paymentIdEcosystem}`
        )
        if (res.data.code === 0) {
          return res.data.address
        } else {
          throw new MatchaError('', MatchaErrorType.NOT_FOUND)
        }
      } else {
        if (options?.allowedTopLevelDomains?.spaceIds?.indexOf(prefix) === -1) {
          throw new MatchaError('', MatchaErrorType.NOT_FOUND)
        }
        const res = await axios.get<SpaceIdDomainResponse>(
          `${SPACEID_API}/getAddress?domain=${name}`
        )
        if (res.data.code === 0) {
          return res.data.address
        } else {
          throw new MatchaError('', MatchaErrorType.NOT_FOUND)
        }
      }
    } catch (e) {
      throw new MatchaError('', MatchaErrorType.NOT_FOUND)
    }
  }

  async lookup(
    address: string,
    _network: Network,
    options?: { chainId?: string }
  ): Promise<string> {
    try {
      if (!options?.chainId) {
        throw new MatchaError('', MatchaErrorType.NOT_FOUND)
      }
      const res = await axios.get<SpaceIdNameResponse>(
        `${SPACEID_API}/getName?chainid=${options.chainId}&address=${address}`
      )
      if (res.data.code === 0) {
        return res.data.data.name
      } else {
        throw new MatchaError('', MatchaErrorType.NOT_FOUND)
      }
    } catch (e) {
      throw new MatchaError('', MatchaErrorType.NOT_FOUND)
    }
  }
}
