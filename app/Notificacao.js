import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Notificacoes() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SocialReset</Text>

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          Permitir que o SOCIAL RESET acesse suas notificações
        </Text>
      </View>

      <TouchableOpacity onPress={() => router.push('/Atividades')} style={styles.button} >
        <Text style={styles.buttonText}>Permitir</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2e2e2e', // fundo escuro
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0b84f3', // azul forte
    marginBottom: 50,
  },
  infoBox: {
    backgroundColor: '#8b4dff', // roxo
    padding: 16,
    borderRadius: 8,
    marginBottom: 40,
    width: '100%',
  },
  infoText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#8b4dff',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
