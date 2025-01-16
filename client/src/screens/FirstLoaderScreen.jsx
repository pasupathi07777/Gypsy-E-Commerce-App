import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  Alert,
  TouchableOpacity,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { useDispatch } from 'react-redux';
import { getUserAuth } from '../slices/loginSlice';

const FirstPageLoader = ({ navigation }) => {
  const dispatch = useDispatch();
  const fadeAnim = new Animated.Value(0); // Initial opacity value for animation
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    // Check network connectivity
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
      if (state.isConnected) {
        // Fetch users and navigate based on response
        dispatch(getUserAuth())
          .unwrap()
          .then(() => {
            navigation.replace('Home');
          })
          .catch(err => {
            console.error('Error fetching users:', err);
            navigation.replace('Login');
          });
      }
    });

    // Fade-in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    return () => unsubscribe(); // Cleanup network listener
  }, [dispatch, fadeAnim, navigation]);

  const handleRetry = () => {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        setIsConnected(true);
      } else {
        Alert.alert('Still offline', 'Please check your connection!');
      }
    });
  };

  if (!isConnected) {
    // Show offline message
    return (
      <View style={styles.offlineContainer}>
        <Image
          source={require('../assets/img/no-network.jpg')} // Add a "no network" icon to assets
          style={styles.offlineIcon}
        />
        <Text style={styles.offlineText}>No Internet Connection</Text>
        <TouchableOpacity onPress={handleRetry} style={styles.retryButton}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoContainer, { opacity: fadeAnim }]}>
        <Image
          source={require('../assets/img/banner/bannerOne.png')} // Add a feather-related logo to assets
          style={styles.logo}
        />
        <Text style={styles.appName}>Feathrly</Text>
      </Animated.View>
      <Text style={styles.tagline}>Soaring to new heights</Text>
    </View>
  );
};

export default FirstPageLoader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87CEEB', // Sky blue background
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    tintColor: '#fff',
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  tagline: {
    fontSize: 18,
    color: '#f8f8f8',
    marginTop: 20,
  },
  offlineContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8d7da',
  },
  offlineIcon: {
    width: 120,
    height: 120,
    tintColor: '#721c24',
  },
  offlineText: {
    fontSize: 18,
    color: '#721c24',
    marginVertical: 10,
    fontWeight: 'bold',
  },
  retryButton: {
    backgroundColor: '#721c24',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 15,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
