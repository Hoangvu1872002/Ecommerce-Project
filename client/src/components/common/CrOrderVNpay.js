import React, { memo, useEffect } from "react";
import { apiCreateOrder } from "../../apis";
import path from "../../ultils/path";
import withBase from "../../hocs/withBase";
import Loading from "./Loading";

const CrOrderVNpay = ({ navigate }) => {
  const dataCheckout = JSON.parse(localStorage.getItem("dataCheckout"));

  const handleSaveOrder = async (data) => {
    const response = await apiCreateOrder(data);
    if (response.success) {
      localStorage.removeItem("dataCheckout");
      setTimeout(() => {
        navigate(`/${path.MEMBER}/${path.HISTORY}`);
      }, 2000);
    }
  };

  useEffect(() => {
    if (dataCheckout) {
      handleSaveOrder(dataCheckout?.dataCheckout);
    }else{
      navigate('/')
    }
  }, []);
  return (
    <div className="w-full h-screen bg-overlay flex justify-center items-center">
      <div>
        <Loading></Loading>
      </div>
    </div>
  );
};

export default withBase(memo(CrOrderVNpay));
