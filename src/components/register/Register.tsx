import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { apiRegister } from '../../remote/e-commerce-api/authService';
import { useNavigate } from 'react-router-dom';
import {Tooltip} from '@material-ui/core';



import Navbar from '../navbar/Narbar';

const theme = createTheme();
const emailRegex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
const nameRegex = new RegExp( /^[a-zA-Z\s]*$/);
//Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character: 
const passRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);

export default function Register() {

  let [visible, setVisible] = React.useState({visibility: false});
  let [errorMessage, setErrormessage] = React.useState({errmessage: ""})
  const navigate = useNavigate(); 

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if(!nameRegex.test(`${data.get('firstName')}`) || !nameRegex.test(`${data.get('lastName')}`)){
      setErrormessage({...errorMessage, errmessage: "Name can only contain letters"});
      setVisible({...visible, visibility: true})

    }

    else if(!emailRegex.test(`${data.get('email')}`)){
      setErrormessage({...errorMessage, errmessage: "Email Syntax is incorrect!"});
      setVisible({...visible, visibility: true})
    }

    else if(!passRegex.test(`${data.get('password')}`)){
      setErrormessage({...errorMessage, errmessage: "Password does not follow guidelines!"});
      setVisible({...visible, visibility: true})
    }

    else{
      try {
      const response = await apiRegister(`${data.get('firstName')}`, `${data.get('lastName')}`, `${data.get('email')}`, `${data.get('password')}`)
      if (response.status >= 200 && response.status < 300) {navigate('/login')}
        
      } catch (error: any) {
        
        if(error.code === "ERR_BAD_REQUEST"){
          setErrormessage({...errorMessage, errmessage: "An account has already been registered with this email!"});
          setVisible({...visible, visibility: true})

        }
          
  
      }
      

    }

    
  };

  return (
      <><Navbar /><Container component="main" maxWidth="xs">
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
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
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
                />
              </Grid>
              <Grid item xs={12}>
              <Tooltip title="Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character" placement="right-start">
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password" 
                />
                </Tooltip>
              </Grid>
              

                
            </Grid>
            {visible.visibility ? <div style={{ color: 'red', display: 'block' }}> {errorMessage.errmessage}</div> : <></>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email" />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password" />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container></>
  );
}