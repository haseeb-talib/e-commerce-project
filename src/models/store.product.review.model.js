import mongoose from "mongoose";

const storeProductReviewSchema = new mongoose.Schema(
  {
    // Reference: StoreProduct.id > StoreProductReview.productId
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StoreProduct",
      required: true,
      index: true,
    },

    // Reference: Users.id > StoreProductReview.userId
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // Reference: Store.id > StoreProductReview.storeId
    storeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true,
      index: true,
    },

    storeProductRating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
  },
  { timestamps: true }
);

const StoreProductReview = mongoose.model("StoreProductReview", storeProductReviewSchema);

export default StoreProductReview;
