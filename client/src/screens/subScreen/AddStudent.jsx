import React, { useState, useCallback, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Header from '../../components/Header';
import InputFeild from '../../components/InputFeild';
import ButtonField from '../../components/ButtonField';
import MonthPicker from 'react-native-month-year-picker';
import DateTimePicker from '@react-native-community/datetimepicker'; 

const AddStudent = ({ navigation }) => {
  const [studentDetails, setStudentDetails] = useState({
    name: '',
    regNum: '',
    department: '',
    email: '',
    phone: '',
    dob: '',
    startYear: '', 
    passedOutYear: '', 
  });

  const [showPicker, setShowPicker] = useState({
    field: null, 
    visible: false, 
  });

  const [showDOBPicker, setShowDOBPicker] = useState(false);

  const handleInputChange = (field, value) => {
    setStudentDetails((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  useEffect(() => {
    console.log('Student Details Updated:', studentDetails);
  }, [studentDetails]);

  const handlePickerConfirm = useCallback(
    (event, date) => {
      setShowPicker({field: null, visible: false}); 

      if (event === 'dateSetAction' && date) {
        const formattedDate = `${date.getFullYear()}-${String(
          date.getMonth() + 1
        ).padStart(2, '0')}`;

        if (showPicker.field) {
          handleInputChange(showPicker.field, formattedDate); 
        }

        console.log(`Formatted ${showPicker.field}:`, formattedDate);
      }
    },
    [showPicker]
  );

  const handleDOBChange = (event, selectedDate) => {
    setShowDOBPicker(false); // Close DOB picker
    if (event.type === 'set' && selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      handleInputChange('dob', formattedDate); // Update DOB field
      console.log('Selected DOB:', formattedDate);
    }
  };

  const handleSubmit = () => {
    const {
      name,
      regNum,
      department,
      email,
      phone,
      dob,
      startYear,
      passedOutYear,
    } = studentDetails;

    if (
      !name ||
      !regNum ||
      !department ||
      !email ||
      !phone ||
      !dob ||
      !startYear ||
      !passedOutYear
    ) {
      Alert.alert('Error', 'Please fill in all the details.');
      return;
    }

    Alert.alert('Success', 'Student details added successfully!');
    setStudentDetails({
      name: '',
      regNum: '',
      department: '',
      email: '',
      phone: '',
      dob: '',
      startYear: '',
      passedOutYear: '',
    });
  };

  return (
    <View style={styles.container}>
      <Header topic="Add Student" navigation={navigation} />
      <ScrollView contentContainerStyle={styles.formContainer}>
        <InputFeild
          placeholder="Name"
          value={studentDetails.name}
          onChangeText={(text) => handleInputChange('name', text)}
        />
        <InputFeild
          placeholder="Registration Number"
          value={studentDetails.regNum}
          onChangeText={(text) => handleInputChange('regNum', text)}
        />
        <InputFeild
          placeholder="Department"
          value={studentDetails.department}
          onChangeText={(text) => handleInputChange('department', text)}
        />
        <InputFeild
          placeholder="Email"
          keyboardType="email-address"
          value={studentDetails.email}
          onChangeText={(text) => handleInputChange('email', text)}
        />
        <InputFeild
          placeholder="Phone Number"
          keyboardType="phone-pad"
          value={studentDetails.phone}
          onChangeText={(text) => handleInputChange('phone', text)}
        />

        {/* Date of Birth Picker */}
        <TouchableOpacity
          onPress={() => setShowDOBPicker(true)}
          style={styles.pickerButton}>
          <Text style={styles.pickerButtonText}>
            {studentDetails.dob || 'Select Date of Birth'}
          </Text>
        </TouchableOpacity>

        {showDOBPicker && (
          <DateTimePicker
            mode="date"
            display="calendar"
            value={studentDetails.dob ? new Date(studentDetails.dob) : new Date()}
            onChange={handleDOBChange}
            maximumDate={new Date()} // Prevent selecting future dates
          />
        )}

        <TouchableOpacity
          onPress={() => setShowPicker({ field: 'startYear', visible: true })}
          style={styles.pickerButton}>
          <Text style={styles.pickerButtonText}>
            {studentDetails.startYear || 'Select Start Year'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            setShowPicker({ field: 'passedOutYear', visible: true })
          }
          style={styles.pickerButton}>
          <Text style={styles.pickerButtonText}>
            {studentDetails.passedOutYear || 'Select Passed-Out Year'}
          </Text>
        </TouchableOpacity>

        {showPicker.visible && (
          <MonthPicker
            onChange={handlePickerConfirm}
            value={
              studentDetails[showPicker.field]
                ? new Date(studentDetails[showPicker.field])
                : new Date()
            }
            minimumDate={new Date(2000, 0)} // Earliest selectable year
            maximumDate={new Date(new Date().getFullYear() + 5, 11)} // Latest selectable year
            locale="en" // Optional: Set locale for formatting
          />
        )}

        <ButtonField title="Add Student" onPress={handleSubmit} />
      </ScrollView>
    </View>
  );
};

export default AddStudent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  formContainer: {
    padding: 15,
    alignItems: 'center',
  },
  pickerButton: {
    width: '100%',
    padding: 10,
    marginBottom: 15,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
    height: 50,
    justifyContent: 'center',
  },
  pickerButtonText: {
    fontSize: 16,
    color: '#333',
  },
});
