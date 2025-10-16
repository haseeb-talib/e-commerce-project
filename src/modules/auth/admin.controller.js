import { asyncHandler } from "../../core/utils/async-handler.js";
import adminUser from "../../models/admin.model.js";
import { ApiError } from "../../core/utils/api-error.js";
import { ApiResponse } from "../../core/utils/api-response.js";
import { userForgotPasswordMailBody,userVerificationMailBody } from "../../shared/constants/mail.constant.js";
import { mailTransporter } from "../../shared/helpers/mail.helper.js";
import { storeAccessToken, storeLoginCookies } from "../../shared/helpers/cookies.helper.js";

const registerAdmin = asyncHandler(async (req, res) => {
    const { adminName, adminEmail, adminPassword, adminRole, phoneNumber } = req.body
    const existingAdmin = await aminUser.findOne({ adminEmail })
    if (existingAdmin) {
        throw new ApiError(400, "admin already exists")
    }

    const admin = await adminUser.create({
        adminName,
        adminEmail,
        adminPassword,
        adminRole,
        phoneNumber,
    })

    if (!admin) {
        throw new ApiError(400, "admin not Created");
    }

    const { hashedToken, tokenExpiry } = admin.generateTemporaryToken()

    admin.adminVerificationToken = hashedToken
    admin.adminVerificationTokenExpiry = tokenExpiry
    await admin.save()

    const adminVerificationEmailLink = `${process.env.BASE_URL}/api/v1/auth/verify/${hashedToken}`

    await mailTransporter.sendMail({
        from: process.env.MAILTRAP_SENDEREMAIL,
        to: adminEmail,
        subject: "Verify your email",
        html: adminVerificationMailBody(adminName, adminVerificationEmailLink),
    })

    const response = {
        adminName: admin.adminName,
        adminEmail: admin.adminEmail,
        adminRole: admin.adminRole,
        phoneNumber: admin.phoneNumber
    }

    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                response,
                "admin created successfully"
            )
        );


})

const logInAdmin = asyncHandler(async (req, res) => {

    const { adminEmail, adminPassword } = req.body
    const admin = await userAdmin.findOne({ adminEmail })
    if (!admin) {
        throw new ApiError(400, "admin not found");
    }

    const isPasswordCorrect = await admin.isPasswordCorrect(adminPassword)
    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid password");
    }

    if (!admin.adminIsVerified) {
        throw new ApiError(400, "admin not verified");
    }

    const accessToken = await admin.generateAccessToken();
    const refreshToken = await admin.generateRefreshToken();

    storeLoginCookies(res, accessToken, refreshToken)

    admin.adminRefreshToken = refreshToken
    await admin.save()

    const response = {
        admin: {
            adminName: admin.adminName,
            adminEmail: admin.adminEmail,
            adminRole: admin.adminRole,
            phoneNumber: admin.phoneNumber
        },
        tokens: {
            accessToken,
            refreshToken
        }
    }

    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                response,
                "admin logged in successfully"
            )
        );


})

const logoutAdmin = asyncHandler(async (req, res) => {
    const adminId = req.admin?._id; // assuming `req.admin` is set by auth middleware

    if (!adminId) {
        throw new ApiError(401, "admin not authenticated");
    }

    // Clear refresh token from database
    const admin = await adminUser.findById(adminId);
    if (!admin) {
        throw new ApiError(404, "admin not found");
    }

    admin.adminRefreshToken = null;
    await admin.save();

    // Clear cookies (for web clients)
    res.clearCookie("accessToken", {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });

    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "admin logged out successfully"));
});

const verifyAdminMail = asyncHandler(async (req, res) => {
    const { token } = req.params
    if (!token) {
        throw new ApiError(400, "Token not found")
    }

    const admin = await User.findOne({
        adminVerificationToken: token,
        adminVerificationTokenExpiry: { $gt: Date.now() }
    })
    if (!admin) {
        throw new ApiError(400, "Invalid or expired verification token");
    }

    admin.adminIsVerified = true;
    admin.adminVerificationToken = null;
    admin.adminVerificationTokenExpiry = null;
    await admin.save();

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "admin verified successfully"));
})

const getAccessToken = asyncHandler(async (req, res) => {
    const { refreshToken } = req.cookies
    if (!refreshToken) {
        throw new ApiError(400, "Refresh token not found")
    }

    const admin = await User.findOne({ adminRefreshToken: refreshToken })
    if (!admin) {
        throw new ApiError(400, "Invalid refresh token");
    }

    const accessToken = await admin.generateAccessToken();



    storeAccessToken(res, accessToken)

    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                { accessToken },
                "Access token generated successfully"
            )
        );
})

const forgotPasswordMail = asyncHandler(async (req, res) => {

    const { adminEmail } = req.body
    const admin = await User.findOne({ adminEmail })
    if (!admin) {
        throw new ApiError(400, "admin not found");
    }

    const { hashedToken, tokenExpiry } = admin.generateTemporaryToken()
    admin.adminPasswordResetToken = hashedToken
    admin.adminPasswordExpirationDate = tokenExpiry
    await admin.save()

    const adminPasswordResetLink = `${process.env.BASE_URL}/api/v1/auth/reset-password/${hashedToken}`



    await mailTransporter.sendMail({
        from: process.env.MAILTRAP_SENDEREMAIL,
        to: adminEmail,
        subject: "Forgot password",
        html: adminForgotPasswordMailBody(admin.adminName, adminPasswordResetLink)
    })

    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                { adminPasswordResetLink },
                "Password reset link sent successfully"
            )
        );

})

const resetPassword = asyncHandler(async (req, res) => {
    const { token } = req.params
    const { adminPassword } = req.body
    const admin = await User.findOne({
        adminPasswordResetToken: token,
        adminPasswordExpirationDate: { $gt: Date.now() }
    })
    if (!admin) {
        throw new ApiError(400, "Invalid or expired password reset token");
    }

    admin.adminPassword = adminPassword
    admin.adminPasswordResetToken = null
    admin.adminPasswordExpirationDate = null
    await admin.save()


    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                {},
                "Password reset successfully"
            )
        );
})

export { registerAdmin, logInAdmin, logoutAdmin, verifyAdminMail, getAccessToken, forgotPasswordMail, resetPassword }