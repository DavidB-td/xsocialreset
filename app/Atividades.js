import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Atividades() {
  const [input, setInput] = useState('');
  const [atividades, setAtividades] = useState([]);
  const router = useRouter();

  const STORAGE_KEY = '@atividades';

  useEffect(() => {
    const checarLoginEAtividades = async () => {
      const loggedIn = await AsyncStorage.getItem('@loggedIn');
      if (loggedIn !== 'true') {
        router.replace('/'); // Se não está logado, volta para login
        return;
      }
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      if (jsonValue != null) {
        const lista = JSON.parse(jsonValue);
        if (lista.length > 0) {
          router.replace('/Home'); // pula as atividades se já tem algo
        }
      }
    };
    checarLoginEAtividades();
  }, []);

  // Carrega as atividades salvas
  const carregarAtividades = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      if (jsonValue != null) setAtividades(JSON.parse(jsonValue));
    } catch (e) {
      console.error('Erro ao carregar atividades:', e);
    }
  };

  // Salva as atividades atuais
  const salvarAtividades = async (novaLista) => {
    try {
      const jsonValue = JSON.stringify(novaLista);
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    } catch (e) {
      console.error('Erro ao salvar atividades:', e);
    }
  };

  useEffect(() => {
    carregarAtividades();
  }, []);

  useEffect(() => {
    salvarAtividades(atividades);
  }, [atividades]);

  const adicionarAtividade = () => {
    if (input.trim() === '') return;
    setAtividades([...atividades, input.trim()]);
    setInput('');
  };

  // Função para finalizar o onboarding e ir para a Home
  const finalizar = async () => {
    try {
      await AsyncStorage.setItem('@onboardingDone', 'true');
      router.replace('/Home'); // usar replace para não permitir voltar aqui
    } catch (e) {
      console.error('Erro ao salvar flag de onboarding:', e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SocialReset</Text>
      <Text style={styles.subtitle}>Digite o que você gosta de fazer offline</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Ex: Jogar futebol"
          placeholderTextColor="#aaa"
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity onPress={adicionarAtividade} style={styles.addButton}>
          <AntDesign name="pluscircleo" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={atividades}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.tag}>
            <Text style={styles.tagText}>{item}</Text>
          </View>
        )}
        style={{ width: '100%', marginTop: 20 }}
      />

      <TouchableOpacity style={styles.finalizarButton} onPress={finalizar}>
        <Text style={styles.finalizarText}>Finalizar!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2e2e2e',
    padding: 20,
  },
  title: {
    color: '#0b84f3',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  subtitle: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 12,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 10,
    color: '#000',
  },
  addButton: {
    backgroundColor: '#8b4dff',
    padding: 8,
    borderRadius: 6,
  },
  tag: {
    backgroundColor: '#8b4dff',
    alignSelf: 'flex-start',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginVertical: 4,
  },
  tagText: {
    color: '#fff',
    fontWeight: '600',
  },
  finalizarButton: {
    backgroundColor: '#8b4dff',
    marginTop: 40,
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
  },
  finalizarText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});