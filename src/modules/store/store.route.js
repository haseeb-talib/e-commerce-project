import express from "express";
import { isLoggedIn } from "../../core/middleware/isLoggedIn.js";
import { authorizeRoles } from "../../core/middleware/authorizeRoles.js";
import {
  createStore,
  getStoreDetails,
  updateStore,
  deleteStore,
  getAllStores,
} from "./store.controller.js";
import { validate } from "../../core/middleware/validate.js";
import {
  createStoreSchema,
  updateStoreSchema,
} from "../../shared/validators/store.validation.js";

const storeRouter = express.Router();

/**
 * ✅ Updated:
 * All admin roles (super-admin, store-admin, admin-buyer, etc.)
 * can access these routes.
 */

storeRouter.post(
  "/createStore",
  validate(createStoreSchema),
  isLoggedIn,
  createStore
);

storeRouter.get(
  "/getStore",
  isLoggedIn,
  authorizeRoles("super-admin", "store-admin", "admin-buyer", "admin-factory", "admin-analyst"),
  getStoreDetails
);

storeRouter.put(
  "/updateStore",
  isLoggedIn,
  authorizeRoles("super-admin", "store-admin", "admin-buyer", "admin-factory", "admin-analyst"),
  validate(updateStoreSchema),
  updateStore
);

storeRouter.delete(
  "/deleteStore",
  isLoggedIn,
  authorizeRoles("super-admin", "store-admin", "admin-buyer", "admin-factory", "admin-analyst"),
  deleteStore
);

storeRouter.get(
  "/getAllStores",
  isLoggedIn,
  authorizeRoles("super-admin", "store-admin", "admin-buyer", "admin-factory", "admin-analyst"),
  getAllStores
);

export default storeRouter;
