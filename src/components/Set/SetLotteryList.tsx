import Item from '@/components/Item'
import * as XLSX from 'xlsx'
import { v4 as uuidv4 } from 'uuid'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { AiFillDelete } from 'react-icons/ai'
import React, { useEffect, useMemo, useRef, useState } from 'react'
// import { cn } from '@/lib/utils'
import { toast } from 'react-toastify'
import { IoClose } from 'react-icons/io5'
import Input from '../inputs/Input'
import { LotteryType } from '@/App'

const initPeople = [
  {
    id: 'c217ec53-47c2-4ced-bee6-b32905d0c309',
    姓名: '測試2',
    次數: 1,
  },
  {
    id: '449e6eae-4ddd-4942-ac97-2feca9065840',
    姓名: '測試1',
    次數: 3,
  },
]

interface PeopleDefault {
  id: string
  次數: number
}
interface PeopleType extends PeopleDefault {
  [key: string]: any
}
interface SetLotteryListProps {
  setLotteryList: React.Dispatch<React.SetStateAction<LotteryType[]>>
}

const SetLotteryList: React.FC<SetLotteryListProps> = ({ setLotteryList }) => {
  const [columns, setColumns] = useState<string[]>(['姓名', '次數'])
  const addColumnRef = useRef<HTMLInputElement>(null)
  const [isSettingComplete, SetIsSettingComplete] = useState(true)

  const [people, setPeople] = useState<PeopleType[]>(initPeople)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>()
  const addPeople = (data: PeopleType | PeopleType[]) =>
    setPeople((prev) => [...(Array.isArray(data) ? data : [data]), ...prev])
  const removePeople = (id: string) =>
    setPeople((prev) => [...prev].filter((people) => people.id !== id))

  function readExcel(e: React.ChangeEvent<HTMLInputElement>) {
    const file: File | undefined = e.target.files?.[0]
    if (file) {
      const promise = new Promise<Array<any>>((resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.readAsArrayBuffer(file)
        fileReader.onload = (e) => {
          const bufferArray = e.target?.result as ArrayBuffer
          const wb = XLSX.read(bufferArray, { type: 'buffer' })
          const wsName = wb.SheetNames[0]
          const ws = wb.Sheets[wsName]
          const data = XLSX.utils.sheet_to_json(ws)
          resolve(data)
        }
        fileReader.onerror = (error) => {
          reject(error)
        }
      })
      promise.then((data) => {
        const excelCols = Object.keys(data[0])
        const isContinue = columns
          .filter((col) => col !== '次數')
          .every((value) => excelCols.includes(value))
        if (!isContinue) {
          return toast.error('匯入失敗，確認您的檔案格式', { autoClose: 500 })
        }
        const people = data.map((person) => {
          const newPerson = { ...person, id: uuidv4() }
          const parsedCount = parseInt(newPerson['次數'])

          if (isNaN(parsedCount)) {
            newPerson['次數'] = 1
          } else {
            newPerson['次數'] = parsedCount
          }

          return newPerson
        })
        addPeople(people)
        toast.success('成功加入', { autoClose: 500 })
      })
    }
    e.target.value = ''
  }
  function handleAddColumn() {
    if (!addColumnRef.current) return
    const newCol = addColumnRef.current
    const newColValue = newCol?.value
    if (!newColValue) {
      newCol.focus()
      toast.info('請輸入要加入的欄位', { autoClose: 500 })
      return
    }
    if (columns.includes(newColValue)) {
      toast.error('已經加入欄位', { autoClose: 500 })
      return
    }

    setColumns((prev) => [newColValue, ...prev])
    newCol.value = ''
    newCol.focus()
    toast.success('成功加入欄位', { autoClose: 500 })
  }
  const handleAddPeople: SubmitHandler<FieldValues> = (data) => {
    addPeople({
      id: uuidv4(),
      ...data,
      次數: parseInt(data['次數']),
    } as PeopleType)
    toast.dark('成功加入', { autoClose: 500 })
    reset()
  }
  const peopleInfo = useMemo(
    () => ({
      length: people.length,
      total: people.reduce((prev, current) => prev + current['次數'], 0),
    }),
    [people]
  )
  useEffect(() => {
    setLotteryList(
      people.reduce((acc, { 次數, ...rest }) => {
        const person = { ...rest }
        for (let i = 0; i < 次數; i++) {
          acc = [...acc, person]
        }
        return acc
      }, [] as LotteryType[])
    )
  }, [people, setLotteryList])
  return (
    <Item title="加入抽獎名單">
      {!isSettingComplete ? (
        <div className="w-full h-full flex flex-col items-center gap-2 justify-center">
          <div className="flex gap-2 items-center flex-wrap w-[350px]">
            欄位
            {columns.map((column) => (
              <div className="badge badge-info" key={column}>
                {column}
                <IoClose
                  onClick={() =>
                    setColumns((prev) =>
                      prev.filter((item) => item !== column || item === '次數')
                    )
                  }
                  className="cursor-pointer ml-1"
                />
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2 ">
            <div>
              <input
                placeholder="輸入要加入的欄位"
                type="text"
                className="input input-secondary "
                ref={addColumnRef}
              />
              <button
                onClick={handleAddColumn}
                className="btn btn-secondary ml-2"
              >
                加入欄位
              </button>
            </div>
          </div>
          <button
            onClick={() => {
              if (columns.length === 1) {
                toast.error('至少加入一個欄位', { autoClose: 500 })
                return
              }
              SetIsSettingComplete(true)
            }}
            className="btn btn-primary"
          >
            設定完成
          </button>
        </div>
      ) : (
        <>
          <input
            className="hidden"
            id="file"
            type="file"
            onChange={readExcel}
          />
          <label
            htmlFor="file"
            className=" btn btn-neutral absolute text-white -top-8 right-10"
          >
            匯入EXCEL
          </label>
          <form
            onSubmit={handleSubmit(handleAddPeople)}
            style={{
              gridTemplateColumns: `repeat(${columns.length + 1}, 1fr)`,
            }}
            className="grid gap-4 mt-4"
          >
            {columns.map((column) => {
              const isFreq = column === '次數'
              return (
                <React.Fragment key={column}>
                  <Input
                    defaultValue={isFreq ? '1' : ''}
                    errors={errors}
                    register={register}
                    required
                    id={column}
                    label={column}
                    rule={isFreq ? { min: 1 } : {}}
                    type={isFreq ? 'number' : 'text'}
                  />
                </React.Fragment>
              )
            })}

            <button type="submit" className="btn btn-secondary text-dark ">
              加入抽獎
            </button>
          </form>
          <div className="w-full  h-full overflow-y-auto scrollbar-thumb-gray-900 scrollbar-track-gray-100 scrollbar-thin ">
            {people.map((item) => {
              return (
                <div
                  key={item.id}
                  style={{
                    gridTemplateColumns: `repeat(${columns.length + 1}, 1fr)`,
                  }}
                  className="  grid  grid-rows-[40px]  gap-4 place-items-center"
                >
                  {columns.map((column) => (
                    <div key={column}>{item[column]}</div>
                  ))}
                  <div>
                    <button
                      className="btn btn-primary group btn-sm"
                      onClick={() => removePeople(item.id)}
                    >
                      <AiFillDelete className=" text-base-100 text-2xl group-hover:text-red-500 transition duration-200" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="flex w-full justify-center">
            共{peopleInfo.length}個人，{peopleInfo.total}次抽獎次數
          </div>
        </>
      )}
    </Item>
  )
}

export default SetLotteryList
