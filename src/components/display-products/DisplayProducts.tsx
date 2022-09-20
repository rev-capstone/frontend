import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
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

const DropdownContainer = styled.div`
  width: 30%;
  padding-left: 29%;
  padding-right: 1%;
  border-right: solid 1px rgba(0, 0, 0, 0.87);
`;

const searchContainer = styled.div`
  width: 100%;
  padding-right: 29%;
`;

export const DisplayProducts = () => {

  const [filter, setFilter] = useState("");

  const [sort, setSort] = useState("");

  const [products, setProducts] = useState<Product[]>([])

  const filterChange = (event : any) => {
    setFilter(event.target.value);
  };

  const sortChange = (event : any) => {
    const sortBy = event.target.value;
    setSort(sortBy);
    console.log(sortBy);
  }

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
              <DropdownContainer>
                <FormControl fullWidth>
                  <InputLabel id="dropdown-sort">Sort</InputLabel>
                    <Select
                      variant="standard"
                      labelId="dropdown-sort"
                      id="select-sort"
                      value={filter}
                      onChange={sortChange}
                      label="Sort"
                      inputProps={{
                        style: {
                          paddingRight: '60px'
                        },
                      }}>
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="price">Price</MenuItem>
                      <MenuItem value="quantity">Quantity</MenuItem>
                    </Select>
                  </FormControl>
                </DropdownContainer>
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
            {products.sort((a, b) => a.price > b.price ? 1 : -1).filter((item) => item.name.toLocaleLowerCase().includes(filter) || item.description.toLocaleLowerCase().includes(filter)).map((item) => (
                <ProductCard product={item} key={item.id} />
            ))}
          </Container>
    </React.Fragment>
    
  );
};