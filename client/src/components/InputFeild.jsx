import {StyleSheet, TextInput, View} from 'react-native';
import React from 'react';

const InputFeild = ({
style,
  placeholder,
  value,
  onChangeText,
  multiline = false,
  keyboardType,
}) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={[styles.input, style]} 
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        keyboardType={keyboardType}
      />
    </View>
  );
};

export default InputFeild;

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 15,
    width: '100%',  
    overflow:"hidden"
  },
  input: {
    padding: 10,
    fontSize: 16,
    backgroundColor: '#f8f8f8', 
    // borderRadius: 5,
    color: '#333',
    backgroundColor: '#f8f8f8',
    height: 55,
  },
});
