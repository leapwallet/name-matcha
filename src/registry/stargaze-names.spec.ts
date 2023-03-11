import { describe, expect, it } from 'vitest'
import { StargazeNames } from './stargaze-names'

describe('StargazeNames', () => {
  const resolver = new StargazeNames()

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
