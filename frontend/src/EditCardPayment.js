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
import { Button, FormControl, Icon, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import Fab from '@mui/material/Fab';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { cardConverter, CreditCard } from './CreditModel';
import { auth, db, app } from './Firebase';

import { addDoc , doc, deleteDoc} from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { collection, query, where, getDocs } from "firebase/firestore";
import { getCountFromServer } from 'firebase/firestore';







async function readCreditCard(userId) {
  const q = query(collection(db, "creditcard"), where("userId", "==", userId));



  const snapshot = await getCountFromServer(q);
  const length = snapshot.data().count

  var list = []
  const querySnapshot = await getDocs(q);
  
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    list.push(doc.data())
   console.log(doc)
  });



  return [list,length];
  
}


export async function storeCreditCard(db, cardType, cardNumber, cardExp, addyOne,  city, state, zipCode, country, userId) {

  // adding document


  console.log(userId)

  const ref = collection(db, "creditcard").withConverter(cardConverter)
  
  await addDoc(ref, new CreditCard(cardType, cardNumber, cardExp, addyOne, city, state, zipCode, country, userId))
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
         onChange = {(e) => {

        props.setCardData((prev) => ({
          ...prev,
          cardType: e.target.value
        }))



         }}
        />
         <TextField 
         label="Enter Card Number"
         fullWidth 
         multiline
         variant="filled"
         onChange = {(e) => 

           props.setCardData((prev) => ({
          ...prev,
          cardNum: e.target.value
        }))

        
        
        }
        />
         <TextField 
         label="Enter card expirations date"
         fullWidth 
         multiline
         variant="filled"
         onChange = {(e) => {
          props.setCardData((prev) => ({
            ...prev,
            cardExp: e.target.value
          }))
  
        }}
        />
        Billing Address
        <TextField 
         label="Address line1"
         fullWidth 
         multiline
         variant="filled"
         onChange = {(e) => {
          props.setCardData((prev) => ({
            ...prev,
          addy: e.target.value
          }))
        
        }}
        />
 
        <TextField 
         label="City"
         fullWidth 
         multiline
         variant="filled"
         onChange = {(e) => {    props.setCardData((prev) => ({
          ...prev,
          city: e.target.value
        }))}}
        />
        <TextField 
         label="State"
         fullWidth 
         multiline
         variant="filled"
         onChange = {(e) => {
          props.setCardData((prev) => ({
            ...prev,
            state: e.target.value
          }))
        
        }}
        />
        <TextField 
         label="Zip Code"
         fullWidth 
         multiline
         variant="filled"
         onChange = {(e) => {
          
          props.setCardData((prev) => ({
            ...prev,
            zipCode: e.target.value
          }))
        
        
        }}
        />
        <TextField 
         label="Country"
         fullWidth 
         multiline
         variant="filled"
         onChange = {(e) => {
          
          props.setCardData((prev) => ({
            ...prev,
            country: e.target.value
          }))
        
        }}
        />


           
        { props.showButton && (
<Fab  onClick={()=> 
{
  console.log(auth.currentUser.uid)


  storeCreditCard(db, props.cardData.cardType,props.cardData.cardNum, props.cardData.cardExp, props.cardData.addy, props.cardData.city,props.cardData.state, props.cardData.zipCode, props.cardData.country, auth.currentUser.uid)

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

 
  const [cardData, setCardData] = useState({
    cardNum: "",
    cardType: "",
    cardExp: "",
    addy: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  })



    const [data, setData] = useState()

    

    useEffect(() => {
      readCreditCard(auth.currentUser.uid).then((res) => {
        setData(res)
        console.log(res)
       })
    
   
    },[])


     async function getCreditCard(cardNumber) {
      const q = query(collection(db, "creditcard"), where("cardNumber", "==", cardNumber));
      const querySnapshot = await getDocs(q);
    
      if (querySnapshot.empty) {
        throw new Error("No credit card found with the provided card number.");
      }
    
      const doc = querySnapshot.docs[0];
      return doc.id;
    }

     async function deleteCreditCard(cardId) {
      await deleteDoc(doc(db, "creditcard", cardId));
    }

     const handleDeleteClick = async (c) => {
      try {
        const cardId = await getCreditCard(c);
        await deleteCreditCard(cardId);
        console.log("Credit card deleted successfully.");
      } catch (error) {
        console.error("Error deleting credit card:", error);
      }
    };

    const navigate = useNavigate();
      const navigateToEditProfile=()=> {
        navigate('/editProfile');
      };

   

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

        
{ data !== undefined ? data[0].map((entry,index) => (
  <TableRow key = {index} >
        <TableCell component="th" scope="row">
              {entry.cardType}
             
            </TableCell>
            <TableCell align="right" component="th" scope="row">
              <IconButton>
                  <EditIcon></EditIcon>
              </IconButton>
            </TableCell>
            <TableCell  align="right" component="th" scope="row">
            <IconButton onClick={() => {handleDeleteClick(entry.cardNumber)}}>
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



{ data &&  
   (data[1] < 3) && (
    <AddCardView  cardData = {cardData} setCardData = {setCardData} showButton = {true} ></AddCardView>
  )
   


}

{ data &&
   (data[1] >= 3) && (
    <Typography>You have reached the limit of 3 credit cards.</Typography>
  )
  
}




      
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
