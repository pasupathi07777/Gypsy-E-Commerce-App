import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Animated,
  ImageBackground,
  Image,
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
      // .unwrap()
      // .then(() => {
      //   navigation.navigate('Home');
      // })
      // .catch(() => {
      //   navigation.navigate('Login');
      // });
  }, [dispatch, fadeAnim, navigation]);



  return (
    <ImageBackground
      source={require('../assets/loder-screen/delivery.png')}
      style={styles.background}
      resizeMode="cover">
      <View style={styles.container}>
        <Animated.View style={[styles.logoContainer, {opacity: fadeAnim}]}>
          {/* <Text style={styles.appName}>Feathrly</Text> */}
          <Image
            style={styles.tinyLogo}
            source={require('../assets/gypy.png')}
          />
        </Animated.View>
        <ActivityIndicator size="large" color="#f03922" style={styles.loader} />
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
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  appName: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#1E90FF',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  tagline: {
    fontSize: 18,
    color: '#f03922',
    marginTop: 10,
  },
  loader: {
    // marginTop: 20,
  },
  tinyLogo: {
    height: 55, // Adjust this value to scale the logo properly
    width: 100, // Adjust this value as needed
    resizeMode: 'contain', // Ensures the logo maintains its aspect ratio
    // backgroundColor: 'gray',
  },
});
