
import Typography from '@mui/material/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import CardMedia from '@mui/material/CardMedia';

import Divider from '@mui/material/Divider';
import { getAuth } from 'firebase/auth';
import { app } from '../Controls/Firebase';

/*
Upon successful payment, the 
system should display a booking confirmation 
page/ window, displaying booking number, order details, and the order total. 
Along with the confirmation page, a confirmation e-mail should be sent to the user’s email address.

Order total price is the sum of tickets prices, sales tax, and online fees.
*/



/**
 * Displays poster of the selected movie and selected showtime
 * @returns view 
 */
function MovieSelection(props) {
    return (
        <Stack id = "movieSelection" direction="row">

        <Stack className="movieSelectionDetails" >
        <Typography  variant="h5">
               {props.booking.movie}
            </Typography>
            <Typography  variant="h7">
            {props.booking.showTime.date} at {props.booking.showTime.time}
            </Typography>
        </Stack>


        </Stack>
    )

}
/**
 * Displays bill breakdown 
 * @param {*} props 
 * @returns 
 */
function OrderSummary(props) {
    return (
        <Stack className = "orderSummary" direction="row">
            <Typography  variant="h6">
               {props.detailOrderType}
            </Typography>
            <Typography  variant="h6">
            {props.price}
            </Typography>
            </Stack>

    )
}

function OrderConfirmationView(props) {

    var total = (1.23 + 6.66 + props.booking.price).toFixed(2)

    return (
        <div id = "orderConfirmationCont">
              
            <Card id = "orderConfirmationCard" sx={{  maxWidth: 660, maxHeight: 750 }}>
                
               
                <div className = "center">
                    <Stack  direction="row">
                    <Typography   variant="h5">
               Booking confirmed!
            </Typography>
            <CheckCircleIcon sx = {{fontSize:35}} color="success"></CheckCircleIcon>
                    </Stack>
              
              {
                getAuth(app).currentUser && (
                    <Typography gutterBottom  variant="body2">
                    Order confirmation sent to {   getAuth(app).currentUser.email}
                </Typography>
                )
              }
       
                </div>
           

            <Typography gutterBottom   variant="h6">
               Order ID: #85891OWEIMN
            </Typography>

            <MovieSelection booking={props.booking}></MovieSelection>


            <div id = "orderSumCont">
            <Typography variant="h6">
               Order Summary
            </Typography>
            <OrderSummary price = {"$" + props.booking.price} detailOrderType={"Ticket"}> </OrderSummary>
            <OrderSummary price = {"$" + 1.23} detailOrderType={"Sales tax"}> </OrderSummary>
            <OrderSummary price = {"$" + 6.66} detailOrderType={"Fee"}> </OrderSummary>
            <OrderSummary price = {"$" + total} detailOrderType={"Total"}> </OrderSummary>
         
            </div>
 
            
        
            </Card>
           
        </div>
    )

}

export default OrderConfirmationView;