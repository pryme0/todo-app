import { useQuery } from '@tanstack/react-query';
import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../NavigationParamList";
import { todoService } from '../services/todoService';
import { useTodoStore } from '../store/todoStore';
import { TextField } from '@nativescript/core';

type TodoListScreenProps = {
    navigation: FrameNavigationProp<MainStackParamList, "TodoList">;
};

export function TodoListScreen({ navigation }: TodoListScreenProps) {
    const [newTodoTitle, setNewTodoTitle] = React.useState("");
    const { todos, setTodos, toggleTodo, addTodo } = useTodoStore();

    const { isLoading } = useQuery({
        queryKey: ['todos'],
        queryFn: todoService.getTodos,
        onSuccess: (data) => setTodos(data),
    });

    const handleAddTodo = () => {
        if (newTodoTitle.trim()) {
            addTodo({
                title: newTodoTitle,
                completed: false,
                description: '',
            });
            setNewTodoTitle("");
        }
    };

    if (isLoading) {
        return (
            <flexboxLayout style={styles.container}>
                <activityIndicator busy={true} />
            </flexboxLayout>
        );
    }

    return (
        <flexboxLayout style={styles.container}>
            <flexboxLayout className="p-4 border-b border-gray-200">
                <textField
                    text={newTodoTitle}
                    onTextChange={(args) => {
                        const textField = args.object as TextField;
                        setNewTodoTitle(textField.text);
                    }}
                    hint="Add new todo"
                    className="flex-1 mr-2"
                />
                <button
                    className="bg-blue-500 text-white p-2 rounded"
                    onTap={handleAddTodo}
                >
                    Add
                </button>
            </flexboxLayout>
            
            <scrollView>
                <stackLayout>
                    {todos.map((todo) => (
                        <gridLayout
                            key={todo.id}
                            columns="*, auto, auto"
                            className="p-4 border-b border-gray-200"
                        >
                            <label
                                col="0"
                                className={`text-lg ${todo.completed ? 'text-gray-400 line-through' : ''}`}
                                text={todo.title}
                            />
                            <button
                                col="1"
                                className="mr-2 text-blue-500"
                                onTap={() => navigation.navigate("TodoDetail", { todoId: todo.id })}
                            >
                                Details
                            </button>
                            <button
                                col="2"
                                className={todo.completed ? 'text-gray-500' : 'text-green-500'}
                                onTap={() => toggleTodo(todo.id)}
                            >
                                {todo.completed ? '✓' : '○'}
                            </button>
                        </gridLayout>
                    ))}
                </stackLayout>
            </scrollView>
        </flexboxLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        flexDirection: "column",
    },
});