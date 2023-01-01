import MenuIcon from '@mui/icons-material/Menu';
import { Box, Drawer, IconButton } from '@mui/material';
import { useState } from 'react';
import Sidebar from '../../UI/Sidebar';
import Nav from './Nav';

interface Props {
  window?: () => Window;
}

const drawerWidth = 240;

const AdminSidebar = (props: Props) => {
  const { window } = props;
  const container =
    window !== undefined ? () => window().document.body : undefined;

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = <Nav onClick={handleDrawerToggle} />;

  return (
    <Sidebar>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ mr: 2, display: { sm: 'none' } }}
      >
        <MenuIcon />
      </IconButton>
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <Nav onClick={handleDrawerToggle} />
      </Box>
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
    </Sidebar>
  );
};

export default AdminSidebar;
