import { NavigationContainer } from '@react-navigation/native'
import FlashMessage from 'react-native-flash-message';
import Auth from './src/Navigations/Auth'
import Tabs from './src/Navigations/Tabs'
import Main from './src/Navigations/Main'
import Click from './src/Navigations/Click'
import { Provider } from 'react-redux';
import Store from './src/Redux/Store'

const App = () => {
  return (
    <Provider store={Store}>
      <AppStack />
    </Provider>
  )
}

const AppStack = () => {
  return (
    <NavigationContainer>
      <Click />
      <FlashMessage position="center" />
    </NavigationContainer>
  )
}

export default App;
