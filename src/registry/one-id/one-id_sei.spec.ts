import { describe, expect, it } from 'vitest'
import { OneIDSei } from './one-id_sei'
import { MatchaErrorType } from '../name-service'

describe('OneID', () => {
  const resolver = new OneIDSei()

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it.concurrent(
    'should resolve oneidtest.c98',
    async () => {
      const result = await resolver.resolve('oneidtest.c98', 'mainnet')
      expect(result).toBe('sei1p4qz9p6jq8cxmnhfxnp8dye2kaugp0wgk24c3v')
    },
    10000
  )

  it.concurrent(
    'should lookup wallet sei1p4qz9p6jq8cxmnhfxnp8dye2kaugp0wgk24c3v',
    async () => {
      const result = await resolver.lookup('sei1p4qz9p6jq8cxmnhfxnp8dye2kaugp0wgk24c3v', 'mainnet')
      expect(result).toBe('oneidtest.c98')
    },
    10000
  )

  it.concurrent(
    'should not resolve leapwallet.cosmos',
    async () => {
      try {
        await resolver.resolve('leapwallet.cosmos', 'mainnet')
      } catch (e) {
        expect(e.type).toBe(MatchaErrorType.NOT_FOUND)
      }
    },
    10000
  )

  it.concurrent(
    'should not resolve oneidtest.c98 on testnet',
    async () => {
      try {
        await resolver.resolve('oneidtest.c98', 'testnet')
      } catch (e) {
        expect(e.type).toBe(MatchaErrorType.NOT_FOUND)
      }
    },
    10000
  )

  it.concurrent(
    'should fail lookup name for inj1pkzmx7j90m9hxarmtu5j5ywxyetxl2q4wgxl59 with not found',
    async () => {
      try {
        await resolver.lookup(
          'inj1pkzmx7j90m9hxarmtu5j5ywxyetxl2q4wgxl59',
          'mainnet'
        )
      } catch (e) {
        expect(e.type).toEqual(MatchaErrorType.NOT_FOUND)
      }
    },
    10000
  )

  it.concurrent(
    'should not resolve leap_wallet.up with non-characters (ex: _ #)',
    async () => {
      try {
        await resolver.resolve(
          'leap_wallet.up',
          'mainnet'
        )
      } catch (e) {
        expect(e.type).toEqual(MatchaErrorType.NOT_FOUND)
      }
    },
    10000
  )

  it.concurrent(
    'should not resolve lw.up with shoten characters (ex: _ #)',
    async () => {
      try {
        await resolver.resolve(
          'lw.up',
          'mainnet'
        )
      } catch (e) {
        expect(e.type).toEqual(MatchaErrorType.NOT_FOUND)
      }
    },
    10000
  )
})
