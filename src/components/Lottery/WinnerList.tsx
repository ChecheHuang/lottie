import { FC } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { WinnerType } from './Lottery'
import * as XLSX from 'xlsx'
// import { GiMedallist } from 'react-icons/gi'

interface WinnerListProps {
  winnerList: WinnerType[]
  show: string
}

const WinnerList: FC<WinnerListProps> = ({ winnerList, show }) => {
  function handleOnExport() {
    const exportData = winnerList.map((winner) => {
      const { id, prizeImg, prize, ...data } = winner
      data['獎品'] = prize
      return data
    })
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(exportData)
    XLSX.utils.book_append_sheet(wb, ws, '中獎名單')
    XLSX.writeFile(wb, '中獎名單.xlsx')
  }
  return (
    <div className="drawer drawer-end absolute ">
      <input id="drawer" type="checkbox" className="drawer-toggle" />
      {/* <div className="drawer-content">
        <label htmlFor="drawer" className="drawer-button btn btn-primary">
          <GiMedallist />
        </label>
      </div> */}
      <div className="drawer-side z-50">
        <label htmlFor="drawer" className="drawer-overlay"></label>

        <div className="menu  w-80 h-full bg-base-200 text-base-content flex flex-col ">
          <div className="mb-2 flex items-center justify-between">
            <label className="cursor-pointer" htmlFor="drawer">
              <AiOutlineClose />
            </label>
            <button onClick={handleOnExport} className="btn btn-sm btn-primary">
              匯出
            </button>
          </div>
          <div key="contain" className="flex-1 scroll_y">
            {winnerList.map((winner) => {
              return (
                <li key={winner.id}>
                  <div>
                    <img className="h-[50px]" src={winner.prizeImg} alt="" />
                    <div> {winner.prize}</div>
                    <div> {winner[show]}</div>
                  </div>
                </li>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default WinnerList
