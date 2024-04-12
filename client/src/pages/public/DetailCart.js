import React, { memo } from "react";
import { Breadcrumbs, Button } from "../../components";
import withBase from "../../hocs/withBase";
import { useSelector } from "react-redux";
import { formatMoney } from "../../ultils/helper";
import { ToastContainer } from "react-toastify";
import OrderItem from "../../components/products/OrderItem";
// import { updateCart } from "../../store/users/userSlide";
// import { apiUpdateCart } from "../../apis";
// import { getCurrent } from "../../store/users/asyncAction";
// import { toast } from "react-toastify";

const DetailCart = () => {
  const {  currentCart } = useSelector((state) => state.user);
  // console.log(currentCart);

  return (
    <div className="w-full">
      <div className="h-[81px] mt-4 flex justify-center items-center bg-gray-50">
        <div className="w-main">
          <span className="font-semibold text-[18px]">My Cart</span>
          <div className="mt-2">
            <Breadcrumbs></Breadcrumbs>
          </div>
        </div>
      </div>
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

        {currentCart?.map((e, index) => (
          <div key={index}>
            <OrderItem
              e={e}
              defaultQuantity={e.quantity}
            ></OrderItem>
          </div>
        ))}
        <div className="w-main mx-auto flex flex-col gap-3 items-end justify-center mt-4">
          <span className="flex gap-4">
            <span>Total payment ({currentCart?.reduce((sum, el) => +el?.quantity + sum, 0)} products):</span>
            <span className="text-main  font-semibold">
              {`${formatMoney(
                currentCart?.reduce(
                  (sum, el) => +el?.price * el?.quantity + sum,
                  0
                )
              )} VND`}
            </span>
          </span>
          <span className="text-xs italic">
            Shipping, taxes, and discounts calculated at checkout.
          </span>
          <Button> Checkout</Button>
        </div>
      </div>

      {/* <div className="h-[50px] w-full"></div> */}
      <ToastContainer autoClose={1200} />
    </div>
  );
};

export default withBase(memo(DetailCart));
