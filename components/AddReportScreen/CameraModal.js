import { useState, useRef, useEffect } from 'react';
import { Modal, TouchableOpacity, Text, View, Alert, Image, Pressable} from 'react-native';

// IMPORT STYLES
import { AddReportStyles as styles, stylesCamera } from './StyleAddReport'; 

// IMPORT LIBRARIES TO CONTROL CAMERA
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

// IMPORT ICONS
import Entypo from '@expo/vector-icons/Entypo';


{/**
  COMPONENT CAMERA: manage all process in camera like open the camera, take photo, show it, save it. The 
  input are:
  - showCamera: 
  - setShowCamera:
  - setSaveUri:
  - reset:
  */}
export default function CameraModal ({showCamera, setShowCamera, setSaveUri, reset}) {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [photoUri, setPhotoUri] = useState(null);
  const [showPhotoPreview , setShowPhotoPreview] = useState(false);
  const [showPhotoSaved , setShowPhotoSaved] = useState(false);
  const [savedPhotoUri, setSavedPhotoUri] = useState(null);
    
  function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }
  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ base64: true });
      setPhotoUri(photo.uri);
      setShowCamera(false);
      setShowPhotoPreview(true);
    };
  };
  const savePhoto = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status === 'granted') {
      await MediaLibrary.saveToLibraryAsync(photoUri);
      setSaveUri(photoUri); 
      setSavedPhotoUri(photoUri);
      setShowPhotoPreview(false);
      setShowPhotoSaved(true)
      Alert.alert('Foto guardada en galería');
    } else {
      Alert.alert('Permiso denegado para guardar imagen');
    }
  };
  useEffect(() => {
    if (reset) {
      setPhotoUri(null);
      
      setSaveUri(null); // si quieres limpiar también el URI interno
      setShowPhotoSaved(false);
    } 
  }, [reset]);
  if (!permission) {
  // Camera permissions are still loading.
  return <View />;
      }
  if (!permission.granted) {
  // Camera permissions are not granted yet.
  return (
    <View style={styles.container}>
      <Text style={styles.message}>We need your permission to show the camera</Text>
      <Button onPress={requestPermission} title="grant permission" />
    </View>
  );
  }

  return (
      <View>
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
        <Modal visible={showCamera} animationType='slide'>
            <View style={stylesCamera.container} >
              <CameraView style={stylesCamera.camera} facing={facing} ref={cameraRef}>
                <View style={stylesCamera.buttonContainer}>
                  <TouchableOpacity style={stylesCamera.button} onPress={toggleCameraFacing}>
                    <Text style={stylesCamera.text}>Flip</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={stylesCamera.button} onPress={takePicture} >
                    <Text style={stylesCamera.text}>Take</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={stylesCamera.button} onPress={() => setShowCamera(false)}>
                    <Text style={stylesCamera.text}>Close</Text>
                  </TouchableOpacity>
                </View>
              </CameraView>
            </View>
        </Modal>
        { showPhotoPreview && photoUri && (
          <Modal visible={showPhotoPreview}>
              <View style={{ flex: 1 }}>
                <Image
                  source={{ uri: photoUri }}
                  style={{ width: '100%', height: '100%' }}
                  resizeMode="cover"
                />
                <View style={{ flexDirection:'row', position: 'absolute', bottom: 50, width: '100%', alignItems: 'center' }}>
                  <TouchableOpacity onPress={savePhoto} style={{ flex:1, alignItems:'center'}}>
                    <Text style={{ color: 'white', fontSize: 18 }}>Guardar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{flex:1, alignItems:'center'}} onPress={() => setPhotoUri(null)}>
                    <Text style={{ color: 'white', fontSize: 18 }}>Cancelar</Text>
                  </TouchableOpacity>
                </View>
              </View>
          </Modal>
        )}
      </View>
      
  );
}