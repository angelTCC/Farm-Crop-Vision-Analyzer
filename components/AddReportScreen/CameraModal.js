import React, { useState, useRef } from 'react';
import { Modal, TouchableOpacity, Text, View, Alert, Image } from 'react-native';
import {stylesCamera} from './StyleAddReport';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

export default function CameraModal ({showCamera, setShowCamera}) {
    const [facing, setFacing] = useState('back');
    const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [photoUri, setPhotoUri] = useState(null);
  const [showPhotoPreview , setShowPhotoPreview] = useState(false);
  const [savedPhotoUri, setSavedPhotoUri] = useState('');


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
    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }
      const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ base64: true });
      setPhotoUri(photo.uri);
      setShowCamera(false);
      setShowPhotoPreview(true);
     
    }
    ;
  };
    const savePhoto = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status === 'granted') {
      await MediaLibrary.saveToLibraryAsync(photoUri);
      setSavedPhotoUri(photoUri); 
      Alert.alert('Foto guardada en galería');
      setPhotoUri(null);
      setShowPhotoPreview(false);
      setShowPhotoSaved(true)
    } else {
      Alert.alert('Permiso denegado para guardar imagen');
    }
  };

    return (
        <View>
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