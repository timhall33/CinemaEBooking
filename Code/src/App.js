import logo from './logo.svg';
import './App.css';
import HomePage from './Views/HomePage';
import OrderConfirmationView from './Views/OrderConfirmationView';
import PromotionScreen from './Views/PromotionScreen';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useMemo } from 'react';
import { BrowserRouter } from "react-router-dom"
import { Route, Routes, Link } from "react-router-dom"
import { BookMovieStepperView } from './Views/HomePage';
import LoginView from './Views/LoginView';
import RegisterView from './Views/RegisterView';
import RegConfirmation from './Views/RegConfirmation';
import {EditProfile} from './Views/EditProfile';
import CheckoutView from './Views/CheckoutView';
import OrderHistory from './Views/OrderHistory';
import ManageMovies from './Views/ManageMoviesView';
import ForgotPasswordConfirmation from './Views/ForgotPasswordConfirmation';
import ForgotPasswordView from './Views/ForgotPasswordView';
import {EditCardPayment} from './Views/EditCardPayment';
import AdminPanelView from './Views/AdminPanelView';
import { useEffect, useState } from 'react';
import { createTicket } from './Views/BuyTicketViews';
import ManageUsers from './Views/ManageUsers';
import {app, auth} from './Controls/Firebase'
import { getAuth } from "firebase/auth";


function App() {

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');


  const [booking, setBooking] = useState({
    movie: "",
    showTime: {},
          ticket:  [createTicket("Adult","9.00",0),createTicket("Child","6.00",0),createTicket("Senior","6.00",0)]
          ,
          price: 0,
          count: 0,
          seat: [],
          address: {
            firstName: "",
            lastName: "",
            addy1: "",
            addy2: "",
            city: "",
            zip: "",
            state: "",
            country: "",
          },
          payment: {
            name: "",
            cardNumber: "",
            date: "",
            cvv: ""
          },
  })

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
        <Route path="/buytickets/:movieTitle" element={<BookMovieStepperView booking = {booking}  setBooking={setBooking} />} />
        <Route path="/orderConfirmation" element={<OrderConfirmationView booking = {booking}  setBooking={setBooking} />} />

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
        <Route path='/orderHistory' element={<OrderHistory/>}/>


      </Routes>
    </div>


    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
