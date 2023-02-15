import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import ChatIcon from '@mui/icons-material/Chat';
import { DashboardIcon, PostsIcon, TasksIcon } from '../../UI/Icons';
import NavLink from '../../UI/NavLink';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const NavList = () => {
  return (
    <List>
      <ListItem>
        <NavLink
          href="/user/dashboard"
          sx={{
            color: '#fff',
            '&.active': { color: '#057aef' },
            display: 'flex',
          }}
        >
          <ListItemIcon>
            <DashboardIcon sx={{ color: '#fff' }} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </NavLink>
      </ListItem>
      <ListItem>
        <NavLink
          href="/user/profile"
          sx={{
            color: '#fff',
            '&.active': { color: '#057aef' },
            display: 'flex',
          }}
        >
          <ListItemIcon>
            <AccountCircleIcon sx={{ color: '#fff' }} />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </NavLink>
      </ListItem>
      <ListItem>
        <NavLink
          href="/user/chat"
          sx={{
            color: '#fff',
            '&.active': { color: '#057aef' },
            display: 'flex',
          }}
        >
          <ListItemIcon>
            <ChatIcon sx={{ color: '#fff' }} />
          </ListItemIcon>
          <ListItemText primary="Chat" />
        </NavLink>
      </ListItem>
      <ListItem>
        <NavLink
          href="/user/posts"
          sx={{
            color: '#fff',
            '&.active': { color: '#057aef' },
            display: 'flex',
          }}
        >
          <ListItemIcon>
            <PostsIcon sx={{ color: '#fff' }} />
          </ListItemIcon>
          <ListItemText primary="Posts" />
        </NavLink>
      </ListItem>
      <ListItem>
        <NavLink
          href="/user/tasks"
          sx={{
            color: '#fff',
            '&.active': { color: '#057aef' },
            display: 'flex',
          }}
        >
          <ListItemIcon>
            <TasksIcon sx={{ color: '#fff' }} />
          </ListItemIcon>
          <ListItemText primary="Tasks" />
        </NavLink>
      </ListItem>
      <ListItem>
        <NavLink
          href="/user/settings"
          sx={{
            color: '#fff',
            '&.active': { color: '#057aef' },
            display: 'flex',
          }}
        >
          <ListItemIcon>
            <SettingsIcon sx={{ color: '#fff' }} />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </NavLink>
      </ListItem>
    </List>
  );
};

export default NavList;
