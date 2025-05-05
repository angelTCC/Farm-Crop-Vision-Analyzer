import * as React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Styles } from './styles';

import setIsLoggedIn from '../App'

export default function Home({ logged, setLogged}) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Home Screen</Text>
            <Pressable 
                style={ Styles.button } 
                onPress={()=>{setLogged(true)}}>
                    <Text>Login</Text>
            </Pressable>
        </View>
    )
}
