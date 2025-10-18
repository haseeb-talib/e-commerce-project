import mongoose from "mongoose";

const storeProductSchema = new mongoose.Schema(
  {
    // Reference: Store.id > StoreProduct.storeId
    storeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true,
      index: true,
    },

    productName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    productDescription: {
      type: String,
      default: null,
      trim: true,
    },

    // Reference: StoreProductCategory.id > StoreProduct.productCategoryId
    productCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StoreProductCategory",
      required: false,
      index: true,
    },

    price: {
      type: mongoose.Schema.Types.Decimal128,
      required: true,
      min: 0,
    },

    stock: {
      type: Number,
      default: 0,
      min: 0,
    },

    productImage: {
      type: String,
      default: null,
      trim: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    // Reference: StoreProduct.id > StoreProductReview.productId
    productReviewId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StoreProductReview",
      default: null,
    },

    // Reference: StoreProduct.id > StoreProductFeedback.storeProductId
    productFeedBackId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StoreProductFeedback",
      default: null,
    },

    productStatus: {
      type: String,
      enum: ["live", "pending"],
      default: "pending",
    },
  },
  { timestamps: true }
);

// Export the model
const StoreProduct = mongoose.model("StoreProduct", storeProductSchema);

export default StoreProduct;
