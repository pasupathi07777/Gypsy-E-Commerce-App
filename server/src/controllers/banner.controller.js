import Banner from "../models/banner.model.js";
import cloudinary from "../utils/cloudinary.js";

// Create Banner
export const createBanner = async (req, res) => {
  try {
    const { productId, description, image } = req.body;

    if (!image) {
      return res
        .status(400)
        .json({ success: false, message: "Image is required" });
    }

    const uploadedImage = await cloudinary.uploader.upload(image, {
      folder: "banners",
    });

    const newBanner = new Banner({
      productId,
      description,
      image: uploadedImage.secure_url,
    });

    await newBanner.save();

    res.status(201).json({
      success: true,
      message: "Banner created successfully",
      banner: newBanner,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

// Get all Banners
export const getBanners = async (req, res) => {
  try {
    const banners = await Banner.find();
    res.status(200).json({ banners });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};


// Update Banner
export const updateBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const { productId, description, image } = req.body;

    let updatedData = { productId, description };

    if (image) {
      const uploadedImage = await cloudinary.uploader.upload(image, {
        folder: "banners",
      });
      updatedData.image = uploadedImage.secure_url;
    }

    const updatedBanner = await Banner.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    console.log(updatedBanner);

    if (!updatedBanner) {
      return res.status(404).json({ message: "Banner not found" });
    }
    
    res
      .status(200)
      .json({ message: "Banner updated successfully", banner: updatedBanner });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Delete Banner
export const deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;

    const banner = await Banner.findById(id);
    if (!banner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    const imagePublicId = banner.image.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(`banners/${imagePublicId}`);

    await banner.deleteOne();
    res.status(200).json({ message: "Banner deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
