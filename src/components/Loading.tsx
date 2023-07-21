import { FC } from 'react'
import lotties from '@/assets/lotties/lottery1.json'
import congratulation from '@/assets/lotties/congratulation2.json'
import Lottie from 'lottie-react'

interface LottieProps {
  className?: string
  onClick?: () => void
}
export const Loading1: FC<LottieProps> = ({ className, onClick }) => {
  return (
    <div onClick={onClick} className={className}>
      <Lottie animationData={lotties} loop={true} />
    </div>
  )
}

export const Congratulation: FC<LottieProps> = ({ className, onClick }) => {
  return (
    <div onClick={onClick} className={className}>
      <Lottie animationData={congratulation} loop={true} />
    </div>
  )
}
