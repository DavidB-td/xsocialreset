import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from './api/axiosConfig'; // ajuste o caminho se necessário

export default function Home() {
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
      friction: 3,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      friction: 3,
    }).start();
  };

  const fetchUser = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        router.replace('/');
        return;
      }

      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get('/users/profile', config);
      setUsername(response.data.username || 'Usuário');
    } catch (error) {
      console.error('Erro ao buscar usuário:', error.response?.data || error.message);
      setUsername('Usuário');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color="#8b4dff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.title}>Bem-vindo(a), {username}!</Text>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => router.push('/TelaConfiguracoes')}
          activeOpacity={0.7}
        >
          <Ionicons name="settings-outline" size={28} color="#8b4dff" />
        </TouchableOpacity>
      </View>

      <View style={styles.mainContent}>
        <TouchableOpacity
          style={[styles.card, styles.cardPrimary]}
          activeOpacity={0.8}
          onPress={() => router.push('/TelaUsuario')}
        >
          <MaterialCommunityIcons name="chart-bar" size={48} color="#fff" style={{ marginBottom: 12 }} />
          <Text style={styles.cardTitle}>Relatório de Uso</Text>
          <Text style={styles.cardSubtitle}>Veja seu resumo semanal</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, styles.cardSecondary]}
          activeOpacity={0.8}
          onPress={() => router.push('/HomeContador')}
        >
          <Ionicons name="time-outline" size={48} color="#fff" style={{ marginBottom: 12 }} />
          <Text style={styles.cardTitle}>Configurações</Text>
          <Text style={styles.cardSubtitle}>Ajuste seus rastreamentos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, styles.cardTertiary]}
          activeOpacity={0.8}
          onPress={() => router.push('/Atividades')}
        >
          <Ionicons name="walk-outline" size={48} color="#fff" style={{ marginBottom: 12 }} />
          <Text style={styles.cardTitle}>Atividades Offline</Text>
          <Text style={styles.cardSubtitle}>Adicione seus hobbies</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const { width } = Dimensions.get('window');
const cardWidth = width * 0.8;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    paddingTop: 50,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    marginBottom: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    flex: 1,
    color: '#8b4dff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  settingsButton: {
    padding: 5,
  },
  mainContent: {
    width: '100%',
    alignItems: 'center',
  },
  card: {
    width: cardWidth,
    borderRadius: 16,
    padding: 24,
    marginBottom: 25,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 5 },
  },
  cardPrimary: {
    backgroundColor: '#8b4dff',
  },
  cardSecondary: {
    backgroundColor: '#6a4cff',
  },
  cardTertiary: {
    backgroundColor: '#5533cc',
  },
  cardTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  cardSubtitle: {
    color: '#ddd',
    marginTop: 6,
    fontSize: 14,
    textAlign: 'center',
  },
});
