import { describe, expect, it } from 'vitest'
import { DegeNSDomains } from './degens-domains'

describe('DegeNS', () => {
  const resolver = new DegeNSDomains()

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it.concurrent(
    'should resolve dirty.pp',
    async () => {
      const result = await resolver.resolve('dirty.pp', 'mainnet')
      expect(result).toBe('sei1w0gv4w5fr84selne6tpgj9vhwyk0r4cm8l6825')
    },
    10000
  )
})
