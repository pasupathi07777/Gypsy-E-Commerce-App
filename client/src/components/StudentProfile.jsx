import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

const StudentProfile = ({studentDetails, onEditProfile}) => {
  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri:
                studentDetails.profileImage ||
                'https://via.placeholder.com/150',
            }}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.editImageButton}>
            <Text style={styles.editImageButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>{studentDetails.name}</Text>
        <Text style={styles.email}>{studentDetails.email}</Text>
        <Text style={styles.regNum}>Reg. Number: {studentDetails.regNum}</Text>
      </View>

      {/* Profile Details */}
      <View style={styles.detailsBox}>
        <Text style={styles.detailTitle}>Profile Details</Text>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Phone:</Text>
          <Text style={styles.detailValue}>{studentDetails.phone}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Department:</Text>
          <Text style={styles.detailValue}>{studentDetails.department}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>DOB:</Text>
          <Text style={styles.detailValue}>{studentDetails.dob}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Start Year:</Text>
          <Text style={styles.detailValue}>{studentDetails.startYear}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Passed-Out Year:</Text>
          <Text style={styles.detailValue}>{studentDetails.passedOutYear}</Text>
        </View>
      </View>

      {/* Edit Profile Button */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.button} onPress={onEditProfile}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default StudentProfile;

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
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#fff',
  },
  editImageButton: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#007bff',
    borderRadius: 15,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  editImageButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  email: {
    fontSize: 16,
    color: '#e0e0e0',
  },
  regNum: {
    fontSize: 16,
    color: '#cce5ff',
    fontStyle: 'italic',
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
  actionButtons: {
    alignItems: 'center',
    // marginVertical: 20,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
