import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

// Importing the components
import Home from './components/Home';
import Reports from './components/ReportScreen/Reports';
import AddReport from './components/AddReportScreen/AddReport';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

export default function App() {
  const [ isLoggedIn, setIsLoggedIn ] = useState(false)

  return (
  <NavigationContainer>
    {!isLoggedIn ? (
      <Home logged={isLoggedIn} setLogged={setIsLoggedIn} />
    ) : (
      <Tab.Navigator >
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

