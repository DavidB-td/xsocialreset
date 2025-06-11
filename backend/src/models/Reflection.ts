import mongoose, { Schema, Document } from 'mongoose';

interface IReflection extends Document {
  userId: mongoose.Types.ObjectId;
  content: string;
  emotion: string;
  createdAt: Date;
}

const reflectionSchema = new Schema<IReflection>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  emotion: { type: String, enum: ['feliz', 'triste', 'ansioso', 'calmo', 'outro'], required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IReflection>('Reflection', reflectionSchema);