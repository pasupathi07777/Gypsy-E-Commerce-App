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
import {
  addAllToCart,
  removeWishlist,
  wishlistStates,
} from '../slices/wishlistSlice';

const Wishlist = () => {
  const dispatch = useDispatch();
  const {wishlist} = useSelector(wishlistStates);

  const handleAddAllToCart = () => {
    dispatch(addAllToCart());
    if (wishlist.length > 0) {
      console.log('Adding all items to the cart:', wishlist);
    } else {
      console.log('No items in the wishlist to add.');
    }
  };

  const renderProduct = ({item}) => (
    <View style={styles.productContainer}>
      {/* Product Image */}
      <Image source={{uri: item.photo}} style={styles.productImage} />

      {/* Product Details */}
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.name.slice(0, 15)}...</Text>
        <Text style={styles.sellerName}>Seller: {item.category}</Text>
        <Text style={styles.productPrice}>₹{item.price}</Text>
      </View>

      {/* Remove Icon */}
      <TouchableOpacity
        onPress={() => dispatch(removeWishlist(item.productId))}
        style={styles.removeButton}>
        <Text style={styles.removeText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Conditional Rendering for Wishlist Items */}
      {wishlist.length > 0 ? (
        <>
          <FlatList
            data={wishlist}
            renderItem={renderProduct}
            keyExtractor={item => item.productId}
            contentContainerStyle={styles.productList}
          />
          {/* Add All to Cart Button */}
          <View style={styles.footer}>
            <TouchableOpacity
              onPress={handleAddAllToCart}
              style={styles.addToCartButton}>
              <Text style={styles.addToCartText}>Add All to Cart</Text>
            </TouchableOpacity>
          </View>
        </>
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
    paddingBottom: 70, // Ensure space for the footer
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
  removeButton: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  removeText: {
    color: '#fff',
    fontWeight: '500',
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
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  addToCartButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '100%',
  },
  addToCartText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Wishlist;