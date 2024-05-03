import React, { memo } from "react";
import { Button } from "../../components";
import { ToastContainer } from "react-toastify";
import { formatMoney } from "../../ultils/helper";
import OrderItem from "../../components/products/OrderItem";
import { useSelector } from "react-redux";
import path from "../../ultils/path";
import withBase from "../../hocs/withBase";
import Swal from "sweetalert2";

const MyCart = ({ dispatch, navigate }) => {
  const { currentCart } = useSelector((state) => state.user);

  const handleCheckout = () => {
    if (currentCart.length === 0) {
      Swal.fire({
        text: "Please add products to cart before payment.",
        cancelButtonText: "Cancel",
        confirmButtonText: "Go product page",
        title: "Oops!",
        showCancelButton: true,
      }).then((rs) => {
        if (rs.isConfirmed) navigate(`/${path.PRODUCTS}`);
      });
    } else navigate(`/${path.MEMBER}/${path.CHECKOUT}`);
  };
  return (
    <div className="relative w-full flex flex-col">
      <h1 className="fixed z-50 bg-gray-100 w-full h-[75px] flex justify-between items-center text-3xl font-bold px-5 border-b">
        <span>My Cart</span>
      </h1>
      <div className="h-[75px] w-full"></div>
      <div className="w-main mx-auto mt-4 my-8">
        <div className="py-4 border mx-auto bg-gray-200 w-main">
          <div className="font-semibold grid grid-cols-11">
            <span className="col-span-3 w-full text-center">Products</span>
            <span className="col-span-2 w-full text-center">Unit price</span>
            <span className="col-span-2 w-full text-center"> Quantity</span>
            <span className="col-span-2 w-full text-center">
              Amount of money
            </span>
            <span className="col-span-2 w-full text-center">Action</span>
          </div>
        </div>
        <div className="w-main">
          {currentCart?.map((e, index) => (
            <div key={index} className="">
              <OrderItem e={e} defaultQuantity={e.quantity}></OrderItem>
            </div>
          ))}
        </div>
        <div className="w-main mx-auto flex flex-col gap-3 items-end justify-center mt-4">
          <span className="flex gap-4">
            <span>
              Total payment (
              {currentCart?.reduce((sum, el) => +el?.quantity + sum, 0)}{" "}
              products):
            </span>
            <span className="text-main  font-semibold">
              {`${formatMoney(
                currentCart?.reduce(
                  (sum, el) => +el?.price * el?.quantity + sum,
                  0
                )
              )} vnd`}
            </span>
          </span>
          <span className="text-xs italic">
            Shipping, taxes, and discounts calculated at checkout.
          </span>

          <Button handleOnClick={handleCheckout}>Checkout</Button>
        </div>
      </div>

      {/* <div className="h-[50px] w-full"></div> */}
      <ToastContainer autoClose={1200} />
    </div>
  );
};

export default withBase(memo(MyCart));
