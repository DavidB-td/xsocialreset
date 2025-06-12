import { Response } from 'express';
import User from '../models/User';
import { AuthRequest } from '../middleware/authMiddleware';

// Obter perfil do usuário (função existente)
export const getUserProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.user?.id;
  if (!userId) {
    res.status(401).json({ message: 'Usuário não autenticado' });
    return;
  }
  try {
    const user = await User.findById(userId).select('-password');
    if (!user) {
      res.status(404).json({ message: 'Usuário não encontrado' });
      return;
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter perfil', error });
  }
};

// --- NOVA FUNÇÃO ADICIONADA AQUI ---
// Resetar o temporizador do detox
export const resetTimer = async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.user?.id;
  if (!userId) {
    res.status(401).json({ message: 'Usuário não autenticado' });
    return;
  }
  try {
    // Encontra o utilizador e atualiza o campo com a data e hora atuais
    const user = await User.findByIdAndUpdate(
      userId,
      { detoxStartDate: new Date() },
      { new: true } // Garante que a resposta retorne o documento atualizado
    ).select('-password');

    if (!user) {
      res.status(404).json({ message: 'Utilizador não encontrado' });
      return;
    }
    res.json({ message: 'Temporizador resetado com sucesso', user });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao resetar o temporizador', error });
  }
};
