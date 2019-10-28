import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  AsyncStorage,
  FlatList,
  StyleSheet
} from "react-native";

import api from "../../services/api";

export default function Main({ navigation }) {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    async function fetchContacts() {
      const { data } = await api.get("/users");
      const user = JSON.parse(await AsyncStorage.getItem("user"));
      setContacts(data.filter(contact => contact._id !== user._id));
    }
    fetchContacts();
  }, []);

  function handleStartConversation(item) {
    navigation.navigate("Conversation", item);
  }

  return (
    <View>
      <FlatList
        data={contacts}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleStartConversation(item)}
            activeOpacity={0.5}
            style={styles.contact}
          >
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {item.name[0].toUpperCase()}
              </Text>
            </View>
            <View style={styles.information}>
              <Text style={styles.name}>{item.name}</Text>
              <Text numberOfLines={1} style={styles.lastMessage}>
                Olá, colocando muitas mensagens para ver como vai ficar quando
                eu ver quantas palavras tiverem ali
              </Text>
            </View>
            <Text style={styles.hour}>18:00</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item._id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contact: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee"
  },
  avatar: {
    display: "flex",
    backgroundColor: "#09d261",
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15
  },
  avatarText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 17
  },
  information: {
    flex: 1
  },
  name: {
    fontWeight: "bold",
    fontSize: 17,
    marginBottom: 3
  },
  lastMessage: {
    color: "rgba(0, 0, 0, 0.6)",
    fontSize: 16,
    flexWrap: "wrap"
  },
  hour: {
    marginLeft: 15
  }
});

Main.navigationOptions = ({ navigation }) => ({
  title: "WhatsApp",
  headerRight: () => (
    <TouchableOpacity
      onPress={async () => {
        await AsyncStorage.clear();
        navigation.navigate("AuthStack");
      }}
      title="Sair"
    >
      <Text style={{ color: "#FFF", fontWeight: "bold", marginRight: 20 }}>
        Sair
      </Text>
    </TouchableOpacity>
  )
});
