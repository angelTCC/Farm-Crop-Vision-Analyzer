import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, Pressable, Modal, FlatList, Alert, KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity, BackHandler} from 'react-native';
import { AddReportStyles as styles } from './StyleAddReport'; 
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';

import * as Location from 'expo-location';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';


import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

export default function AddReport() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataModal, setDataModal] = useState([]);
  const [modalTitle, setModalTitle] = useState('');
  const crops = [{name: 'Corn', id:'1d'}, {name:'Soybean', id:'2'}, {name:'Rice', id:'3'}];
  const fertilizers = [{name:'Urea', id:'a'}, {name:'Compost', id:'b'}, {name:'NPK', id:'c'}];
  const soils = [ {name:'Sandy', id:'s1'},{ name:'Clay', id: 's2'}, { name: 'Silty', id: 's3' }];
  const [farmName, setFarmName] = useState('');
  const [location, setLocation] = useState(null);
  const [gps, setGps] = useState(null)
  const [crop, setCrop] = useState('crop');
  const [fertilizer,setFertilizer] = useState('fertilizer');
  const [soil, setSoil] = useState('soil');
  const [photo, setPhoto] = useState('');
  const [observation, setObservation] = useState('');
  const [callback, setSelectCallback] = useState(null);
  const YOUR_API_KEY = '';
  const [errorMsg, setErrorMsg] = useState(null);
  const [loadLocation, setLoadLocation] = useState(null);
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [showCamera, setShowCamera] = useState(false)


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
  
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${YOUR_API_KEY}&units=metric`)
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
  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }
  function takePhoto() {
    setShowCamera(true);
  }

  useEffect(() => {
    if (!permission || !permission.granted) {
      requestPermission();
    }
  }, []);


  return (
    <KeyboardAvoidingView 
          style={[styles.container]}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0} // importante
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

        {/* Load or Take Photo */}
        <View>
          <Text>Image</Text>

          {/* take photo */}
          <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
          <Pressable style={({pressed})=>[
                      styles.imageButton, pressed && {backgroundColor:'rgb(151, 158, 165)'}
                    ]} onPress={takePhoto}>
            <Entypo name="camera" size={40} color="black" />
            <Text>Take Photo</Text>
          </Pressable>

          {/* load photo 
          <Pressable style={({pressed})=>[
            styles.imageButton, pressed && {backgroundColor:'rgb(151, 158, 165)'}
          ]}>
            <FontAwesome name="photo" size={40} color="black" />
            <Text>Upload Image</Text>
          </Pressable>
          */}
          </View>
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

        <Pressable style={({pressed})=>[styles.button, pressed && {backgroundColor:'#2150fd'}]}>
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

        {showCamera && (
          <Modal visible={showCamera} animationType="slide">
            <View style={stylesCamera.container}>
              <CameraView style={stylesCamera.camera} facing={facing}>
                <View style={stylesCamera.buttonContainer}>
                  <TouchableOpacity style={stylesCamera.button} onPress={toggleCameraFacing}>
                    <Text style={stylesCamera.text}>Flip</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={stylesCamera.button} onPress={() => (
                    Alert.alert('Photo taked')
                  )}>
                    <Text style={stylesCamera.text}>Take</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={stylesCamera.button} onPress={() => setShowCamera(false)}>
                    <Text style={stylesCamera.text}>Close</Text>
                  </TouchableOpacity>
                </View>
              </CameraView>
            </View>
          </Modal>
        )}



      </ScrollView>
    </KeyboardAvoidingView>
  );
}


const stylesCamera = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});