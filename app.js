// import express from "express";
// import dotenv from "dotenv"
// import cookieParser from "cookie-parser";
// import cors from "cors"
// import { errorHandler } from "./src/core/middleware/errorHandler.js";
// import authRouter from "./src/modules/auth/auth.route.js";
// import userRouter from "./src/modules/user/user.route.js";
// import adminRouter from "./src/modules/admin/admin.route.js";
// import storeRouter from "./src/modules/store/store.route.js";   
// import adminActionRouter from "./src/modules/admin/adminAction.route.js";
// import categoryRouter from "./src/modules/category/category.route.js";
// import storeProductRouter from "./src/modules/store/storeProduct.route.js";
// import storeProductCategoryRouter from "./src/modules/store/storeProductCategory.route.js";
// const app = express()

// dotenv.config()

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// app.use("/api/v1/auth", authRouter)

// app.use("/api/v1/users", userRouter)
// app.use("/api/v1/admin", adminRouter)

// app.use("/api/v1/store", storeRouter);
// app.use("/api/v1/admin/actions", adminActionRouter);
// app.use("/api/v1/category", categoryRouter);
// app.use("/api/v1/store/products", storeProductRouter);
// app.use("/api/v1/store-product-category", storeProductCategoryRouter);

// app.get('/health', (req, res) => {
//     res.status(200).json({
//         success: true,
//         message: '🚀 Server is running smoothly - Module Structure',
//         timestamp: new Date().toISOString()
//     });
// });


// app.use(errorHandler)

// export default app



import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

// Middlewares
import { errorHandler } from "./src/core/middleware/errorHandler.js";

// Routers
import authRouter from "./src/modules/auth/auth.route.js";
import userRouter from "./src/modules/user/user.route.js";
import adminRouter from "./src/modules/admin/admin.route.js";
import adminActionRouter from "./src/modules/admin/adminAction.route.js";
import categoryRouter from "./src/modules/category/category.route.js";

// Store Routers
import storeRouter from "./src/modules/store/store.route.js";
import storeProductRouter from "./src/modules/store/storeProduct.route.js";
import storeProductCategoryRouter from "./src/modules/store/storeProductCategory.route.js";
import storeProductReviewRouter from "./src/modules/store/storeProductReview.route.js";
import storeFeedbackRouter from "./src/modules/store/storeFeedback.route.js";
import storeProductFeedbackRouter from "./src/modules/store/storeProductFeedback.route.js";
import storeTransactionRouter from "./src/modules/store/storeTransaction.route.js";
import storeOrderRouter from "./src/modules/store/storeOrder.route.js";

const app = express();
dotenv.config();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/admin/actions", adminActionRouter);
app.use("/api/v1/category", categoryRouter);

// Store Routes
app.use("/api/v1/store", storeRouter);
app.use("/api/v1/store/products", storeProductRouter);
app.use("/api/v1/store-product-category", storeProductCategoryRouter);
app.use("/api/v1/store-product-reviews", storeProductReviewRouter);
app.use("/api/v1/store-feedbacks", storeFeedbackRouter);
app.use("/api/v1/store-product-feedbacks", storeProductFeedbackRouter);
app.use("/api/v1/store-transactions", storeTransactionRouter);
app.use("/api/v1/store-orders", storeOrderRouter);

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 Server is running smoothly - Module Structure",
    timestamp: new Date().toISOString(),
  });
});

// Error Handler
app.use(errorHandler);

export default app;