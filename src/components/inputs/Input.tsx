import { cn } from '@/lib/utils'
import React from 'react'
import styles from './input.module.scss'
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  RegisterOptions,
} from 'react-hook-form'

interface InputProps {
  label?: string
  id: string
  type?: string
  required?: boolean
  register: UseFormRegister<FieldValues>
  errors: FieldErrors
  disabled?: boolean
  className?: string
  focusLabelClassName?: string
  rule?: RegisterOptions<FieldValues>
  hidden?: boolean
  defaultValue?: string
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  register,
  required,
  errors,
  type = 'text',
  disabled,
  className = 'input-secondary text-center',
  focusLabelClassName,
  rule,
  hidden = false,
  defaultValue,
}) => {
  return (
    <div className={cn('w-full relative', hidden && 'hidden')}>
      <input
        defaultValue={defaultValue}
        id={id}
        type={type}
        autoComplete={id}
        disabled={disabled}
        required={true}
        {...register(id, {
          required,
          ...rule,
        })}
        className={cn(
          'w-full input',
          className,
          styles.floatInput,
          errors[id] && 'input-error',
          disabled && 'opacity-50 cursor-default'
        )}
      />
      <label
        className={cn(
          'absolute top-1/2 left-0 transform -translate-y-1/2 ml-4 ease-in-out duration-300 pointer-events-none  text-warning ',
          errors[id] && 'text-error',
          focusLabelClassName
        )}
        htmlFor=""
      >
        {label}
      </label>
    </div>
  )
}

export default Input
