import mongoose from 'mongoose';
import { IUser } from '../interface/IUser';

const userSchema = new mongoose.Schema<IUser>({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	name: { type: String, required: true },
	email: { type: String },
});

const User = mongoose.model('User', userSchema);
export default User;
