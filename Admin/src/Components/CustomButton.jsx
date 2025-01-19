import React from "react";

const CustomButton = ({
    children,
    onClick,
    type = "button",
    disabled = false,
    className = "",
    style = "",
}) => {

    const baseStyle =
        "px- py-2 rounded-lg font-medium text-sm focus:outline-none transition duration-200 m-0";
        
    const finalClassName = `${baseStyle} ${className} ${style} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`;

    return (
        <button type={type} onClick={onClick} disabled={disabled} className={finalClassName}>
            {children}
        </button>
    );
};

export default CustomButton;
