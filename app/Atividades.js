import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, StatusBar } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from './api/axiosConfig';
import Toast from 'react-native-toast-message';

export default function AtividadesScreen() {
  const [interesses, setInteresses] = useState([]);
  const [newInterest, setNewInterest] = useState('');
  const router = useRouter();

  const setAuthHeader = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      return true;
    }
    router.replace('/');
    return false;
  };

  const fetchInteresses = async () => {
    if (!(await setAuthHeader())) return;
    try {
      const response = await axios.get('/interests');
      setInteresses(response.data);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro ao carregar interesses',
      });
    }
  };

  useEffect(() => {
    fetchInteresses();
  }, []);

  const addInterest = async () => {
    if (newInterest.trim() === '') return;
    if (!(await setAuthHeader())) return;
    try {
      const interestData = {
        title: newInterest,
        description: 'Interesse adicionado pelo utilizador',
        category: 'hobby',
        duration: 0,
      };
      const response = await axios.post('/interests', interestData);
      setInteresses(prev => [...prev, response.data.interest]);
      setNewInterest('');

      Toast.show({
        type: 'success',
        text1: 'Interesse adicionado!',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro ao adicionar interesse',
      });
    }
  };

  const deleteInterest = async (interestId) => {
    if (!(await setAuthHeader())) return;
    try {
      await axios.delete(`/interests/${interestId}`);
      setInteresses(prev => prev.filter(item => item._id !== interestId));

      Toast.show({
        type: 'success',
        text1: 'Interesse removido!',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro ao remover interesse',
      });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>Meus Interesses</Text>
      <Text style={styles.subtitle}>O que você gosta de fazer offline?</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ex: Tocar violão"
          placeholderTextColor="#aaa"
          value={newInterest}
          onChangeText={setNewInterest}
        />
        <TouchableOpacity style={styles.addButton} onPress={addInterest}>
          <AntDesign name="plus" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={interesses}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.title}</Text>
            <TouchableOpacity onPress={() => deleteInterest(item._id)}>
              <AntDesign name="close" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum interesse adicionado ainda.</Text>
        }
        contentContainerStyle={{ paddingBottom: 30 }}
      />

      <TouchableOpacity style={styles.buttonHome} onPress={() => router.push('/Home')}>
        <Text style={styles.buttonText}>Voltar para a Home</Text>
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
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 12,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginRight: 8,
    color: '#000',
  },
  addButton: {
    backgroundColor: '#8b4dff',
    padding: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    backgroundColor: '#8b4dff',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemText: {
    color: '#fff',
    fontSize: 16,
    flex: 1,
  },
  emptyText: {
    color: '#ccc',
    textAlign: 'center',
    marginTop: 40,
  },
  buttonHome: {
    marginTop: 20,
    backgroundColor: '#8b4dff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
