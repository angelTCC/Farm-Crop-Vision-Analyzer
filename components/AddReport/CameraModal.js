import { useState, useRef, useEffect } from 'react';
import { Modal, TouchableOpacity, Text, View, Image, Pressable} from 'react-native';

// IMPORT STYLES
import { AddReportStyles as styles, stylesCamera } from './StyleAddReport'; 

// IMPORT LIBRARIES TO CONTROL CAMERA
import { CameraView, useCameraPermissions } from 'expo-camera';

// IMPORT ICONS
import Entypo from '@expo/vector-icons/Entypo';

  {/**
    COMPONENT CAMERA: manage all process in camera like open the camera, take photo, show it, save it. The 
    input are:
    - setSaveUri: function to save the uri of the photo taken
    - reset:  boolean to reset the photo taken
  */}

export default function CameraModal ({ setSaveUri, reset}) {
  const [showCamera, setShowCamera] = useState(false)
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [photoUri, setPhotoUri] = useState(null);
    
  {/*** FUNCTION TO TOGGLE CAMERA FACING --------------------- */}
  function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

  {/*** FUNCTION TO TAKE PHOTO --------------------- */}
  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ base64: true });
      setPhotoUri(photo.uri);
      setShowCamera(false);
      setSaveUri(photo.uri);
    };
  };

  useEffect(() => {
    if (reset) {
      setPhotoUri(null);
      setSaveUri('');
    } 
  }, [reset]);
  
  {/*** REQUEST PERMISSION TO USE CAMERA --------------------- */}
  if (!permission) {
  return <View />;
      }
  if (!permission.granted) {
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
          {/* SHOW PHOTO ----------------------------------- */}
          {photoUri ? (
              <View style={{alignItems:'center'}}>
                <Image
                  source={{ uri: photoUri }}
                  style={{ width: 200, height: 300, borderRadius:10 ,marginBottom: 10 }}
                />
                <Pressable style={({pressed})=>[styles.button, pressed && [styles.pressButton]]}
                            onPress={()=> {
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

        {/* SHOW CAMERA ----------------------------------- */}
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
                  <TouchableOpacity style={stylesCamera.button} onPress={() => {
                    setShowCamera(false);
                    setPhotoUri(null);
                  }}>
                    <Text style={stylesCamera.text}>Close</Text>
                  </TouchableOpacity>
                </View>
              </CameraView>
            </View>
        </Modal>
        
      </View>
      
  );
}