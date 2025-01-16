import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../components/Header';


const Cart = ({navigation}) => {
  return (
    <View>
      <Header navigation={navigation} topic={'Cart'} />
      <Text>Cart</Text>
    </View>
  );
};

export default Cart

const styles = StyleSheet.create({})