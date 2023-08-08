import React, { useState } from 'react'
import 'react-lazy-load-image-component/src/effects/blur.css'
import { ToastContainer } from 'react-toastify'
import SetPrize from './components/Set/SetPrize'
import { motion, AnimatePresence } from 'framer-motion'
import defaultImg from '@/assets/images/defaultPrize.jpeg'
import Header from './components/Header/Header'
import NextStepModal from './components/modals/NextStepModal'
import SetLotteryList from './components/Set/SetLotteryList'
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

const initPrizes: PrizeType[] = [
  // {
  //   id: '1',
  //   prize: '大獎',
  //   quantity: 1,
  //   img: defaultImg,
  // },
  // {
  //   id: '2',
  //   prize: '手機',
  //   quantity: 5,
  //   img: defaultImg,
  // },
  // {
  //   id: '3',
  //   prize: '測試',
  //   quantity: 5,
  //   img: defaultImg,
  // },
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
  const [openLottery, setOpenLottery] = useState(LotteryState.SET)

  const handleEnterLottery = () => {
    setConfirmOpen(true)
  }

  return (
    <>
      <div className="min-h-screen w-screen" data-theme={theme}>
        <Header setTheme={setTheme} />
        <main className="pt-10 flex items-center justify-center flex-col overflow-hidden">
          <AnimatePresence>
            {openLottery === LotteryState.SET && (
              <motion.div
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex w-full items-center flex-col sm:flex-row  justify-around mt-2 sm:gap-4 gap-12 px-3 ">
                  <NextStepModal
                    columns={columns}
                    theme={theme}
                    isOpen={confirmOpen}
                    onClose={() => setConfirmOpen(false)}
                    lotteryRule={lotteryRule}
                    setLotteryRule={setLotteryRule}
                    onOpenLottery={() => setOpenLottery(LotteryState.USE)}
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
                    disabled={prizes.length === 0 || lotteryList.length === 0}
                    onClick={handleEnterLottery}
                  >
                    進入抽獎
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {openLottery === LotteryState.USE && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Lottery
                prizes={prizes}
                lotteryList={lotteryList}
                lotteryRule={lotteryRule}
                setLotteryList={setLotteryList}
                setPrizes={setPrizes}
              />
            </motion.div>
          )}
        </main>
      </div>
      <ToastContainer />
    </>
  )
}

export default App
