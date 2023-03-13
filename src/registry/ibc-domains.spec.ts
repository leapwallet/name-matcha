import { describe, expect, it } from 'vitest'
import { IBCDomains } from './ibc-domains'
import { MatchaErrorType } from './name-service'

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
})
