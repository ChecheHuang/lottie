import { LotteryRuleState, LotteryType, PrizeType } from '@/App'
import React, { FC, useMemo, useState } from 'react'
import Item from '../Item'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { cn, getRandom } from '@/lib/utils'
import { toast } from 'react-toastify'
import show from '@/assets/images/show.png'
import { motion } from 'framer-motion'
import { Congratulation, Loading1 } from '../Loading'
import WinnerList from './WinnerList'

interface LotteryProps {
  prizes: PrizeType[]
  lotteryList: LotteryType[]
  lotteryRule: LotteryRuleState
  setPrizes: React.Dispatch<React.SetStateAction<PrizeType[]>>
  setLotteryList: React.Dispatch<React.SetStateAction<LotteryType[]>>
}

enum Status {
  READY,
  LOADING,
  SUCCESS,
}

export interface WinnerType extends LotteryType {
  prize: string
  prizeImg: string
}

const Lottery: FC<LotteryProps> = ({
  lotteryRule,
  prizes,
  setPrizes,
  lotteryList,
  setLotteryList,
}) => {
  const [currentPrizeIndex, setCurrentPrizeIndex] = useState<number>(0)
  const [winnerList, setWinnerList] = useState<WinnerType[]>([])
  const [isMustWin, setIsMustWin] = useState(false)
  const [status, setStatus] = useState<Status>(Status.READY)

  const [prevRecord, setPrevRecord] = useState<{
    prizeIndex: number
    filterLotteryList: LotteryType[]
  }>({
    prizeIndex: 0,
    filterLotteryList: [],
  })

  const filterAction = (winner: LotteryType) => {
    const filterLotteryList: any[] = []
    const filterActions = new Map<string, () => void>([
      [
        '一個人只能中獎一次',
        () => {
          const filterList = lotteryList.filter((item) => {
            if (JSON.stringify(item) !== JSON.stringify(winner)) {
              return true
            } else {
              filterLotteryList.push(item)
              return false
            }
          })
          setLotteryList(filterList)
        },
      ],

      [
        '一次機會即中獎一次',
        () => {
          const winnerFirstIndex = lotteryList.findIndex(
            (item) => JSON.stringify(item) === JSON.stringify(winner)
          )
          const newList = [...lotteryList]
          const [spliceItem] = newList.splice(winnerFirstIndex, 1)
          // console.log(spliceItem)
          filterLotteryList.push(spliceItem)
          setLotteryList(newList)
        },
      ],
    ])
    if (filterActions.get(lotteryRule['抽獎規則'][0])) {
      filterActions.get(lotteryRule['抽獎規則'][0])!()
      setPrevRecord({ filterLotteryList, prizeIndex: currentPrizeIndex })
    }
  }

  const showInfo = useMemo(() => {
    return {
      show: lotteryRule['顯示中獎資訊'][0],
      prize: winnerList[0]?.prize || '',
      winner: winnerList[0]
        ? winnerList[0][lotteryRule['顯示中獎資訊'][0]]
        : '',
    }
  }, [lotteryRule, winnerList])

  const startLottery = () => {
    if (prizes[currentPrizeIndex].quantity === 0) {
      return toast.error('該獎項已抽完', { autoClose: 500 })
    }
    if (lotteryList.length === 0) {
      return toast.error('抽獎人員已抽完', { autoClose: 500 })
    }
    setStatus(Status.LOADING)
  }
  const restartLottery = () => {
    setCurrentPrizeIndex(prevRecord.prizeIndex)
    setLotteryList((prev) => [...prev, ...prevRecord.filterLotteryList])
    setPrizes((prev) => {
      const recoverPrizes = { ...prev }
      recoverPrizes[prevRecord.prizeIndex].quantity++
      return prev
    })
    setWinnerList((prev) => {
      const newWinnerList = [...prev]
      newWinnerList.shift()
      return newWinnerList
    })
    setStatus(Status.LOADING)
  }
  const createWinner = () => {
    const mustWinner = lotteryList.find(
      (item) => item['獎品'] === prizes[currentPrizeIndex].prize
    )
    const winner =
      isMustWin && mustWinner
        ? mustWinner
        : lotteryList[getRandom(0, lotteryList.length - 1)]
    setWinnerList([
      {
        ...winner,
        prize: prizes[currentPrizeIndex].prize,
        prizeImg: prizes[currentPrizeIndex].img,
      },
      ...winnerList,
    ])
    setPrizes((prizes) => {
      const newPrize = [...prizes]
      newPrize[currentPrizeIndex].quantity--
      return newPrize
    })
    filterAction!(winner)
    setStatus(Status.SUCCESS)
  }

  return (
    <div className="w-full px-16">
      <Item className="sm:w-full sm:h-[80vh] h-auto " title="抽獎區">
        <div className="flex h-full flex-col sm:flex-row">
          <div className="  sm:h-full  w-full sm:w-1/5 flex sm:flex-col items-center  flex-nowrap  gap-2 p-4  scroll_y">
            {prizes.map((prize, index) => {
              return (
                <div
                  key={prize.id}
                  onClick={() => setCurrentPrizeIndex(index)}
                  className={cn(
                    'w-full indicator cursor-pointer scale-75 duration-100 relative',
                    currentPrizeIndex === index && ' scale-90',
                    prize.quantity === 0 && 'pointer-events-none'
                  )}
                >
                  <img
                    alt=""
                    className=" rounded-lg opacity-80"
                    src={prize.img}
                  />
                  <h1 className="absolute_center truncate  text-slate-200  text-2xl w-full text-center ">
                    {prize.prize}
                    {prize.quantity === 0 && (
                      <>
                        <br />
                        <div>已抽完</div>
                      </>
                    )}
                  </h1>
                  <span className="indicator-item badge text-slate-200  badge-neutral  text-lg ">
                    {prize.quantity}
                  </span>
                </div>
              )
            })}
          </div>
          <div className="flex-1">
            <div className="h-[85%]  flex flex-col">
              <div className="flex items-center justify-around h-20 text-dark ">
                <div className="flex flex-col items-center ">
                  <div>獎品名稱</div>
                  <h2 className="text-2xl">
                    {prizes[currentPrizeIndex]?.prize}
                  </h2>
                </div>
                <div className="flex flex-col items-center ">
                  <div>剩餘數量</div>
                  <h2 className="text-2xl">
                    {prizes[currentPrizeIndex]?.quantity}
                  </h2>
                </div>
              </div>
              <div
                className={cn(
                  ' flex-1 m-2 overflow-hidden flex items-center justify-center  relative  h-[300px]  ',
                  !isMustWin && 'cursor-pointer'
                )}
              >
                {status === Status.READY && (
                  <LazyLoadImage
                    onClick={() => setIsMustWin(!isMustWin)}
                    width={'100%'}
                    src={show}
                  />
                )}
                {status === Status.LOADING && (
                  <Loading1
                    className=" sm:h-auto sm:w-auto h-[225px] w-[200px]"
                    onClick={createWinner}
                  />
                )}
                {status === Status.SUCCESS && (
                  <>
                    <Congratulation className="w-full absolute pointer-events-none  " />
                    <div
                      onClick={() => setIsMustWin(!isMustWin)}
                      className="flex items-center justify-center flex-col gap-5  "
                    >
                      <motion.div
                        initial={{
                          scale: 0,
                          y: -100,
                        }}
                        animate={{
                          scale: 1,
                          y: 0,
                          rotateZ: 720,
                        }}
                        transition={{ duration: 0.3 }}
                        className="h-32 rounded-lg overflow-hidden "
                      >
                        <img
                          className="object-cover h-full w-full"
                          src={prizes[currentPrizeIndex].img}
                          alt=""
                        />
                      </motion.div>
                      <div className="flex flex-col items-center">
                        <h1 className="text-xl">恭喜</h1>
                        <div className="grid grid-cols-2 place-items-center ">
                          <div>{showInfo.show}:</div>
                          <motion.div
                            initial={{
                              y: -130,
                              x: -35,
                              backgroundColor: 'rgba(255, 255, 255, 0.5)',
                              scale: 2,
                              opacity: 1,
                              borderRadius: '5px',
                            }}
                            animate={{
                              y: 0,
                              x: 0,
                              opacity: [1, 1, 1, 0.2, 0.4, 0.6, 0.8, 1],
                              scale: 1,
                            }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="text-2xl z-10 w-full truncate"
                          >
                            {showInfo.winner}
                          </motion.div>
                          <div>獲得:</div>
                          <div className="text-2xl">{showInfo.prize}</div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center justify-center gap-20">
              <button
                onClick={startLottery}
                className="btn btn-neutral rounded-3xl w-40 text-3xl font-medium text-white"
              >
                開始抽獎
              </button>
              <button
                disabled={status !== Status.SUCCESS}
                onClick={restartLottery}
                className="btn btn-warning rounded-3xl w-40 text-3xl font-medium text-white"
              >
                重新抽獎
              </button>
              <WinnerList
                show={lotteryRule['顯示中獎資訊'][0]}
                winnerList={winnerList}
              />
            </div>
          </div>
        </div>
      </Item>
    </div>
  )
}

export default Lottery
