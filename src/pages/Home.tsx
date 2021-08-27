import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

interface TaskProps {
  id: number;
  title: string;
  done: boolean;
}

export function Home() {
  const [tasks, setTasks] = useState<TaskProps[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    }
    setTasks([...tasks, data])
  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists
    const updatedTask = tasks.map( task => ({...task}));
    const taskDone = updatedTask.find(task => task.id === id)
    
    if(!taskDone) {
      return;
    }

    taskDone.done = !taskDone.done;
    setTasks(updatedTask)
  }

  function handleRemoveTask(id: number) {
    setTasks(task => task.filter(t => t.id !== id))
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})