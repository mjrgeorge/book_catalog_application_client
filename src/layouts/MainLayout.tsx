import { Box, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';

export default function MainLayout() {
  return (
    <Box>
      <Navbar />
      <Toolbar />
      <Box
        sx={{
          minHeight: '100vh',
        }}
      >
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}
