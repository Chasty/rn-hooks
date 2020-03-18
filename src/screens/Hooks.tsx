import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Text, Button, Switch, FAB } from 'react-native-paper';
import { getTasks, saveTask } from '../services'
import { Task } from '../modelo/Task'


const Hooks2 = () => {
    const [count, setCounter] = useState(0);

    // De forma similar a componentDidMount y componentDidUpdate
    useEffect(() => {
        console.log(`Clickeaste ${count} veces`)
    })

    /*useEffect(()=>{
        const timeId = setInterval(()=> {
            console.log('useEffect!');
            setLoading(!isLoading)
        }, 2000)

        return ()=> clearInterval(timeId)
    })

    useEffect(()=>{
        console.log("Only one time")
    }, [isLoading])*/

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Tocaste {count} veces</Text>
            <Button onPress={()=>setCounter(count + 1)}>Press me</Button>
        </View>
    )
}

function renderTasks(data) {
    return data.map( (arr, key) => {  
        const task: Task = arr
        return( 
            <View key={key} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text>{task.id} {task.task}</Text>
                <Switch
                    value={task.status == 0 ? false : true}
                />
            </View>
        )
    })
}



const Hooks = ({ navigation }) => {
    const [isLoading, setLoading] = useState(true)
    const initialData: Task[] = []
    const [tasks, setTasks] = useState(initialData)

    async function quefue(res) {
        setLoading(true)
        const response = await getTasks(); 
        if(response.status == 200) {
            setLoading(false)
            setTasks(response.data)
        }
    }
    

    useEffect(() => {
        async function loadTasks() {
            const response = await getTasks();
            
            
            if(response.status == 200) {
                setLoading(false)
                setTasks(response.data)

                //console.log(response.data)
            }
        }

        async function  newTask() {
            var task: Task = {
                id: 0,
                task: "New Task from useEffect",
                status: 0,
                created_at: null
            }

            const response = await saveTask(task);
            console.log(response.data)
        }

        loadTasks()
        //newTask()
    },[])

    

    

    return(
        <View style={styles.container}>
            { !isLoading ? (
                  renderTasks(tasks)
              ):
              <ActivityIndicator size="large" color="#0000ff" />
            }

            <FAB
                style={[styles.fab]}
                small
                icon='home'
                label='New Task'
                onPress={() =>
                    navigation.navigate('AddTask', {
                        quefue
                    })
                }
            />
         
             
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'yellow',
        alignItems: 'center',
        justifyContent: 'center',
        padding:10
    },
    title: {
        fontSize: 20
    },
    fab: {
        position: 'absolute',
        margin: 20,
        right: 0,
        bottom: 10
    },
})

export default Hooks;