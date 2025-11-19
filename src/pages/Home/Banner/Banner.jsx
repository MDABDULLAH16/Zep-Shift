import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import assets1 from '../../../assets/banner/banner1.png'
import assets2 from '../../../assets/banner/banner2.png'
import assets3 from '../../../assets/banner/banner3.png'

const Banner = () => {
    return (
      <div className='pt-4'>
        <Carousel>
          <div>
            <img src={assets1} />
         
          </div>
          <div>
            <img src={assets2} />
          
          </div>
          <div>
            <img src={assets3} />
   
          </div>
        </Carousel>
      </div>
    );
};

export default Banner;