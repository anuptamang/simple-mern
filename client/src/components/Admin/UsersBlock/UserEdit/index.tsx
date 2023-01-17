import Modal from '../../../UI/Modal';
import UserEditForm from './UserEditForm';

const UserEdit = (props: any) => {
  return (
    <Modal {...props}>
      <UserEditForm {...props} />
    </Modal>
  );
};

export default UserEdit;
