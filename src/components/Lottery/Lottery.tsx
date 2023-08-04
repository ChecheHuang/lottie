import { LotteryRuleState, LotteryType, PrizeType } from '@/App'
import React, { FC, useEffect, useMemo, useState } from 'react'
import Item from '../Item'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { cn, getRandom } from '@/lib/utils'
import { toast } from 'react-toastify'
import show from '@/assets/images/show.png'

import { usePrevious, useUpdateEffect } from '@/hooks/useHook'
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
  const prevLotteryList = usePrevious(lotteryList)

  const filterAction = useMemo(() => {
    return (winner: LotteryType) => {
      const filterActions = new Map<string, () => void>([
        [
          '一個人只能中獎一次',
          () => {
            setLotteryList((list) =>
              [...list].filter(
                (item) => JSON.stringify(item) !== JSON.stringify(winner)
              )
            )
          },
        ],

        [
          '一次機會即中獎一次',
          () => {
            setLotteryList((list) => {
              const newList = [...list]
              const winnerFirstIndex = list.findIndex(
                (item) => JSON.stringify(item) === JSON.stringify(winner)
              )
              newList.splice(winnerFirstIndex, 1)
              return newList
            })
          },
        ],
      ])
      if (filterActions.get(lotteryRule['抽獎規則'][0])) {
        filterActions.get(lotteryRule['抽獎規則'][0])!()
      }
    }
  }, [setLotteryList, lotteryRule])

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
    const newPrize = [...prizes]
    newPrize[currentPrizeIndex].quantity++
    setPrizes(newPrize)
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
    filterAction!(winner)
  }
  useUpdateEffect(() => {
    if (status === Status.SUCCESS) {
      createWinner()
      const newPrize = [...prizes]
      newPrize[currentPrizeIndex].quantity--
      setPrizes(newPrize)
    }
  }, [status])
  return (
    <div className="w-full px-16">
      <Item className="sm:w-full h-[80vh] " title="抽獎區">
        <div className="flex h-full">
          <div className="  h-full w-1/5 flex flex-col items-center scroll_y gap-2 p-4 ">
            {prizes.map((prize, index) => {
              return (
                <div
                  key={prize.id}
                  onClick={() => setCurrentPrizeIndex(index)}
                  className={cn(
                    'w-full indicator cursor-pointer scale-75 duration-100 relative',
                    currentPrizeIndex === index && ' scale-90',
                    prize.quantity === 0 && 'pointer-events-none filter blur-sm'
                  )}
                >
                  <LazyLoadImage
                    className=" rounded-lg opacity-80"
                    src={prize.img}
                  />
                  <h1 className="absolute_center text-base-100 text-2xl w-full text-center ">
                    {prize.prize}
                  </h1>
                  <span className="indicator-item badge badge-neutral text-base-100 text-lg ">
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
                    {prizes[currentPrizeIndex].prize}
                  </h2>
                </div>
                <div className="flex flex-col items-center ">
                  <div>剩餘數量</div>
                  <h2 className="text-2xl">
                    {prizes[currentPrizeIndex].quantity}
                  </h2>
                </div>
              </div>
              <div
                className={cn(
                  ' flex-1 m-2 overflow-hidden flex items-center justify-center  relative ',
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
                  <Loading1 onClick={() => setStatus(Status.SUCCESS)} />
                )}
                {status === Status.SUCCESS && (
                  <>
                    <Congratulation className="w-full absolute pointer-events-none  " />
                    <div
                      onClick={() => setIsMustWin(!isMustWin)}
                      className="flex items-center justify-center flex-col gap-5  "
                    >
                      <div className=" h-32">
                        <img src={prizes[currentPrizeIndex].img} alt="" />
                      </div>
                      <div className="flex flex-col items-center">
                        <h1 className="text-xl">恭喜</h1>
                        <div>
                          {showInfo.show}
                          {showInfo.winner}
                        </div>
                        <div>獲得{showInfo.prize}</div>
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
                重新抽
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
