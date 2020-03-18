// ViewNotes.js
import React, { useState } from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import { Text, FAB, List, Switch } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'
import { addnote, deletenote } from '../redux/notesApp'

import Header from '../components/Header'
import ToggleWithHooks from '../components/Toggle'



function ViewNotes({ navigation }) {
  
  const notes = useSelector(state => state)
  const dispatch = useDispatch()
  const addNote = note => dispatch(addnote(note))
  const deleteNote = id => dispatch(deletenote(id))
  const [toggle, setToggle] = useState(false);

  

  return (
    <>
      <Header titleText='Simple Note Takers' />
      <View style={styles.container}>
        {notes.length === 0 ? (
          <View style={styles.titleContainer}>
            <Text style={styles.title}>You do not have any notes</Text>
          </View>
        ) : 
          <>
          <FlatList
              style={{ backgroundColor: '#87412360', maxHeight: 400 }}
              data={notes}
              renderItem={({ item }) =>  {
                const nota: any = item;
                return(
                  <List.Item
                    title={nota.note.noteTitle}
                    description={nota.note.noteValue}
                    descriptionNumberOfLines={1}
                    titleStyle={styles.listTitle}
                    onPress={() => deleteNote(nota.id)}
                  />
                )
              }}
              keyExtractor={item => (item as any).id.toString()}
            />
          </>
        }

        {/* ToggleWithHooks(toggle, setToggle) */}

       
        <FAB
          style={[styles.fab, { bottom: 70 }]}
          small
          icon='cart'
          label='Hooks'
          onPress={() =>
            navigation.navigate('Hooks', {
              addNote
            })
          }
        />
      
        <FAB
          style={styles.fab}
          small
          icon='plus'
          label='Add new note'
          onPress={() =>
            navigation.navigate('AddNote', {
              addNote
            })
          }
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 20
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
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
  listTitle: {
    fontSize: 20
  }
})

export default ViewNotes