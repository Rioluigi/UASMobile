import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {TextInput} from 'react-native-gesture-handler';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../../firebase/config';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Email dan password tidak boleh kosong!');
      return;
    }

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log('res:', res);
      Alert.alert('Success', 'Login berhasil!');
      navigation.reset({
        index: 0,
        routes: [{name: 'Main' as never}],
      });
      setEmail('');
      setPassword('');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Gagal login!');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/wingz.png')} // Ganti dengan path logo Anda
        style={styles.logo}
      />
      <Text style={styles.title}>Login</Text>
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
      <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
      <Text
        style={styles.registerText}
        onPress={() => navigation.navigate('Register' as never)}>
        Belum punya akun? Register
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
  loginContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20, // Sesuaikan margin atas untuk mengatur posisi
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
  loginButton: {
    backgroundColor: '#FF9100',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    width: '100%',
  },
  loginButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 12,
  },
});

export default Login;
