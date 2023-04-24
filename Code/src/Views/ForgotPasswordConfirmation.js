import Typography from '@mui/material/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';


function ForgotPasswordConfirmation() {

    const navigate = useNavigate()
    
    return (
        <div id = "regConfirmationCont">
              
            <Card id = "regConfirmationCard" sx={{  maxWidth: 660, maxHeight: 750 }}>
                
               
                <div className = "center">
                    <Stack  direction="row">
                    <Typography   variant="h5">
                    Please check your email
            </Typography>
            <CheckCircleIcon sx = {{fontSize:35}} color="success"></CheckCircleIcon>
                    </Stack>
              
            <Typography gutterBottom  variant="body2">
            An email with instructions to create your password has been sent. 
            You may need to wait a few minutes to receive the email, or check your spam or junk folders.
            </Typography>
                </div>
           
            <Button 
            onClick={() => navigate('/login')}
            variant="contained"
            color="primary"
            value="clicked" > Sign in </Button>
            </Card>
           
        </div>
    )

}
export default ForgotPasswordConfirmation