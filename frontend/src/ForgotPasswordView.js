import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './Firebase'
import { forgotPassword } from "./FirebaseSignIn"



function ForgotPasswordView() {

  const [email, setEmail] = useState("")
  const navigate = useNavigate();


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
              onClick={() => { forgotPassword(auth,email); navigate('/forgotConfirmation');}}
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