import React, {useState} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import InputFeild from '../../components/InputFeild';
import ButtonField from '../../components/ButtonField';
import Header from '../../components/Header';
import {useDispatch, useSelector} from 'react-redux';
import {editUserByTeacher, loginState} from '../../slices/authSlices/loginSlice';
import SelectPicker from '../../components/SelectPicker';

const EditUserDeatils = ({navigation}) => {
  const dispatch = useDispatch();
  const {editUser, editUserLoading} = useSelector(loginState);

  const [editDetails, setEditDetails] = useState({
    username: editUser.username || '',
    email: editUser.email || '',
    password: editUser.password || '',
    phone: editUser.phone || '',
    department: editUser.department || '',
    bio: editUser.bio,
    regNumber: editUser.regNumber || '',
    role:editUser.role 
  });

  const handleInputChange = (field, value) => {
    setEditDetails({...editDetails, [field]: value});
  };

  const handleSubmit = () => {
    if (
      !editDetails.username ||
      !editDetails.email ||
      (editDetails.role === 'student' && !editDetails.regNumber) 
    ) {
      Alert.alert('', 'Please fill all fields.');
      return;
    }

    dispatch(editUserByTeacher({userId: editUser._id, editDetails}))
      .unwrap()
      .then(() => {
        navigation.goBack();
      });
  };

  return (
    <View style={styles.container}>
      <Header topic="Edit User" navigation={navigation} />
      <View style={styles.formContainer}>
        <InputFeild
          placeholder="username"
          value={editDetails.username}
          onChangeText={text => handleInputChange('username', text)}
        />
        <InputFeild
          placeholder="Email"
          value={editDetails.email}
          onChangeText={text => handleInputChange('email', text)}
        />
        <SelectPicker
          selectedValue={editDetails.role}
          onValueChange={itemValue => handleInputChange('role', itemValue)}
        />
        <InputFeild
          placeholder="Enter new Password (Optional)"
          value={editDetails.password}
          onChangeText={text => handleInputChange('password', text)}
        />

        {editUser.role === 'student' && (
          <InputFeild
            placeholder="regNumber"
            keyboardType="phone-pad"
            value={editDetails.regNumber}
            onChangeText={text => handleInputChange('regNumber', text)}
          />
        )}

        <InputFeild
          placeholder="Phone"
          keyboardType="phone-pad"
          value={editDetails.phone}
          onChangeText={text => handleInputChange('phone', text)}
        />
        <InputFeild
          placeholder="Department"
          value={editDetails.department}
          onChangeText={text => handleInputChange('department', text)}
        />
        <InputFeild
          placeholder="Bio"
          value={editDetails.bio}
          onChangeText={text => handleInputChange('bio', text)}
          multiline
        />
        <ButtonField
          title="Save Changes"
          onPress={handleSubmit}
          loading={editUserLoading}
        />
      </View>
    </View>
  );
};

export default EditUserDeatils;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  formContainer: {
    padding: 15,
  },
});
