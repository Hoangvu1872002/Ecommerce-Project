import React, { memo } from "react";
import Slider from "react-slick";
import Product from "./Product";

const settings = {
  dots: false,
  infinite: true,
  speed: 800,
  slidesToShow: 3,
  slidesToScroll: 1,
};

const CustomSlider = ({products, activeTab}) => {
  return (
    <div>
      {products && (
        <Slider {...settings}>
          {products?.map((e) => (
            <Product
              key={e._id}
              pid={e._id}
              productData={e}
              isNew={activeTab === 1 ? false : true}
            ></Product>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default memo(CustomSlider);
