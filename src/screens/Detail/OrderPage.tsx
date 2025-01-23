import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
  FlatList,
} from 'react-native';
import axios from 'axios';
import {useNavigation, useRoute} from '@react-navigation/native';

const MOCKAPI_URL = 'https://67371fffaafa2ef22232bc52.mockapi.io/orders';

interface Order {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

const OrderPage = () => {
  const navigation = useNavigation();
  const route = useRoute<{params: {name: string; image: any; price: string}}>();

  const {
    name = 'Wings Hot',
    image = require('../../assets/Ladahitam.jpeg'),
    price = '4',
  } = route.params || {};

  const [quantity, setQuantity] = useState(1);
  const [currentName, setCurrentName] = useState(name);
  const [currentPrice, setCurrentPrice] = useState(parseFloat(price));
  const [orders, setOrders] = useState<Order[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(MOCKAPI_URL);
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const createOrUpdateOrder = async () => {
    try {
      const totalPayment = (currentPrice * quantity).toFixed(2);
      const orderData = {
        name: currentName,
        image: image.toString(),
        price: parseFloat(totalPayment),
        quantity,
      };

      if (editingId) {
        await axios.put(`${MOCKAPI_URL}/${editingId}`, orderData);
        Alert.alert('Success', 'Pesanan berhasil diperbarui!');
        setEditingId(null);
      } else {
        await axios.post(MOCKAPI_URL, orderData);
        Alert.alert('Success', 'Pesanan berhasil dibuat!');
      }

      fetchOrders();
      setQuantity(1);
      setCurrentName(name);
      setCurrentPrice(parseFloat(price));
    } catch (error) {
      console.error('Error creating/updating order:', error);
      Alert.alert('Error', 'Gagal memproses pesanan. Coba lagi.');
    }
  };

  const deleteOrder = async (id: string) => {
    try {
      await axios.delete(`${MOCKAPI_URL}/${id}`);
      Alert.alert('Success', 'Pesanan berhasil dihapus!');
      fetchOrders();
    } catch (error) {
      console.error('Error deleting order:', error);
      Alert.alert('Error', 'Gagal menghapus pesanan. Coba lagi.');
    }
  };

  const editOrder = (order: Order) => {
    setCurrentName(order.name);
    setCurrentPrice(order.price / order.quantity);
    setQuantity(order.quantity);
    setEditingId(order.id);
  };

  const handleIncrement = () => setQuantity(quantity + 1);
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handlePriceChange = (value: string) => {
    const cleanValue = value.replace('$', '');
    const numericValue = parseFloat(cleanValue);
    if (!isNaN(numericValue)) {
      setCurrentPrice(numericValue);
    } else if (value === '' || value === '$') {
      setCurrentPrice(0);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/arrow-left.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order</Text>
      </View>

      <View style={styles.editContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={currentName}
          onChangeText={setCurrentName}
        />

        <Text style={styles.label}>Price (per item)</Text>
        <TextInput
          style={styles.input}
          value={`$${currentPrice.toFixed(2)}`}
          onChangeText={handlePriceChange}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.productContainer}>
        <Image source={image} style={styles.productImage} />
        <View>
          <Text style={styles.productName}>{currentName}</Text>
          <Text style={styles.productDescription}>Hot Wings</Text>
        </View>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            onPress={handleDecrement}
            style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity
            onPress={handleIncrement}
            style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.paymentSummary}>
        <Text style={styles.paymentTitle}>Payment Summary</Text>
        <View style={styles.paymentRow}>
          <Text style={styles.paymentLabel}>Price</Text>
          <Text style={styles.paymentValue}>${currentPrice.toFixed(2)}</Text>
        </View>
        <View style={styles.paymentRow}>
          <Text style={styles.paymentLabel}>Quantity</Text>
          <Text style={styles.paymentValue}>{quantity}</Text>
        </View>
        <View style={styles.paymentRow}>
          <Text style={styles.paymentLabel}>Total Payment</Text>
          <Text style={styles.paymentTotal}>
            ${(currentPrice * quantity).toFixed(2)}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.orderButton}
        onPress={createOrUpdateOrder}>
        <Text style={styles.orderButtonText}>
          {editingId ? 'Update Order' : 'Create Order'}
        </Text>
      </TouchableOpacity>

      <FlatList
        data={orders}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.orderItem}>
            <Text style={styles.orderText}>
              {item.name} x {item.quantity} - ${item.price}
            </Text>
            <View style={styles.actionContainer}>
              <TouchableOpacity
                onPress={() => editOrder(item)}
                style={[styles.actionButton, styles.editButton]}>
                <Text style={styles.actionButtonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => deleteOrder(item.id)}
                style={[styles.actionButton, styles.deleteButton]}>
                <Text style={styles.actionButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default OrderPage;

const styles = StyleSheet.create({
  // Styles tetap sama seperti sebelumnya
  container: {flex: 1, padding: 20, backgroundColor: '#fff'},
  header: {flexDirection: 'row', alignItems: 'center', marginBottom: 20},
  icon: {width: 20, height: 20, tintColor: '#000'},
  headerTitle: {fontSize: 18, fontWeight: 'bold', marginLeft: 10},
  editContainer: {marginBottom: 20},
  label: {fontSize: 16, fontWeight: 'bold', marginBottom: 5},
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  productImage: {width: 80, height: 80, marginRight: 10},
  productName: {fontSize: 16, fontWeight: 'bold'},
  productDescription: {fontSize: 14, color: '#666'},
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  quantityButton: {padding: 10, backgroundColor: '#ddd', borderRadius: 5},
  quantityButtonText: {fontSize: 18},
  quantityText: {marginHorizontal: 10, fontSize: 16},
  paymentSummary: {marginTop: 20},
  paymentTitle: {fontSize: 18, fontWeight: 'bold', marginBottom: 10},
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  paymentLabel: {fontSize: 16},
  paymentValue: {fontSize: 16},
  paymentTotal: {fontSize: 18, fontWeight: 'bold'},
  orderButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  orderButtonText: {color: '#fff', fontSize: 16, textAlign: 'center'},
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  orderText: {fontSize: 16},
  actionContainer: {flexDirection: 'row'},
  actionButton: {
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  editButton: {backgroundColor: '#FFA500'},
  deleteButton: {backgroundColor: '#FF6347'},
  actionButtonText: {color: '#fff', fontSize: 14},
});
