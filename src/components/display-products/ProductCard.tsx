import { FormControl, Snackbar, TextField } from "@material-ui/core";
import { ShoppingCartOutlined } from "@material-ui/icons";
import { Alert, Box } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { CartContext } from "../../context/cart.context";
import Product from "../../models/Product";
import eCommerceClient, { eCommerceApiResponse } from "../../remote/e-commerce-api/eCommerceClient";
import { useFormControl } from '@mui/material/FormControl';


const Info = styled.div`
    opacity: 0;
    width: 98%;
    height: 50px;
    position: absolute;
    bottom:10px;
    background-color: white;
    border-radius: 15px;
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease;
    cursor: pointer;
  `;

const Container = styled.div`
    flex: 1;
    margin: 30px 10px;
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
    background-color: #dcdcdc;
    border-radius: 15px;
  `;

  const ProductName = styled.span`
  `;

// const Circle = styled.div`
//     width: 200px;
//     height: 200px;
//     border-radius: 50%;
//     background-color: white;
//     position: absolute;
//   `;

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
    // transition: all 0.
    // &:hover {
    //   background-color: #e9f5f5;
    //   transform: scale(1.1);
    background: transparent;
    margin-right: 170px;
    z-index: 5;
    color: #EC5800;

  `;
const Stock = styled.div`
    width: 55%;
    height: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 0;
    transition: all 0.5s ease;
    color: black;
    text-align: center;
    font-weight: bold;
  `;
  const Price = styled.div`
    width: 55%;
    height: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 0px;
    transition: all 0.5s ease;
    color: black;
    text-align: center;
    font-weight: bold;
  `;
  const BoxContainer = styled.div`
      display: flex;
      width: 80px;
      color: black;
      padding-left: 5px;
  `;


interface productProps {
  product: Product,
  key: number
}
const baseURL = "/api/product"

export const apiGetAllProducts = async (): Promise<eCommerceApiResponse> => {
  const response = await eCommerceClient.get<any>(
      `${baseURL}`
  );
  return { status: response.status, payload: response.data };
}
export const apiGetProductById = async (id: number): Promise<eCommerceApiResponse> => {
  const response = await eCommerceClient.get<any>(
      `${baseURL}/${id}`
  );
  return { status: response.status, payload: response.data };
}

export const apiUpsertProduct = async (product: Product): Promise<eCommerceApiResponse> => {
  const response = await eCommerceClient.put<any>(
      `${baseURL}`,
      product
  );
  return { status: response.status, payload: response.data };
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
    
    // console.log(props.product.price);
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
    <Container data-aos="fade-zoom-in"
    data-aos-delay="100"
    data-aos-offset="0" className="product-card">

      {/* <Circle /> */}
      <Image src={props.product.image} />

      <Info>
        <Price id="price">{price()} </Price>
        <Icon>
          <ShoppingCartOutlined onClick={() => {

            if (Number(quant) > 0) addItemToCart({ ...props.product, quantity: Number(quant) }

              )}} />
          </Icon>
          <BoxContainer >
              <TextField
                id="Quantity"
                style={{backgroundColor:'#989898',paddingLeft:'5px',paddingTop:'3px'}}
                label=""
                type="number"
                size="small"
                inputProps={{
                  inputMode: 'numeric',
                  min: '0',
                }}

                InputProps={{disableUnderline: true}}

                defaultValue="1"
                variant="standard"
                onChange={handleChange}
              />
          </BoxContainer>
          <Stock>Stock: {props.product.quantity-inCart}</Stock>
        </Info>

      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{vertical:"top",horizontal:"center"}}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '230px' }}>
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