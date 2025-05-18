import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable, Alert, Image } from 'react-native';

import * as SQLite from 'expo-sqlite';
import { useEffect } from 'react';

import * as MediaLibrary from 'expo-media-library';


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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    innerContainer: {
        padding: 15,
        marginVertical: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    itemText: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
    },
        button: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      padding: 12,
      margin: 10,
      fontSize: 16,
      alignItems:'center',
      backgroundColor:'#ddd', 
    },
    imageButton:{
      flex:1, alignItems:'center', justifyContent:'center', 
      borderColor: '#ccc', borderStyle: 'dashed',borderRadius:8, 
      borderWidth:2, padding:10, margin:10,
      height:120
    },
    pressButton: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        margin: 10,
        fontSize: 16,
        backgroundColor:'rgb(151, 158, 165)', 
      }
});
