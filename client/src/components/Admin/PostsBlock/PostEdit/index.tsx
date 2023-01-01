import Modal from '../../../UI/Modal'
import PostEditForm from './PostEditForm'

const PostEdit = (props: any) => {
  return (
    <Modal {...props}>
      <PostEditForm {...props} />
    </Modal>
  )
}

export default PostEdit
