import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { TodoListScreen } from "./TodoListScreen";
import { TodoDetailScreen } from "./TodoDetailScreen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

export const MainStack = () => (
  <QueryClientProvider client={queryClient}>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="TodoList"
        screenOptions={{
          headerShown: true,
        }}
      >
        <Stack.Screen
          name="TodoList"
          component={TodoListScreen}
          options={{ title: "Todo List" }}
        />
        <Stack.Screen
          name="TodoDetail"
          component={TodoDetailScreen}
          options={{ title: "Todo Details" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  </QueryClientProvider>
);
