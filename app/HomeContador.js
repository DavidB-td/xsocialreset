import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from './api/axiosConfig';

export default function HomeContador() {
  const [detoxStartDate, setDetoxStartDate] = useState(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          router.replace('/');
          return;
        }
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.get('/users/profile', config);
        if (response.data.detoxStartDate) {
          setDetoxStartDate(new Date(response.data.detoxStartDate));
        }
      } catch (error) {
        console.error("Erro ao buscar dados do utilizador:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (!detoxStartDate) {
      setElapsedSeconds(0);
      return;
    }
    const interval = setInterval(() => {
      const now = new Date();
      const difference = now.getTime() - detoxStartDate.getTime();
      setElapsedSeconds(Math.floor(difference / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [detoxStartDate]);

  const handleResetTimer = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.post('/users/reset-timer', {}, config);
      
      if (response.data?.user?.detoxStartDate) {
        const newDate = new Date(response.data.user.detoxStartDate);
        setDetoxStartDate(newDate);
      } else {
        console.error("Resposta inesperada:", response.data);
      }

    } catch (error) {
      console.error("Erro ao resetar temporizador:", error.response?.data || error);
      Alert.alert('Erro', 'Não foi possível resetar o temporizador.');
    }
  };

  const days = Math.floor(elapsedSeconds / 86400);
  const hours = Math.floor((elapsedSeconds % 86400) / 3600);
  const minutes = Math.floor((elapsedSeconds % 3600) / 60);
  const seconds = elapsedSeconds % 60;
  const totalHours = Math.floor(elapsedSeconds / 3600);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="menu" size={28} color="#fff" />
        <Text style={styles.headerText}>Home</Text>
        <TouchableOpacity onPress={() => router.push('/TelaUsuario')}>
          <Ionicons name="person-circle-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.timerRow}>
        <View style={styles.timerBlock}>
          <Text style={styles.timerNumber}>{String(days).padStart(2, '0')}</Text>
          <Text style={styles.timerLabel}>dias</Text>
        </View>
        <View style={styles.timerBlock}>
          <Text style={styles.timerNumber}>{String(hours).padStart(2, '0')}</Text>
          <Text style={styles.timerLabel}>Horas</Text>
        </View>
        <View style={styles.timerBlock}>
          <Text style={styles.timerNumber}>{String(minutes).padStart(2, '0')}</Text>
          <Text style={styles.timerLabel}>Minutos</Text>
        </View>
        <View style={styles.timerBlock}>
          <Text style={styles.timerNumber}>{String(seconds).padStart(2, '0')}</Text>
          <Text style={styles.timerLabel}>Segundos</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.resetButton} onPress={handleResetTimer}>
        <Text style={styles.resetButtonText}>Resetar Tempo</Text>
      </TouchableOpacity>

      <View style={styles.actionRow}>
        <FontAwesome name="calendar" size={28} color="#00b4fc" />
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>{totalHours} horas sem utilizar redes sociais</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.actionRow}>
        <Ionicons name="heart" size={28} color="#00b4fc" />
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>Mais tempo sobrando!</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={() => router.push('/Home')}>
          <Ionicons name="home-outline" size={24} color="#fff" />
          <Text style={styles.footerText}>Tela inicial</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.centerButton} onPress={handleResetTimer}>
          <Ionicons name="add" size={36} color="#000" />
          <Text style={styles.footerTextCenter}>Começar!</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerButton} onPress={() => router.push('/TelaAtividades')}>
          <MaterialCommunityIcons name="target" size={24} color="#fff" />
          <Text style={styles.footerText}>Metas</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2e2e2e',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
  },
  timerRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 40,
  },
  timerBlock: {
    alignItems: 'center',
  },
  timerNumber: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  timerLabel: {
    fontSize: 14,
    color: '#fff',
  },
  resetButton: {
    backgroundColor: '#ff6347',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: 20,
  },
  resetButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  actionButton: {
    backgroundColor: '#8b4dff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginLeft: 12,
    borderRadius: 8,
    flex: 1,
  },
  actionText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 'auto',
    marginBottom: 20,
  },
  footerButton: {
    alignItems: 'center',
  },
  centerButton: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 10,
    marginBottom: 4,
  },
  footerText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },
  footerTextCenter: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 6,
  },
});
