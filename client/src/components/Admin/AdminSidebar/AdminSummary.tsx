import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';

function AdminSummary() {
  return (
    <List sx={{ width: '100%' }}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>image</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Jon Doe"
          secondary="Admin"
          sx={{
            color: '#fff',
            '& .MuiListItemText-secondary': { color: '#fff' },
          }}
        />
      </ListItem>
    </List>
  );
}

export default AdminSummary;
