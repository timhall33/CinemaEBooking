import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { Icon } from '@mui/material';
import Stack from '@mui/material/Stack';
import Fab from '@mui/material/Fab';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import { storeMovie } from '../Controls/FirebaseMovieFunctions';
import { useState } from 'react';
import { readMovies } from './HomePage'
import { db} from '../Controls/Firebase'
import {doc , getDoc} from "firebase/firestore"
import { collection, query, where, getDocs, deleteDoc, updateDoc, arrayUnion  } from "firebase/firestore";
import { movieConverter } from '../Models/MovieModel';
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import { Promotion } from '../Models/PromotionModel';
import Alert from '@mui/material/Alert';

/**
 * View that displays fields for promotion creation
 * @returns view
 */
function AddMovieView() {

    const [movieData, setMovieData] = useState({
        movieTitle: "",
        movieCategory: "",
        movieCast: "",
        movieDirector: "",
        movieProducer: "",
        movieSynopsis: "",
        movieTrailer: "",
        movieRatingCode: "",
      })

      const [clicked, setClicked] = useState(false)
      

    return (
        <Stack id= "addPromotionViewCont" direction="column">
 <TextField 
         label="Movie title"
         fullWidth 
         multiline
         variant="filled"
         error = {movieData.movieTitle.length == 0 && clicked}
         onChange = {(e) => {

           setMovieData((prev) => ({
              ...prev,
              movieTitle: e.target.value
            }))
    
    
    
             }}
        />
         <TextField 
         label="Movie category"
         fullWidth 
         multiline
         variant="filled"
         error = {movieData.movieCategory.length == 0 && clicked}
         onChange = {(e) => {

            setMovieData((prev) => ({
               ...prev,
               movieCategory: e.target.value
             }))
     
     
     
              }}
        />
         <TextField 
         label="Movie cast"
         fullWidth 
         multiline
         variant="filled"
         error = {movieData.movieCast.length == 0 && clicked}

         onChange = {(e) => {

            setMovieData((prev) => ({
               ...prev,
               movieCast: e.target.value
             }))
     
     
     
              }}
        />
        <TextField 
         label="Movie director"
         fullWidth 
         multiline
         variant="filled"
         error = {movieData.movieDirector.length == 0 && clicked}
         onChange = {(e) => {

            setMovieData((prev) => ({
               ...prev,
               movieDirector: e.target.value
             }))
     
     
     
              }}
        />
        <TextField 
         label="Movie producer"
         fullWidth 
         multiline
         variant="filled"
         error = {movieData.movieProducer.length == 0 && clicked}
         onChange = {(e) => {

            setMovieData((prev) => ({
               ...prev,
               movieProducer: e.target.value
             }))
     
     
     
              }}
        />
        <TextField 
         label="Movie synopsis"
         fullWidth 
         multiline
         variant="filled"
         error = {movieData.movieSynopsis.length == 0 && clicked}
         onChange = {(e) => {

            setMovieData((prev) => ({
               ...prev,
               movieSynopsis: e.target.value
             }))
     
     
     
              }}
        />
        <TextField 
         label="Movie trailer"
         fullWidth 
         multiline
         variant="filled"
         error = {movieData.movieTrailer.length == 0 && clicked}
         onChange = {(e) => {

            setMovieData((prev) => ({
               ...prev,
               movieTrailer: e.target.value
             }))
     
     
     
              }}
        />
        <TextField 
         label="Movie rating code"
         fullWidth 
         error = {movieData.movieTrailer.length == 0 && clicked}
         multiline
         variant="filled"
         onChange = {(e) => {

            setMovieData((prev) => ({
               ...prev,
               movieRatingCode: e.target.value
             }))
     
     
     
              }}
        />
        <Fab onClick={(e) => {

setClicked(true)
if (movieData.movieTitle.length != 0 && movieData.movieCategory.length != 0 && movieData.movieCast.length != 0 && movieData.movieDirector.length != 0 && movieData.movieProducer.length != 0 && movieData.movieSynopsis.length != 0 && movieData.movieTrailer.length != 0 && movieData.movieRatingCode.length != 0) {
storeMovie(movieData.movieTitle, movieData.movieCategory, movieData.movieCast, movieData.movieDirector, movieData.movieProducer, movieData.movieSynopsis, movieData.movieTrailer, movieData.movieRatingCode)
} 

}} variant="extended" size="medium" color="primary"  aria-label="add">
     <AddIcon ></AddIcon>
        Create movie
      </Fab>
        </Stack>
        

    
    )
}


/**
 * Displays view with list of created promotions and the view responsible for promotion creation
 * @returns view 
 */

function ManageMovies() {


  const [showTimeForm, setShowTimeForm] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  const handleAddNewTimeClick = (movieId) => {
    setShowTimeForm(showTimeForm => !showTimeForm);
    setSelectedMovieId(movieId);
  };
  

 const [data, setData] = useState()
 useEffect(() => {
  readMovies().then((res) => {
      setData(res)
  })
},[])

    return (
        <div id = "movieScreenCont">
            <div id = "movieContent"> 
        <Card id = "tableCard" sx={{ maxWidth: 550 }} >
        <TableContainer id ="movieTableContainer">
   <Table stickyHeader aria-label="sticky table" id ="movieTable"sx={{ maxWidth: 550 }} >
   <TableHead>
          <TableRow>
            <TableCell>Movie</TableCell>
            <TableCell align = "right"> Schedule Movie</TableCell> 
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
<TableBody>
{data != null ? data.map((entry,index) => (
    <TableRow key = {index}>
          <TableCell component="th" scope="row">
                {entry.movieTitle}
              </TableCell>
              <TableCell  align="right" component="th" scope="row">
                <IconButton onClick={() => handleAddNewTimeClick(entry.movieID)}>
                  <EditIcon></EditIcon>
                </IconButton>
              </TableCell>
              
              <TableCell  align="right" component="th" scope="row">
              <IconButton
               onClick={()=> {deleteMovie(entry.movieID)}}
               >
                    <DeleteIcon></DeleteIcon>
                </IconButton>
              </TableCell>
    </TableRow>
    
)) : null

}

</TableBody>

    </Table>


        </TableContainer>
        </Card>
        <div id = "time-form"> {showTimeForm && <TimeForm movieId = {selectedMovieId}/>}</div>


        <AddMovieView></AddMovieView>
        </div>
        </div>
    )
}
async function deleteMovie(movieID) {
  await deleteDoc(doc(db, "movies", movieID))
    .then(() => {
      window.location.reload(false)
      })
    .catch((error) => {
      console.log(error)
    })

}


async function checkConflict(movieTime)  {

  const q = query(collection(db, "movies"));

      const querySnapshot = await getDocs(q);

      var res = undefined

      querySnapshot.forEach((entry) => {

        const times = entry.data().times
        const movieTitle = entry.data().movieTitle
          
        times.forEach((time) => {

          
          if (movieTime.time === time.time && movieTime.date === time.date) {
            console.log(movieTitle)
            console.log(movieTime)
    
            return res = {movieTitle: movieTitle, movieTime: movieTime}
            
        }
        })



      })

     return res  
}

function TimeForm(props) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");


  const [conflict, setConflict] = useState({

    conflictStatus: false,
    conflictMessage: "",

  })

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };



  const handleSubmit = async (event) => {
    event.preventDefault();
    const movieTime = {
      date,
      time
    };
    const checkConflictRes = async () => {
      return await checkConflict(movieTime)
    }
    
    checkConflictRes().then(async (res) => {
      if (res === undefined) {
        try {
          const movieDoc = doc(db, 'movies', props.movieId);
          await updateDoc(movieDoc, {
            times: arrayUnion(movieTime)
          });
          console.log("Movie time added successfully!");
      } catch (error) {
        console.error("Error adding movie time: ", error);
      }

      setConflict({conflictStatus: false, conflictMessage: ""})
  
      } else {
        const movieTitle =  res.movieTitle
        const time = res.movieTime
 
        setConflict({conflictStatus: true, conflictMessage: `${movieTitle} is scheduled at ${time.time} on ${time.date}`})
        console.log(conflict)

        

      }
  
      // Clear the form after submission
      setDate('');
      setTime('');
    })
    
    
   
   
  };
  
  const isDisabled = !date || !time;

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction="column" rowGap={"20px"}>

      <Stack direction="row" columnGap={"10px"}>
        <TextField
          label="Date"
          name="date"
          type="date"
          InputLabelProps={{ shrink: true }}
          onChange={handleDateChange}
          value={date}
        />
        <TextField
          label="Time"
          name="time"
          type="time"
          InputLabelProps={{ shrink: true }}
          inputProps={{ step: 300 }}
          onChange={handleTimeChange}
          value={time}
        />
        <Button type="submit" variant="contained" disabled={isDisabled}>
          Add Time
        </Button>
       </Stack>

        { conflict.conflictStatus && (
          <Alert sx={{width: "500px"}} severity="error">Time conflict — {conflict.conflictMessage}!</Alert>
        )

        }
      </Stack>
    </form>
  );
}

export default ManageMovies;