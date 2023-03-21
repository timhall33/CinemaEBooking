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
import { Button, FormControl, Icon } from '@mui/material';
import Stack from '@mui/material/Stack';
import Fab from '@mui/material/Fab';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { cardConverter, CreditCard } from './CreditModel';
import { auth, db, app } from './Firebase';

import { addDoc , doc} from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { collection, query, where, getDocs } from "firebase/firestore";


async function readCreditCard(userId) {
  const q = query(collection(db, "creditcard"), where("userId", "==", userId));
  var list = []
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    list.push(doc.data())
  });

  return list;
  
}

export async function storeCreditCard(db, cardType, cardNumber, cardExp, addyOne, addyTwo, city, state, zipCode, country, userId) {

  // adding document




  const ref = collection(db, "creditcard").withConverter(cardConverter)
  
  await addDoc(ref, new CreditCard(cardType, cardNumber, cardExp, addyOne, addyTwo, city, state, zipCode, country, userId))
  .then((res) => {
    console.log(res)
  }).catch((err) => {
    console.log(err)
  })



}


/**
 * View that displays fields for promotion creation
 * @returns view
 */
function AddCardView(props) {



    return (
        <Stack sx={{ mt: 3, mb: 2 }}  id= "addCardViewCont" direction="column">
 <TextField 
         label="Enter Card Type"
         fullWidth 
         multiline
         variant="filled"
         onChange = {(e) => {props.cardSpecs.setCardType(e.target.value)}}
        />
         <TextField 
         label="Enter Card Number"
         fullWidth 
         multiline
         variant="filled"
         onChange = {(e) => {props.cardSpecs.setCardNum(e.target.value)}}
        />
         <TextField 
         label="Enter card expirations date"
         fullWidth 
         multiline
         variant="filled"
         onChange = {(e) => {props.cardSpecs.setCardExp(e.target.value)}}
        />
        Billing Address
        <TextField 
         label="Address line1"
         fullWidth 
         multiline
         variant="filled"
         onChange = {(e) => {props.cardSpecs.setAddy(e.target.value)}}
        />
        <TextField 
         label="Address line 2"
         fullWidth 
         multiline
         variant="filled"
         onChange = {(e) => {props.cardSpecs.setAddy(e.target.value)}}
        />
        <TextField 
         label="City"
         fullWidth 
         multiline
         variant="filled"
         onChange = {(e) => {props.cardSpecs.setCity(e.target.value)}}
        />
        <TextField 
         label="State"
         fullWidth 
         multiline
         variant="filled"
         onChange = {(e) => {props.cardSpecs.setState(e.target.value)}}
        />
        <TextField 
         label="Zip Code"
         fullWidth 
         multiline
         variant="filled"
         onChange = {(e) => {props.cardSpecs.setZipCode(e.target.value)}}
        />
        <TextField 
         label="Country"
         fullWidth 
         multiline
         variant="filled"
         onChange = {(e) => {props.cardSpecs.setCountry(e.target.value)}}
        />


           
        { props.showButton && (
<Fab  onClick={()=> 
{
  storeCreditCard(db, props.cardSpecs.cardType,props.cardSpecs.cardNum, props.cardSpecs.cardExp, props.cardSpecs.addy, props.cardSpecs.addy, props.cardSpecs.city,props.cardSpecs.state, props.cardSpecs.zipCode, props.cardSpecs.country, auth.currentUser.uid)

}

}
  
sx={{ mt: 2, mb: 1 }} variant="extended" size="medium" color="primary"  aria-label="add" >
<AddIcon></AddIcon>

   Create Card Information
 </Fab>
        )

        }
        
        </Stack>
        

    
    )
}
function createEntry(data) {
    return {data}
}


/**
 * Displays view with list of created promotions and the view responsible for promotion creation
 * 
 *   

 * @returns view 
 */

function EditCardPayment() {

 

  const [cardType, setCardType] = useState("")
  const [cardNum, setCardNum] = useState("")
  const [cardExp, setCardExp] = useState("")
  const [addy, setAddy] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [zipCode, setZipCode] = useState("")
  const [country, setCountry] = useState("")

  const [dataPros, setDataPros] = useState(
    readCreditCard(auth.currentUser.uid)
)

    const [data, setData] = useState()

    

    useEffect(() => {
      console.log(data)
    },[ dataPros.then((res) => {
      setData(res)
     })])





  

    const navigate = useNavigate();
      const navigateToEditProfile=()=> {
        navigate('/editProfile');
      };

    const entries = [createEntry((Math.random() + 1).toString(36).substring(2)),createEntry((Math.random() + 1).toString(36).substring(2)),createEntry((Math.random() + 1).toString(36).substring(2))]

    return (
        <div id = "promotionScreenCont">
            <div id = "promotionContent"> 
        <Card id = "tableCard" sx={{ maxWidth: 550 }} >
        <TableContainer id ="promotionTableContainer">
   <Table stickyHeader aria-label="sticky table" id ="promotionTable"sx={{ maxWidth: 550 }} >
   <TableHead>
          <TableRow>
            <TableCell  >Cards</TableCell>
            <TableCell align="right">Edit</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>

  
        <TableBody>

        
{ data ? data.map(entry => (
  <TableRow key = {entry}>
        <TableCell component="th" scope="row">
              {entry.cardNumber}
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
: null
}



</TableBody>
    </Table>
 

 

        </TableContainer>
        </Card>


        <AddCardView  cardSpecs = {{setCardExp, setAddy, setCardType, setCountry, setCardNum, setCity, setState, setZipCode, cardExp, addy, cardType, country, cardNum, city, state, zipCode}}   showButton = {true} ></AddCardView>
        <Button
            type='submit'
            fullWidth
            variant="contained"
            color="primary"
            onClick={navigateToEditProfile}
        >
            Back
        </Button>
        </div>
        </div>
    )
}

export {EditCardPayment, AddCardView};
