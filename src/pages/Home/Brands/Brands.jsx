import React from "react";
import amazon from "../../../assets/brands/amazon.png";
import casio from "../../../assets/brands/casio.png";
import star from "../../../assets/brands/star.png";
import amazon_vector from "../../../assets/brands/amazon_vector.png";
import startPeople from "../../../assets/brands/start_people.png";
import randstad from "../../../assets/brands/randstad.png";
import moonstar from "../../../assets/brands/moonstar.png";
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Autoplay, Pagination } from 'swiper/modules';
import "swiper/css";
import "swiper/css/pagination";

const Brands = () => {
    const brandLogos =[amazon,casio,star,amazon_vector,startPeople,randstad,moonstar]
  return (
    <Swiper
      slidesPerView={4}
      loop={true}
      autoplay={{
        delay: 500,
        disableOnInteraction: false,
          }}
          
      centeredSlides={true}
      spaceBetween={20}
          grabCursor={true}
          modules={[Autoplay]}
    >
      {brandLogos.map((logo) => (
        <SwiperSlide>
          <img src={logo} alt="" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Brands;
