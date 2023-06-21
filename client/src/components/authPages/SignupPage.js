import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import LoadingButton from '@mui/lab/LoadingButton';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { setAuthenticated } from '../../actions/userAuthAction';
import { useDispatch } from 'react-redux';

const theme = createTheme();

export function SignupPage() {
    //state
    const [isChecked, setIsChecked] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const navigate = useNavigate();


    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setErrors({});
        const formData = new FormData(event.currentTarget);
        try {
            const res = await fetch(`${process.env.REACT_APP_PATH}/api/signup`, {
                method: 'POST',
                body: JSON.stringify({
                    email: formData.get('email'),
                    password: formData.get('password'),
                    username: formData.get('username')
                }),
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await res.json();
            checkResult(data);
        } catch (e) {
            console.log(e);
        }
    };

    const checkResult = (data) => {
        if (data.errors) {
            setLoading(false);
            setErrors(data.errors);
            console.log(data.errors)
        } if (data.user) {
            //save user id in the browser
            sessionStorage.setItem('user', data.user);
            dispatch(setAuthenticated(true));
            return navigate('/');
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="family-name"
                                    error={Boolean(errors.username)} // check for an error
                                    helperText={errors.username} // show error message
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    type="email"
                                    error={Boolean(errors.email)} // check for an error
                                    helperText={errors.email} // show error message
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    error={Boolean(errors.password)} // check for an error
                                    helperText={errors.password} // show error message
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox checked={isChecked} onChange={handleCheckboxChange} color="primary" />}
                                    label="I am fully aware that this website is for testing purposes only, and it is crucial that I do not share any personal information under any circumstances."
                                />
                            </Grid>
                        </Grid>
                        <LoadingButton
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={!isChecked}
                            loading={loading}
                            loadingIndicator="Loading…"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </LoadingButton>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link to='/login' >
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
