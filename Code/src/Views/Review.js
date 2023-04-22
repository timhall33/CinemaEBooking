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


    console.log(props.booking.ticket)
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



        </List>
        </React.Fragment>
    )
}