import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-error.js";
import jwt from "jsonwebtoken";

const isLoggedIn = asyncHandler(async (req, res, next) => {
  let accessToken;

  // ✅ Check cookies safely (requires cookie-parser)
  if (req.cookies && req.cookies.accessToken) {
    accessToken = req.cookies.accessToken;
  }

  // ✅ Also allow token from Authorization header (useful for Postman / frontend APIs)
  else if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
    accessToken = req.headers.authorization.split(" ")[1];
  }

  // ❌ No token found
  if (!accessToken) {
    throw new ApiError(401, "Unauthorized: No access token provided");
  }

  try {
    const decodedAccessToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    req.user = decodedAccessToken;
    next();
  } catch (error) {
    throw new ApiError(401, "Invalid or expired access token");
  }
});

export { isLoggedIn };
