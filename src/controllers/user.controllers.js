import { ApiResponse } from "../../utils/api-response";
import { asyncHandler } from "../../utils/async-handler";
import User from "../models/user.model.js"

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new ApiError(400, "User with this email already exists");
    }

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    if (!user) {
        throw new ApiError(500, "User registration failed");
    }

    // Remove password before sending response
    const userData = {
        _id: user._id,
        name: user.name,
        email: user.email,
    };

    const response = new ApiResponse(201, userData, "User registered successfully");
    return res.status(response.statusCode).json(response);
})

export { registerUser }