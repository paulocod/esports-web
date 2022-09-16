
import './styles/main.css'

import { useEffect, useState } from 'react'
import logoImg from './assets/logo-nlw-esports.svg'
import { CreateAdBanner } from './components/CreateAdBanner'
import { GameBanner } from './components/GameBanner'

interface Game {
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
    fetch('http://localhost:3000/games')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setGames(data)
      })
  }, [])

  return (
    <div className='max-w-7xl mx-auto flex flex-col items-center my-20'>
      <img src={logoImg} alt="" />

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

      <CreateAdBanner />
    </div>
  )
}

export default App
