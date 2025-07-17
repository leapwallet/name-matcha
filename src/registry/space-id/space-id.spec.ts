import { describe, expect, it } from 'vitest'
import { SpaceIds } from './space-id'
import { MatchaErrorType } from '../name-service'

describe('SpaceIds', () => {
  const resolver = new SpaceIds()

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  describe('Batch 1', () => {
    it('should resolve testtest.inj', async () => {
      const result = await resolver.resolve('testtest.inj', 'mainnet')
      expect(result).toBe('inj10zvhv2a2mam8w7lhy96zgg2v8d800xcs7hf2tf')
    }, 10000)

    it('should not resolve every.cocoa', async () => {
      try {
        await resolver.resolve('whatevery.cocoa', 'mainnet')
      } catch (e) {
        expect(e.type).toBe(MatchaErrorType.NOT_FOUND)
      }
    }, 10000)

    it('should not resolve whatevery.cocoa', async () => {
      try {
        await resolver.resolve('whatevery.cocoa', 'testnet')
      } catch (e) {
        expect(e.type).toBe(MatchaErrorType.NOT_FOUND)
      }
    }, 10000)

    it('should fail lookup name for cosmos1pkzmx7j90m9hxarmtu5j5ywxyetxl2q4wgxl59 with not found', async () => {
      try {
        await resolver.lookup(
          'cosmos1pkzmx7j90m9hxarmtu5j5ywxyetxl2q4wgxl59',
          'testnet'
        )
      } catch (e) {
        expect(e.type).toEqual(MatchaErrorType.NOT_FOUND)
      }
    }, 10000)
    it('should resolve 000.sei mainnet', async () => {
      const result = await resolver.resolve('000.sei', 'mainnet')
      expect(result).toBe('sei16888j0hlrtpk5gq58jf9enaqjkr0eyzf3knt79')
    }, 10000)
  })

  describe('Batch 2', () => {
    it('should not resolve 000.si mainnet', async () => {
      try {
        await resolver.resolve('000.si', 'mainnet')
      } catch (e) {
        expect(e.type).toBe(MatchaErrorType.NOT_FOUND)
      }
    }, 10000)

    it('should lookup name for allen.sei', async () => {
      const result = await resolver.resolve('allen.sei', 'mainnet')
      expect(result).toEqual('sei1tmew60aj394kdfff0t54lfaelu3p8j8lz93pmf')
    }, 10000)

    it('should lookup name for sei1tmew60aj394kdfff0t54lfaelu3p8j8lz93pmf', async () => {
      const result = await resolver.lookup(
        'sei1tmew60aj394kdfff0t54lfaelu3p8j8lz93pmf',
        'mainnet',
        { chainId: '902' }
      )
      expect(result).toEqual('allen.sei')
    }, 10000)

    it('should not lookup name for sei1tmew60aj34kdfff0t54lfaelu3p8j8lz93pmf', async () => {
      try {
        await resolver.lookup(
          'sei1tmew60aj34kdfff0t54lfaelu3p8j8lz93pmf',
          'mainnet',
          { chainId: '902' }
        )
      } catch (e) {
        expect(e.type).toBe(MatchaErrorType.NOT_FOUND)
      }
    }, 10000)
  })
})
