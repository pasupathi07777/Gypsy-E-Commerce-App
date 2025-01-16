import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { otpState, verifyOtp } from '../slices/otpSlice';
import { signupState } from '../slices/signupSlice';
import { loginState } from '../slices/loginSlice';
const {width, height} = Dimensions.get('window');

const OtpVerification = ({navigation}) => {
  const {otpLoading}=useSelector(otpState)
  const {currentEmail}=useSelector(loginState)
  const dispatch=useDispatch()
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const inputRefs = useRef([]);

  const handleInputChange = (value, index) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    } else if (!value && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = () => {
    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }
    console.log(otpCode);
    dispatch(verifyOtp({otp:otpCode,email:currentEmail}))
    .unwrap()
    .then(() => {
      navigation.navigate('Home');
    })
    .catch(err => {
      console.log(err);
    });


  };

  const handleResend = () => {
    Alert.alert('OTP Resent', 'A new OTP has been sent to your email.');
    setOtp(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
  };

  return (

      <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Text style={styles.title}>Verify OTP</Text>

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
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleVerify}
            disabled={otpLoading}>
            <Text style={styles.buttonText}>
              {otpLoading ? 'Verifying...' : 'Verify '}
            </Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Didn't receive an OTP?</Text>
            <Pressable onPress={handleResend}>
              <Text style={styles.footerLink}>Resend</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: Math.min(30, width * 0.08),
    fontWeight: 'bold',
    color: '#000',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 4,
    marginBottom: height * 0.03,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: Math.min(18, width * 0.045),
    color: '#FFFFFF',
    marginBottom: height * 0.03,
    textAlign: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: height * 0.03,
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
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#FF6F61',
    borderRadius: 8,
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
    color: '#000',
  },
  footerLink: {
    fontSize: Math.min(14, width * 0.035),
    color: '#FF6F61',
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default OtpVerification;
