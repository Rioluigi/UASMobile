import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {signOut} from 'firebase/auth';
import {auth} from '../../firebase/config';

const Profile: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.navigate('StartScreen'); // Mengarahkan ke halaman login setelah logout
    } catch (error) {
      console.error('Logout failed: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/arrow-left.png')}
            style={{width: 20, height: 30}}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <View style={styles.profileContainer}>
        <Image
          source={require('../../assets/rio.jpeg')}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>rio luigi del niery</Text>
        <Text style={styles.profileEmail}>rioluigi123@gmail.com</Text>
      </View>

      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>

      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>My Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Payment Methods</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Settings</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C67C4E',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    flexDirection: 'row',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2F2D2C',
    marginLeft: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2F2D2C',
  },
  profileEmail: {
    fontSize: 14,
    color: '#000',
  },
  editButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  optionsContainer: {
    marginBottom: 30,
  },
  option: {
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
    paddingVertical: 15,
  },
  optionText: {
    fontSize: 16,
    color: '#2F2D2C',
  },
  logoutButton: {
    backgroundColor: '#E74C3C',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 80,
    marginTop: 40,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
