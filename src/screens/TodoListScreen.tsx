import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { useTodoStore } from "../store/todoStore";
import { todoService } from "../services/todoService";

export default function TodoListScreen({ navigation }) {
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const { todos, setTodos, toggleTodo, addTodo } = useTodoStore();

  const { isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: todoService.getTodos,
    onSuccess: (data) => setTodos(data),
  });

  const handleAddTodo = () => {
    if (newTodoTitle.trim()) {
      addTodo({
        title: newTodoTitle,
        completed: false,
        description: "",
      });
      setNewTodoTitle("");
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newTodoTitle}
          onChangeText={setNewTodoTitle}
          placeholder="Add new todo"
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTodo}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Text
              style={[styles.todoTitle, item.completed && styles.completedTodo]}
            >
              {item.title}
            </Text>

            <Text
              style={[
                styles.todoStatus,
                item.completed && styles.completedTodo,
              ]}
            >
              {item.completed ? "Completed" : "In Progress"}
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.detailsButton}
                onPress={() =>
                  navigation.navigate("TodoDetail", { todoId: item.id })
                }
              >
                <Text style={styles.buttonText}>Details</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.statusButton,
                  item.completed && styles.completedButton,
                ]}
                onPress={() => toggleTodo(item.id)}
              >
                <Text style={styles.buttonText}>
                  {item.completed ? "✓" : "○"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  input: {
    flex: 1,
    marginRight: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
  },
  addButton: {
    backgroundColor: "#007AFF",
    padding: 8,
    borderRadius: 4,
    justifyContent: "center",
  },
  todoItem: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    alignItems: "center",
    justifyContent: "space-between",
  },
  todoTitle: {
    flex: 1,
    fontSize: 16,
  },
  todoStatus: {
    flex: 1,
    fontSize: 12,
    color: "#34C759",
  },
  completedTodo: {
    textDecorationLine: "line-through",
    color: "#999",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailsButton: {
    backgroundColor: "#007AFF",
    padding: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusButton: {
    backgroundColor: "#34C759",
    padding: 8,
    borderRadius: 4,
    width: 36,
    alignItems: "center",
  },
  completedButton: {
    backgroundColor: "#8E8E93",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
