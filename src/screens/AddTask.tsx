import React, { useState }  from 'react'
import { StyleSheet, View } from 'react-native'
import { IconButton, TextInput, FAB, Switch, Text } from 'react-native-paper'
import Header from '../components/Header'
import { saveTask } from '../services'
import { Task } from '../modelo/Task'






function AddTask({ navigation }) {
    const [task, setTask] = useState('')
    const [status, setStatus] = useState(false)
  
    async function onSaveTask() {
        
        
        var new_task: Task = {
            id: 0,
            task: task,
            status: status == true ? 1 : 0,
            created_at: null
        }

        const response = await saveTask(new_task);
        //console.log(response.data)
        navigation.state.params.quefue(response)
        navigation.goBack()
    }
    return (
      <>
        <Header titleText='Add a new task' />
        <IconButton
          icon='close'
          size={25}
          color='white'
          onPress={() => navigation.goBack()}
          style={{ backgroundColor: 'rgba(46, 113, 102, 0.8)' }}
        />
        <View style={styles.container}>
          <TextInput
            label='Add Task Here'
            value={task}
            mode='outlined'
            onChangeText={setTask}
            style={styles.title}
          />

          <Switch 
            value = {status}
            onValueChange={e => setStatus(!status) }
          />
          
          <FAB
            style={styles.fab}
            small
            icon='check'
            disabled={task == '' ? true : false}
            onPress={() => onSaveTask()}
          />
        </View>
      </>
    )
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingHorizontal: 20,
      paddingVertical: 20
    },
    iconButton: {
        backgroundColor: 'rgba(46, 113, 102, 0.8)',
        position: 'absolute',
        right: 0,
        top: 40,
        margin: 10
    },
    title: {
      fontSize: 24,
      marginBottom: 20
    },
    text: {
      height: 300,
      fontSize: 16
    },
    fab: {
      position: 'absolute',
      margin: 20,
      right: 0,
      bottom: 0
    }
})

export default AddTask