import { Button, FormControl, InputLabel, MenuItem, Pagination, PaginationItem, Select, TextField } from '@mui/material';
import { AxiosError } from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import Product from '../../models/Product';
import { apiGetAllProducts, apiPurchase } from '../../remote/e-commerce-api/productService';
import Navbar from '../navbar/Narbar';
import { ProductCard } from "./ProductCard";
import { Footer, FooterBanner, HeroBanner } from '../../components';


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
  background-color: #dcdcdc;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  // justify-content: flex-end;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 200px;
`;

const DropdownContainer = styled.div`
  width: 50%;
  padding-left: 29%;
  padding-right: 1%;
  // border-right: solid 1px rgba(0, 0, 0, 0.87);
`;

const SearchContainer = styled.div`
  padding-right: 29%;
`;

export const DisplayProducts = () => {
  
  const [sort, setSort] = useState("");
  const [filter, setFilter] = useState("");
  const [checkBoxes, setCheckBoxes] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  const navigate = useNavigate();

  const filterChange = (event: any) => {
    setFilter(event.target.value);
  };

  const sortChange = (event: any) => {
    const sortBy = event.target.value;
    const copyArray = [...products];
    if (sortBy == "priceASC") {
      copyArray.sort((a, b) => {
        return a.price > b.price ? 1 : -1;
      });
    } else if (sortBy === "priceDESC") {
      copyArray.sort((a, b) => {
        return a.price < b.price ? 1 : -1;
      });
    } else if (sortBy === "quantityASC") {
      copyArray.sort((a, b) => {
        return a.quantity > b.quantity ? 1 : -1;
      });
    } else if (sortBy === "quantityDESC") {
      copyArray.sort((a, b) => {
        return a.quantity < b.quantity ? 1 : -1;
      });
    } else {
      copyArray.sort((a, b) => {
        return a.id > b.id ? 1 : -1;
      });
    }
    setSort(sortBy);
    setProducts(copyArray);
  }



  useEffect(() => {
    const fetchData = async () => {

      try {
        const result = await apiGetAllProducts();
        setProducts(result.payload);
      }
      catch (error: any) {
        if (error.response.status === 401) navigate('/')
      }
    }

    fetchData();

  }, [])


  const handleClick = () => {
    if (checkBoxes) {
      let productos = products.filter(product => { return product.changed === true; });

      apiPurchase(productos);

      products.forEach(product => { product.changed = false });

      setFeaturedProducts(products.filter((item) => item.featured === true));

    }
    setCheckBoxes(!checkBoxes);
  }

  return (
    <React.Fragment>
      <Navbar />

      <HeroBanner />

      <div className="products-heading">

        <h2>Luxury Products for Luxurious Coders</h2>
        <p>A Full-Stack Developer's Dream</p>
      </div>
      <div>
        <FilterContainer>
          <Left>
            <DropdownContainer>
              <FormControl fullWidth>
                <InputLabel id="dropdown-sort">Sort By:</InputLabel>
                <Select
                  autoComplete='off'
                  variant="standard"
                  labelId="dropdown-sort"
                  id="select-sort"
                  value={sort}
                  label="Sort"
                  onChange={sortChange}
                >
                  <MenuItem value="None">Default</MenuItem>
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
            <Button variant="outlined" onClick={handleClick}>{checkBoxes ? "submit" : "set featured products"}</Button>
          </Right>
        </FilterContainer>
        <Container id="feature-container">
         
        </Container>
        <Container id="product-container">
          {products.filter((item) => item.name.toLocaleLowerCase().includes(filter) || item.description.toLocaleLowerCase().includes(filter)).map((item) => (
            <ProductCard product={item} key={item.id} checkBoxState={checkBoxes} />
          ))}
        </Container>
      </div>
      <FooterBanner />
      <Footer />
    </React.Fragment>


  );
};