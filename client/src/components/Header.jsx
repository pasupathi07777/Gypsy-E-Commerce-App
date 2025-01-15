import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Header = ({navigation, topic}) => {
  const iconGroup = [
    {name: 'search-outline', type: 'Search'},
    {name: 'heart-outline', type: 'Notification'},
    {name: 'cart-outline', type: 'Cart'},
  ];

  const onClickIcon = path => {
    if (path === 'back') {
      navigation.goBack();
    } else {
      navigation.navigate(path);
    }
  };

  return (
    <View style={styles.headerContainer}>
      {/* Left Section: Back Button and Header Text */}
      <View style={styles.leftContainer}>
        <Pressable onPress={() => onClickIcon('back')}>
          <Ionicons name="arrow-back" color="#000" size={24} />
        </Pressable>
        <Text style={styles.headerText}>{topic}</Text>
      </View>

      {/* Right Section: Additional Icons */}
      {/* <View style={styles.rightContainer}>
        {iconGroup.map((icon, index) => (
          <Pressable key={index} onPress={() => onClickIcon(icon.type)}>
            <Ionicons
              name={icon.name}
              color="#000"
              size={24}
              style={styles.icon}
            />
          </Pressable>
        ))}
      </View> */}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f8f8f8',
    height: 50,
    
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 16,
    fontWeight: '400',
    marginLeft: 10,
    textTransform: 'capitalize',
    color: '#000',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 20,
  },
});
