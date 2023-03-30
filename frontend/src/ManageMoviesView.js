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
import { storeMovie } from './FirebaseMovieFunctions';
import { useState } from 'react';

/**
 * View that displays fields for promotion creation
 * @returns view
 */
function AddMovieView() {

    const [movieData, setMovieData] = useState({
        movieTitle: "",
        movieCategory: "",
        movieCast:"",
        movieDirector: "",
        movieProducer: "",
        movieSynopsis: "",
        movieTrailer:"",
        movieRatingCode: "",
        movieShowTime:"",
        movieShowDate: ""
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
        <TextField 
         label="Movie show dates"
         fullWidth 
         multiline
         error = {movieData.movieShowDate.length == 0 && clicked}
         variant="filled"
         onChange = {(e) => {

            setMovieData((prev) => ({
               ...prev,
               movieShowDate: e.target.value
             }))
     
     
     
              }}
        />
        <TextField 
         label="Movie show times"
         fullWidth 
         multiline
         error = {movieData.movieShowTime.length == 0 && clicked}
         variant="filled"
         onChange = {(e) => {

            setMovieData((prev) => ({
               ...prev,
               movieShowTime: e.target.value
             }))
     
     
     
              }}
        />
        <Fab onClick={(e) => {

setClicked(true)
storeMovie(movieData.movieTitle, movieData.movieCategory, movieData.movieCast, movieData.movieProducer, movieData.movieSynopsis, movieData.movieTrailer, movieData.movieRatingCode, movieData.movieShowDate, movieData.movieShowTime)

}} variant="extended" size="medium" color="primary"  aria-label="add">
     <AddIcon ></AddIcon>
        Create movie
      </Fab>
        </Stack>
        

    
    )
}
function createEntry(data) {
    return {data}
}


/**
 * Displays view with list of created promotions and the view responsible for promotion creation
 * @returns view 
 */

function ManageMovies() {

    const entries = [createEntry("Megan"),createEntry("Tupac"),createEntry("Dogs")]

    return (
        <div id = "movieScreenCont">
            <div id = "movieContent"> 
        <Card id = "tableCard" sx={{ maxWidth: 550 }} >
        <TableContainer id ="movieTableContainer">
   <Table stickyHeader aria-label="sticky table" id ="movieTable"sx={{ maxWidth: 550 }} >
   <TableHead>
          <TableRow>
            <TableCell  >Movie</TableCell>
            <TableCell align="right">Edit</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
<TableBody>
{entries.map(entry => (
    <TableRow key = {entry.data}>
          <TableCell component="th" scope="row">
                {entry.data}
              </TableCell>
              <TableCell align="right" component="th" scope="row">
                <IconButton>
                    <EditIcon></EditIcon>
                </IconButton>
              </TableCell>
              <TableCell  align="right" component="th" scope="row">
              <IconButton>
                    <DeleteIcon></DeleteIcon>
                </IconButton>
              </TableCell>
    </TableRow>
))

}

</TableBody>
    </Table>


        </TableContainer>
        </Card>


        <AddMovieView></AddMovieView>
        </div>
        </div>
    )
}

export default ManageMovies;