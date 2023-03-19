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
import ForgotPasswordConfirmation from './ForgotPasswordConfirmation';

const theme = createTheme();

function ForgotPasswordView() {

  const [email, setEmail] = useState("")
  const navigate = useNavigate();
  const navigateToForgotConfirmation=()=> {
    navigate('/forgotConfirmation');
  };

  const [userAuth, setUserAuth] = useState();


    return(
        <div id = "ForgotPasswordViewCont">
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
            Forgot Password
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            Enter Email:
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
            <Button
             
             
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={navigateToForgotConfirmation}
            >
              Continue
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
    )
}
export default ForgotPasswordView;