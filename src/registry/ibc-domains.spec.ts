import { describe, expect, it } from 'vitest'
import { IBCDomains } from './ibc-domains'

describe('IBCDomains', () => {
  const resolver = new IBCDomains()

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
