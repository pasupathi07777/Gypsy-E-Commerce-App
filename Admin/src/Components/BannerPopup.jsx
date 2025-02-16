import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import CustomBtn from './CustomBtn'
import CustomInput from './CustomInput'
import CustomTextArea from './CustomTextArea'

const BannerPopup = ({

    closePopup,
    productId,
    setProductId,
    description,
    setDescription,
    handleFileChange,
    handleSubmit

}) => {
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="bg-white text-gray-800 p-6 w-full max-w-md relative">


                <button
                    onClick={closePopup}
                    className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
                >
                    <AiOutlineClose size={24} />
                </button>

                <h3 className="text-2xl font-semibold mb-4 text-center">Add Banner</h3>
                <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">


                    <CustomInput
                        type="text"
                        placeholder="Enter Product ID"
                        value={productId}
                        onChange={setProductId}
                        required
                        className="w-full border border-gray-300 p-2 "
                    />

                    <CustomTextArea
                        placeholder="Enter Description"
                        value={description}
                        onChange={setDescription}
                        rows={4}
                        className="w-full border border-gray-300 p-2 " />



                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                        className="w-full"
                    />

                    <CustomBtn label="Submit" type="submit" />


                </form>
            </div>
        </div>
    )
}

export default BannerPopup

