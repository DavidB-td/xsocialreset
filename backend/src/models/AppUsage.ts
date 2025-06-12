import mongoose, { Schema, Document } from 'mongoose';

// Define a estrutura para os dados de uso de um aplicativo.
interface IAppUsage extends Document {
  userId: mongoose.Types.ObjectId;
  appName: string;
  hours: number;
}

const appUsageSchema = new Schema<IAppUsage>({
  // Liga este dado de uso ao utilizador específico.
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  // O nome do aplicativo, ex: "Instagram".
  appName: { type: String, required: true },
  // O número de horas gastas.
  hours: { type: Number, required: true },
});

// Cria a coleção "appusages" na sua base de dados.
export default mongoose.model<IAppUsage>('AppUsage', appUsageSchema);
