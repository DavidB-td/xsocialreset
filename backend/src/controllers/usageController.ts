import { Response } from 'express';
import AppUsage from '../models/AppUsage';
import { AuthRequest } from '../middleware/authMiddleware';

// Buscar os dados de uso semanais do utilizador logado.
export const getWeeklyUsage = async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.user?.id;

  if (!userId) {
    res.status(401).json({ message: 'Utilizador não autenticado' });
    return;
  }

  try {
    // Encontra todos os documentos de uso que pertencem a este utilizador.
    const usageData = await AppUsage.find({ userId });
    res.json(usageData);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter dados de uso', error });
  }
};
