import { describe, expect, it } from 'vitest'
import {
  AllowedTopLevelDomains,
  MatchaError,
  MatchaErrorType
} from './name-service'
import { StargazeNames } from './stargaze-names'
import { allowedTopLevelDomains } from './registry'

describe('StargazeNames', () => {
  const resolver = new StargazeNames()

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it.concurrent(
    'should resolve messi.cosmos',
    async () => {
      const result = await resolver.resolve('messi.cosmos', 'mainnet')
      expect(result).toBe('cosmos19vf5mfr40awvkefw69nl6p3mmlsnacmm28xyqh')
    },
    10000
  )

  it.concurrent(
    'should resolve messi.juno',
    async () => {
      const result = await resolver.resolve('messi.juno', 'mainnet')
      expect(result).toBe('juno19vf5mfr40awvkefw69nl6p3mmlsnacmmu49l8t')
    },
    10000
  )

  it.concurrent(
    'should resolve messi.osmo',
    async () => {
      const result = await resolver.resolve('messi.osmo', 'mainnet')
      expect(result).toBe('osmo19vf5mfr40awvkefw69nl6p3mmlsnacmmzu45k9')
    },
    10000
  )

  it.concurrent(
    'should resolve messi.stars',
    async () => {
      const result = await resolver.resolve('messi.stars', 'mainnet')
      expect(result).toBe('stars19vf5mfr40awvkefw69nl6p3mmlsnacmm7m3etx')
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
      expect(result).toEqual('messi.cosmos')
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
    'should resolve messi.stars',
    async () => {
      const acceptedTopLevelDomains: AllowedTopLevelDomains = {
        stargazeNames: [...(allowedTopLevelDomains.stargazeNames as string[])]
      }
      const result = await resolver.resolve(
        'messi.stars',
        'mainnet',
        acceptedTopLevelDomains
      )
      expect(result).toBe('stars19vf5mfr40awvkefw69nl6p3mmlsnacmm7m3etx')
    },
    10000
  )

  it.concurrent(
    'should not resolve whatevery.cocoa',
    async () => {
      try {
        const acceptedTopLevelDomains: AllowedTopLevelDomains = {
          stargazeNames: [...(allowedTopLevelDomains.stargazeNames as string[])]
        }
        await resolver.resolve(
          'whatevery.cocoa',
          'mainnet',
          acceptedTopLevelDomains
        )
      } catch (e) {
        expect(e.type).toBe(MatchaErrorType.NOT_FOUND)
      }
    },
    10000
  )
})
