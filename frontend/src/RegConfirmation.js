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



function RegConfirmation() {

    return (
        <div id = "regConfirmationCont">
              
            <Card id = "regConfirmationCard" sx={{  maxWidth: 660, maxHeight: 750 }}>
                
               
                <div className = "center">
                    <Stack  direction="row">
                    <Typography   variant="h5">
               Your registration is complete!
            </Typography>
            <CheckCircleIcon sx = {{fontSize:35}} color="success"></CheckCircleIcon>
                    </Stack>
              
            <Typography gutterBottom  variant="body2">
                An email was sent to confirm registration.
            </Typography>
                </div>
           
    
        
            </Card>
           
        </div>
    )

}
export default RegConfirmation