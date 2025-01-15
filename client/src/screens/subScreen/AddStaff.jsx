import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import InputFeild from '../../components/InputFeild';
import SelectPicker from '../../components/SelectPicker';
import DataPicker from '../../components/DataPicker';
import ButtonField from '../../components/ButtonField';
import Header from '../../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { profileState } from '../../slices/profileSlices/profileSlice';
import { addStaff } from '../../slices/profileSlices/staffSlice';

const AddStaff = ({navigation}) => {
  // const {} =useSelector() 
  const {editProfile} = useSelector(profileState);
  const dispatch=useDispatch()
  const [teacherDetails, setTeacherDetails] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    joiningDate: '',
    department: '',
    bio: '',
    currentPosition: '',
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleInputChange = (field, value) => {
    setTeacherDetails({...teacherDetails, [field]: value});
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      handleInputChange('joiningDate', formattedDate);
    }
  };

  const handleSubmit = () => {
    if (
      !teacherDetails.name ||
      !teacherDetails.email ||
      !teacherDetails.phone ||
      !teacherDetails.subject ||
      !teacherDetails.department ||
      !teacherDetails.bio ||
      !teacherDetails.currentPosition ||
      !teacherDetails.joiningDate
    ) {
      Alert.alert('Validation', 'Please fill all fields.');
      return;
    }

    console.log('Teacher Details Submitted:', teacherDetails);
    dispatch(addStaff(teacherDetails));
  };


    useEffect(() => {
      // if(editProfile){
  
      // }
    }, []);

  return (
    <View style={styles.container}>
      <Header topic="Add Staff" navigation={navigation} />

      <View style={styles.formContainer}>
        <InputFeild
          placeholder={'Name'}
          value={teacherDetails.name}
          onChangeText={text => handleInputChange('name', text)}
        />

        <InputFeild
          placeholder="Email"
          keyboardType="email-address"
          value={teacherDetails.email}
          onChangeText={text => handleInputChange('email', text)}
        />

        <InputFeild
          placeholder="Phone Number"
          keyboardType="phone-pad"
          value={teacherDetails.phone}
          onChangeText={text => handleInputChange('phone', text)}
        />

        <InputFeild
          placeholder="Subject"
          value={teacherDetails.subject}
          onChangeText={text => handleInputChange('subject', text)}
        />

        <InputFeild
          placeholder="Department"
          value={teacherDetails.department}
          onChangeText={text => handleInputChange('department', text)}
        />

        <InputFeild
          placeholder="Bio"
          value={teacherDetails.bio}
          onChangeText={text => handleInputChange('bio', text)}
          multiline
        />

        <SelectPicker
          selectedValue={teacherDetails.currentPosition}
          onValueChange={itemValue =>
            handleInputChange('currentPosition', itemValue)
          }
        />

        <DataPicker
          onPress={() => setShowDatePicker(true)}
          teacherDetails={teacherDetails}
          onChange={handleDateChange}
          showDatePicker={showDatePicker}
        />

        <ButtonField title="Submit" onPress={handleSubmit} />
      </View>
    </View>
  );
};

export default AddStaff;

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
  picker: {
    height: 50,
    marginBottom: 15,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
