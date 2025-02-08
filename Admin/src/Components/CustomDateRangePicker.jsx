// CustomDateRangePicker.js
import React from "react";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";

const CustomDateRangePicker = ({ selectedRange, onChange }) => {
  return (
    <DateRangePicker
      size="lg"
      value={selectedRange}
      onChange={onChange}
      format="yyyy-MM-dd"
      style={{ width: 300, height: 42, marginBottom: 10,zIndex:100}}
    />
  );
};

export default CustomDateRangePicker;
