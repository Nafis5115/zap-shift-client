import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import amazon from "../../../assets/brands/amazon.png";
import casio from "../../../assets/brands/casio.png";
import moonstar from "../../../assets/brands/moonstar.png";
import randstad from "../../../assets/brands/randstad.png";
import star from "../../../assets/brands/star.png";
import start_people from "../../../assets/brands/start_people.png";
import { Autoplay } from "swiper/modules";

const brands = [amazon, casio, moonstar, randstad, star, start_people];

const Brands = () => {
  return (
    <Swiper
      slidesPerView={4}
      centeredSlides={true}
      spaceBetween={30}
      grabCursor={true}
      loop={true}
      autoplay={{
        delay: 1000,
        disableOnInteraction: false,
      }}
      modules={[Autoplay]}
    >
      {brands.map((brand, index) => (
        <SwiperSlide key={index}>
          <img src={brand} alt="" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Brands;
