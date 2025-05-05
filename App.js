import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

// Importing the components
import Home from './components/Home';
import DetailReport from './components/DetailReport';
import AddReport from './components/AddReport';
import Reports from './components/Reports';

const Tab = createBottomTabNavigator();

export default function App() {
  const [ isLoggedIn, setIsLoggedIn ] = useState(false)
  return (
  <NavigationContainer>
    {!isLoggedIn ? (
      <Home logged={isLoggedIn} setLogged={setIsLoggedIn} />
    ) : (
      <Tab.Navigator>
        <Tab.Screen name="AddReport" component={AddReport} />
        <Tab.Screen name="Reports" component={Reports} />
      </Tab.Navigator>
    )}
  </NavigationContainer>
);
}

