import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, FlatList, Text, TextInput, View, Button, Platform } from 'react-native';
import { CheckBox } from '@rneui/themed';

export default function App() {
  const [tasks, setTasks] = useState([
    { id: '1', description: 'Buy groceries', completed: false },
    { id: '2', description: 'Finish homework', completed: false },
    { id: '3', description: 'Walk the dog', completed: true },
  ]);

  const [newTask, setNewTask] = useState('');

  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const addTask = () => {
    if (newTask.trim() === '') return; // Ignore empty input
    setTasks([...tasks, { id: String(tasks.length + 1), description: newTask, completed: false }]);
    setNewTask(''); // Clear input field
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskItem}>
      <CheckBox
        checked={item.completed}
        onPress={() => toggleTaskCompletion(item.id)}
      />
      <Text style={[styles.taskText, item.completed && styles.completedTask]}>
        {item.description}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a task..."
          value={newTask}
          onChangeText={setNewTask}
          onSubmitEditing={addTask} // Pressing Enter adds task
        />
        <Button title="Add" onPress={addTask} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
    paddingHorizontal: 16,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  taskText: {
    fontSize: 18,
    marginLeft: 10,
  },
  completedTask: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    color: 'gray',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    padding: 8,
    fontSize: 16,
    marginRight: 10,
  },
});
