import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@offline_activities';

export type Activity = {
  id: string;
  title: string;
  description: string;
  timestamp: string; // ou Date, se preferir
};

export async function saveActivity(newActivity: Activity) {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    const current = stored ? JSON.parse(stored) : [];

    const updated = [newActivity, ...current];
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Erro ao salvar atividade:', error);
  }
}

export async function getActivities(): Promise<Activity[]> {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Erro ao buscar atividades:', error);
    return [];
  }
}

export async function clearActivities() {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Erro ao limpar atividades:', error);
  }
}
