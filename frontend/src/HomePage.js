import TextField from '@mui/material/TextField';

import Avatar from '@mui/material/Avatar';

import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import aotPic from './aot.png'

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import './App.css';


/**
 *  Displays and contains log-in button and its functions
 * @returns 
 */
function Login() {
    return (
        <div id = "loginCont">
<IconButton>
<AccountCircleIcon size="large" ></AccountCircleIcon>
</IconButton>
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

    let array = Array(15).fill(0)
    let embedId = "6r8Dooe7f-k"
    return (
        <div id = "moviesViewCont">
      
        {array.map(item => (
            <Card className = "movieCard" key = {item} sx={{ maxWidth: 350 }}>
             
                <iframe className = "trailer" src= {`https://www.youtube.com/embed/${embedId}`}
       allow='autoplay; encrypted-media'
       allowfullscreen
       title='video'
       >

      </iframe>
                <CardContent>
                <Typography gutterBottom variant="h6" component="div">
         Title: Greatness
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
         Rating: TV-MA
        </Typography>
        <Fab variant="extended" size="medium" color="primary"  aria-label="add">
        <AddIcon />
        Book
      </Fab>
   
                    
                </CardContent>
            </Card>
        ))

        }

        </div>
    )
}

/**
 * Displays search field where user can filter movie by {whatever specified in requirements}
 * @returns 
 */
function SearchField() {
    return (
        <div>
            <TextField id="filled-basic" label="Browse movies" variant="filled" />
        </div>
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
    <Typography variant="h2" >E-Booking Cinema</Typography>
</div>
<SearchField></SearchField>
    <MoviesView></MoviesView>

        </div>
    )
}





export default HomePage;