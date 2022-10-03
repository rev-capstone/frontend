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
import { apiLogin } from '../../remote/e-commerce-api/authService';
import { useNavigate } from 'react-router-dom';
import { Visibility } from '@material-ui/icons';
import styled from "styled-components"

const LoginText = styled.div`
  color: white;
  padding-top: 165px;
  margin-left: 100px;
`;

const LoginTextContainer = styled.div`
  width: 50vw;
  height: 80vh;
`;
const theme = createTheme();
const emailRegex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);


export default function Login() {

  let [visible, setVisible] = React.useState({visibility: false});
  let [errorMessage, setErrormessage] = React.useState({errmessage: ""})

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if(emailRegex.test(`${data.get('email')}`)){

      try{
        const response = await apiLogin(`${data.get('email')}`, `${data.get('password')}`);

        if (response.status >= 200 && response.status < 300) navigate('/products')
      }

      catch(error: any){

        if(error.code == "ERR_BAD_REQUEST"){

          setErrormessage({...errorMessage, errmessage: "Username or password is incorrect!"});
          setVisible({...visible, visibility: true})
        }

      }
    }
    else{
      setErrormessage({...errorMessage, errmessage: "Invalid email"});
          setVisible({...visible, visibility: true})
    }
  };
  return (
    // style={{backgroundColor: "black", height: "100vh"}}
      <div style={{backgroundImage: "url(" + "https://i.ibb.co/j316hw0/bg3.jpg" + ")", height: "100vh", width: "100vw", backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "cover"}}>
      
       
        <LoginTextContainer>
          <LoginText>
           <h1 className="text-gradient" style={{ marginLeft: "80px", fontSize: "80px"}}>Coder's Closet</h1>
           <h1 style={{ marginLeft: "80px", fontSize: "70px"}}>For Coders</h1>
           <h1 style={{ marginLeft: "80px", fontSize: "70px"}}>By Coders</h1>
           <p style= {{ paddingTop: "10px", marginLeft: "80px",fontSize: "20px"}}>
            We are fueling the future of Full-Stack Developers
           </p>
           <p style= {{ marginLeft: "80px", fontSize: "20px"}}>
           by providing the best performance gear in the game
           </p>

          </LoginText>
          
        
    
        <Container style={{marginLeft: "900px", marginTop: "-400px", background: "white", paddingBottom: "50px", borderRadius: "5px", paddingTop: "5px", height: "425px" }} component="main" maxWidth="xs">
      <Box style={{marginTop: "20px"}}
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >

        <Avatar sx={{ m: 1, bgcolor: 'black'}}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            inputProps={{maxLength: 255}}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            style={{
              backgroundColor: "#ffffff"
            }} />
          <TextField
            inputProps={{maxLength: 255}}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            style={{
              backgroundColor: "#ffffff"
            }} />

          {visible.visibility ? <div style={{ color: 'red', display: 'block' }}> Email/password is incorrect</div> : <></>}

          <Button
            style={{ background: "radial-gradient(60.18% 64.18% at 61.16% 15.69%,#FD9346 55.12%, #FD7F2C 71.54%, #FF6200 100%)"}}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
    </LoginTextContainer>
    </div>
  );
}