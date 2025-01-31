import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {useSelector} from 'react-redux';
import {addressStates} from '../slices/addressSlice';
import {cartStates} from '../slices/cartSlice';
import ButtonField from '../components/ButtonField';

const Order = ({navigation}) => {
  const {userAddress} = useSelector(addressStates);
  const {cartItems, totalCartPrice} = useSelector(cartStates);

  const handlePlaceOrder = () => {
    if (!userAddress) {
      Alert.alert(
        'Missing Address',
        'Please add a shipping address before placing an order.',
      );
      return;
    }
    Alert.alert('Order Placed', 'Your order has been successfully placed!');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={item => item.productId.toString()}
        contentContainerStyle={styles.flatListContent} // ✅ Added Padding for FlatList
        ListHeaderComponent={
          <View style={styles.orderContainer}>
            {/* Address Section */}
            {userAddress ? (
              <View style={styles.addressSection}>
                <Text style={styles.sectionTitle}>📍 Shipping Address</Text>
                <Text style={styles.value}>🏠 {userAddress.homeAddress} </Text>
                <Text style={styles.value}>📧 {userAddress.email} </Text>
                <Text style={styles.value}>📞 {userAddress.mobile} </Text>
                <Text style={styles.value}>
                  📌 {userAddress.pincode}, {userAddress.state}
                </Text>
              </View>
            ) : (
              <ButtonField
                onPress={() => navigation.navigate('Add-Address')}
                title={'Add Address'}
              />
            )}
            <Text style={styles.sectionTitle}>🛒 Order Summary</Text>
          </View>
        }
        renderItem={({item}) => (
          <View style={styles.cartItem}>
            <Image source={{uri: item.photo}} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.cartText}>
                {item.name} (x{item.quantity})
              </Text>
              <Text style={styles.cartPrice}>
                ₹{item.price * item.quantity}
              </Text>
            </View>
          </View>
        )}
        ListFooterComponent={
          <View style={styles.footerContainer}>
            <Text style={styles.totalPrice}>💰 Total: ₹{totalCartPrice}</Text>
          </View>
        }
      />

      {/* Sticky Bottom Button */}
      <TouchableOpacity style={styles.placeOrderBtn} onPress={handlePlaceOrder}>
        <Text style={styles.btnText}>Place Order</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Order;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  flatListContent: {
    padding: 15, // ✅ Prevents content from overlapping Place Order button
    paddingBottom:80
  },
  orderContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  addressSection: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#eef6ff',
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  value: {
    fontSize: 14,
    color: '#555',
    marginBottom: 3,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 10,
    resizeMode: 'contain',
  },
  itemDetails: {
    flex: 1,
  },
  cartText: {
    fontSize: 16,
    color: '#333',
  },
  cartPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  footerContainer: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    color: '#000',
  },
  placeOrderBtn: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#28a745',
    padding: 15,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
