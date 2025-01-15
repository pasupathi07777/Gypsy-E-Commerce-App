import React from 'react';
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
import LinearGradient from 'react-native-linear-gradient';
import {useSelector, useDispatch} from 'react-redux';
import {
  selectOtpState,
  updateOtp,
  verifyOtp,
  clearOtp,
} from '../../slices/authSlices/otpSlice';
import { verifyEmailState} from '../../slices/authSlices/verifyEmailSlice';

const {width, height} = Dimensions.get('window');

const VerifyOtp = ({navigation}) => {
  const {loading, otp, OtpErrors} = useSelector(selectOtpState);
  const {verfiyEmail} = useSelector(verifyEmailState);
  const dispatch = useDispatch()
  const handleInputChange = (value, index) => {
    if (isNaN(value)) return;

    dispatch(updateOtp({index, value}));

    if (value && index < otp.length - 1) {
      const nextInput = `otpInput${index + 1}`;
      this[nextInput]?.focus();
    }
  };

  const handleVerify = () => {
    const otpCode = otp.join('');
    if (otpCode.length !== 5) {
      Alert.alert('Error', 'Please enter a valid 5-digit OTP');
      return;
    }

    dispatch(verifyOtp({otpCode, verfiyEmail}))
      .unwrap()
      .then(() => {
        Alert.alert('Success', 'Reset link sent successfully!');
        navigation.navigate('ResetPassword');
        dispatch(clearOtp());
        
      })

  };

  return (
    <LinearGradient colors={['#6200EE', '#FF6F61']} style={styles.container}>
      <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Text style={styles.title}>Verify OTP</Text>
          <Text style={[styles.subtitle, OtpErrors && {color: 'red'}]}>
            {OtpErrors ? OtpErrors : 'Enter the 5-digit OTP sent to your email'}
          </Text>

          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                style={styles.otpInput}
                keyboardType="numeric"
                maxLength={1}
                value={digit}
                onChangeText={value => handleInputChange(value, index)}
                ref={ref => (this[`otpInput${index}`] = ref)}
              />
            ))}
          </View>

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleVerify}
            disabled={loading}>
            <Text style={styles.buttonText}>
              {loading ? 'Verifying...' : 'Verify OTP'}
            </Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Didn't receive an OTP?</Text>
            <Pressable
              onPress={() => {
               dispatch(clearOtp()); // Ensure this function is defined
                navigation.navigate('EmailVerify'); // Navigate to EmailVerify
              }}>
              <Text style={styles.footerLink}>Resend</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
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

export default VerifyOtp;
