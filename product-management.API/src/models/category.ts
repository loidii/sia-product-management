import mongoose, { Schema } from "mongoose";

// Define the schema for the Category model
// Schema specifies the structure and validation rules for Category documents in MongoDB
export const categorySchema = new Schema(
  {
    // Category ID field - unique identifier for the category
    categoryId: { type: String, required: true, unique: true },
    // Category name field - required and max 100 characters
    categoryName: { type: String, length: 100, required: true },
    // Description field - optional and max 500 characters
    description: { type: String, length: 500 },
  },
);

// Create and export the Category model
export const Category = mongoose.model("Categories", categorySchema);
