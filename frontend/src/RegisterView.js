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
import { createTheme, ThemeProvide, makeStyles } from '@mui/material/styles';
import RegConfirmation from './RegConfirmation';
import { Redirect, useNavigate } from "react-router-dom";
import register from './FirebaseRegistration'
import {useState} from 'react';

import { useEffect } from 'react';
import { useMemo } from 'react';

const theme = createTheme();



function RegisterView() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [promotionStatus, setPromotionStatus] = useState(false);

  const [click, setClick] = useState('')
  const [response, setResponse] = useState('')




  const navigateToConfirmation=()=> {
    navigate('/confirmation');
  };

  // declare a new state variable for modal open
  const [open, setOpen] = useState(false);

  // function to handle modal open
  const handleOpen = () => {
    setOpen(true);
  };

  // function to handle modal close
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(firstName, lastName, email, password, phoneNumber);
    handleClose();
  };



  


    return(
        <div id = "RegisterViewCont">
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
            Become A New Member
          </Typography>
          <form  noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                
                error = {click.length !== 0 && firstName.length === 0}
                helperText= {click.length !== 0 && firstName.length === 0 ? "Please enter a first name": ""}
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={lastName}
                error = {click.length !== 0 && lastName.length === 0}
                helperText= {click.length !== 0 && lastName.length === 0 ? "Please enter a last name": ""}
                onChange={e => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="phone"
                label="Phone Number"
                name="phone"
                autoComplete="phone"
                value={phoneNumber}
                error = {(click.length !== 0 && phoneNumber.length === 0) || (click.length !== 0 && (phoneNumber.length > 10 || phoneNumber.length < 10)) || (click.length !== 0 && phoneNumber.match(/^[0-9]+$/) === null)}
                helperText= {click.length !== 0 && phoneNumber.length === 0 ? "Please enter a phone number": click.length !== 0 && (phoneNumber.length > 10 || phoneNumber.length < 10) ? 
              "Invalid phone number length" :  (click.length !== 0 && phoneNumber.match(/^[0-9]+$/) === null) ? "Phone number must include only digits" : ""}
                onChange={e => setPhoneNumber(e.target.value)}
              />
              </Grid>
            <Grid item xs={12} id ="emailGrid">
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                error = {(click.length !== 0 && email.length === 0 || response.toLocaleLowerCase().includes("email") ) }
                helperText= {click.length !== 0 && email.length === 0 ? "Please enter an email" : response.length !== 0 ? response : ""}
                onChange={e => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                error = {click.length !== 0 && password.length === 0}
                helperText= {click.length !== 0 && password.length === 0 ? "Please enter a password" : ""}
                onChange={e => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox  onChange={(e) => setPromotionStatus(e.target.checked)} value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            value="clicked"

            
            onClick={(e) => {
            setClick(e.target.value)
             
            if (firstName.length !== 0 && lastName.length != 0 && phoneNumber.length === 10 && phoneNumber.match(/^[0-9]+$/) !== null) {
              register(firstName,lastName,email,phoneNumber,password, promotionStatus, true, {setResponse});
            }
           
            console.log(response)
             // navigate('/confirmation');
            }}
          >
            Register
          </Button>
       
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
          <Box
                    sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
         
</Box>
        </form>
        </Box>
      </Container>
    </div>
    )
}

export default RegisterView;