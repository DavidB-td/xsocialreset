import express from 'express';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import reflectionRoutes from './routes/reflectionRoutes';
import activityRoutes from './routes/activityRoutes';
// import userRoutes from './routes/userRoutes';
// import settingRoutes from './routes/settingRoutes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Conectar ao MongoDB
connectDB();

// Middleware para JSON
app.use(express.json());

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/reflections', reflectionRoutes);
app.use('/api/activities', activityRoutes);
// app.use('/api/users', userRoutes);
// oapp.use('/api/settings', settingRoutes);

// Rota de teste
app.get('/', (req, res) => {
  res.json({ message: 'Bem-vindo à API do SocialReset!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});