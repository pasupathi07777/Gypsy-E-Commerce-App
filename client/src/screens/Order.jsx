
// import React, {useEffect, useState} from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   FlatList,
//   Image,
//   Alert,
//   TouchableOpacity,
// } from 'react-native';
// import {useDispatch, useSelector} from 'react-redux';
// import {addressStates} from '../slices/addressSlice';
// import {cartStates} from '../slices/cartSlice';
// import ButtonField from '../components/ButtonField';
// import {
//   orderStates,
//   placeCartProductOrder,
//   placeDirectOrder,
//   setDirectOrder,
// } from '../slices/orderSlice';
// import RNPickerSelect from 'react-native-picker-select';

// const Order = ({navigation}) => {
//   const {userAddress} = useSelector(addressStates);
//   const {cartItems, totalCartPrice} = useSelector(cartStates);
//   const {directOrder, placeCartProductOrderLoading} = useSelector(orderStates);

//   const dispatch = useDispatch();
//   const [deliveryType, setDeliveryType] = useState('cod');
//   const [quantity, setQuantity] = useState(directOrder ? 1 : 1);
//   console.log(directOrder);

//   const totalPrice = directOrder
//     ? directOrder.price * quantity
//     : totalCartPrice;

//   const handleIncrease = () => setQuantity(prev => prev + 1);
//   const handleDecrease = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

//   const handlePlaceOrder = () => {
//     if (!userAddress) {
//       Alert.alert(
//         'Missing Address',
//         'Please add a shipping address before placing an order.',
//       );
//       return;
//     }

//     if (directOrder) {
//       dispatch(
//         placeDirectOrder({productId: directOrder._id, quantity, deliveryType}),
//       )
//         .unwrap()
//         .then(() => {
//           dispatch(setDirectOrder(null));
//           navigation.navigate('Order-Confirm');
//         });
//     } else {
//       dispatch(placeCartProductOrder())
//         .unwrap()
//         .then(() => {
//           navigation.navigate('Order-Confirm');
//         });
//     }
//   };

//   // useEffect(() => {
//   //   if (!directOrder && cartItems.length < 1) {
//   //     navigation.navigate('Home');
//   //   }
//   //   return () => dispatch(setDirectOrder(null)); // Reset directOrder after navigation
//   // }, [cartItems, directOrder, navigation]);

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={directOrder ? [directOrder] : cartItems}
//         keyExtractor={item => item._id || item.productId.toString()}
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
//                   items={[{label: 'Cash on Delivery', value: 'cod'}]}
//                   placeholder={{label: 'Select Delivery Type', value: 'cod'}}
//                   value={deliveryType}
//                   style={{
//                     inputAndroid: styles.inputField,
//                     inputIOS: styles.inputField,
//                     iconContainer: {top: 10, right: 12},
//                   }}
//                 />
//               </View>
//             </View>

//             <Text style={styles.sectionTitle}>🛒 Order Summary</Text>
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
//               {directOrder ? (
//                 <View style={styles.quantityContainer}>
//                   <TouchableOpacity
//                     onPress={handleDecrease}
//                     style={styles.quantityBtn}>
//                     <Text style={styles.quantityText}>➖</Text>
//                   </TouchableOpacity>
//                   <Text style={styles.quantityText}>{quantity}</Text>
//                   <TouchableOpacity
//                     onPress={handleIncrease}
//                     style={styles.quantityBtn}>
//                     <Text style={styles.quantityText}>➕</Text>
//                   </TouchableOpacity>
//                 </View>
//               ) : (
//                 <Text style={styles.cartPrice}>Qty: {item.quantity}</Text>
//               )}
//               <Text style={styles.cartPrice}>
//                 ₹
//                 {directOrder
//                   ? item.price * quantity
//                   : item.price * item.quantity}
//               </Text>
//             </View>
//           </View>
//         )}
//       />

//       <View style={styles.footerContainer}>
//         <Text style={styles.totalPrice}>Total: ₹{totalPrice}</Text>
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

// export default Order;

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
//   },
//   cartPrice: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#000',
//   },
//   quantityContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 5,
//   },
//   quantityBtn: {
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     backgroundColor: '#ddd',
//     borderRadius: 5,
//     marginHorizontal: 5,
//   },
//   quantityText: {
//     fontSize: 16,
//     fontWeight: 'bold',
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
