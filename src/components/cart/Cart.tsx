import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CartContext } from "../../context/cart.context";
import Product from "../../models/Product";
import Navbar from "../navbar/Narbar";
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { TextField } from "@material-ui/core";
import { Box } from "@mui/material";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DeleteIconContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Info = styled.div`
  flex: 3;
`;

const ProductItem = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-family: Roboto;
`;

const ProductAmountContainer = styled.span`
  display: flex;
  align-items: center;
  margin: 5px;
`;

const ProductAmount = styled.div`
  font-size: 30px;
  font-weight: 200;
  margin-left: 20px;
`;

const ProductPrice = styled.span`
  font-size: 30px;
  font-weight: 200;
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const RemoveItem = styled.button`
  width: 10%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;


export const Cart = () => {
  const { cart, setCart } = useContext(CartContext);

  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let product: string = event.target.id;
    const newCart = [...cart]
    const index = newCart.findIndex((searchProduct) => {
      return searchProduct.name === product
    })

    newCart[index].quantity = parseInt(event.target.value);

    setCart(newCart)
  }

  const removeItemFromCart = (product: Product) => {

    const newCart = [...cart]
    const index = newCart.findIndex((searchProduct) => {
      return searchProduct.id === product.id
    })

    newCart.splice(index, 1);

    setCart(newCart)
  }

  const removeOneItemFromCart = (product: Product) => {

    const newCart = [...cart]
    const index = newCart.findIndex((searchProduct) => {
      return searchProduct.id === product.id
    })

    newCart[index].quantity > 1 ? newCart[index].quantity-- : newCart.splice(index, 1);

    setCart(newCart)
  }


  return (
    <Container>
      <Navbar />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton onClick={() => { navigate('/') }}>CONTINUE SHOPPING</TopButton>
        </Top>
        <Bottom>
          <Info>
            {
              cart.map((product) => (
                <>
                  <ProductItem>
                    <ProductDetail>
                      <Image src={product.image} />
                      <Details>
                        <ProductName>
                          <b>Product:</b> {product.name}
                        </ProductName>
                        <ProductId>
                          <b>ID:</b> {product.id}
                        </ProductId>
                      </Details>
                    </ProductDetail>
                    <PriceDetail>
                      <ProductPrice>$ {product.price}</ProductPrice>
                      <ProductAmountContainer>
                        <ProductAmount>
                          Qty: {product.quantity}
                        </ProductAmount>
                      </ProductAmountContainer>
                      <DeleteIconContainer>
                        <DeleteIcon onClick={() => removeOneItemFromCart(product)}></DeleteIcon>
                        <DeleteForeverIcon onClick={() => removeItemFromCart(product)}></DeleteForeverIcon>
                      </DeleteIconContainer>
                    </PriceDetail>

                  </ProductItem>
                  <Hr />
                </>
              ))
            }
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$
                {cart.reduce<number>((total, product) => total + product.price * product.quantity, 0)}
              </SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$
                {cart.reduce<number>((total, product) => total + product.price * product.quantity, 0)}
              </SummaryItemPrice>
            </SummaryItem>
            <Button onClick={() => { if (!(cart.length === 0)) { navigate('/checkout') } }}>CHECKOUT NOW</Button>
          </Summary>
        </Bottom>
      </Wrapper>
    </Container>
  );
};