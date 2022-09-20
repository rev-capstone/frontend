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

const SearchContainer = styled.div`
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
    const copyArray = [...products];
    if(sortBy == "priceASC"){
      copyArray.sort((a, b) => {
        return a.price > b.price ? 1 : -1
      });
    }else if (sortBy === "priceDESC"){
      copyArray.sort((a, b) => {
        return a.quantity > b.quantity ? 1 : -1;
      });
    }else if (sortBy === "quantityASC"){
      copyArray.sort((a, b) => {
        return a.quantity > b.quantity ? 1 : -1;
      });
    }else if (sortBy === "quantityDESC"){
      copyArray.sort((a, b) => {
        return a.quantity < b.quantity ? 1 : -1;
      });
    }else{
      copyArray.sort((a, b) => {
        return a.id > b.id ? 1 : -1;
      });
    }
    setSort(sortBy);
    setProducts(copyArray);
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await apiGetAllProducts()
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
                  <InputLabel id="dropdown-sort">Sort by:</InputLabel>
                  <Select
                  autoComplete='off'
                  variant="standard"
                  labelId="dropdown-sort"
                  id="select-sort"
                  value={sort}
                  label="Sort"
                  onChange={sortChange}
                  >
                  <MenuItem value="None">None</MenuItem>
                  <MenuItem value="priceASC">Price: Low</MenuItem>
                  <MenuItem value="priceDESC">Price: High</MenuItem>
                  <MenuItem value="quantityASC">Quantity: Low</MenuItem>
                  <MenuItem value="quantityDESC">Quantity: High</MenuItem>
                </Select>
                  </FormControl>
                </DropdownContainer>
            </Left>
            <Right>
              <SearchContainer>
                <TextField
                  autoComplete='off'
                  id="search"
                  variant="standard"
                  label="Search"
                  onChange={filterChange}
                />
              </SearchContainer>
            </Right>
          </FilterContainer>
          <Container id="product-container">
            {products.filter((item) => item.name.toLocaleLowerCase().includes(filter) || item.description.toLocaleLowerCase().includes(filter)).map((item) => (
                <ProductCard product={item} key={item.id} />
            ))}
          </Container>
    </React.Fragment>
    
  );
};