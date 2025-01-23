import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Image,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {productStates} from '../slices/productsSlice';
import {useNavigation} from '@react-navigation/native';
import Header from '../components/Header';

const Search = () => {
  const {products} = useSelector(productStates);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  const filteredProducts = products.filter(
    product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Render product item
  const renderProduct = ({item}) => (
    <Pressable
      style={styles.productContainer}
      onPress={() => navigation.navigate('Product', {id: item._id})}>
      <Image source={{uri: item.photos[0]}} style={styles.productImage} />
      <Text style={styles.productName}>{item.name.slice(0, 15)}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Header navigation={navigation} topic={'Search'} />
      <View style={{padding: 10, backgroundColor: '#f9f9f9',flex:1}}>

        <TextInput
          style={styles.searchInput}
          placeholder="Search by name or category"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <FlatList
          data={filteredProducts}
          numColumns={2} // Display items in 2 columns
          keyExtractor={item => item._id.toString()}
          renderItem={renderProduct}
          contentContainerStyle={styles.productList}
          showsVerticalScrollIndicator={false}
        />
        
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  productList: {
    justifyContent: 'space-between',

  },
  productContainer: {
    width: '48%',
    marginBottom: 10,
    marginRight: '4%',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderRadius: 10,
  },
  productImage: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    marginBottom: 5,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    paddingHorizontal: 5,
  },
});
