

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
        message: `${field} is required`,
      };
    }

    switch (field) {
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
        if (value.length < 2 || value.length > 50) {
          return {
            field,
            message: "Username must be 2–50 characters",
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

      case "deliveryTime":
      case "returnPolicy":
      case "warranty":
        if (isNaN(value) || value < 0) {
          return {
            field,
            message: `${field} must be a non-negative number`,
          };
        }
        break;

      case "description":
        if (value.length < 10 || value.length > 500) {
          return {
            field,
            message: "Description must be 10–500 characters",
          };
        }
        break;

      case "photos":
        if (!Array.isArray(value) || value.length === 0) {
          return {
            field,
            message: "At least one photo is required",
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

      case "category":
        if (value.length < 2 || value.length > 50) {
          return {
            field,
            message: "Category must be 2–50 characters",
          };
        }
        break;

      case "seller":
        if (value.length < 2 || value.length > 100) {
          return {
            field,
            message: "Seller name must be 2–100 characters",
          };
        }
        break;

      default:
        if (
          typeof value === "string" && field!=="image"  && 
          (value.length < 1 || value.length > 100)
        ) {
          return {
            field,
            message: `${field} must be 1–100 characters`,
          };
        }
        break;
    }
  }

  // Return null if all validations pass
  return null;
}
