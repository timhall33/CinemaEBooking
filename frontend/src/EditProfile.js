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
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';
import { getAuth } from "firebase/auth";
import db from './Firebase';
import app from './Firebase';
import { useState, useEffect } from 'react';
import { collection } from 'firebase/firestore';
import { doc, getDoc } from "firebase/firestore";










const theme = createTheme();

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

const auth = getAuth();
async function fetchData() {
const user = auth.currentUser;
  if (user) {
    const uid = user.uid;
    console.log("uid: " + uid);
    const docRef = doc(db, "users/" + uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return docSnap.data();
    } else {
      console.log("No such document!");
    }
  } else {
    console.log("No user signed in.");
  }
}

  function EditProfile() {
      const [firstName, setFirstName] = useState('');
      const [lastName, setLastName] = useState('');
      const [phoneNumber, setphoneNumber] = useState('');
      const [email, setEmail] = useState('');
      useEffect(() => {
      fetchData().then((data) => {
      if (data) {
        const firstName = data.firstName;
        setFirstName(firstName);
        const lastName = data.lastName;
        setLastName(lastName);
        const phoneNumber = data.phoneNumber;
        setphoneNumber(phoneNumber);
        const email = data.email;
        setEmail(email);
      } else {
        console.log("Error: No data found");
      }
    }).catch((error) => {
      console.log("Error:", error);
    });
  }, []);
    return(
      <div id = "editProfileCont">
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
    <Avatar {...stringAvatar(firstName + " " + lastName)}></Avatar>
    {firstName} {lastName}
    </Typography>
    <form  noValidate>
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField
          autoComplete="fname"
          name="firstName"
          variant="outlined"
          fullWidth
          id="firstName"
          placeholder={firstName}
          autoFocus
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          variant="outlined"
          fullWidth
          id="lastName"
          placeholder = {lastName}
          name="lastName"
          autoComplete="lname"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          fullWidth
          id="phone"
          placeholder = {phoneNumber}
          name="phone"
          autoComplete="phone"
        />
        </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          disabled="disabled"
          fullWidth
          id="email"
          label={email}
          name="email"
          autoComplete="email"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          required
          fullWidth
          name="password"
          label="Enter Old Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          required
          fullWidth
          name="password"
          label="Enter New Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          required
          fullWidth
          name="password"
          label="Re-Enter New Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
      </Grid>
    </Grid>
    <Button
      type="submit"
      fullWidth
      variant="contained"
      color="primary"
    >
      Update Profile
    </Button>
  </form>
  </Box>
</Container>
</div>
    )
}
export default EditProfile;