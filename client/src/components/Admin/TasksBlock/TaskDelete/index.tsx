import Modal from '../../../UI/Modal'
import TaskDeleteForm from './TaskDeleteForm'

const TaskDelete = (props: any) => {
  return (
    <Modal {...props}>
      <TaskDeleteForm {...props} />
    </Modal>
  )
}

export default TaskDelete
