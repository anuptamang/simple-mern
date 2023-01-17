import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { Box, List, ListItem, Typography } from '@mui/material';
import { UserInfo } from 'types';

type UsersProps = {
  users: UserInfo[];
  handleEdit: any;
  handleDelete: any;
};

const UsersBlock = ({ users, handleEdit, handleDelete }: UsersProps) => {
  return (
    <>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          background: '#787b7c',
          borderRadius: '8px',
          padding: '15px 25px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: '20px',
            alignItems: 'center',
            width: '50px',
          }}
        >
          <Typography sx={{ color: '#fff' }}>S.N.</Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: '20px',
            alignItems: 'center',
            textAlign: 'left',
            width: '40%',
          }}
        >
          <Typography sx={{ color: '#fff' }}>Full Name</Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: '20px',
            alignItems: 'center',
            width: '40%',
          }}
        >
          <Typography sx={{ color: '#fff' }}>Email</Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: '20px',
            alignItems: 'center',
            width: 'calc(20% - 50px)',
          }}
        >
          Action
        </Box>
      </Box>
      <List sx={{ marginBottom: '100px' }}>
        {users?.map((user: UserInfo, key) => (
          <ListItem key={user._id} sx={{ padding: '0', marginBottom: '10px' }}>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                background: '#fff',
                borderRadius: '8px',
                padding: '15px 25px',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  gap: '20px',
                  alignItems: 'center',
                  width: '50px',
                }}
              >
                <Typography sx={{ color: '#333' }}>{key + 1}</Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  gap: '20px',
                  alignItems: 'center',
                  textAlign: 'left',
                  width: '40%',
                }}
              >
                <Typography sx={{ color: '#333' }}>{user.fullName}</Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  gap: '20px',
                  alignItems: 'center',
                  width: '40%',
                }}
              >
                <Typography sx={{ color: '#333' }}>{user.email}</Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  gap: '20px',
                  alignItems: 'center',
                  width: 'calc(20% - 50px)',
                }}
              >
                <EditOutlinedIcon
                  onClick={() => handleEdit(user?._id && user._id)}
                  sx={{ color: '#919294', cursor: 'pointer' }}
                />
                <HighlightOffOutlinedIcon
                  onClick={() => handleDelete(user?._id && user._id)}
                  sx={{ color: '#919294', cursor: 'pointer' }}
                />
              </Box>
            </Box>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default UsersBlock;
