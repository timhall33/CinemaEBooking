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
import RegisterView from './RegisterView';
import {login, rememberUser} from '../Controls/FirebaseSignIn';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendVerification } from "../Controls/FirebaseRegistration";
import { getAuth } from "firebase/auth";
import {app } from '../Controls/Firebase'
import {auth } from '../Controls/Firebase'
import { useEffect } from 'react';



const theme = createTheme();
function LoginView() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();

  const [userAuth, setUserAuth] = useState();

  const [response, setResponse] = useState("");

  const [click, setClick] = useState("")

  const [rememberMe, setRememberMe] = useState(false)



    return(
        <div id = "LoginViewCont">
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
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              error = { (email.length === 0 && click.length !== 0) || response.toLocaleLowerCase().includes("email") || response.toLocaleLowerCase().includes("user-not-found") || (click.length !== 0 && !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)))}
              helperText = {email.length === 0 && click.length !== 0 ? "Enter an email" : response.toLocaleLowerCase().includes("user-not-found") ? 
              "Account with this email doesn't exist" : (click.length !== 0 && !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) ? "Invalid email format" : response.toLocaleLowerCase().includes("email") ? response : ""  }
              onFocus={(e) => {
                setResponse("")
              }}

              onChange={(e) => {setEmail(e.target.value); console.log(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)))}}  
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              error = { (password.length === 0 && click.length !== 0 )|| response.toLocaleLowerCase().includes("password") || response.toLocaleLowerCase().includes("user-not-found")}
              name="password"
              label="Password"
              type="password"
              id="password"
              helperText = {password.length === 0 && click.length !== 0 ? "Enter a password" : response.toLocaleLowerCase().includes("password") ? response : response.toLocaleLowerCase().includes("user-not-found") ? "No account with the provided email exists with this password " : "" }
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              onFocus={(e) => {
                setResponse("")
              }}
              
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"

              onChange={(e) => setRememberMe(e.target.checked)}
           


            />
            <Button
             
             value="clicked"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={(e) => {
                
                setClick(e.target.value)

                  login(email,password,navigate, {setUserAuth, setResponse, rememberMe});
                
               
                



             
             
            
            }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/forgotpassword" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href='/register' variant="body2">
                  {"Don't have an account? Register"}
                </Link>
              </Grid>
            </Grid>
            { userAuth === false && (
             <div>
              <Typography> You have not verified your email </Typography>
              <Button fullWidth
            variant="contained"
            color="primary"
            value="clicked"
            onClick={() => sendVerification(getAuth(app))}  >Resend Vertification</Button>
             </div>

            )
             
            }
          </Box>
        </Box>
      </Container>
    </div>
    )
}
export default LoginView;