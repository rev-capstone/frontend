import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import PaymentDetail from '../../models/PaymentDetail';
import { Box, Button } from '@mui/material';

const nameRegex = new RegExp( /^[a-zA-Z\s]*$/);
const cardRegex = new RegExp( /(?<=^|[^0-9])[0-9]{16}(?=[^0-9]|$)|[0-9]{4}[-| |_][0-9]{4}[-| |_][0-9]{4}[-| |_][0-9]{4}/);
const cvvRegex = new RegExp(/^[0-9]{3}$/);
const expRegex = new RegExp(/(\d){2}\/(\d){2}/);



interface paymentFormProps {
  handleBack: () => void
  handleNext: () => void
  updatePayment: (paymentDetail: PaymentDetail[]) => void
}

export default function PaymentForm(props: paymentFormProps) {

  let [errorMessage, setErrormessage] = React.useState({errmessage: ""});
  let [visible, setVisible] = React.useState({visibility: false});

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if(!nameRegex.test(`${data.get('cardName')}`)){

      setErrormessage({...errorMessage, errmessage: "\nName can only contain letters!"});
      setVisible({...visible, visibility: true});

    }

    else if(!cardRegex.test(`${data.get('cardNumber')}`)){

      setErrormessage({...errorMessage, errmessage: "\nInvalid card number!"});
      setVisible({...visible, visibility: true});

    }
    

    else if(!cvvRegex.test(`${data.get('cvv')}`)){


      setErrormessage({...errorMessage, errmessage: "\nInvalid CVV!"});
      setVisible({...visible, visibility: true});

    }

    else if(!expRegex.test(`${data.get('expDate')}`)){


      setErrormessage({...errorMessage, errmessage: "\nInvalid Exp date!"});
      setVisible({...visible, visibility: true});

    }

    else{
      props.updatePayment(
        [
          {name: "Card Type", detail: `Visa`},
          {name: "Card Holder", detail: `${data.get('cardName')}`},
          {name: "Card Number", detail: formatCardNumber(`${data.get('cardNumber')}`)},
          {name: "Expiry Date", detail: `${data.get('expDate')}`}
        ]
      )
      props.handleNext()

    }
    
  }

  const formatCardNumber = (cardNumber: string) => {
    return `xxxx-xxxx-xxxx-${cardNumber.slice(-4)}`
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      {visible.visibility ? <div style={{ color: 'red', display: 'block' }}> {errorMessage.errmessage}</div> : <></>}
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="cardName"
              name="cardName"
              label="Name on card"
              fullWidth
              autoComplete="cc-name"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              title="Card number must be 16 digits!"
              inputProps={{maxLength: 20}}
              id="cardNumber"
              name="cardNumber"
              label="Card number"
              fullWidth
              autoComplete="cc-number"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              inputProps={{maxLength: 5}}
              id="expDate"
              name="expDate"
              label="Expiry date (MM/YY)"
              fullWidth
              autoComplete="cc-exp"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              inputProps={{maxLength: 3}}
              id="cvv"
              name="cvv"
              label="CVV"
              helperText="Last three digits on signature strip"
              fullWidth
              autoComplete="cc-csc"
              variant="standard"
            />
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={props.handleBack} sx={{ mt: 3, ml: 1 }}>
            Back
          </Button>
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