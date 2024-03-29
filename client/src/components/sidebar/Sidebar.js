import React, { memo, useEffect, useState } from "react";
import { apiGetCategories } from "../../apis/app";
import { NavLink } from "react-router-dom";
import { createSlug } from "../../ultils/helper";
import { useSelector } from "react-redux";
import icons from "../../ultils/icons";
const Sidebar = () => {
  const {categories} = useSelector(state => state.app)
  const {TfiMenuAlt} = icons
  return (
    <div>
    <div className="bg-main flex items-center text-white font-semibold px-5 py-[10px] text-base">
    <span className="mr-[10px]"><TfiMenuAlt size={16}></TfiMenuAlt></span>
    <span>ALL COLLECTIONS</span>
    </div>
    <div className="flex flex-col border pb-2">
      {categories?.map((e) => (
        <NavLink
          key={createSlug(e.title)}
          to={createSlug(e.title)}
          className={({ isActive }) =>
            isActive
              ? "bg-main text-white px-5 pt-[15px] pb-[14px] text-sm"
              : " px-5 pt-[15px] pb-[14px] text-sm hover:text-main"
          }
        >
          {e.title}
        </NavLink>
      ))}
    </div>
    </div>
  );
};

export default memo(Sidebar);
