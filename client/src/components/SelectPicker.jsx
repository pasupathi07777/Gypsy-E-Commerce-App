import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Picker} from '@react-native-picker/picker';

const SelectPicker = ({selectedValue, style, onValueChange}) => {
  return (
    <View style={[styles.pickerContainer, style]}>
      <Picker
        selectedValue={selectedValue}
        style={styles.picker}
        onValueChange={onValueChange}
        itemStyle={styles.pickerItem}>
        <Picker.Item label="Select Role" value=""  /> 
        <Picker.Item label="Student" value="student"  />
        <Picker.Item label="Staff" value="staff" />
      </Picker>
    </View>
  );
};

export default SelectPicker;

const styles = StyleSheet.create({
  pickerContainer: {
    borderRadius: 5,
    backgroundColor: '#f8f8f8',
    marginBottom: 15,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  pickerItem: {
    color: '#808080', // Default gray color for items
  },
});
