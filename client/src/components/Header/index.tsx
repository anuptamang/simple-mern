import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Box,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import { UserIcon } from 'components/UI/Icons';
import { MouseEvent, useState } from 'react';
import { nav } from '../../data/static/nav';
import { useAuth } from '../../hooks/useAuth';
import { logout } from '../../redux/auth/authAction';
import { authSelector } from '../../redux/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { BtnLoading } from '../UI/BtnLoading';
import Link from '../UI/Link';
import NavLink from '../UI/NavLink';

interface Props {
  window?: () => Window;
}

const drawerWidth = 240;

const Header = (props: Props) => {
  const { window } = props;
  const auth = useAuth();

  const [mobileOpen, setMobileOpen] = useState(false);
  const { loading } = useAppSelector(authSelector) as any;
  const dispatch = useAppDispatch();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <Link href="/">My App</Link>
      </Typography>
      <List>
        {nav.map((item, key) => (
          <ListItem key={key} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <NavLink
                href={item.to}
                key={key}
                sx={{
                  color: '#333',
                  '&.active': { color: '#057aef' },
                }}
              >
                {item.text}
              </NavLink>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <AppBar
        component="nav"
        color="primary"
        sx={{ backgroundImage: 'none', px: 0 }}
        enableColorOnDark
      >
        <Container>
          <Toolbar sx={{ px: 0 }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon sx={{ color: '#fff' }} />
            </IconButton>
            <Typography
              component="div"
              sx={{
                flexGrow: 1,
                display: { xs: 'none', sm: 'block' },
              }}
            >
              <Link sx={{ color: '#fff' }} href="/">
                My App
              </Link>
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              {nav.map((item, key) => (
                <NavLink
                  href={item.to}
                  key={key}
                  sx={{
                    color: '#fff',
                    '&.active': { color: '#057aef' },
                    marginRight: '20px',
                  }}
                >
                  {item.text}
                </NavLink>
              ))}
            </Box>
            {auth?.token ? (
              <Box sx={{ flexGrow: 0 }}>
                <List sx={{ width: '100%' }}>
                  <ListItem
                    onClick={handleOpenUserMenu}
                    sx={{ cursor: 'pointer' }}
                  >
                    <UserIcon color="#fff" />
                    <ListItemText
                      primary={auth?.result?.fullName}
                      secondary=""
                      sx={{
                        paddingLeft: '5px',
                        color: '#fff',
                        '& .MuiListItemText-secondary': { color: '#fff' },
                        '.MuiListItemText-primary': {
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis',
                          display: 'block',
                          maxWidth: '200px',
                          overflow: 'hidden',
                        },
                      }}
                    />
                  </ListItem>
                </List>

                <Menu
                  sx={{
                    mt: '45px',
                    color: '#fff',
                    '.MuiMenu-list': { background: '#303033' },
                    '.MuiMenuItem-root': {
                      padding: 0,
                      display: 'block',
                    },
                    '.MuiLink-root': {
                      padding: '5px 15px',
                    },
                  }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem>
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
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography>
                      <NavLink
                        sx={{
                          display: 'block',
                          color: '#fff',
                          '&:hover': {
                            color: '#f1f1f1',
                          },
                          '&.active': {
                            color: '#f1f1f1',
                          },
                        }}
                        href="/user/dashboard"
                      >
                        Dashboard
                      </NavLink>
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography>
                      <NavLink
                        sx={{
                          display: 'block',
                          color: '#fff',
                          '&:hover': {
                            color: '#f1f1f1',
                          },
                          '&.active': {
                            color: '#f1f1f1',
                          },
                        }}
                        href="/user"
                      >
                        Profile
                      </NavLink>
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography>
                      <NavLink
                        sx={{
                          display: 'block',
                          color: '#fff',
                          '&:hover': {
                            color: '#f1f1f1',
                          },
                          '&.active': {
                            color: '#f1f1f1',
                          },
                        }}
                        href="/user/settings"
                      >
                        Settings
                      </NavLink>
                    </Typography>
                  </MenuItem>
                  <MenuItem>
                    <Typography>
                      <BtnLoading
                        loading={loading}
                        sx={{
                          display: 'block',
                          width: '100%',
                          textAlign: 'left',
                          color: '#fff',
                          background: 'none !important',
                          boxShadow: 'none',
                          paddingLeft: '15px',
                          paddingRight: '15px',
                          textTransform: 'capitalize',
                          '&:hover': {
                            color: '#f1f1f1',
                          },
                        }}
                        onClick={() => dispatch(logout())}
                      >
                        Logout
                      </BtnLoading>
                    </Typography>
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <NavLink
                href={'/login'}
                sx={{
                  color: '#fff',
                  '&.active': { color: '#057aef' },
                }}
              >
                Login
              </NavLink>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
};

export default Header;
