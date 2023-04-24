import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { fetchData } from './EditProfile';
import { useEffect } from 'react';
import { useState } from 'react';


export default function PlaceOrder(props) {



  const addresses = [props.booking.address.addy1, props.booking.address.city, props.booking.address.state,
  props.booking.address.zip, props.booking.address.country]
  
  const products = props.booking.ticket
  const payments = [
    { name: 'Card type', detail: props.booking.payment.name },
  { name: 'Card holder', detail: props.booking.address.firstName + " " + props.booking.address.lastName },
  { name: 'Card number', detail: props.booking.payment.cardNumber },
  { name: 'Expiry date', detail: props.booking.payment.date },
  ]

  
  
  


  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding style={{width: "250px"}}>
        {products.map((product) => {

          return product.ticketCount != 0 && (
            <ListItem style={{display: "flex", justifyContent:"space-between"}} key={product} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.ageCat} secondary={product.ticketCount} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
          )

          
          
}

        )}
      </List>
      <Typography variant="h6" gutterBottom>
        Total: {props.booking.price}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>

       
    <Typography gutterBottom>{props.booking.address.firstName} {props.booking.address.lastName}</Typography>
          


          <Typography gutterBottom>{addresses.join(', ')}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}