import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Animated,
  ImageBackground,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {getUserAuth} from '../slices/loginSlice';

const FirstPageLoader = ({navigation}) => {
  const dispatch = useDispatch();
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    dispatch(getUserAuth())
      .unwrap()
      .then(() => {
        navigation.navigate('Home');
      })
      .catch(() => {
        navigation.navigate('Login');
      });
  }, [dispatch, fadeAnim, navigation]);

  return (
    <ImageBackground
      source={require('../assets/loder-screen/food-delivery-loder-screen.webp')} // Add your image path here
      style={styles.background}
      resizeMode="cover">
      <View style={styles.container}>
        <Animated.View style={[styles.logoContainer, {opacity: fadeAnim}]}>
          <Text style={styles.appName}>Feathrly</Text>
          <Text style={styles.tagline}>Soaring to new heights</Text>
        </Animated.View>
        <ActivityIndicator size="large" color="#1E90FF" style={styles.loader} />
      </View>
    </ImageBackground>
  );
};

export default FirstPageLoader;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Optional overlay
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  appName: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#1E90FF', // Bright blue color
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  tagline: {
    fontSize: 18,
    color: '#4682B4', // Subtle darker blue for the tagline
    marginTop: 10,
  },
  loader: {
    marginTop: 20,
  },
});
