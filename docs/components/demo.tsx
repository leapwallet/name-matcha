import React, { Fragment, useCallback, useEffect, useState } from 'react'
import {
  CaretUpDown,
  Check,
  ClipboardText,
  MagnifyingGlass,
  SpinnerGap
} from '@phosphor-icons/react'
import { default as registry, services } from '@leapwallet/name-matcha'
import { Listbox, Switch, Transition } from '@headlessui/react'

const nsMap = {
  [services.icns]: 'ICNS',
  [services.ibcDomains]: 'IBC Domains',
  [services.stargazeNames]: 'Stargaze Names'
}

const nsList = Object.entries(nsMap)

const Select: React.FC<{
  value: string
  setValue: (_: string) => void
  label: string
  options: [string, string][]
}> = ({ value, setValue, label, options }) => {
  return (
    <Listbox
      value={value}
      onChange={(v) => {
        setValue(v)
      }}
    >
      <div className="relative mt-1">
        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-gray-700 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
          <span className="block truncate">{label}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <CaretUpDown className="h-5 w-5 text-gray-300" aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-700 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {options.map(([value, label]) => (
              <Listbox.Option
                key={value}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-indigo-400 text-white' : 'text-gray-300'
                  }`
                }
                value={value}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {label}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white">
                        <Check className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}

const MultipleResults = ({
  results
}: {
  results: Record<string, string | null>
}) => {
  return (
    <div className="flex flex-col space-y-4">
      {Object.entries(results).map(([service, result]) => (
        <div key={service}>
          <p className="font-bold mb-1">{nsMap[service]}</p>
          {result ? (
            <p className="font-thin text-gray-300">{result}</p>
          ) : (
            <p className="text-red-400">Not found</p>
          )}
        </div>
      ))}
    </div>
  )
}

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
  const [result, setResult] = useState<
    string | null | Record<string, string | null>
  >(null)
  const [error, setError] = useState<string | null>(null)
  const [nameService, setNameService] = useState<string>(services.ibcDomains)
  const [mode, setMode] = useState<'single' | 'multi'>('single')

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const data = new FormData(e.currentTarget)
      const name = data.get('name')!.toString().trim()
      if (!name) {
        setStatus('error')
        setError('Name is required')
        return
      } else if (!name.includes('.')) {
        setStatus('error')
        setError('Name must include a dot followed by a chain prefix')
        return
      }
      setStatus('loading')
      if (mode === 'single') {
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
      } else {
        registry
          .resolveAll(name)
          .then((res) => {
            setStatus('success')
            setError(null)
            setResult(res)
          })
          .catch((err) => {
            setStatus('error')
            setError(err.type)
          })
      }
    },
    [nameService, mode]
  )

  useEffect(() => {
    setError(null)
    setResult(null)
    setStatus('idle')
  }, [mode])

  return (
    <section className="w-full md:w-4/5 lg:w-1/3 max-w-[20rem] mt-4 sm:mt-16 mx-auto">
      <div className="mt-8">
        <h1 className="font-bold text-2xl">Name Resolution</h1>
        <div className="flex items-center justify-between mt-8">
          <p className="text-sm">Show Results from All Services</p>
          <Switch
            checked={mode === 'multi'}
            onChange={(v) => {
              setMode(v ? 'multi' : 'single')
            }}
            className={`${
              mode === 'multi' ? 'bg-indigo-500' : 'bg-gray-700'
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span
              className={`${
                mode === 'multi' ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="mt-4">
        {mode === 'single' ? (
          <div>
            <label
              htmlFor="name-service"
              className="block text-sm font-medium text-slate-200 mb-2"
            >
              Name Service
            </label>
            <Select
              label={nsMap[nameService]}
              value={nameService}
              setValue={setNameService}
              options={nsList}
            />
          </div>
        ) : null}
        <div className="flex items-end justify-center mt-4">
          <div className="flex-grow">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-slate-200 mb-2"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              autoComplete="off"
              placeholder="Enter name to resolve"
              className="px-3 py-2 border shadow-sm caret-white bg-[#111111] text-white border-slate-400 placeholder-slate-400 outline-none block w-full rounded-md sm:text-sm focus:ring-1"
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-500 p-2 border border-indigo-500 rounded ml-2 outline-none focus:ring-1"
          >
            <MagnifyingGlass weight="bold" size={20} />
          </button>
        </div>
        {status === 'idle' ? (
          <p className="text-sm text-gray-300 mt-2">
            For example - leapwallet.osmo
          </p>
        ) : null}
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
                {mode === 'single' ? (
                  <CopyToClipboardButton text={result as string} />
                ) : null}
              </div>
              <div className="mt-2 p-2 bg-slate-800 rounded-lg font-mono text-sm">
                {mode === 'single' && typeof result === 'string' ? (
                  <p>{result as string}</p>
                ) : (
                  <MultipleResults
                    results={result as Record<string, string | null>}
                  />
                )}
              </div>
            </div>
          ) : null}
          {status === 'error' ? (
            <p className="text-red-400 text-sm -mt-4">
              <strong>Error:</strong> <code className="text-xs">{error}</code>
            </p>
          ) : null}
        </div>
      )}
    </section>
  )
}

const LookupDemo = () => {
  const [status, setStatus] = useState('idle')
  const [result, setResult] = useState<
    string | null | Record<string, string | null>
  >(null)
  const [error, setError] = useState<string | null>(null)
  const [nameService, setNameService] = useState<string>(services.ibcDomains)
  const [mode, setMode] = useState<'single' | 'multi'>('single')

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const data = new FormData(e.currentTarget)
      const address = data.get('address')!.toString().trim()
      if (!address) {
        setStatus('error')
        setError('Address is required')
        return
      }
      setStatus('loading')
      if (mode === 'single') {
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
      } else {
        registry
          .lookupAll(address)
          .then((res) => {
            setStatus('success')
            setError(null)
            setResult(res)
          })
          .catch((err) => {
            setStatus('error')
            setError(err.type)
          })
      }
    },
    [nameService, mode]
  )

  useEffect(() => {
    setError(null)
    setResult(null)
    setStatus('idle')
  }, [mode])

  return (
    <section className="w-full md:w-4/5 lg:w-1/3 max-w-[20rem] mt-4 sm:mt-16 mx-auto">
      <div className="mt-8">
        <h1 className="font-bold text-2xl">Name Lookup</h1>
        <div className="flex items-center justify-between mt-8">
          <p className="text-sm">Show Results from All Services</p>
          <Switch
            checked={mode === 'multi'}
            onChange={(v) => {
              setMode(v ? 'multi' : 'single')
            }}
            className={`${
              mode === 'multi' ? 'bg-indigo-500' : 'bg-gray-700'
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span
              className={`${
                mode === 'multi' ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="mt-4">
        {mode === 'single' ? (
          <div>
            <label
              htmlFor="name-service"
              className="block text-sm font-medium text-slate-200 mb-2"
            >
              Name Service
            </label>
            <Select
              label={nsMap[nameService]}
              value={nameService}
              setValue={setNameService}
              options={nsList}
            />
          </div>
        ) : null}
        <div className="flex items-end justify-center mt-4">
          <div className="flex-grow">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-slate-200 mb-2"
            >
              Address
            </label>
            <input
              id="address"
              type="text"
              name="address"
              autoComplete="off"
              placeholder="Enter address here"
              className="px-3 py-2 border shadow-sm caret-white bg-[#111111] text-white border-slate-400 placeholder-slate-400 outline-none block w-full rounded-md sm:text-sm focus:ring-1"
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-500 p-2 border border-indigo-500 rounded ml-2 outline-none focus:ring-1"
          >
            <MagnifyingGlass weight="bold" size={20} />
          </button>
        </div>
        {status === 'idle' ? (
          <p className="text-sm text-gray-300 mt-2">
            For example - osmo19v...zu45k9
          </p>
        ) : null}
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
                {mode === 'single' ? (
                  <CopyToClipboardButton text={result as string} />
                ) : null}
              </div>
              <div className="mt-2 p-2 bg-slate-800 rounded-lg font-mono text-sm">
                {mode === 'single' && typeof result === 'string' ? (
                  <p>{result as string}</p>
                ) : (
                  <MultipleResults
                    results={result as Record<string, string | null>}
                  />
                )}
              </div>
            </div>
          ) : null}
          {status === 'error' ? (
            <p className="text-red-400 text-sm -mt-4">
              <strong>Error:</strong> <code className="text-xs">{error}</code>
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
      className="w-full h-[80%] py-8"
      style={{
        background:
          'linear-gradient(90deg, #111111 21px, transparent 1%) center, linear-gradient(#111111 21px, transparent 1%) center, #a766ccc4',
        backgroundSize: '22px 22px'
      }}
    >
      <div className="flex flex-col sm:flex-row justify-start sm:justify-center gap-4">
        <ResolutionDemo />
        <LookupDemo />
      </div>
    </main>
  )
}
