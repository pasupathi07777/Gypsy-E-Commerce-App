import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
  Pressable,
} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import {cartStates, removeCart, updateCartQuantity} from '../slices/cartSlice';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {addressStates} from '../slices/addressSlice';

const Cart = ({navigation}) => {
  const {userAddress} = useSelector(addressStates);
  const {cartItems, totalCartPrice} = useSelector(cartStates);
  const dispatch = useDispatch();

  const productOnclick = id => {
    console.log(id);
    navigation.navigate('Product', {id});
  };

  const renderCartItem = ({item}) => (
    <View style={styles.cartItemContainer}>
      <Pressable
        style={styles.productDetail}
        onPress={() => productOnclick(item.productId)}>
        <Image source={{uri: item.photo}} style={styles.image} />

        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>{item.name.slice(0, 10)}...</Text>
          <Text style={styles.itemPrice}>₹{item.price.toFixed(2)}</Text>
        </View>
      </Pressable>

      <View style={styles.quantityContainer}>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() =>
            dispatch(
              updateCartQuantity({
                productId: item.productId,
                action: 'decrement',
                quantity: item.quantity,
              }),
            )
          }>
          <Text style={styles.quantityText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{item.quantity}</Text>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() =>
            dispatch(
              updateCartQuantity({
                productId: item.productId,
                action: 'increment',
              }),
            )
          }>
          <Text style={styles.quantityText}>+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.deleteBtn}
        onPress={() => dispatch(removeCart(item.productId))}>
        <Icon name="delete" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  const onCheckOut = () => {
    if (!userAddress) {
      Alert.alert('', 'Add Address');
      navigation.navigate('Add-Address');
    } else {
      navigation.navigate('Order');
    }
  };

  return (
    <View style={styles.container}>
      {cartItems.length > 0 ? (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderCartItem}
            keyExtractor={item => item.productId}
            contentContainerStyle={styles.cartList}
          />
          <View style={styles.summaryContainer}>
            <View style={styles.summaryDetails}>
              <Text style={styles.summaryText}>
                Total Items ({cartItems.length}):
              </Text>
              <Text style={styles.summaryValue}>₹{totalCartPrice}</Text>
            </View>
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={onCheckOut}>
              <Text style={styles.checkoutButtonText}>Check Out</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.emptyCartContainer}>
          <Text style={styles.emptyCartText}>No cart items</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  cartList: {
    padding: 16,
  },
  cartItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    justifyContent: 'space-between',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    resizeMode: 'contain',
  },
  itemDetails: {
    flex: 1,
  },
  productDetail: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    gap: 5,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
  },
  itemPrice: {
    fontSize: 14,
    color: '#555',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  quantityText: {
    fontSize: 18,
  },
  quantity: {
    marginHorizontal: 8,
    fontSize: 16,
  },
  summaryContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  summaryDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 14,
    color: '#555',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  checkoutButton: {
    backgroundColor: '#28a745',
    padding: 16,
    // borderRadius: 4,
    alignItems: 'center',
    marginTop: 16,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartText: {
    fontSize: 18,
    color: '#555',
  },
  deleteBtn: {
    marginLeft: 10,
  },
});

export default Cart;
