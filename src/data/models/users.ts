import mongoose, { Schema } from "mongoose";

// Declare the Schema of the Mongo model
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
    email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ['admin', 'user', 'guest'],
    default: 'user',    
  }
});

//Export the model
export default mongoose.models.User || mongoose.model("User", userSchema);
