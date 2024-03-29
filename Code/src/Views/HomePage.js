import TextField from '@mui/material/TextField';

import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import Rating from '@mui/material/Rating';
import Paper from '@mui/material/Paper';
import BuyTicketViews from './BuyTicketViews';
import { Link } from "react-router-dom"
import { useState } from 'react';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import '../App.css';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { auth, db} from '../Controls/Firebase'
import {fetchData} from './EditProfile.js'
import { useEffect } from 'react';
import { signOut } from "firebase/auth"
import {userConverter} from "../Models/UserModel"
import {doc , getDoc} from "firebase/firestore"
import { getAuth } from 'firebase/auth';
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { useParams } from 'react-router-dom';
import {withAuth} from "../Controls/Firebase";
import OrderHistory from "./OrderHistory";
import { app } from '../Controls/Firebase';

function Nav() {
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [isAdmin, setIsAdmin] = useState(false);
    const handleClick = async (event) => {
      setAnchorEl(event.currentTarget);
        const ref = doc(db, "users", auth.currentUser.uid).withConverter(userConverter)
        const docSnap = await getDoc(ref)
        if (docSnap.exists()) {
            const user = docSnap.data();
            setIsAdmin(user.adminStatus())
          }
    };
    const handleClose = () => {
      setAnchorEl(null);
    }
      const [name, setName] = useState("")
      const [user, setUser] = useState("")
      
      
      useEffect(() => {
        fetchData().then((data) => {
        if (data) {
          const firstName = data.firstName;
          setName(firstName);
        
        } else {
          console.log("Error: No data found");
        }
      }).catch((error) => {
        console.log("Error:", error);
      });

    }, []);


    return (
        <div>

            {auth.currentUser === null ? 
 <Login onClick = {() => {navigate('/login')}}></Login> :
 <div>



<Tooltip title="Account settings">
          <IconButton
            onClick={handleClick }
            size="small"
            sx={{ mt: 1, mb: 1, mr: 1 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}> { name.charAt(0) }  </Avatar>
          </IconButton>
        </Tooltip>
        
        <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
       
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
      
                {isAdmin &&
        <MenuItem  onClick={() => {navigate("/adminPanel"); handleClose()}}>
          <AdminPanel></AdminPanel>
        </MenuItem>
                }
        <MenuItem onClick={() => {navigate("/editProfile"); handleClose()}}>
          <EditProfile></EditProfile>
         
        </MenuItem>

        <MenuItem onClick={() => {navigate("/orderHistory"); handleClose()}}>
            <OrderHistory></OrderHistory>
        </MenuItem>
          

        <MenuItem onClick={() => {
            handleClose();
            signOut(getAuth()).then((res)=>{
                console.log(res)
                setUser(null)
            }). catch((err) => {
                console.log(err)
            })
        } } >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>

      </Menu>
    
    </div>

            
            }
         


      </div>
    )
}

/**
 *  Displays and contains log-in button and its functions
 * @returns 
 */
function Login(props) {
    return (
        <div id = "loginCont">
           
            <Button  onClick={props.onClick} variant="contained" endIcon={<AccountCircleIcon />}>
  Login
</Button>

        </div>
    )
}



function EditProfile() {
    return(
        <div id = "editProfileCont">
          
                <IconButton>
                    <ManageAccountsIcon></ManageAccountsIcon>
                </IconButton>
                Edit Profile
        
        </div>
    )
}
function ManageMovie() {
    return(
        <div id = "manageMovieCont">
       
                <IconButton>
                    <SupervisorAccountIcon></SupervisorAccountIcon>
                </IconButton>
                Manage Movies
            
        </div>
    )
}

/**
 * Just here temporally just to provide some way to show the promotion view
 */
function AdminPanel() {
return (
    <div id = "adminCont">
   
            <IconButton>
            <AdminPanelSettingsIcon></AdminPanelSettingsIcon>
        </IconButton>
        Admin Panel
     
    


    </div>
)
}


function MovieSelectedView() {
    const {movieTitle}  = useParams();
    const moviesRef = collection(db, "movies");
    const q = query(moviesRef, where("movieTitle", "==", movieTitle), limit(1));
    const [movieData, setMovieData] = useState(null); // Add state to store the movie data

    useEffect(() => {
        getDocs(q)
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    setMovieData(doc.data()); // Save the movie data in state
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }, [movieTitle]);

    if (!movieData) {
        return <div>Loading...</div>;
    }

    const { movieTitle: title, movieTrailer, movieID, times, ...rest } = movieData;

    return (
        <Stack justifyContent={"space-between"}  direction = "row" id ="movieSelectedView">

            
            <Stack  rowGap={"1px"}
             justifyContent={"start"}  textAlign={"left"} alignItems={"start"}  className="movieSelectionDetails" >
            <Typography variant="h2">{title}</Typography>
            {Object.entries(rest).map(([key, value]) => (
                    <Typography key={key} variant="h5">
                        {key.split("movie")}: {value}
                      
                    </Typography>
                ))}
        </Stack>
            <div id = "movieTraier" style={{display: "flex", justifyContent: "center", alignItems:"center"}}>
            <iframe style={{border: "none"}} src= {`https://www.youtube.com/embed/${movieTrailer}`}
   allow='autoplay; encrypted-media'
   allowfullscreen
   title='video'
   >
  </iframe>
            </div>
        </Stack>
    )
}
export function BookMovieStepperView(props) {
    const user = auth.currentUser;

    return (
       
        <div id ="bookMovieStepperView">
            
  <Paper elevation ={2} sx={{height: "100%",minHeight: 900, maxWidth: 900, width: "100%"}}>

        <MovieSelectedView />
        {user ? <BuyTicketViews booking = {props.booking} setBooking={props.setBooking}></BuyTicketViews>
 : null}
        </Paper>
       
        </div>
      
    
    )
}



export async function readMovies() {
    const q = query(collection(db, "movies"));
  
  
    var list = []
    const querySnapshot = await getDocs(q);
    
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      list.push(doc.data())
 
    });
  
  
  
    return list;
    
  }


/**
 * Displays the movies that are screening and soon-to-be screening
 * @returns    <CardMedia component="img"  
                 image={aotPic}
                 title="Greatness">
                </CardMedia>
 */
function MoviesView(props) {

    const [data, setData] = useState()

    useEffect(() => {
        readMovies().then((res) => {
            setData(res)
        })
    },[])

   
    const navigate = useNavigate()
   
    return (
        <div id="moviesViewCont">
             <Typography  variant="h4" component="div">Now Screening </Typography>
        <div id = "moviesPlayingCont">
    
    { data != null && data.filter(item => ((item.movieTitle.toLowerCase().includes(props.query.toLowerCase()) || 
    item.movieCategory.toLowerCase().includes(props.query.toLowerCase())
    )) && item.times.length != 0).length != 0 ? data.filter(item => ((item.movieTitle.toLowerCase().includes(props.query.toLowerCase()) || 
    item.movieCategory.toLowerCase().includes(props.query.toLowerCase())
    )) && item.times.length != 0).map((item,index) => (
        <Card elevation = {8} className = "movieCard" key = {index} sx={{ maxWidth: 400 }}>
         <div className ="iframeCont">
         <iframe className = "trailer" src= {`https://www.youtube.com/embed/${item.movieTrailer}`}
   allow='autoplay; encrypted-media'
   allowfullscreen
   title='video'
   >
  </iframe>
         </div>
           
            <CardContent>
                <Stack className = "movieTitle" direction = "row">

                <Typography  variant="h10" component="div">Title: </Typography>
                <Typography  variant="h6" component="div">{item.movieTitle}</Typography>
                </Stack>
                <Stack className = "movieRating" direction = "row">
                <Typography  variant="h10" component="div">Rating: </Typography>
                <Typography  variant="h6" component="div">{item.movieRatingCode}</Typography>
                </Stack>
<div className = "bottomCardCont">
<Rating name="half-rating-read" defaultValue={parseInt(item.movieStarRating)} precision={0.5} readOnly />
  

    <Button variant="contained" onClick={(e) => {
        
        
        if (getAuth(app).currentUser === null) {
            navigate('/login')
        } else {
            navigate(`/buytickets/${item.movieTitle}`)
        }


       
        
        
        
        }} >
        Book
    </Button>


</div>
            </CardContent>
        </Card>
    )) 
:  <Typography  variant="h4" component="div"> No movie "{props.query}" is screening </Typography>
    } 
    </div>
    <Typography  variant="h4" component="div">Screening Soon </Typography>
        <div id = "moviesPlayingCont">
     
        { data != null && data.filter(item => ((item.movieTitle.toLowerCase().includes(props.query.toLowerCase()) || 
    item.movieCategory.toLowerCase().includes(props.query.toLowerCase())
    )) && item.times.length != 0).length != 0  ?  
    
    
    
    data.filter(item => ((item.movieTitle.toLowerCase().includes(props.query.toLowerCase()) || 
    item.movieCategory.toLowerCase().includes(props.query.toLowerCase())
    )) && item.times.length === 0).map((item,index)=> (
        <Card elevation = {8} className = "movieCard" key = {index} sx={{ maxWidth: 400 }}>
         <div className ="iframeCont">
         <iframe className = "trailer" src= {`https://www.youtube.com/embed/${item.movieTrailer}`}
   allow='autoplay; encrypted-media'
   allowfullscreen
   title='video'
   >
  </iframe>
         </div>
           
            <CardContent>
                <Stack className = "movieTitle" direction = "row">

                <Typography  variant="h10" component="div">Title: </Typography>
                <Typography  variant="h6" component="div">{item.movieTitle}</Typography>
                </Stack>
                <Stack className = "movieRating" direction = "row">
                <Typography  variant="h10" component="div">Rating: </Typography>
                <Typography  variant="h6" component="div">{item.movieRatingCode}</Typography>
                </Stack>
<div className = "bottomCardCont">
<Rating name="half-rating-read" defaultValue={parseInt(item.movieStarRating)} precision={0.5} readOnly />
  

</div>
            </CardContent>
        </Card>
    ))  :  <Typography  variant="h4" component="div"> No movie "{props.query}" is screening soon </Typography>

    }
        </div>
        
        </div>
    )
}

/**
 * Displays search field where user can filter movie by {whatever specified in requirements}
 * @returns 
 */
function SearchField(props) {
   
    return (
 
            <TextField  onChange = {(e) => props.setQuery(e.target.value)}   sx={{maxWidth: 500, width: "100%"}} label="Browse movies" variant="filled" />
        
    )
}

/**
 * Displays what is needed for the homepage. **Requirement 1
 * @returns 
 */
function HomePage({user}) {
    const [query, setQuery] = useState("")
    return (
        <div id="homePageCont">
<div>
    <div id="optionsCont">
 <Nav></Nav>
    </div>

    <Typography variant="h4" >E-Booking Cinema</Typography>
</div>
<SearchField setQuery = {setQuery} query = {query}></SearchField>
    <MoviesView setQuery = {setQuery} query = {query}></MoviesView>

        </div>
    )
}





export default withAuth(HomePage);