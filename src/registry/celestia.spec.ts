import { describe, expect, it } from 'vitest'
import {
  AllowedTopLevelDomains,
  MatchaError,
  MatchaErrorType,
  RpcURLs
} from './name-service'
import { CelestiaIds } from './celestia'

describe('CelestiaIds', () => {
  const resolver = new CelestiaIds()

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it.concurrent(
    'should resolve celestiaa',
    async () => {
      const result = await resolver.resolve('celestiaa.id', 'mainnet')
      expect(result).toBe('celestia1u0cltepg9wjkj0u49enu0fswgygze9va74lkwy')
    },
    10000
  )

  it.concurrent(
    'should not resolve nonexistent.id',
    async () => {
      try {
        await resolver.resolve('nonexistent.id', 'testnet')
      } catch (e) {
        expect(e.type).toBe(MatchaErrorType.NOT_FOUND)
      }
    },
    10000
  )

  it.concurrent(
    'should lookup name for celestia1u0cltepg9wjkj0u49enu0fswgygze9va74lkwy',
    async () => {
      const result = await resolver.lookup(
        'celestia1u0cltepg9wjkj0u49enu0fswgygze9va74lkwy',
        'mainnet'
      )
      expect(result).toBe('celestiaa.id')
    },
    10000
  )

  it.concurrent(
    'should fail lookup for invalid address',
    async () => {
      try {
        await resolver.lookup('invalid-address', 'testnet')
      } catch (e) {
        expect((e as MatchaError).type).toEqual(MatchaErrorType.NOT_FOUND)
      }
    },
    10000
  )

  it.concurrent(
    'should fail lookup for non-existent address',
    async () => {
      try {
        await resolver.lookup(
          '0x1234567890123456789012345678901234567890',
          'testnet'
        )
      } catch (e) {
        expect((e as MatchaError).type).toEqual(MatchaErrorType.NOT_FOUND)
      }
    },
    10000
  )

  it.concurrent(
    'should fail resolve for random name',
    async () => {
      const randName = `${Math.random().toString(36).substring(2, 12)}.id`
      try {
        await resolver.resolve(randName, 'testnet')
      } catch (e) {
        expect((e as MatchaError).type).toEqual(MatchaErrorType.NOT_FOUND)
      }
    },
    10000
  )

  it.concurrent(
    'should resolve with allowed top level domains',
    async () => {
      const allowedTopLevelDomains: AllowedTopLevelDomains = {
        celestiaIds: ['id']
      }
      const result = await resolver.resolve('celestiaa.id', 'mainnet', {
        allowedTopLevelDomains: allowedTopLevelDomains
      })
      expect(result).toBe('celestia1u0cltepg9wjkj0u49enu0fswgygze9va74lkwy')
    },
    10000
  )

  it.concurrent(
    'should not resolve with empty allowed top level domains',
    async () => {
      const allowedTopLevelDomains: AllowedTopLevelDomains = {
        celestiaIds: []
      }
      try {
        await resolver.resolve('celestiaa.id', 'mainnet', {
          allowedTopLevelDomains: allowedTopLevelDomains
        })
      } catch (e) {
        expect(e.type).toEqual(MatchaErrorType.NOT_FOUND)
      }
    },
    10000
  )

  it.concurrent(
    'should resolve with custom rpc url',
    async () => {
      const rpcUrls: RpcURLs = {
        celestiaIds: {
          testnet: 'https://api.stage.celestials.id',
          mainnet: 'https://api.celestials.id'
        }
      }
      const result = await resolver.resolve('celestiaa.id', 'mainnet', {
        rpcUrls
      })
      expect(result).toBe('celestia1u0cltepg9wjkj0u49enu0fswgygze9va74lkwy')
    },
    10000
  )
}) 