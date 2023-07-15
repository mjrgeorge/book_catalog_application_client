import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';

export default function MainLayout() {
  return (
    <Box>
      <Navbar />
      <Box
        sx={{
          minHeight: '80vh',
        }}
      >
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}
