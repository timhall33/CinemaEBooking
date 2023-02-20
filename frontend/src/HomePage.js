import TextField from '@mui/material/TextField';

import Avatar from '@mui/material/Avatar';

import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import aotPic from './aot.png'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Rating from '@mui/material/Rating';
import Paper from '@mui/material/Paper';
import Modal from '@mui/material/Modal';
import BuyTicketViews from './BuyTicketViews';
import { Route, Routes, Link } from "react-router-dom"
import { useState } from 'react';
import {LoginView} from './LoginView';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

import './App.css';


/**
 *  Displays and contains log-in button and its functions
 * @returns 
 */
function Login() {
    return (
        <div id = "loginCont">
            <Link to="/login">
                <IconButton>
                    <AccountCircleIcon size="large" ></AccountCircleIcon>
                </IconButton>
            </Link>

        </div>
    )
}

function EditProfile() {
    return(
        <div id = "editProfileCont">
            <Link to="/editProfile">
                <IconButton>
                    <ManageAccountsIcon></ManageAccountsIcon>
                </IconButton>
            </Link>
        </div>
    )
}
function ManageMovie() {
    return(
        <div id = "manageMovieCont">
            <Link to="/manage">
                <IconButton>
                    <SupervisorAccountIcon></SupervisorAccountIcon>
                </IconButton>
            </Link>
        </div>
    )
}

/**
 * Just here temporally just to provide some way to show the promotion view
 */
function AdminPanel() {
return (
    <div id = "adminCont">
        <Link to="/promotions">
            <IconButton>
            <AdminPanelSettingsIcon></AdminPanelSettingsIcon>
        </IconButton>
        </Link>
    


    </div>
)
}


function MovieSelectedView() {
    return (
        <Stack direction = "row" id ="movieSelectedView">
            <div id="moviePosterCont">
            <img id="moviePoster" src={aotPic}>
            </img>
            </div>
            <Stack className="movieSelectionDetails" >
        <Typography  variant="h5">
               Greatness
            </Typography>
            <Typography  variant="h7">
              Sunday, April 11 at 2:45 PM
            </Typography>
        </Stack>
            
        </Stack>
    )
}

export function BookMovieStepperView(props) {

    return (
       
        <div id ="bookMovieStepperView">
            
  <Paper elevation ={2} sx={{height: "100%",minHeight: 900, maxWidth: 900, width: "100%"}}>

        <MovieSelectedView></MovieSelectedView>
        <BuyTicketViews></BuyTicketViews>
        </Paper>
       
        </div>
      
    
    )
}


/**
 * Displays the movies that are screening and soon-to-be screening
 * @returns    <CardMedia component="img"  
                 image={aotPic}
                 title="Greatness">
                </CardMedia>
 */
function MoviesView() {


    let array = [1,2,3,4]
    let embedId = "6r8Dooe7f-k"

    return (
        <div id="moviesViewCont">
             <Typography  variant="h4" component="div">Now Screening </Typography>
        <div id = "moviesPlayingCont">
    
    {array.map(item => (
        <Card elevation = {8} className = "movieCard" key = {item} sx={{ maxWidth: 400 }}>
         <div className ="iframeCont">
         <iframe className = "trailer" src= {`https://www.youtube.com/embed/${embedId}`}
   allow='autoplay; encrypted-media'
   allowfullscreen
   title='video'
   >
  </iframe>
         </div>
           
            <CardContent>
                <Stack className = "movieTitle" direction = "row">

                <Typography  variant="h10" component="div">Title: </Typography>
                <Typography  variant="h6" component="div">Greatness</Typography>
                </Stack>
                <Stack className = "movieRating" direction = "row">
                <Typography  variant="h10" component="div">Rating: </Typography>
                <Typography  variant="h6" component="div">TV-MA</Typography>
                </Stack>
<div className = "bottomCardCont">
<Rating name="half-rating-read" defaultValue={5} precision={0.5} readOnly />
  
<Link to="/buytickets" style={{ textDecoration: 'none' }}>
    <Button variant="contained" >
        Book
    </Button>
</Link>

</div>
            </CardContent>
        </Card>
    ))

    }
    </div>
    <Typography  variant="h4" component="div">Screening Soon </Typography>
        <div id = "moviesPlayingCont">
        {array.map(item => (
            <Card elevation = {8} className = "movieCard" key = {item} sx={{ maxWidth: 400 }}>
             <div className ="iframeCont">
             <iframe className = "trailer" src= {`https://www.youtube.com/embed/${embedId}`}
       allow='autoplay; encrypted-media'
       allowfullscreen
       title='video'
       >
      </iframe>
             </div>
               
                <CardContent>
                    <Stack className = "movieTitle" direction = "row">
                    <Typography  variant="h10" component="div">Title: </Typography>
                    <Typography  variant="h6" component="div">Greatness</Typography>
                    </Stack>
                    <Stack className = "movieRating" direction = "row">
                    <Typography  variant="h10" component="div">Rating: </Typography>
                    <Typography  variant="h6" component="div">TV-MA</Typography>
                    </Stack>
                </CardContent>
            </Card>
        ))

        }
        </div>
        
        </div>
    )
}

/**
 * Displays search field where user can filter movie by {whatever specified in requirements}
 * @returns 
 */
function SearchField() {
    return (
 
            <TextField  sx={{maxWidth: 500, width: "100%"}} label="Browse movies" variant="filled" />
        
    )
}

/**
 * Displays what is needed for the homepage. **Requirement 1
 * @returns 
 */
function HomePage() {
    return (
        <div id="homePageCont">
<div>
<Login></Login>
<AdminPanel></AdminPanel>

    <Typography variant="h4" >E-Booking Cinema</Typography>
</div>
<SearchField></SearchField>
    <MoviesView></MoviesView>

        </div>
    )
}





export default HomePage;