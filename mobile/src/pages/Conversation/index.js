import React, { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Header } from "react-navigation-stack";

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  AsyncStorage,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";

import api from "../../services/api";

export default function Conversation({ navigation }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function fetchConversation() {
      const user = JSON.parse(await AsyncStorage.getItem("user"));
      const { data } = await api.get(
        `/users/${navigation.getParam("_id")}/conversations`,
        { headers: { user_id: user._id } }
      );
      setMessages(data);
    }

    fetchConversation();
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        keyboardVerticalOffset={Header.HEIGHT + 20}
        behavior="padding"
        style={styles.container}
      >
        <FlatList
          style={styles.content}
          data={messages}
          renderItem={({ item }) => (
            <View
              style={
                navigation.getParam("_id") === item.sender
                  ? styles.receiver
                  : styles.sender
              }
            >
              <Text style={styles.textBox}>{item.content}</Text>
            </View>
          )}
          keyExtractor={item => item._id}
        />
        <View style={styles.form}>
          <TextInput style={styles.input} placeholder="Digite aqui..." />
          <TouchableOpacity style={styles.send}>
            <MaterialIcons size={20} name="send" color="#FFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

Conversation.navigationOptions = ({ navigation }) => ({
  headerTitle: () => (
    <View style={styles.headerContainer}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {navigation.getParam("name")[0].toUpperCase()}
        </Text>
      </View>
      <Text style={styles.name}>{navigation.getParam("name")}</Text>
    </View>
  )
});

const styles = StyleSheet.create({
  //BODY

  container: {
    flex: 1
  },
  content: {
    flex: 1,
    backgroundColor: "#e5ddd5"
  },
  form: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e5ddd5",
    paddingHorizontal: 20,
    paddingBottom: 20
  },
  input: {
    flex: 1,
    height: 44,
    backgroundColor: "#FFF",
    paddingLeft: 30,
    borderRadius: 20,
    marginRight: 10
  },
  send: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#075e55",
    width: 44,
    height: 44,
    borderRadius: 22
  },
  senderBox: {},
  receiverBox: {},
  textBox: {},

  //HEADER

  headerContainer: {
    flexDirection: "row",
    alignItems: "center"
  },

  name: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 17
  },

  avatar: {
    display: "flex",
    backgroundColor: "#09d261",
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15
  },

  avatarText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 17
  }
});
