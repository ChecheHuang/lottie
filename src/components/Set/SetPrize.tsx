import React, { useMemo } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import defaultPrize from '@/assets/images/defaultPrize.jpeg'
import { v4 as uuidv4 } from 'uuid'
import { PrizeType } from '@/App'
import Item from '@/components/Item'
import { toast } from 'react-toastify'
import Input from '@/components/inputs/Input'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import smallImg from '@/assets/images/small.png'

interface SetPrizeProps {
  addPrize: (data: PrizeType) => void
  removePrize: (id: string) => void
  prizes: PrizeType[]
}

const SetPrize: React.FC<SetPrizeProps> = ({
  addPrize,
  removePrize,
  prizes,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    // watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      prize: '',
      quantity: 1,
      img: defaultPrize,
    },
  })
  const handleAddPrize: SubmitHandler<FieldValues> = (data) => {
    addPrize({ id: uuidv4(), ...data } as PrizeType)
    toast.dark('成功加入', { autoClose: 500 })
    reset()
  }
  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return
    const reader = new FileReader()
    reader.onload = function () {
      setValue('img', reader.result as string)
    }
    reader.readAsDataURL(e.target.files[0])
    e.target.value = ''
  }

  const total = useMemo(
    () => prizes.reduce((prev, current) => prev + current.quantity, 0),
    [prizes]
  )
  return (
    <Item title="設定獎項">
      <form
        className="grid grid-cols-4 gap-4 mt-4"
        onSubmit={handleSubmit(handleAddPrize)}
      >
        <Input
          errors={errors}
          register={register}
          id="prize"
          label="獎品"
          type="text"
        />
        <Input
          errors={errors}
          register={register}
          id="quantity"
          label="數量"
          type="number"
          rule={{ min: 1 }}
        />

        <input
          id="imgFile"
          {...register('img', { onChange: handleUploadFile })}
          className="hidden"
          type="file"
        />
        <label
          htmlFor="imgFile"
          className="  btn btn-primary font-thin text-white w-full whitespace-nowrap"
        >
          上傳圖片
        </label>
        <button
          type="submit"
          className="btn btn-secondary text-dark whitespace-nowrap "
        >
          加入獎項
        </button>
      </form>
      <div className="w-full  h-full overflow-y-auto scrollbar-thumb-gray-900 scrollbar-track-gray-100 scrollbar-thin ">
        {prizes.map(({ prize, img, quantity, id }) => {
          return (
            <div
              key={id}
              className="  grid grid-cols-4 grid-rows-[100px]  gap-4 place-items-center"
            >
              <div>{prize}</div>
              <div>{quantity}</div>
              <div className="p-2 h-full overflow-hidden">
                <LazyLoadImage
                  height={'100%'}
                  alt=""
                  src={img}
                  placeholderSrc={smallImg}
                  effect="blur"
                />
              </div>

              <div>
                <button
                  className="btn btn-primary group"
                  onClick={() => removePrize(id)}
                >
                  <AiFillDelete className=" text-base-100 text-2xl group-hover:text-red-500 transition duration-200" />
                </button>
              </div>
            </div>
          )
        })}
      </div>
      <div className="flex w-full justify-center">共{total}個獎項</div>
    </Item>
  )
}

export default SetPrize
