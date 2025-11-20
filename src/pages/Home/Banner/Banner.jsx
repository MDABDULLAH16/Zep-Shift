import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import assets1 from "../../../assets/banner/banner1.png";
import assets2 from "../../../assets/banner/banner2.png";
import assets3 from "../../../assets/banner/banner3.png";

const Banner = () => {
  return (
    <div className="pt-4">
      <Carousel>
        <div className="relative">
          <img src={assets1} />
          <div className=" flex absolute left-20 bottom-18 gap-3 ">
            <button className="btn btn-primary text-black rounded-2xl">
              Track your parcel
            </button>
            <button className="btn btn-ghost   text-black rounded-2xl">
              Be A Rider
            </button>
          </div>
        </div>
        <div className="relative">
          <img src={assets2} />
          <div className=" flex absolute left-20 bottom-18 gap-3 ">
            <button className="btn btn-primary text-black rounded-2xl">
              Track your parcel
            </button>
            <button className="btn btn-ghost   text-black rounded-2xl">
              Be A Rider
            </button>
          </div>
        </div>
        <div className="relative">
          <img src={assets3} />
          <div className=" flex absolute left-20 bottom-18 gap-3 ">
            <button className="btn btn-primary text-black rounded-2xl">
              Track your parcel
            </button>
            <button className="btn btn-ghost   text-black rounded-2xl">
              Be A Rider
            </button>
          </div>
        </div>
        
      </Carousel>
    </div>
  );
};

export default Banner;
