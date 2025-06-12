import { Request, Response } from 'express';
import MasterTask from '../models/MasterTask';

// Buscar 4 tarefas aleatórias da lista mestra
export const getRandomTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("A tentar buscar tarefas aleatórias do modelo MasterTask...");
    const randomTasks = await MasterTask.aggregate([
      { $sample: { size: 4 } }
    ]);
    
    if (randomTasks.length === 0) {
        console.log("Aviso: A busca de tarefas aleatórias não retornou resultados. A coleção 'mastertasks' pode estar vazia.");
    } else {
        console.log(`Encontradas ${randomTasks.length} tarefas aleatórias.`);
    }

    res.json(randomTasks);

  } catch (error) {
    // --- ISTO VAI MOSTRAR-NOS O ERRO REAL ---
    console.error("--- ERRO NO BACKEND AO BUSCAR TAREFAS ---");
    console.error("Ocorreu um erro durante a operação 'aggregate' na coleção 'mastertasks'.");
    console.error("Erro detalhado:", error);
    console.error("------------------------------------------");
    
    res.status(500).json({ message: 'Erro ao buscar tarefas aleatórias. Verifique o console do servidor backend.', error });
  }
};
