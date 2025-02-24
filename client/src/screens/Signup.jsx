import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import ButtonField from '../components/ButtonField';
import InputFeild from '../components/InputFeild';
import { useDispatch, useSelector } from 'react-redux';
import { signupState, signupUser } from '../slices/signupSlice';

const Signup = ({ navigation }) => {
  const dispatch = useDispatch();
  const { signupLoading } = useSelector(signupState);
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
        navigation.navigate('Verify-Otp');
      })
      .catch(err => {
        console.log(err?.error?.message || 'Something went wrong');
        console.log(err);
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Image */}
        <Image
          style={styles.img}
          source={require('../assets/loder-screen/delivery.png')}
        />

        {/* Header Text */}
        <Text style={styles.title}>Create your new account</Text>
        <Text style={styles.subtitle}>
          Create an account to start looking for the food you like
        </Text>

        {/* Username Input */}
        <Text style={styles.lable}>User Name</Text>
        <InputFeild
          style={styles.input}
          placeholder="User Name"
          placeholderTextColor="#aaa"
          value={formData.username}
          onChangeText={value => handleInputChange('username', value)}
        />

        {/* Email Input */}
        <Text style={styles.lable}>Email Address</Text>
        <InputFeild
          style={styles.input}
          placeholder="Email Address"
          placeholderTextColor="#aaa"
          value={formData.email}
          onChangeText={value => handleInputChange('email', value)}
        />

        {/* Register Button */}
        <ButtonField
          title="Register"
          onPress={onSubmit}
          style={styles.btn}
          loading={signupLoading}
        />

        {/* Or Section with Lines */}
        <View style={styles.orContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>Or</Text>
          <View style={styles.line} />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.signupLink}> Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Signup;

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
    // marginBottom: 16,
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
    marginVertical: 20,
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical:10
  },
  footerText: {
    fontSize: 14,
    color: '#555',
  },
  signupLink: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ff9800',
  },
});
