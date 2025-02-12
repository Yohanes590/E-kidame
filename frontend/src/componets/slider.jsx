import '../styles/slider.css'
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import React, { useRef, useState } from 'react';

function Slider(){

    return(
        <>
        
        <div className="slider">
            

<div className="margin-slider">

<Swiper  slidesPerView={2} navigation={true} modules={[Navigation]} className="mySwiper">

        <SwiperSlide>
        <div className="Slider-card">
    <div className="message">
            <h3>Mike_Adventures@outlook.com </h3>
            <h4>The product selection is great, and I found exactly what I was looking for. However, the shipping took a little longer than 
                advertised. Customer support was helpful, though, and resolved my issue quickly. Overall, I’m satisfied with my purchase. ⭐⭐⭐ <br/>&nbsp;
            </h4>
        </div>     
  </div>
        </SwiperSlide>

        <SwiperSlide>
        <div className="Slider-card">
    <div className="message">
            <h3>Sophia.Writes2025@yahoo.com </h3>
            <h4>This is my go-to store for online shopping! The prices are competitive, the products are authentic, and the return process is hassle-free.
                 Plus, I love the discounts and promotions they offer. Keep up the great work! ⭐⭐⭐ <br/>&nbsp;
            </h4>
        </div>     
  </div>
        </SwiperSlide>


        
        <SwiperSlide>
        <div className="Slider-card">
    <div className="message">
            <h3>JohnDoe123@gmail.com</h3>
            <h4>I recently purchased a pair of wireless earbuds, and the process was so smooth. The website is easy to navigate, and the product arrived earlier than expected.
                 The quality exceeded my expectations! I'll definitely shop here again. Highly recommended! ⭐⭐⭐ <br/>&nbsp;
            </h4>
        </div>     
  </div>
        </SwiperSlide>


      </Swiper>


</div>




        </div>


        </>
    )
}

export default Slider