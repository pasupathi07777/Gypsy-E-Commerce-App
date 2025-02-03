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
import RNFS from 'react-native-fs';
import {useDispatch, useSelector} from 'react-redux';
import {loginState} from '../slices/loginSlice';
import {addProfilePhoto, profileStates} from '../slices/profileSlice';
import {launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons'; 

const Profile = ({navigation}) => {
  const {currentUser} = useSelector(loginState);
  const {updateProfileLoading} = useSelector(profileStates);
  const dispatch = useDispatch();
  const [profilePhoto, setProfilePhoto] = useState(currentUser.profilePic);

  const handleImageSelection = () => {
    launchImageLibrary({mediaType: 'photo', quality: 1}, async response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const source = response.assets[0].uri;

        try {
          const selectedImage = await RNFS.readFile(source, 'base64');
          dispatch(addProfilePhoto(`data:image/jpeg;base64,${selectedImage}`))
            .unwrap()
            .then(() => {
                setProfilePhoto(source);

            })
        } catch (error) {
          console.log('Error reading image file:', error);
        } 
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
    // {
    //   id: '8',
    //   name: 'About',
    //   icon: '\u2139',
    //   action: () => navigation.navigate('About'),
    // },
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
            {updateProfileLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <>
                {profilePhoto ? (
                  <Image
                    source={{uri: currentUser.profilePic}}
                    style={styles.profileImage}
                  />
                ) : (
                  <Icon name="person" size={40} color="#fff" />
                )}
                <View style={styles.iconOverlay}>
                  {profilePhoto ? (
                    <Icon name="edit" size={14} color="#fff" />
                  ) : (
                    <Icon name="add" size={14} color="#fff" />
                  )}
                </View>
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
    gap: 10,
    justifyContent: 'center',
  },
  profileIconContainer: {
    position: 'relative',
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 64,
    height: 64,
    resizeMode: 'cover',
    borderRadius: 32,
  },
  iconOverlay: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 12,
    padding: 4,
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
    marginVertical: 20,
    marginHorizontal: 16,
    padding: 16,
    backgroundColor: '#ff4d4d',
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default Profile;