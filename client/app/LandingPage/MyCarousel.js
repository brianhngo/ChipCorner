import React from 'react';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import image1 from '../../../public/image1.jpeg';
import image2 from '../../../public/image2.jpeg';
import image3 from '../../../public/image3.jpeg';

import './Carousel.css'
const MyCarousel = () => {
  return (
    <>
    <Carousel className = 'my-carousel' autoPlay
        infiniteLoop showThumbs={false} showStatus={false} >
      <div>
        <img src={image1} alt="Slide 1" height = "1000px" width = "100%" />
       
      </div>
      <div>
        <img src={image2} alt="Slide 2" height = "1000px" width = "100%" />
      
       
      </div>
      <div>
        <img src={image3} alt="Slide 3" height = "1000px"width = "100%" />
      
        
      </div>
    </Carousel>
    </>
  );
};

export default MyCarousel