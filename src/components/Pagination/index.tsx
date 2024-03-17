import React, { useEffect, useMemo, useState } from "react";
import { IconArrow } from "../Icon/IconArrow";

export type Props = {
  onPageChange?: (e: any) => void;
  totalCount?: number;
  siblingCount?: number;
  currentPage?: number;
  pageSize?: number;
  classes?: string;
  maxShow?: number;
  trackId?: any;
};

const usePagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage = 1,
  maxShow = 4,
}) => {
  const range = (start: number, end: number) => {
    let length = end - start + 1;
    /*
            Create an array of certain length and set the elements within it from
          start value to end value.
        */

    return Array.from({ length }, (_, idx) => idx + start);
  };

  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);

    // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    const totalPageNumbers = siblingCount + 4;

    /*
        Case 1:
        If the number of pages is less than the page numbers we want to show in our
        paginationComponent, we return the range [1..totalPageCount]
      */
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    /*
          Calculate left and right sibling index and make sure they are within range 1 and totalPageCount
      */
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );

    /*
        We do not show dots just when there is just one page number to be inserted between the extremes of sibling and the page limits i.e 1 and totalPageCount. Hence we are using leftSiblingIndex > 2 and rightSiblingIndex < totalPageCount - 2
      */
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, "DOTS", totalPageCount];
    } else if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      return [firstPageIndex, "DOTS", ...rightRange];
    } else if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, "DOTS", ...middleRange, "DOTS", lastPageIndex];
    } else {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex + 1);
      return [firstPageIndex, ...middleRange, lastPageIndex];
    }
  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
};

export const Pagination: React.FC<Props> = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
  classes,
  maxShow = 4,
  trackId = "",
  ...props
}) => {
  const [currPage, setCurrPage] = useState(0);
  const paginationRange = usePagination({
    currentPage: currPage,
    totalCount,
    siblingCount,
    pageSize,
    maxShow,
  });

  const onNext = () => {
    onPageChange(currPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currPage - 1);
  };

  useEffect(() => {
    if (currentPage) {
      setCurrPage(currentPage);
    }
  }, [currentPage]);

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <ul className={"paginate " + (classes ? classes : "")}>
      {/* Left navigation arrow */}
      <li
        className={"paginate-icon " + (currPage === 1 ? "disabled" : "")}
        onClick={currPage === 1 ? undefined : onPrevious}
      >
        <IconArrow
          isCircle={true}
          color={currPage === 1 ? "#bebcc4" : "#3e3851"}
          size={24}
        />
      </li>
      {paginationRange.map((pageNumber) => {
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === "DOTS") {
          return <li className="paginate-item dots">&hellip;</li>;
        }

        // Render our Page Pills
        return (
          <li
            className={
              "paginate-item " + (pageNumber === currPage ? "selected" : "")
            }
            onClick={() => {
              onPageChange(pageNumber);
            }}
            key={"Paginate-" + pageNumber}
          >
            {pageNumber}
          </li>
        );
      })}
      {/*  Right Navigation arrow */}
      <li
        className={"paginate-icon " + (currPage === lastPage ? "disabled" : "")}
        onClick={currPage === lastPage ? undefined : onNext}
      >
        <IconArrow
          isCircle={true}
          direction="right"
          color={currPage === lastPage ? "#bebcc4" : "#3e3851"}
          size={24}
        />
      </li>
    </ul>
  );
};
