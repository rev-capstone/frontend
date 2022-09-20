import { InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import Product from '../../models/Product';
import { apiGetAllProducts } from '../../remote/e-commerce-api/productService';
import Navbar from '../navbar/Narbar';
import { ProductCard } from "./ProductCard";

const Container = styled.div`
  padding-right: 15%;
  padding-left: 15%;
  padding-top: 20px;
  padding-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const FilterContainer = styled.div`
  
  padding: 20px;
  margin-top: 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background-color: #f5fbfd;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

export const DisplayProducts = () => {

  const [filter, setFilter] = useState("");

  const [products, setProducts] = useState<Product[]>([])

  const filterChange = (event : any) => {
    setFilter(event.target.value);
  };

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
          <FilterContainer>
            <Left>
              <InputLabel id="sort">Sort</InputLabel>
                <Select
                  variant="standard"
                  labelId="dropdown-sort"
                  id="dropdown-sort"
                  value={filter}
                  onChange={filterChange}
                  label="Sort"
                >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                  <MenuItem value={20}>Price</MenuItem>
                  <MenuItem value={30}>Quantity</MenuItem>
                </Select>
            </Left>
            <Right>
              <TextField
                id="search"
                variant="standard"
                label="Search"
                onChange={filterChange}
                InputProps={{
                  style: {
                    paddingRight: '15%'
                  },
                }}
              />
            </Right>
          </FilterContainer>
          <Container id="product-container">
            {products.filter((item) => item.name.toLocaleLowerCase().includes(filter)).map((item) => (
                <ProductCard product={item} key={item.id} />
            ))}
          </Container>
    </React.Fragment>
    
  );
};