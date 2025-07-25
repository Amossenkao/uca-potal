import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  id: string;
  role: string;
  subRole?: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  username: string;
  password: string;
  nickName?: string;
  dateOfBirth: string;
  phone: string;
  email?: string;
  address: string;
  bio?: string;
  photo?: string;
  guardian?: {
    firstName: string;
    middleName: string;
    lastName: string;
    email?: string;
    phone: string;
    address: string;
    photo?: string;
  };
}

const GuardianSchema = new Schema({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
  email: { type: String },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  photo: { type: String }
}, { _id: false });

const UserSchema: Schema<IUser> = new Schema({
  id: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  subRole: { type: String },
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nickName: { type: String },
  dateOfBirth: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  address: { type: String, required: true },
  bio: { type: String },
  photo: { type: String },
  guardian: { type: GuardianSchema },
});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
