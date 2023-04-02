
import Typography from '@mui/material/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import CardMedia from '@mui/material/CardMedia';
import aotPic from './aot.png'
import Divider from '@mui/material/Divider';


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
function MovieSelection() {
    return (
        <Stack id = "movieSelection" direction="row">
<div>
<CardMedia id="moviePoster"
        component="img"
        image={aotPic}
        alt="movie"
      />
</div>
        <Stack className="movieSelectionDetails" >
        <Typography  variant="h5">
               Greatness
            </Typography>
            <Typography  variant="h7">
              Sunday, April 11 at 2:45 PM
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

function OrderConfirmationView() {

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
              
            <Typography gutterBottom  variant="body2">
                Order confirmation sent to patek@gmail.com
            </Typography>
                </div>
           

            <Typography gutterBottom   variant="h6">
               Order ID: #85891OWEIMN
            </Typography>


            <div id = "orderSumCont">
            <Typography variant="h6">
               Order Summary
            </Typography>
            <OrderSummary price = {"$0.00"} detailOrderType={"Ticket"}> </OrderSummary>
            <OrderSummary price = {"$0.00"} detailOrderType={"Sales tax"}> </OrderSummary>
            <OrderSummary price = {"$0.00"} detailOrderType={"Fee"}> </OrderSummary>
            <OrderSummary price = {"$0.00"} detailOrderType={"Total"}> </OrderSummary>
         
            </div>
 
            <MovieSelection></MovieSelection>
        
            </Card>
           
        </div>
    )

}

export default OrderConfirmationView;