import { describe, expect, it } from 'vitest'
import { MatchaErrorType } from './name-service'
import { StargazeNames } from './stargaze-names'

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
})
