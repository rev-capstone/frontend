import { TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import Product from '../../models/Product';
import { apiGetAllProducts } from '../../remote/e-commerce-api/productService';
import Navbar from '../navbar/Narbar';
import { ProductCard } from "./ProductCard";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 10px;
`;

export const DisplayProducts = () => {

  const [filter, setFilter] = useState("");

  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const result = await apiGetAllProducts()
      console.log(result);
      setProducts(result.payload)
    }
    fetchData()
  }, [])

  return (
    <React.Fragment>
        <Navbar/>
        <Right>
          <TextField
            id="search"
            variant="outlined"
            label="Search"
            onChange={(e) => setFilter(e.target.value)}
          />
          </Right>
        <Container id="product-container">
        {products.filter((item) => item.name.toLocaleLowerCase().includes(filter)).map((item) => (
            <ProductCard product={item} key={item.id} />
        ))}
        </Container>
    </React.Fragment>
    
  );
};