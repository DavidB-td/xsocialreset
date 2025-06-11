import React, { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const router = useRouter();

  useEffect(() => {
    const verificarLogin = async () => {
      const logado = await AsyncStorage.getItem('@loggedIn');
      const onboardingFeito = await AsyncStorage.getItem('@onboardingDone');

      if (logado === 'true') {
        if (onboardingFeito === 'true') {
          router.replace('/Home');
        } else {
          router.replace('/Tela01');
        }
      }
    };

    verificarLogin();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.logo}>SocialReset</Text>
      <Text style={styles.welcome}>Bem - Vindo</Text>

      <Text style={styles.subtext}>já tem conta?</Text>

      <TextInput
        style={styles.input}
        placeholder="E-MAIL OU USUÁRIO"
        onChangeText={setUsuario}
        value={usuario}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        onChangeText={setSenha}
        value={senha}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={async () => {
          // Simula login simples (em produção use validação real)
          await AsyncStorage.setItem('@loggedIn', 'true');
          const onboardingFeito = await AsyncStorage.getItem('@onboardingDone');
          router.replace(onboardingFeito === 'true' ? '/Home' : '/Tela01');
        }}
      >
        <Text style={styles.buttonText}>Acessar</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Ainda não tem conta?</Text>
        <TouchableOpacity>
          <Text style={styles.link} onPress={() => router.push('/Registro')}>
            {' '}
            Cadastre-se
          </Text>
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
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007BFF',
    marginBottom: 4,
  },
  welcome: {
    fontSize: 18,
    marginBottom: 24,
    color: '#333',
  },
  subtext: {
    color: '#999',
    fontSize: 14,
    marginBottom: 16,
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
    marginBottom: 30,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
  },
  footerText: {
    color: '#999',
  },
  link: {
    color: '#007BFF',
    fontWeight: '600',
  },
});
