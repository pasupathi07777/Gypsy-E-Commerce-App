import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ActivityIndicator,
  Pressable,
  Alert,
  Animated,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  getOurOrder,
  orderStates,
  cancelOrder,
  setCancelOrderIds,
} from '../slices/orderSlice';
import Header from '../components/Header';
import ButtonField from '../components/ButtonField';

const OrderStatusIndicator = ({status, isCanceled}) => {
  const progress = new Animated.Value(0);

  useEffect(() => {
    let progressValue = 0;
    if (isCanceled) {
      progressValue = 0.33;
    } else {
      switch (status) {
        case 'Placed':
          progressValue = 0.25;
          break;
        case 'Shipped':
          progressValue = 0.5;
          break;
        case 'Out for Delivery':
          progressValue = 0.75;
          break;
        case 'Delivered':
          progressValue = 1;
          break;
        default:
          progressValue = 0;
      }
    }
    Animated.timing(progress, {
      toValue: progressValue,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [status, isCanceled]);

  const widthInterpolation = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.progressBarContainer}>
      <View style={styles.progressBarBackground}>
        <Animated.View
          style={[
            styles.progressBarFill,
            {
              width: widthInterpolation,
              backgroundColor: isCanceled ? 'red' : 'green',
            },
          ]}
        />
      </View>
      <View style={styles.statusTextContainer}>
        <Text style={styles.statusText}>Placed</Text>
        <Text style={styles.statusText}>Shipped</Text>
        <Text style={styles.statusText}>Out for Delivery</Text>
        <Text style={styles.statusText}>Delivered</Text>
      </View>
      {isCanceled && <Text style={styles.canceledText}>Canceled</Text>}
    </View>
  );
};

const MyOrders = ({navigation}) => {
  const dispatch = useDispatch();
  const {userOrders, getUserOrderLoading, cancelOrderLoading, cancelOrderIds} =
    useSelector(orderStates);

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(getOurOrder()); // Fetch orders initially
  }, [dispatch]);

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(getOurOrder()); // Refresh orders
    setRefreshing(false);
  };

  const handleCancelOrder = orderId => {
    Alert.alert(
      'Confirm Cancellation',
      'Are you sure you want to cancel this order?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'OK',
          onPress: () => {
            dispatch(setCancelOrderIds(orderId));
            dispatch(cancelOrder(orderId));
          },
        },
      ],
      {cancelable: true},
    );
  };

  const productOnclick = id => {
    navigation.navigate('Product', {id});
  };

  return (
    <View style={styles.container}>
      <Header topic={'My Order'} navigation={navigation} />

      {getUserOrderLoading && !refreshing ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      ) : (
        <FlatList
          style={styles.orders}
          data={userOrders}
          keyExtractor={item => item._id}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({item}) => {
            const isCanceled = item.orderStatus === 'Cancelled';

            return (
              <View style={styles.orderCard}>
                <Text style={styles.orderId}>Order ID: {item._id}</Text>
                <Text>
                  Order At: {new Date(item.createdAt).toLocaleString()}
                </Text>
                <Text>Total Amount: ₹{item.totalAmount}</Text>
                <Text>Payment Status: {item.paymentStatus}</Text>

                {/* Order Status Indicator */}
                <OrderStatusIndicator
                  status={item.orderStatus}
                  isCanceled={isCanceled}
                />

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
                          source={{
                            uri: prod.photos?.[0] || 'default-image-url',
                          }}
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

                {/* Cancel Order Button */}
                {item.orderStatus === 'Placed' && (
                  <ButtonField
                    loading={
                      cancelOrderIds.includes(item._id) && cancelOrderLoading
                    }
                    title={'Cancel Order'}
                    style={styles.cancelButton}
                    onPress={() => handleCancelOrder(item._id)}
                  />
                )}
              </View>
            );
          }}
        />
      )}
    </View>
  );
};

export default MyOrders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  progressBarContainer: {
    marginTop: 10,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: '#ddd',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
  },
  statusTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  statusText: {
    fontSize: 12,
  },
  canceledText: {
    textAlign: 'center',
    color: 'red',
    fontWeight: 'bold',
    marginTop: 5,
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
  orders: {
    padding: 15,
  },
});
