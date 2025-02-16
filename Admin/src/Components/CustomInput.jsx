// import React from 'react';
// import { Input } from 'rsuite';

// const CustomInput = ({ label, value, onChange, placeholder, type,name ,className }) => {
//   return (
//     <div className="custom-input-container" style={{ marginBottom: 10 }}>
//       {label && <label>{label}</label>}
//       <Input
//         type={type}
//         value={value}
//         onChange={onChange}
//         placeholder={placeholder}
//         name={name}
//         className={className}
//       />
//     </div>
//   );
// };

// export default CustomInput;


// import React from 'react';
// import { Input } from 'rsuite';

// const CustomInput = ({ label, value, onChange, placeholder, type, name, className }) => {
//   return (
//     <div className="custom-input-container flex  flex-col gap-1">
//       {label && <label className="">{label}</label>}
//       <Input
//         min={0}
//         type={type}
//         value={value}
//         onChange={onChange}
//         placeholder={placeholder}
//         name={name}
//         className={`custom-input ${className}`} // Apply custom class
//       />
//     </div>
//   );
// };

// export default CustomInput;


// import React from "react";

// const CustomInput = ({
//   label,
//   value,
//   onChange,
//   placeholder,
//   type,
//   name,
//   className,
// }) => {
//   return (
//     <div className="custom-input-container flex flex-col gap-1">
//       {label && <label>{label}</label>}
//       <input
//         min={0}
//         type={type}
//         value={value}
//         onChange={(e) =>onChange(e.target.value)}
//         placeholder={placeholder}
//         name={name}
//         className={`custom-input focus:outline-none ${className}`} // Apply custom class
//       />
//     </div>
//   );
// };

// export default CustomInput;


import React from "react";

const CustomInput = ({
  label,
  value,
  onChange,
  placeholder,
  type,
  name,
  className,
}) => {
  return (
    <div className="custom-input-container flex flex-col gap-1">
      {label && <label>{label}</label>}
      <input
        min={0}
        type={type}
        value={value}
        name={name}
        onChange={(e) => onChange(e.target.value, e)} // Pass value & event
        placeholder={placeholder}
        className={`custom-input focus:outline-none   p-2 border  w-full ${className}`} // Apply custom class
      />
    </div>
  );
};

export default CustomInput;
