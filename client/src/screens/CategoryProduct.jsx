import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {productStates} from '../slices/productsSlice';
import {useNavigation} from '@react-navigation/native';
import Header from '../components/Header';

const CategoryProduct = ({route}) => {
  const {category} = route.params;
  const {products} = useSelector(productStates);
  const navigation = useNavigation();

  // Filter products by category
  const filteredProducts = products.filter(
    product => product.category === category,
  );

  // Navigate to the Product screen with the product ID
  const navigateProduct = id => {
    navigation.navigate('Product', {id});
  };

  return (
    <View style={styles.container}>

      <Header navigation={navigation} topic={category}/>

      <FlatList
        data={filteredProducts}
        numColumns={2} // Display items in 2 columns
        keyExtractor={item => item._id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigateProduct(item._id)} // Navigate on product click
            style={styles.productContainer}>
            {/* Product Image */}
            <Image source={{uri: item.photos[0]}} style={styles.productImage} />

            {/* Product Info */}
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{item.name.slice(0,15)}...</Text>
              <Text style={styles.productPrice}>₹{item.price}</Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.productList}
      />
    </View>
  );
};

export default CategoryProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#f9f9f9',
  },
  categoryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  productList: {
    justifyContent: 'space-between',
    padding: 10,
  },
  productContainer: {
    flex: 1,
    marginBottom: 15,
    marginRight: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    paddingVertical: 10,
    alignItems: 'center', 
    justifyContent: 'center',
  },
  productImage: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
  },
  productInfo: {
    padding: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FEAB0D',
    textAlign: 'center',
  },
});
