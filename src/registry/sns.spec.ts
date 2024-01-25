import { describe, expect, it } from 'vitest'
import { SNS } from './sns'

describe('SNS', () => {
  const resolver = new SNS()

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it.concurrent(
    'should resolve injective1699472317873.sol',
    async () => {
      const result = await resolver.resolve(
        'injective1699472317873.sol',
        'testnet'
      )
      expect(result).toBe('inj1axwxmevzgvz5esrmzuyjmra3l9vvl7ury7qegq')
    },
    10000
  )

  it.concurrent(
    'should resolve injective1699472317873',
    async () => {
      const result = await resolver.resolve('injective1699472317873', 'testnet')
      expect(result).toBe('inj1axwxmevzgvz5esrmzuyjmra3l9vvl7ury7qegq')
    },
    10000
  )

  it.concurrent('should return injective1699472317873.sol', async () => {
    const result = await resolver.lookup(
      'inj1axwxmevzgvz5esrmzuyjmra3l9vvl7ury7qegq',
      'testnet'
    )
    expect(result).toBe('injective1699472317873.sol')
  })

  it.concurrent(
    'should resolve injective1703588265.sol',
    async () => {
      const result = await resolver.resolve('injective1703588265', 'mainnet')
      expect(result).toBe('inj1qeqxtntyndqg336d7uw4pp9dg3sf8yhwadzez2')
    },
    10000
  )

  it.concurrent(
    'should resolve injective1703588265.sol',
    async () => {
      const result = await resolver.resolve(
        'injective1703588265.sol',
        'mainnet'
      )
      expect(result).toBe('inj1qeqxtntyndqg336d7uw4pp9dg3sf8yhwadzez2')
    },
    10000
  )

  it.concurrent('should return injective1703588265.sol', async () => {
    const result = await resolver.lookup(
      'inj1qeqxtntyndqg336d7uw4pp9dg3sf8yhwadzez2',
      'mainnet'
    )
    expect(result).toBe('injective1703588265.sol')
  })
})
