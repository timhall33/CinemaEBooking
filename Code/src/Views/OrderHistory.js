import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import { getAuth } from 'firebase/auth';
import { app } from '../Controls/Firebase';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../Controls/Firebase';
import { useState } from 'react';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export async function readBooking(userId) {
  const q = query(collection(db, "booking"), where("userId", "==", userId));


  var list = []
  const querySnapshot = await getDocs(q);
  
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    list.push(doc.data())
   console.log(doc)
  });



  return list;
  
}


const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(orderNum, movie, total) {
  return { orderNum, movie, total };
}



export default function CustomizedTables() {
  
  const [order, setOrder] = useState([])

  React.useEffect(() => {

    readBooking(getAuth(app).currentUser.uid).then((res) => {
      setOrder(res)
    })
  },[])

  return (
    
    <TableContainer component={Paper}>
        <Typography component="h1" variant="h5" align='center'>
            Order History
        </Typography>
      <Table sx={{ maxWidth: 540 }} aria-label="customized table" align='center'>
        <TableHead>
          <TableRow>
            <StyledTableCell>Order Number</StyledTableCell>
            <StyledTableCell> Movie Title</StyledTableCell>
            <StyledTableCell> Total</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {order.map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {index}
              </StyledTableCell>
              <StyledTableCell>{row.movie}</StyledTableCell>
              <StyledTableCell>{row.price}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}