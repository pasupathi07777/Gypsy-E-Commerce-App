import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getOurOrder } from '../slices/orderSlice'

const MyOrders = () => {
  const dispatch=useDispatch()

  useEffect(()=>{
  dispatch(getOurOrder());
  },[])
  return (
    <View>
      <Text>MyOrders</Text>
    </View>
  )
}

export default MyOrders

const styles = StyleSheet.create({})