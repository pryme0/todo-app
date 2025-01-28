import { Alert } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import * as React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

type MainStackParamList = {
  One: undefined;
  Two: { message: string };
};

type ScreenOneProps = {
  route: RouteProp<MainStackParamList, "One">;
  navigation: NativeStackNavigationProp<MainStackParamList, "One">;
};

export function ScreenOne({ navigation }: ScreenOneProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello World!</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => Alert.alert("Alert", "Tapped!")}
      >
        <Text style={styles.buttonText}>Tap me for an alert</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Two", { message: "Hello, world!" })}
      >
        <Text style={styles.buttonText}>Go to next screen</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#2e6ddf",
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
