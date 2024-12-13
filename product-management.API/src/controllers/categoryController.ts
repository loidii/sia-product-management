import { Request, Response } from "express";
import { Category } from "../models/category"; // Assuming you have a Category model
import { ICategory } from "../interfaces/categoryInterfaces"; // Assuming you have a Category interface
import mongoose from "mongoose";

export class CategoryController {
  // Create a new category
  public async createCategory(req: Request, res: Response): Promise<void> {
    try {
      // Prepare category data with a new MongoDB ID
      const categoryData: ICategory = {
        _id: new mongoose.Types.ObjectId(),
        ...req.body,
      };

      // Create and save the new category to the database
      const category = new Category(categoryData);
      const savedCategory = await category.save();

      // Return the newly created category with 201 Created status
      res.status(201).json(savedCategory);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // Get all categories
  public async getAllCategories(req: Request, res: Response): Promise<void> {
    try {
      // Fetch all categories from the database
      const categories: ICategory[] = await Category.find();
      res.json(categories);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get category by ID
  public async getCategoryById(req: Request, res: Response): Promise<void> {
    try {
      // Attempt to find category by ID
      const category: ICategory | null = await Category.findById(req.params.id);

      // Return 404 if category doesn't exist
      if (!category) {
        res.status(404).json({ message: "Category not found" });
        return;
      }

      // Return the found category
      res.json(category);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Update category
  public async updateCategory(req: Request, res: Response): Promise<void> {
    try {
      // Prepare update data
      const categoryData: Partial<ICategory> = { ...req.body };

      // Update the category and get the updated document
      const category: ICategory | null = await Category.findByIdAndUpdate(
        req.params.id,
        categoryData,
        { new: true } // This option returns the modified document rather than the original
      );

      // Return 404 if category doesn't exist
      if (!category) {
        res.status(404).json({ message: "Category not found" });
        return;
      }

      // Return the updated category
      res.json(category);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // Delete category
  public async deleteCategory(req: Request, res: Response): Promise<void> {
    try {
      // Attempt to find and delete the category in one operation
      const category: ICategory | null = await Category.findByIdAndDelete(req.params.id);

      // Return 404 if category doesn't exist
      if (!category) {
        res.status(404).json({ message: "Category not found" });
        return;
      }

      // Confirm successful deletion
      res.json({ message: "Category deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
