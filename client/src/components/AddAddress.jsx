
// import React, { useState } from 'react';
// import { StyleSheet, Text, View, TouchableOpacity, Alert, ScrollView } from 'react-native';
// import Header from './Header';
// import InputFeild from './InputFeild'; // Importing the custom InputFeild component
// import { useDispatch, useSelector } from 'react-redux';
// import { addAddress } from '../slices/addressSlice';
// import RNPickerSelect from 'react-native-picker-select';

// const AddAddress = ({ navigation }) => {
//   const dispatch = useDispatch();

//   // List of states in India (you can expand this list)
//   const states = [
//     { label: 'Tamil Nadu', value: 'TN' },
//     { label: 'Karnataka', value: 'KA' },
//     { label: 'Maharashtra', value: 'MH' },
//     { label: 'Delhi', value: 'DL' },
//     { label: 'Kerala', value: 'KL' },
//     // Add more states here as needed
//   ];

//   const [address, setAddress] = useState({
//     homeAddress: 'pasu illam',
//     email: 'pasu@gmail.com',
//     mobile: '1234567890',
//     pincode: '629002',
//     state: '', // Add state field
//   });

//   const handleInputChange = (field, value) => {
//     setAddress({ ...address, [field]: value });
//   };

//   const handleSubmit = () => {
//     // Validation
//     if (!address.homeAddress || !address.email || !address.mobile || !address.pincode || !address.state) {
//       Alert.alert('Error', 'All fields are required.');
//       return;
//     }
//     if (!/^\d{10}$/.test(address.mobile)) {
//       Alert.alert('Error', 'Enter a valid 10-digit mobile number.');
//       return;
//     }
//     if (!/^\d{6}$/.test(address.pincode)) {
//       Alert.alert('Error', 'Enter a valid 6-digit pincode.');
//       return;
//     }
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address.email)) {
//       Alert.alert('Error', 'Enter a valid email address.');
//       return;
//     }

//     dispatch(addAddress(address))
//       .unwrap()
//       .then(() => {
//         navigation.navigate('Address');
//         setAddress({ homeAddress: '', email: '', mobile: '', pincode: '', state: '' }); // Clear the form
//       })
//       .catch((error) => {
//         Alert.alert('Error', 'Failed to add address. Please try again.');
//       });
//   };

//   return (
//     <View style={styles.screen}>
//       <Header topic="Add Address" navigation={navigation} />
//       <ScrollView contentContainerStyle={styles.container}>
//         {/* Home Address */}
//         <InputFeild
//           placeholder="Home Address"
//           value={address.homeAddress}
//           onChangeText={(text) => handleInputChange('homeAddress', text)}
//         />

//         {/* Email Address */}
//         <InputFeild
//           placeholder="Email"
//           value={address.email}
//           onChangeText={(text) => handleInputChange('email', text)}
//           keyboardType="email-address"
//         />

//         {/* Mobile Number */}
//         <InputFeild
//           placeholder="Mobile"
//           value={address.mobile}
//           onChangeText={(text) => handleInputChange('mobile', text)}
//           keyboardType="phone-pad"
//         />

//         {/* Pincode */}
//         <InputFeild
//           placeholder="Pincode"
//           value={address.pincode}
//           onChangeText={(text) => handleInputChange('pincode', text)}
//           keyboardType="numeric"
//         />

//         {/* State Dropdown */}
//         <RNPickerSelect
//           onValueChange={(value) => handleInputChange('state', value)}
//           items={states}
//           placeholder={{ label: 'Select State', value: null }}
//           value={address.state}
//           style={{
//             inputAndroid: styles.inputField,
//             inputIOS: styles.inputField,
//             iconContainer: {
//               top: 10,
//               right: 12,
//             },
//           }}
//         />

//         {/* Submit Button */}
//         <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
//           <Text style={styles.submitButtonText}>Submit</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </View>
//   );
// };

// export default AddAddress;

// const styles = StyleSheet.create({
//   screen: {
//     flex: 1,
//   },
//   container: {
//     flexGrow: 1,
//     padding: 20,
//     alignItems: 'center',
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: '#333',
//   },
//   submitButton: {
//     backgroundColor: '#007bff',
//     padding: 15,
//     borderRadius: 8,
//     alignItems: 'center',
//     width: '100%',
//   },
//   submitButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   inputField: {
//     width: '100%',
//     height: 45,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     paddingLeft: 10,
//     marginBottom: 20,
//     backgroundColor: '#fff',
//   },
// });

import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addAddress, addressStates } from '../slices/addressSlice';
import Header from '../components/Header';

const AddAddress = ({ navigation }) => {
  const dispatch = useDispatch();
  const {currentStatus,userAddress}=useSelector(addressStates)
  const [newAddress, setNewAddress] = useState({
    homeAddress: '',
    email: '',
    mobile: '',
    pincode: '',
  });

  const handleInputChange = (field, value) => {
    setNewAddress({
      ...newAddress,
      [field]: value,
    });
  };

  const saveAddress = () => {
    if (!newAddress.homeAddress || !newAddress.email || !newAddress.mobile || !newAddress.pincode) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    dispatch(addAddress(newAddress)).unwrap()
      .then(() => {
        Alert.alert('Success', 'Address added successfully');
        navigation.goBack();
      })
      .catch((error) => {
        Alert.alert('Error', 'Failed to add address');
      });
  };

  useEffect(()=>{
    if(currentStatus){
      setNewAddress({
         homeAddress:userAddress.homeAddress,
         email:userAddress.email,
         mobile:userAddress.mobile,
         pincode:userAddress.pincode,
        
      })
    }
   
  },[])

  return (
    <View style={styles.container}>
      <Header topic={currentStatus?"Edit Address":"Add Address"} navigation={navigation} />
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Home Address"
          value={newAddress.homeAddress}
          onChangeText={(text) => handleInputChange('homeAddress', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={newAddress.email}
          onChangeText={(text) => handleInputChange('email', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Mobile"
          value={newAddress.mobile}
          onChangeText={(text) => handleInputChange('mobile', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Pincode"
          value={newAddress.pincode}
          onChangeText={(text) => handleInputChange('pincode', text)}
        />
        <TouchableOpacity onPress={saveAddress} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save Address</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddAddress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#f9f9f9',
  },
  form: {
    padding: 15,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});
