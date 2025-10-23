import express from "express";
import { validate } from "../../core/middleware/validate.js";
import { storeCategorySchema } from "../../shared/validators/category.validation.js";
import {
  createCategory,
  getAllCategories,
  getStoreCategories,
  getFactoryCategories, 
} from "./category.controller.js";
import { authorizeRoles } from "../../core/middleware/authorizeRoles.js";

const categoryRouter = express.Router();

categoryRouter.post("/createCategory", authorizeRoles("super-admin"), validate(storeCategorySchema), createCategory);
categoryRouter.get("/getallcategories", getAllCategories);
categoryRouter.get("/storecategory", getStoreCategories);
categoryRouter.get("/factorycategory", getFactoryCategories);

export default categoryRouter;