// export function validateFields(inputData) {
//   console.log("Input Data:", inputData);

//   for (const field in inputData) {
//     const value = inputData[field]?.trim();

//     if (
//       !value &&
//       field !== "regNumber" &&
//       field !== "bio" &&
//       field !== "phone" &&
//       field !== "department" &&
//       field !== "bio"
//     ) {
//       return {
//         field,
//         message: `${field} is required`,
//       };
//     }

//     switch (field) {

//       case "photos":
//         if (value.length > 0) {
//           return {
//             field,
//             message: "email is Required",
//           };
//         }
//         break;
//       case "email":
//         if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
//           return {
//             field,
//             message: "Invalid email",
//           };
//         }
//         break;

//       case "phone":
//         if (!/^\d{10}$/.test(value)) {
//           return {
//             field,
//             message: "Phone must be exactly 10 digits",
//           };
//         }
//         break;

//       case "password":
//         if (value.length < 8 || value.length > 25) {
//           return {
//             field,
//             message: "Password must be 8–25 characters",
//           };
//         }
//         break;

//       case "username":
//         if (value.length < 4 || value.length > 20) {
//           return {
//             field,
//             message: "Username must be 4–20 characters",
//           };
//         }
//         break;

//       case "confirmPassword":
//         if (value !== inputData.password) {
//           return {
//             field,
//             message: "Confirm password does not match password",
//           };
//         }
//         if (value === "") {
//           return {
//             field,
//             message: "Confirm password is required",
//           };
//         }
//         break;
//     }
//   }

//   return null;
// }


export function validateFields(inputData) {
  console.log("Input Data:", inputData);

  for (const field in inputData) {
    const value =
      typeof inputData[field] === "string"
        ? inputData[field].trim()
        : inputData[field];

    if (
      (value === undefined || value === "") &&
      field !== "regNumber" &&
      field !== "bio" &&
      field !== "phone" &&
      field !== "department" &&
      field !== "photos" // Exclude optional fields like photos
    ) {
      return {
        field,
        message: `${field} is required`,
      };
    }

    switch (field) {
      case "photos":
        if (!Array.isArray(value) || value.length === 0) {
          return {
            field,
            message: "At least one photo is required",
          };
        }
        break;

      case "price":
      case "stock":
        if (isNaN(value) || value <= 0) {
          return {
            field,
            message: `${field} must be a positive number`,
          };
        }
        break;

      case "returnPolicy":
      case "deliveryTime":
      case "warranty":
        if (isNaN(value) || value < 0) {
          return {
            field,
            message: `${field} must be a non-negative number`,
          };
        }
        break;

      case "category":
        if (!value) {
          return {
            field,
            message: "Category is required",
          };
        }
        break;

      case "deliveryOption":
        if (!["Cash on Delivery", "Online Payment"].includes(value)) {
          return {
            field,
            message: "Invalid delivery option",
          };
        }
        break;

      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return {
            field,
            message: "Invalid email",
          };
        }
        break;

      case "phone":
        if (!/^\d{10}$/.test(value)) {
          return {
            field,
            message: "Phone must be exactly 10 digits",
          };
        }
        break;

      case "password":
        if (value.length < 8 || value.length > 25) {
          return {
            field,
            message: "Password must be 8–25 characters",
          };
        }
        break;

      case "username":
        if (value.length < 4 || value.length > 20) {
          return {
            field,
            message: "Username must be 4–20 characters",
          };
        }
        break;

      case "confirmPassword":
        if (value !== inputData.password) {
          return {
            field,
            message: "Confirm password does not match password",
          };
        }
        if (value === "") {
          return {
            field,
            message: "Confirm password is required",
          };
        }
        break;

      case "description":
        if (value.length < 10) {
          return {
            field,
            message: "Description must be at least 10 characters",
          };
        }
        break;

      case "seller":
        if (!value) {
          return {
            field,
            message: "Seller is required",
          };
        }
        break;

      case "name":
        if (!value) {
          return {
            field,
            message: "Product name is required",
          };
        }
        break;
    }
  }

  return null;
}
