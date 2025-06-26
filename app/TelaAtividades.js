import React, { useState, useEffect } from 'react';
import { 
  View, Text, StyleSheet, TouchableOpacity, StatusBar, FlatList, Alert, ActivityIndicator 
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from './api/axiosConfig';

export default function DailyGoalsScreen() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Chave única por dia para salvar metas localmente
  const getTodayKey = () => {
    const today = new Date();
    return `@daily-tasks-${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
  };

  const fetchDailyGoals = async () => {
    const todayKey = getTodayKey();
    try {
      const savedGoals = await AsyncStorage.getItem(todayKey);
      if (savedGoals) {
        setGoals(JSON.parse(savedGoals));
      } else {
        const response = await axios.get('/dailytasks/random');
        const newGoals = response.data.map(goal => ({ ...goal, completed: false }));
        await AsyncStorage.setItem(todayKey, JSON.stringify(newGoals));
        setGoals(newGoals);
      }
    } catch (error) {
      console.error("Erro ao buscar metas diárias:", error.response?.data || error.message);
      Alert.alert('Erro', 'Não foi possível carregar as metas de hoje.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDailyGoals();
  }, []);

  const toggleGoal = async (id) => {
    const updatedGoals = goals.map(goal =>
      goal._id === id ? { ...goal, completed: !goal.completed } : goal
    );
    setGoals(updatedGoals);
    await AsyncStorage.setItem(getTodayKey(), JSON.stringify(updatedGoals));
  };

  const completedCount = goals.filter(g => g.completed).length;
  const completionPercentage = goals.length > 0 ? (completedCount / goals.length) * 100 : 0;

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#42A5F5" />
        <Text style={{ color: '#fff', marginTop: 10 }}>Buscando suas metas do dia...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/Home')}>
          <MaterialIcons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>SUAS TAREFAS DIÁRIAS</Text>
      </View>

      <FlatList
        data={goals}
        keyExtractor={item => item._id}
        contentContainerStyle={styles.goalList}
        renderItem={({ item }) => (
          <View style={styles.goalItem}>
            <TouchableOpacity style={styles.goalButton} onPress={() => toggleGoal(item._id)}>
              <Text style={styles.goalText}>{item.title.toUpperCase()}</Text>
            </TouchableOpacity>
            <View style={[styles.statusCircle, item.completed ? styles.completed : styles.pending]} />
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            Não foi possível carregar as metas de hoje. Verifique a sua conexão ou tente mais tarde.
          </Text>
        }
      />

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {completionPercentage.toFixed(0)}% DOS OBJETIVOS ALCANÇADOS!
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#42A5F5',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    paddingTop: 40,
    gap: 10,
  },
  headerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 10,
  },
  goalList: {
    padding: 16,
    flexGrow: 1,
    gap: 16,
  },
  goalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  goalButton: {
    backgroundColor: '#7E57C2',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 6,
    flex: 1,
  },
  goalText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  statusCircle: {
    width: 24,
    height: 24,
    marginLeft: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  completed: {
    backgroundColor: 'green',
  },
  pending: {
    backgroundColor: '#fff',
  },
  footer: {
    backgroundColor: '#F8D7FF',
    paddingVertical: 16,
    alignItems: 'center',
  },
  footerText: {
    fontWeight: 'bold',
    color: '#000',
  },
  emptyText: {
    color: '#aaa',
    textAlign: 'center',
    marginTop: 50,
  },
});
