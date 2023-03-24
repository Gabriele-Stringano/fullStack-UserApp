import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'
import { setAuthenticated } from '../../actions/userAuthAction';

export default function ButtonAppBar() {

//Component state
  const isAuthenticated = useSelector((state) =>  state.userAuth.isLogged)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

//utils
  const navigate = useNavigate();
  const dispatch = useDispatch();

//appBar clickMenu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    dispatch(setAuthenticated(Boolean(sessionStorage.getItem('user'))));
  }, [dispatch,]);

  //Logout button event
  const handleLogout = async () => {
    sessionStorage.removeItem('user');
    dispatch(setAuthenticated(false));
      await fetch("/api/logout", {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
  });
    return navigate('/login');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}
          >
            <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
              FullStack-UserApp
            </Link>
          </Typography>
          {isAuthenticated
            ? <Button color="inherit"
            onClick={handleLogout}
              sx={{ mr: 2 }}
            >
              Logout
            </Button>
            : <>
              <Button color="inherit"
                component={Link}
                to={'/login'}
                sx={{ mr: 2 }}
              >
                Login
              </Button>
              <Button color="inherit"
                component={Link}
                to={'/signup'}
              >
                SignUp
              </Button> </>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}