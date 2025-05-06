import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

// Importing the components
import Home from './components/Home';
import DetailReport from './components/DetailReport';
import AddReport from './components/AddReport';
import Reports from './components/Reports';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Menu from './components/Menu';
import Dashboard from './components/Dashboard';

const Tab = createBottomTabNavigator();

export default function App() {
  const [ isLoggedIn, setIsLoggedIn ] = useState(false)
  return (
  <NavigationContainer>
    {!isLoggedIn ? (
      <Home logged={isLoggedIn} setLogged={setIsLoggedIn} />
    ) : (
      <Tab.Navigator>

        <Tab.Screen 
                options={{
                  tabBarIcon: ({color, size}) => (
                    <MaterialIcons name="notes" size={24} color="black" />
                  ),
                }}
                name="Menu" 
                component={Menu} />
        <Tab.Screen 
                options={{
                  tabBarIcon: ({color, size}) => (
                    <MaterialIcons name="notes" size={24} color="black" />
                  ),
                }}
                name="Dashboard" 
                component={Dashboard} />

        <Tab.Screen   
                options={{
                  tabBarIcon: ({color, size}) => (
                    <MaterialIcons name="edit-note" size={24} color="black" />
                  ),
                }}
                name="AddReport" 
                component={AddReport} />

        <Tab.Screen 
                options={{
                  tabBarIcon: ({color, size}) => (
                    <MaterialIcons name="notes" size={24} color="black" />
                  ),
                }}
                name="Reports" 
                component={Reports} />
      </Tab.Navigator>
    )}
  </NavigationContainer>
);
}

