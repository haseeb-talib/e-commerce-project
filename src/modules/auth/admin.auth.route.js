import Router from "express"
import {validate} from "../../core/middleware/validate.js"
import {loginSchema , registerSchema , resetPasswordSchema} from "../../shared/validators/auth.validator.js"
import { registerAdmin, logInAdmin, logoutAdmin, verifyAdminMail, getAccessToken, forgotPasswordMail, resetPassword } from "./admin.controller.js"
import {isLoggedIn} from "../../core/middleware/isLoggedIn.js"

const authRouter = Router()

authRouter.post("/register-admin", validate(registerSchema), registerAdmin)
authRouter.post("/login-admin", validate(loginSchema), logInAdmin)
authRouter.post("/logout-admin", isLoggedIn, logoutAdmin)
authRouter.get("/verify/:admin", verifyAdminMail)
authRouter.get("/get-access-token", getAccessToken)
authRouter.get("/forgot-password-mail", forgotPasswordMail)
authRouter.post("/reset-password/:token", validate(resetPasswordSchema), resetPassword)