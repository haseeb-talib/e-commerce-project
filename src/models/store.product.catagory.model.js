import mongoose from "mongoose";

const storeProductCategorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    // Reference: Store.id > StoreProductCategory.storeId
    storeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true,
      index: true,
    },

    categoryLogo: {
      type: String,
      default: null,
      trim: true,
    },
  },
  { timestamps: true }
);

// Export the model
const StoreProductCategory = mongoose.model(
  "StoreProductCategory",
  storeProductCategorySchema
);

export default StoreProductCategory;
