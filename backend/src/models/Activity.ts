import mongoose, { Schema, Document } from 'mongoose';

interface IActivity extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  category: string;
  duration: number; // em minutos
  completed: boolean;
  createdAt: Date;
}

const activitySchema = new Schema<IActivity>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, enum: ['exercício', 'leitura', 'meditação', 'hobby', 'outro'], required: true },
  duration: { type: Number, required: true },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IActivity>('Activity', activitySchema);