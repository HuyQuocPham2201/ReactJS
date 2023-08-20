import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { tokens } from '../theme';
import { FormControl, useTheme } from '@mui/material';
import  { useState, useRef, useEffect, useContext } from 'react';
import { AGVContext_auth } from '../context/AGVAuth';
import APIs from '../apis/APIs';
import { setAuthToken } from '../Components/setAuthToken';


export default function SignIn() {
  const [failed, setFailed] = useState('');
  const theme = useTheme();
  const colours = tokens(theme.palette.mode);
  const userRef = useRef();
  const errRef = useRef(); 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState (''); 
  const [success, setSuccess] = useState(false); 
  const {auth, setAuth} = useContext (AGVContext_auth)

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });
    const loginPayload = {
      username: `${username}`,
      password: `${password}`

  }

 const send = await APIs.post("api/token/", loginPayload)
 //console.log(send)
  .then(response => {
    //get token from response
    const token = response.data.token;
    //Set JWT token to local
    localStorage.setItem("token", token)
    if (localStorage.getItem("token"))
    {
        setAuth ({logged: false});
    }
    
    
    //Set Token
  //  setAuthToken(token);
  //   window.location.href = '/'
  })
  .catch (err => console.log(err));
  setFailed('Wrong Credentials, or account does not exist!')
  };



  // useEffect(() => {
  //   userRef.current.focus();
  // }, [])

  useEffect(() => {
    setErrMsg('');
  }, [username, password]);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    // event.preventDefault();
    // // Add your login logic here
    console.log('Username:', username);
    console.log('Password:', password);
    // // Reset the form
    // setUsername('');
    // setPassword('');
    // setSuccess(true);
    // setAuth ({logged: false});
    // console.log (auth);

   
  };
   
  return (

    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm" >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          // backgroundColor={colours.primary[800]}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" 
          sx = {{fontWeight: "bold", fontSize: "40px"}}>
            Sign In
          </Typography>
          <Box component="form" 
          onSubmit={handleLogin} 
          noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="User Name"
              name="email"
              autoComplete="off"
              value={username}
              onChange={handleUsernameChange}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              //autoComplete="current-password"
              autoComplete="off"
              value = {password}
              onChange={handlePasswordChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, 
              backgroundColor: colours.blueAccent[700],
              fontSize: "medium", 
            }}
              //color = {colours.blueAccent[300]}
              onClick ={handleSubmit}
            >
              Sign In 
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2"
                sx = {{color: "grey"}}
                >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2" sx ={{color: "grey"}}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box>
              <Typography
              sx = {{
                fontWeight: "bold",
                fontSize: "18px",
                textAlign: "center",
                color: "red"

              }}
              >
                {failed}
              </Typography>
            </Box>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
    
  );
}