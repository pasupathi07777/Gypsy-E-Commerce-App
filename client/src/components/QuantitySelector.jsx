import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

const QuantitySelector = ({quantity, onIncrease, onDecrease, style}) => {
  return (
    <View style={styles.quantityContainer}>
      <Pressable
        style={[styles.quantityButton, style]}
        onPress={onDecrease}
        disabled={quantity <= 1}>
        <Text
          style={[styles.quantityText, quantity <= 1 && styles.disabledText]}>
          -
        </Text>
      </Pressable>

      <Text style={styles.quantity}>{quantity}</Text>

      <Pressable style={[styles.quantityButton, style]} onPress={onIncrease}>
        <Text style={styles.quantityText}>+</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  quantityText: {
    fontSize: 18,
  },
  quantity: {
    marginHorizontal: 8,
    fontSize: 16,
  },
  disabledText: {
    color: '#bbb',
  },
});

export default QuantitySelector;
