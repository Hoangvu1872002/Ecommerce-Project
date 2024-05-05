import React, { memo, useEffect, useRef, useState } from "react";
import { Button, InputForm, Loading } from "../../components";
import { useForm } from "react-hook-form";
import { getBase64, validate } from "../../ultils/helper";
import Swal from "sweetalert2";
import withBase from "../../hocs/withBase";
import { showModal } from "../../store/app/appSlice";
import { apiAddVarriant, apiDeleteVarriant } from "../../apis";
import { useSearchParams } from "react-router-dom";
import { limit } from "../../ultils/contants";
import moment from "moment";
import icons from "../../ultils/icons";
import { ToastContainer } from "react-toastify";

const CustomizeVarriants = ({
  customizeVarriant,
  setCustomizeVarriant,
  render,
  toast,
  dispatch,
}) => {
  const { MdDeleteForever } = icons;

  const titleRef = useRef();

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    watch,
  } = useForm();

  // console.log(customizeVarriant);

  const [params] = useSearchParams();

  const [preview, setPreview] = useState({
    thumb: null,
    images: [],
  });

  const handleDeleteBlog = (data) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure remove this product",
      icon: "warning",
      showCancelButton: true,
    }).then(async (rs) => {
      if (rs.isConfirmed) {
        const response = await apiDeleteVarriant(data, customizeVarriant._id);
        if (response.success) toast.success(response.mes);
        else toast.error(response.mes);
        render();
        titleRef.current.scrollIntoView({ block: "start" });
      }
    });
  };

  const handleAddvarriant = async (data) => {
    // console.log(customizeVarriant);
    if (
      data.color === customizeVarriant.color ||
      customizeVarriant.varriants.find((e) => e.color === data.color)
    )
      Swal.fire("Oops!", "Color not changed", "info");
    else {
      const formData = new FormData();
      for (let i of Object.entries(data)) formData.append(i[0], i[1]);
      // console.log(finalPayload);
      if (data.thumb) formData.append("thumb", data.thumb[0]);
      if (data.images) {
        for (let image of data.images) formData.append("images", image);
      }
      // dispatch(
      //   showModal({ isShowModal: true, modalChildren: <Loading></Loading> })
      // );
      const response = await apiAddVarriant(formData, customizeVarriant._id);
      //dispatch(showModal({ isShowModal: false, modalChildren: null }));
      if (response.success) {
        toast.success(response.mes, {
          position: toast.POSITION.TOP_RIGHT,
        });
        reset();
        setPreview({
          thumb: null,
          images: [],
        });
        render();
        titleRef.current.scrollIntoView({ block: "start" });
      } else {
        toast.error(response.mes, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };

  const handlePreviewImages = async (files) => {
    const imagesPreview = [];
    for (let file of files) {
      if (file.type !== "image/png" && file.type !== "image/jpeg") {
        toast.error("File not supported", {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      }
      const base64 = await getBase64(file);
      imagesPreview.push(base64);
    }
    setPreview((prev) => ({ ...prev, images: imagesPreview }));
  };

  const handlePreviewThumb = async (file) => {
    const base64Thumb = await getBase64(file);
    setPreview((prev) => ({ ...prev, thumb: base64Thumb }));
  };

  useEffect(() => {
    reset({
      title: customizeVarriant?.title,
      color: customizeVarriant?.color,
      price: customizeVarriant?.price,
      quantity: customizeVarriant?.quantity,
    });
  }, [customizeVarriant]);

  useEffect(() => {
    if (watch("thumb") instanceof FileList && watch("thumb").length > 0)
      handlePreviewThumb(watch("thumb")[0]);
  }, [watch("thumb")]);

  useEffect(() => {
    if (watch("images") instanceof FileList && watch("images").length > 0)
      handlePreviewImages(watch("images"));
  }, [watch("images")]);

  return (
    <div ref={titleRef} className="w-full">
      <div className="flex w-full">
        <h1 className="fixed z-50 bg-gray-100 w-full h-[75px] flex justify-between items-center text-3xl font-bold px-5 border-b">
          <span>Customize Varriants </span>
        </h1>
        <div className="flex fixed z-50 top-2 right-4 font-semibold">
          <Button handleOnClick={() => setCustomizeVarriant(null)}>
            Cancel
          </Button>
        </div>
      </div>
      <div className="h-[75px] w-full"></div>
      <div className="px-4 mt-8">
        {customizeVarriant?.varriants.length > 0 && (
          <div className="flex flex-col gap-2">
            <div className="font-medium">Product variation table:</div>
            <table className="table-auto mb-6 text-left w-full ">
              <thead className="font-bold bg-gray-700 text-[13px]  text-white">
                <tr className="border border-gray-500">
                  <th className="px-4 py-2">#</th>
                  <th className="px-2 py-2">Thumb</th>
                  <th className="px-4 py-2">Title</th>
                  <th className="px-2 py-2">Color</th>
                  <th className="px-2 py-2">Quantity</th>
                  <th className="px-2 py-2">Sold</th>
                  <th className="px-2 py-2">Active</th>
                </tr>
              </thead>
              <tbody>
                {customizeVarriant?.varriants?.map((e, index) => (
                  <tr key={e._id} className="border border-gray-500">
                    <td className="px-4 py-2">
                      {index +
                        (params.get("page") - 1 > 0
                          ? params.get("page") - 1
                          : 0) *
                          limit +
                        1}
                    </td>
                    <td className="px-2 py-2">
                      <img
                        src={e.thumb}
                        alt="thumb"
                        className="w-8 h-8 object-cover"
                      ></img>
                    </td>
                    <td className="px-4 py-2 max-w-[130px]">{e.title}</td>
                    <td className="px-2 py-2">{e.color}</td>
                    <td className="px-2 py-2">{e.quantity}</td>
                    <td className="px-2 py-2">{e.sold}</td>
                    <td className="px-2 py-2  h-full">
                      <span
                        onClick={() => handleDeleteBlog(e.color)}
                        className=" inline-block text-blue-500 hover:text-orange-600 cursor-pointer"
                      >
                        <MdDeleteForever size={20}></MdDeleteForever>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <form
        onSubmit={handleSubmit(handleAddvarriant)}
        className="p-4 w-full flex flex-col gap-4"
      >
        <div className="flex gap-4 items-center w-full">
          <InputForm
            label="Name varriant"
            register={register}
            errors={errors}
            id="title"
            fullWith
            style="flex-auto"
            validate={{
              required: "Need fill this field",
            }}
            placeholder="Title of new varriant"
          />
        </div>
        <div className="flex gap-4 items-center w-full">
          <InputForm
            label="Price varriant"
            register={register}
            errors={errors}
            id="price"
            validate={{
              required: "Need fill this field",
            }}
            fullWith
            placeholder="Price of new varriant"
            type="number"
            style="flex-auto"
          />
          <InputForm
            label="Color varriant"
            register={register}
            errors={errors}
            id="color"
            validate={{
              required: "Need fill this field",
            }}
            fullWith
            placeholder="Color of new varriant"
            style="flex-auto"
          />
          <InputForm
            label="Quantity varriant"
            register={register}
            errors={errors}
            id="quantity"
            validate={{
              required: "Need fill this field",
            }}
            fullWith
            placeholder="Quantity of new varriant"
            style="flex-auto"
          />
        </div>
        <div className="flex flex-col gap-2 mt-2">
          <label className="font-semibold" htmlFor="thumb">
            Upload thumb
          </label>
          <input
            type="file"
            id="thumb"
            {...register("thumb", { required: "Need fill" })}
          ></input>
          {errors["thumb"] && (
            <small className="text-xs text-red-500">
              {errors["thumb"]?.message}
            </small>
          )}
        </div>
        {preview.thumb && (
          <div className="my-4">
            <img
              src={preview?.thumb}
              alt="thumbnail"
              className="w-[200px] object-contain"
            ></img>
          </div>
        )}
        <div className="flex flex-col gap-2 my-2">
          <label className="font-semibold" htmlFor="thumb">
            Upload images of product
          </label>
          <input
            type="file"
            id="images"
            {...register("images", { required: "Need fill" })}
            multiple
          ></input>
          {/* <label htmlFor="file">Choose a file</label> */}
          {errors["images"] && (
            <small className="text-xs text-red-500">
              {errors["images"]?.message}
            </small>
          )}
        </div>
        {preview.images.length > 0 && (
          <div className="my-4 flex gap-3 flex-wrap">
            {preview.images?.map((e, index) => (
              <div key={index} className="w-fit relative">
                <img
                  src={e}
                  alt="product"
                  className="w-[200px] object-contain"
                ></img>
              </div>
            ))}
          </div>
        )}
        <Button type="submit">Add varriant</Button>
      </form>
      <ToastContainer autoClose={1200} />
    </div>
  );
};

export default withBase(memo(CustomizeVarriants));
