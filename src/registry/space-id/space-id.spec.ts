import { describe, expect, it } from 'vitest'
import { SpaceIds } from './space-id'
import { MatchaErrorType } from '../name-service'

describe('SpaceIds', () => {
  const resolver = new SpaceIds()

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it.concurrent(
    'should resolve 999.inj',
    async () => {
      const result = await resolver.resolve('999.inj', 'testnet')
      expect(result).toBe('inj1h4rprmdmf9mx6rje7t3zwqsm9f4cf4gzv3ewnc')
    },
    10000
  )

  it.concurrent(
    'should resolve testtest.inj',
    async () => {
      const result = await resolver.resolve('testtest.inj', 'mainnet')
      expect(result).toBe('inj10zvhv2a2mam8w7lhy96zgg2v8d800xcs7hf2tf')
    },
    10000
  )

  it.concurrent(
    'should not resolve every.cocoa',
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
    'should not resolve whatevery.cocoa',
    async () => {
      try {
        await resolver.resolve('whatevery.cocoa', 'testnet')
      } catch (e) {
        expect(e.type).toBe(MatchaErrorType.NOT_FOUND)
      }
    },
    10000
  )

  it.concurrent(
    'should lookup name for inj1h4rprmdmf9mx6rje7t3zwqsm9f4cf4gzv3ewnc',
    async () => {
      const result = await resolver.lookup(
        'inj1h4rprmdmf9mx6rje7t3zwqsm9f4cf4gzv3ewnc',
        'testnet'
      )
      expect(result).toEqual('999.inj')
    },
    10000
  )

  it.concurrent(
    'should fail lookup name for cosmos1pkzmx7j90m9hxarmtu5j5ywxyetxl2q4wgxl59 with not found',
    async () => {
      try {
        await resolver.lookup(
          'cosmos1pkzmx7j90m9hxarmtu5j5ywxyetxl2q4wgxl59',
          'testnet'
        )
      } catch (e) {
        expect(e.type).toEqual(MatchaErrorType.NOT_FOUND)
      }
    },
    10000
  )

  it.concurrent(
    'should resolve 000.sei testnet',
    async () => {
      const result = await resolver.resolve('000.sei', 'testnet')
      expect(result).toBe('sei1qwzw8u4q859l8pjqvfh9a959u8a3kmvpfnzjpw')
    },
    10000
  )

  it.concurrent(
    'should resolve 000.sei mainnet',
    async () => {
      const result = await resolver.resolve('000.sei', 'mainnet')
      expect(result).toBe('sei16fg5g3h57kp58k7grnfql56zsa6evqvqlzpjz9')
    },
    10000
  )

  it.concurrent(
    'should not resolve 000.si mainnet',
    async () => {
      try {
        await resolver.resolve('000.si', 'mainnet')
      } catch (e) {
        expect(e.type).toBe(MatchaErrorType.NOT_FOUND)
      }
    },
    10000
  )

  it.concurrent(
    'should resolve sei1qwzw8u4q859l8pjqvfh9a959u8a3kmvpfnzjpw',
    async () => {
      const result = await resolver.lookup(
        'sei1qwzw8u4q859l8pjqvfh9a959u8a3kmvpfnzjpw',
        'testnet'
      )
      expect(result).toBe('000.sei')
    },
    10000
  )

  it.concurrent(
    'should lookup name for allen.sei',
    async () => {
      const result = await resolver.resolve('allen.sei', 'mainnet')
      expect(result).toEqual('sei1tmew60aj394kdfff0t54lfaelu3p8j8lz93pmf')
    },
    10000
  )

  it.concurrent(
    'should lookup name for sei1tmew60aj394kdfff0t54lfaelu3p8j8lz93pmf',
    async () => {
      const result = await resolver.lookup(
        'sei1tmew60aj394kdfff0t54lfaelu3p8j8lz93pmf',
        'mainnet'
      )
      expect(result).toEqual('allen.sei')
    },
    10000
  )

  it.concurrent(
    'should not lookup name for sei1tmew60aj34kdfff0t54lfaelu3p8j8lz93pmf',
    async () => {
      try {
        await resolver.lookup(
          'sei1tmew60aj34kdfff0t54lfaelu3p8j8lz93pmf',
          'mainnet'
        )
      } catch (e) {
        expect(e.type).toBe(MatchaErrorType.INVALID_ADDRESS)
      }
    },
    10000
  )
})
