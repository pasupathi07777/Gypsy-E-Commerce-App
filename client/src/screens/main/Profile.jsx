import React from 'react';
import {StyleSheet, ScrollView, TouchableOpacity, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {loginState, logout} from '../../slices/authSlices/loginSlice';
import StaffProfile from '../../components/StaffProfile';
import {profileState} from '../../slices/profileSlices/profileSlice';

const DynamicProfile = ({navigation}) => {
  const {currentUser} = useSelector(loginState);
  const {updateProfileLoading} = useSelector(profileState);
  const dispatch = useDispatch();

  const staffDetails = {
    username: currentUser.username ?? 'none',
    email: currentUser.email ?? 'None',
    phone: currentUser.phone ?? 'None',
    subject: 'Mathematics',
    department: currentUser.department ?? 'None',
    joiningDate: currentUser.createdAt ?? 'None',
    bio: currentUser.bio ?? 'None',
    profileImage: currentUser.profilePic,
    currentPosition: currentUser.role ?? 'None',
  };

  // Dummy functions for action buttons
  const onEditProfile = () => {
    navigation.navigate('editProfile');
  };

  const onAddUser = () => {
    navigation.navigate('adduser');
  };

  const onAddStaff = () => {
    navigation.navigate('addStaff');
  };

  const onViewAllStudents = () => {
    navigation.navigate('viewAllUser');
  };

  const onAddPost = () => {
    console.log('Add Post clicked');
  };

  const onGoLive = () => {
    console.log('Go Live clicked');
  };
  const onEditEmail = () => {
    navigation.navigate('editEmail');

  };
  const onEditPhoto = () => {
    console.log('Go Live clicked');
  };
  const onLogout = () => {
    dispatch(logout())
      .unwrap()
      .then(() => {
        navigation.navigate('login');
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StaffProfile
        updateProfileLoading={updateProfileLoading}
        staffDetails={staffDetails}
        onEditDetails={onEditProfile}
        onAddUser={onAddUser}
        onViewAllStudents={onViewAllStudents}
        onAddPost={onAddPost}
        onGoLive={onGoLive}
        onEditEmail={onEditEmail}
        onEditPhoto={onEditPhoto}
        onLogout={onLogout}
      />
    </ScrollView>
  );
};

export default DynamicProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 15,
  },
  scrollContent: {
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  details: {
    fontSize: 16,
    color: '#666',
    marginVertical: 2,
  },
  bioContainer: {
    marginVertical: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  bioHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  bioText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
  },
  conversationContainer: {
    marginVertical: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  messageBox: {
    marginVertical: 5,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  messageText: {
    fontSize: 14,
    color: '#333',
  },
  noMessageText: {
    fontSize: 14,
    color: '#aaa',
    textAlign: 'center',
    marginVertical: 10,
  },
  actionButton: {
    marginTop: 15,
    paddingVertical: 12,
    backgroundColor: '#42a5f5',
    borderRadius: 10,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  button: {
    backgroundColor: '#007bff',
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
});
