import React, { Fragment, memo, useState } from "react";
import avatar from "../../assets/avatarDefault.png";
import { memberSidebar } from "../../ultils/contants";
import { NavLink, Link } from "react-router-dom";
import clsx from "clsx";
import icons from "../../ultils/icons";
import { useSelector } from "react-redux";
import Button from "../buttons/Button";

const activedStyle = "px-4 py-2 flex items-center gap-2 bg-blue-400";
const notActivedStyle = "px-4 py-2 flex items-center gap-2  hover:bg-blue-100";

const MemberSidebar = () => {
  const { IoIosArrowDown, IoIosArrowForward, FaBackward } = icons;
  const { current } = useSelector((state) => state.user);

  const [actived, setActived] = useState([]);

  const handleShowTab = (tabId) => {
    if (actived.some((e) => e === tabId))
      setActived((prev) => prev.filter((el) => el !== tabId));
    else setActived((prev) => [...prev, tabId]);
  };

  return (
    <div className=" bg-white h-full py-4 flex flex-col justify-between">
      <div>
        <div className="flex flex-col justify-center items-center pb-4 mt-2 gap-2">
          <img
            src={current?.avatar || avatar}
            alt="logo"
            className="rounded-full w-16 h-16 object-contain border"
          ></img>
          <small className="font-semibold">{`${current?.lastname} ${current?.firstname}`}</small>
        </div>
        <div>
          {memberSidebar.map((e) => (
            <Fragment key={e.id}>
              {e.type === "SINGLE" && (
                <NavLink
                  to={e.path}
                  className={({ isActive }) =>
                    clsx(isActive && activedStyle, !isActive && notActivedStyle)
                  }
                >
                  <span>{e.icon}</span>
                  <span>{e.text}</span>
                </NavLink>
              )}
              {e.type === "PARENT" && (
                <div
                  onClick={() => handleShowTab(e.id)}
                  className="flex flex-col "
                >
                  <div className="flex items-center justify-between gap-2 px-4 py-2 hover:bg-blue-100 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <span>{e.icon}</span>
                      <span>{e.text}</span>
                    </div>
                    {actived.some((id) => +id === +e.id) ? (
                      <IoIosArrowForward></IoIosArrowForward>
                    ) : (
                      <IoIosArrowDown></IoIosArrowDown>
                    )}
                  </div>
                  {actived.some((id) => +id === +e.id) && (
                    <div className="flex flex-col">
                      {e.submenu.map((item) => (
                        <NavLink
                          key={item.text}
                          to={item.path}
                          onClick={(e) => e.stopPropagation()}
                          className={({ isActive }) =>
                            clsx(
                              isActive && activedStyle,
                              !isActive && notActivedStyle,
                              "pl-10"
                            )
                          }
                        >
                          {item.text}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </div>
      <NavLink to={"/"} className="pl-4">
        <Button>
        <div className="flex justify-center items-center gap-2">
          <FaBackward></FaBackward>
          <span>Back</span>
        </div>
        </Button>
      </NavLink>
    </div>
  );
};

export default memo(MemberSidebar);
