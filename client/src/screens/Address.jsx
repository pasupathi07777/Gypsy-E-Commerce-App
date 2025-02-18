import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import Header from '../components/Header';
import {
  addressStates,
  deleteUserAddress,
  updateStatus,
} from '../slices/addressSlice';

const Address = ({navigation}) => {
  const dispatch = useDispatch();
  const {userAddress} = useSelector(addressStates);

  const editAddress = () => {
    dispatch(updateStatus(true));
    navigation.navigate('Add-Address');
  };



  const deleteAddress = () => {
    Alert.alert('', 'Delete Address', [
      {
        text: 'Cancel',
        style: 'cancel',
        onPress: () => {
          return; // Stops further execution
        },
      },
      {
        text: 'OK',
        onPress: () => {
          dispatch(deleteUserAddress())
            .unwrap()
            .then(() => {
              Alert.alert('Success', 'Address deleted successfully.');
            })
            .catch(error => {
              Alert.alert(
                'Error',
                'Failed to delete address. Please try again.',
              );
            });
        },
      },
    ]);
  };


  useEffect(() => {
    dispatch(updateStatus(false));
  }, []);

  return (
    <View style={styles.container}>
      <Header topic={'Address'} navigation={navigation} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {userAddress ? (
          <View style={styles.addressItem}>
            <View style={styles.addressDetails}>

              <View style={styles.detailRow}>
                <Icon
                  name="home"
                  size={20}
                  color="#007bff"
                  style={styles.icon}
                />
                <Text style={styles.label}>Home Address:</Text>
              </View>
              <Text style={styles.value}>{userAddress.homeAddress}</Text>

   
              <View style={styles.detailRow}>
                <Icon
                  name="email"
                  size={20}
                  color="#007bff"
                  style={styles.icon}
                />
                <Text style={styles.label}>Email:</Text>
              </View>
              <Text style={styles.value}>{userAddress.email}</Text>

              <View style={styles.detailRow}>
                <Icon
                  name="phone"
                  size={20}
                  color="#007bff"
                  style={styles.icon}
                />
                <Text style={styles.label}>Mobile:</Text>
              </View>
              <Text style={styles.value}>{userAddress.mobile}</Text>

              <View style={styles.detailRow}>
                <Icon
                  name="location-pin"
                  size={20}
                  color="#007bff"
                  style={styles.icon}
                />
                <Text style={styles.label}>Pincode & State:</Text>
              </View>
              <Text style={styles.value}>
                {userAddress.pincode}, {userAddress.state}
              </Text>
            </View>

            <View style={styles.actions}>
              <TouchableOpacity
                onPress={editAddress}
                style={styles.actionButton}>
                <Icon name="edit" size={20} color="#007bff" />
                <Text style={styles.actionText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={deleteAddress}
                style={styles.actionButton}>
                <Icon name="delete" size={20} color="#ff4444" />
                <Text style={[styles.actionText, {color: '#ff4444'}]}>
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (

          <View style={styles.addAddressContainer}>
            <Icon
              name="location-off"
              size={50}
              color="#007bff"
              style={styles.icon}
            />
            <Text style={styles.noAddressText}>No address found.</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => navigation.navigate('Add-Address')}>
              <Icon
                name="add-location"
                size={20}
                color="#fff"
                style={styles.icon}
              />
              <Text style={styles.addButtonText}>Add Address</Text>
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
    backgroundColor: '#fff',
    // backgroundColor: '#f9f9f9',
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingVertical: 20,
  },
  addressItem: {
    backgroundColor: '#fff',
    backgroundColor: '#f9f9f9',
    padding: 20,
    // borderRadius: 10,
    marginHorizontal: 15,
    marginBottom: 15,
  },
  addressDetails: {
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  icon: {
    marginRight: 10,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#555',
  },
  value: {
    fontSize: 16,
    color: '#000',
    marginBottom: 15,
    marginLeft: 30,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 15,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  actionText: {
    fontSize: 16,
    color: '#007bff',
    marginLeft: 5,
  },
  addAddressContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  noAddressText: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    marginVertical: 20,
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,

    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});