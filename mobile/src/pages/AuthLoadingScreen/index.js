import React, { useEffect } from "react";
import { View, StatusBar, StyleSheet, Image, AsyncStorage } from "react-native";

import logo from "../../assets/logo.png";

export default function AuthLoadingScreen({ navigation }) {
  useEffect(() => {
    AsyncStorage.getItem("user").then(user => {
      if (user) {
        navigation.navigate("AppStack", { user });
      } else {
        navigation.navigate("AuthStack");
      }
    });
  }, []);

  return (
    <View style={[styles.container, styles.horizontal]}>
      <Image style={{ width: 100, height: 100 }} source={logo} />
      <StatusBar barStyle="default" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#075e55"
  }
});
