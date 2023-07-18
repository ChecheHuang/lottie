import React, { FC } from 'react'
import logo from '@/assets/images/logo1.png'

const App: React.FC = () => {
  return (
    <div className="h-screen w-screen" data-theme="mytheme">
      <header className="bg-primary flex items-center  h-16 px-5 relative">
        <img className="w-24 cursor-pointer" src={logo} alt="" />
        <h1 className="text-white text-5xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  ">
          陽信商店街抽獎活動
        </h1>
      </header>
      <main className="mt-2">
        <div className="flex justify-center">
          <input
            type="text"
            placeholder="輸入活動名稱"
            className="input input-primary "
          />
        </div>
        <div className="flex justify-around mt-2 gap-4 px-3 ">
          <Item title="設定獎項" />
          <Item title="加入抽獎名單" />
        </div>
      </main>
    </div>
  )
}

export default App

interface ItemProps {
  title: string
}

const Item: FC<ItemProps> = ({ title }) => {
  return (
    <div className=" relative border-[12px] border-primary rounded-3xl w-1/2 h-[30vw] p-2  ">
      <div className=" absolute -top-8  left-1/2 transform -translate-x-1/2  bg-primary text-white text-2xl rounded-full px-6 py-2 pointer-events-none ">
        {title}
      </div>
      <div className="flex space-x-4 mt-4">
        <input
          type="text"
          placeholder="獎品"
          className="flex-1 input input-bordered input-secondary w-full "
        />
        <input
          type="number"
          placeholder="數量"
          className="flex-1  input input-bordered input-secondary w-full "
        />
        <input id="imgFile" className="hidden" type="file" />
        <label
          htmlFor="imgFile"
          className="flex-1  btn btn-primary font-thin text-white w-full "
        >
          上傳圖片
        </label>
        <button className="btn btn-secondary flex-1">加入獎項</button>
      </div>
    </div>
  )
}
