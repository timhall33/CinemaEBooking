
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

/**
 * View that displays fields for promotion creation
 * @returns view
 */
function AddPromotionView() {
    return (
        <Stack id= "addPromotionViewCont" direction="column">
 <TextField 
         label="Enter a promotion"
         fullWidth 
         multiline
         variant="filled"
        />
         <TextField 
         label="Enter a description"
         fullWidth 
         multiline
         variant="filled"
        />
         <TextField 
         label="Enter a discount percentage"
         fullWidth 
         multiline
         variant="filled"
        />
        <Fab variant="extended" size="medium" color="primary"  aria-label="add">
     <AddIcon></AddIcon>
        Create promotion
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

function PromotionScreen() {

    const entries = [createEntry((Math.random() + 1).toString(36).substring(2)),createEntry((Math.random() + 1).toString(36).substring(2)),createEntry((Math.random() + 1).toString(36).substring(2))]

    return (
        <div id = "promotionScreenCont">
            <div id = "promotionContent"> 
        <Card id = "tableCard" sx={{ maxWidth: 550 }} >
        <TableContainer id ="promotionTableContainer">
   <Table stickyHeader aria-label="sticky table" id ="promotionTable"sx={{ maxWidth: 550 }} >
   <TableHead>
          <TableRow>
            <TableCell  >Promotions</TableCell>
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


        <AddPromotionView></AddPromotionView>
        </div>
        </div>
    )
}

export default PromotionScreen;