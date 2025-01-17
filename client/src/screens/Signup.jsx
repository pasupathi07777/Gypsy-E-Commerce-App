// import React, { useState } from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   TouchableOpacity,
// } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
// import { signupState, signupUser } from '../slices/signupSlice';
// import ButtonField from '../components/ButtonField';
// import InputFeild from '../components/InputFeild';

// const Signup = ({ navigation }) => {
//   const dispatch = useDispatch()
//   const { signupLoading } = useSelector(signupState)
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//   });

//   const handleInputChange = (field, value) => {
//     setFormData(prevState => ({
//       ...prevState,
//       [field]: value,
//     }));
//   };

//   const onSubmit = async () => {
//     dispatch(signupUser(formData))
//       .unwrap()
//       .then(() => {
//         // Alert.alert('Success', 'Signup successful. You can now log in!');
//         navigation.navigate('Verify-Otp');
//       })
//       .catch(err => {
//         console.log(err?.error?.message || 'Something went wrong');
//         console.log(err);
//       });

//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.welcomeText}>Create Your Account</Text>

//       <InputFeild
//         style={styles.input}
//         placeholder="Enter your username"
//         placeholderTextColor="#aaa"
//         value={formData.username}
//         onChangeText={value => handleInputChange('username', value)}
//       />

//       <InputFeild
//         style={styles.input}
//         placeholder="Enter your email"
//         placeholderTextColor="#aaa"
//         value={formData.email}
//         onChangeText={value => handleInputChange('email', value)}
//       />

//       <ButtonField
//         loading={signupLoading}
//         onPress={onSubmit}
//         title={'Verify Email'}
//       />

//       <View style={styles.footer}>
//         <Text style={styles.footerText}>Already have an account?</Text>
//         <TouchableOpacity onPress={() => navigation.navigate('Login')}>
//           <Text style={styles.footerLink}>Login</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default Signup;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingHorizontal: 20,
//   },
//   welcomeText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   input: {
//     width: '100%',
//     height: 50,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     paddingHorizontal: 15,
//     // marginBottom: 20,
//     fontSize: 16,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 4,
//     elevation: 1, // For Android shadow
//   },
//   signupButton: {
//     backgroundColor: '#FF5722',
//     width: '100%',
//     height: 50,
//     borderRadius: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 20,
//     shadowColor: '#000',
//     shadowOpacity: 0.2,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   signupButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   footer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   footerText: {
//     fontSize: 14,
//     color: '#777',
//     marginRight: 5,
//   },
//   footerLink: {
//     color: '#007bff',
//     fontWeight: 'bold',
//   },
// });

import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import ButtonField from '../components/ButtonField';
import InputFeild from '../components/InputFeild';
import {useDispatch, useSelector} from 'react-redux';
import {signupState, signupUser} from '../slices/signupSlice';

const Signup = ({navigation}) => {
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
        navigation.navigate('Verify-Otp');
      })
      .catch(err => {
        console.log(err?.error?.message || 'Something went wrong');
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      {/* Header Text */}
      <Text style={styles.headerText}>Create your new account</Text>
      <Text style={styles.subHeaderText}>
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
        style={styles.registerButton}
        loading={signupLoading}
      />

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.footerLink}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'start',
    marginBottom: 8,
  },
  subHeaderText: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'start',
    marginBottom: 50,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000', 
    shadowOffset: {width: 0, height: 2}, 
    shadowOpacity: 0.1, 
    shadowRadius: 4, 
    elevation: 4, 
    color: '#000',
  },
  lable: {
    marginBottom: 6,
    color: '#000',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginRight: 8,
  },
  termsText: {
    fontSize: 14,
    color: '#666',
  },
  linkText: {
    color: '#007bff',
    fontWeight: 'bold',
  },
  registerButton: {
    width: '100%',
    backgroundColor: '#FFD65A',
    height: 50,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  orText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginVertical: 12,
  },
  socialIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  socialIcon: {
    width: 50,
    height: 50,
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    marginHorizontal: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    marginRight: 5,
  },
  footerLink: {
    fontSize: 14,
    color: '#ff9800',
    fontWeight: 'bold',
  },
});
