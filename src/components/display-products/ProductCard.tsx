import { Snackbar, TextField } from "@material-ui/core";
import {
  ShoppingCartOutlined,
} from "@material-ui/icons";
import { Alert, Box } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { CartContext } from "../../context/cart.context";
import Product from "../../models/Product";


const Info = styled.div`
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease;
    cursor: pointer;
  `;

const Container = styled.div`
    flex: 1;
    margin: 5px;
    min-width: 280px;
    height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5fbfd;
    position: relative;
    &:hover ${Info}{
      opacity: 1;
    }
  `;

const Circle = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: white;
    position: absolute;
  `;

const Image = styled.img`
    height: 75%;
    z-index: 2;
  `;

const Icon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #989898;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    transition: all 0.
    &:hover {
      background-color: #e9f5f5;
      transform: scale(1.1)
  `;
const Stock = styled.div`
    width: 100px;
    height: 40px;
    border-radius: 20px;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 10px;
    transition: all 0.5s ease;
    color: black;
    text-align: center;
    font-weight: bold;
    position: absolute;
    bottom: 5px;
    right: 5px;
  `;
  const Price = styled.div`
    width: 100px;
    height: 40px;
    border-radius: 20px;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 10px;
    transition: all 0.5s ease;
    color: black;
    text-align: center;
    font-weight: bold;
    position: absolute;
    bottom: 5px;
    left: 5px;
  `;


interface productProps {
  product: Product,
  key: number
}


export const ProductCard = (props: productProps) => {
  const el = document.getElementById("price");

  const { cart, setCart } = useContext(CartContext);

  const [quant, setQuant] = useState('1');

  const [inCart, setInCart] = useState(0);

  useEffect(() => {
    const currentCart = [...cart]
    for (var x = 0; x < currentCart.length; x++) {
      if (currentCart[x].id === props.product.id) {
        setInCart(currentCart[x].quantity);
      }
    }
  }, [cart, props.product.id]);

  function price(){
    
    console.log(props.product.price);
    var priceCheck = new String("$"+props.product.price.toFixed(2))
    return priceCheck
/*  }else{
     el.style.display = "none"; 
 } */
  } 

  const [open, setOpen] = useState(false);

  const [stockOpen, setStockOpen] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuant(event.target.value);

  }

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setStockOpen(false);
    setOpen(false);
  };

  const addItemToCart = (product: Product) => {

    const newCart = [...cart]
    const index = newCart.findIndex((searchProduct) => {
      return searchProduct.id === product.id
    })
    if (index === -1) {
      if (Number(quant) > props.product.quantity) { setStockOpen(true); }
      else { newCart.push(product); setOpen(true); setInCart(product.quantity) }
    }
    else {

      if (Number(quant) + newCart[index].quantity > props.product.quantity) { setStockOpen(true); }
      else { newCart[index].quantity += product.quantity; setOpen(true); setInCart(newCart[index].quantity) }
    }

    setCart(newCart)


  }

    function priceDetails(){
      console.log(props.product.price)
    }

    return (

    <Container>

      <Circle />
      <Image src={props.product.image} />

      <Info>

        <Box sx={{ backgroundColor: '#f5fbfd', borderRadius: 1, width: '30%' }}>

          <TextField
            id="Quantity"
            style={{backgroundColor:'#989898'}}
            label="Quantity"
            type="number"
            size="small"
            inputProps={{
              inputMode: 'numeric',
              min: '0',
            }}
            defaultValue="1"
            variant="filled"
            onChange={handleChange}
          />
        </Box>
        {/* <Stock></Stock> */}
        <Icon>
          <ShoppingCartOutlined onClick={() => {

            if (Number(quant) > 0) addItemToCart({ ...props.product, quantity: Number(quant) }

              )}} />
          </Icon>
          <Stock>Stock: {props.product.quantity-inCart}</Stock>
          <Price id="price">{price()} </Price>
        </Info>

      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{vertical:"top",horizontal:"center"}}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Added item to cart!
        </Alert>
      </Snackbar>

      <Snackbar
        open={stockOpen}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{vertical:"top",horizontal:"center"}}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Amount in cart over stock!
        </Alert>
      </Snackbar>
    </Container>
  );
};