import Modal from '../../../UI/Modal'
import PostCreateForm from './PostCreateForm'

const PostCreate = (props: any) => {
  return (
    <Modal {...props}>
      <PostCreateForm {...props} />
    </Modal>
  )
}

export default PostCreate
