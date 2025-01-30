import React, {useEffect} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getAddress} from '../redux/addressSlice';
import {getCartItems} from '../redux/cartSlice';

const Order = () => {
  const dispatch = useDispatch();
  const {userAddress} = useSelector(state => state.address);
  const {cartItems, totalCartPrice} = useSelector(state => state.cart);

  useEffect(() => {
    dispatch(getAddress());
    dispatch(getCartItems());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      {/* Address Section */}
      {userAddress && (
        <View style={styles.addressDetails}>
          <Text style={styles.label}>🏠 Home Address:</Text>
          <Text style={styles.value}>{userAddress.homeAddress}</Text>
          <Text style={styles.label}>📧 Email:</Text>
          <Text style={styles.value}>{userAddress.email}</Text>
          <Text style={styles.label}>📞 Mobile:</Text>
          <Text style={styles.value}>{userAddress.mobile}</Text>
          <Text style={styles.label}>📍 Pincode:</Text>
          <Text style={styles.value}>{userAddress.pincode}</Text>
          <Text style={styles.label}>📍 State:</Text>
          <Text style={styles.value}>{userAddress.state}</Text>
        </View>
      )}

      {/* Cart Items Section */}
      <FlatList
        data={cartItems}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.cartItem}>
            <Text style={styles.cartText}>{item.productName}</Text>
            <Text style={styles.cartText}>
              ₹{item.price} x {item.quantity}
            </Text>
          </View>
        )}
      />

      {/* Total Price */}
      <Text style={styles.totalPrice}>Total: ₹{totalCartPrice}</Text>

      {/* Place Order Button */}
      <TouchableOpacity style={styles.placeOrderBtn}>
        <Text style={styles.btnText}>Place Order</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Order;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  addressDetails: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  value: {
    fontSize: 14,
    marginBottom: 5,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  cartText: {
    fontSize: 16,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    marginTop: 10,
  },
  placeOrderBtn: {
    marginTop: 20,
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
