import { ActivityIndicator, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
 
const { width, height } = Dimensions.get('window');
const ButtonField = ({ title, onPress, loading }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} disabled={loading}>
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator size="small" color="#FFFFFF" style={styles.loader} />
        ) : (
          <Text style={styles.buttonText}>{title}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ButtonField;

const styles = StyleSheet.create({
  button: {
    height: 50,
    backgroundColor: '#007BFF', 
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    width: '100%',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff', 
    fontWeight: 'bold',
  },
  loader: {
    marginRight: 10,
  },
});
