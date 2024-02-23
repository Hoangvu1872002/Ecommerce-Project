import React, { useEffect, useState } from "react";
import { apiGetProducts } from "../apis";
import ProductCard from "./ProductCard";

const FeaturedProducts = () => {
  const [products, setProducts] = useState(null);
  const fetchProducts = async () => {
    const respone = await apiGetProducts({
      limit: 9,
      page: 1,
      totalRating: 4,
    });
    if (respone.success) setProducts(respone.products);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="w-main">
      <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">
        FREATURED PRODUCTS
      </h3>
      <div className="flex flex-wrap mt-[15px] mx-[-10px]">
        {products?.map((e) => (
          <ProductCard
            key={e._id}
            thumb={e.thumb}
            title={e.title}
            totalRating={e.totalRating}
            price={e.price}
          ></ProductCard>
        ))}
      </div>
      <div className="flex justify-between ">
        <img
          src="https://digital-world-2.myshopify.com/cdn/shop/files/banner1-bottom-home2_b96bc752-67d4-45a5-ac32-49dc691b1958_600x.jpg?v=1613166661"
          alt=""
          className="w-[49.8%] object-contain"
        ></img>
        <div className="flex flex-col justify-between gap-4 w-[24%] ">
          <img
            src="https://digital-world-2.myshopify.com/cdn/shop/files/banner2-bottom-home2_400x.jpg?v=1613166661"
            alt=""
          ></img>
          <img
            src="https://digital-world-2.myshopify.com/cdn/shop/files/banner3-bottom-home2_400x.jpg?v=1613166661"
            alt=""
          ></img>
        </div>
        <img
          src="https://digital-world-2.myshopify.com/cdn/shop/files/banner4-bottom-home2_92e12df0-500c-4897-882a-7d061bb417fd_400x.jpg?v=1613166661"
          alt=""
          className="w-[24%] object-contain"
        ></img>
      </div>
    </div>
  );
};

export default FeaturedProducts;
