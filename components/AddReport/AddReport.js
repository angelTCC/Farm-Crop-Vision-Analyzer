import { useState, useEffect, useReducer } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  ScrollView, 
  Pressable, 
  Modal, 
  FlatList, 
  Alert, 
  KeyboardAvoidingView, 
  Platform
} from 'react-native';

// IMPORT STYLES
import { AddReportStyles as styles, optionStyle } from './StyleAddReport'; 

// IMPORT COMPONENTS 
import { insertReport, initDB } from '../SQLiteConnection/SQLiteConnection';
import { getLocation } from '../api/weatherAPI';
import { crops, fertilizers, soils } from './modalOptions';
import CameraModal from './CameraModal';

import * as MediaLibrary from 'expo-media-library';

export default function AddReport() {

  {/* REDUCE HOOK TO STORE PARAMETERS IN THE FORM ----------------------*/}
  const initialState = { 
    farmName: '', 
    observation: '', 
    crop:'Select', 
    fertilizer:'Select', 
    soil:'Select', 
    location: null ,
    savedPhotoUri: null
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

  {/* STATES TO CONTROL DYNAMIC -----------------------------*/}
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataModal, setDataModal] = useState([]);
  const [modalTitle, setModalTitle] = useState('');
  const YOUR_API_KEY = '6c0f59ca02b01f3e25302ad35a5f305c';
  const [callback, setSelectCallback] = useState(null);
  const [savedPhotoUri, setSavedPhotoUri] = useState('');
  const [loading, setLoading] = useState('');

  {/* CHEAK OUT DATABASE --------------------------------- */}
  useEffect(() => {
    initDB();
  }, []);

  {/* FUNCTION TO STORE DATA IN DATABASE AND PHOTO IN GALERY  ------------------ */}
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
      await savePhotoGalery(savedPhotoUri);
      Alert.alert('Succes', 'Data saved on the device');
      dispatch({type: 'RESET_FORM'});
      setSavedPhotoUri(null);
    } catch (err) {
      Alert.alert('Error', 'insert data wrong')
    }
  };

  const savePhotoGalery = async (uri) => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      await MediaLibrary.saveToLibraryAsync(uri);
    } catch (err) {
    }
  };

  {/* FUNCTION TO SHOW MODAL OPTIONS --------------------- */}  
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

  {/* GET ENVIROMENT CONDITIONS WITH API ------------------- */}
  const fetchAndDispatchLocation = async () => {
    setLoading('Loading...');
    const weatherData = await getLocation(YOUR_API_KEY);
    if (weatherData) {
      dispatch({
        type: 'SET_FIELD',
        field: 'location',
        value: weatherData,
      })
    } else {
        Alert.alert('Error', 'No location data available');
      };
    setLoading('');
  };

  return (
    <KeyboardAvoidingView 
          style={[styles.container]}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
      <ScrollView keyboardDismissMode='on-drag'>

        {/* FARM NAME ---------------------------------*/}
        <View style={{paddingTop:20}}>
          <Text>Farm name</Text>
          <TextInput 
            style={styles.input}
            value={state.farmName}
            onChangeText={(text)=> dispatch({type:'SET_FIELD', field:'farmName', value:text})}
          />
        </View>
        
        {/* LOCATION CONDITIONS ---------------------------- */}
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
            <Text>{loading}</Text></>
          )}
        </View>

        {/* CROP, FERTILIZER, SOIL ------------------------- */}
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

        {/* TAKE PHOTO ------------------------------------------- */}
        <CameraModal setSaveUri={(uri)=>setSavedPhotoUri(uri)} reset={savedPhotoUri===null}/>

        {/* OBSERVATION ------------------------------------------- */}
        <View>
          <Text>Observations</Text>
          <TextInput 
                  value={state.observation}
                  onChangeText={(text)=>dispatch({type:'SET_FIELD', field:'observation', value:text})}
                  style={[styles.input, {height:100, textAlignVertical: 'top'}]} 
                  numberOfLines={4} maxLength={50} multiline={false}/>
        </View>

        {/* SUBMIT BUTTON ---------------------------------------- */}
        <Pressable style={({pressed})=>[styles.button, pressed && {backgroundColor:'#2150fd'}]} onPress={sendData} >
          <Text>Submit</Text>
        </Pressable>
        
        {/* MODAL FOR SELECT OPTIONS ---------------------------- */}
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