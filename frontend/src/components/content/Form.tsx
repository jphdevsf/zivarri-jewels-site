'use client'

import { useForm } from 'react-hook-form'
import type { FormBlock, FormData } from '@/types/content'
import { useState } from 'react'

const Form = ({ title }: FormBlock) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const onSubmit = async (data: FormData) => {
    console.log('Form submitted:', data)
    setLoading(true)
    setMessage('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      const result = await res.json()
      if (result.success) {
        reset()
        setMessage('Thanks! Message sent successfully.')
      } else {
        setMessage('Failed to send. Please try again.')
      }
    } catch {
      setMessage('Failed to send. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  const shortInputClassList = 'w-full max-w-sm mb-4 px-3 py-4 dark:bg-stone-600 bg-stone-200 focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300'
  const textAreaClassList = 'w-full max-w-sm mb-4 px-3 py-4 dark:bg-stone-600 bg-stone-200 focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300'
  const labelClassList = 'block text-sm font-medium my-2 text-primary dark:text-primary-dark'
  const errorClassList = 'block text-xs mb-8 text-red-900 dark:text-red-400'
  return (
    <>
      {title && <h2 className='text-3xl mt-8 mb-4'>{title}</h2>}
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="content-form text-primary block px-8 py-12 dark:text-primary-dark bg-background dark:bg-background-dark"
      >
        <label className={labelClassList}>Name</label>
        <input {...register('name', { required: true, pattern: /^[a-z]{1}[a-z\s]+$/i })} className={shortInputClassList} />
        {errors.name && errors.name.type === 'required' && <span className={errorClassList}>Name is required.</span>}
        {errors.name && errors.name.type === 'pattern' && <span className={errorClassList}>Only letters and spaces are allowed in this field.</span>}

        <label className={labelClassList}>Email</label>
        <input {...register('email', { required: true, pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/ })} className={shortInputClassList} />
        {errors.email && errors.email.type === 'required' && <span className={errorClassList}>Email is required.</span>}
        {errors.email && errors.email.type === 'pattern' && <span className={errorClassList}>Enter a valid email address.</span>}

        <label className={labelClassList}>Message</label>
        <textarea
          {...register('message', { required: true, maxLength: 1000 })}
          className={textAreaClassList}
          rows={6}
        />
        {errors.message && errors.message.type === 'required' && <span className={errorClassList}>Please include a message in your inquiry.</span>}
        {errors.message && errors.message.type === 'maxLength' && <span className={errorClassList}>Please limit your message to 1000 characters or less.</span>}

        <button
          type="submit"
          disabled={loading}
          className={`content-form-button block text-background bg-primary dark:text-background-dark dark:bg-primary-dark relative border hover:text-primary hover:bg-background transition-all duration-300 text-center text-md py-3 px-8 z-20 my-2 ${loading && 'opacity-50 cursor-not-allowed disabled:pointer-events-none'}`}
        >
          {loading ? 'Sending...' : 'Submit'}
        </button>
        {message && (
          <p className='mt-4 text-confirmation dark:text-confirmation-dark text-left'>
            {message}
          </p>
        )}
      </form>

    </>
  )
}

export default Form