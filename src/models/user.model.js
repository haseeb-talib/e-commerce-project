import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

dotenv.config()
const userSchema = new mongoose.Schema({
   profileImage:{
    type:String,
    default: 'https://placehold.co/600x400?text=User+Image',
   },
   userName:{
    type:String,
    required:true,
    trim:true
   },
   userEmail:{
    type:String,
    required:true,
    unique:true,
         trim: true,
            lowercase: true,
            index: true,
   },
   userAddress:{
    type:String,
    trim:true,
     default: null,
   },
   userIsVerified:{
    type:Boolean,
    default:false
   },
   userPasswordResetToken:{
    type:String,
    default:null
   },
   userVerificationTokenExpiry:{
   type:Date,
   default:null
    },
   userPassword:{
    type:String,
    required:true,
    minlength:6
   },
     userPasswordExpirationDate:{
        type:Date,
        default:null
    },
      userVerificationToken:{
        type:String,
        default:null
      },
      userRefreshToken:{
        type:String,
        default:null
      },
      userRole:{
          type: String,
        enum:["buyer","store-admin","factory-admin","admin"],
        default:"buyer"
      },
      phoneNumber:{
        type:String,
             default: null,
      },
      isActive:{
        type:Boolean,
        default:true
      }
      },
{timestamps:true}
)

userSchema.pre("save", async function (next) {
    if (!this.isModified("userPassword")) return next();
    this.password = await bcrypt.hash(this.userPassword, 10);
    next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.userPassword);
};


userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            userEmail: this.userEmail,
            userName: this.userName,
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


const User = mongoose.model("User", userSchema)

export default User