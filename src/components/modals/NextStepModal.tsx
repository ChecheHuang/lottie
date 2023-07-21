import React from 'react'
import Modal from './Modal'
import { Tab } from '@headlessui/react'
import { cn } from '@/lib/utils'
import { LotteryRuleState } from '@/App'

interface NextStepModalProps {
  isOpen?: boolean
  onClose: () => void
  theme?: string
  lotteryRule: LotteryRuleState
  setLotteryRule: React.Dispatch<React.SetStateAction<LotteryRuleState>>
  columns: string[]
}

const NextStepModal: React.FC<NextStepModalProps> = ({
  isOpen,
  onClose,
  theme,
  lotteryRule,
  setLotteryRule,
  columns,
}) => {
  const categories: LotteryRuleState = {
    顯示中獎資訊: columns,
    抽獎規則: ['一個人只能中獎一次', '一次機會即中獎一次'],
  }
  const handleNextStep = () => {
    onClose()
  }

  return (
    <Modal theme={theme} isOpen={isOpen} onClose={onClose}>
      <div className="sm:flex sm:items-start">
        <div className="w-full max-w-md p-4 ">
          <Tab.Group>
            <Tab.List className="flex justify-between bg-secondary rounded-md p-3 ">
              {Object.keys(categories).map((category) => (
                <Tab
                  key={category}
                  className={({ selected }) =>
                    cn(
                      'w-full rounded-lg py-2.5  font-medium leading-5 text-sm',
                      selected
                        ? 'bg-white shadow text-primary'
                        : '  opacity-50 hover:bg-white/[0.12] hover:text-primary'
                    )
                  }
                >
                  {category}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="mt-2 min-h-[150px]">
              {Object.entries(categories).map((select, idx) => {
                const selectType =
                  select[0] as unknown as keyof LotteryRuleState
                const options = select[1]!

                return (
                  <Tab.Panel
                    key={idx}
                    className={cn(
                      'rounded-xl bg-white p-3 flex flex-col gap-2'
                    )}
                  >
                    {options.map((option: string, index: number) => {
                      const isActive = lotteryRule[selectType][0] === option
                      return (
                        <React.Fragment key={index}>
                          {option !== '次數' ? (
                            <button
                              onClick={() => {
                                setLotteryRule((prev) => {
                                  const newState = { ...prev }
                                  newState[selectType] = [option]
                                  return newState
                                })
                              }}
                              className={cn(
                                'rounded-md  w-full btn  btn-primary text-base-100 ',
                                !isActive && 'btn-outline '
                              )}
                            >
                              {option}
                            </button>
                          ) : null}
                        </React.Fragment>
                      )
                    })}
                  </Tab.Panel>
                )
              })}
            </Tab.Panels>
          </Tab.Group>
          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse gap-2">
            <button
              onClick={handleNextStep}
              className="btn btn-primary text-base-100"
            >
              設定完成
            </button>
            <button onClick={onClose} className="btn btn-error">
              關閉
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default NextStepModal
