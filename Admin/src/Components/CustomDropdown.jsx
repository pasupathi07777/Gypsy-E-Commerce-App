// // import React from 'react';
// // import { Dropdown } from 'rsuite';

// // // Custom Dropdown Component
// // const CustomDropdown = ({ title, items, size, name, onChange, value }) => {
// //   // Handle item selection
// //   const handleSelect = (selectedValue) => {
// //     if (onChange) {
// //       onChange(name, selectedValue); // Pass the name and selected value to the parent component
// //     }
// //   };

// //   return (
// //     <Dropdown 
// //       appearance="default" 
// //       size={size} 
// //       title={value || title}
// //       style={{width: "100%"}}  // Make the dropdown full width
// //     >
// //       {items.map((item, index) => (
// //         <Dropdown.Item key={index} onSelect={() => handleSelect(item)}>
// //           {item}
// //         </Dropdown.Item>
// //       ))}
// //     </Dropdown>
// //   );
// // };

// // export default CustomDropdown;


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
//       style={{ width:600 }}  // Make the dropdown full width
//     >
//       {items.map((item, index) => (
//         <Dropdown.Item style={{width:"100%"}} key={index} onSelect={() => handleSelect(item)}>
//           {item}
//         </Dropdown.Item>
//       ))}
//     </Dropdown>
//   );
// };

// export default CustomDropdown;
import React from 'react';
import { Dropdown } from 'rsuite';

// Custom Dropdown Component
const CustomDropdown = ({ title, items, size, name, onChange, value }) => {
  // Handle item selection
  const handleSelect = (selectedValue) => {
    if (onChange) {
      onChange(name, selectedValue); // Pass the name and selected value to the parent component
    }
  };

  return (
    <Dropdown 
      appearance="default" 
      size={size} 
      title={value || title}
      style={{ width: "100%" }}  // Make the dropdown button full width
    >
      {items.map((item, index) => (
        <Dropdown.Item 
          style={{ width: "100%" }}  // Make each dropdown item full width
          key={index} 
          onSelect={() => handleSelect(item)}
        >
          {item}
        </Dropdown.Item>
      ))}
    </Dropdown>
  );
};

export default CustomDropdown;
