import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable, Alert, Image } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { useEffect } from 'react';
import * as MediaLibrary from 'expo-media-library';
import { reportStyle as styles } from './styles';

export default function Reports() {

    const [reportsData, setReportsData] = useState([]);
    const [db, setDb] = useState(null); // Add this line
    const [hasMediaPermission, setHasMediaPermission] = useState(false);
    useEffect(() => {
        (async () => {
            const { status } = await MediaLibrary.requestPermissionsAsync();
            setHasMediaPermission(status === 'granted');
            if (status !== 'granted') {
                Alert.alert('Permission denied', 'Gallery access permission required.');
            }
        }) ();
    }, []);
    const Item = ({ name, location, crop, fertilizer, soil, observation, photoUri }) => {


    return (
    <View style={[styles.innerContainer, { flexDirection: 'row' }]}>
        <View style={{ flex: 3 }}>
        <Text>NAME: {name}</Text>
        <Text>LOCATION: {location}</Text>
        <Text>CROP: {crop}</Text>
        <Text>FERTILIZER: {fertilizer}</Text>
        <Text>SOIL: {soil}</Text>
        <Text numberOfLines={1}>OBSERVATION: {observation}</Text>
        </View>
        {hasMediaPermission && photoUri ? (
        <Image
            source={{ uri: photoUri }}
            style={{
            width: 80,
            height: 80,
            borderRadius: 8,
            backgroundColor: '#ccc',
            }}
            resizeMode="cover"
            onError={(e) => console.log('Image load error:', e.nativeEvent.error)}
        />
        ) : (
        <View style={{ alignItems: 'center' }}>
            <Text>No photo access</Text>
        </View>
        )}
    </View>
    );
    }
    const renderItem = ({ item }) => (
        <Item 
            name={item.farmName} 
            location={item.location}
            crop={item.crop}
            fertilizer={item.fertilizer}
            soil={item.soil}
            observation={item.observation}
            photoUri={item.photoUri}            
        />
    );
    const deleteAllData = async () => {
        try {
            const db = await SQLite.openDatabaseAsync('reportsDatabase');
            await db.runAsync('DELETE FROM reports');
            const results = await db.getAllAsync('SELECT * FROM reports');
            Alert.alert('Delete data', 'Todos los datos eliminados de la tabla reports.');
            setReportsData(results);
        } catch (err) {
            console.error('Error al eliminar datos:', err);
        }
    };
    useEffect(() => {
        const initDB = async () => {
        try {

            const database = await SQLite.openDatabaseAsync('reportsDatabase');
            setDb(database);
            const results = await database.getAllAsync('SELECT * FROM reports');
            setReportsData(results);
        } catch (err) {
            Alert.alert('error database', err.message);
        }
        };
        initDB();
    }, []);
    const upDateData = async () => {
                            try {
                        const results = await db.getAllAsync('SELECT * FROM reports');
                        setReportsData(results);
                    } catch (err) {
                        console.error('Update error:', err);
                        Alert.alert('Don\'t update')
                    }
    }

    return (
        <View style={styles.container}>
            <View style={{flexDirection:'row'}}>
                <Pressable onPress={upDateData} style={({pressed})=>[styles.button, {flex:1}, pressed && styles.pressButton]}>
                    <Text>Update</Text>
                </Pressable>
                <Pressable onPress={deleteAllData} style={({pressed})=> ([styles.button,{flex:1}, pressed && styles.pressButton])}>
                    <Text>Delete all data</Text>
                </Pressable>
            </View>
            <FlatList
                data={reportsData}
                keyExtractor={item => item.id}
                renderItem={renderItem}
            />        
        </View>
    );
}

