import {
  exitFullScreen,
  isFullscreenElement,
  requestFullScreen,
} from '@/components/Header/FullScreenButton/fullScreen'
import { useState, useEffect } from 'react'
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from 'react-icons/ai'
const FullScreenButton = () => {
  const [fullScreen, setFullScreen] = useState(false)
  const [originResizeFunc, setOriginResizeFunc] = useState<any>(null)
  useEffect(() => {
    if (window.addEventListener) {
      window.addEventListener('resize', onEscCancelFull, false)
    } else {
      setOriginResizeFunc(window.onresize)
      window.onresize = onEscCancelFull
    }
    return () => {
      if (window.removeEventListener) {
        window.removeEventListener('resize', onEscCancelFull, false)
      } else {
        window.onresize = originResizeFunc
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function onEscCancelFull() {
    setFullScreen(isFullscreenElement())
  }

  return (
    <div className=" text-2xl text-base-100 cursor-pointer hover:text-secondary">
      {fullScreen ? (
        <AiOutlineFullscreenExit onClick={exitFullScreen} />
      ) : (
        <AiOutlineFullscreen
          onClick={() => {
            requestFullScreen(document.body)
          }}
        />
      )}
    </div>
  )
}

export default FullScreenButton
