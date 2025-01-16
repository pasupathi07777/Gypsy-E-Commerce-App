import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {launchImageLibrary} from 'react-native-image-picker';
import Header from '../components/Header';

const Profile = ({navigation}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(
    'https://via.placeholder.com/150', // Default placeholder image
  );
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '+1 234 567 890',
    address: '1234 Street Name, City, Country',
  });

  const handleInputChange = (field, value) => {
    setProfileData(prevState => ({...prevState, [field]: value}));
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleEditPhoto = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User canceled image picker');
      } else if (response.errorMessage) {
        Alert.alert('Error', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const selectedImage = response.assets[0].uri;
        setProfilePhoto(selectedImage);
      }
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Header navigation={navigation} topic={"Profile"} />
      {/* Profile Section */}
      <View style={styles.profileHeader}>
        <View style={styles.imageContainer}>
          <Image source={{uri: profilePhoto}} style={styles.profileImage} />
          <TouchableOpacity
            style={styles.editPhotoButton}
            onPress={handleEditPhoto}>
            <AntDesign name="edit" size={14} color="#000" />
          </TouchableOpacity>
        </View>
        {/* <Text style={styles.profileName}>{profileData.name}</Text> */}
        <Text style={styles.profileEmail}>{profileData.email}</Text>
      </View>

      {/* Editable Profile Details */}
      <View style={styles.detailsBox}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Name:</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={profileData.name}
              onChangeText={value => handleInputChange('name', value)}
            />
          ) : (
            <Text style={styles.detailValue}>{profileData.name}</Text>
          )}
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Email:</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={profileData.email}
              onChangeText={value => handleInputChange('email', value)}
            />
          ) : (
            <Text style={styles.detailValue}>{profileData.email}</Text>
          )}
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Phone:</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={profileData.phone}
              onChangeText={value => handleInputChange('phone', value)}
              keyboardType="phone-pad"
            />
          ) : (
            <Text style={styles.detailValue}>{profileData.phone}</Text>
          )}
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Address:</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={profileData.address}
              onChangeText={value => handleInputChange('address', value)}
            />
          ) : (
            <Text style={styles.detailValue}>{profileData.address}</Text>
          )}
        </View>

        {/* Edit Toggle Button */}
        <TouchableOpacity style={styles.button} onPress={toggleEditing}>
          <AntDesign
            name={isEditing ? 'save' : 'edit'}
            size={20}
            color="#fff"
          />
          <Text style={styles.buttonText}>
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.button}>
          <AntDesign name="shoppingcart" size={20} color="#fff" />
          <Text style={styles.buttonText}>My Orders</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.logoutButton]}>
          <AntDesign name="logout" size={20} color="#fff" />
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  profileHeader: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#007bff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  imageContainer: {
    position: 'relative',
    width: 120,
    height: 120,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#fff',
  },
  editPhotoButton: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 5,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  profileEmail: {
    fontSize: 16,
    color: '#e0e0e0',
    marginTop: 10,
  },
  detailsBox: {
    margin: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 16,
    color: '#555',
    flex: 1,
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
    flex: 2,
  },
  input: {
    flex: 2,
    padding: 5,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    fontSize: 16,
    color: '#333',
  },
  actionButtons: {
    margin: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    marginLeft: 10,
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: 'red',
  },
});

export default Profile;
