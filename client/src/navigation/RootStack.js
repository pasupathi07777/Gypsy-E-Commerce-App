import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import {loginState} from '../slices/loginSlice';
import {orderStates} from '../slices/orderSlice';
import {cartStates} from '../slices/cartSlice';
import RootTabs from './RootTabs';
import FirstPageLoader from '../screens/FirstLoaderScreen';
import Search from '../screens/Search';
import CategoryProduct from '../screens/CategoryProduct';
import Product from '../screens/Product';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import VerifyOtp from '../screens/OtpVerification';
import MyOrders from '../screens/MyOrders';
import Notifications from '../screens/Notifications';
import About from '../screens/About';
import Address from '../screens/Address';
import AddAddress from '../components/AddAddress';
import OrderConfirm from '../screens/OrderConfirm';
import CartOrder from '../screens/CartOrder';
import DirectOrder from '../screens/DirectOrder';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  const {loginStatus, checkUserAuth} = useSelector(loginState);
  const {directOrder} = useSelector(orderStates);
  const {cartItems} = useSelector(cartStates);

  return (
    <Stack.Navigator
      initialRouteName="FirstPage"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="FirstPage"
        component={FirstPageLoader }
      />
      <Stack.Screen name="Home" component={RootTabs} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="CategoryProduct" component={CategoryProduct} />
      <Stack.Screen name="Product" component={Product} />
      <Stack.Screen name="Login" component={!loginStatus ? Login : RootTabs} />
      <Stack.Screen
        name="Signup"
        component={!loginStatus ? Signup : RootTabs}
      />
      <Stack.Screen
        name="Verify-Otp"
        component={!loginStatus ? VerifyOtp : RootTabs}
      />
      <Stack.Screen name="MyOrders" component={MyOrders} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="Address" component={Address} />
      <Stack.Screen name="Add-Address" component={AddAddress} />
      <Stack.Screen
        name="Order"
        component={cartItems.length > 0 ? CartOrder : RootTabs}
      />
      <Stack.Screen
        name="Direct-Order"
        component={directOrder ? DirectOrder : RootTabs}
      />
      <Stack.Screen name="Order-Confirm" component={OrderConfirm} />
    </Stack.Navigator>
  );
};

export default RootStack;
