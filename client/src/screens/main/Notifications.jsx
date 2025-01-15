import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      type: 'Post',
      message: 'Your post on "React Native Basics" has been approved.',
      date: '2025-01-01',
      videoUrl: 'https://via.placeholder.com/150', // Example of a video thumbnail
    },
    {
      id: 2,
      type: 'Live',
      message:
        'Join the live session: "Advanced React Native" at 5:00 PM today.',
      date: '2025-01-02',
      videoUrl: '', // No video for this one
    },
    {
      id: 3,
      type: 'Post',
      message:
        'Your post on "Node.js Introduction" has received a new comment.',
      date: '2025-01-03',
      videoUrl: 'https://via.placeholder.com/150', // Example of a video thumbnail
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Notifications</Text>

      {notifications.map(notification => (
        <View key={notification.id} style={styles.notificationContainer}>
          {/* Left: Profile Image */}
          <View style={styles.profileContainer}>
            <Image
              source={{
                uri: 'https://via.placeholder.com/100',
              }}
              style={styles.profileImage}
            />
          </View>

          {/* Center: Text Content */}
          <View style={styles.contentContainer}>
            <Text style={styles.notificationText}>
              <Text style={styles.notificationType}>{notification.type}:</Text>{' '}
              {notification.message.slice(0, 10)}...{' '}
              <Text style={styles.notificationDate}>({notification.date})</Text>
            </Text>
          </View>

          {/* Right: Media or "Join Live" Button */}
          <View style={styles.mediaContainer}>
            {notification.type === 'Live' ? (
              <TouchableOpacity style={styles.goLiveButton}>
                <Text style={styles.goLiveButtonText}>Join Live</Text>
              </TouchableOpacity>
            ) : (
              notification.videoUrl && (
                <Image
                  source={{uri: notification.videoUrl}}
                  style={styles.mediaImage}
                />
              )
            )}
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 15,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  notificationContainer: {
    backgroundColor: '#fff',
    marginBottom: 15,
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  profileContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    marginRight: 10,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  notificationText: {
    fontSize: 16,
    color: '#333',
  },
  notificationType: {
    fontWeight: 'bold',
    color: '#42a5f5',
  },
  notificationDate: {
    fontSize: 14,
    color: '#777',
  },
  mediaContainer: {

    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
  },
  mediaImage: {
    width: 60,
    height: 60,
  },
  goLiveButton: {
    paddingVertical: 6,
    backgroundColor: '#42a5f5',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  goLiveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
