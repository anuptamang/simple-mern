import { List, ListItem, ListItemText } from '@mui/material';
import { UserIcon } from 'components/UI/Icons';
import { useAuth } from 'hooks/useAuth';

function AdminSummary() {
  const auth = useAuth();
  return (
    <List sx={{ width: '100%' }}>
      <ListItem>
        <UserIcon color="#fff" />
        <ListItemText
          primary={auth?.result?.fullName}
          secondary={auth?.result?.email}
          sx={{
            paddingLeft: '5px',
            color: '#fff',
            '& .MuiListItemText-secondary': { color: '#fff' },
            '.MuiListItemText-primary': {
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              display: 'block',
              width: '200px',
              overflow: 'hidden',
            },
          }}
        />
      </ListItem>
    </List>
  );
}

export default AdminSummary;
