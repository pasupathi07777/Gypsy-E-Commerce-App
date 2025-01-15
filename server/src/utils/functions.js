// export function validateFields(inputData) {
//   const errors = [];

//   for (const field in inputData) {
//     const value = inputData[field]?.trim();

//     if (!value) {
//       errors.push({
//         field,
//         error: `${field} is required`,
//       });
//       continue;
//     }

//     switch (field) {
//       case "email":
//         if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
//           errors.push({
//             field,
//             error: "Invalid email",
//           });
//         }
//         break;

//       case "phone":
//         if (!/^\d{10}$/.test(value)) {
//           errors.push({
//             field,
//             error: "Phone must be exactly 10 digits",
//           });
//         }
//         break;

//       case "password":
//         if (value.length < 8 || value.length > 25) {
//           errors.push({
//             field,
//             error: "Password must be 8–25 characters",
//           });
//         }
//         break;

//       case "username":
//         if (value.length < 2 || value.length > 50) {
//           errors.push({
//             field,
//             error: "Username must be 2–50 characters",
//           });
//         }
//         break;

//       default:
//         if (value.length < 1 || value.length > 100) {
//           errors.push({
//             field,
//             error: `${field} must be 1–100 characters`,
//           });
//         }
//         break;
//     }
//   }

//   return errors;
// }
export function validateFields(inputData) {
  for (const field in inputData) {
    const value = inputData[field]?.trim();

    if (!value) {
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

      default:
        if (value.length < 1 || value.length > 100) {
          return {
            field,
            error: `${field} must be 1–100 characters`,
          };
        }
        break;
    }
  }

  // If no errors are found, return null (or any success indicator)
  return null;
}
