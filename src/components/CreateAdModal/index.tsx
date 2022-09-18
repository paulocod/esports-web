import * as Checkbox from '@radix-ui/react-checkbox'
import * as Dialog from '@radix-ui/react-dialog'
import * as Toggle from '@radix-ui/react-toggle-group'
import axios from 'axios'
import { Check, GameController } from 'phosphor-react'
import { FormEvent, useEffect, useState } from 'react'
import { Game } from '../../App'
import { Input } from '../Form/Input'



export function CreateAdModal() {

  const [games, setGames] = useState<Game[]>([])
  const [weekDays, setWeekDays] = useState<string[]>([])
  const [useVoiceChannel, setUseVoiceChannel] = useState(false)

  useEffect(() => {
    axios('http://localhost:3000/games')
      .then(response => { setGames(response.data) })
  }, [])

  async function handleCreatedAd(event: FormEvent) {
    event.preventDefault()

    const formData = new FormData(event.target as HTMLFormElement)
    const data = Object.fromEntries(formData)

    if (!data.name) {
      return
    }

    try {
      await axios.post(`http://localhost:3000/ads/${data.game}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays.map(String),
        hoursStart: data.hoursStart,
        hourEnd: data.hoursEnd,
        useVoiceChannel: useVoiceChannel
      })
      alert('Anúncio criado com sucesso!')
    } catch (err) {
      console.log(err)
      alert('Erro ao criar o anúncio!')
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className='bg-black/60 inset-0 fixed' />
      <Dialog.Content
        className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25'
      >
        <Dialog.Title
          className='text-3xl font-black'
        >
          Publique um anúncio
        </Dialog.Title>

        <form
          onSubmit={handleCreatedAd}
          className='mt-8 flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <label
              htmlFor="game"
              className='font-semibold'
            >
              Qual o game?
            </label>

            <select
              name='game'
              id='game'
              className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none'
              placeholder='Selecione o game que deseja jogar'
            >
              <option
                disabled
                defaultValue=""
              >
                Selecione o game que deseja jogar
              </option>
              {games.map(game => {
                return <option key={game.id} value={game.id}>{game.title}</option>
              })}
            </select>
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor=""
            >
              Seu nome (ou nickname)
            </label>

            <Input
              name="name"
              id="name"
              placeholder='Como te chamam dentro do game?' />
          </div>

          <div className='grid grid-cols-2 gap-6'>
            <div className='flex flex-col gap-2'>
              <label htmlFor="yearsPlaying"
              >
                Joga há quantos anos?
              </label>
              <Input
                name="yearsPlaying"
                id="yearsPlaying"
                type="number"
                placeholder='Tudo bem ser ZERO' />
            </div>

            <div className='flex flex-col gap-2'>
              <label htmlFor="discord"
              >
                Qual seu Discord?
              </label>
              <Input
                name="discord"
                id="discord"
                type="text"
                placeholder='Usuario#0000' />
            </div>
          </div>

          <div className='flex gap-6'>
            <div className='flex flex-col gap-2'>
              <label htmlFor="weekDays"
              >
                Quando costuma jogar?
              </label>
              <Toggle.Root
                className='grid grid-cols-4 gap-2'
                type='multiple'
                value={weekDays}
                onValueChange={setWeekDays}
              >
                <Toggle.Item
                  value='0'
                  title='Domingo'
                  className=
                  {`w-8 h-8 rounded ${weekDays.includes('0')
                    ? 'bg-violet-500'
                    : 'bg-zinc-900'}`
                  }
                >D
                </Toggle.Item>
                <Toggle.Item
                  value='1'
                  title='Segunda'
                  className=
                  {`w-8 h-8 rounded ${weekDays.includes('1')
                    ? 'bg-violet-500'
                    : 'bg-zinc-900'}`
                  }
                >S
                </Toggle.Item>
                <Toggle.Item
                  value='2'
                  title='Terça'
                  className=
                  {`w-8 h-8 rounded ${weekDays.includes('2')
                    ? 'bg-violet-500'
                    : 'bg-zinc-900'}`
                  }
                >T
                </Toggle.Item>
                <Toggle.Item
                  value='3'
                  title='Quarta'
                  className=
                  {`w-8 h-8 rounded ${weekDays.includes('3')
                    ? 'bg-violet-500'
                    : 'bg-zinc-900'}`
                  }
                >Q
                </Toggle.Item>
                <Toggle.Item
                  value='4'
                  title='Quinta'
                  className=
                  {`w-8 h-8 rounded ${weekDays.includes('4')
                    ? 'bg-violet-500'
                    : 'bg-zinc-900'}`
                  }
                >Q
                </Toggle.Item>
                <Toggle.Item
                  value='5'
                  title='Sexta'
                  className=
                  {`w-8 h-8 rounded ${weekDays.includes('5')
                    ? 'bg-violet-500'
                    : 'bg-zinc-900'}`
                  }
                >S
                </Toggle.Item>
                <Toggle.Item
                  value='6'
                  title='Sabado'
                  className=
                  {`w-8 h-8 rounded ${weekDays.includes('6')
                    ? 'bg-violet-500'
                    : 'bg-zinc-900'}`
                  }
                >S
                </Toggle.Item>
              </Toggle.Root>
            </div>

            <div className='flex flex-col gap-2 flex-1'>
              <label htmlFor="hoursStart"
              >
                Qual horário do dia?
              </label>
              <div className='grid grid-cols-2 gap-2'>
                <Input
                  name="hoursStart"
                  id="hoursStart"
                  type="time"
                  placeholder='De' />
                <Input
                  name="hoursEnd"
                  id="hoursEnd"
                  type="time"
                  placeholder='Até' />
              </div>
            </div>
          </div>

          <label className='mt-2 flex items-center gap-2 text-sm'>
            <Checkbox.Root
              checked={useVoiceChannel}
              onCheckedChange={(checked) => {
                if (checked === true) {
                  setUseVoiceChannel(true)
                } else {
                  setUseVoiceChannel(false)
                }
              }}
              className='w-6 h-6 p-1 rounded bg-zinc-900'>
              <Checkbox.Indicator>
                <Check className='w-4 h-4 text-emerald-400' />
              </Checkbox.Indicator>
            </Checkbox.Root>
            Costumo me conectar ao chat de voz
          </label>

          <footer className='mt-4 flex justify-end gap-4'>
            <Dialog.Close
              type='button'
              className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'
            >Cancelar
            </Dialog.Close>
            <button
              type="submit"
              className='bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600'
            >
              <GameController className='w-6 h-6' />
              Encontrar duo
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal >
  )
}