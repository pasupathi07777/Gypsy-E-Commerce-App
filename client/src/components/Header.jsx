import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Header = ({navigation, topic}) => {


  const onClickIcon = path => {
    if (path === 'back') {
      navigation.goBack();
    } else {
      navigation.navigate(path);
    }
  };

  return (
    <View style={styles.headerContainer}>

      <View style={styles.leftContainer}>

        <Pressable onPress={() => onClickIcon('back')}>
          <Ionicons name="arrow-back" color="#878787" size={24} />
        </Pressable>

        <Text style={styles.headerText}>{topic}</Text>

      </View>

      <View style={styles.iconGroup}>

        <Pressable onPress={() => onClickIcon('Cart')}>
          <MaterialIcons name={'shopping-cart'} size={24} color={'#878787'} />
        </Pressable>

        <Pressable onPress={() => onClickIcon('Profile')}>
          <FontAwesome name={'user'} size={24} color={'#878787'} />
        </Pressable>

      </View>

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
  iconGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 15,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 10,
    textTransform: 'capitalize',
    color: '#878787',
  },

  icon: {
    marginLeft: 20,
  },
});
