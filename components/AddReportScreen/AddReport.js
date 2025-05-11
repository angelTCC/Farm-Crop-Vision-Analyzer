import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Pressable, Modal} from 'react-native';
import { AddReportStyles as styles } from './StyleAddReport'; 
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';

import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

export default function AddReport() {
  const [isModalVisible, setIsModalVisible] = useState(false)


  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <ScrollView style={styles.container}>

      <Text>Farm name</Text>
      <TextInput 
        style={styles.input}
        placeholder='Farm Name'
      />
      
      {/*Whetter and localization */}
      <View>
        <Text>Wetter and location</Text>
        {/* Whetter conditions*/}
        <View style={{flexDirection:'row'}}>
          <TextInput 
            style={[styles.input, {flex:4}]}
            placeholder='Whetter conditions'
          />
          <Pressable style={{flex:1, margin:10, alignItems:'center', justifyContent:'center', backgroundColor:'#ddd', borderRadius:8}}>
            <Text style={{fontSize:13}}>🌤️ </Text>
          </Pressable>
        </View>
        {/* GPS coordinates */}
        <View style={{flexDirection:'row'}}> 
          <TextInput 
            style={[styles.input, {flex:4}]}
            placeholder='GPS Coordinates'
          />
          <Pressable style={{flex:1, margin:10, alignItems:'center', justifyContent:'center', backgroundColor:'#ddd', borderRadius:8}}>
            <Text style={{fontSize:13}}>📍</Text>
          </Pressable>
        </View>
      </View>

      <View>
        <Text>Crop type</Text>
        <Pressable onPress={toggleModal} style={{backgroundColor: 'green', padding: 10}}>
          <Text>Select crop</Text>
        </Pressable>

        <Modal visible={isModalVisible} animationType="slide" transparent={true}>
          <View style={{
            flex: 1,
            justifyContent: 'center', 
            alignItems: 'center',       
            backgroundColor: 'rgba(0,0,0,0.5)'
            }}>
              <View style={{
                          margin: 20,
                          width:'80%',
                          backgroundColor: 'white',
                          padding: 35,
                          alignSelf:'center'}}>
                <Text>ola</Text>
                <Pressable onPress={toggleModal} style={{marginTop: 20}}>
                  <Text style={{color: 'red'}}>Close</Text>
                </Pressable>
              </View>
          </View>
        </Modal>
      </View>

      

      <Text>Fertilizer</Text>
      <TextInput
        style={styles.input}
        placeholder='Fertilizer'
      />

      <Text>Soil type</Text>
      <TextInput 
        style={styles.input}
        placeholder='Soil type'
      />

      {/* Load or Take Photo */}
      <View>
        <Text>Image</Text>
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
        <Pressable style={{flex:1, alignItems:'center', justifyContent:'center', 
                          borderColor: '#ccc', borderStyle: 'dashed',borderRadius:8, 
                          borderWidth:2, padding:10, margin:10, marginLeft:30,
                          height:120}}>
          <Entypo name="camera" size={40} color="black" />
          <Text>Take Photo</Text>
        </Pressable>
        <Pressable style={{flex:1, alignItems:'center', justifyContent:'center', 
                          borderColor: '#ccc', borderStyle: 'dashed',borderRadius:8, 
                          borderWidth:2, padding:10, margin:10, marginRight:30, 
                          height:120}}>
          <FontAwesome name="photo" size={40} color="black" />
          <Text>Upload Image</Text>
        </Pressable>
        </View>
      </View>

    </ScrollView>
  );
}