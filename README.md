# name-matcha

**Name Matcha** (*Matcha* - 抹茶; Meaning - 'ground and powdered green tea'; Emoji - 🍵) - a pun on **name-matcher** - is a javascript library for resolving names to wallet addresses in the cosmos universe.

## Motivation

There are many ways to identify a wallet address in the cosmos universe. The most common way is to use the bech32 address format. However, this format is not very user-friendly. It is also not very easy to remember. This is why we need a way to identify a wallet address by a human-readable name.

For this purpose, the community has come up with quite a few name-services, a few popular ones are:
1. [ICNS](https://www.icns.xyz)
2. [Stargaze Names](https://www.stargaze.zone/names)
3. [IBC Domains](https://ibc.domains)

These services allow users to register a name for their wallet address. However, there is no standard way to resolve these names to wallet addresses. This is where *Name Matcha* comes in. It is a javascript library that allows you to resolve names to wallet addresses in a standard way.

Just a single line of code is all you need to resolve a name to a wallet address.

## Installation

```bash
npm install @leapwallet/name-matcha
```

## Usage

Here's how you can quickly get started with resolving names -

```js
import { resolve } from '@leapwallet/name-matcha';

const address = await resolve('alice.stargaze');
```