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



function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

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
        <Route path="/" element={<HomePage />} />
        <Route path="/buytickets" element={<BookMovieStepperView />} />
        <Route path="/orderConfirmation" element={<OrderConfirmationView />} />
        <Route path="/promotions" element={<PromotionScreen />} />
      </Routes>
    </div>


    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
