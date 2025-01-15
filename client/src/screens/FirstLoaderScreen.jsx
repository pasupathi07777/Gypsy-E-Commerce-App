
import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch} from 'react-redux';
import {getUserAuth} from '../slices/authSlices/loginSlice';

const {width, height} = Dimensions.get('window');  
const FirstLoaderScreen = ({navigation}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getToken = async () => {
      dispatch(getUserAuth())
        .unwrap()
        .then(() => {
          navigation.navigate('home');
        })
        .catch(err => {
          console.log(err);
          navigation.navigate('login');
        });
    };
    getToken();
  }, []);

  return (
    <LinearGradient colors={['#6200EE', '#FF6F61']} style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.logoText}>TeachWave</Text>
        <ActivityIndicator size="large" color="#FFFFFF" style={styles.loader} />
        <Text style={styles.loadingText}>
          Empowering Education, One Wave at a Time...
        </Text>
      </View>
    </LinearGradient>
  );
};

export default FirstLoaderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logoText: {
    fontSize: Math.min(36, width * 0.1), // Responsive font size
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 5,
    marginBottom: height * 0.03,
    textAlign: 'center',
  },
  loader: {
    marginBottom: height * 0.02,
  },
  loadingText: {
    fontSize: Math.min(16, width * 0.04),
    color: '#FFFFFF',
    textAlign: 'center',
    fontStyle: 'italic',
    marginHorizontal: width * 0.1,
  },
});
