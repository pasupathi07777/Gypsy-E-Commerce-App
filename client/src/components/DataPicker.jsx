import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

const DataPicker = ({
  style,
  onPress,
  showDatePicker,
  teacherDetails,
  onChange,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.datePickerButton, style]}
        onPress={onPress}>
        <Text style={styles.datePickerText}>
          {teacherDetails.joiningDate
            ? teacherDetails.joiningDate
            : 'Select Joining Date'}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          mode="date"
          display="default"
          value={new Date()}
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default DataPicker;

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  datePickerButton: {
    padding: 12,
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
    borderWidth: 0,
    borderColor: '#ccc',
    justifyContent: 'center',
    height: 50,
  },
  datePickerText: {
    fontSize: 16,
    color: '#333',
  },
});
