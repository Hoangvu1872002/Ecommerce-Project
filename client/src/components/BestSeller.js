import React, { useEffect, useState } from "react";
import { apiGetProducts } from "../apis/product";
import CustomSlider from "./CustomSlider";
import {getNewProducts} from '../store/products/asyncAction'
import { useDispatch, useSelector } from "react-redux";

const tabs = [
  { id: 1, name: "BEST SELLERS" },
  { id: 2, name: "NEW ARRIVALS" },
  // { id: 3, name: "tablet" },
];

const BestSeller = () => {
  const [bestSellers, setBestSellers] = useState();
  // const [newProducts, setNewProducts] = useState();
  const [activeTab, setActiveTab] = useState(1);
  const [products, setProducts] = useState();
  const dispatch = useDispatch()
  const {newProducts} = useSelector(state => state.products)
// console.log(newProducts)
  const fetchProducts = async () => {
    const response = await apiGetProducts({ sort: "-sold" });
    // await Promise.all([
    //   apiGetProducts({ sort: "-sold" }),
    //   apiGetProducts({ sort: "-createAt" }),
    // ]);
    if (response?.success) {
      setBestSellers(response.products);
      setProducts(response.products);
    }
    // if (response[1]?.success) setNewProducts(response[1].products);
  };

  useEffect(() => {
    fetchProducts();
    dispatch(getNewProducts())
  }, []);

  useEffect(() => {
    if (activeTab === 1) {
      setProducts(bestSellers);
    }
    if (activeTab === 2) {
      setProducts(newProducts);
    }
  }, [activeTab]);
  return (
    <div>
      <div className="flex text-[20px] ml-[-32px] ">
        {tabs.map((e) => (
          <span
            key={e.id}
            className={`font-semibold px-8 border-r cursor-pointer ${
              activeTab === e.id ? "text-black" : "text-gray-400"
            }`}
            onClick={() => setActiveTab(e.id)}
          >
            {e.name}
          </span>
        ))}
      </div>
      <div className="mt-3 border-t-2 border-main">
        <CustomSlider products = {products} activeTab = {activeTab}></CustomSlider>
      </div>
      <div className="w-full flex gap-4 mt-[-5px]">
        <img
          src="https://digital-world-2.myshopify.com/cdn/shop/files/banner2-home2_2000x_crop_center.png?v=1613166657"
          alt="banner"
          className="flex-1 object-contain"
        ></img>
        <img
          src="https://digital-world-2.myshopify.com/cdn/shop/files/banner1-home2_2000x_crop_center.png?v=1613166657"
          alt=""
          className="flex-1 object-contain"
        ></img>
      </div>
    </div>
  );
};

export default BestSeller;
