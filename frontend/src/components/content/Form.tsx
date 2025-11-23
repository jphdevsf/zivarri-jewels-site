'use client'

import { useForm, SubmitHandler } from 'react-hook-form'
import type { Form } from '@/types/content'

const Form = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit: SubmitHandler<Record<string, any>> = (data) => {
    console.log('Form submitted:', data)
    // TODO: call your Strapi API endpoint here
  }
  const shortInputClassList = 'w-full max-w-sm px-3 py-2 border-b-2 focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300}'
  const labelClassList = 'block text-sm font-medium text-gray-700 mb-1 mt-6'
  const errorClassList = 'block text-xs text-red-900 dark:text-red-400'
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="content-form text-primary block px-8 py-12 dark:text-primary-dark bg-background dark:bg-background-dark"
    >
      <label className={labelClassList}>Name</label>
      <input {...register('name', { required: true, pattern: /^[A-Za-z]+$/i })} className={shortInputClassList} />
      {errors.name && errors.name.type === 'required' && <span className={errorClassList}>This field is required.</span>}
      {errors.name && errors.name.type === 'pattern' && <span className={errorClassList}>Only letters are allowed in this field.</span>}

      <label className={labelClassList}>Email</label>
      <input {...register('email', { required: true, pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/ })} className={shortInputClassList} />
      {errors.email && errors.email.type === 'required' && <span className={errorClassList}>This field is required.</span>}
      {errors.email && errors.email.type === 'pattern' && <span className={errorClassList}>Enter a valid email address.</span>}

      <label className={labelClassList}>Message</label>
      <textarea
        {...register('message', { required: true, maxLength: 500 })}
        className={`w-full max-w-xl px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 ${false ? 'border-red-500' : 'border-gray-300'}`}
        rows={4}
      />
      {errors.email && errors.email.type === 'required' && <span className={errorClassList}>This field is required.</span>}
      {errors.email && errors.email.type === 'maxLength' && <span className={errorClassList}>Please limit your message to 500 characters or less.</span>}

      <button
        type="submit"
        className="content-form-button block relative text-background bg-primary dark:text-background dark:bg-primary border hover:text-primary hover:bg-background transition-all duration-300 text-center text-md py-3 px-8 z-20 my-2"
      >
        Submit
      </button>
    </form>
  )
}

export default Form