import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function DailyGoalsScreen() {
  const [goals, setGoals] = useState([
    { id: 1, title: 'LER 10 PÁGINAS DO LIVRO', completed: true },
    { id: 2, title: 'CAMINHAR 2 KM', completed: true },
    { id: 3, title: 'CUIDADOS PESSOAIS', completed: false },
    { id: 4, title: 'ACADEMIA', completed: false },
  ]);
  

  const toggleGoal = (id) => {
    setGoals(prevGoals =>
      prevGoals.map(goal =>
        goal.id === id ? { ...goal, completed: !goal.completed } : goal
      )
    );
  };
  const router = useRouter();
  const completedCount = goals.filter(g => g.completed).length;
  const completionPercentage = (completedCount / goals.length) * 100;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <MaterialIcons  onPress={() => router.push('/Home')} name="arrow-back" size={24} color="black" />
        <Text style={styles.headerText}>META SIMPLES - 4 ATIVIDADES DIÁRIAS</Text>
      </View>

      {/* Goal list */}
      <View style={styles.goalList}>
        {goals.map(goal => (
          <View key={goal.id} style={styles.goalItem}>
            <TouchableOpacity
              style={styles.goalButton}
              onPress={() => toggleGoal(goal.id)}
            >
              <Text style={styles.goalText}>{goal.title}</Text>
            </TouchableOpacity>
            <View style={[styles.statusCircle, goal.completed ? styles.completed : styles.pending]} />
          </View>
        ))}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {completionPercentage}% DOS OBJETIVOS ALCANÇADOS!
        </Text>
        <Text style={styles.footerSubtext}>2 HORAS OFFLINE</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
  header: {
    backgroundColor: '#42A5F5',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 10,
  },
  headerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  goalList: {
    padding: 16,
    flex: 1,
    justifyContent: 'center',
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
    marginLeft: 8,
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
  footerSubtext: {
    marginTop: 4,
    fontWeight: '600',
    color: '#000',
  },
});
