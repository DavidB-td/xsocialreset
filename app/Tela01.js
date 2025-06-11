import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';  
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Tela01() {
  
  const router = useRouter();  

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>SocialReset</Text>

      <Text style={styles.welcome}>Seja bem-vindo(a)!</Text>
      <Text style={styles.description}>
        Desconecte para reconectar com o que realmente importa.
      </Text>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/Notificacao')} >
        <Text style={styles.buttonText}>Começar!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1e',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 40,
  },
  welcome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#8A2BE2',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
