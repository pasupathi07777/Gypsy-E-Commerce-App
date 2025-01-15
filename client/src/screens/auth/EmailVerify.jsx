import React, {act} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Pressable,
  Dimensions,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {
  
  verfiyEmail,
  setRestPasswordErrors,
  updateEmailVerifyForm,
  verifyEmailState,
} from '../../slices/authSlices/verifyEmailSlice';

const {width, height} = Dimensions.get('window');

const ResetPassword = ({navigation}) => {
  const {Loading, verfiyEmailForm} = useSelector(verifyEmailState);
  const dispatch = useDispatch();

  const handleChange = (field, value) => {
    dispatch(updateEmailVerifyForm({field, value}));
  };

  const handleSubmit = () => {
    const {email} = verfiyEmailForm;
    console.log(email);

    dispatch(verfiyEmail({email}))
      .unwrap()
      .then(() => {
        Alert.alert('Success', 'Reset link sent successfully!');
        navigation.navigate('verifyOtp');
      })
      .catch(err => {
        if (err.errors) {
          console.log(err);

          dispatch(setRestPasswordErrors({errors: err.errors}));
        } else {
          Alert.alert('Failed', err.error || 'Something went wrong.');
        }
      });
  };

  return (
    <LinearGradient colors={['#6200EE', '#FF6F61']} style={styles.container}>
      <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Text style={styles.title}>Reset Password</Text>

          <Text style={styles.instructions}>
            Enter your registered email address, and we'll send you instructions
            to reset your password.
          </Text>

          <View style={styles.inputContainer}>
            {verfiyEmailForm.errors.email && (
              <Text style={styles.errorText}>
                {verfiyEmailForm.errors.email}
              </Text>
            )}
            <TextInput
              style={[
                styles.input,
                verfiyEmailForm.errors.email && styles.inputError,
              ]}
              placeholder="Email"
              value={verfiyEmailForm.email}
              onChangeText={value => handleChange('email', value)}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#ccc"
            />
          </View>

          <TouchableOpacity
            style={[styles.button, Loading && styles.buttonDisabled]}
            onPress={handleSubmit}
            disabled={Loading}>
            <Text style={styles.buttonText}>
              {Loading ? 'Sending...' : 'Send Reset Link'}
            </Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Remember your password?</Text>
            <Pressable onPress={() => navigation.navigate('login')}>
              <Text style={styles.footerLink}> Log In</Text>
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
  instructions: {
    fontSize: Math.min(16, width * 0.04),
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: height * 0.03,
    lineHeight: 22,
  },
  inputContainer: {
    width: '100%',
    marginBottom: height * 0.02,
  },
  input: {
    width: '100%',
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    fontSize: Math.min(16, width * 0.04),
    color: '#333',
    elevation: 2,
  },
  inputError: {
    borderColor: '#FF6F61',
    borderWidth: 1,
  },
  errorText: {
    color: '#FF6F61',
    fontSize: 12,
    marginBottom: 5,
    textAlign: 'right',
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

export default ResetPassword;
