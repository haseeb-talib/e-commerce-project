
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        profileImage: {
            type: String,
            default: 'https://placehold.co/600x400?text=User+Image',
        },
        adminName: {
            type: String,
            required: true,
            trim: true,
        },
        adminEmail: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            index: true,
        },
        adminPassword: {
            type: String,
            required: true,
        },
        adminAddress: {
            type: String,
            default: null,
            trim: true,
        },
        adminIsVerified: {
            type: Boolean,
            default: false,
        },
        adminPasswordResetToken: {
            type: String,
            default: null,
        },
        adminPasswordExpirationDate: {
            type: Date,
            default: null,
        },
        adminVerificationToken: {
            type: String,
            default: null,
        },
        refreshToken: {
            type: String,
            default: null,
        },
        adminRole: {
            type: String,
            enum: ["super-admin", "admin-analyst", "admin-factory", "admin-store", "admin-buyer"],
            default: "super-admin",
        },
        phoneNumber: {
            type: String,
            default: null,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true, // adds createdAt and updatedAt automatically
    }
);

userSchema.pre("save", function (next) {
    if (this.isModified("userPassword")) {
        this.userPassword = bcrypt.hashSync(this.userPassword, 10)
    }
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.userPassword);
};


userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            userEmail: this.userEmail,
            userName: this.userName,
            userRole: this.userRole
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY },
    );
};

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY },
    );
};

userSchema.methods.generateTemporaryToken = function () {

    const unHashedToken = crypto.randomBytes(20).toString("hex");

    const hashedToken = crypto
        .createHash("sha256")
        .update(unHashedToken)
        .digest("hex");
    const tokenExpiry = Date.now() + 5 * 60 * 1000; // 20 minutes;

    return { unHashedToken, hashedToken, tokenExpiry };
};


const User = mongoose.model("User", userSchema);

export default User;
