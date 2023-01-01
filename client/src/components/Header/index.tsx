import MenuIcon from '@mui/icons-material/Menu'
import {
  AppBar,
  Avatar,
  Box,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material'
import { MouseEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { nav } from '../../data/static/nav'
import { useAuth } from '../../hooks/useAuth'
import { logout } from '../../redux/auth/authAction'
import { authSelector } from '../../redux/auth/authSlice'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { BtnLoading } from '../UI/BtnLoading'
import Link from '../UI/Link'
import NavLink from '../UI/NavLink'

interface Props {
  window?: () => Window
}

const drawerWidth = 240

const Header = (props: Props) => {
  const { window } = props
  const { user } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)
  const { loading } = useAppSelector(authSelector)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState)
  }

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

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
  )
  const container =
    window !== undefined ? () => window().document.body : undefined

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
            {user ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Jon Doe" src="/static/images/avatar/2.jpg" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{
                    mt: '45px',
                    color: '#fff',
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
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">
                      <NavLink
                        sx={{
                          color: '#333',
                          '&:hover': {
                            color: '#fff',
                          },
                          '&.active': {
                            color: '#057aef',
                          },
                        }}
                        href="/user/dashboard"
                      >
                        Dashboard
                      </NavLink>
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">
                      <NavLink
                        sx={{
                          color: '#333',
                          '&:hover': {
                            color: '#fff',
                          },
                          '&.active': {
                            color: '#057aef',
                          },
                        }}
                        href="/user/posts"
                      >
                        Posts
                      </NavLink>
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">
                      <NavLink
                        sx={{
                          color: '#333',
                          '&:hover': {
                            color: '#fff',
                          },
                          '&.active': {
                            color: '#057aef',
                          },
                        }}
                        href="/user/tasks"
                      >
                        Tasks
                      </NavLink>
                    </Typography>
                  </MenuItem>
                  <MenuItem>
                    <Typography textAlign="center">
                      <BtnLoading
                        loading={loading}
                        sx={{
                          color: '#333',
                          '&:hover': {
                            color: '#fff',
                          },
                        }}
                        onClick={() => dispatch(logout(navigate))}
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
  )
}

export default Header
