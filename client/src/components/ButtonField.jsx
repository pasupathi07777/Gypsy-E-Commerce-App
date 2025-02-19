import {
  ActivityIndicator,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';

const {width, height} = Dimensions.get('window');
const ButtonField = ({
  title,
  onPress,
  loading,
  style,
  disabled,
  buttonTextStyle,
  loderStyle,
}) => {
  return (
    <Pressable
      style={[styles.button, style]}
      onPress={onPress}
      disabled={loading || disabled}>
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator
            size="small"
            color={loderStyle ? loderStyle : '#FFFFFF'}
            style={styles.loader}
          />
        ) : (
          <Text style={[styles.buttonText, buttonTextStyle]}>{title}</Text>
        )}
      </View>
    </Pressable>
  );
};

export default ButtonField;

const styles = StyleSheet.create({
  button: {
    height: 50,
    backgroundColor: '#007BFF',
    // borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
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
