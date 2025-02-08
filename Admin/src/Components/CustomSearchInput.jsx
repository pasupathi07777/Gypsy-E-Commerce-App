// // CustomSearchInput.js
// import React from "react";
// import { InputGroup, Input } from "rsuite";
// import SearchIcon from "@rsuite/icons/Search";

// const  CustomSearchInput = ({ value, onChange, placeholder }) => {
//   return (
//     <InputGroup inside style={{ width: 300, height: 42, marginBottom: 10, borderRadius: 0}}>
//       <Input placeholder={placeholder} value={value} onChange={onChange} />
//       <InputGroup.Button>
//         <SearchIcon />
//       </InputGroup.Button>
//     </InputGroup>
//   );
// };

// export default CustomSearchInput;
import React from "react";
import { InputGroup, Input } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";

const CustomSearchInput = ({ value, onChange, placeholder }) => {
  return (
    <InputGroup
      inside
      style={{
        width: 300,
        height: 42,
        marginBottom: 10,
        borderRadius: 0,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Input placeholder={placeholder} value={value} onChange={onChange} />
      <InputGroup.Button
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          border: "none",
        }}
      >
        <SearchIcon />
      </InputGroup.Button>
    </InputGroup>
  );
};

export default CustomSearchInput;
