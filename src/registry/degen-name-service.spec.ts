import { describe, expect, it } from 'vitest'
import { DegenNameService } from './degen-name-service'

describe('Degen Name Service', () => {
  const resolver = new DegenNameService()

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it.concurrent(
    'should resolve degens.pp',
    async () => {
      const result = await resolver.resolve('degens.pp', 'mainnet')
      expect(result).toBe('sei1yq82exxgmgvrdvq9a0pvzrvra5g3mvclhmagxv')
    },
    10000
  )
})
