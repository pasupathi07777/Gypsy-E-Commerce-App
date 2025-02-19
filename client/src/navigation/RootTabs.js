import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Home from '../screens/Home';
import Cart from '../screens/Cart';
import Profile from '../screens/Profile';
import Wishlist from '../screens/wishlist';

const Tab = createBottomTabNavigator();

const RootTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: {
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
        },
        tabBarActiveTintColor: '#f03922',
        tabBarInactiveTintColor: '#878787',
        tabBarHideOnKeyboard: true,
        tabBarLabelStyle: {fontSize: 12},
        tabBarIconStyle: {marginTop: 5},
        tabBarPressColor: 'transparent', // Removes ripple effect on Android
        tabBarPressOpacity: 1, // Removes fade effect on iOS
        animationEnabled: false, // Disables animation
      })}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({focused}) => (
            <MaterialIcons
              name={'home'}
              size={24}
              color={focused ? '#f03922' : '#000'}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({focused}) => (
            <MaterialIcons
              name={'shopping-cart'}
              size={22}
              color={focused ? '#f03922' : '#000'}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Wishlist"
        component={Wishlist}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({focused}) => (
            <AntDesign
              name={'heart'}
              size={20}
              color={focused ? '#f03922' : '#000'}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({focused}) => (
            <FontAwesome
              name={'user'}
              size={22}
              color={focused ? '#f03922' : '#000'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default RootTabs;
