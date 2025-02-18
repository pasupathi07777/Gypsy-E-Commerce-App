import {StyleSheet, Text, View, TouchableOpacity, Image, Pressable} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const HomeHeader = ({navigation}) => {
  const onSearchPress = () => {
    navigation.navigate('Search');
  };
  return (
    <View style={styles.headerContainer}>
      {/* Logo Title */}
      <View style={styles.logoContainer}>
        <Image style={styles.tinyLogo} source={require('../assets/gypy.png')} />
      </View>

      {/* Search Icon */}
      <Pressable onPress={onSearchPress} style={styles.searchIconContainer}>
        <FontAwesome5 name="search" size={20} color="#000" />
      </Pressable>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingHorizontal: 10,
    backgroundColor: '#fff',
    height: 60,
    zIndex: 100,
    elevation: 0.3, 
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  tinyLogo: {
    height: 35, // Adjust this value to scale the logo properly
    width: 100, // Adjust this value as needed
    resizeMode: 'contain', // Ensures the logo maintains its aspect ratio
    // backgroundColor: 'gray',
  },
});
