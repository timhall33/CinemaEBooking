import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Stack from '@mui/material/Stack';
import { useState, useEffect} from 'react';
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
//import { Show } from '@chakra-ui/react';
import Review from './Review';
import PaymentForm, { PaymentBox } from './PaymentForm';
import AddressForm from './AddressForm';
import OrderConfirmationView from './OrderConfirmationView';
import PlaceOrder from './PlaceOrder';
import { useParams } from 'react-router-dom';
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { db} from '../Controls/Firebase';
import { CardContent, Box } from "@mui/material";
import { useMemo } from 'react';
import { storeBooking } from '../Controls/FirebaseBookingFunctions';
import { app } from '../Controls/Firebase';
import { getAuth } from 'firebase/auth';
import { arrayUnion } from 'firebase/firestore';
import { auth } from '../Controls/Firebase';
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



function ShowTimeView(props) {
    const {movieTitle}  = useParams();
    const [times, setTimes] = useState([]);
    const [selectedDateIndex, setSelectedDateIndex] = useState(0);


    const [click, setClick] = useState(false)

    useEffect(() => {
      const moviesRef = collection(db, "movies");
      const q = query(moviesRef, where("movieTitle", "==", movieTitle), limit(1));
      getDocs(q)
        .then((querySnapshot) => {
          const data = querySnapshot.docs[0].data();
          setTimes(data.times);
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    }, []);
  
    const sortedDates = [...new Set(times.map((t) => t.date))].sort();

    const handleTabChange = (event, newValue) => {
        setSelectedDateIndex(newValue);
      };
    
    return (
      <Card elevation={3} id="showTimeView" sx={{ maxWidth: 680, width: "100%" }}>
        <CardContent>
          <Tabs value={selectedDateIndex} onChange={handleTabChange} variant="scrollable" scrollButtons="auto"aria-label="screening options">
            {sortedDates.map((date, index) => (
              <Tab key={index} label={date} />
            ))}
          </Tabs>
          {sortedDates.map((date, index) => (
            <TabPanel key={index} date={date} times={times} value={selectedDateIndex} index={index} className="showTimePanel">
            <Stack className = "showTimeOption" direction="row">
              {selectedDateIndex === index &&times
                .filter((t) => t.date === date)
                .sort((a, b) => a.time.localeCompare(b.time))
                .map((t, index) => (
                  <Button
                    key={index}
                    variant="contained"
                    sx={{ width: 50 }}
                    onClick={() => {
                    
                    
                    setClick((prev) => !prev)
                  
                    props.setBooking((prev) => {
                      return {...prev, showTime: t}
                    })
                    console.log(props.booking.showTime)
                    }}
                   

                  >
                    {t.time}
                  </Button>
                ))}
                 </Stack>
                 {props.booking.showTime.date && (
                  <p>You have selected {props.booking.showTime.date} at {props.booking.showTime.time} </p>
                 )}
            </TabPanel>
          ))}
        </CardContent>
      </Card>
    );
  }
  
  function TabPanel(props) {
    const { children, date, times, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`showTimePanel-${date}`}
        aria-labelledby={`showTimeTab-${date}`}
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

export function createTicket(ageCat, price, ticketCount) {
    return {ageCat, price, ticketCount}
}

/**
 * // Import the functions you need from the SDKs you need
 */
/**
 * Displays view that prompts user to input amount of ticket to purchase 
 * @returns 
 */
function TicketView(props) {

  const updateTotal = (tickets) => {
    var result = getTotal(tickets)
    props.setBooking((prev) => {return {...prev, price: result.total, count: result.count}})
  }



    var subtract = (index) => {
       const updatedTickets = props.booking.ticket.map((item,i) => {
            if (i === index) {
                return {ageCat: item.ageCat,price: item.price,ticketCount: item.ticketCount - 1}

            } else {
                return item
            }
        });
        props.setBooking((prev) => {return {...prev, ticket: updatedTickets, seat: []}})
        updateTotal(updatedTickets)
    }

    var add = (index) => {
        const updatedTickets = props.booking.ticket.map((item,i) => {
            if (i === index) {
              console.log(item.ticketCount + 1)
                return {ageCat: item.ageCat,price: item.price,ticketCount: item.ticketCount + 1}

            } else {
                return item
            }
        });
        props.setBooking((prev) => {return {...prev, ticket: updatedTickets,  seat: []}})
        updateTotal(updatedTickets)
    }




    var getTotal = (tickets) => {

      var total = 0;
      var count = 0;

     tickets.forEach((item) => {
        total = total + (parseInt(item.price) * parseInt(item.ticketCount))
        count = count + item.ticketCount
        
      })


    


      return {total: total, count: count}
    }

    return (

        <List sx={{ width: '100%', maxWidth: 550}} >

        {
        
        props.booking.ticket.map((ticket,index) => (
            <div key = {index}>
    <ListItem >
                <ListItemText primary={ticket.ageCat} secondary={ticket.price}></ListItemText>
                <div>
                <IconButton onClick={() => {subtract(index)}} disabled = {ticket.ticketCount === 0}> 
                    <RemoveCircleIcon></RemoveCircleIcon>
                    
                </IconButton>
                {ticket.ticketCount}
                <IconButton onClick={() => {add(index) } } >
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
function SeatView(props) {
  const seatQuery = query(collection(db, "seats"));
  const [seatData, setSeatData] = useState(null);

  var fetchSeat = async () => {
    var list = []
    const querySnapshot = await getDocs(seatQuery );
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const ordered = Object.keys(doc.data()).sort().reduce(
        (obj, key) => { 
          obj[key] = doc.data()[key]; 
          return obj;
        }, 
        {}
      );
      
      list.push(ordered)
      
 
    });

    return list
  }



  useEffect(() => {
  
    console.log(props.booking.seat)
    fetchSeat().then((res) => {
      setSeatData(res)
    })
    }, []);



    return (
        <Paper id="seatMapCont" sx={{}} elevation={3}>
        <Grid id ="seatMap">
            { seatData && (seatData.map((grid,index) => (
       
<IconButton key = {index} disabled={grid.userId !== null  } onClick={() => {

  if (grid.userId === null && !props.booking.seat.some(item => item.row === grid.row && item.col === grid.col) && props.booking.count !== 0) {

    

      props.setBooking((prev) => {return {...prev, seat: [...prev.seat, {...grid, userId: auth.currentUser.uid}], count: prev.count - 1}})
  } else if (props.booking.seat.some(item => item.row === grid.row && item.col === grid.col)) {
   


 props.setBooking((prev) => {return {...prev, seat: prev.seat.filter(item => item.row !== grid.row || item.col !== grid.col), count: prev.count + 1}})


  } 

}}>
    <EventSeatIcon  color={grid.userId !== null ? "error" : props.booking.seat.some(item => item.row === grid.row && item.col === grid.col) ? "secondary" :   "primary"} fontSize='large'></EventSeatIcon>
</IconButton>

          
            )))}
         
        </Grid>


        <Typography>You have {props.booking.count} seats left to select </Typography>

        {props.booking.seat.map((item,index) => (
 <Typography key = {index}>You have selected seat {item.row}{item.col} </Typography>
        ))

        }
       
        </Paper>
        

    )
}

function BuyTicketViews(props) {

    const steps = ['Select a showtime','Select tickets',"Select seats",'Review your order', 'Shipping address', 'Payment details', 'Confirm Booking']
    const [selectedCreditCard, setSelectedCreditCard] = useState(null);
    const [step,setStep] = useState(0)
    const {movieTitle}  = useParams();
    const handleCreditCardSelect = (creditCardInfo) => {
      setSelectedCreditCard(creditCardInfo);
      console.log("creditCardInfo: " + selectedCreditCard)
    };
    const [name, setName] = useState('');
    const [cardNum, setCardNum] = useState('');
    const [date, setDate] = useState('');
    const [cvv, setCvv] = useState('');
  

    useEffect(() => {
      props.setBooking((prev) => {return {...prev, movie: movieTitle}})
    },[])

  
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
    <ShowTimeView booking = {props.booking} setBooking={props.setBooking} ></ShowTimeView>
)
}
{ step === 1 && (
   <TicketView  booking = {props.booking} setBooking={props.setBooking} ></TicketView>
)
}

{ step === 2 && (
   <SeatView  booking = {props.booking} setBooking={props.setBooking} ></SeatView>
)
}

{ step === 3 && (
   <Review  booking = {props.booking} setBooking={props.setBooking} ></Review>
)
}

{ step === 4 && (
   <AddressForm  booking = {props.booking} setBooking={props.setBooking}  ></AddressForm>
)
}

{ step === 5 && (
  <div>
    <PaymentBox 
        setName={setName} 
        setCardNum={setCardNum} 
        setDate={setDate} 
        setCvv={setCvv} 
      />
    <PaymentForm 
        booking = {props.booking} 
        setBooking={props.setBooking} 
        name={name}
        cardNum={cardNum}
        date={date}
        cvv={cvv}
      />
   </div>
)
}

{ step === 6 && (
   <PlaceOrder booking = {props.booking} setBooking={props.setBooking} ></PlaceOrder>
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
        <Button onClick={() => 
        
        {
         if (step === steps.length - 1 ) {
          console.log(getAuth(app).currentUser.uid)
          storeBooking(props.booking.movie, props.booking.showTime, props.booking.ticket, props.booking.price, props.booking.seat, props.booking.address, props.booking.payment, getAuth(app).currentUser.uid)
         } else {
          nextStep()
         }
        }
      
        
        
        } variant="contained" >


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