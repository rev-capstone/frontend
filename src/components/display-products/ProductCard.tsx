import { Snackbar, TextField } from "@material-ui/core";
import {
    ShoppingCartOutlined,
  } from "@material-ui/icons";
import { Box } from "@mui/material";
import { useContext, useState } from "react";
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
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    transition: all 0.5s ease;
    &:hover {
      background-color: #e9f5f5;
      transform: scale(1.1);
    }
  `;

  interface productProps {
      product: Product,
      key: number
  }
  

  export const ProductCard = (props: productProps) => {
    
    const { cart, setCart } = useContext(CartContext);

    const [quant ,setQuant] = useState('1');

    const[open, setOpen] = useState(false);

    const[stockOpen, setStockOpen] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuant(event.target.value);
      console.log(event.target.value);
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
          if(Number(quant) > props.product.quantity) {console.log("too many items"); setStockOpen(true);}
          else {newCart.push(product); setOpen(true);}
        }
        else {
          
          if(Number(quant) + newCart[index].quantity >props.product.quantity){console.log("too many items"); setStockOpen(true);}
          else {newCart[index].quantity += product.quantity; setOpen(true);}
        }
  
        setCart(newCart) 
      
      
    }

    return (
      <Container>
        <Circle />
        <Image src={props.product.image} />
        <Info>
        <Box sx={{backgroundColor:'#f5fbfd',borderRadius:1,width: '30%'}}>
          <TextField
            id="Quantity"
            label="Quantity"
            type="number"
            size="small"
            inputProps={{
              inputMode: 'numeric',
              min: '0'
            }}
            defaultValue="1"
            variant="filled"
            onChange={handleChange}
          />
        </Box>
          <Icon>
            <ShoppingCartOutlined onClick={() => {
              
              if(Number(quant)>0) addItemToCart({...props.product, quantity: Number(quant) }
              
              )}} />
          </Icon>
        </Info>
        <Snackbar 
          open={open}
          autoHideDuration={4000}
          onClose={handleClose}
          message="added to cart"
          />
         <Snackbar 
         
          open={stockOpen}
          autoHideDuration={4000}
          onClose={handleClose}
          message= {"Not enough of this item in stock to add too cart (Max stock availiable: " + props.product.quantity + ")"}
          />
      </Container>
    );
  };