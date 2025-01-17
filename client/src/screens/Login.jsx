import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { loginState, loginUser } from '../slices/loginSlice';
import { useDispatch, useSelector } from 'react-redux';
import ButtonField from '../components/ButtonField';
import InputFeild from '../components/InputFeild';

const EmailVerifyLogin = ({ navigation }) => {
  const { loginLoading } = useSelector(loginState);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');

  const onSubmit = () => {
    dispatch(loginUser({ email }))
      .unwrap()
      .then(() => {
        navigation.navigate('Verify-Otp');
      })
      .catch(err => {
        console.error('Error logging in:', err);
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Image
          style={styles.img}
          source={require('../assets/loder-screen/delivery.png')}
        />
        {/* Title */}
        <Text style={styles.title}>Login to your account.</Text>
        <Text style={styles.subtitle}>Please sign in to your account</Text>

        {/* Email Input */}
        <Text style={styles.lable}>Email Address</Text>
        <InputFeild
          style={styles.input}
          placeholder="Enter Email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
        />

        {/* Sign In Button */}
        <ButtonField
          style={styles.btn}
          onPress={onSubmit}
          loading={loginLoading}
          title="Sign In"
        />

        {/* Or Section with Lines */}
        <View style={styles.orContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>Or</Text>
          <View style={styles.line} />
        </View>

        {/* Signup */}
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don’t have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.signupLink}> Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default EmailVerifyLogin;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',

  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    paddingVertical: 20,
    paddingVertical: 20,
  },
  img: {
    height: 250,
    width: '100%',
    resizeMode: 'cover',
    backgroundColor: 'red',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    color: '#000',
  },
  lable: {
    marginBottom: 6,
    color: '#000',
    fontSize: 14,
  },
  btn: {
    backgroundColor: '#FEAB0D',
    borderRadius: 30,
    width: '80%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 'auto',
    // marginTop
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 16,
    color: '#555',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signupText: {
    fontSize: 14,
    color: '#555',
  },
  signupLink: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ff9800',
  },
});
