import { ApiError } from "../utils/api-error.js";

const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      throw new ApiError(401, "Unauthorized: please log in first");
    }

    const userRole = req.user.userRole;
    const adminRole = req.user.adminRole;
    const currentRole = userRole || adminRole;

    if (!currentRole) {
      throw new ApiError(403, "Access denied - No role assigned");
    }

    // ✅ Auto allow any admin role if no specific roles are defined
    if (allowedRoles.length === 0 && currentRole.includes("admin")) {
      return next();
    }

    if (!allowedRoles.includes(currentRole)) {
      throw new ApiError(
        403,
        `Access denied - Only [${allowedRoles.join(", ")}] can access this route`
      );
    }

    next();
  };
};

export { authorizeRoles };
