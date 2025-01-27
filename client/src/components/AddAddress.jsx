import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import Header from './Header';
import InputFeild from './InputFeild'; // Importing the custom InputFeild component
import {useDispatch, useSelector} from 'react-redux';
import {addAddress, addressStates, updateAddress} from '../slices/addressSlice';
import RNPickerSelect from 'react-native-picker-select';

const AddAddress = ({navigation}) => {
  const dispatch = useDispatch();
  const {currentStatus, userAddress} = useSelector(addressStates);

  // List of states in India
  const states = [
    {label: 'Tamil Nadu', value: 'Tamil Nadu'},
    {label: 'Karnataka', value: 'Karnataka'},
    {label: 'Maharashtra', value: 'Maharashtra'},
    {label: 'Delhi', value: 'Delhi'},
    {label: 'Kerala', value: 'Kerala'},
  ];

  const [address, setAddress] = useState({
    homeAddress: '',
    email: '',
    mobile: '',
    pincode: '',
    state: '',
  });

  useEffect(() => {
    // Pre-fill fields if editing
    if (currentStatus) {
      setAddress({
        homeAddress: userAddress?.homeAddress || '',
        email: userAddress?.email || '',
        mobile: userAddress?.mobile || '',
        pincode: userAddress?.pincode || '',
        state: userAddress?.state || '',
      });
    }
  }, [currentStatus, userAddress]);

  const handleInputChange = (field, value) => {
    setAddress({...address, [field]: value});
  };

  const handleSubmit = () => {
    // Validation
    if (
      !address.homeAddress ||
      !address.email ||
      !address.mobile ||
      !address.pincode ||
      !address.state
    ) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }
    if (!/^\d{10}$/.test(address.mobile)) {
      Alert.alert('Error', 'Enter a valid 10-digit mobile number.');
      return;
    }
    if (!/^\d{6}$/.test(address.pincode)) {
      Alert.alert('Error', 'Enter a valid 6-digit pincode.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address.email)) {
      Alert.alert('Error', 'Enter a valid email address.');
      return;
    }

    if (currentStatus) {
      // Update existing address
      dispatch(updateAddress(address))
        .unwrap()
        .then(() => {
          Alert.alert('Success', 'Address updated successfully.');
          navigation.goBack();
        })
        .catch(() => {
          Alert.alert('Error', 'Failed to update address.');
        });
    } else {
      // Add new address
      dispatch(addAddress(address))
        .unwrap()
        .then(() => {
          Alert.alert('Success', 'Address added successfully.');
          setAddress({
            homeAddress: '',
            email: '',
            mobile: '',
            pincode: '',
            state: '',
          });
          navigation.navigate('Address');
        })
        .catch(() => {
          Alert.alert('Error', 'Failed to add address.');
        });
    }
  };

  return (
    <View style={styles.screen}>
      <Header
        topic={currentStatus ? 'Edit Address' : 'Add Address'}
        navigation={navigation}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <InputFeild
          placeholder="Home Address"
          value={address.homeAddress}
          onChangeText={text => handleInputChange('homeAddress', text)}
        />
        <InputFeild
          placeholder="Email"
          value={address.email}
          onChangeText={text => handleInputChange('email', text)}
          keyboardType="email-address"
        />
        <InputFeild
          placeholder="Mobile"
          value={address.mobile}
          onChangeText={text => handleInputChange('mobile', text)}
          keyboardType="phone-pad"
        />
        <InputFeild
          placeholder="Pincode"
          value={address.pincode}
          onChangeText={text => handleInputChange('pincode', text)}
          keyboardType="numeric"
        />
        <RNPickerSelect
          onValueChange={value => handleInputChange('state', value)}
          items={states}
          placeholder={{label: 'Select State', value: null}}
          value={address.state}
          style={{
            inputAndroid: styles.inputField,
            inputIOS: styles.inputField,
            iconContainer: {
              top: 10,
              right: 12,
            },
          }}
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>
            {currentStatus ? 'Update Address' : 'Save Address'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default AddAddress;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputField: {
    width: '100%',
    height: 45,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
});
