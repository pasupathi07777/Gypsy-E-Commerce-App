
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { confirmationSliceStates, hidePopup } from "../Redux/Slices/confirmationSlice"; // Import hidePopup action

const ConfirmationPopup = () => {
  const dispatch = useDispatch();
  const { isVisible, message, onConfirm } = useSelector(confirmationSliceStates);

  if (!isVisible) return null;

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm(); 
    }
    dispatch(hidePopup()); 
  };

  const handleCancel = () => {
    dispatch(hidePopup()); 
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h6 className=" font-semibold mb-4">{message}</h6>
        <div className="flex justify-end gap-4">
          <button
            onClick={handleCancel}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
