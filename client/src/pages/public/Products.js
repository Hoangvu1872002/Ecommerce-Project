import React, { useCallback, useEffect, useState } from "react";
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import {
  Breadcrumbs,
  InputSelect,
  Product,
  SearchItem,
} from "../../components";
import { apiGetProducts } from "../../apis";
import Masonry from "react-masonry-css";
import { sorts } from "../../ultils/contants";

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

const Products = () => {
  const { category } = useParams();

  const [products, setProducts] = useState();
  const [activeClick, setActiveClick] = useState();
  const [sort, setSort] = useState();

  const [params] = useSearchParams();

  const navigate = useNavigate();

  const fetchProductsByCategory = async (queries) => {
    const response = await apiGetProducts(queries);
    if (response) setProducts(response.products);
  };

  useEffect(() => {
    let param = [];
    for (let i of params.entries()) param.push(i);
    const queries = {};
    let priceQuery = {};
    for (let i of params) queries[i[0]] = i[1];

    if (queries.to && queries.from) {
      priceQuery = {
        $and: [
          { price: { gte: queries.from } },
          { price: { lte: queries.to } },
        ],
      };
      delete queries.price;
    }
    if (queries.from) queries.price = { gte: queries.from };
    if (queries.to) queries.price = { lte: queries.to };
    delete queries.to;
    delete queries.from;
    const q = { ...priceQuery, ...queries };
    fetchProductsByCategory(q);
  }, [params]);

  const changeActiveFitler = useCallback(
    (name) => {
      if (activeClick === name) setActiveClick(null);
      else setActiveClick(name);
    },
    [activeClick]
  );

  const changeValue = useCallback(
    (value) => {
      setSort(value);
    },
    [sort]
  );

  useEffect(() => {
    navigate({
      pathname: `/${category}`,
      search: createSearchParams({
        sort,
      }).toString(),
    });
  }, [sort]);
  return (
    <div className="w-full">
      <div className="h-[81px] flex justify-center items-center bg-gray-50">
        <div className="w-main">
          <h3 className="font-semibold uppercase">{category}</h3>
          <Breadcrumbs category={category}></Breadcrumbs>
        </div>
      </div>
      <div className="w-main border p-4 flex justify-between mt-8 m-auto">
        <div className="w-4/5 flex-auto flex flex-col gap-3">
          <span className="font-semibold text-sm mt-[-7px]">Filter by</span>
          <div className="flex items-center gap-4">
            <SearchItem
              name="Price"
              activeClick={activeClick}
              changeActiveFitler={changeActiveFitler}
              type="input"
            ></SearchItem>
            <SearchItem
              name="Color"
              activeClick={activeClick}
              changeActiveFitler={changeActiveFitler}
            ></SearchItem>
          </div>
        </div>
        <div className="w-1/5 flex flex-col gap-3">
          <span className="font-semibold text-sm mt-[-7px]">Sort by</span>
          <div className="w-full">
            <InputSelect
              value={sort}
              changeValue={changeValue}
              options={sorts}
            ></InputSelect>
          </div>
        </div>
      </div>
      <div className="mt-2 w-main m-auto">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid flex "
          columnClassName="my-masonry-grid_column"
        >
          {products?.map((e) => (
            <Product
              key={e._id}
              pid={e._id}
              productData={e}
              normal={true}
            ></Product>
          ))}
        </Masonry>
      </div>
      <div className="ư-full h-[100px]"></div>
    </div>
  );
};

export default Products;
