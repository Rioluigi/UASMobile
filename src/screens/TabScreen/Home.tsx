import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {NavigationProp} from '@react-navigation/native';

const product = [
  {
    id: '1',
    name: 'Wings Ori',
    description: 'Original',
    image: require('../../assets/Ori.jpeg'),
    price: '$3.00',
    rating: 4.8,
  },
  {
    id: '2',
    name: 'Wings Black Paper',
    description: 'with Black Paper',
    image: require('../../assets/Ladahitam.jpeg'),
    price: '$5.00',
    rating: 4.9,
  },
  {
    id: '3',
    name: 'Wings Hot',
    description: 'with Cabai Rawit',
    image: require('../../assets/lada.jpeg'),
    price: '$4.00',
    rating: 4.8,
  },
  {
    id: '4',
    name: 'Wings Kechup',
    description: 'with Kechup',
    image: require('../../assets/Kechup.jpeg'),
    price: '$4.00',
    rating: 4.9,
  },
];

type RootStackParamList = {
  Home: undefined;
  DetailExample: {message: string};
  Profile: undefined;
};

type DetailNavigationProps = NavigationProp<
  RootStackParamList,
  'DetailExample'
>;

const Wings = () => {
  const navigation = useNavigation<DetailNavigationProps>();

  const handleProductPress = (product: any) => {
    navigation.navigate('DetailExample', {
      message: 'Product Details',
      name: product.name,
      description: product.description,
      image: product.image,
      price: product.price,
      rating: product.rating,
    });
  };

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.locationContainer}>
            <Text style={styles.locationText}>Location</Text>
            <Text style={styles.location}>Sukabumi, Indonesia</Text>
          </View>
          <Image
            source={require('../../assets/rio.jpeg')}
            style={styles.avatar}
          />
        </View>

        <View style={styles.searchContainer}>
          <TextInput placeholder="Search Wings" style={styles.search} />
        </View>

        <View style={styles.bannerContainer}>
          <Image
            source={require('../../assets/wings.jpg')}
            style={styles.banner}
          />
        </View>

        <ScrollView horizontal={true} style={styles.scrollView}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Wings Ori</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonCase}>
              <Text style={styles.buttonTextCase}>Wings Black Paper</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonCase}>
              <Text style={styles.buttonTextCase}>Wings Hot</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonCase}>
              <Text style={styles.buttonTextCase}>Wings Kechup</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <View style={styles.cardWrapper}>
          {product.map(product => (
            <TouchableOpacity
              key={product.id}
              style={styles.cardContainer}
              onPress={() => handleProductPress(product)}>
              <Image source={product.image} style={styles.cardImage} />
              <Image
                source={require('../../assets/star.png')}
                style={styles.iconStar}
              />
              <Text style={styles.rating}>{product.rating}</Text>
              <Text style={styles.cardTitle}>{product.name}</Text>
              <Text style={styles.cardDescription}>{product.description}</Text>
              <Text style={styles.cardPrice}>{product.price}</Text>
              <Image
                source={require('../../assets/plus.png')}
                style={styles.iconPlus}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Wings;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#C62E2E',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
    marginLeft: 30,
    marginRight: 30,
    alignItems: 'center',
  },
  locationContainer: {
    flexDirection: 'column',
  },
  locationText: {
    fontSize: 12,
    color: '#B7B7B7',
    fontFamily: 'sora',
    fontWeight: '400',
  },
  location: {
    fontSize: 14,
    color: '#DDDDDD',
    fontWeight: '600',
    fontFamily: 'sora',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 10,
  },
  searchContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  search: {
    paddingLeft: 20,
    borderRadius: 16,
    width: 351,
    height: 52,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    backgroundColor: 'white',
  },
  bannerContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  banner: {
    width: '90%',
    height: 170,
    borderRadius: 30,
  },
  scrollView: {
    marginTop: 20,
    marginLeft: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#C67C4E',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  buttonCase: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  buttonText: {
    fontWeight: '600',
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: 'sora',
  },
  buttonTextCase: {
    fontWeight: '600',
    fontSize: 14,
    color: '#2F4B4E',
    fontFamily: 'sora',
  },
  cardWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    margin: 10,
    marginTop: 20,
  },
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
    width: '45%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  cardImage: {
    width: '100%',
    height: 130,
    borderRadius: 10,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#333',
    marginTop: 10,
    marginLeft: 5,
  },
  cardDescription: {
    marginTop: 1,
    fontSize: 14,
    marginLeft: 7,
    color: '#666',
  },
  cardPrice: {
    marginTop: 10,
    fontSize: 20,
    marginLeft: 10,
    fontWeight: 'bold',
    color: '#333',
  },
  iconPlus: {
    marginHorizontal: 100,
    marginTop: -30,
    width: 35,
    height: 35,
  },
  iconStar: {
    position: 'absolute',
    width: 20,
    height: 20,
    marginLeft: 9,
    marginTop: 5,
  },
  rating: {
    position: 'absolute',
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginTop: 6,
    marginLeft: 35,
  },
});
