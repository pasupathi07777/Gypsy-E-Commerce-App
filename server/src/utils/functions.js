// export function validateFields(inputData) {
//   for (const field in inputData) {
//     const value = inputData[field]?.trim();

//     if (!value) {
//       return {
//         field,
//         error: `${field} is required`,
//       };
//     }

//     switch (field) {
//       case "email":
//         if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
//           return {
//             field,
//             error: "Invalid email",
//           };
//         }
//         break;

//       case "phone":
//         if (!/^\d{10}$/.test(value)) {
//           return {
//             field,
//             error: "Phone must be exactly 10 digits",
//           };
//         }
//         break;

//       case "password":
//         if (value.length < 8 || value.length > 25) {
//           return {
//             field,
//             error: "Password must be 8–25 characters",
//           };
//         }
//         break;

//       case "username":
//         if (value.length < 2 || value.length > 50) {
//           return {
//             field,
//             error: "Username must be 2–50 characters",
//           };
//         }
//         break;

//       default:
//         if (value.length < 1 || value.length > 100) {
//           return {
//             field,
//             error: `${field} must be 1–100 characters`,
//           };
//         }
//         break;
//     }
//   }

//   // If no errors are found, return null (or any success indicator)
//   return null;
// }


export function validateFields(inputData) {
  for (const field in inputData) {
    // Trim only if the value is a string
    const value =
      typeof inputData[field] === "string"
        ? inputData[field]?.trim()
        : inputData[field];

    // Check for required fields
    if (!value && value !== 0) {
      return {
        field,
        error: `${field} is required`,
      };
    }

    switch (field) {
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return {
            field,
            error: "Invalid email",
          };
        }
        break;

      case "phone":
        if (!/^\d{10}$/.test(value)) {
          return {
            field,
            error: "Phone must be exactly 10 digits",
          };
        }
        break;

      case "password":
        if (value.length < 8 || value.length > 25) {
          return {
            field,
            error: "Password must be 8–25 characters",
          };
        }
        break;

      case "username":
        if (value.length < 2 || value.length > 50) {
          return {
            field,
            error: "Username must be 2–50 characters",
          };
        }
        break;

      case "price":
      case "stock":
        if (isNaN(value) || value <= 0) {
          return {
            field,
            error: `${field} must be a positive number`,
          };
        }
        break;

      case "deliveryTime":
      case "returnPolicy":
      case "warranty":
        if (isNaN(value) || value < 0) {
          return {
            field,
            error: `${field} must be a non-negative number`,
          };
        }
        break;

      case "description":
        if (value.length < 10 || value.length > 500) {
          return {
            field,
            error: "Description must be 10–500 characters",
          };
        }
        break;

      case "photos":
        if (!Array.isArray(value) || value.length === 0) {
          return {
            field,
            error: "At least one photo is required",
          };
        }
        break;

      case "deliveryOption":
        if (!["Cash on Delivery", "Online Payment"].includes(value)) {
          return {
            field,
            error: "Invalid delivery option",
          };
        }
        break;

      case "category":
        if (value.length < 2 || value.length > 50) {
          return {
            field,
            error: "Category must be 2–50 characters",
          };
        }
        break;

      case "seller":
        if (value.length < 2 || value.length > 100) {
          return {
            field,
            error: "Seller name must be 2–100 characters",
          };
        }
        break;

      default:
        if (
          typeof value === "string" &&
          (value.length < 1 || value.length > 100)
        ) {
          return {
            field,
            error: `${field} must be 1–100 characters`,
          };
        }
        break;
    }
  }

  // Return null if all validations pass
  return null;
}
