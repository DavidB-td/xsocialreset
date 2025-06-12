import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useState, useEffect } from "react"; // Importa o useEffect
import { Modal, Pressable, StyleSheet, Text, View, ActivityIndicator } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import axios from './api/axiosConfig'; // Importa o axios

// O componente AnimatedOption continua o mesmo
function AnimatedOption({ icon, title, description, onPress }) {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
  return (
    <Pressable
      onPressIn={() => { scale.value = withSpring(0.95); }}
      onPressOut={() => { scale.value = withSpring(1); }}
      onPress={onPress}
      style={({ pressed }) => [styles.option, { opacity: pressed ? 0.7 : 1 }]}
    >
      <Animated.View style={[animatedStyle, styles.optionContent]}>
        <MaterialIcons name={icon} size={20} color="#fff" />
        <View style={styles.optionText}>
          <Text style={styles.optionTitle}>{title}</Text>
          <Text style={styles.optionDesc}>{description}</Text>
        </View>
      </Animated.View>
    </Pressable>
  );
}

export default function Configuracoes() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState(null); // Estado para guardar os dados do usuário
  const [loading, setLoading] = useState(true); // Estado de carregamento

  // Função para buscar os dados do usuário na API
  const fetchUserProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        router.replace('/');
        return;
      }
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get('/users/profile', config);
      setUser(response.data);
    } catch (error) {
      console.error("Erro ao buscar perfil para as configurações:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  // Executa a busca ao montar a tela
  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      router.replace("/");
    } catch (e) {
      console.error("Erro ao fazer logout:", e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="person-circle-outline" size={60} color="#fff" />
        {/* Mostra o nome do usuário real ou um 'Carregando...' */}
        {loading ? (
          <ActivityIndicator color="#fff" style={{ marginTop: 8 }} />
        ) : (
          <Text style={styles.username}>{user ? user.username : 'Usuário'}</Text>
        )}
      </View>

      <AnimatedOption
        icon="lock"
        title="Conta"
        description="Aqui você altera as configurações de sua conta."
      />

      <AnimatedOption
        icon="lock"
        title="Privacidade"
        description="Aqui você controla o que compartilha conosco."
        onPress={() => router.push("/TelaConfiguracoesPrivacidade")}
      />

      <AnimatedOption
        icon="lock"
        title="Notificações"
        description="Aqui você controla as notificações que você recebe."
      />

      <AnimatedOption
        icon="lock"
        title="Desconectar"
        description="Desconecte a sua conta do aplicativo."
        onPress={() => setModalVisible(true)}
      />

      {/* Footer */}
      <Pressable style={styles.footer} onPress={() => router.push("/Home")}>
        <Ionicons name="home-outline" size={24} color="#fff" />
        <Text style={styles.footerText}>Tela inicial</Text>
      </Pressable>

      {/* Modal de confirmação */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Deseja desconectar a sua conta?
            </Text>
            <View style={styles.modalButtons}>
              <Pressable
                style={styles.modalButton}
                onPress={() => setModalVisible(false)}
              >
                <Text>Não</Text>
              </Pressable>
              <Pressable style={styles.modalButton} onPress={handleLogout}>
                <Text>Sim</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2e2e2e",
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginVertical: 20,
  },
  username: {
    color: "#fff",
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  option: {
    backgroundColor: "#3e3e3e",
    padding: 12,
    borderRadius: 8,
    marginVertical: 6,
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  optionText: {
    marginLeft: 10,
    flex: 1,
  },
  optionTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  optionDesc: {
    color: "#ccc",
    fontSize: 12,
    marginTop: 4,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "auto",
    paddingVertical: 12,
  },
  footerText: {
    color: "#fff",
    marginLeft: 8,
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#7d7dfc",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#0099ff",
  },
  modalText: {
    marginBottom: 20,
    fontSize: 16,
    color: "#000",
  },
  modalButtons: {
    flexDirection: "row",
    gap: 10,
  },
  modalButton: {
    backgroundColor: "#7d7dfc",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#000",
    marginHorizontal: 5,
  },
});
