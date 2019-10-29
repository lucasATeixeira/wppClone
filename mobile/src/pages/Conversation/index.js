import React, { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Header } from "react-navigation-stack";

import io from "socket.io-client";

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  AsyncStorage,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  YellowBox
} from "react-native";

import api from "../../services/api";

export default function Conversation({ navigation }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  YellowBox.ignoreWarnings([
    "Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?"
  ]);

  useEffect(() => {
    AsyncStorage.getItem("user").then(user => {
      const { _id } = JSON.parse(user);

      const socket = io("http://192.168.0.109:3333", {
        query: { user: _id }
      });

      socket.on("message", message => {
        const parsedMessage = JSON.parse(message);
        if (parsedMessage.sender === navigation.getParam("_id")) {
          setMessages(messages => [...messages, parsedMessage]);
        }
      });
    });
  }, []);

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

  async function handleSubmit() {
    if (!message) return;
    const user = JSON.parse(await AsyncStorage.getItem("user"));
    const { data } = await api.post(
      `/users/${navigation.getParam("_id")}/conversations`,
      { message },
      { headers: { user_id: user._id } }
    );

    setMessages(messages => [...messages, data]);
    setMessage("");
  }

  return (
    <>
      <KeyboardAvoidingView
        keyboardVerticalOffset={Header.HEIGHT + 20}
        behavior="padding"
        style={styles.container}
      >
        <View style={styles.content}>
          <FlatList
            style={styles.list}
            data={messages}
            renderItem={({ item }) => (
              <View
                style={
                  navigation.getParam("_id") === item.sender
                    ? styles.receiverBox
                    : styles.senderBox
                }
              >
                <Text style={styles.textBox}>{item.message}</Text>
              </View>
            )}
            keyExtractor={item => item._id}
          />
        </View>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Digite aqui..."
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={message}
            onChangeText={setMessage}
          />
          <TouchableOpacity onPress={handleSubmit} style={styles.send}>
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
  },

  //BODY

  container: {
    flex: 1
  },
  content: {
    flex: 1,
    backgroundColor: "#e5ddd5",
    paddingBottom: 20
  },

  list: {
    flex: 1,
    display: "flex"
  },

  senderBox: {
    display: "flex",
    alignItems: "center",
    alignSelf: "flex-end",
    marginTop: 4,
    backgroundColor: "#dcf8c6",
    marginHorizontal: 20,
    paddingLeft: 10,
    paddingRight: 25,
    paddingVertical: 5,
    borderRadius: 10
  },

  receiverBox: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    alignSelf: "flex-start",
    marginTop: 4,
    backgroundColor: "#FFF",
    marginHorizontal: 20,
    paddingLeft: 10,
    paddingRight: 25,
    paddingVertical: 5,
    borderRadius: 10
  },

  textBox: {
    fontSize: 15
  },

  //FORM

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
  }
});
