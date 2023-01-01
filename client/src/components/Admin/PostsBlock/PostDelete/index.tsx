import Modal from '../../../UI/Modal'
import PostDeleteForm from './PostDeleteForm'

const PostDelete = (props: any) => {
  return (
    <Modal {...props}>
      <PostDeleteForm {...props} />
    </Modal>
  )
}

export default PostDelete
