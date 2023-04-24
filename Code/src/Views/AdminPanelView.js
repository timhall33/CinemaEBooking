
import { Box } from "@mui/material"
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function AdminPanelView() {
    const navigate = useNavigate()
    return (
          <Box
              sx={{
      marginTop: 8,
      display: 'flex',
      flexDirection: 'row',
      columnGap: "20px",
      alignItems: 'center',
      justifyContent: 'center',
    }}>
<Button variant="contained" onClick={() => {navigate("/manage");}}>
        Manage Movies
    </Button>
    <Button variant="contained" onClick={() => {navigate("/manageUsers");}}>
        Manage Users
    </Button>
    <Button variant="contained" onClick={() => {navigate("/promotions");}}>
        Manage Promotion
    </Button>

    </Box>
    )
}