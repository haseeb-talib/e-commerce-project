import mongoose from "mongoose";

const storeOrderSchema = new mongoose.Schema(
  {
    // 🔗 Ref: Store.id > StoreOrders.storeId
    storeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true,
      index: true,
    },

    // 🔗 Ref: StoreProduct.id > StoreOrders.storeProductId
    storeProductId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StoreProduct",
      required: true,
      index: true,
    },

    // 🔗 Ref: Users.id > StoreOrders.userId
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    quantity: {
      type: Number,
      required: true,
      default: 1,
      min: 1,
    },

    shippingAddress: {
      type: String,
      trim: true,
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },

    orderStatus: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },

    trackingId: {
      type: String,
      trim: true,
      default: null,
    },

    totalAmount: {
      type: mongoose.Types.Decimal128,
      required: true,
      get: (v) => parseFloat(v.toString()),
    },

    // 🔗 Ref: StoreOrders.orderId - StoreTransaction.orderId
    orderId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  { timestamps: true, toJSON: { getters: true } }
);

const StoreOrder = mongoose.model("StoreOrder", storeOrderSchema);

export default StoreOrder;
