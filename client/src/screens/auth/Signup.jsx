import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Pressable,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {
  updateSignupForm,
  signupUser,
  setSignupErrors,
  signupState,
} from '../../slices/authSlices/signupSlice';

const {width, height} = Dimensions.get('window');

const Signup = ({navigation}) => {
  const dispatch = useDispatch();
  const {signupForm, loading} = useSelector(signupState);

  const handleChange = (field, value) => {
    dispatch(updateSignupForm({field, value}));
  };

  const handleSubmit = async () => {
    const {username, email, password} = signupForm;

    dispatch(signupUser({username, email, password}))
      .unwrap()
      .then(() => {
        Alert.alert('Success', 'Signup successful. You can now log in!');
        navigation.navigate('login');
      })
      .catch(err => {
        console.log(err);
        if (err.error) {
          Alert.alert('Signup Failed', err.error || 'Something went wrong.');
        } 
      });
  };

  return (
    <LinearGradient colors={['#6200EE', '#FF6F61']} style={styles.container}>
      <KeyboardAvoidingView style={{flex: 1}}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Text style={styles.title}>Create Your Account</Text>
          <Text style={styles.subtitle}>Sign up to get started</Text>

          {/* Username Field */}
          <View style={styles.inputContainer}>
            {signupForm.errors.username && (
              <Text style={styles.errorText}>{signupForm.errors.username}</Text>
            )}
            <TextInput
              style={[
                styles.input,
                signupForm.errors.username && styles.inputError,
              ]}
              placeholder="Username"
              placeholderTextColor="#ccc"
              value={signupForm.username}
              onChangeText={value => handleChange('username', value)}
            />
          </View>

          {/* Email Field */}
          <View style={styles.inputContainer}>
            {signupForm.errors.email && (
              <Text style={styles.errorText}>{signupForm.errors.email}</Text>
            )}
            <TextInput
              style={[
                styles.input,
                signupForm.errors.email && styles.inputError,
              ]}
              placeholder="Email"
              placeholderTextColor="#ccc"
              value={signupForm.email}
              onChangeText={value => handleChange('email', value)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Password Field */}
          <View style={styles.inputContainer}>
            {signupForm.errors.password && (
              <Text style={styles.errorText}>{signupForm.errors.password}</Text>
            )}
            <TextInput
              style={[
                styles.input,
                signupForm.errors.password && styles.inputError,
              ]}
              placeholder="Password"
              placeholderTextColor="#ccc"
              value={signupForm.password}
              onChangeText={value => handleChange('password', value)}
              secureTextEntry
              autoCapitalize="none"
            />
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[styles.button, loading.signup && styles.buttonDisabled]}
            onPress={handleSubmit}
            disabled={loading.signup}>
            <Text style={styles.buttonText}>
              {loading.signup ? 'Signing up...' : 'Sign Up'}
            </Text>
          </TouchableOpacity>

          {/* Footer Link */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account?</Text>
            <Pressable onPress={() => navigation.navigate('login')}>
              <Text style={styles.footerLink}> Log In</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default Signup;

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
});
