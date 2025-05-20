import React, { useState, useEffect, useReducer } from 'react';
import { View, Text, TextInput, ScrollView, Pressable, Modal, FlatList, Alert, KeyboardAvoidingView, Platform} from 'react-native';
import { AddReportStyles as styles, optionStyle } from './StyleAddReport'; 
import CameraModal from './CameraModal';
import { insertReport, initDB } from './SQLiteConnection';
import { getLocation } from './weatherAPI';
import { crops, fertilizers, soils } from './modalOptions';


export default function AddReport() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataModal, setDataModal] = useState([]);
  const [modalTitle, setModalTitle] = useState('');

  const YOUR_API_KEY = '6c0f59ca02b01f3e25302ad35a5f305c';
  const initialState = { 
    farmName: '', 
    observation: '', 
    crop:'Select', 
    fertilizer:'Select', 
    soil:'Select', 
    location: null 
  };
  function formReducer(state, action) {
    switch (action.type) {
      case 'SET_FIELD':
        return { ...state, [action.field]: action.value };
      case 'RESET_FORM':
        return initialState;
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [callback, setSelectCallback] = useState(null);
  const [showCamera, setShowCamera] = useState(false)
  const [savedPhotoUri, setSavedPhotoUri] = useState(null);
  const [showPhotoSaved , setShowPhotoSaved] = useState(false);

  useEffect(() => {
    initDB();
  }, []);
  const sendData = async () => {
    try{
        const success = await insertReport({
      farmName: state.farmName, 
      location: state.location, 
      crop: state.crop, 
      fertilizer: state.fertilizer, 
      soil: state.soil, 
      photoUri: savedPhotoUri, 
      observation:state.observation,
    });
    Alert.alert('Succes', 'data stored');
      dispatch({type: 'RESET_FORM'})
      setSavedPhotoUri(null);
      setShowPhotoSaved(false);
    } catch (err) {
      Alert.alert('Error', 'insert data wrong')
    }
  };

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

  const fetchAndDispatchLocation = async () => {
    dispatch({type:'SET_FIELD', field:'location', value:'Loading...'});
    const weatherData = await getLocation(YOUR_API_KEY);
    if (weatherData) {
      dispatch({
        type: 'SET_FIELD',
        field: 'location',
        value: weatherData,
      });
    }
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
            value={state.farmName}
            onChangeText={(text)=> dispatch({type:'SET_FIELD', field:'farmName', value:text})}
          />
        </View>
        
        {/*GPS conditions */}
        <View>
          <Text>Wetter and location</Text>
          <View style={{flexDirection:'row'}}>
            <Pressable 
                onPress={fetchAndDispatchLocation}
                style={({pressed})=>[styles.button, {flex:3}, pressed && styles.pressButton]}>
              <Text style={{fontSize:13}}>Get local enviroment 🌤️ 📍 </Text>
            </Pressable>
            <Pressable 
                onPress={()=> dispatch({type:'SET_FIELD', field:'location', value:null})}
                style={({pressed})=>[styles.button, {flex:1}, pressed && styles.pressButton]}>
              <Text style={{fontSize:13}}>remove </Text>
            </Pressable>
          </View>
          {state.location ? (
            <View style={{marginBottom:10}}>
              {Object.entries(state.location).map(([key, value]) => (
                <Text key={key}>
                  {key}: {value}
                </Text>
              ))}
            </View>
          ): (
            <>
            <Text>{state.location}</Text></>
          )}
        </View>

        {/* Crop Fertilizer Soils */}
        <View>
          <Text>Conditions</Text>
          {/** crop */}
          <View>
            <View style={{flexDirection:'row'}}>
              <Text style={[styles.input, {flex:1}]}>Crop:</Text>
              <Pressable onPress={()=>toggleModal(crops, 'Crops', (value)=>dispatch({type:'SET_FIELD', field:'crop', value}))} style={({pressed})=>[
                styles.input, {backgroundColor:'#ddd', flex:1}, pressed && {backgroundColor:'rgb(151, 158, 165)'}
              ]}>
                <Text>{state.crop}</Text>
              </Pressable> 
            </View>     
          {/* Fertilizer types */}
          <View style={{flexDirection:'row'}}>
                           <Text style={[styles.input, {flex:1}]}>Fertilizer:</Text>

              <Pressable onPress={()=>toggleModal(fertilizers, 'Fertilzers', (value)=>dispatch({type:'SET_FIELD', field:'fertilizer', value}))} style={({pressed})=>[
                  styles.input, {backgroundColor:'#ddd', flex:1}, pressed && {backgroundColor:'rgb(151, 158, 165)'}
                ]}>
                <Text>{state.fertilizer}</Text>
              </Pressable>
            </View>
          {/* Soil type */}
                <View style={{flexDirection:'row'}}>
              <Text style={[styles.input, {flex:1}]}>Soil:</Text>
              <Pressable onPress={()=>toggleModal(soils, 'Soils', (value)=>dispatch({type:'SET_FIELD', field:'soil', value}))} style={({pressed})=>[
                  styles.input, {backgroundColor:'#ddd', flex:1}, pressed && {backgroundColor:'rgb(151, 158, 165)'}
                ]}>
                <Text>{state.soil}</Text>
              </Pressable>
              </View>
          </View>
        </View>

        {/* Take Photo */}
        <CameraModal showCamera={showCamera} setShowCamera={setShowCamera} setSaveUri={(uri)=>setSavedPhotoUri(uri)} reset={savedPhotoUri === null}/>

        {/* Observations */}
        <View>
          <Text>Observations</Text>
          <TextInput 
                  value={state.observation}
                  onChangeText={(text)=>dispatch({type:'SET_FIELD', field:'observation', value:text})}
                  style={[styles.input, {height:100, textAlignVertical: 'top'}]} 
                  numberOfLines={4} maxLength={50} multiline={false}/>
        </View>

        <Pressable style={({pressed})=>[styles.button, pressed && {backgroundColor:'#2150fd'}]} onPress={sendData} >
          <Text>Submit</Text>
        </Pressable>

        <Modal visible={isModalVisible} animationType="slide" transparent={true}>
            <View style={optionStyle.viewList}>
                <View style={optionStyle.flatList}>
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

      </ScrollView>
    </KeyboardAvoidingView>
  );
}