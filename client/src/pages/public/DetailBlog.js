import React, { memo, useEffect, useRef } from "react";
import withBase from "../../hocs/withBase";
import { useParams } from "react-router-dom";
import { Breadcrumbs } from "../../components";
import { dataFakeBlogs } from "../../ultils/contants";
import path from "../../ultils/path";

const DetailBlog = ({ navigate }) => {
  const titleRef = useRef();

  const { title, blogs } = useParams();

  const dataBlog = dataFakeBlogs.find(
    (e) => e.title === title.replace(/-/g, " ")
  );
  useEffect(() => {
      titleRef.current.scrollIntoView({ block: "start" });
  },[])


  return (
    <div className="w-full">
      <div className="h-[81px] mt-4 flex justify-center items-center bg-gray-50" ref={titleRef}>
        <div className="w-main">
          <span className="font-semibold text-[18px] uppercase">
            {title.replace(/-/g, " ")}
          </span>
          <div className="mt-2">
            <Breadcrumbs
              category={blogs.slice(1)}
              title={title.replace(/-/g, " ")}
            ></Breadcrumbs>
          </div>
        </div>
      </div>
      <div className="my-4 w-main mx-auto flex flex-col gap-4">
        <li className="text-gray-500 text-sm">{dataBlog?.timeCreated}</li>
        <div className="w-full">
          <img className="w-full" src={dataBlog?.image} alt="image"></img>
        </div>
        <p className="text-gray-700 text-sm">{dataBlog?.content}</p>
        <div
          className="flex justify-end my-4"
          onClick={() => navigate(`/${path.BLOGS}`)}
        >
          <span className="text-gray-700 hover:text-red-500 cursor-pointer">
            BACK TO RIGHT SIDEBAR
          </span>
        </div>
      </div>
    </div>
  );
};

export default withBase(memo(DetailBlog));
