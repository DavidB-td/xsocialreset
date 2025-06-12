import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BarChart } from 'react-native-chart-kit';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from './api/axiosConfig';

export default function RelatorioUso() {
  const [user, setUser] = useState(null);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{ data: [] }],
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const screenWidth = Dimensions.get('window').width;

  const fetchDataForScreen = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        router.replace('/');
        return;
      }
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const [profileResponse, usageResponse] = await Promise.all([
        axios.get('/users/profile', config),
        axios.get('/usage/weekly', config)
      ]);

      setUser(profileResponse.data);

      const usageData = usageResponse.data;
      
      // --- PONTO DE DEPURAÇÃO ADICIONADO ---
      // Isto vai mostrar-nos exatamente o que a API devolveu para o gráfico.
      console.log("[DADOS DO GRÁFICO RECEBIDOS]: ", usageData);

      if (usageData && usageData.length > 0) {
        const labels = usageData.map(item => item.appName);
        const data = usageData.map(item => item.hours);
        setChartData({
          labels: labels,
          datasets: [{ data: data }],
        });
      }

    } catch (error) {
      console.error("Erro ao buscar dados para a tela de relatório:", error.response?.data || error.message);
      Alert.alert('Erro', 'Não foi possível carregar os dados do relatório.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataForScreen();
  }, []);

  const chartConfig = {
    backgroundGradientFrom: '#2e2e2e',
    backgroundGradientTo: '#2e2e2e',
    color: (opacity = 1) => `rgba(139, 77, 255, ${opacity})`,
    labelColor: () => '#fff',
    barPercentage: 0.5,
    propsForLabels: {
        fontSize: 10,
    },
  };
  
  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#8b4dff" />
        <Text style={{ color: '#fff', marginTop: 10 }}>A carregar relatório...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/Home')}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.avatar}>
          <Ionicons name="person" size={48} color="#000" />
        </View>
        <TouchableOpacity onPress={() => router.push('/TelaConfiguracoes')}>
            <Ionicons name="settings" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <Text style={styles.username}>{user ? user.username : 'Utilizador'}</Text>
      
      <Text style={styles.alertText}>
        ⓘ O seu uso de redes sociais esta semana:
      </Text>

      {chartData.labels.length > 0 ? (
        <BarChart
          data={chartData}
          width={screenWidth * 0.9}
          height={250}
          chartConfig={chartConfig}
          style={styles.chart}
          fromZero
          showValuesOnTopOfBars
          verticalLabelRotation={25}
        />
      ) : (
        <Text style={styles.emptyText}>Não há dados de uso para exibir.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2e2e2e',
    paddingHorizontal: 20,
    paddingTop: 40,
    alignItems: 'center',
  },
  centered: {
    justifyContent: 'center',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatar: {
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 50,
    padding: 10,
    backgroundColor: '#fff',
  },
  username: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  alertText: {
    color: '#ccc',
    marginTop: 20,
    marginBottom: 10,
    fontWeight: '600',
    textAlign: 'center',
  },
  chart: {
    marginVertical: 10,
    borderRadius: 16,
  },
  emptyText: {
    color: '#aaa',
    marginTop: 50,
  }
});
