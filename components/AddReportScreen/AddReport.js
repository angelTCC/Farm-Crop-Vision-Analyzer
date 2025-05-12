import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Pressable, Modal, FlatList} from 'react-native';
import { AddReportStyles as styles } from './StyleAddReport'; 
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';

import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

export default function AddReport() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataModal, setDataModal] = useState([]);
  const [modalTitle, setModalTitle] = useState('');
  const crops = [{name: 'Corn', id:'1d'}, {name:'Soybean', id:'2'}, {name:'Rice', id:'3'}];
  const fertilizers = [{name:'Urea', id:'a'}, {name:'Compost', id:'b'}, {name:'NPK', id:'c'}];
  const soils = [ {name:'Sandy', id:'s1'},{ name:'Clay', id: 's2'}, { name: 'Silty', id: 's3' }];

  const toggleModal = (data, title) => {
    setDataModal(data);
    setModalTitle(title);
    setIsModalVisible(!isModalVisible);

  };
  const Item = ({name}) => {
    return (
      <View>
        <Pressable style={{borderColor: '#ccc', borderWidth:2, margin:2, borderRadius: 10, 
                           alignItems:'center', padding:5
        }}>
          <Text>{name}</Text>
        </Pressable>
      </View>
    );
  };
  const renderItem = ({item}) => <Item name={item.name} />;

  return (
    <ScrollView style={styles.container}>

      {/* Farm name */}
      <View>
        <Text>Farm name</Text>
        <TextInput 
          style={styles.input}
          placeholder='Farm Name'
        />
      </View>
      
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

      {/* Crop type */}
      <View>
        <Text>Select conditions</Text>
        <View style={{flexDirection:'row'}}>
          <Pressable onPress={()=>toggleModal(crops, 'Crops')} style={[styles.input, {backgroundColor:'#ddd', flex:1}]}>
            <Text>Crop</Text>
          </Pressable>      
        {/* Fertilizer types */}
          <Pressable onPress={()=>toggleModal(fertilizers, 'Fertilizers')} style={[styles.input, {backgroundColor:'#ddd', flex:1}]}>
            <Text>Fertizer</Text>
          </Pressable>
        {/* Soil type */}
          <Pressable onPress={()=>toggleModal(soils, 'Soils')} style={[styles.input, {backgroundColor:'#ddd', flex:1}]}>
            <Text>Soil</Text>
          </Pressable>
        </View>
      </View>

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

      <View>
        <Text>Observations</Text>
        <TextInput style={[styles.input, {height:100}]} numberOfLines={4} maxLength={50}/>
      </View>

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
                <Text>Select Option</Text>
                <FlatList 
                  data={dataModal}
                  keyExtractor={item => item.id}
                  renderItem = {renderItem}>
                </FlatList>
                
                <Pressable onPress={toggleModal} style={{marginTop:20, padding:5, backgroundColor: 'red', borderRadius:20}}>
                  <Text style={{color: 'white' }}>Close</Text>
                </Pressable>
              </View>
          </View>
      </Modal>
      

    </ScrollView>
  );
}