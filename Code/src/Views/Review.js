import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/material/IconButton';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Divider from '@mui/material/Divider';
import { grey } from '@mui/material/colors';
import BuyTicketViews from './BuyTicketViews';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useEffect } from 'react';
import { TextField } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {db} from "../Controls/Firebase"
import { query } from 'firebase/firestore';
import { collection, where, limit, getDocs} from 'firebase/firestore';

const products = [
  {
    name: 'Product 1',
    desc: 'A nice thing',
    price: '$9.99',
  },
  {
    name: 'Product 2',
    desc: 'Another thing',
    price: '$3.45',
  },
  {
    name: 'Product 3',
    desc: 'Something else',
    price: '$6.51',
  },
  {
    name: 'Product 4',
    desc: 'Best thing of all',
    price: '$14.11',
  },
  { name: 'Shipping', desc: '', price: 'Free' },
];

function PromotionField(props) {

  const [promo, setPromo] = useState("")
  const [promoError , setPromoError] = useState(false)
  const [errorText, setErrorText] = useState ("")
  const [buttonDisabled, setButtonDisabled] = useState(false)

    const applyPromotion = () => {
      const promoRef = collection(db, "promotions");
      const q = query(promoRef, where("title", "==", promo), limit(1));
      getDocs(q)
        .then((querySnapshot) => {
          if (querySnapshot.empty) {
            setPromoError(true)
            setErrorText("Invalid Promo Code")
            console.log("no matching promos")
          } else {
            setPromoError(false)
            setErrorText("")
            setButtonDisabled(true)
            const data = querySnapshot.docs[0].data();
            var promotionAmount = data.discount
            promotionAmount = (100 - parseFloat(promotionAmount)) / 100
            var newPrice = props.booking.price * promotionAmount
            
            props.setBooking((prev) => {return {...prev, price: newPrice}})

          }
     
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    }
      return (
        <Stack>
        <TextField
          label="Enter promotional code" 
          fullWidth 
          multiline
          variant="filled"
          onChange={(e) => {      
            setPromo(e.target.value) 
            props.updateTotal()
            setButtonDisabled(false)        
          }}
          error= {promoError}
          helperText = {errorText}
          >
        </TextField>
        <Button type="submit" variant="contained" onClick={ applyPromotion } disabled={buttonDisabled}>
        Apply
      </Button>
         </Stack>


      )
}

const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
  { name: 'Card type', detail: 'Visa' },
  { name: 'Card holder', detail: 'Mr John Smith' },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date', detail: '04/2024' },
];
function createTicket(ageCat, price, ticketCount) {
  return {ageCat, price, ticketCount}
}
export default function Review(props) {

  useEffect(() => {
    updateTotal()
},[props.booking.ticket])


useEffect(() => {
  reflectPrice()
}, [props.booking.price])

var updateTotal = () => {
  props.setBooking((prev) => {return {...prev, price: getTotal(props.booking.ticket)}})
}

var reflectPrice = () => {
  props.setBooking((prev) =>  {return {...prev, price: props.booking.price}})
}

var getTotal = (tickets) => {

  var total = 0;

  props.booking.ticket.forEach((item) => {
    total = total + (parseInt(item.price) * parseInt(item.ticketCount))
  })





  return total
}

    var subtract = (index) => {
       const updatedTickets = props.booking.ticket.map((item,i) => {
            if (i === index) {
                return {ageCat: item.ageCat,price: item.price,ticketCount: item.ticketCount - 1}

            } else {
                return item
            }
        });
        props.setBooking((prev) => {return {...prev, ticket: updatedTickets}})
    }

    var add = (index) => {
        const updatedTickets = props.booking.ticket.map((item,i) => {
            if (i === index) {
                return {ageCat: item.ageCat,price: item.price,ticketCount: item.ticketCount + 1}

            } else {
                return item
            }
        });
    
        props.setBooking((prev) => {return {...prev, ticket: updatedTickets}})
    }

    var deleted = (index) => {
      const updatedTickets = props.booking.ticket.map((item,i) => {
        if (i === index) {
            return {ageCat: item.ageCat,price: item.price,ticketCount: 0}

        } else {
            return item
        }
    });

    props.setBooking((prev) => {return {...prev, ticket: updatedTickets}})
    }


  


    return (

        <React.Fragment>
          <Typography variant ="h6" gutterBottom>
            Order Summary
          </Typography>
          <List sx={{ width: '100%', maxWidth: 550}} >

        {props.booking.ticket.map((ticket,index) => (
            <div key = {index}>
    <ListItem >
                <ListItemText primary={ticket.ageCat} secondary={ticket.price}></ListItemText>
                <div>
                <IconButton onClick={() => {subtract(index); }} disabled = {ticket.ticketCount === 0}> 
                    <RemoveCircleIcon></RemoveCircleIcon>
                </IconButton>
                {ticket.ticketCount}
                <IconButton onClick={() => {add(index); }}>
                  <AddCircleOutlineIcon></AddCircleOutlineIcon>
                </IconButton>
                <IconButton disabled = {ticket.ticketCount === 0} onClick={() => {deleted(index);}}>
                <DeleteIcon></DeleteIcon>
                </IconButton>
                </div>
               
            </ListItem>
            <Divider variant="middle" />
            </div>
        
        ))

        }

<Typography variant ="h6" gutterBottom>
            Your total is {props.booking.price}
          </Typography>

        </List>
        <PromotionField booking = {props.booking} setBooking={props.setBooking} updateTotal={updateTotal}> </PromotionField>
        </React.Fragment>
    )
}