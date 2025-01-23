import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HomeHeader = ({navigation}) => {
  const onSearchPress = () => {
    navigation.navigate('Search');
  };
  return (
    <View style={styles.headerContainer}>
      {/* Logo Title */}
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>Feathrly</Text>
      </View>

      {/* Search Icon */}
      <TouchableOpacity
        onPress={onSearchPress}
        style={styles.searchIconContainer}>
        <Ionicons name="search-outline" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    height: 60,
    zIndex: 100,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
    letterSpacing: 1.5,
    fontFamily: 'sans-serif-condensed',
  },
  searchIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,

  },
});
