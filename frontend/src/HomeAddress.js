import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function HomeAddress(props) {
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Home Address
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              id="address1"
              name="address1"
              label="Address line 1"
              fullWidth
              variant="filled"


              onChange={(e) => {
                props.setAddressData((prev) => ({
                  ...prev,
                  street: e.target.value,
                }))
        
              }}
              
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="city"
              name="city"
              label="City"
              fullWidth
              variant="filled"

              onChange={(e) => {
                props.setAddressData((prev) => ({
                  ...prev,
                  city: e.target.value,
                }))
        
              }}

            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="state"
              name="state"
              label="State/Province/Region"
              fullWidth
              variant="filled"

              onChange={(e) => {
                props.setAddressData((prev) => ({
                  ...prev,
                  state: e.target.value,
                }))
        
              }}

            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="zip"
              name="zip"
              label="Zip / Postal code"
              fullWidth
              variant="filled"

              onChange={(e) => {
                props.setAddressData((prev) => ({
                  ...prev,
                  zipCode: e.target.value,
                }))
        
              }}

            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="country"
              name="country"
              label="Country"
              fullWidth
              variant="filled"

              onChange={(e) => {
                props.setAddressData((prev) => ({
                  ...prev,
                  country: e.target.value,
                }))
        
              }}

            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }