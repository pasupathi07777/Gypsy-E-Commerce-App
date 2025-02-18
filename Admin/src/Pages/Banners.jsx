import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlinePlus, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import BannerPopup from "../Components/BannerPopup";
import {
  fetchBanners,
  addBanner,
  updateBanner,
  deleteBanner,
  bannerStates,
} from "../redux/slices/banner.Slice.js";
import CustomIconButton from "../Components/CustomIconButton.jsx";

const Banners = () => {

  const dispatch = useDispatch();
  const { banners, loading, editBannerIds, deleteBannerIds } =
    useSelector(bannerStates);
  const [showPopup, setShowPopup] = useState(false);
  const [productId, setProductId] = useState("");
  const [description, setDescription] = useState("");
  const [bannerImg, setBannerImg] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [currentBannerId, setCurrentBannerId] = useState(null);


  useEffect(() => {
    dispatch(fetchBanners());
  }, [dispatch]);

  const openPopup = () => setShowPopup(true);

  const closePopup = () => {
    setShowPopup(false);
    setProductId("");
    setDescription("");
    setBannerImg(null);
    setEditMode(false);
    setCurrentBannerId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(bannerImg);
    const bannerData = { productId, description, image: bannerImg };
    if (editMode) {
      dispatch(updateBanner({ id: currentBannerId, updatedData: bannerData }));
    } else {
      dispatch(addBanner(bannerData));
    }
    closePopup();
  };

  const handleEdit = (banner) => {
    setProductId(banner.productId);
    setDescription(banner.description);
    setBannerImg(banner.image);
    setEditMode(true);
    setCurrentBannerId(banner._id);
    setShowPopup(true);
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

  const handleDelete = (id) => {
    dispatch(deleteBanner(id));
  };

  return (
    <div className="relative p-5 min-h-screen text-white bg-[#F4F4F5]">
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
          bannerImg={bannerImg}
          setBannerImg={setBannerImg}
          handleSubmit={handleSubmit}
          editMode={editMode}
          handleFileChange={handleImageUpload}
        />
      )}

      {loading ? (
        <p className="text-black">Loading...</p>
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-4 space-y-4 ">
          {banners.map((banner) => (
            <div key={banner.id} className="  p-4 relative bg-white text-black">
              {banner.image && (
                <img
                  src={banner.image}
                  alt="Banner"
                  className="w-full h-48 object-contain mb-4"
                />
              )}
              <p>
                <strong>ID:</strong> {banner.productId}
              </p>
              <p>
                <strong>Description:</strong> {banner.description}
              </p>
              <div className="flex gap-2 mt-2">
                <CustomIconButton
                  label={<AiOutlineEdit size={20} color="blue" />}
                  onClick={() => handleEdit(banner)}
                  loading={editBannerIds.includes(banner._id)}
                />
                <CustomIconButton
                  label={<AiOutlineDelete size={20} color="red" />}
                  onClick={() => handleDelete(banner._id)}
                  loading={deleteBannerIds.includes(banner._id)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Banners;
