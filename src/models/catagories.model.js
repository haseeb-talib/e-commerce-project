import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 32,
    },

    categoryType: {
      type: String,
      enum: ["Store", "Factory"],
      required: true,
    },
  },
  { timestamps: true }
);

// Export the model
const Category = mongoose.model("Category", categorySchema);

export default Category;
