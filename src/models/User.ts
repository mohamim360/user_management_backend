// src/models/User.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    lastLoginTime: Date;
    status: 'active' | 'blocked';
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    lastLoginTime: { type: Date, default: Date.now },
    status: { type: String, enum: ['active', 'blocked'], default: 'active' }
});

UserSchema.index({ email: 1 }, { unique: true });

export default mongoose.model<IUser>('User', UserSchema);