import React, { useMemo } from "react";
import { generateRange } from "../ultils/helper";
import icons from "../ultils/icons";
import { limit } from '../ultils/contants'

const usePagination = (totalProductCount, currentPage, siblingCount = 1) => {
  const { BsThreeDots } = icons;
  const paginationArray = useMemo(() => {
    const pageSize = limit || 10;
    const paginationCount = Math.ceil(totalProductCount / pageSize);
    const totalPaginationItem = siblingCount + 5;

    if (paginationCount <= totalPaginationItem)
      return generateRange(1, paginationCount);
   

    const isShowLeft = +currentPage - siblingCount > 2;
    const isShowRight = +currentPage + siblingCount < paginationCount - 1;

    if (isShowLeft && !isShowRight) {
      const rightStart = paginationCount - 4;
      const rightRange = generateRange(rightStart, paginationCount);
      return [1, <BsThreeDots></BsThreeDots>, ...rightRange];
    }

    if (!isShowLeft && isShowRight) {
      const leftRange = generateRange(1, 5);
      return [...leftRange, <BsThreeDots></BsThreeDots>, paginationCount];
    }

    const siblingLeft = Math.max(+currentPage - siblingCount, 1);
    const siblingRight = Math.min(+currentPage + siblingCount, paginationCount);

    if (isShowLeft && isShowRight) {
      const middleRange = generateRange(siblingLeft, siblingRight);
      return [
        1,
        <BsThreeDots></BsThreeDots>,
        ...middleRange,
        <BsThreeDots></BsThreeDots>,
        paginationCount,
      ];
    }
  }, [totalProductCount, currentPage, siblingCount]);
  return paginationArray;
};

export default usePagination;
