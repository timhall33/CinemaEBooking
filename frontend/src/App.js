import logo from './logo.svg';
import './App.css';
import HomePage from './HomePage';
import OrderConfirmationView from './OrderConfirmationView';
import PromotionScreen from './PromotionScreen';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useMemo } from 'react';
import { BrowserRouter } from "react-router-dom"
import { Route, Routes, Link } from "react-router-dom"
import { BookMovieStepperView } from './HomePage';
import LoginView from './LoginView';
import RegisterView from './RegisterView';
import RegConfirmation from './RegConfirmation';
import {EditProfile} from './EditProfile';
import CheckoutView from './CheckoutView';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import ManageMovies from './ManageMoviesView';
import ForgotPasswordConfirmation from './ForgotPasswordConfirmation';
import ForgotPasswordView from './ForgotPasswordView';
import {EditCardPayment} from './EditCardPayment';
import AdminPanelView from './AdminPanelView';
import { useEffect } from 'react';
import ManageUsers from './ManageUsers';
import {app, auth} from './Firebase'
import { getAuth } from "firebase/auth";;

function App() {


  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  console.log(getAuth(app).currentUser)
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );
  return (
    <ThemeProvider theme={theme}>
       <BrowserRouter>
    <CssBaseline />
    <div id = "body">
    <Routes>

       
        <Route path="/" element={  <HomePage />} />
        <Route path="/buytickets/:movieTitle" element={<BookMovieStepperView />} />
        <Route path="/orderConfirmation" element={<OrderConfirmationView />} />

        <Route path="/login" element={<LoginView />} />
        <Route path="/register" element={<RegisterView />} />
        <Route path="/confirmation" element={<RegConfirmation />} />
        <Route path="/editProfile" element={<EditProfile />} />
        <Route path="/checkout" element={<CheckoutView />} />
        <Route path="/manage" element={<ManageMovies />} />
        <Route path="/promotions" element={<PromotionScreen />} />
        <Route path="/manageUsers" element={<ManageUsers />} />
        <Route path="/forgotpassword" element={<ForgotPasswordView />} />
        <Route path='/forgotConfirmation' element={<ForgotPasswordConfirmation />} />
        <Route path='/cardPayments' element={<  EditCardPayment  />} />
        <Route path='/adminPanel' element={<  AdminPanelView  />} />


      </Routes>
    </div>


    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
