import { describe, expect, it } from 'vitest'
import { ICNS } from './icns'
import {
  AllowedTopLevelDomains,
  MatchaError,
  MatchaErrorType
} from './name-service'
import { allowedTopLevelDomains } from './registry'

describe('ICNS', () => {
  const resolver = new ICNS()

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it.concurrent(
    'should resolve leapwallet.cosmos',
    async () => {
      const result = await resolver.resolve('leap_cosmos.cosmos', 'mainnet')
      expect(result).toBe('cosmos19vf5mfr40awvkefw69nl6p3mmlsnacmm28xyqh')
    },
    10000
  )

  it.concurrent(
    'should resolve leap_cosmos.juno',
    async () => {
      const result = await resolver.resolve('leap_cosmos.juno', 'mainnet')
      expect(result).toBe('juno19vf5mfr40awvkefw69nl6p3mmlsnacmmu49l8t')
    },
    10000
  )

  it.concurrent(
    'should resolve leap_cosmos.osmo',
    async () => {
      const result = await resolver.resolve('leap_cosmos.osmo', 'mainnet')
      expect(result).toBe('osmo19vf5mfr40awvkefw69nl6p3mmlsnacmmzu45k9')
    },
    10000
  )

  it.concurrent(
    'should resolve leap_cosmos.evmos',
    async () => {
      const result = await resolver.resolve('leap_cosmos.evmos', 'mainnet')
      expect(result).toBe('evmos1f8h7ud4ftaurzedzgrnjqhlsrk2h0au783fm34')
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
      expect(result).toEqual('leap_cosmos.cosmos')
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
    'should resolve leap_cosmos.evmos',
    async () => {
      const acceptedTopLevelDomains: AllowedTopLevelDomains = {
        icns: [...(allowedTopLevelDomains.icns as string[])]
      }
      const result = await resolver.resolve('leap_cosmos.evmos', 'mainnet', {
        allowedTopLevelDomains: acceptedTopLevelDomains
      })
      expect(result).toBe('evmos1f8h7ud4ftaurzedzgrnjqhlsrk2h0au783fm34')
    },
    10000
  )

  it.concurrent(
    'should not resolve whatevery.cocoa',
    async () => {
      try {
        const acceptedTopLevelDomains: AllowedTopLevelDomains = {
          icns: [...(allowedTopLevelDomains.icns as string[])]
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
