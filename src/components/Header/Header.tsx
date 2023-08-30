import React, { FC, useEffect, useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import sunnygoLogo from '@/assets/images/logo1.png'
import ChangeTheme from './ChangeTheme'
import FullScreenButton from './FullScreenButton/FullScreenButton'
import RecordButton from './RecordButton/RecordButton'
import { GiMedallist } from 'react-icons/gi'

interface HeaderProps {
  setTheme: (theme: string) => void
}
const defaultImg: string =
  localStorage.getItem('logo') !== null
    ? localStorage.getItem('logo')!
    : sunnygoLogo
const defaultTitle: string =
  localStorage.getItem('title') !== null
    ? localStorage.getItem('title')!
    : '陽信商店街抽獎活動'
const Header: FC<HeaderProps> = ({ setTheme }) => {
  const [title, setTitle] = useState(defaultTitle)
  const [logo, setLogo] = useState(defaultImg)
  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return
    const reader = new FileReader()
    reader.onload = function () {
      setLogo(reader.result as string)
      localStorage.setItem('logo', reader.result as string)
    }
    reader.readAsDataURL(e.target.files[0])
    e.target.value = ''
  }
  return (
    <>
      {/* <PermissionsControl /> */}
      <header className="bg-primary flex items-center  h-16 px-5 relative justify-between">
        <input
          onChange={handleUploadFile}
          id="logoFile"
          type="file"
          className="hidden"
        />
        <label
          htmlFor="logoFile"
          className="hover:scale-110 transition duration-150"
        >
          <LazyLoadImage
            className="h-16  cursor-pointer"
            alt=""
            effect="blur"
            src={logo}
          />
        </label>

        <input
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
            localStorage.setItem('title', e.target.value)
          }}
          className="input bg-primary bg-transparent text-center text-base-100 sm:text-5xl absolute_center hidden sm:block "
        />
        <div className="flex gap-4 items-center ">
          <label
            title="顯示中獎名單"
            htmlFor="drawer"
            className="drawer-button text-xl text-base-100 cursor-pointer hover:text-secondary"
          >
            <GiMedallist />
          </label>
          <RecordButton />
          <FullScreenButton />
          <ChangeTheme changeTheme={setTheme} />
        </div>
      </header>
    </>
  )
}

export default Header

const PermissionsControl = () => {
  const [videoPermission, setVideoPermission] = useState('denied')
  const [audioPermission, setAudioPermission] = useState('denied')

  const requestVideoPermission = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true })
      setVideoPermission('granted')
    } catch (error) {
      console.error('無法設置視訊存取權限：', error)
      setVideoPermission('denied')
    }
  }

  const requestAudioPermission = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true })
      setAudioPermission('granted')
    } catch (error) {
      console.error('無法設置音訊存取權限：', error)
      setAudioPermission('denied')
    }
  }

  return (
    <div className="flex">
      <p>視訊存取權限: {videoPermission}</p>
      <button className="btn" onClick={requestVideoPermission}>
        設置視訊存取權限
      </button>

      <p>音訊存取權限: {audioPermission}</p>
      <button className="btn" onClick={requestAudioPermission}>
        設置音訊存取權限
      </button>
    </div>
  )
}
