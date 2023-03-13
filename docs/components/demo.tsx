import React, { useCallback, useState } from 'react'
import {
  Check,
  ClipboardText,
  MagnifyingGlass,
  SpinnerGap
} from '@phosphor-icons/react'
import { default as registry, services } from '@leapwallet/name-matcha'

const CopyToClipboardButton: React.FC<{ text: string }> = ({ text }) => {
  const [clicked, setClicked] = useState(false)

  return (
    <button
      type="button"
      className="outline-none focus:ring-1 cursor-pointer"
      onClick={() => {
        setClicked(true)
        navigator.clipboard.writeText(text)
        setTimeout(() => {
          setClicked(false)
        }, 1000)
      }}
      disabled={clicked}
    >
      {clicked ? (
        <Check weight="bold" size={18} />
      ) : (
        <ClipboardText size={18} weight="bold" />
      )}
    </button>
  )
}

const ResolutionDemo = () => {
  const [status, setStatus] = useState('idle')
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [nameService, setNameService] = useState<string>(services.icns)

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const data = new FormData(e.currentTarget)
      const name = data.get('name')!.toString()
      setStatus('loading')
      registry
        .resolve(name, nameService)
        .then((res) => {
          setStatus('success')
          setError(null)
          setResult(res)
        })
        .catch((err) => {
          setStatus('error')
          setError(err.type)
        })
    },
    [nameService]
  )

  return (
    <section className="w-full sm:w-4/5 md:w-1/3 mt-4 sm:mt-16 mx-auto">
      <form onSubmit={handleSubmit}>
        <h1 className="font-bold text-2xl">Name Resolution</h1>
        <div className="mt-8">
          <label
            htmlFor="name-service"
            className="block text-sm font-medium text-slate-200"
          >
            Name Service
          </label>
          <select
            id="name-service"
            name="name-service"
            className="mt-2 px-3 py-2 border shadow-sm caret-white bg-[#111111] text-white border-slate-400 placeholder-slate-400 outline-none block w-full rounded-md sm:text-sm focus:ring-1"
            onChange={(e) => {
              setNameService(e.target.value)
            }}
          >
            <option value={services.icns}>ICNS</option>
            <option value={services.ibcDomains}>IBC Domains</option>
            <option value={services.stargazeNames}>Stargaze Names</option>
          </select>
        </div>
        <div className="flex items-end justify-center mt-4">
          <div className="flex-grow">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-slate-200"
            >
              Resolve
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
      {status === 'idle' ? null : (
        <div className="w-full min-h-[5rem] mt-8">
          {status === 'loading' ? (
            <div className="flex items-center justify-center">
              <SpinnerGap className="animate-spin" size={24} weight="bold" />
            </div>
          ) : null}
          {status === 'success' && result !== null ? (
            <div className="text-sm text-slate-200">
              <div className="flex items-center justify-between">
                <p>Result</p>
                <CopyToClipboardButton text={result} />
              </div>
              <p className="mt-2 p-2 bg-slate-700 rounded-lg font-mono text-sm">
                {result}
              </p>
            </div>
          ) : null}
          {status === 'error' ? (
            <p className="text-red-400 text-sm -mt-4">
              <strong>Error:</strong> <code>{error}</code>
            </p>
          ) : null}
        </div>
      )}
    </section>
  )
}

const LookupDemo = () => {
  const [status, setStatus] = useState('idle')
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [nameService, setNameService] = useState<string>(services.icns)

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const data = new FormData(e.currentTarget)
      const address = data.get('address')!.toString()
      setStatus('loading')
      registry
        .lookup(address, nameService)
        .then((res) => {
          setStatus('success')
          setError(null)
          setResult(res)
        })
        .catch((err) => {
          setStatus('error')
          setError(err.type)
        })
    },
    [nameService]
  )

  return (
    <section className="w-full sm:w-4/5 md:w-1/3 mt-4 sm:mt-16 mx-auto">
      <form onSubmit={handleSubmit}>
        <h1 className="font-bold text-2xl">Name Lookup</h1>
        <div className="mt-8">
          <label
            htmlFor="name-service"
            className="block text-sm font-medium text-slate-200"
          >
            Name Service
          </label>
          <select
            id="name-service"
            name="name-service"
            className="mt-2 px-3 py-2 border shadow-sm caret-white bg-[#111111] text-white border-slate-400 placeholder-slate-400 outline-none block w-full rounded-md sm:text-sm focus:ring-1"
            onChange={(e) => {
              setNameService(e.target.value)
            }}
          >
            <option value={services.icns}>ICNS</option>
            <option value={services.ibcDomains}>IBC Domains</option>
            <option value={services.stargazeNames}>Stargaze Names</option>
          </select>
        </div>
        <div className="flex items-end justify-center mt-4">
          <div className="flex-grow">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-slate-200"
            >
              Lookup
            </label>
            <input
              id="address"
              type="text"
              name="address"
              autoComplete="off"
              placeholder="osmo19vf5mfr40awvkefw69nl6p3mmlsnacmmzu45k9"
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
      {status === 'idle' ? null : (
        <div className="w-full min-h-[5rem] mt-8">
          {status === 'loading' ? (
            <div className="flex items-center justify-center">
              <SpinnerGap className="animate-spin" size={24} weight="bold" />
            </div>
          ) : null}
          {status === 'success' && result !== null ? (
            <div className="text-sm text-slate-200">
              <div className="flex items-center justify-between">
                <p>Result</p>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(result)
                  }}
                >
                  <CopyToClipboardButton text={result} />
                </button>
              </div>
              <p className="mt-2 p-2 bg-slate-700 rounded-lg font-mono text-sm">
                {result}
              </p>
            </div>
          ) : null}
          {status === 'error' ? (
            <p className="text-red-400 text-sm -mt-4">
              <strong>Error:</strong> <code>{error}</code>
            </p>
          ) : null}
        </div>
      )}
    </section>
  )
}

export const Demo = () => {
  return (
    <main
      className="w-full h-full flex flex-col py-8 sm:flex-row justify-start sm:justify-center gap-4"
      style={{
        background:
          'linear-gradient(90deg, #111111 21px, transparent 1%) center, linear-gradient(#111111 21px, transparent 1%) center, #a766ccc4',
        backgroundSize: '22px 22px'
      }}
    >
      <ResolutionDemo />
      <LookupDemo />
    </main>
  )
}
