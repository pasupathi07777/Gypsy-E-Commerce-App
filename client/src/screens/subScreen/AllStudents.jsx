import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  deleteUserByTeacher,
  getAllUser,
  loginState,
  setEditUser,
} from '../../slices/authSlices/loginSlice';
import InputFeild from '../../components/InputFeild';
import OnLoading from '../../components/OnLoading';

const AllStudents = ({navigation}) => {
  const {
    allStudent,
    getAllUserLoading,
    currentUser,
    editUser,
    editUserLoading,
  } = useSelector(loginState);

  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    dispatch(getAllUser(currentUser));
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      setFilteredUsers(
        allStudent.filter(
          user =>
            user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      );
    } else {
      setFilteredUsers(allStudent);
    }
  }, [searchQuery, allStudent]);

  const handleEdit = user => {
    dispatch(setEditUser(user));
    navigation.navigate('editUserDetails');
  };

  const handleDelete = user => {
    Alert.alert(
      'Confirm Delete',
      `Are you sure you want to delete user ${user.username}?`,
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            dispatch(deleteUserByTeacher(user));
          },
        },
      ],
      {cancelable: true},
    );
  };

  return (
    <View style={styles.container}>
      {/* Search Field */}
      <InputFeild
        style={styles.inputField}
        placeholder="Search by username or email"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Total Count */}
      <Text style={styles.totalCount}>
        Total Students: {filteredUsers.length}
      </Text>

      {/* User List */}
      {getAllUserLoading ? (
        <OnLoading size={50} />
      ) : (
        <ScrollView>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <View key={user.id || index} style={styles.card}>
                {/* User Details */}
                <Text style={styles.label}>Username:</Text>
                <Text style={styles.value}>{user.username}</Text>

                <Text style={styles.label}>Email:</Text>
                <Text style={styles.value}>{user.email}</Text>

                <Text style={styles.label}>Phone:</Text>
                <Text style={styles.value}>{user.phone || 'Not provided'}</Text>

                <Text style={styles.label}>Reg. Number:</Text>
                <Text style={styles.value}>{user.regNumber || 'N/A'}</Text>

                <Text style={styles.label}>Bio:</Text>
                <Text style={styles.value}>{user.bio || 'Not provided'}</Text>

                {/* Action Buttons */}
                <View style={styles.actions}>
                  <TouchableOpacity
                    style={[styles.button, styles.editButton]}
                    onPress={() => handleEdit(user)}>
                    <Text style={styles.buttonText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, styles.deleteButton]}
                    onPress={() => handleDelete(user)}>
                    <Text style={styles.buttonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.noResults}>No students found</Text>
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default AllStudents;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  inputField: {
    backgroundColor: '#fff',
    elevation: 3,
    paddingHorizontal: 10,
    borderRadius: 8,
    height: 50,
    marginBottom: 10,
  },
  totalCount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    flex: 1,
    marginHorizontal: 5,
  },
  editButton: {
    backgroundColor: '#4CAF50',
  },
  deleteButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  noResults: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
});
