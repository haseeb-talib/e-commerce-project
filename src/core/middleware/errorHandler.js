import { ApiError } from "../utils/api-error.js";

export const errorHandler = (err, req, res, next) => {
    console.error("🔥 Error caught by middleware:", err);

    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            errors: Array.isArray(err.errors) ? err.errors : [], // ✅ Ensures it's always an array
            stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
        });
    }

    // Fallback for unhandled/unexpected errors
    return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        errors: err.errors || [], // ✅ include this
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
};
