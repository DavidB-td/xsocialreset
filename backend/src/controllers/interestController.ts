import { Response } from 'express';
import Interest from '../models/Interest'; // Usa o novo modelo
import { AuthRequest } from '../middleware/authMiddleware';

// Criar um novo interesse
export const createInterest = async (req: AuthRequest, res: Response): Promise<void> => {
  const { title, description, category, duration } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    res.status(401).json({ message: 'Usuário não autenticado' });
    return;
  }
  try {
    const interest = new Interest({ userId, title, description, category, duration });
    await interest.save();
    res.status(201).json({ message: 'Interesse criado com sucesso', interest });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar interesse', error });
  }
};

// Listar interesses do usuário
export const getInterests = async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.user?.id;
  if (!userId) {
    res.status(401).json({ message: 'Usuário não autenticado' });
    return;
  }
  try {
    const interests = await Interest.find({ userId }).sort({ createdAt: -1 });
    res.json(interests);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar interesses', error });
  }
};

// Deletar um interesse
export const deleteInterest = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  const userId = req.user?.id;
  if (!userId) {
    res.status(401).json({ message: 'Usuário não autenticado' });
    return;
  }
  try {
    const result = await Interest.findOneAndDelete({ _id: id, userId });
    if (!result) {
      res.status(404).json({ message: 'Interesse não encontrado ou não pertence ao usuário.' });
      return;
    }
    res.json({ message: 'Interesse deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar interesse', error });
  }
};
