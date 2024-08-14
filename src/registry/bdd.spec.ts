import { describe, expect, it } from 'vitest'
import { BDD } from './bdd'

describe('BDD', () => {
  const resolver = new BDD()

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it.concurrent(
    'should resolve thisisatest.core',
    async () => {
      const result = await resolver.resolve('thisisatest.core', 'testnet')
      expect(result).toBe('testcore1y7d6cacnu43fhjlclr67tz6n4wqqe8h8mwdgk9')
    },
    10000
  )

  it.concurrent(
    'should resolve bdd-registrar-test.core',
    async () => {
      const result = await resolver.resolve(
        'bdd-registrar-test.core',
        'testnet'
      )
      expect(result).toBe('testcore10g5cy007hcmzhh4ta9sne0trasfds59lfdtd2g')
    },
    10000
  )

  it.concurrent(
    'should return bdd-registrar-test.core',
    async () => {
      const result = await resolver.lookup(
        'testcore10g5cy007hcmzhh4ta9sne0trasfds59lfdtd2g',
        'testnet'
      )
      expect(result).toBe('bdd-registrar-test.core')
    },
    10000
  )

  it.concurrent(
    'should resolve 5534534g.core',
    async () => {
      const result = await resolver.resolve('5534534g.core', 'mainnet')
      expect(result).toBe('core108a6808s9srwz548x58z7cjt08eur54gjtsv92')
    },
    10000
  )

  it.concurrent(
    'should resolve bdd-registrar.core',
    async () => {
      const result = await resolver.resolve('bdd-registrar.core', 'mainnet')
      expect(result).toBe('core10g5cy007hcmzhh4ta9sne0trasfds59lless97')
    },
    10000
  )

  it.concurrent(
    'should return bdd-registrar.core',
    async () => {
      const result = await resolver.lookup(
        'core10g5cy007hcmzhh4ta9sne0trasfds59lless97',
        'mainnet'
      )
      expect(result).toBe('bdd-registrar.core')
    },
    10000
  )
})
