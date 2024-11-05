import mongoose, { Model } from 'mongoose';

interface IUser {
  name?: string;
  email: string;
  image?: string;
  emailVerified?: Date;
  accounts?: mongoose.Types.ObjectId[];
  transactions?: mongoose.Types.ObjectId[];
}

const UserSchema = new mongoose.Schema<IUser>({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  image: String,
  emailVerified: Date,
  accounts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account'
  }]
}, {
  timestamps: true
});

const User = (mongoose.models?.User || mongoose.model<IUser>('User', UserSchema)) as Model<IUser>;
export default User;