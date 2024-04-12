import React, { memo } from "react";
import Slider from "react-slick";
import Product from "../products/Product";

const settings = {
  dots: false,
  infinite: false,
  speed: 800,
  slidesToShow: 3,
  slidesToScroll: 1,
};

const CustomSlider = ({ products, activeTab, normal }) => {
  return (
    <div className="py-2">
      {products && (
        <Slider className="custom-slider" {...settings}>
          {products?.map((e) => (
            <Product
              key={e._id}
              pid={e._id}
              productData={e}
              isNew={activeTab === 1 ? false : true}
              normal={normal}
            ></Product>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default memo(CustomSlider);
