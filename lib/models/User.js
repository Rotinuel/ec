import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  
  password: {
    type: String,
    required: true,
    minlength: 8
  },

  role: { type: String, default: "user" },
  
  dateOfBirth: {
    type: String,
    required: true, // DD/MM/YYYY
  },
  
  gender: { type: String, enum: ["male", "female", "other"], required: true },

  address: {
    type: String,
    required: true,
  },

  location: {
    latitude: Number,
    longitude: Number,
  },
  
  workStatus: {
    type: String,
    enum: ["employed", "self-employed", "unemployed", "retired", "others"],
    required: true
  },
  
  workStatusOther: String,
  
  loanType: { type: String, required: true },
  
  loanAmount: { type: Number, required: true },

  loanBalance: { type: Number, default: 0 },

  repaymentMonths: { type: Number, required: true, min: 1 },
  
  approved: { type: Boolean, default: false }

}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);


// UserSchema.virtual("age").get(function () {
//   const [day, month, year] = this.dateOfBirth.split("/");
//   const dob = new Date(year, month - 1, day);
//   const diff = Date.now() - dob.getTime();
//   return new Date(diff).getUTCFullYear() - 1970;
// });