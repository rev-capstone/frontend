import { Box, Button, TextField } from "@material-ui/core";
import {
    ShoppingCartOutlined,
  } from "@material-ui/icons";
import { flexbox } from "@mui/system";
import { useContext } from "react";
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
<<<<<<< HEAD
  const buttonStyle ={
    height: "40px",
    width: "40px"
  };
  const qtyStyle ={
    height: "34px",
    width: "35px"
  };
  
  const myStyle = {
    float: "right",
    display: "flex",
    allignItems: "center"
    /* flexDirection: "column" */
  };
  
=======

>>>>>>> 8c799cdb8459f7f6336303f9ee43993d48540cbf
  interface productProps {
      product: Product,
      key: number
  }

  export const ProductCard = (props: productProps) => {
    const { cart, setCart } = useContext(CartContext);

    const addItemToCart = (product: Product) => {

      const newCart = [...cart]
      const index = newCart.findIndex((searchProduct) => {
        return searchProduct.id === product.id
      })

      if (index === -1) newCart.push(product)
      else newCart[index].quantity += product.quantity

      setCart(newCart)
    }

    return (
      <Container>
        <Circle />
        <Image src={props.product.image} />
        <Info>
        <Box component="form">
          <TextField
            id="outlined-basic"
            label="Quantity"
            defaultValue="1"
          />
        </Box>
          <Icon>
            <ShoppingCartOutlined onClick={() => {
              addItemToCart({...props.product, quantity: 1}
              //Make increment bar appear
              )}} />
          </Icon>
<<<<<<< HEAD
          <Icon>
            <SearchOutlined />
          </Icon>
          <div style={myStyle}>
            <form action="">
              <input type="submit" id="SubtBtn" style={buttonStyle}/>
              <input type="text" style={qtyStyle}/>
              <input type="submit" id="AddBtn" style={buttonStyle} />
            </form>
          </div>
=======
>>>>>>> 8c799cdb8459f7f6336303f9ee43993d48540cbf
        </Info>
      </Container>
    );
  };