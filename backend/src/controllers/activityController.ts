import { Response } from 'express';
import Activity from '../models/Activity';
import { AuthRequest } from '../middleware/authMiddleware';

// Criar uma nova atividade
export const createActivity = async (req: AuthRequest, res: Response): Promise<void> => {
  const { title, description, category, duration } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    res.status(401).json({ message: 'Usuário não autenticado' });
    return;
  }

  try {
    const activity = new Activity({
      userId,
      title,
      description,
      category,
      duration,
    });

    await activity.save();
    res.status(201).json({ message: 'Atividade criada com sucesso', activity });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar atividade', error });
  }
};

// Listar atividades do usuário
export const getActivities = async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.user?.id;

  if (!userId) {
    res.status(401).json({ message: 'Usuário não autenticado' });
    return;
  }

  try {
    const activities = await Activity.find({ userId }).sort({ createdAt: -1 });
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar atividades', error });
  }
};

// Marcar atividade como concluída
export const completeActivity = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  const userId = req.user?.id;

  if (!userId) {
    res.status(401).json({ message: 'Usuário não autenticado' });
    return;
  }

  try {
    const activity = await Activity.findOne({ _id: id, userId });
    if (!activity) {
      res.status(404).json({ message: 'Atividade não encontrada' });
      return;
    }

    activity.completed = true;
    await activity.save();
    res.json({ message: 'Atividade marcada como concluída', activity });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao marcar atividade', error });
  }
};