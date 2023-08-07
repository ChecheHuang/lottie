import { FC, useState } from 'react'
import { BsFillRecordBtnFill } from 'react-icons/bs'
import Lottie from 'lottie-react'
import record from './record.json'
import { toast } from 'react-toastify'

const RecordButton: FC = () => {
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [recording, setRecording] = useState(false)
  const startRecording = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      })

      const audioStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      })

      const mediaStream = new MediaStream([
        ...screenStream.getTracks(),
        ...audioStream.getTracks(),
      ])

      const mediaRecorder = new MediaRecorder(mediaStream)

      // 設置錄製完成後的處理函式
      mediaRecorder.ondataavailable = (event) => {
        const recordedVideo = new Blob([event.data], { type: 'video/webm' })
        // 儲存錄製的視訊檔案
        saveVideoToFile(recordedVideo)
      }

      // 開始錄製
      mediaRecorder.start()
      toast.info('開始錄影，再次點擊結束錄影', { autoClose: 500 })
      setStream(mediaStream)
      setRecording(true)
    } catch (error) {
      toast.error('錄影失敗', { autoClose: 500 })
      console.error('錄影開始失敗：', error)
    }
  }

  const stopRecording = () => {
    if (stream) {
      const tracks = stream.getTracks()
      tracks.forEach((track) => track.stop())
      setStream(null)
      setRecording(false)
    }
  }

  const saveVideoToFile = (recordedVideo: Blob) => {
    const url = URL.createObjectURL(recordedVideo)
    const a = document.createElement('a')

    const timestamp = new Date()
    const year = timestamp.getFullYear()
    const month = timestamp.toLocaleString('default', { month: 'long' })
    const day = timestamp.getDate()
    const hour = timestamp.getHours()
    const minute = timestamp.getMinutes()

    const formattedTimestamp = `抽獎錄影_${year}年${month}${day}日 上午${hour}點${minute}分.webm`

    a.href = url
    a.download = formattedTimestamp
    a.click()
    URL.revokeObjectURL(url)
  }
  return (
    <div>
      {recording ? (
        <Lottie
          onClick={stopRecording}
          className="w-12 h-full cursor-pointer"
          animationData={record}
          loop={true}
        />
      ) : (
        <BsFillRecordBtnFill
          title="開始錄影"
          onClick={startRecording}
          className="text-2xl text-base-100 cursor-pointer hover:text-secondary"
        />
      )}
    </div>
  )
}

export default RecordButton
