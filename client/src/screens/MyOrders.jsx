import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ActivityIndicator,
  Pressable,
  Alert,
} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getOurOrder, orderStates, cancelOrder, setCancelOrderIds} from '../slices/orderSlice';
import Header from '../components/Header';
import ButtonField from '../components/ButtonField';

const MyOrders = ({navigation}) => {
  const dispatch = useDispatch();
  const {userOrders, getUserOrderLoading, cancelOrderLoading, cancelOrderIds} =
    useSelector(orderStates);

const handleCancelOrder = orderId => {

  Alert.alert(
    'Confirm Cancellation',
    'Are you sure you want to cancel this order?',
    [
      {
        text: 'Cancel', 
        style: 'cancel', 
      },
      {
        text: 'OK', 
        onPress: () => {

          console.log('Cancelling order:', orderId);
          dispatch(setCancelOrderIds(orderId));
          dispatch(cancelOrder(orderId))
        },
      },
    ],
    {cancelable: true},
  );
};

  if (getUserOrderLoading) {
    return <ActivityIndicator size="large" color="blue" />;
  }

  const productOnclick = id => {
    console.log(id);
    navigation.navigate('Product', {id});
  };

  return (
    <View style={styles.container}>
      <Header topic={'My Order'} navigation={navigation} />

      <FlatList
        style={styles.orders}
        data={userOrders}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <View style={styles.orderCard}>
            <Text style={styles.orderId}>Order ID: {item._id}</Text>
            <Text>Order At: {new Date(item.createdAt).toLocaleString()}</Text>
            <Text>Total Amount: ₹{item.totalAmount}</Text>
            <Text>Order Status: {item.orderStatus}</Text>
            <Text>Payment Status: {item.paymentStatus}</Text>

            <View style={styles.addressContainer}>
              <Text style={styles.addressTitle}>Shipping Address</Text>
              <Text>{item.address?.homeAddress}</Text>
              <Text>
                {item.address?.state} - {item.address?.pincode}
              </Text>
              <Text>{item.address?.mobile}</Text>
            </View>

            <View style={styles.itemContainer}>
              <Text style={styles.itemHeader}>Items:</Text>
              <FlatList
                data={[item]}
                keyExtractor={prod => prod.productId}
                showsVerticalScrollIndicator={false}
                renderItem={({item: prod}) => (
                  <Pressable
                    style={styles.itemRow}
                    onPress={() => productOnclick(prod.productId)}>
                    <Image
                      source={{uri: prod.photos?.[0]}}
                      style={styles.itemImage}
                    />
                    <View style={styles.itemDetails}>
                      <Text style={styles.itemText}>{prod.name}</Text>
                      <Text>
                        Qty: {prod.quantity} | ₹{prod.price}
                      </Text>
                    </View>
                  </Pressable>
                )}
              />
            </View>

            {item.orderStatus === 'Placed' && (
              <ButtonField
                loading={cancelOrderIds.includes(item._id) && cancelOrderLoading}
                title={'Cancel Order'}
                style={styles.cancelButton}
                onPress={() => handleCancelOrder(item._id)}
              />
            )}
          </View>
        )}
      />
    </View>
  );
};

export default MyOrders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  orderCard: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  addressContainer: {
    marginTop: 8,
    padding: 10,
    backgroundColor: '#f1f1f1',
  },
  addressTitle: {
    fontWeight: 'bold',
    marginBottom: 3,
  },
  itemContainer: {
    marginTop: 10,
  },
  itemHeader: {
    fontWeight: 'bold',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
    resizeMode: 'contain',
  },
  itemDetails: {
    flex: 1,
  },
  itemText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: 'red',
    padding: 8,
    marginTop: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  orders: {
    padding: 15,
    // paddingVertical:30
    // marginBottom:30
  },
});
