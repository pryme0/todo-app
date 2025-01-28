import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type MainStackParamList = {
  Two: { message: string };
};

type ScreenTwoProps = {
  route: RouteProp<MainStackParamList, "Two">;
  navigation: StackNavigationProp<MainStackParamList, "Two">;
};

export function ScreenTwo({ navigation, route }: ScreenTwoProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>You're viewing screen two!</Text>
      <Text style={styles.text}>Message: {route.params.message}</Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "yellow",
  },
  text: {
    textAlign: "center",
    fontSize: 24,
    color: "black",
    marginBottom: 20,
  },
});
