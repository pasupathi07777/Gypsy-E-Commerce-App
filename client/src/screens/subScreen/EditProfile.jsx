import React, {useState} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import InputFeild from '../../components/InputFeild';
import ButtonField from '../../components/ButtonField';
import Header from '../../components/Header';
import {useDispatch, useSelector} from 'react-redux';
import {
  profileState,
  updateProfileDetails,
} from '../../slices/profileSlices/profileSlice';
import {loginState} from '../../slices/authSlices/loginSlice';

const EditProfile = ({navigation}) => {
  const dispatch = useDispatch();
  const { updateProfileDetailsLoading} =
    useSelector(profileState);
  const {currentUser} = useSelector(loginState);

  const [editDetails, setEditDetails] = useState({
    username: currentUser.username || '',
    phone: currentUser.phone || '',
    department: currentUser.department || '',
    bio: currentUser.bio,
    regNumber: currentUser.regNumber || '',
  });

  const handleInputChange = (field, value) => {
    setEditDetails({...editDetails, [field]: value});
  };

  const handleSubmit = () => {
    if (
      !editDetails.username ||
      !editDetails.phone ||
      !editDetails.department || (currentUser.role ==="student" && !editDetails.regNumber)
    ) {
      Alert.alert('', 'Please fill all fields.');
      return;
    }

    dispatch(updateProfileDetails(editDetails))
      .unwrap()
      .then(() => {
        navigation.goBack();
      });
  };

  return (
    <View style={styles.container}>
      <Header topic="Edit Profile" navigation={navigation} />
      <View style={styles.formContainer}>
        <InputFeild
          placeholder="Name"
          value={editDetails.username}
          onChangeText={text => handleInputChange('username', text)}
        />

        {currentUser.role === 'student' && (
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
          loading={updateProfileDetailsLoading}
        />
      </View>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  formContainer: {
    padding: 15,
  },
});
