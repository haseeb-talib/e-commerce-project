import mongoose from "mongoose";
import { boolean } from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
    profileImage:{
        type:String,
        default: 'https://placehold.co/600x400?text=User+Image',
    },
    adminName:{
        type:String,
        required:true,
        trim:true
    },
    adminEmail:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        index:true
    },
    adminPassword:{
        type:String,
        required:true
    },
      adminIsVerified:{
    type:Boolean,
    default:false
   },
    adminVerificationToken:{
        type:String,
        default:null
      },
    adminAddress:{
        type:String,
        default:null,
        trim:true
    },
    adminPasswordExpirationDate:{
        type:Date,
        default:null
    },
    adminVerificationTokenExpiry:{
        type:Date,
        default:null
    },
    adminRefreshToken:{
        type:String,
        default:null
    },
    adminRole:{
        type:String,
        enum:["super-admin","admin-analyst","admin-factory", "admin-store", "admin-buyer"],
        default:"super-admin"
    },
    phoneNumber:{
        type:String,
        default:null
    },
    isActive:{
        type:Boolean,
        default:true
    },
},
{
timestamps:true,
}
)

userSchema.pre("save" , function (next){
    if(this.isModified("adminPassword")){
        this.adminPassword= bcrypt.hashSync(this.adminPassword, 10)
    }
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password,this.adminPassword)
}

userSchema.methods.generateAccessToken= function(){
    return jwt.sign(
        {
            _id:this._id,
            adminEmail:this.adminEmail,
            adminName:this.adminName,
            adminRole:this.adminRole
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        },
    )
}
userSchema.methods.generateRefreshToken=function(){
    return jwt.sign(
{
        _id: this._id
},
process.env.REFRESH_TOKEN_SECRET,
{expiresIn:process.env.REFRESH_TOKEN_EXPIRY},
    )
}

userSchema.methods.generateTemporaryToken = function (){
    const unHashedToken = crypto.randomBytes(20).toString("hex");

    const hashedToken= crypto
    .createHash("sha256")
    .update(unHashedToken)
    .digest("hex")

    const tokenExpiry = Date.now() + 5 * 60 * 1000;

    return {unHashedToken , hashedToken , tokenExpiry}
}

const adminUser = mongoose.model("User",userSchema)

export default adminUser