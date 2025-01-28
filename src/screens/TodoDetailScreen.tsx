import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useTodoStore } from "../store/todoStore";

export default function TodoDetailScreen({ route }) {
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
        <Text>Todo not found</Text>
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
        <View>
          <Text style={styles.label}>Title:</Text>
          <TextInput
            style={styles.input}
            value={editTitle}
            onChangeText={setEditTitle}
          />
          <Text style={styles.label}>Description:</Text>
          <TextInput
            style={styles.input}
            value={editDescription}
            onChangeText={setEditDescription}
            multiline
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <Text style={styles.title}>{todo.title}</Text>
          <Text style={styles.status}>
            Status: {todo.completed ? "Completed" : "In Progress"}
          </Text>
          {todo.description ? (
            <Text style={styles.description}>{todo.description}</Text>
          ) : (
            <Text style={styles.noDescription}>
              Description not added yet
            </Text>
          )}
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setIsEditing(true)}
          >
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
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
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  status: {
    fontSize: 16,
    marginBottom: 16,
    color: "#666",
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },

  noDescription: {
    fontSize: 10,
    marginBottom: 20,
    color: "#666",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
    fontSize: 16,
  },
  editButton: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 4,
    alignItems: "center",
  },
  saveButton: {
    backgroundColor: "#34C759",
    padding: 12,
    borderRadius: 4,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
