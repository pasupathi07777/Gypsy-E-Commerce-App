// import React, {useEffect, useState} from 'react';
// import {StyleSheet, Text, View, Animated, Button} from 'react-native';
// import {useNavigation} from '@react-navigation/native';

// const OrderConfirm = () => {
//   const [fadeAnim] = useState(new Animated.Value(0)); // Initial opacity is 0
//   const navigation = useNavigation();

//   // Fade-in animation for the confirmation message
//   useEffect(() => {
//     Animated.timing(fadeAnim, {
//       toValue: 1, // Target opacity is 1 (fully visible)
//       duration: 1500, // Duration of the fade-in
//       useNativeDriver: true, // Use native driver for smoother animation
//     }).start();
//   }, [fadeAnim]);

//   const handleGoBack = () => {
//     navigation.navigate('Order');
//   };

//   return (
//     <View style={styles.container}>
//       <Animated.View style={[styles.confirmationMessage, {opacity: fadeAnim}]}>
//         <Text style={styles.text}>🎉 Order Confirmed! 🎉</Text>
//         <Text style={styles.text}>
//           Your order has been successfully placed.
//         </Text>
//       </Animated.View>

//       <Button title="Back to Order Page" onPress={handleGoBack} />
//     </View>
//   );
// };

// export default OrderConfirm;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f8f8f8',
//   },
//   confirmationMessage: {
//     marginBottom: 20,
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 10,
//     color: '#333',
//   },
// });
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Animated, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import icons

const OrderConfirm = () => {
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial opacity is 0
  const [scaleAnim] = useState(new Animated.Value(0.5)); // Initial scale is 0.5
  const [rotateAnim] = useState(new Animated.Value(0)); // Initial rotation is 0
  const navigation = useNavigation();

  // Fade-in, scale-up, and rotate animation
  useEffect(() => {
    // Fade-in animation
    Animated.timing(fadeAnim, {
      toValue: 1, // Target opacity is 1 (fully visible)
      duration: 1500, // Duration of the fade-in
      useNativeDriver: true, // Use native driver for smoother animation
    }).start();

    // Scale-up animation
    Animated.timing(scaleAnim, {
      toValue: 1, // Target scale is 1 (original size)
      duration: 1000, // Duration of the scale-up
      useNativeDriver: true, // Use native driver for smoother animation
    }).start();

    // Rotate animation
    Animated.timing(rotateAnim, {
      toValue: 1, // Target rotation is 1 (360 degrees)
      duration: 2000, // Duration of the rotation
      useNativeDriver: true, // Use native driver for smoother animation
    }).start();
  }, [fadeAnim, scaleAnim, rotateAnim]);

  const handleGoBack = () => {
    navigation.navigate('MyOrders');
  };

  // Interpolate rotation value
  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'], // Rotate from 0 to 360 degrees
  });

  return (
    <View style={styles.container}>
      {/* Animated Icon */}
      <Animated.View
        style={[
          styles.iconContainer,
          {
            opacity: fadeAnim,
            transform: [
              {scale: scaleAnim}, // Apply scale animation
              {rotate: rotateInterpolate}, // Apply rotation animation
            ],
          },
        ]}>
        <Icon name="check-circle" size={150} color="#28a745" />
      </Animated.View>

      {/* Confirmation Message */}
      <Animated.View style={[styles.confirmationMessage, {opacity: fadeAnim}]}>
        <Text style={styles.text}>🎉 Order Confirmed! 🎉</Text>
        <Text style={styles.subText}>
          Your order has been successfully placed.
        </Text>
      </Animated.View>

      {/* Back Button */}
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

  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});