import { Response } from 'express';
import Reflection from '../models/Reflection';
import { AuthRequest } from '../middleware/authMiddleware';

// Criar uma nova reflexão
export const createReflection = async (req: AuthRequest, res: Response): Promise<void> => {
  const { content, emotion } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    res.status(401).json({ message: 'Usuário não autenticado' });
    return;
  }

  try {
    const reflection = new Reflection({
      userId,
      content,
      emotion,
    });

    await reflection.save();
    res.status(201).json({ message: 'Reflexão criada com sucesso', reflection });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar reflexão', error });
  }
};

// Listar reflexões do usuário
export const getReflections = async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.user?.id;

  if (!userId) {
    res.status(401).json({ message: 'Usuário não autenticado' });
    return;
  }

  try {
    const reflections = await Reflection.find({ userId }).sort({ createdAt: -1 });
    res.json(reflections);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar reflexões', error });
  }
};