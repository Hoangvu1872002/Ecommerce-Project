import React, { memo } from "react";
import { formatMoney, renderStarFromNumber } from "../../ultils/helper";

const ProductCard = ({ price, thumb, totalRating, title }) => {
  return (
    <div className="w-1/3 flex-auto flex px-[10px] mb-[20px] ">
      <div className=" flex w-full border shadow-md rounded-lg hover:shadow-blue-400 cursor-pointer">
        <img
          src={thumb}
          alt="product"
          className="w-[120px] object-contain p-4"
        ></img>
        <div className="flex flex-col mt-[15px] items-start gap gap-1 w-full text-sm">
          <span className="line-clamp-1 lowercase text-sm">
            {title?.toLowerCase()}
          </span>
          <span className="flex h-4">
            {renderStarFromNumber(totalRating, 14).map((e, index) => (
              <span key={index}>{e}</span>
            ))}
          </span>
          <span>{`${formatMoney(price)} vnd`}</span>
        </div>
      </div>
    </div>
  );
};

export default memo(ProductCard);
