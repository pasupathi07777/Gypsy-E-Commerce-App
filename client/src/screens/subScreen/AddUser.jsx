import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import InputFeild from '../../components/InputFeild';
import ButtonField from '../../components/ButtonField';
import Header from '../../components/Header';
import SelectPicker from '../../components/SelectPicker';
import { useDispatch, useSelector } from 'react-redux';
import { signupState, signupUser } from '../../slices/authSlices/signupSlice';


const AddUser = ({ navigation }) => {
    const dispatch = useDispatch();
    const {loading} = useSelector(signupState);

    const [userDetails, setUserDetails] = useState({
        username: '',
        email: '',
        password: '',
        role:"",
        regNumber:""
    });

    const handleInputChange = (field, value) => {
        setUserDetails({ ...userDetails, [field]: value });
    };

    const handleSubmit =  () => {
        if (
          !userDetails.username ||
          !userDetails.email ||
          !userDetails.password ||
          !userDetails.role ||
          (userDetails.role === 'student' && !userDetails.regNumber)
        ) {
          Alert.alert('', 'Please fill all fields.');
          return;
        }
      
         dispatch(signupUser(userDetails))
           .unwrap()
           .then(() => {
             navigation.goBack()
           });
      };
      

    return (
      <View style={styles.container}>
        <Header topic="Add User" navigation={navigation} />
        <View style={styles.formContainer}>
          <InputFeild
            placeholder="Username"
            value={userDetails.username}
            onChangeText={text => handleInputChange('username', text)}
          />
          <InputFeild
            placeholder="Email"
            keyboardType="email-address"
            value={userDetails.email}
            onChangeText={text => handleInputChange('email', text)}
          />

          <SelectPicker
            selectedValue={userDetails.role}
            onValueChange={itemValue => handleInputChange('role', itemValue)}
          />
          {userDetails.role === 'student' && (
            <InputFeild
              placeholder="Registration Number"
              value={userDetails.regNumber}
              onChangeText={text => handleInputChange('regNumber', text)}
            />
          )}
          <InputFeild
            placeholder="Password"
            secureTextEntry
            value={userDetails.password}
            onChangeText={text => handleInputChange('password', text)}
          />
          <ButtonField
            title="Submit"
            onPress={handleSubmit}
            loading={loading} 
          />
        </View>
      </View>
    );
};

export default AddUser;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    formContainer: {
        padding: 15,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
});
