import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Switch } from 'react-native';

const Profile = () => {
  // Mock user data
  const [userInfo, setUserInfo] = useState({
    username: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1234567890',
  });

  // Mock settings data
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // Handle input change
  const handleChange = (name, value) => {
    setUserInfo(prev => ({ ...prev, [name]: value }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          value={userInfo.username}
          onChangeText={(text) => handleChange('username', text)}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={userInfo.email}
          onChangeText={(text) => handleChange('email', text)}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Phone</Text>
        <TextInput
          style={styles.input}
          value={userInfo.phone}
          onChangeText={(text) => handleChange('phone', text)}
        />
      </View>

      <Text style={styles.sectionTitle}>Settings</Text>

      <View style={styles.settingsGroup}>
        <Text style={styles.settingText}>Enable Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
        />
      </View>

      <View style={styles.settingsGroup}>
        <Text style={styles.settingText}>Dark Mode</Text>
        <Switch
          value={darkMode}
          onValueChange={setDarkMode}
        />
      </View>

      <Pressable style={styles.button} onPress={() => alert("Settings updated!")}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </Pressable>

      <Pressable style={styles.logoutButton} onPress={() => alert("Logged out!")}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  settingsGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  settingText: {
    fontSize: 16,
  },
  button: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#ff4d4d',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Profile;
