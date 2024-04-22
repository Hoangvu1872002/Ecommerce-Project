import React, { memo, useEffect, useRef } from "react";
import { Breadcrumbs } from "../../components";
import { useParams } from "react-router-dom";
import { dataFakeBlogs } from "../../ultils/contants";
import withBase from "../../hocs/withBase";
import path from "../../ultils/path";

const Blog = ({ navigate }) => {
  const { blogs } = useParams();

  const titleRef = useRef();

  useEffect(() => {
    titleRef.current.scrollIntoView({ block: "start" });
},[])


  return (
    <div className="w-full" ref={titleRef}>
      <div className="h-[81px] mt-4 flex justify-center items-center bg-gray-50">
        <div className="w-main">
          <span className="font-semibold text-[18px] uppercase">
            {blogs.slice(1)}
          </span>
          <div className="mt-2">
            <Breadcrumbs category={blogs.slice(1)}></Breadcrumbs>
          </div>
        </div>
      </div>
      <div className="w-main mx-auto mt-4 flex mb-[60px] gap-8">
        <div className="w-[78%] flex flex-col gap-10">
          {dataFakeBlogs.map((e) => (
            <div key={e.id} className="flex gap-5">
              <div className="flex-1">
                <img src={e.image} alt="image" />
              </div>
              <div className="flex-1 flex flex-col mt-[-5px] gap-2">
                <div
                  className="text-lg font-semibold hover:text-red-500 cursor-pointer"
                  onClick={() =>
                    navigate(`/${path.BLOGS}/${e?.title.replace(/ /g, "-")}`)
                  }
                >
                  {e.title.toUpperCase()}
                </div>
                <li className="text-xs text-gray-400 ">{e.timeCreated}</li>
                <div className="text-sm line-clamp-[9]">{e.content}</div>
                <div
                  className=" text-sm text-red-500 hover:font-semibold cursor-pointer"
                  onClick={() =>
                    navigate(`/${path.BLOGS}/${e?.title.replace(/ /g, "-")}`)
                  }
                >
                  Read More
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="w-[22%] flex flex-col">
          <div className="border">
            <div className="p-2 pl-4 font-semibold text-lg bg-red-500 text-white">
              RECENT ARTICLES
            </div>
            <div className="flex flex-col gap-4 my-4 ml-4">
              {dataFakeBlogs.map((e) => (
                <div key={e.id} className="flex flex-col">
                  <span
                    className="font-medium text-sm hover:text-red-500 cursor-pointer"
                    onClick={() =>
                      navigate(`/${path.BLOGS}/${e?.title.replace(/ /g, "-")}`)
                    }
                  >
                    {e.title}
                  </span>
                  <span className="text-xs mt-2 text-gray-400">
                    {e.timeCreated}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <img
              src="https://digital-world-2.myshopify.com/cdn/shop/files/9069783_orig_400x_5a30224e-9dc2-442a-85fd-0b09a896a89a_400x.jpg?v=1613168570"
              alt="err"
            ></img>
          </div>
          <div className=""></div>
        </div>
      </div>
    </div>
  );
};

export default withBase(memo(Blog));
