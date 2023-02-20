import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Grid from '@mui/material/Unstable_Grid2';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import Divider from '@mui/material/Divider';
import { Route, Routes, Link } from "react-router-dom"
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Fragment } from 'react';
import { Show } from '@chakra-ui/react';
import Review from './Review';
import PaymentForm from './PaymentForm';
import AddressForm from './AddressForm';
import OrderConfirmationView from './OrderConfirmationView';
import PlaceOrder from './PlaceOrder';


/*
To book tickets, users should select the movie, 
show date and time, the number of tickets and the age category for each ticket. 
*/

/*
Users should be able to select their seats. 
The system must provide a graphical view of the hall and seats so that users can select their seats easily.
*/

/*
All views that are needed to buy tickets 
(select movie, select show time, select seats and age for each seat)
*/



function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Stack sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Stack>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

/**
 * Displays a list of showtimes for a movie
 * @returns 
 */
function ShowTimeView() {

    const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  var dates = ["Mar 12","Mar 13","Mar 14","Mar 15","Mar 16","Mar 17","Mar 18","Mar 19"]
  var times = ["3:45","4:45","5:34","7:34","8:45","9:45","10:30","11:30"]

    return (
        <Card  elevation = {3} id="showTimeView"    sx={{maxWidth: 680, width: "100%"}}>
                  <Tabs
              
        value={value} 
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="screening options"
      >
       {dates.map(date => (
        <Tab key = {date} label={date}></Tab>
       ))
       }
      </Tabs>
        {
            dates.map((date,index) => (
                <TabPanel key = {date} index={index} value={value} className="showTimePanel">
    <Stack className = "showTimeOption" direction="row">
        {times.map(item => (
            <Button key = {item} variant="contained" sx={{width: 50}}>
            {item}
            </Button>
        ))

        }
       </Stack>
                </TabPanel>
            ))
        }
 
            </Card>
    )
}

function createTicket(ageCat, price, ticketCount) {
    return {ageCat, price, ticketCount}
}

/**
 * Displays view that prompts user to input amount of ticket to purchase 
 * @returns 
 */
function TicketView() {

    const defaultTickets = [createTicket("Adult","$9.00",0),createTicket("Child","$6.00",0),createTicket("Senior","$6.00",0)]
    
    const [tickets, setTicket] = useState(defaultTickets)

    var subtract = (index) => {
       const updatedTickets = tickets.map((item,i) => {
            if (i === index) {
                return {ageCat: item.ageCat,price: item.price,ticketCount: item.ticketCount - 1}

            } else {
                return item
            }
        });
        setTicket(updatedTickets)
    }

    var add = (index) => {
        const updatedTickets = tickets.map((item,i) => {
            if (i === index) {
                return {ageCat: item.ageCat,price: item.price,ticketCount: item.ticketCount + 1}

            } else {
                return item
            }
        });
        setTicket(updatedTickets)
    }



    return (

        <List sx={{ width: '100%', maxWidth: 550}} >

        {tickets.map((ticket,index) => (
            <div key = {index}>
    <ListItem >
                <ListItemText primary={ticket.ageCat} secondary={ticket.price}></ListItemText>
                <div>
                <IconButton onClick={() => subtract(index)} disabled = {ticket.ticketCount === 0}> 
                    <RemoveCircleIcon></RemoveCircleIcon>
                </IconButton>
                {ticket.ticketCount}
                <IconButton onClick={() => add(index)}>
                    <AddCircleIcon></AddCircleIcon>
                     </IconButton>
                </div>
               
            </ListItem>
            <Divider variant="middle" />
            </div>
        
        ))

        }



        </List>
    )
}

/**
 * Displays graphical interface of the seat selection
 * @returns 
 */
function SeatView() {

    let grids = [...Array(30).keys()]
    return (
        <Paper id="seatMapCont" sx={{}} elevation={3}>
        <Grid id ="seatMap">
            {grids.map(grid => (
                <Grid key = {grid}>
<IconButton>
    <EventSeatIcon  color="primary" fontSize='large'></EventSeatIcon>
</IconButton>
                </Grid>
            ))}
        </Grid>
        </Paper>

    )
}

function BuyTicketViews() {

    const steps = ['Select a showtime','Select tickets',"Select seats",'Review your order', 'Shipping address', 'Payment details', 'Confirm Booking']

    const [step,setStep] = useState(0)

    const stepViews = [<ShowTimeView></ShowTimeView>,<SeatView></SeatView>]

    const nextStep = () => {
        setStep(step + 1)
    }

    const backStep = () => {
        setStep(step - 1)
    }

    return (
        <Stack id = "buyTicketViews">


        <Stepper activeStep={step} alternativeLabel sx={{width: "100%"}}>

        {steps.map(step => (
            <Step key={step}>
                   <StepLabel>{step}</StepLabel>
                </Step>
        ))}


        </Stepper>

{ step === 0 && (
    <ShowTimeView  ></ShowTimeView>
)
}
{ step === 1 && (
   <TicketView></TicketView>
)
}

{ step === 2 && (
   <SeatView></SeatView>
)
}

{ step === 3 && (
   <Review></Review>
)
}

{ step === 4 && (
   <AddressForm></AddressForm>
)
}

{ step === 5 && (
   <PaymentForm></PaymentForm>
)
}

{ step === 6 && (
   <PlaceOrder></PlaceOrder>
)
}

<Stack direction = "row" sx={{display: "flex",columnGap: 10}}>

{ step > 0 && (
    <Button onClick={() => backStep()} variant="contained" >
  BACK
</Button>

)

}


{ step < 7 && (

<Link to= {step == 6 ? "/orderConfirmation" : ""} style={{ textDecoration: 'none' }}>
        <Button onClick={() => nextStep()} variant="contained" >
        {step=== steps.length - 1 ? 'Confirm Booking' : 'Next'}
      </Button>
      </Link>
  

)

}


</Stack>





        </Stack>
      
    )
}


export default BuyTicketViews;