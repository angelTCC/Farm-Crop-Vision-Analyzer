import React, { useState, useEffect, useRef } from 'react';
import { View, Image, Text, TextInput, ScrollView, Pressable, Modal, FlatList, Alert, KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity} from 'react-native';
import { AddReportStyles as styles, stylesCamera } from './StyleAddReport'; 
import Entypo from '@expo/vector-icons/Entypo';
import * as SQLite from 'expo-sqlite';
import * as Location from 'expo-location';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import CameraModal from './CameraModal';

export default function AddReport() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataModal, setDataModal] = useState([]);
  const [modalTitle, setModalTitle] = useState('');
  const crops = [{name: 'Corn', id:'1d'}, {name:'Soybean', id:'2'}, {name:'Rice', id:'3'}];
  const fertilizers = [{name:'Urea', id:'a'}, {name:'Compost', id:'b'}, {name:'NPK', id:'c'}];
  const soils = [ {name:'Sandy', id:'s1'},{ name:'Clay', id: 's2'}, { name: 'Silty', id: 's3' }];
  const [farmName, setFarmName] = useState('');
  const [location, setLocation] = useState(null);
  const [crop, setCrop] = useState('crop');
  const [fertilizer,setFertilizer] = useState('fertilizer');
  const [soil, setSoil] = useState('soil');
  const [observation, setObservation] = useState('');
  const [callback, setSelectCallback] = useState(null);
  const YOUR_API_KEY = '6c0f59ca02b01f3e25302ad35a5f305c';
  const [loadLocation, setLoadLocation] = useState(null);
  
  {/** photo */}
  const [showCamera, setShowCamera] = useState(false)
  const [photoUri, setPhotoUri] = useState(null);
  const [savedPhotoUri, setSavedPhotoUri] = useState(null);
  const [showPhotoSaved , setShowPhotoSaved] = useState(false);

  const dataToSend = {
    farmName,
    location,
    crop,
    fertilizer,
    soil,
    photo: savedPhotoUri,
    observation
  }

  const sendData = async () => {
    try {
      const db = await SQLite.openDatabaseAsync('reportsDatabase');
      await db.runAsync(
        `INSERT INTO reports (farmName, location, crop, fertilizer, soil, photoUri, observation) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [farmName, JSON.stringify(location), crop, fertilizer, soil, savedPhotoUri, observation]
      );
      Alert.alert('Success', 'Report submitted!');
          setFarmName('');
    setLocation('');
    setCrop('cro');
    setFertilizer('fertilizer');
    setSoil('soil');
    setSavedPhotoUri(null);
    setObservation('');
    setShowPhotoSaved(false);
    } catch(err) {
      Alert.alert('Error', 'Data don\'t sent')
    }
  }
  
  useEffect(() => {
    const initDB = async () => {
      try {

        const db = await SQLite.openDatabaseAsync('reportsDatabase');

        await db.execAsync(`
          CREATE TABLE IF NOT EXISTS reports (
            id INTEGER PRIMARY KEY NOT NULL,
            farmName TEXT,
            location TEXT,
            crop TEXT,
            fertilizer TEXT,
            soil TEXT,
            photoUri TEXT,
            observation TEXT
          );
        `);
      } catch (err) {
        Alert.alert('error database');
      }
    };

    initDB();
  }, []);

  const toggleModal = (data, title, setStateCallback) => {
    setDataModal(data);
    setModalTitle(title);
    setSelectCallback(()=> setStateCallback)
    setIsModalVisible(!isModalVisible);

  };
  const Item = ({name}) => {
    return (
      <View>
        <Pressable style={({pressed})=>[styles.button, pressed && styles.pressButton]} onPress={()=> {
          if (callback) callback(name);
          setIsModalVisible(!isModalVisible)
        }}>
          <Text>{name}</Text>
        </Pressable>
      </View>
    );
  };
  const renderItem = ({item}) => <Item name={item.name} />;
  {/* i need to add stroe insam device without sql */}
  const getLocation = async () => {
    setLoadLocation('Loading...')

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      return;
    }
  
    let gps = await Location.getCurrentPositionAsync({});
    const latitude = gps.coords.latitude;
    const longitude = gps.coords.longitude;
  
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${YOUR_API_KEY}`)
      .then(res => res.json())
      .then(data => {
        setLocation({
          main: data.weather[0].main,
          lon: data.coord.lon,
          lat: data.coord.lat,
          des: data.weather[0].description,
          temp: data.main.temp,
          country: data.sys.country
        });
      })
      .catch(err => Alert.alert("Error", "Hubo un problema al obtener los datos del clima. Intenta de nuevo más tarde."));
      setLoadLocation(null);
  };


  return (
    <KeyboardAvoidingView 
          style={[styles.container]}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
      <ScrollView keyboardDismissMode='on-drag'>

        {/* Farm name */}
        <View style={{paddingTop:20}}>
          <Text>Farm name</Text>
          <TextInput 
            style={styles.input}
            value={farmName}
            onChangeText={setFarmName}
          />
        </View>
        
        {/*Whetter and localization */}
        <View>
          <Text>Wetter and location</Text>
          {/* Whetter conditions*/}
          <View style={{flexDirection:'row'}}>
            <Pressable 
                onPress={getLocation}
                style={({pressed})=>[styles.button, {flex:3}, pressed && styles.pressButton]}>
              <Text style={{fontSize:13}}>Get local enviroment 🌤️ 📍 </Text>
            </Pressable>
            <Pressable 
                onPress={()=> setLocation('')}
                style={({pressed})=>[styles.button, {flex:1}, pressed && styles.pressButton]}>
              <Text style={{fontSize:13}}>remove </Text>
            </Pressable>
          </View>
          {location ? (
            <View style={{alignItems:'center', alignSelf:'center', backgroundColor:'rgb(134, 191, 229)', width:'50%', borderRadius:20}}>
            <Text>Conditions: {location.main}</Text>
            <Text>Longitud: {location.lon}</Text>
            <Text>Latitud:  {location.lat}</Text>
            <Text>Description: {location.des}</Text>
            <Text>Temperature: {location.temp}</Text>
            <Text>Country: {location.country}</Text>
            </View>
          ): (
            <>
            <Text>{loadLocation}</Text></>
          )}
        </View>

        {/* Crop Fertilizer Soils */}
        <View>
          <Text>Conditions</Text>
          <View style={{flexDirection:'row'}}>
            <Pressable onPress={()=>toggleModal(crops, 'Crops', setCrop)} style={({pressed})=>[
              styles.input, {backgroundColor:'#ddd', flex:1}, pressed && {backgroundColor:'rgb(151, 158, 165)'}
            ]}>
              <Text>{crop}</Text>
            </Pressable>      
          {/* Fertilizer types */}
            <Pressable onPress={()=>toggleModal(fertilizers, 'Fertilzers', setFertilizer)} style={({pressed})=>[
                styles.input, {backgroundColor:'#ddd', flex:1}, pressed && {backgroundColor:'rgb(151, 158, 165)'}
              ]}>
              <Text>{fertilizer}</Text>
            </Pressable>
          {/* Soil type */}
            <Pressable onPress={()=>toggleModal(soils, 'Soils', setSoil)} style={({pressed})=>[
                styles.input, {backgroundColor:'#ddd', flex:1}, pressed && {backgroundColor:'rgb(151, 158, 165)'}
              ]}>
              <Text>{soil}</Text>
            </Pressable>
          </View>
        </View>

        {/* Take Photo */}
        <View>
          <Text>Image</Text>
          {showPhotoSaved ? (
              <View style={{alignItems:'center'}}>
                <Image
                  source={{ uri: savedPhotoUri }}
                  style={{ width: 200, height: 300, borderRadius:10 ,marginBottom: 10 }}
                />
                <Pressable style={({pressed})=>[styles.button, pressed && [styles.pressButton]]}
                            onPress={()=> {
                              setShowPhotoSaved(false);
                              setPhotoUri(null)
                            }}>
                  <Text>Delete</Text>
                </Pressable>
              </View>
          ) : 
          (
            <View style={{alignItems:'center', justifyContent:'center', alignContent:'center'}}>
              <Pressable style={({pressed})=>[
                          styles.imageButton, {width:'80%'}, pressed && {backgroundColor:'rgb(151, 158, 165)'}
                        ]} onPress={() => setShowCamera(true)}>
                <Entypo name="camera" size={40} color="black" />
                <Text>Take Photo</Text>
              </Pressable>
            </View>
          )}
        </View>

        {/* Observations */}
        <View>
          <Text>Observations</Text>
          <TextInput 
                  value={observation}
                  onChangeText={setObservation}
                  style={[styles.input, {height:100, textAlignVertical: 'top'}]} 
                  numberOfLines={4} maxLength={50} multiline={false}/>
        </View>

        <Pressable style={({pressed})=>[styles.button, pressed && {backgroundColor:'#2150fd'}]} onPress={sendData} >
          <Text>Submit</Text>
        </Pressable>

        <Modal visible={isModalVisible} animationType="slide" transparent={true}>
            <View style={{
              flex: 1,
              justifyContent: 'center', 
              alignItems: 'center',       
              backgroundColor: 'rgba(0,0,0,0.5)'
              }}>
                <View style={{
                            width:'80%',
                            borderRadius: 20,
                            backgroundColor: 'white',
                            padding: 15,
                            alignItems:'center'}}>
                  <FlatList 
                    data={dataModal}
                    keyExtractor={item => item.id}
                    renderItem = {renderItem}
                    ListHeaderComponent={()=> <Text>{modalTitle}:</Text>}
                    >
                  </FlatList>
                  
                  <Pressable onPress={toggleModal} style={{marginTop:20, padding:5, backgroundColor: 'red', borderRadius:20}}>
                    <Text style={{color: 'white' }}>Close</Text>
                  </Pressable>
                </View>
            </View>
        </Modal>

       <CameraModal showCamera={showCamera} setShowCamera={setShowCamera}/>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}