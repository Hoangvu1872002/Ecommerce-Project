import React, { Fragment, memo } from "react";
import logo from "../../assets/logo.png";
import icons from "../../ultils/icons";
import { Link } from "react-router-dom";
import path from "../../ultils/path";
import { useSelector } from "react-redux";

const Header = () => {
  const { FaPhoneAlt, MdEmail, IoBagRemove, FaUserCircle, IoHomeSharp } = icons;
  const { current } = useSelector((state) => state.user);
  return (
    <div className=" w-main flex justify-between h-[110px] py-[35px]">
      <Link to={`/${path.HOME}`}>
        <img src={logo} alt="logo" className="w-[234px] object-contain"></img>
      </Link>
      <div className="flex text-[13px]">
        <div className="flex flex-col px-6 border-r items-center">
          <span className="flex gap-3 items-center">
            <FaPhoneAlt color="red"></FaPhoneAlt>
            <span className="font-semibold">(+1800) 000 8808</span>
          </span>
          <span>Mon-Sat 9:00AM - 8:00PM</span>
        </div>
        <div className="flex flex-col px-6 border-r items-center">
          <span className="flex gap-3 items-center">
            <MdEmail color="red"></MdEmail>
            <span className="font-semibold">SUPPORT@TADATHEMES.COM</span>
          </span>
          <span>Online Support 24/7</span>
        </div>
        {current && (
          <Fragment>
            <div className="flex cursor-pointer items-center px-6 border-r justify-center gap-2">
              <IoBagRemove size={24} color="red"></IoBagRemove>
              <span>0 item (5)</span>
            </div>
            <Link
              className="flex cursor-pointer items-center px-6 justify-center gap-2"
              to={
                current?.role === 'admin'
                  ? `/${path.ADMIN}/${path.DASHBOARD}`
                  : `/${path.MEMBER}/${path.PERSONAL}`
              }
            >
              <FaUserCircle size={24}></FaUserCircle>
              <span> Profile </span>
            </Link>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default memo(Header);
