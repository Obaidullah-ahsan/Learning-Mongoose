import { Model, model, Schema } from "mongoose";
import {
  IAddress,
  IUser,
  userInstancreMethod,
  userStaticMethod,
} from "../interfaces/user.interfaces";
import bcrypt from "bcryptjs";
import { Note } from "./notes.model";

const addressSchema = new Schema<IAddress>(
  {
    city: { type: String },
    street: { type: String },
    zip: { type: Number },
  },
  { _id: false }
);

const userSchema = new Schema<IUser, userStaticMethod, userInstancreMethod>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "Must be at least 3, got {VALUE}"],
      maxlength: 15,
    },
    email: {
      type: String,
      required: true,
      loadClass: true,
      unique: [true, "Email must be unique"],
      validate: {
        validator: function (value) {
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
        },
        message: (props) => `${props.value} is not valid email`,
      },
    },
    phone: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return /^(?:\+88|88)?01[3-9]\d{8}$/.test(value);
        },
        message: (props) => `${props.value} is not a valid phone number`,
      },
    },
    age: {
      type: Number,
      required: true,
      min: 18,
      max: 60,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: {
        values: ["user", "admin"],
        message: "Role is not valid. got {VALUE} role",
      },
    },
    address: { type: addressSchema },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.method("hashPassword", async function (plainPassword: string) {
  const hashPassword = await bcrypt.hash(plainPassword, 10);
  return hashPassword;
});
userSchema.static("hashPassword", async function (plainPassword: string) {
  const hashPassword = await bcrypt.hash(plainPassword, 10);
  return hashPassword;
});

// Middleware

// Pre Hooks
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.pre("find", function (next) {
  console.log("Inside pre find hook");
  next();
});

// Post hooks
userSchema.post("save", function (doc, next) {
  console.log(`${doc.email} has been saved`);
  next();
});

userSchema.post("findOneAndDelete", async function (doc, next) {
  if (doc) {
    await Note.deleteMany({ user: doc._id });
  }
  next();
});

// virtuals
userSchema.virtual("NameWithMail").get(function(){
  return `${this.name}${this.email}`
})

export const User = model<IUser, userStaticMethod>("User", userSchema);
