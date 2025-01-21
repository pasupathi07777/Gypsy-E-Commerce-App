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


import React from 'react';
import { Input } from 'rsuite';

const CustomInput = ({ label, value, onChange, placeholder, type, name, className }) => {
  return (
    <div className="custom-input-container" style={{ marginBottom: 0 }}>
      {label && <label>{label}</label>}
      <Input
      min={0}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
        className={className}
        
      />
    </div>
  );
};

export default CustomInput;
