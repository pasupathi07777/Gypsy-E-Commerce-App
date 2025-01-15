import React, {useState} from 'react';
import RNFS from 'react-native-fs';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/Feather';
import {launchImageLibrary} from 'react-native-image-picker';
import {useDispatch} from 'react-redux';
import { updateProfilePhoto} from '../slices/profileSlices/profileSlice';
const StaffProfile = ({
  updateProfileLoading,
  staffDetails,
  onEditDetails,
  onAddUser,
  onViewAllStudents,
  onAddPost,
  onGoLive,
  onEditEmail,
  onLogout,
}) => {
  const [profileImage, setProfileImage] = useState(
    staffDetails.profileImage || 'https://via.placeholder.com/150',
  );

  const dispatch = useDispatch();

  const onEditPhoto = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, async response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        Alert.alert('Error', response.errorMessage);
      } else {
        try {
          const selectedImage = await RNFS.readFile(
            response.assets[0].uri,
            'base64',
          );

          dispatch(
            updateProfilePhoto(`data:image/jpeg;base64,${selectedImage}`),
          );
        } catch (error) {
          console.error('Error reading image file:', error);
        }
      }
    });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.profileHeader}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: staffDetails.profileImage || profileImage}}
            style={styles.profileImage}
          />
          {updateProfileLoading && (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="small" color="#FFFFFF" />
            </View>
          )}
          <TouchableOpacity
            style={styles.editPhotoButton}
            onPress={onEditPhoto}>
            <AntDesign name="edit" size={14} color="#000" />
          </TouchableOpacity>
        </View>
        <View style={styles.emailRow}>
          <Text style={styles.email}>{staffDetails.email}</Text>
          <TouchableOpacity
            style={styles.editEmailButton}
            onPress={onEditEmail}>
            <AntDesign name="edit" size={14} color="gray" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Profile Details */}
      <View style={styles.detailsBox}>
        <Text style={styles.detailTitle}>Bio</Text>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Username:</Text>
          <Text style={styles.detailValue}>{staffDetails.username}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Phone:</Text>
          <Text style={styles.detailValue}>{staffDetails.phone}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Subject:</Text>
          <Text style={styles.detailValue}>{staffDetails.subject}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Department:</Text>
          <Text style={styles.detailValue}>{staffDetails.department}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Joining Date:</Text>
          <Text style={styles.detailValue}>{staffDetails.joiningDate.slice(0,10)}</Text>
        </View>
        <View style={styles.bioRow}>
          <Text style={styles.detailLabel}>Bio</Text>
          <Text style={styles.bioBox}>{staffDetails.bio || 'None'}</Text>
        </View>
        <TouchableOpacity
          style={styles.editDetailsButton}
          onPress={onEditDetails}>
          <Text style={styles.editDetailsText}>Edit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.button} onPress={onAddUser}>
          <Text style={styles.buttonText}>Add User</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onViewAllStudents}>
          <Text style={styles.buttonText}>View All User</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onAddPost}>
          <Text style={styles.buttonText}>Add Post</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onGoLive}>
          <Text style={styles.buttonText}>Go Live</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutBtn} onPress={onLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default StaffProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 20,
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
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional overlay
    borderRadius: 60, // Match the image border radius
  },
  editPhotoButton: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 5,
  },
  emailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  email: {
    fontSize: 16,
    color: '#e0e0e0',
  },
  editEmailButton: {
    borderRadius: 15,
    padding: 5,
  },
  detailsBox: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 5,
    marginVertical: 20,
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 5,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
  },
  editDetailsButton: {
    marginTop: 15,
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    height: 50,
  },
  editDetailsText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  actionButtons: {
    // paddingHorizontal: ,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  logoutBtn: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bioRow: {
    gap: 5,
  },
  bioBox: {
    width: '100%',
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#f0f4f7', // Light background color for better readability
    borderRadius: 4,
    borderWidth: 0,
    borderColor: '#d1d9e0', // Soft border color
    fontSize: 14, // Adjust font size for better visibility
    color: '#333', // Dark text color for contrast
    textAlign: 'left', // Align text to the left
    minHeight: 70,
  },
});
