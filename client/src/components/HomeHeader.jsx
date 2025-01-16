import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const HomeHeader = ({ navigation }) => {
  const [cartCount, setCartCount] = useState(1); 

  const iconGroup = [
    { name: 'search-outline', type: 'Search' },
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
      {/* Left Section: Logo */}
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>Feathrly</Text>
      </View>

      {/* Right Section: Additional Icons */}
      <View style={styles.rightContainer}>
        {/* {iconGroup.map((icon, index) => (
          <Pressable key={index} onPress={() => onClickIcon(icon.type)}>
            <Ionicons
              name={icon.name}
              color="#000"
              size={24}
              style={styles.icon}
            />
          </Pressable>
        ))} */}

        {/* Cart Icon with Count */}
        <Pressable onPress={() => onClickIcon('Cart')} style={styles.cartContainer}>
          <Ionicons
            name="cart-outline"
            color="#000"
            size={24}
            style={styles.icon}
          />
    
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartCount}</Text>
            </View>
   
        </Pressable>

        {/* Profile Icon */}
        <Pressable onPress={() => onClickIcon('Profile')}>
          <AntDesign
            name="user"
            color="#000"
            size={24}
            style={styles.icon}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    // borderBottomWidth: 1,
    // borderBottomColor: '#f8f8f8',
    height: 60,
    zIndex:100
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#348ceb',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    fontFamily: 'sans-serif-condensed',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 20,
  },
  cartContainer: {
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -10,
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
