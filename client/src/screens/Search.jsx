import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {productStates} from '../slices/productsSlice';
import {useNavigation} from '@react-navigation/native';
import Header from '../components/Header';
import InputFeild from '../components/InputFeild';

const Search = () => {
  const {products} = useSelector(productStates);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  const filteredProducts = products.filter(
    product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const navigateProduct = id => {
    navigation.navigate('Product', {id});
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation} topic={'Search'} />
      <View style={styles.searchWrapper}>
        <InputFeild
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
          placeholder="Search by name or category"
        />

        {/* No products found */}
        {filteredProducts.length === 0 && searchQuery.length > 0 ? (
          <View style={styles.noProductContainer}>
            <Text style={styles.noProductText}>
              No products found matching your search.
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredProducts}
            numColumns={2}
            keyExtractor={item => item._id.toString()}
            renderItem={({item}) => (
              <Pressable
                onPress={() => navigateProduct(item._id)}
                style={styles.productContainer}>
                <Image
                  source={{uri: item.photos[0]}}
                  style={styles.productImage}
                />

                <View style={styles.productInfo}>
                  <Text style={styles.productName}>
                    {item.name.slice(0, 15)}...
                  </Text>
                  <Text style={styles.productPrice}>₹{item.price}</Text>
                </View>
              </Pressable>
            )}
            contentContainerStyle={styles.productList}
            columnWrapperStyle={styles.columnWrapper}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  searchWrapper: {
    padding: 5,
    flex: 1,
  },
  searchInput: {

    paddingLeft: 10,
    fontSize: 16,
    backgroundColor: '#fff',
    marginHorizontal: 5,
    marginTop:5
  },
  noProductContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noProductText: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
  },
  productList: {
    paddingBottom: 10,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  productContainer: {
    flex: 1,
    marginBottom: 10,
    marginHorizontal: 5,
    backgroundColor: '#fff',
    // borderRadius: 8,
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
