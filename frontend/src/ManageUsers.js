import { db} from './Firebase'
import { getDoc} from "firebase/firestore"
import { collection, query, where, getDocs, deleteDoc  } from "firebase/firestore";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import Card from '@mui/material/Card';
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import { getAuth } from "firebase/auth";
import { onSnapshot } from "firebase/firestore";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { Typography } from '@mui/material';

async function readUsers() {
    const q = query(collection(db, "users"));
  
  
    var list = []
    const querySnapshot = await getDocs(q);
    
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        list.push(doc.data())
       console.log(doc)
      });
    
  
  
  
    return list;
    
  }

  async function updateUserActivityStatus(status,uid) {
    const auth = getAuth();
    const user = auth.currentUser;

  
        const docRef = doc(db, 'users/', uid)
        const data = { 
            userStatus: status
          };

          await updateDoc(docRef, data)
          .then((res) => {
            console.log('Document updated successfully!');
          
          })
          .catch((error) => {
            console.error('Error updating document: ', error);
          });
    
        

  }

export default function ManageUsers() {
    const [data, setData] = useState()

    useEffect(() => {
       readUsers().then((res) => {
            setData(res)
            console.log(res)
       })
      },[])
    return (
        <div id = "manageUserScreenCont" style={{display:"flex", justifyContent:"center"}}>
            
        <div id = "manageUserContent" style={{display:"flex", justifyContent:"center",  width: "100%", flexDirection:"column", alignItems:"center"}}> 
        <Typography variant="h2">Manage Users</Typography>
    <Card id = "tableCard" sx={{ maxWidth: 750, width: "100%" }} >
    <TableContainer id ="userTableContainer">
<Table stickyHeader aria-label="sticky table" id ="userTable"sx={{ maxWidth: 750, width: "100%" }} >
<TableHead>
      <TableRow>
        <TableCell  >Users</TableCell>
        <TableCell  >Email</TableCell>
        <TableCell  >Status</TableCell>
      </TableRow>
    </TableHead>
<TableBody>


{data !== undefined ? data.map((entry,index) => (
<TableRow key = {index}>
      <TableCell component="th" scope="row">
            <p>{entry.firstName} {entry.lastName}</p>
          </TableCell>
          <TableCell component="th" scope="row">
            <p>{entry.email}</p>
          </TableCell>
          <TableCell component="th" scope="row">
           
            <Button onClick={(e) => {
                updateUserActivityStatus(!entry.userStatus, entry.uid).then((e) => {
                    readUsers().then((res) => {
                        setData(res)
                        console.log(res)
                   })
                })
            }}>
            <p>{String(entry.userStatus)}</p>
            </Button>
          </TableCell>
</TableRow>
)) : null

}

</TableBody>
</Table>


    </TableContainer>
    </Card>

    </div>
    </div>
    )

}