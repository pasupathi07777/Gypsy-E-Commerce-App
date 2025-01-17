import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {loginState, loginUser} from '../slices/loginSlice';
import {useDispatch, useSelector} from 'react-redux';
import ButtonField from '../components/ButtonField';
import InputFeild from '../components/InputFeild';

const EmailVerifyLogin = ({navigation}) => {
  const {loginLoading} = useSelector(loginState);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');

  const onSubmit = () => {
    dispatch(loginUser({email}))
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
      {/* Title */}
      <Text style={styles.title}>Login to your account.</Text>
      <Text style={styles.subtitle}>Please sign in to your account</Text>

      {/* Email Input */}
      <Text style={styles.lable}>Email Address</Text>
      <InputFeild
        style={styles.input}
        placeholder="Email Address"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
      />


      {/* Sign In Button */}
      <ButtonField style={styles.btn} onPress={onSubmit} loading={loginLoading} title="Sign In" />



      {/* Signup */}
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don’t have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.signupLink}> Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EmailVerifyLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 3,
  },
  subtitle: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 60,
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
    shadowColor: '#000', // Shadow color
    shadowOffset: {width: 0, height: 2}, // Shadow offset
    shadowOpacity: 0.1, // Shadow transparency
    shadowRadius: 4, // Shadow blur radius
    elevation: 4, // Elevation for Android
    color: '#000',
  },
  lable: {
    marginBottom: 6,
    color: '#000',
  },

  forgotPassword: {
    fontSize: 14,
    color: '#ff9800',
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  orText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginVertical: 16,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  socialButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
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
  btn: {
    backgroundColor: '#FFD65A',
    borderRadius: 30,
  },
});


// import React, {useState} from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   TouchableOpacity,
//   ImageBackground,
// } from 'react-native';
// import {loginState, loginUser} from '../slices/loginSlice';
// import {useDispatch, useSelector} from 'react-redux';
// import ButtonField from '../components/ButtonField';
// import InputFeild from '../components/InputFeild';

// const EmailVerifyLogin = ({navigation}) => {
//   const {loginLoading} = useSelector(loginState);
//   const dispatch = useDispatch();
//   const [email, setEmail] = useState('');

//   const onSubmit = () => {
//     dispatch(loginUser({email}))
//       .unwrap()
//       .then(() => {
//         navigation.navigate('Verify-Otp');
//       })
//       .catch(err => {
//         console.error('Error logging in:', err);
//       });
//   };

//   return (
//     <ImageBackground
//       source={require('../assets/loder-screen/food-delivery-loder-screen.webp')}
//       style={styles.background}>
//       <View style={styles.container}>
//         {/* Title */}
//         <Text style={styles.title}>Login to your account.</Text>
//         <Text style={styles.subtitle}>Please sign in to your account</Text>

//         {/* Email Input */}
//         <Text style={styles.label}>Email Address</Text>
//         <InputFeild
//           style={styles.input}
//           placeholder="Email Address"
//           placeholderTextColor="#aaa"
//           value={email}
//           onChangeText={setEmail}
//         />

//         {/* Sign In Button */}
//         <ButtonField
//           style={styles.btn}
//           onPress={onSubmit}
//           loading={loginLoading}
//           title="Sign In"
//         />

//         {/* Signup */}
//         <View style={styles.signupContainer}>
//           <Text style={styles.signupText}>Don’t have an account?</Text>
//           <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
//             <Text style={styles.signupLink}> Register</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </ImageBackground>
//   );
// };

// export default EmailVerifyLogin;

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//     resizeMode: 'cover', // Ensures the image covers the screen
//   },
//   container: {
//     flex: 1,
//     paddingHorizontal: 30,
//     paddingVertical: 30,
//     backgroundColor: 'rgba(0, 0, 0, 0.3)', // Optional overlay
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     color: '#000',
//     marginBottom: 3,
//   },
//   subtitle: {
//     fontSize: 14,
//     color: '#000',
//     marginBottom: 60,
//   },
//   input: {
//     width: '100%',
//     height: 50,
//     backgroundColor: '#fff',
//     borderRadius: 30,
//     paddingHorizontal: 15,
//     marginBottom: 16,
//     fontSize: 16,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 4,
//     color: '#000',
//   },
//   label: {
//     marginBottom: 6,
//     color: '#000',
//   },
//   forgotPassword: {
//     fontSize: 14,
//     color: '#ff9800',
//     alignSelf: 'flex-end',
//     marginBottom: 20,
//   },
//   signupContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: 20,
//   },
//   signupText: {
//     fontSize: 14,
//     color: '#000',
//   },
//   signupLink: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#ff9800',
//   },
//   btn: {
//     backgroundColor: '#C00612',
//     borderRadius: 30,
//   },
// });
