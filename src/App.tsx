import React, { useState } from 'react'
import 'react-lazy-load-image-component/src/effects/blur.css'
import { ToastContainer } from 'react-toastify'
import SetPrize from './components/Set/SetPrize'
import SetLotteryList from './components/Set/SetLotteryList'
import Header from './components/Header/Header'
import ConfirmModal from './components/modals/ConfirmModal'

export interface PrizeType {
  id: string
  prize: string
  img: string
  quantity: string
}
interface LotteryDefaultType {
  id: string
}
export interface LotteryType extends LotteryDefaultType {
  [key: string]: any
}

const initPrizes = [
  {
    id: '62934d0c-2218-488c-9a01-0f5052cff0c0',
    prize: '大獎',
    quantity: '3',
    img: '/src/assets/images/defaultPrize.jpeg',
  },
  {
    id: '6b89d654-717a-4940-9de9-f0706aabe414',
    prize: '手機',
    quantity: '5',
    img: '/src/assets/images/defaultPrize.jpeg',
  },
]

const App: React.FC = () => {
  const [theme, setTheme] = useState('mytheme')
  const [prizes, setPrizes] = useState<PrizeType[]>(initPrizes)
  const [lotteryList, setLotteryList] = useState<LotteryType[]>([])
  const [confirmOpen, setConfirmOpen] = useState(false)

  // const [openLottery, setOpenLottery] = useState(false)
  // const [peopleData, setPeopleData] = useState([])
  // const [winnerList, setWinnerList] = useState([])

  const handleEnterLottery = () => {
    // console.log(JSON.stringify(prizes, null, 2))
    console.log(JSON.stringify(lotteryList, null, 2))
    setConfirmOpen(true)
  }
  return (
    <>
      <div className="min-h-screen w-screen" data-theme={theme}>
        <ConfirmModal
          theme={theme}
          isOpen={confirmOpen}
          onClose={() => setConfirmOpen(false)}
        />
        <Header setTheme={setTheme} />
        <main className="mt-10">
          <div className="flex w-full items-center flex-col md:flex-row  justify-around mt-2 gap-4 px-3 ">
            <SetPrize
              addPrize={(data: PrizeType) =>
                setPrizes((prev) => [data, ...prev])
              }
              removePrize={(id: string) =>
                setPrizes((prev) =>
                  [...prev].filter((prize) => prize.id !== id)
                )
              }
              prizes={prizes}
            />
            <SetLotteryList setLotteryList={setLotteryList} />
          </div>
        </main>
        <div className="w-full flex justify-center mt-3">
          <button
            className="btn btn-neutral rounded-3xl w-40 text-3xl font-medium text-white"
            onClick={handleEnterLottery}
          >
            進入抽獎
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default App
