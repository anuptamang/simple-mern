import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { DashboardIcon, PostsIcon, TasksIcon } from '../../UI/Icons';
import NavLink from '../../UI/NavLink';

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
            <DashboardIcon color="#fff" />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
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
            <PostsIcon color="#fff" />
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
            <TasksIcon color="#fff" />
          </ListItemIcon>
          <ListItemText primary="Tasks" />
        </NavLink>
      </ListItem>
    </List>
  );
};

export default NavList;
