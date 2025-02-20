// import React, {useState} from 'react';
// import {StyleSheet, Text, View, FlatList, Image, Alert} from 'react-native';
// import {useDispatch, useSelector} from 'react-redux';
// import {addressStates} from '../slices/addressSlice';
// import {cartStates} from '../slices/cartSlice';
// import ButtonField from '../components/ButtonField';
// import {orderStates, placeCartProductOrder} from '../slices/orderSlice';
// import RNPickerSelect from 'react-native-picker-select';
// import Header from '../components/Header';


// const CartOrder = ({navigation}) => {
//   const {userAddress} = useSelector(addressStates);
//   const {cartItems, totalCartPrice} = useSelector(cartStates);
//   const {placeCartProductOrderLoading} = useSelector(orderStates);

//   const dispatch = useDispatch();
//   const [deliveryType, setDeliveryType] = useState(null); 

//   const handlePlaceOrder = () => {
//     if (!userAddress) {
//       Alert.alert(
//         'Missing Address',
//         'Please add a shipping address before placing an order.',
//       );
//       return;
//     }

//     if (!deliveryType) {
//       Alert.alert(
//         'Delivery Type Required',
//         'Please select a delivery type before proceeding.',
//       );
//       return;
//     }

//     if (cartItems.length > 0) {
//       dispatch(placeCartProductOrder({deliveryType}))
//         .unwrap()
//         .then(() => {
//           navigation.navigate('Order-Confirm');
//         });
//     }
//   };

//   return (
//     <View style={styles.container}>
//         <Header btnVisibility={false} topic={'Order Summary'} navigation={navigation} />
//       <FlatList
//         data={cartItems}
//         keyExtractor={item => item.productId.toString()}
//         contentContainerStyle={styles.flatListContent}
//         ListHeaderComponent={
//           <View style={styles.orderContainer}>
//             <View style={styles.addressSection}>
//               <Text style={styles.sectionTitle}>📍 Shipping Address</Text>
//               <Text style={styles.value}>
//                 🏠 {userAddress?.homeAddress || 'No Address'}
//               </Text>
//               <Text style={styles.value}>📧 {userAddress?.email || 'N/A'}</Text>
//               <Text style={styles.value}>
//                 📞 {userAddress?.mobile || 'N/A'}
//               </Text>
//               <Text style={styles.value}>
//                 📌 {userAddress?.pincode || 'N/A'},{userAddress?.state || 'N/A'}
//               </Text>

//               <View style={styles.deliveryTypeContainer}>
//                 <Text style={styles.sectionTitle}>🚚 Delivery Type</Text>
//                 <RNPickerSelect
//                   onValueChange={value => setDeliveryType(value)}
//                   items={[
//                     {label: 'Cash on Delivery', value: 'cod'},
//                   ]}
//                   placeholder={{label: 'Select Delivery Type', value: null}}
//                   value={deliveryType}
//                   style={{
//                     inputAndroid: styles.inputField,
//                     inputIOS: styles.inputField,
//                     iconContainer: {top: 10, right: 12},
//                   }}
//                 />
//               </View>
//             </View>

//             {/* <Text style={styles.sectionTitle}>🛒 Order Summary</Text> */}
//           </View>
//         }
//         renderItem={({item}) => (
//           <View style={styles.cartItem}>
//             <Image
//               source={{uri: item.photo || item.photos[0]}}
//               style={styles.itemImage}
//             />
//             <View style={styles.itemDetails}>
//               <Text style={styles.cartText}>{item.name}</Text>
//               <Text style={styles.cartPrice}>Qty: {item.quantity}</Text>
//               <Text style={styles.cartPrice}>
//                 ₹{item.price * item.quantity}
//               </Text>
//             </View>
//           </View>
//         )}
//       />

//       <View style={styles.footerContainer}>
//         <Text style={styles.totalPrice}>Total: ₹{totalCartPrice}</Text>
//         <ButtonField
//           loading={placeCartProductOrderLoading}
//           title={'Place Order'}
//           style={styles.placeOrderBtn}
//           onPress={handlePlaceOrder}
//         />
//       </View>
//     </View>
//   );
// };

// export default CartOrder;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f8f8f8',
//   },
//   flatListContent: {
//     paddingBottom: 100,
//   },
//   orderContainer: {
//     backgroundColor: '#fff',
//     padding: 15,
//     marginBottom: 10,
//   },
//   addressSection: {
//     marginBottom: 20,
//     padding: 10,
//     backgroundColor: '#eef6ff',
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 5,
//     color: '#333',
//   },
//   value: {
//     fontSize: 14,
//     color: '#555',
//     marginBottom: 3,
//   },
//   cartItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 10,
//     paddingHorizontal: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ddd',
//     gap: 10,
//   },
//   itemImage: {
//     width: 70,
//     height: 70,
//     borderRadius: 8,
//     marginRight: 10,
//     resizeMode: 'contain',
//   },
//   itemDetails: {
//     flex: 1,
//   },
//   cartText: {
//     fontSize: 16,
//     color: '#333',
//     textTransform: 'capitalize',
//   },
//   cartPrice: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#000',
//   },
//   deliveryTypeContainer: {
//     marginTop: 10,
//   },
//   inputField: {
//     backgroundColor: '#fff',
//     paddingVertical: 10,
//     paddingHorizontal: 12,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     fontSize: 14,
//     color: '#333',
//   },
//   footerContainer: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     borderTopWidth: 1,
//     borderColor: '#ddd',
//   },
//   totalPrice: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#000',
//     paddingHorizontal: 10,
//     flex: 1,
//     textAlign: 'center',
//   },
//   placeOrderBtn: {
//     backgroundColor: '#28a745',
//     padding: 15,
//     alignItems: 'center',
//     flex: 1,
//   },
// });
import React, {useState} from 'react';
import {StyleSheet, Text, View, FlatList, Image, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addressStates} from '../slices/addressSlice';
import {cartStates} from '../slices/cartSlice';
import ButtonField from '../components/ButtonField';
import {orderStates, placeCartProductOrder} from '../slices/orderSlice';
import RNPickerSelect from 'react-native-picker-select';
import Header from '../components/Header';

const CartOrder = ({navigation}) => {
  const {userAddress} = useSelector(addressStates);
  const {cartItems, totalCartPrice} = useSelector(cartStates);
  const {placeCartProductOrderLoading} = useSelector(orderStates);

  const dispatch = useDispatch();
  const [deliveryType, setDeliveryType] = useState(null);

  const handlePlaceOrder = () => {
    if (!userAddress) {
      Alert.alert(
        'Missing Address',
        'Please add a shipping address before placing an order.',
      );
      return;
    }

    if (!deliveryType) {
      Alert.alert(
        'Delivery Type Required',
        'Please select a delivery type before proceeding.',
      );
      return;
    }

    if (cartItems.length > 0) {
      dispatch(placeCartProductOrder({deliveryType}))
        .unwrap()
        .then(() => {
          navigation.navigate('Order-Confirm');
        });
    }
  };

  return (
    <View style={styles.container}>
      <Header btnVisibility={false} topic={'Order Summary'} navigation={navigation} />
      <FlatList
        data={cartItems}
        keyExtractor={item => item.productId.toString()}
        contentContainerStyle={styles.flatListContent}
        ListHeaderComponent={
          <View style={styles.orderContainer}>
            <View style={styles.addressSection}>
              <Text style={styles.sectionTitle}>📍 Shipping Address</Text>

              {userAddress ? (
                <>
                  <Text style={styles.value}>🏠 {userAddress?.homeAddress || 'No Address'}</Text>
                  <Text style={styles.value}>📧 {userAddress?.email || 'N/A'}</Text>
                  <Text style={styles.value}>📞 {userAddress?.mobile || 'N/A'}</Text>
                  <Text style={styles.value}>
                    📌 {userAddress?.pincode || 'N/A'},{userAddress?.state || 'N/A'}
                  </Text>
                </>
              ) : (
                <ButtonField
                  title={'Add Address'}
                  style={styles.addAddressBtn}
                  onPress={() => navigation.navigate('Add-Address')}
                />
              )}

              <View style={styles.deliveryTypeContainer}>
                <Text style={styles.sectionTitle}>🚚 Delivery Type</Text>
                <RNPickerSelect
                  onValueChange={value => setDeliveryType(value)}
                  items={[
                    {label: 'Cash on Delivery', value: 'cod'},
                  ]}
                  placeholder={{label: 'Select Delivery Type', value: null}}
                  value={deliveryType}
                  style={{
                    inputAndroid: styles.inputField,
                    inputIOS: styles.inputField,
                    iconContainer: {top: 10, right: 12},
                  }}
                />
              </View>
            </View>
          </View>
        }
        renderItem={({item}) => (
          <View style={styles.cartItem}>
            <Image
              source={{uri: item.photo || item.photos[0]}}
              style={styles.itemImage}
            />
            <View style={styles.itemDetails}>
              <Text style={styles.cartText}>{item.name}</Text>
              <Text style={styles.cartPrice}>Qty: {item.quantity}</Text>
              <Text style={styles.cartPrice}>
                ₹{item.price * item.quantity}
              </Text>
            </View>
          </View>
        )}
      />

      <View style={styles.footerContainer}>
        <Text style={styles.totalPrice}>Total: ₹{totalCartPrice}</Text>
        <ButtonField
          loading={placeCartProductOrderLoading}
          title={'Place Order'}
          style={styles.placeOrderBtn}
          onPress={handlePlaceOrder}
        />
      </View>
    </View>
  );
};

export default CartOrder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  flatListContent: {
    paddingBottom: 100,
  },
  orderContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
  },
  addressSection: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#eef6ff',
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
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    gap: 10,
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
    textTransform: 'capitalize',
  },
  cartPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  deliveryTypeContainer: {
    marginTop: 10,
  },
  inputField: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    fontSize: 14,
    color: '#333',
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    paddingHorizontal: 10,
    flex: 1,
    textAlign: 'center',
  },
  placeOrderBtn: {
    backgroundColor: '#28a745',
    padding: 15,
    alignItems: 'center',
    flex: 1,
  },
  addAddressBtn: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
});
