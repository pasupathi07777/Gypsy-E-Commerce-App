// import React, {useRef, useState} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   Pressable,
//   KeyboardAvoidingView,
//   ScrollView,
//   Dimensions,
// } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
// import { otpState, verifyOtp } from '../slices/otpSlice';
// import { signupState } from '../slices/signupSlice';
// import { loginState } from '../slices/loginSlice';
// const {width, height} = Dimensions.get('window');

// const OtpVerification = ({navigation}) => {
//   const {otpLoading}=useSelector(otpState)
//   const {currentEmail}=useSelector(loginState)
//   const dispatch=useDispatch()
//   const [otp, setOtp] = useState(['', '', '', '', '', '']);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const inputRefs = useRef([]);

//   const handleInputChange = (value, index) => {
//     if (isNaN(value)) return;

//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     if (value && index < otp.length - 1) {
//       inputRefs.current[index + 1].focus();
//     } else if (!value && index > 0) {
//       inputRefs.current[index - 1].focus();
//     }
//   };

//   const handleVerify = () => {
//     const otpCode = otp.join('');
//     if (otpCode.length !== 6) {
//       setError('Please enter a valid 6-digit OTP');
//       return;
//     }
//     console.log(otpCode);
//     dispatch(verifyOtp({otp:otpCode,email:currentEmail}))
//     .unwrap()
//     .then(() => {
//       navigation.navigate('Home');
//     })
//     .catch(err => {
//       console.log(err);
//     });


//   };

//   const handleResend = () => {
//     Alert.alert('OTP Resent', 'A new OTP has been sent to your email.');
//     setOtp(['', '', '', '', '', '']);
//     inputRefs.current[0]?.focus();
//   };

//   return (

//       <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
//         <ScrollView contentContainerStyle={styles.scrollView}>
//           <Text style={styles.title}>Verify OTP</Text>

//           <View style={styles.otpContainer}>
//             {otp.map((digit, index) => (
//               <TextInput
//                 key={index}
//                 style={styles.otpInput}
//                 keyboardType="numeric"
//                 maxLength={1}
//                 value={digit}
//                 onChangeText={value => handleInputChange(value, index)}
//                 ref={ref => (inputRefs.current[index] = ref)}
//               />
//             ))}
//           </View>

//           <TouchableOpacity
//             style={[styles.button, loading && styles.buttonDisabled]}
//             onPress={handleVerify}
//             disabled={otpLoading}>
//             <Text style={styles.buttonText}>
//               {otpLoading ? 'Verifying...' : 'Verify '}
//             </Text>
//           </TouchableOpacity>

//           <View style={styles.footer}>
//             <Text style={styles.footerText}>Didn't receive an OTP?</Text>
//             <Pressable onPress={handleResend}>
//               <Text style={styles.footerLink}>Resend</Text>
//             </Pressable>
//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>

//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   scrollView: {
//     flexGrow: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   title: {
//     fontSize: Math.min(30, width * 0.08),
//     fontWeight: 'bold',
//     color: '#000',
//     textShadowColor: 'rgba(0, 0, 0, 0.25)',
//     textShadowOffset: {width: 1, height: 1},
//     textShadowRadius: 4,
//     marginBottom: height * 0.03,
//     textAlign: 'center',
//   },
//   subtitle: {
//     fontSize: Math.min(18, width * 0.045),
//     color: '#FFFFFF',
//     marginBottom: height * 0.03,
//     textAlign: 'center',
//   },
//   otpContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '100%',
//     marginBottom: height * 0.03,
//     gap:5
//   },
//   otpInput: {
//     width: width * 0.12,
//     height: width * 0.12,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 8,
//     textAlign: 'center',
//     fontSize: Math.min(18, width * 0.045),
//     color: '#333',
//     elevation: 2,
//   },
//   button: {
//     width: '100%',
//     padding: 15,
//     backgroundColor: '#FF6F61',
//     borderRadius: 8,
//     alignItems: 'center',
//     elevation: 2,
//     marginTop: 10,
//   },
//   buttonDisabled: {
//     backgroundColor: '#AAA',
//   },
//   buttonText: {
//     color: '#FFFFFF',
//     fontSize: Math.min(18, width * 0.045),
//     fontWeight: 'bold',
//   },
//   footer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: height * 0.03,
//   },
//   footerText: {
//     fontSize: Math.min(14, width * 0.035),
//     color: '#000',
//   },
//   footerLink: {
//     fontSize: Math.min(14, width * 0.035),
//     color: '#FF6F61',
//     fontWeight: 'bold',
//     marginLeft: 5,
//   },
// });

// export default OtpVerification;
import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { otpState, verifyOtp } from '../slices/otpSlice';
import { loginState } from '../slices/loginSlice';

const { width, height } = Dimensions.get('window');

const OtpVerification = ({ navigation }) => {
  const { otpLoading } = useSelector(otpState);
  const { currentEmail } = useSelector(loginState);
  const dispatch = useDispatch();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  const handleInputChange = (value, index) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    } else if (!value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      Alert.alert('Error', 'Please enter a valid 6-digit OTP');
      return;
    }

    dispatch(verifyOtp({ otp: otpCode, email: currentEmail }))
      .unwrap()
      .then(() => {
        navigation.navigate('Home');
      })
      .catch(err => {
        Alert.alert('Verification Failed', 'Invalid OTP. Please try again.');
        console.log(err);
      });
  };

  const handleResend = () => {
    Alert.alert('OTP Resent', 'A new OTP has been sent to your email.');
    setOtp(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Image
          source={require('../assets/loder-screen/delivery.png')}
          style={styles.image}
        />

        <Text style={styles.title}>Email verification</Text>
        <Text style={styles.subtitle}>
          Enter the verification code we sent to your email:
        </Text>
        <Text style={styles.email}>{currentEmail || 'example******@gmail.com'}</Text>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              style={styles.otpInput}
              keyboardType="numeric"
              maxLength={1}
              value={digit}
              onChangeText={value => handleInputChange(value, index)}
              ref={ref => (inputRefs.current[index] = ref)}
            />
          ))}
        </View>

        <TouchableOpacity
          style={[styles.button, otpLoading && styles.buttonDisabled]}
          onPress={handleVerify}
          disabled={otpLoading}>
          <Text style={styles.buttonText}>
            {otpLoading ? 'Verifying...' : 'Verify'}
          </Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Didn't receive a code?</Text>
          <Pressable onPress={handleResend}>
            <Text style={styles.footerLink}>Resend</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  image: {
    width: "100%",
    height: 250,
    resizeMode: 'contain',
    marginBottom: height * 0.02,
  },
  title: {
    fontSize: Math.min(28, width * 0.07),
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: height * 0.01,
  },
  subtitle: {
    fontSize: Math.min(16, width * 0.045),
    color: '#555',
    textAlign: 'center',
  },
  email: {
    fontSize: Math.min(14, width * 0.04),
    color: '#555',
    textAlign: 'center',
    marginBottom: height * 0.03,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: height * 0.03,
    gap: 5,
  },
  otpInput: {
    width: width * 0.12,
    height: width * 0.12,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: Math.min(18, width * 0.045),
    color: '#333',
    elevation: 2,
    borderWidth: 1,
    borderColor: '#CCC',
  },
  button: {
    width: '80%',
    padding: 15,
    backgroundColor: '#FEAB0D',
    borderRadius: 30,
    alignItems: 'center',
    elevation: 2,
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#AAA',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: Math.min(18, width * 0.045),
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.03,
  },
  footerText: {
    fontSize: Math.min(14, width * 0.035),
    color: '#555',
  },
  footerLink: {
    fontSize: Math.min(14, width * 0.035),
    color: '#FEAB0D',
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default OtpVerification;
