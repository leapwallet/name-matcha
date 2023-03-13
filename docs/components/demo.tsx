import React, { useState } from 'react'
import { MagnifyingGlass } from '@phosphor-icons/react'
import registry from '@leapwallet/name-matcha'

const NameResolutionDemo = () => {
  const [status, setStatus] = useState('idle')
  const [result, setResult] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = data.get('name')!.toString()
    registry
      .resolve(name, 'icns')
      .then((res) => {
        setStatus('success')
        setResult(res)
      })
      .catch((err) => {
        setStatus('error')
        console.error(err)
      })
  }

  return (
    <section className="w-1/3 mt-16 mx-auto">
      <form onSubmit={handleSubmit}>
        <h1 className="font-bold text-2xl">Name Resolution</h1>
        <div className="flex items-end justify-center mt-8">
          <div className="flex-grow">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-slate-200"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              autoComplete="off"
              placeholder="leapwallet.cosmos"
              className="mt-2 px-3 py-2 border shadow-sm caret-white bg-[#111111] text-white border-slate-400 placeholder-slate-400 outline-none block w-full rounded-md sm:text-sm focus:ring-1"
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-500 p-2 border border-indigo-500 rounded ml-2 outline-none focus:ring-1"
          >
            <MagnifyingGlass weight="bold" size={20} />
          </button>
        </div>
      </form>
      <div>
        {status === 'loading' ? (
          <div className="mt-4">
            <p className="text-sm text-slate-200">Loading...</p>
          </div>
        ) : null}
        {status === 'success' ? (
          <div className="mt-4">
            <p className="text-sm text-slate-200">Success!</p>
            <p className="text-sm text-slate-200">{result}</p>
          </div>
        ) : null}
      </div>
    </section>
  )
}

export const Demo = () => {
  return (
    <main
      className="w-full h-full flex justify-center"
      style={{
        background:
          'linear-gradient(90deg, #111111 21px, transparent 1%) center, linear-gradient(#111111 21px, transparent 1%) center, #a766ccc4',
        backgroundSize: '22px 22px'
      }}
    >
      <NameResolutionDemo />
    </main>
  )
}
