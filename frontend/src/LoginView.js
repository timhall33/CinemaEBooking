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
import login from './FirebaseSignIn';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendVerification } from "./FirebaseRegistration";
import { getAuth } from "firebase/auth";
import {app} from './Firebase'
const theme = createTheme();

function LoginView() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();

  const [userAuth, setUserAuth] = useState();


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
              onChange={(e) => setEmail(e.target.value)}
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
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
             
             
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => {login(email,password,navigate, {setUserAuth});}}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
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