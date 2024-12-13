import Joi from "joi"; // Import Joi validation library

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - categoryId
 *         - name
 *       properties:
 *         categoryId:
 *           type: string
 *           description: Unique identifier for the category
 *           example: "cat12345"
 *         name:
 *           type: string
 *           maxLength: 100
 *           description: Category's name
 *           example: "Electronics"
 *         description:
 *           type: string
 *           maxLength: 500
 *           description: A brief description of the category
 *           example: "Products related to electronic devices."
 *     ValidationError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Error message
 *         details:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *               path:
 *                 type: array
 *                 items:
 *                   type: string
 */

// Define a validation schema for category data
const categoryValidationSchema = Joi.object({
  // Category ID validation
  // - Required field
  categoryId: Joi.string().required().messages({
    "any.required": "Category ID is required",
  }),

  // Name validation
  // - Maximum 100 characters
  // - Required field
  name: Joi.string().max(100).required().messages({
    "string.max": "Category name cannot exceed 100 characters",
    "any.required": "Category name is required",
  }),

  // Description validation
  // - Maximum 500 characters
  // - Optional field
  description: Joi.string().max(500).optional().messages({
    "string.max": "Description cannot exceed 500 characters",
  }),
});

// Helper function to validate category data
// - Takes category data as input
// - Returns validation result with all errors (abortEarly: false)
export const validateCategory = (categoryData: any) => {
  return categoryValidationSchema.validate(categoryData, { abortEarly: false });
};

export default categoryValidationSchema;
