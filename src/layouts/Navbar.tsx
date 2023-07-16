import { auth } from '@/lib/firebase';
import { setUser } from '@/redux/features/user/userSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import MoreIcon from '@mui/icons-material/MoreVert';
import SchoolIcon from '@mui/icons-material/School';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { signOut } from 'firebase/auth';
import * as React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    signOut(auth).then(() => {
      dispatch(setUser(null));
    });
    handleMobileMenuClose();
  };

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleMobileMenuClose}>
        <IconButton size="large" color="inherit">
          <LibraryBooksIcon />
        </IconButton>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          All Book
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMobileMenuClose}>
        <IconButton size="large" color="inherit">
          <MenuBookIcon />
        </IconButton>
        <Link
          to="/recent_book"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          Recent Book
        </Link>
      </MenuItem>
      {!user.email && (
        <MenuItem onClick={handleMobileMenuClose}>
          <IconButton size="large" color="inherit">
            <AppRegistrationIcon />
          </IconButton>
          <Link
            to="/signup"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            Signup
          </Link>
        </MenuItem>
      )}
      {!user.email && (
        <MenuItem onClick={handleMobileMenuClose}>
          <IconButton size="large" color="inherit">
            <LoginIcon />
          </IconButton>
          <Link
            to="/login"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            Login
          </Link>
        </MenuItem>
      )}
      {user.email && (
        <MenuItem onClick={handleLogout}>
          <IconButton size="large" color="inherit">
            <LogoutIcon />
          </IconButton>
          <p>Logout</p>
        </MenuItem>
      )}
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <SchoolIcon />
            </IconButton>
          </Link>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              Book Catalog App
            </Link>
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Button color="inherit" sx={{ marginRight: 2 }}>
              <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                All Book
              </Link>
            </Button>
            <Button color="inherit" sx={{ marginRight: 2 }}>
              <Link
                to="/recent_book"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                Recent Book
              </Link>
            </Button>
            {!user.email && (
              <Button color="inherit" sx={{ marginRight: 2 }}>
                <Link
                  to="/signup"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  Signup
                </Link>
              </Button>
            )}
            {!user.email && (
              <Button color="inherit" sx={{ marginRight: 2 }}>
                <Link
                  to="/login"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  Login
                </Link>
              </Button>
            )}
            {user.email && (
              <Button
                color="inherit"
                sx={{ marginRight: 2 }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            )}
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
}
export default Navbar;
