import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

interface TaskProps {
  id: number;
  title: string;
  done: boolean;
}

export type EditTaskArgs = {
  taskId: number;
  taskNewTitle: string;
} 

export function Home() {
  const [tasks, setTasks] = useState<TaskProps[]>([]);


  function handleAddTask(newTaskTitle: string) {
    const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    }
    tasks.find(t => t.title === newTaskTitle) 
    ? Alert.alert("Task já Cadastrada", "Voce não pode cadastrar uma task com o mesmo nome") 
    : setTasks([...tasks, data])
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
    Alert.alert(
      'Remover item', 
      'Tem certeza que você deseja remover esse item?', 
      [
        {
          text: "Sim",
          onPress: () => setTasks(task => task.filter(t => t.id !== id)),
          style: "default"
        },
        {
          text: "Não",
          style: "cancel",
        }
      ]);
  }

  function handleEditTask({taskId, taskNewTitle}: EditTaskArgs) {
    const updatedTask = tasks.map( task => ({...task}));
    const taskTitle = updatedTask.find(task => task.id === taskId)
    
    if(!taskTitle) {
      return;
    }

    taskTitle.title = taskNewTitle;
    setTasks(updatedTask)
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask = {handleEditTask} 
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