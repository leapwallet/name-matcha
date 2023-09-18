import { describe, expect, it } from 'vitest'
import { SNS } from './sns'

describe('SNS', () => {
  const resolver = new SNS()

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it.concurrent(
    'should resolve injective.sol',
    async () => {
      const result = await resolver.resolve('injective.sol', 'testnet')
      expect(result).toBe('inj1axwxmevzgvz5esrmzuyjmra3l9vvl7ury7qegq')
    },
    10000
  )

  it.concurrent(
    'should resolve injective',
    async () => {
      const result = await resolver.resolve('injective', 'testnet')
      expect(result).toBe('inj1axwxmevzgvz5esrmzuyjmra3l9vvl7ury7qegq')
    },
    10000
  )

  it.concurrent('should return injective.sol', async () => {
    const result = await resolver.lookup(
      'inj1axwxmevzgvz5esrmzuyjmra3l9vvl7ury7qegq',
      'testnet'
    )
    expect(result).toBe('injective1693584960359.sol')
  })
})
