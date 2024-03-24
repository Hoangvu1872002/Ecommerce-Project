import React, { useEffect, useState } from "react";
import { InputForm, Pagination } from "../../components";
import { useForm } from "react-hook-form";
import { apiGetProducts } from "../../apis";
import moment from "moment";
import { limit } from "../../ultils/contants";
const ManageProducts = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const [products, setProducts] = useState();
  const [count, setCout] = useState(0);

  const handleSearchProducts = (data) => {};

  const fetchProduct = async (params) => {
    const response = await apiGetProducts({...params, limit});
    if (response.success) {
      setCout(response.counts);
      setProducts(response.products);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <div className="w-full flex flex-col gap-3 relative">
      <h1 className="fixed z-50 bg-gray-100 w-full h-[75px] flex justify-between items-center text-3xl font-bold px-5 border-b">
        <span>Manage Products</span>
      </h1>
      <div className="h-[75px] w-full"></div>
      <div className="flex w-full justify-end items-center px-5">
        <form className="w-[45%]" onSubmit={handleSubmit(handleSearchProducts)}>
          <InputForm
            id="q"
            register={register}
            errors={errors}
            fullWith
            placeholder="Search products by title, description, ..."
          ></InputForm>
        </form>
      </div>
      <div className="px-5">
      <table className="table-auto mb-6 text-left w-full ">
        <thead className="font-bold bg-gray-700 text-[13px]  text-white">
          <tr className="border border-gray-500">
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Thumb</th>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Brand</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Quantity</th>
            <th className="px-4 py-2">Sold</th>
            <th className="px-4 py-2">Color</th>
            <th className="px-4 py-2">Total Rating</th>
            <th className="px-4 py-2">Date Create</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((e, index) => (
            <tr key={e._id} className="border border-gray-500">
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">
                <img src={e.thumb} alt="thumb" className="w-12 h12 object-cover"></img>
              </td>
              <td className="px-4 py-2 w-[180px] line-clamp-2">{e.title}</td>
              <td className="px-4 py-2">{e.brand}</td>
              <td className="px-4 py-2">{e.category}</td>
              <td className="px-4 py-2">{e.price}</td>
              <td className="px-4 py-2">{e.quantity}</td>
              <td className="px-4 py-2">{e.sold}</td>
              <td className="px-4 py-2">{e.color}</td>
              <td className="px-4 py-2">{e.totalRating}</td>
              <td className="px-4 py-2">{moment(e.createAt).format('DD/MM/YYYY')}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <div className="w-full flex justify-end mb-10 px-5">
          <Pagination totalCount={count}></Pagination>
        </div>
    </div>
  );
};

export default ManageProducts;
