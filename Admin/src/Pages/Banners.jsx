// import React, { useState } from "react";
// import { AiOutlinePlus } from "react-icons/ai";
// import BannerPopup from "../Components/BannerPopup";

// const Banners = () => {
//     const [showPopup, setShowPopup] = useState(false);
//     const [productId, setProductId] = useState("");
//     const [description, setDescription] = useState("");
//     const [bannerImg, setBannerImg] = useState(null);
//     const [banners, setBanners] = useState([]);

//     const openPopup = () => setShowPopup(true);

//     const closePopup = () => {
//         setShowPopup(false);
//         setProductId("");
//         setDescription("");
//         setBannerImg(null);
//     };

//     const handleFileChange = (e) => {
//         if (e.target.files && e.target.files[0]) {
//             setBannerImg(e.target.files[0]);
//         }
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const imgUrl = bannerImg ? URL.createObjectURL(bannerImg) : "";
//         setBanners([...banners, { productId, description, imgUrl }]);
//         closePopup();
//     };

//     return (
//         <div className="relative p-5  min-h-screen text-white">
//             <h2 className="text-3xl font-semibold text-black mb-10">Banners</h2>

//             <button
//                 onClick={openPopup}
//                 className="absolute top-5 right-5 bg-blue-600 hover:bg-blue-700 transition text-white p-3 rounded-full shadow-lg"
//             >
//                 <AiOutlinePlus size={24} />
//             </button>

//             {showPopup && 

//                 <BannerPopup
//                     closePopup={closePopup}
//                     productId={productId}
//                     setProductId={setProductId}
//                     description={description}
//                     setDescription={setDescription}
//                     handleFileChange={handleFileChange}
//                     handleSubmit={handleSubmit}
//                 />
//             }

//             {/* Display Added Banners */}
//             <div className="mt-10 grid grid-cols-2 gap-4 space-y-4">
//                 {banners.map((banner, index) => (
//                     <div key={index} className="bg-gray-700 rounded p-4">
//                         {banner.imgUrl && (
//                             <img
//                                 src={banner.imgUrl}
//                                 alt="Banner"
//                                 className="w-full h-48 object-cover rounded mb-4"
//                             />
//                         )}
//                         <p>
//                             <strong>ID:</strong> {banner.productId}
//                         </p>
//                         <p>
//                             <strong>Description:</strong> {banner.description}
//                         </p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Banners;


import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import BannerPopup from "../Components/BannerPopup";
import imageCompression from "browser-image-compression";

const Banners = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [productId, setProductId] = useState("");
  const [description, setDescription] = useState("");
  const [bannerImg, setBannerImg] = useState(null);
  const [banners, setBanners] = useState([]);

  const openPopup = () => setShowPopup(true);

  const closePopup = () => {
    setShowPopup(false);
    setProductId("");
    setDescription("");
    setBannerImg(null);
  };

  // Updated file change handler with compression
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        let finalFile = file;
        // Compress if the file is larger than 10 MB
        if (file.size > 10485760) {
          const options = {
            maxSizeMB: 2,
            maxWidthOrHeight: 300,
            useWebWorker: true,
          };
          finalFile = await imageCompression(file, options);
        }
        // Create a data URL for preview
        const reader = new FileReader();
        reader.onloadend = () => {
          setBannerImg(reader.result);
        };
        reader.readAsDataURL(finalFile);
      } catch (error) {
        alert("Image compression failed.");
        console.error("Error during compression:", error);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // bannerImg here is already a data URL
    setBanners([...banners, { productId, description, imgUrl: bannerImg }]);
    closePopup();
  };

  return (
    <div className="relative p-5 min-h-screen text-white bg-gray-100">
      <h2 className="text-3xl font-semibold text-black mb-10">Banners</h2>

      <button
        onClick={openPopup}
        className="absolute top-5 right-5 bg-blue-600 hover:bg-blue-700 transition text-white p-3 rounded-full shadow-lg"
      >
        <AiOutlinePlus size={24} />
      </button>

      {showPopup && (
        <BannerPopup
          closePopup={closePopup}
          productId={productId}
          setProductId={setProductId}
          description={description}
          setDescription={setDescription}
          handleFileChange={handleImageUpload}
          handleSubmit={handleSubmit}
        />
      )}

      {/* Display Added Banners */}
      <div className="mt-10 grid grid-cols-2 gap-4 space-y-4">
        {banners.map((banner, index) => (
          <div key={index} className="bg-gray-700 rounded p-4">
            {banner.imgUrl && (
              <img
                src={banner.imgUrl}
                alt="Banner"
                className="w-full h-48 object-cover rounded mb-4"
              />
            )}
            <p>
              <strong>ID:</strong> {banner.productId}
            </p>
            <p>
              <strong>Description:</strong> {banner.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banners;
