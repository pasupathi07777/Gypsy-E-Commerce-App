// CustomDateRangePicker.js
import React from "react";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css"; // Import rsuite styles

const CustomDateRangePicker = ({ selectedRange, onChange }) => {
  return (
    <DateRangePicker
      size="lg"
      value={selectedRange}
      onChange={onChange}
      format="yyyy-MM-dd"
      style={{ width: 300, height: 42, marginBottom: 10 }}
    />
  );
};

export default CustomDateRangePicker;
