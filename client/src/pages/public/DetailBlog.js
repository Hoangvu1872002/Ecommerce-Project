import React, { memo, useEffect, useRef, useState } from "react";
import withBase from "../../hocs/withBase";
import { useParams } from "react-router-dom";
import { Breadcrumbs } from "../../components";
import { dataFakeBlogs } from "../../ultils/contants";
import path from "../../ultils/path";
import { apiGetBlogs, apiGetOneBlog } from "../../apis";
import moment from "moment";
import DOMPurify from "dompurify";

const DetailBlog = ({ navigate }) => {
  const titleRef = useRef();

  const { bid, blogs } = useParams();

  const [dataBlog, setDataBlog] = useState();

  // const dataBlog = dataFakeBlogs.find(
  //   (e) => e.title === title.replace(/-/g, " ")
  // );

  const fetchBlogs = async () => {
    const response = await apiGetOneBlog(bid);
    if (response.success) {
      setDataBlog(response.blog);
    }
  };

  useEffect(() => {
    fetchBlogs();
    titleRef.current.scrollIntoView({ block: "start" });
  }, []);

  return (
    <div className="w-full">
      <div
        className="h-[81px] mt-4 flex justify-center items-center bg-gray-50"
        ref={titleRef}
      >
        <div className="w-main">
          <span className="font-semibold text-[18px] uppercase">
            {dataBlog?.title}
          </span>
          <div className="mt-2">
            <Breadcrumbs
              // category={blogs.slice(1)}
              title={dataBlog?.title}
            ></Breadcrumbs>
          </div>
        </div>
      </div>
      <div className="my-4 w-main mx-auto flex flex-col gap-4">
        <li className="text-gray-500 text-sm">
          {moment(dataBlog?.createAt).format("DD/MM/YYYY")}
        </li>
        <div className="w-full">
          <img className="w-full" src={dataBlog?.thumb} alt="image"></img>
        </div>

        <div
          className="text-gray-700 text-sm mb-4"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(dataBlog?.description),
          }}
        ></div>

        {/* <div
          className="flex justify-end my-4"
          onClick={() => navigate(`/${path.BLOGS}`)}
        >
          <span className="text-gray-700 hover:text-red-500 cursor-pointer">
            BACK TO RIGHT SIDEBAR
          </span>
        </div> */}
      </div>
    </div>
  );
};

export default withBase(memo(DetailBlog));
