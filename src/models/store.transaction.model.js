import mongoose from "mongoose";

const storeTransactionSchema = new mongoose.Schema(
  {
    // Reference: Store.id - StoreTransaction.storeId
    storeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true,
      index: true,
    },

    // Reference: StoreOrders.orderId - StoreTransaction.orderId
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StoreOrder",
      required: true,
      unique: true,
      index: true,
    },

    cardNumber: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20,
    },

    cardHolderName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    cardExpiryDate: {
      type: String,
      trim: true,
      maxlength: 10,
      default: null,
    },

    cvcNumber: {
      type: String,
      trim: true,
      maxlength: 4,
      default: null,
    },

    amount: {
      type: mongoose.Schema.Types.Decimal128,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      enum: ["successful", "failed"],
      default: "failed",
      required: true,
    },
  },
  { timestamps: true }
);

const StoreTransaction = mongoose.model("StoreTransaction", storeTransactionSchema);

export default StoreTransaction;
