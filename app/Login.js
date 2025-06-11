import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Login() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.logo}>SocialReset</Text>
      <Text style={styles.subtitle}>Efetue seu login</Text>

      {/* Botões sociais */}
      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/124/124010.png',
            }}
            style={styles.socialIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/300/300221.png',
            }}
            style={styles.socialIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Formulário */}
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

      <TouchableOpacity style={styles.button} onPress={() => router.push('/Tela01')}>
        <Text style={styles.buttonText}>ACESSAR</Text>
      </TouchableOpacity>
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
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
    color: '#333',
  },
  socialContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 16,
  },
  socialButton: {
    backgroundColor: '#f4f4f4',
    padding: 14,
    borderRadius: 50,
    elevation: 3,
  },
  socialIcon: {
    width: 24,
    height: 24,
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
});
