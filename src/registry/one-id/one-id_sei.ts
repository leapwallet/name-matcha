import { CHAIN_TYPE, OneID as OneIDSDK } from '@oneid-xyz/inspect';
import { decode } from 'bech32';
import {
  MatchaError,
  MatchaErrorType,
  NameService,
  Network
} from '../name-service';

const oneid = new OneIDSDK();

export const serviceID = 'oneIdSei'
export class OneIDSei extends NameService {
  serviceID = serviceID
  chain = CHAIN_TYPE.SEI_MAINNET
  contractAddress = {
      mainnet: '',
      testnet: '',
  }
  async resolve(
    name: string,
    network: Network,
  ): Promise<string> {
    await oneid.systemConfig.initConfig();
    try {
      if (network !== 'mainnet') {
        throw new MatchaError('', MatchaErrorType.NOT_FOUND)
      }

      const [, prefix] = name.split('.')
      if (!prefix) {
        throw new MatchaError('', MatchaErrorType.NOT_FOUND)
      }

      const [linkedWallet] = await oneid.getWalletsByID(name, this.chain);
      if (!linkedWallet.address) {
        throw new MatchaError('', MatchaErrorType.NOT_FOUND)
      }

      return linkedWallet.address;
    } catch (e) {
      throw new MatchaError('', MatchaErrorType.NOT_FOUND)
    }
  }

  async lookup(address: string, network: Network): Promise<string> {
    await oneid.systemConfig.initConfig();
      
    try {
      const { prefix } = decode(address)
      if (prefix !== 'sei') {
        throw new MatchaError('', MatchaErrorType.NOT_FOUND);  
      }

      if (network !== 'mainnet') {
        throw new MatchaError('', MatchaErrorType.NOT_FOUND)
      }
      
      const name = await oneid.getPrimaryName(address);
      if (!name) {
        throw new MatchaError('', MatchaErrorType.NOT_FOUND)
      }
      return name;
    } catch (e) {
      throw new MatchaError('', MatchaErrorType.NOT_FOUND)
    }
  }
}
