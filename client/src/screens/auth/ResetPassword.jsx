import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {
  updateField,
  resetPassword,
  resetPasswordStates,
  setResetPasswordErrors,
} from '../../slices/authSlices/resetPasswordSlice';
import {resetPasswordState, verifyEmailState} from '../../slices/authSlices/verifyEmailSlice';
const {width, height} = Dimensions.get('window');

const ResetPassword = ({navigation}) => {
  const dispatch = useDispatch();

  const {
    password,
    confirmPassword,
    loading,
    validationErrors,
    resetPasswordForm,
  } = useSelector(resetPasswordStates);
  const {verfiyEmail} = useSelector(verifyEmailState);

  const handleChange = (field, value) => {
    dispatch(updateField({field, value}));
  };


  const handleSubmit = () => {
    dispatch(
      resetPassword({
        email: verfiyEmail,
        password: resetPasswordForm.password,
        confirmPassword: resetPasswordForm.confirmPassword,
      }),
    )
      .unwrap()
      .then(() => {
        Alert.alert('Success', 'reset successful!');
        navigation.navigate('login');
      })
      .catch(err => {
        if (err.errors) {
          console.log(err.errors);
          dispatch(setResetPasswordErrors({errors: err.errors}));
        } else {
          Alert.alert('Login Failed', err.error || 'Something went wrong.');
        }
      });
  };

  return (
    <LinearGradient colors={['#6200EE', '#FF6F61']} style={styles.container}>
      <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Text style={styles.title}>Reset Password</Text>
          <Text style={styles.subtitle}>Enter your new password</Text>

          <View style={styles.inputContainer}>
            {resetPasswordForm.errors.password && (
              <Text style={styles.errorText}>
                {resetPasswordForm.errors.password}
              </Text>
            )}
            <TextInput
              style={[
                styles.input,
                validationErrors.password && styles.inputError,
              ]}
              placeholder="New Password"
              placeholderTextColor="#ccc"
              value={resetPasswordForm.password}
              onChangeText={value => handleChange('password', value)}
              secureTextEntry
            />
          </View>

          <View style={styles.inputContainer}>
            {resetPasswordForm.errors.confirmPassword && (
              <Text style={styles.errorText}>
                {resetPasswordForm.errors.confirmPassword}
              </Text>
            )}
            <TextInput
              style={[
                styles.input,
                validationErrors.confirmPassword && styles.inputError,
              ]}
              placeholder="Confirm Password"
              placeholderTextColor="#ccc"
              value={resetPasswordForm.confirmPassword}
              onChangeText={value => handleChange('confirmPassword', value)}
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            style={[styles.button, loading && {opacity: 0.6}]}
            onPress={handleSubmit}
            disabled={loading}>
            <Text style={styles.buttonText}>
              {loading ? 'Resetting...' : 'Reset Password'}
            </Text>
          </TouchableOpacity>
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
  buttonText: {
    color: '#FFFFFF',
    fontSize: Math.min(18, width * 0.045),
    fontWeight: 'bold',
  },
});

export default ResetPassword;
