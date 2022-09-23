import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Box, Button } from '@mui/material';
import Address from '../../models/Address';



const nameRegex = new RegExp( /^[a-zA-Z\s]*$/);
const postalCodeRegex = new RegExp(/(^\d{5}$)|(^\d{9}$)|(^\d{5}-\d{4}$)/);

interface addressFormProps {
  updateAddress: (addresses: Address) => void
  handleNext: () => void
}

export default function AddressForm(props: addressFormProps) {
  let [errorMessage, setErrormessage] = React.useState({errmessage: ""});
  let [visible, setVisible] = React.useState({visibility: false});

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const data = new FormData(event.currentTarget);

    if(!nameRegex.test(`${data.get('firstName')}`) || !nameRegex.test(`${data.get('lastName')}`)){

      setErrormessage({...errorMessage, errmessage: "\nName can only contain letters!"});
      setVisible({...visible, visibility: true});

    }

    else if(!postalCodeRegex.test(`${data.get('zip')}`)){

      setErrormessage({...errorMessage, errmessage: "\nPlease enter valid zip code!"});
      setVisible({...visible, visibility: true});

    }

    else if (!nameRegex.test(`${data.get('city')}`)){

      setErrormessage({...errorMessage, errmessage: "\nCity can only contain letters!"});
      setVisible({...visible, visibility: true});

    }

    else if (!nameRegex.test(`${data.get('state')}`)){

      setErrormessage({...errorMessage, errmessage: "\nState can only contain letters!"});
      setVisible({...visible, visibility: true});

    }

    else{

      props.updateAddress(
        {
          firstName: `${data.get('firstName')}`,
          lastName: `${data.get('lastName')}`,
          address1: `${data.get('address1')}`,
          address2: `${data.get('address2')}`,
          city: `${data.get('city')}`,
          state: `${data.get('state')}`,
          zip: `${data.get('zip')}`,
          country: `${data.get('country')}`
        }
      )
      props.handleNext()

    }

    
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      {visible.visibility ? <div style={{ color: 'red', display: 'block' }}> {errorMessage.errmessage}</div> : <></>}
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              inputProps={{maxLength: 255}}
              required
              id="firstName"
              name="firstName"
              label="First name"
              fullWidth
              autoComplete="given-name"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              inputProps={{maxLength: 255}}
              required
              id="lastName"
              name="lastName"
              label="Last name"
              fullWidth
              autoComplete="family-name"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              inputProps={{maxLength: 255}}
              required
              id="address1"
              name="address1"
              label="Address line 1"
              fullWidth
              autoComplete="shipping address-line1"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              inputProps={{maxLength: 255}}
              id="address2"
              name="address2"
              label="Address line 2"
              fullWidth
              autoComplete="shipping address-line2"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              inputProps={{maxLength: 255}}
              required
              id="city"
              name="city"
              label="City"
              fullWidth
              autoComplete="shipping address-level2"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              inputProps={{maxLength: 255}}
              required
              id="state"
              name="state"
              label="State/Province/Region"
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              inputProps={{maxLength: 255}}
              required
              id="zip"
              name="zip"
              label="Zip / Postal code"
              fullWidth
              autoComplete="shipping postal-code"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              inputProps={{maxLength: 255}}
              id="country"
              name="country"
              label="Country"
              fullWidth
              autoComplete="shipping country"
              variant="standard"
            />
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, ml: 1 }}
          >
            Next
          </Button>
        </Box>
      </Box>
    </React.Fragment>
  );
}