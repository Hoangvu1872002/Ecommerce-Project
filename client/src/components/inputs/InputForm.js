import clsx from "clsx";
import React, { memo, useState } from "react";

const InputForm = ({
  label,
  disabled,
  register,
  errors,
  id,
  validate,
  type = "text",
  placeholder,
  fullWith,
  defaultValue,
  style,
  readOnly,
}) => {
  // const [defaultValueNew, setDefaultValueNew] = useState()
  // if(defaultValueNew !== defaultValue){
  //   setDefaultValueNew(defaultValue)
  // }
  return (
    <div className={clsx(`flex flex-col h-[78px] gap-2 rounded-md`, style)}>
      {label && (
        <label className="font-medium" htmlFor={id}>
          {label + ":"}
        </label>
      )}
      <input
        type={type}
        id={id}
        {...register(id, validate)}
        disabled={disabled}
        placeholder={placeholder}
        className={clsx(`form-input rounded-md my-auto max-h-[41.6px]`, fullWith && "w-full", style)}
        defaultValue={defaultValue}
        readOnly={readOnly}
      ></input>
      {errors[id] && (
        <small className="text-xs text-red-500">{errors[id]?.message}</small>
      )}
    </div>
  );
};

export default memo(InputForm);
