
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
import { useState } from 'react';
import { storePromo } from '../Controls/FirebasePromotionFunc';
import { db } from '../Controls/Firebase';
import { collection, query, where, getDocs, updateDoc , deleteDoc, doc} from "firebase/firestore";
import { getCountFromServer } from 'firebase/firestore';
import { useEffect, useRef } from 'react';
import { FormControl } from '@mui/material';

async function deletePromo(promoId) {
  await deleteDoc(doc(db, "promotions", promoId)).then((e) => {
    window.location.reload(false)
    console.log(e)
  })
  
}


async function readPromo() {
    const q = query(collection(db, "promotions"));
  
  
    var list = []
    const querySnapshot = await getDocs(q);
    
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      list.push(doc.data())
     console.log(doc)
    });
  
  
  
    return list;
    
  }

/**
 * 
 * View that displays fields for promotion creation
 * @returns view
 */
function AddPromotionView() {

    const [promoData, setPromoData] = useState({
        title: "",
        discount: "",
        description: ""
    })

    const formRef = useRef()

      const addPromAndEmail = (e) => {
        e.preventDefault();
      setClicked(true)
      if (promoData.title.length != 0 && promoData.description.length != 0 && promoData.discount.length != 0) {
      storePromo(promoData.title, promoData.description, promoData.discount, formRef.current)
      } 
      e.target.reset()
    }
    const [clicked, setClicked] = useState(false)

    return (
        <Stack id= "addPromotionViewCont" direction="column">
          <form ref={formRef} onSubmit={addPromAndEmail} >
 <TextField 
         label="Enter a promotion"
         fullWidth 
         multiline
         variant="filled"

         onChange = {(e) => {
          
            setPromoData((prev) => ({
               ...prev,
                title: e.target.value
             }))
     
     
     
              }}

              error = {promoData.title.length == 0 && clicked}

        />
         <TextField 
         label="Enter a description"
         fullWidth 
         multiline
         variant="filled"
          name = "promotionDescription"
         error = {promoData.description.length == 0 && clicked}
         onChange = {(e) => {

            setPromoData((prev) => ({
               ...prev,
               description: e.target.value
             }))
     
     
     
              }}
             
        />
         <TextField 
         label="Enter a discount percentage"
         fullWidth 
         multiline
         variant="filled"
         name = "promotionAmount"
          onChange = {(e) => {

            setPromoData((prev) => ({
               ...prev,
               discount: e.target.value
             }))
     
     
     
              }}

              error = {promoData.discount.length == 0 && clicked}

        />
        <Fab  type="submit"  variant="extended" size="medium" color="primary"  aria-label="add">
     <AddIcon></AddIcon>
        Create promotion
      </Fab>
      </form>
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

function PromotionScreen() {

    const [data, setData] = useState()

    useEffect(() => {
       readPromo().then((res) => {
            setData(res)
       })
      },[])
      

    return (
        <div id = "promotionScreenCont">
            <div id = "promotionContent"> 
        <Card id = "tableCard" sx={{ maxWidth: 550 }} >
        <TableContainer id ="promotionTableContainer">
   <Table stickyHeader aria-label="sticky table" id ="promotionTable"sx={{ maxWidth: 550 }} >
   <TableHead>
          <TableRow>
            <TableCell  >Promotions</TableCell>
            <TableCell  ></TableCell>
          </TableRow>
        </TableHead>
<TableBody>


{data !== undefined ? data.map((entry,index) => (
    <TableRow key = {index}>
          <TableCell component="th" scope="row">
                {entry.title}
              </TableCell>

              <TableCell component="th" scope="row">
              <IconButton
               onClick={()=> {deletePromo(entry.promotionID)}}
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


        <AddPromotionView></AddPromotionView>
        </div>
        </div>
    )
}

export default PromotionScreen;