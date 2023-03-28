import * as React from 'react';
//@mui
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import styled from '@mui/material/styles/styled';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
//other
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { setAuthenticated } from '../../actions/userAuthAction';
import {logout} from '../../utils/AuthUtils'


export default function ButtonAppBar() {

  // Component state
  const isAuthenticated = useSelector((state) => state.userAuth.isLogged)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  // Utils
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
    // Utilized to resolve a bug found in the Brave browser. the token jwt dont expires after the end of the session!
    if(!Boolean(sessionStorage.getItem('user'))){
      logout();
    }
  }, [dispatch,navigate]);

  // Logout button event
  const handleLogout = async () => {
    setAnchorEl(null);
    sessionStorage.removeItem('user');
    dispatch(setAuthenticated(false));
    logout();
    return navigate('/login');
  };

  //personalized component
  const StyledLink = styled(Link)({
    textDecoration: 'none',
    color: 'inherit',
    '&:hover': {
      color: 'orange'
    },
  });

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
            <MenuItem component={Link} to={'/profile'} onClick={handleClose}> Profile </MenuItem>
            <MenuItem component={Link} to={'/dashboard'} onClick={handleClose}> My dashboard </MenuItem>
            {isAuthenticated
              ? <MenuItem onClick={handleLogout}>Logout</MenuItem>
              : <MenuItem component={Link} to={'/login'} onClick={handleClose}> Login </MenuItem>
            }
          </Menu>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}
          >
          <StyledLink to='/'>FullStack Authentication</StyledLink>
          </Typography>
          {isAuthenticated
            ? <Button color="inherit" onClick={handleLogout} sx={{ mr: 2 }}>Logout </Button>
            :
            <>
              <Button color="inherit" component={Link} to={'/login'} sx={{ mr: 2 }}>
                Login
              </Button>
              <Button color="inherit" component={Link} to={'/signup'} >
                SignUp
              </Button>
            </>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}