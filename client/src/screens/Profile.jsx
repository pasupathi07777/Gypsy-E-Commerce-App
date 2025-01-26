import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {loginState} from '../slices/loginSlice';
import {addProfilePhoto} from '../slices/profileSlice'; // Redux action to upload profile photo
import {launchImageLibrary} from 'react-native-image-picker';

const Profile = ({navigation}) => {
  const {currentUser} = useSelector(loginState);
  const dispatch = useDispatch();
  const [profilePhoto, setProfilePhoto] = useState(currentUser?.profileImage);
  const [loading, setLoading] = useState(false); // State to manage loader

  const handleImageSelection = () => {
    launchImageLibrary({mediaType: 'photo', quality: 1}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const source = response.assets[0].uri;
        setProfilePhoto(source);
        setLoading(true); 
        dispatch(addProfilePhoto({image: source})).finally(() =>
          setLoading(false),
        ); 
      }
    });
  };

  const profileOptions = [
    {
      id: '1',
      name: 'My Orders',
      icon: '\u{1F6D2}',
      action: () => navigation.navigate('MyOrders'),
    },
    {
      id: '2',
      name: 'Wishlist',
      icon: '\u2764',
      action: () => navigation.navigate('wishlist'),
    },
    {
      id: '3',
      name: 'Delivery Address',
      icon: '\u{1F4CD}',
      action: () => navigation.navigate('Address'),
    },
    {
      id: '6',
      name: 'Notifications',
      icon: '\u{1F514}',
      action: () => navigation.navigate('Notifications'),
    },
    {
      id: '7',
      name: 'Help',
      icon: '\u2753',
      action: () => console.log('Navigate to Help'),
    },
    {
      id: '8',
      name: 'About',
      icon: '\u2139',
      action: () => navigation.navigate('About'),
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
        <TouchableOpacity onPress={handleImageSelection}>
          <View style={styles.profileIconContainer}>
            {loading ? (
              <ActivityIndicator size="small" color="#fff" /> // Loader while uploading
            ) : (
              <>
                <Image
                  source={{
                    uri:
                      profilePhoto || 'https://example.com/default-profile.jpg',
                  }}
                  style={styles.profileImage}
                />
                <Text style={styles.uploadIcon}>+</Text>
              </>
            )}
          </View>
        </TouchableOpacity>

        <View style={styles.userInfoContainer}>
          <Text style={styles.userName}>
            {currentUser?.username || 'Guest User'}
          </Text>
          <Text style={styles.userEmail}>
            {currentUser?.email || 'No Email'}
          </Text>
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
    gap:10,
    justifyContent:"center"
  },
  profileIconContainer: {
    position: 'relative', // To position the upload icon over the image
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#4CAF50', // Background color for the circle
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  uploadIcon: {
    position: 'absolute',
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
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
