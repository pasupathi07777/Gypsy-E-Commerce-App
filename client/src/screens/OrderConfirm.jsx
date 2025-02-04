import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Animated, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const OrderConfirm = ({navigation}) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.5));
  const [rotateAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    // Start animation effects
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, scaleAnim, rotateAnim]);

  const handleGoBack = () => {
    navigation.navigate('MyOrders'); 
  };

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.iconContainer,
          {
            opacity: fadeAnim,
            transform: [{scale: scaleAnim}, {rotate: rotateInterpolate}],
          },
        ]}>
        <Icon name="check-circle" size={150} color="#28a745" />
      </Animated.View>

      <Animated.View style={[styles.confirmationMessage, {opacity: fadeAnim}]}>
        <Text style={styles.text}>🎉 Order Confirmed! 🎉</Text>
        <Text style={styles.subText}>
          Your order has been successfully placed.
        </Text>
      </Animated.View>

      <TouchableOpacity style={styles.button} onPress={handleGoBack}>
        <Text style={styles.buttonText}>Back to Order Page</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OrderConfirm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  iconContainer: {
    marginBottom: 30,
  },
  confirmationMessage: {
    marginBottom: 40,
    alignItems: 'center',
  },
  text: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  subText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#555',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
