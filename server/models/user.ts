import { Model, Types, Schema, model } from 'mongoose';
import { hash, compare } from '../shared/bcrypt';

interface IUser {
  name?: string
  email: string
  password: string
  tokenVersion: number
  roleId?: Types.ObjectId
}

interface IUserMethods {
  comparePassword(password: string): boolean;
  hashTokenVersion(): string;
  compareTokenVersion(hash: string): boolean;
}

type UserModel = Model<IUser, {}, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>({
  name: String,
  email: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  tokenVersion: { type: Number, default: 0},
  roleId: { type: Schema.Types.ObjectId, ref: 'Role' },
});

userSchema.pre('save', function(next) {
  if (!this.isModified('password')) return next();

  this.password = hash(this.password);
  next();
});

userSchema.methods.comparePassword = function(password: string) {
  return compare(password, this.password);
};

userSchema.methods.hashTokenVersion = function() {
  return hash(`${this.tokenVersion}`);
};

userSchema.methods.compareTokenVersion = function(hash: string) {
  return compare(`${this.tokenVersion}`, hash);
};

export const User = model<IUser, UserModel>('User', userSchema);