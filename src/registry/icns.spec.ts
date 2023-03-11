import { describe, expect, it } from 'vitest'
import { ICNS } from './icns'

describe('ICNS', () => {
  const resolver = new ICNS()

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
