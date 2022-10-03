import React from 'react'
import styled from "styled-components"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { sliderItems } from '../data';
import { useState } from 'react';
import { StoreMallDirectoryOutlined } from '@material-ui/icons';
import HeroBanner from './herobanner/HeroBanner';
import HeroBanner2 from './HeroBanner2';
import HeroBanner3 from './HeroBanner3';

const Container = styled.div`
    width: 100%;
    height: 80%;
    display: flex;
    position: relative;
    margin-top: 40px;
    padding-bottom: 100px;
    overflow: hidden;
    z-index: 1;
`;

const Arrow = styled.div`
    width: 50px;
    height: 50px;
    background-color: transparent;
    border-radius 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    margin-top: 250px;
    left: ${props=> props.direction === "left" && "30px"};
    right: ${props=> props.direction === "right" && "40px"};
    cursor: pointer;
    z-index: 2;
`;

const Slide = styled.div`
    display: flex;
    align-items: center;
    
`;

const ImgContainer = styled.div`
    display: flex;
`
const Wrapper = styled.div`
    height: 100%;
    display: flex;
    transform: translateX(${props=>props.slideIndex * -100}vw);
    transition: all 1.5s ease;
`;

const Image = styled.img `
    height: 80%;
    width: 90vw;
    display: flex;
    margin: auto;
    margin-left: 65px;
    margin-right: 83px;
    border-radius: 25px;
`;

const Slider = () => {
    
    const [slideIndex, setSlideIndex] = useState(0);
    const handleClick = (direction) => {
        if(direction === "left") {
            setSlideIndex(slideIndex > 0 ? slideIndex -1 : 2)
        } else {
            setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0)
        }
    };

  return (
    <Container>
        <Arrow direction="left" onClick={()=>handleClick("left")}>
            <ArrowBackIosIcon />
        </Arrow>
        <Wrapper slideIndex={slideIndex}>
            {sliderItems.map((item) => (            
            <Slide key={item.id}>
            <ImgContainer>
                <Image  data-aos="fade-zoom-in"
                    data-aos-delay="300"
                    data-aos-offset="0" src= {item.img} />
                </ImgContainer>
            </Slide>
            ))}
        </Wrapper>
        
        <Arrow direction="right" onClick={()=>handleClick("right")}>
            <ArrowForwardIosIcon />
        </Arrow>
    </Container>
  )
}

export default Slider