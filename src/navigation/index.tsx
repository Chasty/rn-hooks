import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import ViewNotes from '../screens/ViewNotes'
import AddNote from '../screens/AddNotes'
import Hooks from '../screens/Hooks'
import AddTask from '../screens/AddTask'

const StackNavigator = createStackNavigator(
  {
    ViewNotes: {
      screen: ViewNotes
    },
    AddNote: {
      screen: AddNote
    },
    Hooks: {
      screen: Hooks
    },
    AddTask: {
      screen: AddTask
    }
  },
  {
    initialRouteName: 'ViewNotes',
    headerMode: 'none',
    mode: 'modal'
  }
)

export default createAppContainer(StackNavigator)