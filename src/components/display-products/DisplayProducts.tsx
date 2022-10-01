import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import Product from '../../models/Product';
import { apiGetAllProducts } from '../../remote/e-commerce-api/productService';
import Navbar from '../navbar/Narbar';
import { ProductCard } from "./ProductCard";
import {Footer, FooterBanner, HeroBanner } from '../../components';
import  HeroBanner2  from '../HeroBanner2';
import HeroBanner3 from '../HeroBanner3';
import AnnouncementBar from '../AnnouncementBar';
import Slider from '../Slider';


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


  const [filter, setFilter] = useState("");

  const [sort, setSort] = useState("");

  const [products, setProducts] = useState<Product[]>([])

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


  return (
    <React.Fragment>
      <AnnouncementBar />
      <Navbar />
      <Slider />
      {/* <HeroBanner/> */}
      {/* <HeroBanner2 /> */}
      {/* <HeroBanner3 /> */}
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
        </Right>
      </FilterContainer>
      <Container id="product-container">
        {products.filter((item) => item.name.toLocaleLowerCase().includes(filter) || item.description.toLocaleLowerCase().includes(filter)).map((item) => (
          <ProductCard product={item} key={item.id} />
        ))}
      </Container>
      </div>
      <FooterBanner />
      <Footer />
    </React.Fragment>
  );
};