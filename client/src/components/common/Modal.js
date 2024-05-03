import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { showModal } from "../../store/app/appSlice";

const Modal = ({ children }) => {
  const dispatch = useDispatch();

  return (
    <div
      onClick={() =>
        dispatch(showModal({ isShowModal: false, modelChildren: null }))
      }
      className="absolute inset-0 z z-[1000] bg-overlay flex justify-center items-center"
    >
      <div>{children}</div>
    </div>
  );
};

export default memo(Modal);
