import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import axios from 'axios';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';

type RootStackParamList = {
  EditOrderPage: {id: string; name: string; price: string; quantity: number};
};

type EditOrderPageRouteProp = RouteProp<RootStackParamList, 'EditOrderPage'>;

const MOCKAPI_URL = 'https://67371fffaafa2ef22232bc52.mockapi.io/orders'; // Ganti dengan URL MockAPI Anda

const EditOrderPage = () => {
  const navigation = useNavigation();
  const route = useRoute<EditOrderPageRouteProp>();

  const {
    id,
    name: initialName,
    price: initialPrice,
    quantity: initialQuantity,
  } = route.params;

  const [name, setName] = useState(initialName);
  const [price, setPrice] = useState(initialPrice);
  const [quantity, setQuantity] = useState(initialQuantity.toString());

  // Fungsi untuk menyimpan perubahan
  const saveChanges = async () => {
    try {
      await axios.put(`${MOCKAPI_URL}/${id}`, {
        name,
        price: parseFloat(price).toFixed(2),
        quantity: parseInt(quantity, 10),
      });
      Alert.alert('Success', 'Pesanan berhasil diperbarui!');
      navigation.goBack(); // Kembali ke halaman sebelumnya
    } catch (error) {
      console.error('Error updating order:', error);
      Alert.alert('Error', 'Gagal memperbarui pesanan. Coba lagi.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Order</Text>

      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Price</Text>
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Quantity</Text>
      <TextInput
        style={styles.input}
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditOrderPage;

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20, backgroundColor: '#fff'},
  title: {fontSize: 24, fontWeight: 'bold', marginBottom: 20},
  label: {fontSize: 16, marginBottom: 5},
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  saveButton: {backgroundColor: '#007BFF', padding: 15, borderRadius: 5},
  saveButtonText: {color: '#fff', textAlign: 'center', fontWeight: 'bold'},
});
