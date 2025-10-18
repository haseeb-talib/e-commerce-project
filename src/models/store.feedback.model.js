import mongoose from "mongoose";

const storeFeedbackSchema = new mongoose.Schema(
  {
    // Reference: Users.id > StoreFeedback.userId
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // Reference: Store.id > StoreFeedback.storeId
    storeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true,
      index: true,
    },

    storeFeedback: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const StoreFeedback = mongoose.model("StoreFeedback", storeFeedbackSchema);

export default StoreFeedback;
