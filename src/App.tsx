import React, { useEffect, useState } from 'react'
import 'react-lazy-load-image-component/src/effects/blur.css'
import { ToastContainer } from 'react-toastify'
import SetPrize from './components/Set/SetPrize'

import Header from './components/Header/Header'
import NextStepModal from './components/modals/NextStepModal'
import SetLotteryList from './components/Set/SetLotteryList'
import { useUpdateEffect } from './hooks/useHook'
import Lottery from './components/Lottery/Lottery'
export interface LotteryRuleState {
  顯示中獎資訊: string[]
  抽獎規則: string[]
}
export interface PrizeType {
  id: string
  prize: string
  img: string
  quantity: number
}
interface LotteryDefaultType {
  id: string
}
export interface LotteryType extends LotteryDefaultType {
  [key: string]: any
}

const initPrizes = [
  {
    id: '1',
    prize: '大獎',
    quantity: 1,
    img: '/src/assets/images/defaultPrize.jpeg',
  },
  {
    id: '2',
    prize: '手機',
    quantity: 5,
    img: '/src/assets/images/defaultPrize.jpeg',
  },
]
enum LotteryState {
  SET,
  USE,
}

const App: React.FC = () => {
  const [theme, setTheme] = useState('mytheme')
  const [prizes, setPrizes] = useState<PrizeType[]>(initPrizes)
  const [lotteryList, setLotteryList] = useState<LotteryType[]>([])
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [columns, setColumns] = useState<string[]>(['姓名', '次數'])
  const [lotteryRule, setLotteryRule] = useState<LotteryRuleState>({
    顯示中獎資訊: columns.slice(0, 1),
    抽獎規則: ['一個人只能中獎一次'],
  })
  const [openLottery, setOpenLottery] = useState(LotteryState.USE)

  const handleEnterLottery = () => {
    setConfirmOpen(true)
  }
  useUpdateEffect(() => {
    if (confirmOpen) return
    console.log(JSON.stringify(prizes, null, 2))
    console.log(JSON.stringify(lotteryList, null, 2))
    console.log(lotteryRule)
  }, [confirmOpen])
  return (
    <>
      <div className="min-h-screen w-screen" data-theme={theme}>
        <button
          className="fixed right-0 bg-black z-10"
          onClick={() => {
            setOpenLottery(
              openLottery === LotteryState.SET
                ? LotteryState.USE
                : LotteryState.SET
            )
          }}
        >
          123
        </button>
        <Header setTheme={setTheme} />
        <main className="mt-10 flex items-center justify-center flex-col">
          <div className={openLottery === LotteryState.SET ? '' : 'hidden'}>
            <div className="flex w-full items-center flex-col md:flex-row  justify-around mt-2 gap-4 px-3 ">
              <NextStepModal
                columns={columns}
                theme={theme}
                isOpen={confirmOpen}
                onClose={() => setConfirmOpen(false)}
                lotteryRule={lotteryRule}
                setLotteryRule={setLotteryRule}
              />
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
              <SetLotteryList
                columns={columns}
                setColumns={setColumns}
                setLotteryList={setLotteryList}
              />
            </div>
            <div className="w-full flex justify-center mt-3">
              <button
                className="btn btn-neutral rounded-3xl w-40 text-3xl font-medium text-white"
                onClick={handleEnterLottery}
              >
                進入抽獎
              </button>
            </div>
          </div>
          <div className={openLottery === LotteryState.USE ? '' : 'hidden'}>
            <Lottery
              prizes={prizes}
              lotteryList={lotteryList}
              lotteryRule={lotteryRule}
              setLotteryList={setLotteryList}
              setPrizes={setPrizes}
            />
          </div>
        </main>
      </div>
      <ToastContainer />
    </>
  )
}

export default App
