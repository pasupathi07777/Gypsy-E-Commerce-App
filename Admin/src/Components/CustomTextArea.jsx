import React from 'react';
import { Input } from 'rsuite';

// CustomTextArea Component
const CustomTextArea = ({ value, onChange, placeholder, rows, maxLength,name }) => {
  return (
    <div className="custom-textarea-container">
      <Input
      name={name}
        as="textarea"
        value={value}
        onChange={onChange}
        rows={rows}
        placeholder={placeholder}
        maxLength={maxLength}
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
