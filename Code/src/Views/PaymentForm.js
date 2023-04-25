import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { useEffect, useState } from 'react';
import { readCreditCard } from './EditCardPayment';
import { auth, db, app } from '../Controls/Firebase';
import EditIcon from '@mui/icons-material/Edit';
import { collection, query, where, getDocs } from "firebase/firestore";
import { decryptWithAES } from '../Encrypt';

export function PaymentBox(props) {
  const [data, setData] = useState()
  const [selectedRow, setSelectedRow] = useState(-1);
  const [isValid, setIsValid] = useState(false);
  const handleRowClick = async (index, cardNumber) => {    
    const creditCardRef = collection(db, 'creditcard');
    const q = query(creditCardRef, where('cardNumber', '==', cardNumber));
    const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const cardData = querySnapshot.docs[0].data();
        props.setName(cardData.cardType);
        props.setCardNum(cardData.cardNumber);
        props.setDate(cardData.cardExp);
        props.setCvv(cardData.cvv);
      }
       else {
        console.log('No matching documents found.');
      }
    };
  useEffect(() => {
    readCreditCard(auth.currentUser.uid).then((res) => {
      setData(res)
      console.log(res)
  })
  },[])
  return (
    <React.Fragment>
       <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
    <Card id = "tableCard" sx={{ maxWidth: 550 }} >
      <TableContainer id ="promotionTableContainer">
        <Table stickyHeader aria-label="sticky table" id ="promotionTable"sx={{ maxWidth: 550 }} >
          <TableHead>
            <TableRow>
              <TableCell>Cards</TableCell>
          </TableRow>
        </TableHead>
          <TableBody>
            { data !== undefined ? data[0].map((entry,index) => (
              <TableRow key = {index} 
                        className = {`paymentBoxTableRow ${ index === selectedRow ? "paymentBoxTableSelectedRow" : ""}`}
                        onClick={() => handleRowClick(index, entry.cardNumber)}>
                  <TableCell component="th" scope="row">
                      {entry.cardType}
                  </TableCell>
              </TableRow>
            ))
            : null
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
    </React.Fragment>
  )
}

export default function PaymentForm(props) {
  console.log("default value: " + props.name)
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            label="Card Type"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
            value = {props.booking.payment.name || props.name}
            onChange={(e) => {
              props.setBooking((prev) => {
                return {...prev, payment: {...prev.payment, name: e.target.value}}
              })

            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
            value = {props.booking.payment.cardNumber || decryptWithAES(props.cardNum)}
            onChange={(e) => {
              props.setBooking((prev) => {
                return {...prev, payment: {...prev.payment, cardNumber: e.target.value}}
              })

            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="expDate"
            label="Expiry date"
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
            value = {props.booking.payment.date || decryptWithAES(props.date)}
            onChange={(e) => {
              props.setBooking((prev) => {
                return {...prev, payment: {...prev.payment, date: e.target.value}}
              })

            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
            value = {props.booking.payment.cvv || decryptWithAES(props.cvv)}
            onChange={(e) => {
              props.setBooking((prev) => {
                return {...prev, payment: {...prev.payment, cvv: e.target.value}}
              })

            }}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}