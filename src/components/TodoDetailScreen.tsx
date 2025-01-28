import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { MainStackParamList } from "../NavigationParamList";
import { useTodoStore } from "../store/todoStore";

type TodoDetailScreenProps = {
  route: RouteProp<MainStackParamList, "TodoDetail">;
  navigation: StackNavigationProp<MainStackParamList, "TodoDetail">;
};

export function TodoDetailScreen({ route }: TodoDetailScreenProps) {
  const { todoId } = route.params;
  const { todos, updateTodo } = useTodoStore();
  const todo = todos.find((t) => t.id === todoId);

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo?.title || "");
  const [editDescription, setEditDescription] = useState(
    todo?.description || ""
  );

  if (!todo) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Todo not found</Text>
      </View>
    );
  }

  const handleSave = () => {
    updateTodo(todoId, {
      title: editTitle,
      description: editDescription,
    });
    setIsEditing(false);
  };

  return (
    <View style={styles.container}>
      {isEditing ? (
        <View style={styles.editContainer}>
          <Text style={styles.label}>Title:</Text>
          <TextInput
            value={editTitle}
            onChangeText={(text) => setEditTitle(text)}
            style={styles.input}
          />
          <Text style={styles.label}>Description:</Text>
          <TextInput
            value={editDescription}
            onChangeText={(text) => setEditDescription(text)}
            style={styles.input}
            multiline
          />
          <Button title="Save" onPress={handleSave} color="#28a745" />
        </View>
      ) : (
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{todo.title}</Text>
          <Text style={styles.status}>
            Status: {todo.completed ? "Completed" : "In Progress"}
          </Text>
          <Text style={styles.description}>
            {todo.description || "No description added yet"}
          </Text>
          <Button
            title="Edit"
            onPress={() => setIsEditing(true)}
            color="#007bff"
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    fontSize: 18,
    color: "red",
  },
  editContainer: {
    flex: 1,
    justifyContent: "center",
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  status: {
    fontSize: 18,
    marginBottom: 16,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: "center",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 4,
    marginBottom: 16,
    fontSize: 16,
  },
});
