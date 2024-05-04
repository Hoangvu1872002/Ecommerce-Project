import React, { memo, useEffect, useState } from "react";
import { Button, InputForm, Loading } from "../../components";
import { useForm } from "react-hook-form";
import { getBase64, validate } from "../../ultils/helper";
import Swal from "sweetalert2";
import withBase from "../../hocs/withBase";
import { showModal } from "../../store/app/appSlice";
import { apiAddVarriant } from "../../apis";

const CustomizeVarriants = ({
  customizeVarriant,
  setCustomizeVarriant,
  render,
  toast,
  dispatch,
}) => {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    watch,
  } = useForm();

  const [preview, setPreview] = useState({
    thumb: null,
    images: [],
  });

  const handleAddvarriant = async (data) => {
    console.log(customizeVarriant);
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
    <div className="w-full">
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
    </div>
  );
};

export default withBase(memo(CustomizeVarriants));
