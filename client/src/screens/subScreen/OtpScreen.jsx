import React, {useState, useRef} from 'react';
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
import { useDispatch } from 'react-redux';
import { verifyEmailOtp } from '../../slices/profileSlices/profileSlice';


const {width, height} = Dimensions.get('window');

const OtpScreen = ({navigation}) => {
  const [otpDetails, setOtpDetails] = useState({
    otp: ['', '', '', '', ''],
    loading: false,
    error: '',
  });
  const inputRefs = useRef([]); 

  const handleInputChange = (value, index) => {
    if (isNaN(value)) return;

    const updatedOtp = [...otpDetails.otp];
    updatedOtp[index] = value;
    setOtpDetails({...otpDetails, otp: updatedOtp});


    if (value && index < updatedOtp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const dispatch = useDispatch();
  const handleVerify = () => {
    const otpCode = otpDetails.otp.join('');
    if (otpCode.length !== 5) {
      setOtpDetails({...otpDetails, error: 'Please enter a valid 5-digit OTP'});
      return;
    }

    setOtpDetails({...otpDetails, loading: true, error: ''});
    const {otp} = otpDetails;
    dispatch(verifyEmailOtp(otp))
      .unwrap()
      .then(() => {
         navigation.pop(2);
      });



  };


  const handleResend = () => {
    setOtpDetails({...otpDetails, otp: ['', '', '', '', ''], error: ''});
    Alert.alert('Info', 'OTP resent to your email.');
  }



  return (

      <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Text style={styles.title}>Verify OTP</Text>
          <Text style={[styles.subtitle, otpDetails.error && {color: 'red'}]}>
            {otpDetails.error || 'Enter the 5-digit OTP sent to your email'}
          </Text>

          <View style={styles.otpContainer}>
            {otpDetails.otp.map((digit, index) => (
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
            style={[styles.button, otpDetails.loading && styles.buttonDisabled]}
            onPress={handleVerify}
            disabled={otpDetails.loading}>
            <Text style={styles.buttonText}>
              {otpDetails.loading ? 'Verifying...' : 'Verify OTP'}
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
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 4,
    marginBottom: height * 0.02,
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
    color: '#FFFFFF',
  },
  footerLink: {
    fontSize: Math.min(14, width * 0.035),
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default OtpScreen;
