import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import styled from 'styled-components';

const slideImages = [
    {
      url: 'https://i.ibb.co/NtBGKDG/yaml.jpg',
      caption: ''
    },
    {
      url: 'https://i.ibb.co/wCw6qQG/yaml2.jpg',
      caption: ''
    },
  ];

  const SlideContainer = styled.div`
    width: 82%;
    margin: auto;
    top: 0;
    left: 0;
    padding-top: 50px;
    padding-left: 50px;
    padding-right: 50px;
  `;

const YouMayAlsoLike = () => {
  return (
    <SlideContainer>
         <div className="slide-container">
    <Slide>
     {slideImages.map((slideImage, index)=> (
        <div className="each-slide" key={index}>
          <div style={{'backgroundImage': `url(${slideImage.url})`, height: "55.5vh"}}>
            <span>{slideImage.caption}</span>
          </div>
        </div>
      ))} 
    </Slide>
  </div>
    </SlideContainer>
   
   
  )
}

export default YouMayAlsoLike
