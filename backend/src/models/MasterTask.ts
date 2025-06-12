import mongoose, { Schema, Document } from 'mongoose';

// Este modelo representa as tarefas mestras que o sistema pode sugerir.
// Não está ligado a um utilizador específico.

interface IMasterTask extends Document {
  title: string;
  description: string;
  category: string;
}

const masterTaskSchema = new Schema<IMasterTask>({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
});

export default mongoose.model<IMasterTask>('MasterTask', masterTaskSchema);
