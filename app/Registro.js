import React, { useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  View
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from './api/axiosConfig'; // <- Importe nossa configuração do Axios

export default function Registro() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  // Removi o telefone, pois não está no seu modelo de usuário do backend
  const router = useRouter();

  const handleRegistro = async () => {
    // Validação inicial (continua a mesma)
    if (!username || !email || !senha || !confirmarSenha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    // Lógica de chamada à API
    try {
      // Fazendo a requisição POST para o backend
      const response = await axios.post('/auth/register', {
        username,
        email,
        password: senha, // O backend espera um campo 'password'
      });

      // Se o registro for bem-sucedido, a API retornará um token
      const { token } = response.data;

      // Salvamos o TOKEN REAL no AsyncStorage, não mais 'true'
      await AsyncStorage.setItem('token', token);

      // Limpamos a flag de onboarding para garantir que o usuário passe por ela
      await AsyncStorage.removeItem('@onboardingDone');

      Alert.alert('Sucesso!', 'Seu registro foi concluído.');
      router.replace('/Tela01'); // vai para o onboarding após o cadastro

    } catch (error) {
      console.error('Erro no registro:', error.response?.data || error.message);
      
      // Mostra uma mensagem de erro mais útil vinda do backend
      const errorMessage = error.response?.data?.message || 'Falha ao registrar. Tente novamente.';
      Alert.alert('Erro no Registro', errorMessage);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.logo}>SocialReset</Text>
      <Text style={styles.subtitle}>Crie sua conta!</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome de Usuário"
        onChangeText={setUsername}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="E-MAIL"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        onChangeText={setSenha}
        value={senha}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar Senha"
        secureTextEntry
        onChangeText={setConfirmarSenha}
        value={confirmarSenha}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegistro}>
        <Text style={styles.buttonText}>Registre-se</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Já tem uma conta?</Text>
        <TouchableOpacity onPress={() => router.replace('/')}>
          <Text style={styles.link}> Faça Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007BFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
    color: '#333',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 14,
    borderRadius: 24,
    width: '100%',
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  footerText: {
    color: '#999',
  },
  link: {
    color: '#007BFF',
    fontWeight: '600',
  },
});