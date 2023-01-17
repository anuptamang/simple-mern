import Modal from '../../../UI/Modal';
import UserDeleteForm from './UserDeleteForm';

const UserDelete = (props: any) => {
  return (
    <Modal {...props}>
      <UserDeleteForm {...props} />
    </Modal>
  );
};

export default UserDelete;
