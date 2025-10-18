import mongoose from "mongoose";

const storeProductFeedbackSchema = new mongoose.Schema(
  {
    // Ref: StoreProduct.id > StoreProductFeedback.storeProductId
    storeProductId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StoreProduct",
      required: true,
      index: true,
    },

    // Ref: Users.id > StoreProductFeedback.userId
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // Ref: Store.id > StoreProductFeedback.storeId
    storeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true,
      index: true,
    },

    description: {
      type: String,
      trim: true,
      default: null,
    },

    storeProductImage: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const StoreProductFeedback = mongoose.model(
  "StoreProductFeedback",
  storeProductFeedbackSchema
);

export default StoreProductFeedback;
