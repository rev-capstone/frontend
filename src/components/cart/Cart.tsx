import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CartContext } from "../../context/cart.context";
import Product from "../../models/Product";
import Navbar2 from "../navbar/Navbar2";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
// import DeleteIcon from '@mui/icons-material/Delete';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Snackbar, TextField } from "@material-ui/core";
import { Alert, Box } from "@mui/material";
// import { mayalsolike } from '../../assets'
import YouMayAlsoLike from "../YouMayAlsoLike";
import eCommerceClient, { eCommerceApiResponse } from "../../remote/e-commerce-api/eCommerceClient";
import { apiGetAllProducts } from "../display-products/ProductCard";


const Container = styled.div``;

const Wrapper = styled.div`
  padding-left: 100px;
  padding-right: 100px;
  margin-top: 50px;
`;

const Title = styled.h1`
  font-weight: 800;
  text-align: center;
  color: black;
  font-size: 40px;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
`;

const TopButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #EC5800;
  color: white;
  font-weight: 600;
  cursor: pointer;
  border-radius: 25px;
  border: none;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DeleteIconContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const DeleteIcon = styled.div`
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

const ProductName = styled.span`
  font-size: 18px
  `;

const ProductId = styled.span`
  visibility: hidden
  `;

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
  font-size: 20px;
  font-weight: 500;
  margin-left: 20px;
  font-family: Roboto;
`;

const ProductPrice = styled.span`
  font-size: 30px;
  font-weight: 500;
  color: #EC5800;
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
  height: 58vh;
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
  background-color: #EC5800;
  color: white;
  font-weight: 600;
  cursor : pointer;
  border: none;
  border-radius: 25px;
`;

const RemoveItem = styled.button`
  width: 10%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Footer = styled.h1`
color: #979797;
text-align: center;
margin-top: 185px;
padding: 30px 10px;
font-weight: 700;
display: flex;
flex-direction: column;
align-items: center;
gap: 10px;
justify-content: center;
font-size: 14px;
`;

const baseURL = "/api/product"



export const Cart = () => {
  const [stockOpen, setStockOpen] = useState(false);
  const { cart, setCart } = useContext(CartContext);
  const [products, setProducts] = useState<Product[]>([])

  const navigate = useNavigate();

  useEffect(() => {
  const fetchData = async () => {
    
    try{
      const result = await apiGetAllProducts();
      setProducts(result.payload);
    }
    catch(error : any){
      if(error.response.status === 401) navigate('/')
    }
  }

  fetchData();

}, [])

const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
  if (reason === 'clickaway') {
    return;
  }
  setStockOpen(false);

};

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

  const AddOneItemToCart = (product: Product) => {

    const newCart = [...cart]
    const index = newCart.findIndex((searchProduct) => {
      return searchProduct.id === product.id
    })
    const productIndex = products.findIndex((searchProduct) => {
      return searchProduct.id === product.id
    })

    newCart[index].quantity < products[productIndex].quantity ? newCart[index].quantity++ : setStockOpen(true);

    setCart(newCart)
  }


  return (
    <Container>
      <Navbar2 />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Bottom>
          <Info>
            {
              cart.map((product) => (
                <div key={product.id}>
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
                      <ProductPrice>${product.price}</ProductPrice>
                      <ProductAmountContainer>
                        <ProductAmount>
                          Qty: {product.quantity}
                        </ProductAmount>
                      </ProductAmountContainer>
                      <AddIcon onClick={() => AddOneItemToCart(product)}></AddIcon>
                      <DeleteIconContainer>
                      <RemoveIcon onClick={() => removeOneItemFromCart(product)}></RemoveIcon>
                        <DeleteForeverIcon style={{fill: "red"}} onClick={() => removeItemFromCart(product)}></DeleteForeverIcon>
                     
                        </DeleteIconContainer>
                    </PriceDetail>
                  </ProductItem>
                  <Hr />
                </div>
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
            <Top>
          <TopButton onClick={() => { navigate('/products') }}>CONTINUE SHOPPING</TopButton>
          {/* <TopButton onClick={() => { if (!(cart.length === 0)) { navigate('/checkout') } }}>CHECKOUT NOW</TopButton> */}
        </Top>
          </Summary>
        </Bottom>
      </Wrapper>
      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
      </div>
      <YouMayAlsoLike />
     
      <Footer>Kev's Java/React Batch 2022 All rights reserved</Footer>
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