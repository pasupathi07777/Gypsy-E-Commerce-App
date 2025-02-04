import React from 'react';
import {StyleSheet, Text, View, FlatList, Image, Pressable} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  addAllToCart,
  removeWishlist,
  wishlistStates,
} from '../slices/wishlistSlice';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ButtonField from '../components/ButtonField';

const Wishlist = ({navigation}) => {
  const dispatch = useDispatch();
  const {wishlist, addAllToCartLoading} = useSelector(wishlistStates);

  const handleAddAllToCart = () => {
    dispatch(addAllToCart())
      .unwrap()
      .then(() => {
        navigation.navigate('Cart');
      });
  };

  const productOnclick = id => {
    console.log(id);
    navigation.navigate('Product', {id});
  };

  const renderProduct = ({item}) => (
    <View style={styles.productContainer}>
      <Pressable
        style={styles.productDetail}
        onPress={() => productOnclick(item.productId)}>
        <Image source={{uri: item.photo}} style={styles.productImage} />

        <View style={styles.productDetails}>
          <Text style={styles.productName}>{item.name.slice(0, 15)}...</Text>
          <Text style={styles.sellerName}>Seller: {item.category}</Text>
          <Text style={styles.productPrice}>₹{item.price}</Text>
        </View>
      </Pressable>

      <Pressable
        style={styles.deleteBtn}
        onPress={() => dispatch(removeWishlist(item.productId))}>
        <Icon name="delete" size={24} color="red" />
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      {wishlist.length > 0 ? (
        <>
          <FlatList
            data={wishlist}
            renderItem={renderProduct}
            keyExtractor={item => item.productId}
            contentContainerStyle={styles.productList}
          />

          <View style={styles.bottomContainer}>
            <ButtonField
              loading={addAllToCartLoading}
              title={'Add All to Cart'}
              style={styles.addAllToCartButton}
              onPress={handleAddAllToCart}
            />
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
  },
  productList: {
    paddingBottom: 80,
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 12,
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
  productDetail: {
    flexDirection: 'row',
    flex:1
    
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
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  addAllToCartButton: {
    backgroundColor: '#FF5722',
    padding: 14,
    // borderRadius: 8,
    alignItems: 'center',
  },
  addAllToCartText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Wishlist;
