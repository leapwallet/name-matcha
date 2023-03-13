import {
  Checks,
  Code,
  Lightning,
  ListMagnifyingGlass,
  MagnifyingGlass
} from '@phosphor-icons/react'
import Link from 'next/link'

const ListItem = ({ children }: React.PropsWithChildren) => {
  return (
    <li className="px-6 text-xs sm:text-base font-bold border-2 border-gray-600 rounded-xl transition-all hover:bg-[#090909] hover:shadow hover:shadow-slate-600 w-full py-4 text-center flex flex-col items-center justify-center">
      {children}
    </li>
  )
}

export const Landing = () => {
  return (
    <main
      className="py-28"
      style={{
        background:
          'linear-gradient(90deg, #111111 21px, transparent 1%) center, linear-gradient(#111111 21px, transparent 1%) center, #a766ccc4',
        backgroundSize: '22px 22px'
      }}
    >
      <header className="w-full flex flex-col items-center justify-center ">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-white text-center">
          🍵 name-matcha
        </h1>
        <h2 className="mt-4 text-sm sm:text-base uppercase tracking-widest font-bold text-gray-300 text-center">
          One Stop Cosmos Name Resolution
        </h2>
        <p className="w-full sm:w-[75%] text-center leading-7 text-white mt-12 mx-auto">
          <strong>Name Matcha</strong> (<em>Matcha</em> -{' '}
          <span lang="jp">抹茶</span>; Meaning - &apos;ground and powdered green
          tea&apos;; Emoji - 🍵) - a pun on <strong>name-matcher</strong> - is a
          javascript library (built in typescript) for resolving names to wallet
          addresses in the cosmos universe.
        </p>
      </header>
      <section className="w-full sm:w-[75%] mx-auto mt-16 flex items-center justify-center">
        <ul className="list-none grid gap-4 grid-cols-2 lg:grid-cols-4 justify-items-center">
          <ListItem>
            <MagnifyingGlass weight="bold" size={24} className="mb-3" />
            Fast Name Resolution
          </ListItem>
          <ListItem>
            <ListMagnifyingGlass weight="bold" size={24} className="mb-3" />
            Simple Name Lookup
          </ListItem>
          <ListItem>
            <Lightning weight="bold" size={24} className="mb-3" />
            Easy to Use
          </ListItem>
          <ListItem>
            <Checks weight="bold" size={24} className="mb-3" />
            Multiple Services
          </ListItem>
        </ul>
      </section>
      <section className="w-full sm:w-[75%] mx-auto mt-20 flex flex-col items-center justify-center">
        <h3 className="font-bold text-2xl sm:text-3xl">
          It&apos;s this Simple
        </h3>
        <code className="mt-8 text-center p-4 sm:p-8 bg-gray-800 text-white rounded-lg text-sm sm:text-base">
          <span className="text-blue-400">matcha</span>.
          <span className="text-purple-400">resolve</span>(
          <span className="text-green-400">&apos;leap_cosmos.cosmos&apos;</span>
          {', '}
          <span className="text-blue-400">services</span>.<span>icns</span>);
        </code>
        <Link
          href="/docs"
          className="mt-12 text-center p-3 px-8 bg-indigo-500 text-white font-bold rounded-lg flex items-center justify-center text-sm sm:text-base"
        >
          Get Started{' '}
          <Code weight="bold" className="ml-3 text-xl sm:text-2xl" />
        </Link>
      </section>
    </main>
  )
}
