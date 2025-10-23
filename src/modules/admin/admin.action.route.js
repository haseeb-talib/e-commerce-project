// src/modules/admin/admin.route.js
import express from "express";
import { isLoggedIn } from "../../core/middleware/isLoggedIn.js";
import {
  verifyStore,
  rejectStore,
  suspendStore,
  blockStore,
  verifyProduct,
  rejectProduct,
} from "./adminAction.controller.js";
import { authorizeRoles } from "../../core/middleware/authorizeRoles.js";

const adminActionRouter = express.Router();

adminActionRouter.use(isLoggedIn, authorizeRoles("super-admin")); // all routes protected

// Store actions
adminActionRouter.post("/store/:id/verify",isLoggedIn,authorizeRoles("super-admin"),verifyStore);
adminActionRouter.post("/store/:id/reject",isLoggedIn,authorizeRoles("super-admin"), rejectStore);
adminActionRouter.post("/store/:id/suspend",isLoggedIn,authorizeRoles("super-admin"), suspendStore);
adminActionRouter.post("/store/:id/block",isLoggedIn,authorizeRoles("super-admin")  , blockStore);

// Product actions
adminActionRouter.post("/product/:id/verify", isLoggedIn,authorizeRoles("super-admin"), verifyProduct);
adminActionRouter.post("/product/:id/reject", isLoggedIn,authorizeRoles("super-admin"), rejectProduct);

export default adminActionRouter;