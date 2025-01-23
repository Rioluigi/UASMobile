import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';

const RegisterScreen = ({ navigation }: { navigation: any }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Email dan password tidak boleh kosong!');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Success', 'Registrasi berhasil!');
      navigation.navigate('Login');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Gagal registrasi!');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/wingz.png')} // Ganti dengan path logo Anda
        style={styles.logo}
      />
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity onPress={handleRegister} style={styles.registerButton}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>
      <Text
        style={styles.loginText}
        onPress={() => navigation.navigate('Login')}
      >
        Sudah punya akun? Login
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#C62E2E',
    padding: 16,
  },
  logo: {
      width: 180, // Sesuaikan ukuran logo
      height: 180, // Sesuaikan ukuran logo
      marginTop: 125, // Sesuaikan margin atas untuk mengatur posisi
      marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: 'white',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 4,
    padding: 10,
    marginBottom: 12,
    width: '100%',
    backgroundColor: 'white',
  },
  registerButton: {
    backgroundColor: '#E16A54',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    width: '100%',
  },
  registerButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 12,
  },
});

export default RegisterScreen;
