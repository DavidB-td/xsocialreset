import express from 'express';
import connectDB from './config/db';
import cors from 'cors';
import dotenv from 'dotenv';

// Rotas existentes e novas
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import interestRoutes from './routes/interestRoutes';
import dailyTaskRoutes from './routes/dailyTaskRoutes';
import usageRoutes from './routes/usageRoutes'; // <-- 1. IMPORTE AQUI

dotenv.config();
const app = express();

// Conectar à Base de Dados
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/interests', interestRoutes);
app.use('/api/dailytasks', dailyTaskRoutes);
app.use('/api/usage', usageRoutes); // <-- 2. ADICIONE ESTA LINHA

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor a correr na porta ${PORT}`));
