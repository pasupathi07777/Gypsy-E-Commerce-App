import React, {useState} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import InputFeild from '../../components/InputFeild';
import ButtonField from '../../components/ButtonField';
import Header from '../../components/Header';
import {useDispatch, useSelector} from 'react-redux';
import {
  profileState,
  updateEmail,
} from '../../slices/profileSlices/profileSlice';
import {loginState} from '../../slices/authSlices/loginSlice';

const EditEmail = ({navigation}) => {
  const dispatch = useDispatch();
  const {updateEmailLoading} = useSelector(profileState);
  const {currentUser} = useSelector(loginState);

  const [editDetails, setEditDetails] = useState({
    email: currentUser.email || '',
  });

  const handleInputChange = (field, value) => {
    setEditDetails({...editDetails, [field]: value});
  };

  const handleSubmit = () => {
    if (!editDetails.email) {
      Alert.alert('', 'Please enter a valid email.');
      return;
    }

    dispatch(updateEmail(editDetails))
      .unwrap()
      .then(() => {
        navigation.navigate('OtpScreen');
      })

  };

  return (
    <View style={styles.container}>
      <Header topic="Edit Email" navigation={navigation} />
      <View style={styles.formContainer}>
        <InputFeild
          placeholder="Email"
          value={editDetails.email}
          onChangeText={text => handleInputChange('email', text)}
          keyboardType="email-address"
        />
        <ButtonField
          title="Save Changes"
          onPress={handleSubmit}
          loading={updateEmailLoading}
        />
      </View>
    </View>
  );
};

export default EditEmail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  formContainer: {
    padding: 15,
  },
});
