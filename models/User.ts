import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  image: String,
  emailVerified: Date,
  lastLogin: {
    type: Date,
    default: Date.now,
  }
}, {
  timestamps: true
})

// Update lastLogin on every login
UserSchema.pre('findOneAndUpdate', function() {
  this.set({ lastLogin: new Date() })
})

const User = mongoose.models?.User || mongoose.model("User", UserSchema)

export default User