import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  detoxStartDate?: Date; // <-- CAMPO ADICIONADO AQUI
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  detoxStartDate: { type: Date, required: false }, // <-- CAMPO ADICIONADO AQUI
});

export default mongoose.model<IUser>('User', userSchema);
