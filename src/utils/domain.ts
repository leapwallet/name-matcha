import { AllowedTopLevelDomains } from '../registry/name-service'

export const supportedTopLevelDomainListForAllChains = [
  'agoric',
  'akash',
  'arkh',
  'axelar',
  'band',
  'bcna',
  'bitsong',
  'bostrom',
  'cerberus',
  'certik',
  'cheqd',
  'chihuahua',
  'chronic',
  'comdex',
  'cosmos',
  'crc',
  'cre',
  'cro',
  'cudos',
  'darc',
  'decentr',
  'desmos',
  'dig',
  'echelon',
  'emoney',
  'evmos',
  'fetch',
  'firma',
  'galaxy',
  'genesis',
  'gravity',
  'iaa',
  'inj',
  'ixo',
  'juno',
  'kava',
  'ki',
  'like',
  'logos',
  'lum',
  'mantle',
  'mars',
  'meme',
  'micro',
  'mythos',
  'nomic',
  'octa',
  'odin',
  'orai',
  'osmo',
  'panacea',
  'pb',
  'persistence',
  'regen',
  'rizon',
  'secret',
  'sent',
  'sif',
  'somm',
  'star',
  'stars',
  'swth',
  'terra',
  'thor',
  'umee',
  'vdl',
  'kujira',
  'sei',
  'stride',
  'jkl',
  'tori',
  'omniflix',
  'canto',
  'pasg',
  'archway',
  'quasar',
  'neutron',
  'testcore',
  'core',
  'quick',
  'migaloo',
  'kyve',
  'onomy',
  'noble',
  'plq',
  'nolus',
  'c4e',
  'gitopia',
  'nibi',
  'maya',
  'empower',
  'dydx'
]

export const allowedTopLevelDomains: AllowedTopLevelDomains = {
  icns: supportedTopLevelDomainListForAllChains,
  ibcDomains: supportedTopLevelDomainListForAllChains,
  stargazeNames: supportedTopLevelDomainListForAllChains,
  archIds: ['arch'],
  spaceIds: ['inj', 'sei'],
  sns: ['sol'],
  nibId: ['nibi'],
  degeNS: ['pp', 'sei'],
  bdd: ['core'],
  celestialsId: ['i']
}
