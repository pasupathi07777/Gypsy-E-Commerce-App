import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {removeWishlist, wishlistStates} from '../slices/wishlistSlice';
import Icon from 'react-native-vector-icons/MaterialIcons';


const Wishlist = () => {
  const dispatch = useDispatch();
  const {wishlist} = useSelector(wishlistStates);

  const renderProduct = ({item}) => (
    <View style={styles.productContainer}>

      <Image source={{uri: item.photo}} style={styles.productImage} />

      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.name.slice(0, 15)}...</Text>
        <Text style={styles.sellerName}>Seller: {item.category}</Text>
        <Text style={styles.productPrice}>₹{item.price}</Text>
      </View>

      <TouchableOpacity
        style={styles.deleteBtn}
        onPress={() => dispatch(removeWishlist(item.productId))}>
        <Icon name="delete" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>

      {wishlist.length > 0 ? (
        <FlatList
          data={wishlist}
          renderItem={renderProduct}
          keyExtractor={item => item.productId}
          contentContainerStyle={styles.productList}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your wishlist is empty.</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  productList: {
    paddingBottom: 16,
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    justifyContent: 'space-between',
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 16,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '500',
  },
  sellerName: {
    fontSize: 14,
    color: '#555',
    marginVertical: 4,
  },
  productPrice: {
    fontSize: 14,
    color: '#888',
  },
  deleteBtn: {
    padding: 6,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#555',
  },
});

export default Wishlist;
