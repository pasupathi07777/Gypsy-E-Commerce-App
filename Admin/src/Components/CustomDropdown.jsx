
// import React from 'react';
// import { Dropdown } from 'rsuite';

// // Custom Dropdown Component
// const CustomDropdown = ({ title, items, size, name, onChange, value }) => {
//   // Handle item selection
//   const handleSelect = (selectedValue) => {
//     if (onChange) {
//       onChange(name, selectedValue); // Pass the name and selected value to the parent component
//     }
//   };

//   return (
//     <Dropdown 
    
//       appearance="default" 
//       size={size} 
//       title={value || title}
//       style={{ width: 400}}  // Make the dropdown button full width
//     >
//       {items.map((item, index) => (
//         <Dropdown.Item 
//           style={{ width: "100%" }}  // Make each dropdown item full width
//           key={index} 
//           onSelect={() => handleSelect(item)}
//         >
//           {item}
//         </Dropdown.Item>
//       ))}
//     </Dropdown>
//   );
// };

// export default CustomDropdown;


import React from "react";

// Custom Dropdown Component
const CustomDropdown = ({ title, items, name, onChange, value }) => {
  console.log(value);
  
  return (
    <div>
      <label className="block text-sm mb-1">{title}</label>
      <select
        name={name}
        value={value || ""}
        onChange={(e) => onChange(name, e.target.value)}
        className="w-full p-2 border rounded-md"
      >
        <option value="" disabled>
          Select {title}
        </option>
        {items.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomDropdown;

