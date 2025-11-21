import React, { use } from "react";
import ReviewCard from "./ReviewCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const Reviews = ({ reviewPromise }) => {
  const reviews = use(reviewPromise);
  return (
    <div className="my-16">
      <div>
        <h1 className="text-4xl font-bold my-8 text-center">Reviews</h1>
      </div>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        loop={true}
        autoplay={{
          delay: 5500,
          disableOnInteraction: false,
        }}
        pagination={true}
        modules={[EffectCoverflow,Autoplay, Pagination]}
        className="mySwiper"
      >
        <div>
          {reviews.map((review) => (
            <SwiperSlide>
              <ReviewCard review={review}></ReviewCard>
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </div>
  );
};

export default Reviews;
