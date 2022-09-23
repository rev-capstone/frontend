import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  width: 50%;
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
        return a.quantity > b.quantity ? 1 : -1;
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


  // const products: Product[] = [
  //   {
  //       id:1,
  //       image:"https://d3o2e4jr3mxnm3.cloudfront.net/Mens-Jake-Guitar-Vintage-Crusher-Tee_68382_1_lg.png",
  //       name: '',
  //       description: '',
  //       price: 5,
  //       quantity: 10,
  //     },
  //     {
  //       id:3,
  //       image:"https://www.prada.com/content/dam/pradanux_products/U/UCS/UCS319/1YOTF010O/UCS319_1YOT_F010O_S_182_SLF.png",
  //       name: '',
  //       description: '',
  //       price: 5,
  //       quantity: 10,
  //     },
  //     {
  //       id:4,
  //       image:"https://www.burdastyle.com/pub/media/catalog/product/cache/7bd3727382ce0a860b68816435d76e26/107/BUS-PAT-BURTE-1320516/1170x1470_BS_2016_05_132_front.png",
  //       name: '',
  //       description: '',
  //       price: 5,
  //       quantity: 10,
  //     },
  //     {
  //       id:5,
  //       image:"https://images.ctfassets.net/5gvckmvm9289/3BlDoZxSSjqAvv1jBJP7TH/65f9a95484117730ace42abf64e89572/Noissue-x-Creatsy-Tote-Bag-Mockup-Bundle-_4_-2.png",
  //       name: '',
  //       description: '',
  //       price: 5,
  //       quantity: 10,
  //     },
  //     {
  //       id:6,
  //       image:"https://d3o2e4jr3mxnm3.cloudfront.net/Rocket-Vintage-Chill-Cap_66374_1_lg.png",
  //       name: '',
  //       description: '',
  //       price: 5,
  //       quantity: 10,
  //     },
  //     {
  //       id:8,
  //       image:"https://www.pngarts.com/files/3/Women-Jacket-PNG-High-Quality-Image.png",
  //       name: '',
  //       description: '',
  //       price: 5,
  //       quantity: 10,
  //     },
  // ]

  return (
    <React.Fragment>
      <Navbar />
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
    </React.Fragment>

  );
};