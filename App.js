import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


// Importing the components
import Home from './components/Home/Home';
import Reports from './components/Report/Reports';
import AddReport from './components/AddReport/AddReport';

const Tab = createBottomTabNavigator();

export default function App() {
  const [ isLoggedIn, setIsLoggedIn ] = useState(false)

  return (
  <NavigationContainer>
    {!isLoggedIn ? (
      <Home logged={isLoggedIn} setLogged={setIsLoggedIn} />
    ) : (
      <Tab.Navigator >
        {/* tap to add report */}
        <Tab.Screen   
                options={{
                  tabBarIcon: ({color, size}) => (
                    <MaterialIcons name="edit-note" size={24} color="black" />
                  ),
                }}
                name="AddReport" 
                component={AddReport} />

        {/* tab to show reports */}
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

