
import React from "react";

const CustomTextArea = ({
  value,
  onChange,
  placeholder,
  rows,
  maxLength,
  name,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <textarea
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value, e)}
        rows={rows}
        placeholder={placeholder}
        maxLength={maxLength}
        className="w-full p-2 border border-gray-300  text-base focus:outline-none  "
      />
      {maxLength && (
        <div className="text-right text-xs text-gray-500">
          {value.length}/{maxLength} characters
        </div>
      )}
    </div>
  );
};

export default CustomTextArea;
