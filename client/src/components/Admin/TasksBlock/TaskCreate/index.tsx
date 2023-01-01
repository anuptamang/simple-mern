import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Grid } from '@mui/material'
import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import { delay } from '../../../../utils/delay'
import { notify } from '../../../../utils/notification'
import { tasksSchema } from '../../../../utils/validationSchema'
import { BtnLoading } from '../../../UI/BtnLoading'
import { InputForm } from '../../../UI/InputForm'
import { TaskProps } from '../../../../types/task'

type IFormInput = {
  title: string
  id?: string
  completed?: boolean
  pinned?: boolean
}

type TaskCreateProps = {
  tasks: TaskProps[]
  setTasks: any
}

const TaskCreate = ({ tasks, setTasks }: TaskCreateProps) => {
  const [loading, setLoading] = useState(false)
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IFormInput>({
    defaultValues: {
      title: '',
    },
    resolver: yupResolver(tasksSchema),
  })

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setLoading(true)
    console.log(data)
    await delay(3000)
    setTasks((prev: TaskProps[]) => [
      ...prev,
      { id: uuidv4(), title: data.title },
    ])
    reset()
    setLoading(false)
    notify('Task created successfully', 'task-create-form', 'success')
  }
  return (
    <Box
      onSubmit={handleSubmit(onSubmit)}
      component="form"
      noValidate
      autoComplete="off"
    >
      <Grid container direction={{ xs: 'column', md: 'row' }} spacing={4}>
        <Grid item xs={12} md={6}>
          <Controller
            rules={{ required: true }}
            name="title"
            control={control}
            render={({ field }) => (
              <InputForm fullWidth label="Type here..." {...field} />
            )}
          />
          <p>{errors.title?.message}</p>
        </Grid>
        <Grid item xs={4}>
          <BtnLoading
            variant="contained"
            loading={loading}
            loadingPosition="center"
            type="submit"
          >
            Submit
          </BtnLoading>
        </Grid>
      </Grid>
    </Box>
  )
}

export default TaskCreate
