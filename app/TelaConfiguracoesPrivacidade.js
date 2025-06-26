import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Pressable, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ConfiguracoesRastreamento() {
  const [rastreamento, setRastreamento] = useState(true);
  const [atividadesOffline, setAtividadesOffline] = useState(true);
  const [modoDescanso, setModoDescanso] = useState(true);
  const router = useRouter();

  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const loadSettings = async () => {
      const rast = await AsyncStorage.getItem('rastreamento');
      if (rast !== null) setRastreamento(rast === 'true');
      const offline = await AsyncStorage.getItem('atividadesOffline');
      if (offline !== null) setAtividadesOffline(offline === 'true');
      const descanso = await AsyncStorage.getItem('modoDescanso');
      if (descanso !== null) setModoDescanso(descanso === 'true');
    };
    loadSettings();
  }, []);

  const toggleSwitch = (setter, key) => async (value) => {
    setter(value);
    await AsyncStorage.setItem(key, value.toString());
  };

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const pararTodos = async () => {
    setRastreamento(false);
    setAtividadesOffline(false);
    setModoDescanso(false);
    await AsyncStorage.multiSet([
      ['rastreamento', 'false'],
      ['atividadesOffline', 'false'],
      ['modoDescanso', 'false'],
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons onPress={() => router.push('/TelaConfiguracoes')} style={styles.icon} name="arrow-back" size={24} color="#fff" />
        <Ionicons name="person-circle-outline" size={48} color="#fff" />
        <Text style={styles.username}>Nome do usuário</Text>
      </View>

      <View style={styles.option}>
        <Text style={styles.optionText}>Rastrear tempo diário em apps</Text>
        <Switch
          value={rastreamento}
          onValueChange={toggleSwitch(setRastreamento, 'rastreamento')}
          trackColor={{ false: '#767577', true: '#7447FB' }}
          thumbColor={rastreamento ? '#fff' : '#f4f3f4'}
        />
      </View>

      <View style={styles.option}>
        <Text style={styles.optionText}>Sugerir atividades offline (Localização)</Text>
        <Switch
          value={atividadesOffline}
          onValueChange={toggleSwitch(setAtividadesOffline, 'atividadesOffline')}
          trackColor={{ false: '#767577', true: '#7447FB' }}
          thumbColor={atividadesOffline ? '#fff' : '#f4f3f4'}
        />
      </View>

      <View style={styles.option}>
        <Text style={styles.optionText}>Modo descanso após 22h</Text>
        <Switch
          value={modoDescanso}
          onValueChange={toggleSwitch(setModoDescanso, 'modoDescanso')}
          trackColor={{ false: '#767577', true: '#8b4dff' }}
          thumbColor={modoDescanso ? '#fff' : '#f4f3f4'}
        />
      </View>

      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <Pressable
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={pararTodos}
          style={styles.stopButton}
        >
          <Text style={styles.stopButtonText}>Parar todos os rastreamentos</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2e2e2e',
    padding: 20,
  },
  icon: {
    marginRight: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 40,
  },
  username: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 10,
  },
  option: {
    backgroundColor: '#3e3e3e',
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionText: {
    color: '#fff',
    fontSize: 14,
    flex: 1,
    marginRight: 10,
  },
  stopButton: {
    marginTop: 40,
    backgroundColor: '#8b4dff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  stopButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
