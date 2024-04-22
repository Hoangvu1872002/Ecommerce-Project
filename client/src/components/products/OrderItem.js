import React, { memo, useCallback, useEffect, useState } from "react";
import SelectQuantity from "../common/SelectQuantity";
import { formatMoney } from "../../ultils/helper";
import { apiRemoveCart, apiUpdateCart } from "../../apis";
import icons from "../../ultils/icons";
import withBase from "../../hocs/withBase";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCurrent } from "../../store/users/asyncAction";

const OrderItem = ({ e, dispatch, defaultQuantity = 1 }) => {
  const { MdDeleteForever } = icons;

  const [quantity, setQuantity] = useState(() => defaultQuantity);

  const handleQuantity = useCallback(
    (number) => {
      if (!Number(number) || Number(number) < 1) {
        return;
      } else setQuantity(number);
    },
    [quantity]
  );

  const handleChangeQuantity = (flag) => {
    if (flag === "minus" && quantity === 1) return;
    if (flag === "minus") setQuantity((prev) => +prev - 1);
    if (flag === "plus") setQuantity((prev) => +prev + 1);
  };

  const getCount = async (pid, quantity, color, price, title, thumbnail) => {
    const response = await apiUpdateCart({
      pid,
      quantity,
      color,
      price,
      thumbnail,
      title,
    });
    if (response.success) {
      dispatch(getCurrent());
    } else {
      toast.error(response.mes);
    }
  };


  const removeCart = async (pid, color) => {
    const response = await apiRemoveCart(pid, color);
    if (response.success) {
      dispatch(getCurrent());
    } else {
      toast.error(response.mes);
    }
  };

  useEffect(() => {
      getCount(e.product._id, quantity, e.color, e.price, e.title, e.thumbnail);
  }, [quantity]);

  return (
    <div className="border grid grid-cols-11 w-full mt-1 py-3 mx-auto">
      <span className="col-span-3 w-full text-center flex justify-start pl-8 items-center">
        <div className="flex gap-2  items-center ">
          <img
            src={e?.thumbnail}
            alt="thumb"
            className="w-14 h-14 object-cover"
          ></img>
          <div className="flex flex-col items-start gap-1 ml-2">
            <span className="text-main text-sm">{e?.title}</span>
            <span className="text-[10px]">{e?.color}</span>
          </div>
        </div>
      </span>
      <span className="col-span-2 w-full text-center text-base flex justify-center items-center">
        {formatMoney(e?.price) + " VND"}
      </span>
      <span className="col-span-2 w-full text-center flex justify-center items-center">
        <div className="border">
          <SelectQuantity
            quantity={quantity}
            handleQuantity={handleQuantity}
            handleChangeQuantity={handleChangeQuantity}
          ></SelectQuantity>
        </div>
      </span>
      <span className="col-span-2 w-full text-center flex justify-center items-center">
        {formatMoney(e?.price * quantity) + " VND"}
      </span>
      <span className="col-span-2 w-full text-center flex justify-center items-center">
        <span
          onClick={() => {
            removeCart(e?.product?._id, e?.color);
          }}
          className="mr-2 mt-[-10px]  flex items-center justify-center hover:text-red-600  cursor-pointer"
        >
          <span className="h-8 w-8 rounded-full flex justify-center items-center">
            <MdDeleteForever size={26}></MdDeleteForever>
          </span>
        </span>
      </span>
    </div>
  );
};

export default withBase(memo(OrderItem));
