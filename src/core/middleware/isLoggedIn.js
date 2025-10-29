import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";
import jwt from "jsonwebtoken";

export const isLoggedIn = asyncHandler(async (req, res, next) => {
  const accessToken = req.cookies?.accessToken || req.headers["authorization"]?.split(" ")[1];

  if (!accessToken) {
    throw new ApiError(401, "Unauthorized - No access token provided");
  }

  try {
    const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    req.user = decodedToken;
    next();
  } catch (err) {
    throw new ApiError(401, "Invalid or expired token");
  }
});
