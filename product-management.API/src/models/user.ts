import mongoose, { Schema } from "mongoose";
import { IUser } from "../interfaces/userInterfaces";

// Define the schema for the User model
// Schema specifies the structure and validation rules for User documents in MongoDB
export const userSchema = new Schema(
  
  {
    email: { type: String, required: true, unique: true },
    // Password address field - required
    password: { type: String, required: true },
  },
  {
    timestamps: true, // Automatically handles createdAt and updatedAt
  }
);

// Create and export the User model
export const User = mongoose.model("Users", userSchema);