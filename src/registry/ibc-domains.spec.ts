import { describe, expect, it } from 'vitest'
import { IBCDomains } from './ibc-domains'
import {
  AllowedTopLevelDomains,
  MatchaError,
  MatchaErrorType
} from './name-service'
import { allowedTopLevelDomains } from './registry'

describe('IBCDomains', () => {
  const resolver = new IBCDomains()

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it.concurrent(
    'should resolve leapwallet.cosmos',
    async () => {
      const result = await resolver.resolve('leapwallet.cosmos', 'mainnet')
      expect(result).toBe('cosmos19vf5mfr40awvkefw69nl6p3mmlsnacmm28xyqh')
    },
    10000
  )

  it.concurrent(
    'should resolve leapwallet.juno',
    async () => {
      const result = await resolver.resolve('leapwallet.juno', 'mainnet')
      expect(result).toBe('juno19vf5mfr40awvkefw69nl6p3mmlsnacmmu49l8t')
    },
    10000
  )

  it.concurrent(
    'should resolve leapwallet.osmo',
    async () => {
      const result = await resolver.resolve('leapwallet.osmo', 'mainnet')
      expect(result).toBe('osmo19vf5mfr40awvkefw69nl6p3mmlsnacmmzu45k9')
    },
    10000
  )

  it.concurrent(
    'should not resolve whatevery.cocoa',
    async () => {
      try {
        await resolver.resolve('whatevery.cocoa', 'mainnet')
      } catch (e) {
        expect(e.type).toBe(MatchaErrorType.NOT_FOUND)
      }
    },
    10000
  )

  it.concurrent(
    'should lookup name for cosmos19vf5mfr40awvkefw69nl6p3mmlsnacmm28xyqh',
    async () => {
      const result = await resolver.lookup(
        'cosmos19vf5mfr40awvkefw69nl6p3mmlsnacmm28xyqh',
        'mainnet'
      )
      expect(result).toEqual('leapwallet.cosmos')
    },
    10000
  )

  it.concurrent(
    'should fail lookup name for cosmosp3mmlsnacmm28xyqh with invalid address',
    async () => {
      try {
        await resolver.lookup('cosmosp3mmlsnacmm28xyqh', 'mainnet')
      } catch (e) {
        expect((e as MatchaError).type).toEqual(MatchaErrorType.INVALID_ADDRESS)
      }
    },
    10000
  )

  it.concurrent(
    'should fail lookup name for cosmos1pkzmx7j90m9hxarmtu5j5ywxyetxl2q4wgxl59 with not found',
    async () => {
      try {
        await resolver.lookup(
          'cosmos1pkzmx7j90m9hxarmtu5j5ywxyetxl2q4wgxl59',
          'mainnet'
        )
      } catch (e) {
        expect((e as MatchaError).type).toEqual(MatchaErrorType.NOT_FOUND)
      }
    },
    10000
  )

  it.concurrent(
    'should fail resolve name for ${Math.random().toString(36).substring(2, 12)}.cosmos with not found',
    async () => {
      const randName = `${Math.random().toString(36).substring(2, 12)}.cosmos`
      try {
        await resolver.resolve(randName, 'mainnet')
      } catch (e) {
        expect((e as MatchaError).type).toEqual(MatchaErrorType.NOT_FOUND)
      }
    },
    10000
  )

  it.concurrent(
    'should resolve leapwallet.osmo',
    async () => {
      const acceptedTopLevelDomains: AllowedTopLevelDomains = {
        ibcDomains: [...(allowedTopLevelDomains.ibcDomains as string[])]
      }
      const result = await resolver.resolve('leapwallet.osmo', 'mainnet', {
        allowedTopLevelDomains: acceptedTopLevelDomains
      })
      expect(result).toBe('osmo19vf5mfr40awvkefw69nl6p3mmlsnacmmzu45k9')
    },
    10000
  )

  it.concurrent(
    'should not resolve whatevery.cocoa',
    async () => {
      try {
        const acceptedTopLevelDomains: AllowedTopLevelDomains = {
          ibcDomains: [...(allowedTopLevelDomains.ibcDomains as string[])]
        }
        await resolver.resolve('whatevery.cocoa', 'mainnet', {
          allowedTopLevelDomains: acceptedTopLevelDomains
        })
      } catch (e) {
        expect(e.type).toBe(MatchaErrorType.NOT_FOUND)
      }
    },
    10000
  )
})
