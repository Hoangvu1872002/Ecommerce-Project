import React from "react";

const InputField = ({
  value,
  setValue,
  nameKey,
  type,
  invaliFields,
  setInvaliFields,
}) => {
  return (
    <div className="w-full flex flex-col relative mb-2">
      {value?.trim() !== "" && (
        <label
          className="text-[10px] absolute animate-silde-top-sm top-0 left-[12px] block bg-white px-1"
          htmlFor={nameKey}
        >
          {nameKey?.slice(0, 1).toUpperCase() + nameKey?.slice(1)}
        </label>
      )}
      <input
        type={type || "text"}
        className="px-4 py-2 rounded-sm border w-full mt-2 placeholder:italic"
        placeholder={nameKey?.slice(0, 1).toUpperCase() + nameKey?.slice(1)}
        value={value}
        onChange={(e) =>
          setValue((prev) => ({ ...prev, [nameKey]: e.target.value }))
        }
        onFocus={() => setInvaliFields([])}
      ></input>
      {invaliFields?.some((e) => e.name === nameKey) && (
        <small className="text-main italic">
          {invaliFields?.find((e) => e.name === nameKey)?.mes}
        </small>
      )}
    </div>
  );
};

export default InputField;
