import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: { id: string };
}

export const authMiddleware: RequestHandler = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
    return; // Apenas encerra a função sem retornar o Response
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
    (req as AuthRequest).user = { id: decoded.id };
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido' });
  }
};
