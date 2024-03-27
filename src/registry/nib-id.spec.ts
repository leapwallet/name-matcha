import { describe, expect, it } from 'vitest'
import { NibId } from './nib-id'

describe('NibId', () => {
  const resolver = new NibId()

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it.concurrent(
    'should resolve zucky.nibi',
    async () => {
      const result = await resolver.resolve(
        'zucky.nibi',
        'mainnet'
      )
      expect(result).toBe('nibi1kmx4u9q4dcf36qpp0wgymfc3yzj3r4epnu4m6m')
    },
    10000
  )
})
