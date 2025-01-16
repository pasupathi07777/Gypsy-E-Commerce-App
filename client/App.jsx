import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import Profile from './src/screens/Profile';
import Search from './src/screens/Search';
import Cart from './src/screens/Cart';
import Product from './src/screens/Product';
import Login from './src/screens/Login';
import VerifyOtp from './src/screens/OtpVerification';
import Signup from './src/screens/Signup';
import FirstPageLoader from './src/screens/FirstLoaderScreen';

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator
      initialRouteName="FirstPage"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="FirstPage" component={FirstPageLoader} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Product" component={Product} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Verify-Otp" component={VerifyOtp} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}
