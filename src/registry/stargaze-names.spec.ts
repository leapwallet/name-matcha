import { describe, expect, it } from 'vitest'
import { MatchaErrorType } from './name-service'
import { StargazeNames } from './stargaze-names'

describe('StargazeNames', () => {
  const resolver = new StargazeNames()

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
    'should resolve leapwallet.stars',
    async () => {
      const result = await resolver.resolve('leapwallet.stars', 'mainnet')
      expect(result).toBe('stars1f4d3q86j2u8xl5h8n0arcp2k6uaegqu999vtwk')
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
})
