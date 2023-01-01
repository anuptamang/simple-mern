import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import { delay } from '../../../../utils/delay'
import { notify } from '../../../../utils/notification'
import { postCreateFormSchema } from '../../../../utils/validationSchema'
import PostForm from '../../../UI/CreateForm'
import { PostProps } from '../../../../types/post'

type IFormInput = {
  id?: string | number
  title: string
  author: string
  status: { [x: string]: string }[]
  date?: string | number
  body: string
}

const PostCreateForm = ({ setRows, handleClose }: any) => {
  const [loading, setLoading] = useState(false)
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IFormInput>({
    defaultValues: {
      id: '',
      title: '',
      author: '',
      status: [],
      date: '',
      body: '',
    },
    resolver: yupResolver(postCreateFormSchema),
  })

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setLoading(true)
    await delay(3000)
    handleClose()
    reset()
    setRows((prev: PostProps[]) => [
      ...prev,
      {
        id: uuidv4(),
        title: data.title,
        author: data.author,
        status: data.status,
        date: data.date,
        body: data.body,
      },
    ])
    setLoading(false)
    notify('Post created successfully', 'post-update-form', 'success')
  }

  return (
    <PostForm
      control={control}
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
      loading={loading}
      errors={errors}
      formTitle="Create a Post"
    />
  )
}

export default PostCreateForm
