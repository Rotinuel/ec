import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters"],
    validate: {
      validator: (value) =>
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$/.test(value),
      message:
        "Password must contain letters, numbers, and at least one symbol"
    }
  },
  role: { type: String, default: "user" },

  age: Number,
  gender: { type: String, enum: ["male", "female", "other"], required: true },
  workStatus: { type: String, enum: ["employed", "self-employed", "unemployed"] },

  loanAmount: Number,
  loanBalance: Number,
  repaymentDate: Date,

  emailVerified: { type: Boolean, default: false },
  verificationToken: String,
  verificationTokenExpires: Date,

  approved: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);
