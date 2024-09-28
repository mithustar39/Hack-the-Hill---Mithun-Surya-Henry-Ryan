import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import UserStackNavigator from './navigation/UserStackNavigator';
import BusinessStackNavigator from './navigation/BusinessStackNavigator';
import HomeScreen from './screens/HomeScreen';

const MainStack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="Home">
        <MainStack.Screen name="Home" component={HomeScreen} />
        <MainStack.Screen name="UserStack" component={UserStackNavigator} options={{ headerShown: false }} />
        <MainStack.Screen name="BusinessStack" component={BusinessStackNavigator} options={{ headerShown: false }} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
