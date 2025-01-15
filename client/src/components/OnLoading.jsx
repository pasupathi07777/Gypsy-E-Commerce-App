import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import React from 'react';

const OnLoading = ({size = 'large', color = '#0000ff'}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
      {/* <Text style={styles.text}>Loading...</Text> */}
    </View>
  );
};

export default OnLoading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
});
