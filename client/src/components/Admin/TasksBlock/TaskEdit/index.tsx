import Modal from '../../../UI/Modal'
import TaskEditForm from './TaskEditForm'

const TaskEdit = (props: any) => {
  return (
    <Modal {...props}>
      <TaskEditForm {...props} />
    </Modal>
  )
}

export default TaskEdit
