import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Chat from './screen/Chat'
import Mappe from './screen/Map'
import Home from './screen/Home'
import pseudo from './store/pseudo.reducer'
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
const store = createStore(combineReducers({ pseudo }));


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator()

const bottomTabNav = () => {
  return(
    <Tab.Navigator>
      <Tab.Screen name="map" component={Mappe} />
      <Tab.Screen name="chat" component={Chat} />
    </Tab.Navigator>
  )
}


function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: true }}>
          <Stack.Screen name="home" component={Home} />
          <Stack.Screen name="bottomTabNav" component={bottomTabNav} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default App;