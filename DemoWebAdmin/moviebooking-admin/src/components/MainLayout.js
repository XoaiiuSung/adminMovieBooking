import React, { useState, useContext } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { 
  Box, 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Divider, 
  Typography, 
  Button, 
  AppBar, 
  Toolbar, 
  IconButton 
} from '@mui/material';
import { 
  AccountCircle, 
  Movie as MovieIcon, 
  Event as ShowtimeIcon, 
  Logout as LogoutIcon, 
  Menu as MenuIcon 
} from '@mui/icons-material';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

// Thêm interceptor để gửi token trong header
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const MainLayout = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const drawerWidth = 240;

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleMenuItemClick = (path) => {
    navigate(path);
    setIsDrawerOpen(false);
  };

  const handleLogout = () => {
    logout();
    localStorage.removeItem('token');
    setIsDrawerOpen(false);
    navigate('/');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
        <Toolbar>
          <Button color="inherit" onClick={() => navigate('/')}>
            Trang chủ
          </Button>
          <Box sx={{ flexGrow: 1 }} />
          {user && (
            <IconButton
              edge="end"
              color="inherit"
              onClick={toggleDrawer}
              sx={{ marginRight: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: 'calc(100vh - 64px)',
          overflow: 'auto',
        }}
      >
        <Outlet />
      </Box>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#f5f5f5',
          },
        }}
        variant="temporary"
        anchor="right"
        open={isDrawerOpen}
        onClose={toggleDrawer}
      >
        <Box sx={{ padding: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
            Movie Management
          </Typography>
        </Box>
        <Divider />
        <List>
          <ListItem button onClick={() => handleMenuItemClick('/account')}>
            <ListItemIcon>
              <AccountCircle sx={{ color: '#1976d2' }} />
            </ListItemIcon>
            <ListItemText primary="Tài khoản" />
          </ListItem>
          <ListItem button onClick={() => handleMenuItemClick('/accounts/add')}>
            <ListItemIcon>
              <AccountCircle sx={{ color: '#1976d2' }} />
            </ListItemIcon>
            <ListItemText primary="Tạo tài khoản" />
          </ListItem>
          <ListItem button onClick={() => handleMenuItemClick('/movies')}>
            <ListItemIcon>
              <MovieIcon sx={{ color: '#1976d2' }} />
            </ListItemIcon>
            <ListItemText primary="Movie" />
          </ListItem>
          <ListItem button onClick={() => handleMenuItemClick('/showtimes')}>
            <ListItemIcon>
              <ShowtimeIcon sx={{ color: '#1976d2' }} />
            </ListItemIcon>
            <ListItemText primary="Showtime" />
          </ListItem>
        </List>
        <Divider />
        <Box sx={{ padding: 2, marginTop: 'auto' }}>
          <Button
            variant="contained"
            color="error"
            startIcon={<LogoutIcon />}
            fullWidth
            onClick={handleLogout}
          >
            Đăng xuất
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
};

export default MainLayout;