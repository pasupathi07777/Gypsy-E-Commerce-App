import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import MonthYearPicker from 'react-native-month-year-picker';

const MonthPicker = ({
  value, // Ensure value is passed in from the parent
  onPress,
  handlePickerConfirm,
  onCancel,
  isPickerVisible,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Passed-Out Year (YYYY-MM)"
        value={value} // Controlled input
        onFocus={onPress} // Open the picker when focused
        style={styles.input}
      />

      {isPickerVisible && (
        <MonthYearPicker
          selectedDate={new Date(value)} 
          onConfirm={handlePickerConfirm}
          onCancel={onCancel}
          value={new Date(value)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
});

export default MonthPicker;

