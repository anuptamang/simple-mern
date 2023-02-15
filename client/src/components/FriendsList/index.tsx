import { Box } from '@mui/material';
import Search from 'components/Search';
import { useAuth } from 'hooks/useAuth';
import useDebounce from 'hooks/useDebounce';
import { useEffect, useState } from 'react';
import { getAllusers } from 'redux/auth/authAction';
import { authSelector } from 'redux/auth/authSlice';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { UserInfo } from 'types';

type Props = {};

const FriendsList = (props: Props) => {
  const auth = useAuth();
  const dispatch = useAppDispatch();
  const { users } = useAppSelector(authSelector);
  const [usersList, setUsersList] = useState<UserInfo[]>([]);
  const [displayList, setDisplayList] = useState<UserInfo[]>([]);

  const [searchQuery, setSearchQuery] = useState('');
  const searchTerm = useDebounce(searchQuery, 1000);

  useEffect(() => {
    dispatch(getAllusers());
  }, [dispatch]);

  useEffect(() => {
    if (users?.length > 0 && auth?.result) {
      const friends = [...users].filter(
        (user: UserInfo) => user._id !== auth.result?._id
      );
      setUsersList(friends);
      setDisplayList(friends);
    }
  }, [auth.result, users]);

  useEffect(() => {
    if (searchTerm) {
      const friends = [...usersList].filter((user: UserInfo) => {
        if (user?.fullName) {
          const dbName = user.fullName.toUpperCase();
          const searchName = searchTerm.toUpperCase();
          return dbName.includes(searchName);
        }
      });
      setDisplayList(friends);
    } else {
      setDisplayList(usersList);
    }
  }, [dispatch, searchTerm]);

  return (
    <>
      <Search setSearchQuery={setSearchQuery} />
      {displayList.length > 0 ? (
        <>
          {displayList.map((user: UserInfo, key: number) => (
            <Box key={key} sx={{ marginBottom: '10px' }}>
              {key + 1}. {user.fullName}
            </Box>
          ))}
        </>
      ) : (
        'No Friends Found!'
      )}
    </>
  );
};

export default FriendsList;
