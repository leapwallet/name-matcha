import { describe, expect, it } from 'vitest'
import {
  AllowedTopLevelDomains,
  MatchaError,
  MatchaErrorType,
  RpcURLs
} from './name-service'
import { CelestialsId } from './celestials'

describe('CelestialsId', () => {
  const resolver = new CelestialsId()

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it.concurrent(
    'should resolve celestiaa.i with multi-chain addresses',
    async () => {
      const result = await resolver.resolve('celestiaa.i', 'mainnet')
      expect(result).toEqual([
        {
          chain_id: '8453',
          address: '0xdf3b77dde35eb980a03915f2a36032dcb89f924c'
        },
        {
          chain_id: 'celestia',
          address: 'celestia1u0cltepg9wjkj0u49enu0fswgygze9va74lkwy'
        },
        {
          chain_id: '984122',
          address: '0x90cc5514f5eef8b8a683224a54991d90fb3f8c16'
        }
      ])
    },
    10000
  )

  it.concurrent(
    'should not resolve whatevery.cocoa',
    async () => {
      try {
        await resolver.resolve('whatevery.cocoa', 'testnet')
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
      expect(result).toEqual([
        {
          name: 'celestiaa.i',
          chain_id: 'celestia'
        }
      ])
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
    'should resolve with allowed top level domains',
    async () => {
      const allowedTopLevelDomains: AllowedTopLevelDomains = {
        celestialsId: ['i']
      }
      const result = await resolver.resolve('celestiaa.i', 'mainnet', {
        allowedTopLevelDomains: allowedTopLevelDomains
      })
      expect(result).toEqual([
        {
          chain_id: '8453',
          address: '0xdf3b77dde35eb980a03915f2a36032dcb89f924c'
        },
        {
          chain_id: 'celestia',
          address: 'celestia1u0cltepg9wjkj0u49enu0fswgygze9va74lkwy'
        },
        {
          chain_id: '984122',
          address: '0x90cc5514f5eef8b8a683224a54991d90fb3f8c16'
        }
      ])
    },
    10000
  )

  it.concurrent(
    'should not resolve with empty allowed top level domains',
    async () => {
      const allowedTopLevelDomains: AllowedTopLevelDomains = {
        celestialsId: []
      }
      try {
        await resolver.resolve('celestiaa.i', 'mainnet', {
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
        celestialsId: {
          testnet: 'https://api.stage.celestials.id',
          mainnet: 'https://api.celestials.id'
        }
      }
      const result = await resolver.resolve('celestiaa.i', 'mainnet', {
        rpcUrls
      })
      expect(result).toEqual([
        {
          chain_id: '8453',
          address: '0xdf3b77dde35eb980a03915f2a36032dcb89f924c'
        },
        {
          chain_id: 'celestia',
          address: 'celestia1u0cltepg9wjkj0u49enu0fswgygze9va74lkwy'
        },
        {
          chain_id: '984122',
          address: '0x90cc5514f5eef8b8a683224a54991d90fb3f8c16'
        }
      ])
    },
    10000
  )
}) 