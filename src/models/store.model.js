import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const storeSchema = new mongoose.Schema(
  {
     
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // References the User model
      required: true,
      index: true, // improves query performance when filtering by user
    },
    storeName: {
      type: String,
      required: true,
      trim: true,
    },
    storeLogo: {
      type: String,
      default: "https://placehold.co/600x400?text=Store+Logo",
    },
    storeCoverImage: {
      type: String,
      default: "https://placehold.co/1200x400?text=Store+Cover+Image",
    },
    storeDescription: {
      type: String,
      default: null,
      trim: true,
    },
    storeCategoryId: {
      type: String,
      default: null,
      trim: true,
    },
    storeProductId: {
      type: String,
      default: null,
      trim: true,
    },
    idCardNumber: {
      type: String,
      min: 1,
      max: 13,
      trim: true,
      default: null,
    },
    idCardImage: {
      type: String,
      default: "https://placehold.co/600x400?text=ID+Card",
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    isSuspended: {
      type: Boolean,
      default: false,
    },
    storeStatus: {
      type: String,
      enum: ["pending", "live", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Store = mongoose.model("Store", storeSchema);

export default Store;
