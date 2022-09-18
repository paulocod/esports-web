
import './styles/main.css'

import axios from 'axios'
import { useEffect, useState } from 'react'
import logoImg from './assets/logo-nlw-esports.svg'
import { CreateAdBanner } from './components/CreateAdBanner'
import { GameBanner } from './components/GameBanner'

import * as Dialog from '@radix-ui/react-dialog'
import { CreateAdModal } from './components/CreateAdModal'

export interface Game {
  id: string
  title: string
  bannerUrl: string
  _count: {
    Ad: number
  }
}

function App() {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    axios('http://localhost:3000/games')
      .then(response => { setGames(response.data) })
  }, [])

  return (
    <div className='max-w-7xl mx-auto flex flex-col items-center my-20'>
      <img src={logoImg} />

      <h1 className='text-6xl text-white font-black mt-20'>
        Seu <span className='bg-nlw-gradient bg-clip-text text-transparent'> duo </span> está aqui.
      </h1>

      <div className='grid grid-cols-6 gap-6 mt-16'>
        {games.map(game => {
          return (
            <GameBanner
              key={game.id}
              title={game.title}
              bannerUrl={game.bannerUrl}
              adsCount={game._count.Ad} />
          )
        })}
      </div>

      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>

    </div>
  )
}

export default App
