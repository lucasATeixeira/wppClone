import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  AsyncStorage,
  Alert,
  ActivityIndicator
} from "react-native";

import api from "../../services/api";

export default function Login({ navigation }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setLoading(true);
    if (!name) {
      Alert.alert("Ops!", "Insira um nome pra continuar!");
      setLoading(false);
      return;
    }

    const { data } = await api.post("/users", { name });

    await AsyncStorage.setItem("user", JSON.stringify(data));

    navigation.navigate("Main");
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <TextInput
        autoCapitalize="words"
        autoCorrect={false}
        placeholderTextColor="#999"
        placeholder="Nome..."
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <TouchableOpacity
        onPress={handleLogin}
        activeOpacity={0.5}
        style={styles.button}
      >
        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.buttonText}>ENTRAR</Text>
        )}
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#e5ddd5",
    alignItems: "center",
    justifyContent: "center"
  },
  input: {
    backgroundColor: "#FFF",
    width: "80%",
    height: 40,
    borderWidth: 0.5,
    borderColor: "#b6b6b6",
    borderRadius: 10,
    paddingLeft: 20,
    marginBottom: 20
  },
  button: {
    backgroundColor: "#09d261",
    width: "80%",
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold"
  }
});

Login.navigationOptions = {
  title: "Login"
};
