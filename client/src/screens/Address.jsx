import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import { addressStates, updateStatus } from '../slices/addressSlice';

const Address = ({ navigation }) => {
  const dispatch = useDispatch();
  const { userAddress } = useSelector(addressStates); // Get the user's address from the Redux store

  const editAddress = () => {

    // navigation.navigate('Edit-Address', { address: userAddress });
    dispatch(updateStatus(true))
    navigation.navigate("Add-Address")
  };

  const deleteAddress = () => {
    dispatch(deleteAddress(userAddress.id)).unwrap()
      .then(() => {
        // Handle address deletion success
        Alert.alert('Success', 'Address deleted successfully.');
      })
      .catch((error) => {
        Alert.alert('Error', 'Failed to delete address. Please try again.');
      });
  };

  useEffect(()=>{
    dispatch(updateStatus(false))
  },[])
  return (
    <View style={styles.container}>
      <Header topic={"Address"} navigation={navigation} />
      <ScrollView>
        {userAddress ? (
          // If address exists, display the address details and action buttons
          <View style={styles.addressItem}>
            <View style={styles.addressDetails}>
              <Text style={styles.label}>🏠 Home Address:</Text>
              <Text style={styles.value}>{userAddress.homeAddress}</Text>

              <Text style={styles.label}>📧 Email:</Text>
              <Text style={styles.value}>{userAddress.email}</Text>

              <Text style={styles.label}>📞 Mobile:</Text>
              <Text style={styles.value}>{userAddress.mobile}</Text>

              <Text style={styles.label}>📍 Pincode:</Text>
              <Text style={styles.value}>{userAddress.pincode}</Text>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity onPress={editAddress} style={styles.actionButton}>
                <Text style={styles.actionText}>✏️ Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={deleteAddress} style={styles.actionButton}>
                <Text style={styles.actionText}>🗑️ Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          // If no address is available, show the Add Address button
          <View style={styles.addAddressContainer}>
            <Text style={styles.noAddressText}>No address found.</Text>
            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('Add-Address')}>
              <Text style={styles.addButtonText}>➕ Add Address</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Address;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  addressItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  addressDetails: {
    marginBottom: 15,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#555',
  },
  value: {
    fontSize: 16,
    color: '#000',
    marginBottom: 5,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    padding: 10,
    marginLeft: 10,
  },
  actionText: {
    fontSize: 18,
    color: '#007bff',
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 15,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noAddressText: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  addAddressContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});
