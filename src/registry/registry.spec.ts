import { describe, expect, it } from 'vitest'
import { Registry, services } from './registry'

describe('registry', () => {
  const registry = new Registry('mainnet')

  it('should get network', () => {
    expect(registry.getNetwork()).toBe('mainnet')
  })

  it('should set network', () => {
    registry.setNetwork('testnet')
    expect(registry.getNetwork()).toBe('testnet')
    registry.setNetwork('mainnet')
    expect(registry.getNetwork()).toBe('mainnet')
  })

  it('should list services', () => {
    expect(
      registry
        .listServices()
        .reduce((acc, cur) => ({ ...acc, [cur]: true }), {})
    ).toEqual({
      [services.icns]: true,
      [services.ibcDomains]: true,
      [services.stargazeNames]: true
    })
  })

  it.concurrent(
    'should resolve messi.cosmos on stargaze-names',
    async () => {
      const res = await registry.resolve('messi.cosmos', 'stargaze-names')
      expect(res).toBe('cosmos19vf5mfr40awvkefw69nl6p3mmlsnacmm28xyqh')
    },
    10000
  )

  it.concurrent(
    'should resolve leap_cosmos.juno on icns',
    async () => {
      const res = await registry.resolve('leap_cosmos.juno', 'icns')
      expect(res).toBe('juno19vf5mfr40awvkefw69nl6p3mmlsnacmmu49l8t')
    },
    10000
  )

  it.concurrent(
    'should resolve leapwallet.osmo on ibc-domains',
    async () => {
      const res = await registry.resolve('leapwallet.osmo', 'ibc-domains')
      expect(res).toBe('osmo19vf5mfr40awvkefw69nl6p3mmlsnacmmzu45k9')
    },
    10000
  )

  it.concurrent(
    'should resolveAll for messi.cosmos',
    async () => {
      const res = await registry.resolveAll('messi.cosmos')
      expect(res).toHaveLength(3)
    },
    10000
  )
})
