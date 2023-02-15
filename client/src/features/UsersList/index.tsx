import { Grid } from '@mui/material';
import UsersListSection from 'components/Admin/UsersBlock/UserList';
import UserDelete from 'components/Admin/UsersBlock/UserDelete';
import UserEdit from 'components/Admin/UsersBlock/UserEdit';
import Loading from 'components/UI/Loading';
import { useAuth } from 'hooks/useAuth';
import { useEffect, useState } from 'react';
import { getAllusers, getUserById } from 'redux/auth/authAction';
import { authSelector } from 'redux/auth/authSlice';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { UserInfo } from 'types';

type UsersListProps = {
  isProfile: boolean;
};

const UsersList = ({ isProfile }: UsersListProps) => {
  const dispatch = useAppDispatch();
  const auth = useAuth();
  const { users, singleUser, loading } = useAppSelector(authSelector);
  const [usersList, setUsersList] = useState<UserInfo[]>([]);

  const [editItem, setEditItem] = useState<UserInfo>();
  const [deleteId, setDeleteId] = useState<string | undefined>('');

  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  const handleEdit = (id: string | undefined) => {
    handleOpenEdit();
    if (usersList?.length > 0) {
      const toEdit = usersList?.find((user: UserInfo) => user._id === id);
      setEditItem(toEdit);
    }
  };
  const handleDelete = (id: string | undefined) => {
    handleOpenDelete();
    setDeleteId(id);
  };

  useEffect(() => {
    if (isProfile) {
      singleUser && setUsersList([singleUser]);
    } else {
      users && setUsersList(users);
    }
  }, [users, singleUser, isProfile]);

  useEffect(() => {
    dispatch(getAllusers());
  }, [dispatch]);

  useEffect(() => {
    if (auth?.result?._id) {
      dispatch(getUserById(auth?.result?._id));
    }
  }, [auth?.result?._id, dispatch]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Grid container justifyContent="flex-end">
            <UserEdit
              editItem={editItem}
              setUsersList={setUsersList}
              users={usersList}
              open={openEdit}
              handleClose={handleCloseEdit}
            />
            <UserDelete
              setUsersList={setUsersList}
              users={usersList}
              deleteId={deleteId}
              open={openDelete}
              handleClose={handleCloseDelete}
            />
          </Grid>
          <UsersListSection
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            users={usersList}
          />
        </>
      )}
    </>
  );
};

export default UsersList;
