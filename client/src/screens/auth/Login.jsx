import React, {useState} from 'react';
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
import {useDispatch, useSelector} from 'react-redux';
import {loginState, loginUser} from '../../slices/authSlices/loginSlice';
const {width, height} = Dimensions.get('window');

const Login = ({navigation}) => {
  const {loginLoading} = useSelector(loginState);
  const dispatch = useDispatch();
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
    errors: {},
  });

  const handleChange = (field, value) => {
    setLoginForm(prev => ({
      ...prev,
      [field]: value,
      errors: {...prev.errors, [field]: ''}, 
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!loginForm.email) {
      errors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(loginForm.email)) {
      errors.email = 'Please enter a valid email.';
    }
    if (!loginForm.password) {
      errors.password = 'Password is required.';
    }
    return errors;
  };

  const handleSubmit = () => {


    if (!loginForm.email || !loginForm.password) {
      Alert.alert('', 'Please fill all fields.');
      return;
    }
    dispatch(loginUser({email: loginForm.email, password: loginForm.password}))
        .unwrap()
          .then(() => {
            navigation.navigate('home');
          })
  };

  return (
    <LinearGradient colors={['#6200EE', '#FF6F61']} style={styles.container}>
      <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Text style={styles.title}>Welcome Back!</Text>
          <Text style={styles.subtitle}>Login to your account</Text>

          {/* Email Field */}
          <View style={styles.inputContainer}>
            {loginForm.errors.email && (
              <Text style={styles.errorText}>{loginForm.errors.email}</Text>
            )}
            <TextInput
              style={[
                styles.input,
                loginForm.errors.email && styles.inputError,
              ]}
              placeholder="Email"
              placeholderTextColor="#ccc"
              value={loginForm.email}
              onChangeText={value => handleChange('email', value)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Password Field */}
          <View style={styles.inputContainer}>
            {loginForm.errors.password && (
              <Text style={styles.errorText}>{loginForm.errors.password}</Text>
            )}
            <TextInput
              style={[
                styles.input,
                loginForm.errors.password && styles.inputError,
              ]}
              placeholder="Password"
              placeholderTextColor="#ccc"
              value={loginForm.password}
              onChangeText={value => handleChange('password', value)}
              secureTextEntry
              autoCapitalize="none"
            />
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[styles.button, loginLoading && styles.buttonDisabled]}
            onPress={handleSubmit}
            disabled={loginLoading}>
            <Text style={styles.buttonText}>
              {loginLoading ? 'Logging in...' : 'Login'}
            </Text>
          </TouchableOpacity>

          {/* Footer Links */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account?</Text>
            <Pressable onPress={() => navigation.navigate('signup')}>
              <Text style={styles.footerLink}> Sign Up</Text>
            </Pressable>
          </View>

          {/* Reset Password Link */}
          <View style={styles.resetPasswordContainer}>
            <Pressable onPress={() => navigation.navigate('EmailVerify')}>
              <Text style={styles.resetPasswordText}>Forgot Password?</Text>
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
  resetPasswordContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  resetPasswordText: {
    fontSize: Math.min(14, width * 0.035),
    color: '#FFFFFF',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default Login;
