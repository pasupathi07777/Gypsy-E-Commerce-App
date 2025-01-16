import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { signupState, signupUser } from '../slices/signupSlice';
import ButtonField from '../components/ButtonField';

const Signup = ({ navigation }) => {
  const dispatch = useDispatch()
  const { signupLoading } = useSelector(signupState)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
  });

  const handleInputChange = (field, value) => {
    setFormData(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };


  const onSubmit = async () => {
    dispatch(signupUser(formData))
      .unwrap()
      .then(() => {
        // Alert.alert('Success', 'Signup successful. You can now log in!');
        navigation.navigate('Verify-Otp');
      })
      .catch(err => {
        console.log(err?.error?.message || 'Something went wrong');
        console.log(err);
      });
      


  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Create Your Account</Text>

      {/* Username Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter your username"
        placeholderTextColor="#aaa"
        value={formData.username}
        onChangeText={value => handleInputChange('username', value)}
      />

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
        value={formData.email}
        onChangeText={value => handleInputChange('email', value)}
      />

      {/* Signup Button */}
      {/* <TouchableOpacity style={styles.signupButton}>
        <Text style={styles.signupButtonText}>Verify Email</Text>
      </TouchableOpacity> */}
      <ButtonField loading={signupLoading} onPress={onSubmit} title={"Verify Email"} />

      {/* Already Have an Account? */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.footerLink}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 1, // For Android shadow
  },
  signupButton: {
    backgroundColor: '#FF5722',
    width: '100%',
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#777',
    marginRight: 5,
  },
  footerLink: {
    color: '#007bff',
    fontWeight: 'bold',
  },
});
