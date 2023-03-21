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
import {db }from './Firebase';
import app from './Firebase';
import { useState, useEffect } from 'react';
import { collection } from 'firebase/firestore';
import { doc, getDoc } from "firebase/firestore";
import updateProfile from './FirebaseEditProfile';
import EditCardPayment from './EditCardPayment';
import { useNavigate } from 'react-router';
import { auth } from './Firebase';
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

async function fetchAddyData() {
  const user = auth.currentUser;
  
    if (user) {
      const uid = user.uid;
      console.log("uid: " + uid);
      const docRef = doc(db, "address/" + uid);
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
      const [promotionStatus, setPromotionStatus] = useState(false)

      const [changePass, setChangePass] = useState(false)
      const [password, setPassword] = useState("")
      const [newPassword, setNewPassword] = useState("")

      const [errorMess, setErrorMess] = useState("")
      const [error, setError] = useState(false)


      const[street, setStreet] = useState("")
      const[city, setCity] = useState("")
      const [state, setState] = useState("")
      const [zip, setZip] = useState("")


      const navigate = useNavigate();
      const navigateToCardPayments=()=> {
        navigate('/cardPayments');
      };
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

        setPromotionStatus(data.promotionStatus)




      } else {
        console.log("Error: No data found");
      }
    }).catch((error) => {
      console.log("Error:", error);
    });

    fetchAddyData().then((data) => {

      setStreet(data.street)
      setCity(data.city)
      setState(data.state)
      setZip(data.zip)

    })


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
      justifyContent: 'center',
    }}
  >
    <Avatar {...stringAvatar(firstName + " " + lastName)}></Avatar>
    <Typography component="h1" variant="h5">
    
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
          onChange={(e) => {setFirstName(e.target.value)}}
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
          onChange={(e) => {setLastName(e.target.value)}}
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
          onChange={(e) => {setphoneNumber(e.target.value)}}
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
          fullWidth
          name="address1"
         type="address1"
          id="address1"
         
          onChange={(e) => {setStreet(e.target.value)}}
          placeholder={street}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          variant="outlined"
          fullWidth
          name="city"
          type="city"
          id="city"
          placeholder={city}
          onChange={(e) => {setCity(e.target.value)}}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          fullWidth
          name="state"
         
          id="state"
          onChange={(e) => {setState(e.target.value)}}
          placeholder={state}
        />
      </Grid>
      <Grid item xs={12}>
          <TextField
            required
            id="zip"
            name="zip"
           
            fullWidth
            variant="outlined"
            placeholder={zip}
            onChange={(e) => {setZip(e.target.value)}}
          />
        </Grid>
        <Grid item xs={12}>
        <FormControlLabel
                control={<Checkbox checked = {promotionStatus}  value="password" color="primary" onChange={(e) => setPromotionStatus(e.target.checked)} />}
                label= {promotionStatus ? "Stay registered for promotions" : "Sign up for promotions"}
              />
                </Grid>

        <Grid item xs={12}>
        <FormControlLabel
                control={<Checkbox   value="password" color="primary" onChange={(e) => setChangePass(e.target.checked)} />}
                label="Change password"
              />
                </Grid>
    </Grid >
    { changePass && (
<Grid container spacing={2}>
<Grid item xs={12}>
        <TextField
          variant="outlined"
          fullWidth
          name="password"
          label="Enter Current Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={ (e) => {
            setPassword(e.target.value);
           }}
           error = {error}
           helperText = {error ? errorMess : ""}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          fullWidth
          name="password"
          label="Enter New Password"
          type="password"
          id="password"
          autoComplete="new-password"
          onChange={(e) => {setNewPassword(e.target.value)}}
          error = {error}
          helperText = {error ? errorMess : ""}
        />
      </Grid>
</Grid>
    )

    }
    <Grid item xl={6} lg={6} md={6} sm={12} xs={12} >
      <Button
       
        fullWidth
        variant="contained"
        sx={{ mt: 2, mb: 1 }}
        color="primary"
        onClick={ () => {
          updateProfile(firstName, lastName, phoneNumber, promotionStatus, street, city, state, zip, auth.currentUser.uid, navigate, {changePass, newPassword, password, setErrorMess, setError});




      }
    }
      >
        Update Profile
      </Button>
    </Grid>
    <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
      <Button
        type='submit'
        fullWidth
        sx={{ mt: 2, mb: 1 }}
        variant="contained"
        color="primary"
        onClick={navigateToCardPayments}
        >
          Edit Card Payment
        </Button>
    </Grid>
  </form>
  </Box>
</Container>
</div>
    )
}
export {EditProfile, fetchData};
