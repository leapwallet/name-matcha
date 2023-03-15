import {
  Checks,
  Code,
  CursorClick,
  Lightning,
  ListMagnifyingGlass,
  MagnifyingGlass
} from '@phosphor-icons/react'
import Link from 'next/link'

const ListItem = ({ children }: React.PropsWithChildren) => {
  return (
    <li className="px-6 text-xs sm:text-base font-bold border-2 border-gray-800 rounded-xl transition-all hover:bg-[#111111] w-full py-4 text-center flex flex-col items-center justify-center">
      {children}
    </li>
  )
}

export const Landing = () => {
  return (
    <main className="py-28 dot-grid-bg">
      <header className="w-full flex flex-col items-center justify-center ">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-white text-center">
          🍵 name-matcha
        </h1>
        <h2 className="mt-4 text-sm sm:text-base uppercase tracking-widest font-bold text-gray-300 text-center">
          One Stop Cosmos Name Resolution
        </h2>
        <p className="w-full sm:w-[75%] text-sm text-center leading-7 text-white mt-8 mx-auto">
          <strong>Name Matcha</strong> (<em>Matcha</em> -{' '}
          <span lang="jp">抹茶</span>; Meaning - &apos;ground and powdered green
          tea&apos;; Emoji - 🍵) - a pun on <strong>name-matcher</strong>
        </p>
        <p className="w-full sm:w-[50%] text-lg text-center leading-7 text-white mt-12 mx-auto">
          A developer-friendly javascript library that provides a standardized
          way to easily resolve Cosmos ecosystem name services to wallet
          addresses (and vice-versa) using just one line of code.
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
        <div className="flex flex-col sm:flex-row items-center mt-12">
          <Link
            href="docs"
            className="text-center p-3 px-8 bg-indigo-500 border border-indigo-500 text-white font-bold rounded-lg flex items-center justify-center text-sm sm:text-base"
          >
            Get Started{' '}
            <Code weight="bold" className="ml-3 text-xl sm:text-2xl" />
          </Link>
          <Link
            href="demo"
            className="mt-4 sm:mt-0 sm:ml-4 text-center p-3 px-8 bg-transparent border border-indigo-500 text-white font-bold rounded-lg flex items-center justify-center text-sm sm:text-base"
          >
            Try it Out
            <CursorClick weight="bold" className="ml-3 text-xl sm:text-2xl" />
          </Link>
        </div>
      </section>
    </main>
  )
}
