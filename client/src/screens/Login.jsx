// import React, {useState} from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
// } from 'react-native';
// import { loginState, loginUser } from '../slices/loginSlice';
// import { useDispatch, useSelector } from 'react-redux';
// import ButtonField from '../components/ButtonField';

// const EmailVerifyLogin = ({navigation}) => {
//   const {loginLoading}=useSelector(loginState)
//   const dispatch=useDispatch()
//   const [email, setEmail] = useState('');

//   const onSubmit=()=>{
//         dispatch(loginUser({email}))
//         .unwrap()
//         .then(() => {
//           navigation.navigate('Verify-Otp');
//         })


//   }

//   return (
//     <View style={styles.container}>
      

//       {/* Welcome Text */}
//       <Text style={styles.welcomeText}>Welcome to Feathrly</Text>

//       {/* Email Input */}
//       <TextInput
//         style={styles.input}
//         placeholder="Enter your email"
//         placeholderTextColor="#aaa"
//         keyboardType="email-address"
//         value={email}
//         onChangeText={setEmail}
//       />

//       {/* Verify Button */}
//       {/* <TouchableOpacity style={styles.verifyButton} onPress={onSubmit}>
//         <Text style={styles.verifyButtonText}>Request OTP</Text>
//       </TouchableOpacity> */}
//       <ButtonField onPress={onSubmit}  loading={loginLoading} title={"Request OTP"} />

//       {/* Footer Text */}
//       <View style={styles.footer}>
//         <Text style={styles.footerText}>
//           By continuing, you agree to our{' '}
//           <Text style={styles.footerLink}>Terms of Service</Text> and{' '}
//           <Text style={styles.footerLink}>Privacy Policy</Text>.
//         </Text>
//       </View>
//     </View>
//   );
// };

// export default EmailVerifyLogin;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingHorizontal: 20,
    
//   },
//   logo: {
//     width: 150,
//     height: 150,
//     marginBottom: 20,
//   },
//   welcomeText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#555',
//     textAlign: 'center',
//     marginBottom: 25,
//   },
//   input: {
//     width: '100%',
//     height: 50,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     paddingHorizontal: 15,
//     marginBottom: 20,
//     fontSize: 16,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: {width: 0, height: 2},
//     shadowRadius: 4,
//     elevation: 1, // For Android shadow
//   },
//   verifyButton: {
//     backgroundColor: '#FF5722', // Updated to orange
//     width: '100%',
//     height: 50,
//     borderRadius: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 20,
//     shadowColor: '#000',
//     shadowOpacity: 0.2,
//     shadowOffset: {width: 0, height: 2},
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   verifyButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   footer: {
//     alignItems: 'center',
//     paddingHorizontal: 10,
//   },
//   footerText: {
//     fontSize: 14,
//     color: '#777',
//     textAlign: 'center',
//   },
//   footerLink: {
//     color: '#007bff',
//     fontWeight: 'bold',
//   },
// });


import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { loginState, loginUser } from '../slices/loginSlice';
import { useDispatch, useSelector } from 'react-redux';
import ButtonField from '../components/ButtonField';

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
    <View style={styles.container}>
      {/* Welcome Text */}
      <Text style={styles.welcomeText}>Welcome to Feathrly</Text>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      {/* Verify Button */}
      <ButtonField onPress={onSubmit} loading={loginLoading} title="Request OTP" />

      {/* Already Signed Up? */}
      <View style={styles.alreadyUserContainer}>
        <Text style={styles.alreadyUserText}>Create Account </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.alreadyUserLink}>Signup</Text>
        </TouchableOpacity>
      </View>

      {/* Footer Text */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          By continuing, you agree to our{' '}
          <Text style={styles.footerLink}>Terms of Service</Text> and{' '}
          <Text style={styles.footerLink}>Privacy Policy</Text>.
        </Text>
      </View>
    </View>
  );
};

export default EmailVerifyLogin;

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
  alreadyUserContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  alreadyUserText: {
    fontSize: 16,
    color: '#555',
  },
  alreadyUserLink: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
    textDecorationLine: 'underline',
  },
  footer: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
  },
  footerLink: {
    color: '#007bff',
    fontWeight: 'bold',
  },
});
