import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BarChart } from 'react-native-chart-kit';
import { useRouter } from 'expo-router';

export default function RelatorioUso() {
  const screenWidth = Dimensions.get('window').width;
  const chartWidth = screenWidth * 0.9;  // 90% da tela
  const router = useRouter()

  const data = {
    labels: ['Instagram', 'TikTok', 'YouTube', 'Facebook'],
    datasets: [
      {
        data: [3, 16, 2, 5],
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#2e2e2e',
    backgroundGradientTo: '#2e2e2e',
    color: (opacity = 1) => `rgba(139, 77, 255, ${opacity})`,
    labelColor: () => '#fff',
    barPercentage: 0.5,
    decimalPlaces: 0,
    propsForLabels: {
      fontSize: screenWidth < 350 ? 8 : 10,  // fonte menor em telas pequenas
    },
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons onPress={() => router.push('/Home')} name="arrow-back" size={24} color="#fff" />
        <View style={styles.avatar}>
          <Ionicons name="person" size={48} color="#000" />
        </View>
        <Ionicons onPress={() => router.push('/TelaConfiguracoes')} name="settings" size={24} color="#fff" />
      </View>

      <Text style={styles.username}>Nome do usuário</Text>
      <Text style={styles.alertText}>ⓘ Você passou cerca de 26h nas redes!</Text>

      {/* Gráfico */}
      <BarChart
        data={data}
        width={chartWidth}
        height={220}
        chartConfig={chartConfig}
        style={styles.chart}
        fromZero
        showValuesOnTopOfBars={true}
        verticalLabelRotation={screenWidth < 350 ? 30 : 0}
      />

      <TouchableOpacity style={styles.tag}>
        <Text style={styles.tagText}>▢ Últimos 7 dias</Text>
      </TouchableOpacity>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <Ionicons name="home-outline" size={24} color="#fff" />
          <Text style={styles.footerText}>Tela inicial</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerButton}>
          <Ionicons name="target" size={24} color="#fff" />
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
    alignItems: 'center',
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
    fontSize: 14,
    marginTop: 10,
  },
  alertText: {
    color: 'red',
    marginTop: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  chart: {
    marginVertical: 20,
    borderRadius: 16,
  },
  tag: {
    backgroundColor: '#8b4dff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginBottom: 20,
  },
  tagText: {
    color: '#fff',
    fontSize: 12,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
  footerButton: {
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },
});
