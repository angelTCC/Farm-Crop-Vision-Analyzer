import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Modal,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert
} from 'react-native';
import * as Location from 'expo-location';
import  { AddReportStyles as styles } from './StyleAddReport';

export default function AddReport() {
  const [formData, setFormData] = useState({
    farmName: '',
    gpsCoordinates: '',
    cropType: '',
    growthStage: '',
    pestType: '',
    pestDescription: ''
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState('');
  const [selectedStage, setSelectedStage] = useState('');
  const [locationError, setLocationError] = useState(null);

  const crops = ['Wheat', 'Corn', 'Soybean'];
  const stages = ['Seedling', 'Vegetative', 'Flowering', 'Harvest'];

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const getLocation = async () => {
    try {
      const loc = await Location.getCurrentPositionAsync({});
      setFormData({
        ...formData,
        gpsCoordinates: `${loc.coords.latitude.toFixed(6)}, ${loc.coords.longitude.toFixed(6)}`
      });
    } catch (error) {
      setLocationError('Failed to get location');
    }
  };

  const handleSubmit = () => {
    console.log(formData);
    Alert.alert('Data Submitted', JSON.stringify(formData, null, 2));
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleSelect = (item, type) => {
    if (type === 'crop') {
      setSelectedCrop(item);
      handleChange('cropType', item);
    } else if (type === 'stage') {
      setSelectedStage(item);
      handleChange('growthStage', item);
    }
    toggleModal();
  };

  const renderItem = (item, type) => (
    <TouchableOpacity onPress={() => handleSelect(item, type)} style={styles.modalItem}>
      <Text style={styles.modalItemText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <ScrollView contentContainerStyle={styles.formContainer}>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Farm Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter farm name"
            value={formData.farmName}
            onChangeText={(text) => handleChange('farmName', text)}
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>GPS Coordinates</Text>
          <TextInput
            style={styles.input}
            placeholder="Press locate"
            value={formData.gpsCoordinates}
            editable={false}
          />
          <Pressable onPress={getLocation} style={styles.buttonBlue}>
            <Text style={styles.buttonText}>📍 Get Location</Text>
          </Pressable>
          {locationError && <Text style={styles.errorText}>{locationError}</Text>}
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Crop Type</Text>
          <Pressable onPress={toggleModal} style={styles.input}>
            <Text>{selectedCrop || 'Select Crop'}</Text>
          </Pressable>
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Growth Stage</Text>
          <Pressable onPress={toggleModal} style={styles.input}>
            <Text>{selectedStage || 'Select Growth Stage'}</Text>
          </Pressable>
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Pest Type</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Aphids"
            value={formData.pestType}
            onChangeText={(text) => handleChange('pestType', text)}
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Describe the pest"
            value={formData.pestDescription}
            onChangeText={(text) => handleChange('pestDescription', text)}
            multiline
          />
        </View>

        <Pressable onPress={handleSubmit} style={styles.buttonGreen}>
          <Text style={styles.buttonText}>Submit Report</Text>
        </Pressable>

        {/* Modal for showing options */}
        {isModalVisible && (
          <Modal transparent={true} animationType="slide" visible={isModalVisible} onRequestClose={toggleModal}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Select Option</Text>

                <Text style={styles.modalSubtitle}>Select Crop:</Text>
                <FlatList
                  data={crops}
                  renderItem={({ item }) => renderItem(item, 'crop')}
                  keyExtractor={(item) => item}
                />
                <Text style={styles.modalSubtitle}>Select Growth Stage:</Text>
                <FlatList
                  data={stages}
                  renderItem={({ item }) => renderItem(item, 'stage')}
                  keyExtractor={(item) => item}
                />

                <Pressable onPress={toggleModal} style={styles.buttonBlue}>
                  <Text style={styles.buttonText}>Close</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}