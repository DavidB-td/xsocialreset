import React, { useState, useRef } from 'react';
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

  const toggleSwitch = (setter) => (value) => setter(value);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons onPress={() => router.push('/TelaConfiguracoes')} style={styles.icon} name="arrow-back" size={24} color="#fff" />
        <Ionicons name="person-circle-outline" size={48} color="#fff" />
        <Text style={styles.username}>Nome do usuário</Text>
      </View>

      {/* Opções com switches */}
      <View style={styles.option}>
        <Text style={styles.optionText}>Rastrear tempo diário em apps</Text>
        <Switch
          value={rastreamento}
          onValueChange={toggleSwitch(setRastreamento)}
          trackColor={{ false: '#767577', true: '#7447FB' }}
          thumbColor={rastreamento ? '#fff' : '#f4f3f4'}
        />
      </View>

      <View style={styles.option}>
        <Text style={styles.optionText}>Sugerir atividades offline (Localização)</Text>
        <Switch
          value={atividadesOffline}
          onValueChange={toggleSwitch(setAtividadesOffline)}
          trackColor={{ false: '#767577', true: '#7447FB' }}
          thumbColor={atividadesOffline ? '#fff' : '#f4f3f4'}
        />
      </View>

      <View style={styles.option}>
        <Text style={styles.optionText}>Modo descanso após 22h</Text>
        <Switch
          value={modoDescanso}
          onValueChange={toggleSwitch(setModoDescanso)}
          trackColor={{ false: '#767577', true: '#8b4dff' }}
          thumbColor={modoDescanso ? '#fff' : '#f4f3f4'}
        />
      </View>

      {/* Botão de parar todos com animação */}
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <Pressable
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
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
     position: 'absolute',
    top: 0,
    left: 0,
    // opcional para espaçamento
    padding: 10,
    
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  username: {
    color: '#fff',
    fontSize: 14,
    marginTop: 4,
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
