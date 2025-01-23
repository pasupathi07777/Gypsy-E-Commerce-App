import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';

const Profile = ({navigation}) => {
  const profileOptions = [
    {
      id: '1',
      name: 'My Orders',
      icon: '\u{1F6D2}',
      action: () => console.log('My Orders'),
    },
    {
      id: '2',
      name: 'Wishlist',
      icon: '\u2764',
      action: () => console.log('Wishlist'),
    },
    {
      id: '3',
      name: 'Delivery Address',
      icon: '\u{1F4CD}',
      action: () => console.log('Delivery Address'),
    },
    {
      id: '4',
      name: 'Payment Methods',
      icon: '\u{1F4B3}',
      action: () => console.log('Payment Methods'),
    },
    {
      id: '5',
      name: 'Offers',
      icon: '\u{1F4B0}',
      action: () => console.log('Offers'),
    },
    {
      id: '6',
      name: 'Notifications',
      icon: '\u{1F514}',
      action: () => console.log('Notifications'),
    },
    {id: '7', name: 'Help', icon: '\u2753', action: () => console.log('Help')},
    {
      id: '8',
      name: 'About',
      icon: '\u2139',
      action: () => console.log('About'),
    },
  ];

  const renderOption = ({item}) => (
    <TouchableOpacity style={styles.optionContainer} onPress={item.action}>
      <Text style={styles.icon}>{item.icon}</Text>
      <Text style={styles.optionText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={{uri: 'https://example.com/profile.jpg'}} // Replace with a real image URL
          style={styles.profileImage}
        />
        <View style={styles.userInfoContainer}>
          <Text style={styles.userName}>Jane Doe</Text>
          <Text style={styles.userEmail}>janedoe@gmail.com</Text>
        </View>
      </View>
      <FlatList
        data={profileOptions}
        renderItem={renderOption}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.optionsList}
      />
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => console.log('Log Out')}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  profileImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
  },
  userInfoContainer: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
  },
  userEmail: {
    fontSize: 14,
    color: '#888',
  },
  optionsList: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  icon: {
    fontSize: 18,
    marginRight: 16,
  },
  optionText: {
    fontSize: 16,
  },
  logoutButton: {
    marginTop: 32,
    marginHorizontal: 16,
    padding: 16,
    backgroundColor: '#ff4d4d',
    borderRadius: 4,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default Profile;
