import { describe, expect, it } from 'vitest'
import { MatchaError, MatchaErrorType } from './name-service'
import { ArchIdNames } from './arch-id'

describe('ArchIds', () => {
  const resolver = new ArchIdNames()

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it.concurrent(
    'should resolve leap.arch',
    async () => {
      const result = await resolver.resolve('leap.arch', 'mainnet')
      expect(result).toBe('archway19vf5mfr40awvkefw69nl6p3mmlsnacmmlv6q2q')
    },
    10000
  )

  it.concurrent(
    'should resolve archid.arch',
    async () => {
      const result = await resolver.resolve('archid.arch', 'mainnet')
      expect(result).toBe('archway1n7d4c52knwqqkw9j975ranknkp4fn3we0unrp6')
    },
    10000
  )

  it.concurrent(
    'should resolve nft.arch',
    async () => {
      const result = await resolver.resolve('nft.arch', 'mainnet')
      expect(result).toBe('archway1qf0kxkk60qrcj5qa7v7t439249qfkcd4a2rpja')
    },
    10000
  )

  it.concurrent(
    'should not resolve whatevery.cocoa',
    async () => {
      try {
        await resolver.resolve('whatevery.cocoa', 'mainnet')
      } catch (e) {
        expect(e.type).toBe(MatchaErrorType.NOT_FOUND)
      }
    },
    10000
  )

  it.concurrent(
    'should lookup name for archway19vf5mfr40awvkefw69nl6p3mmlsnacmmlv6q2q',
    async () => {
      const result = await resolver.lookup(
        'archway19vf5mfr40awvkefw69nl6p3mmlsnacmmlv6q2q',
        'mainnet'
      )
      expect(result).toEqual('leap.arch')
    },
    10000
  )

  it.concurrent(
    'should fail lookup name for archway1n7d4c52knknkp4fn3we0unrp6 with invalid address',
    async () => {
      try {
        await resolver.lookup('archway1n7d4c52knknkp4fn3we0unrp6', 'mainnet')
      } catch (e) {
        expect((e as MatchaError).type).toEqual(MatchaErrorType.INVALID_ADDRESS)
      }
    },
    10000
  )

  it.concurrent(
    'should fail lookup name for archway1qf0kxkk60qrcj5qa7v7t439249qfkcd4a2rpja with not found',
    async () => {
      try {
        await resolver.lookup(
          'archway1qf0kxkk60qrcj5qa7v7t439249qfkcd4a2rpja',
          'mainnet'
        )
      } catch (e) {
        expect((e as MatchaError).type).toEqual(MatchaErrorType.NOT_FOUND)
      }
    },
    10000
  )

  it.concurrent(
    'should fail resolve name for ${Math.random().toString(36).substring(2, 12)}.arch with not found',
    async () => {
      const randName = `${Math.random().toString(36).substring(2, 12)}.arch`
      try {
        await resolver.resolve(randName, 'mainnet')
      } catch (e) {
        expect((e as MatchaError).type).toEqual(MatchaErrorType.NOT_FOUND)
      }
    },
    10000
  )
})
