


import React, { useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { launchImageLibrary } from 'react-native-image-picker';
import {
  addMedia,
  removeMedia,
  setSelectedMedia,
  setLoading,
  setLoadingThumbnails,
  selectPostState,
  addPostState,
} from '../../slices/postSlices/addPostSlice';
import Video from 'react-native-video';
import { useNavigation } from '@react-navigation/native';
import navigateFunction from '../../utils/navigateFunction';

const Posts = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {
    mediaList,
    selectedMedia,
    loading,
    loadingThumbnails,
  } = useSelector(addPostState);

  const openGallery = () => {
    launchImageLibrary(
      {
        mediaType: 'mixed',
        quality: 0.5,
        selectionLimit: 0,
      },
      response => handleMediaResponse(response),
    );
  };

  const handleMediaResponse = response => {
    if (response.didCancel) {
      Alert.alert('User cancelled image picker');
    } else if (response.errorCode) {
      Alert.alert('Error:', response.errorMessage);
    } else if (response.assets && response.assets.length > 0) {
      dispatch(setLoading(true));

      const newMedia = response.assets.map(asset => ({
        uri: asset.uri,
        type: asset.type.includes('image') ? 'image' : 'video',
        loading: true,
      }));

      const updatedLoadingState = newMedia.reduce((acc, item) => {
        acc[item.uri] = true;
        return acc;
      }, {});

      dispatch(setLoadingThumbnails(updatedLoadingState));
      dispatch(addMedia({ newMedia }));

      setTimeout(() => {
        dispatch(setLoading(false));
        const updatedThumbnails = newMedia.reduce((acc, item) => {
          acc[item.uri] = false;
          return acc;
        }, {});
        dispatch(setLoadingThumbnails(updatedThumbnails));
      }, 1000);
    }
  };

  const handleMediaSelect = useCallback(
    item => {
      dispatch(setSelectedMedia(item));
    },
    [dispatch],
  );

  const handleMediaRemove = useCallback(
    uri => {
      dispatch(removeMedia(uri));
    },
    [dispatch],
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View>
          <View style={styles.previewBox}>
            {loading ? (
              <ActivityIndicator size="large" color="#2196F3" />
            ) : selectedMedia ? (
              selectedMedia.type === 'image' ? (
                <Image
                  source={{ uri: selectedMedia.uri }}
                  style={styles.mainMediaContent}
                />
              ) : (
                <Video
                  source={{ uri: selectedMedia.uri }}
                  style={styles.mainMediaContent}
                  controls={true}
                  resizeMode="contain"
                  paused={false}
                />
              )
            ) : (
              <Pressable style={styles.addMediaCenter} onPress={openGallery}>
                <Text style={styles.addMediaText}>Add Media</Text>
              </Pressable>
            )}
          </View>

          <View style={styles.thumbnailSection}>
            <ScrollView
              horizontal
              contentContainerStyle={styles.horizontalThumbnails}>
              {mediaList.map((item, index) => (
                <View key={index} style={styles.thumbnailContainer}>
                  {loadingThumbnails[item.uri] ? (
                    <ActivityIndicator
                      style={styles.thumbnail}
                      size="small"
                      color="#2196F3"
                    />
                  ) : (
                    <TouchableOpacity onPress={() => handleMediaSelect(item)}>
                      {item.type === 'image' ? (
                        <Image
                          source={{ uri: item.uri }}
                          style={styles.thumbnail}
                        />
                      ) : (
                        <Video
                          source={{ uri: item.uri }}
                          style={styles.thumbnail}
                          resizeMode="cover"
                          paused={true}
                        />
                      )}
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => handleMediaRemove(item.uri)}>
                    <Text style={styles.removeButtonText}>X</Text>
                  </TouchableOpacity>
                </View>
              ))}
              <Pressable style={styles.addMoreButton} onPress={openGallery}>
                <Text style={styles.addMoreText}>+</Text>
              </Pressable>
            </ScrollView>
          </View>
        </View>
      </ScrollView>

      {mediaList.length > 0 && (
        <Pressable
          style={styles.postButton}
          onPress={() => navigateFunction(navigation, 'submitPost')}>
          <Text style={styles.postButtonText}>Next</Text>
        </Pressable>
      )}
    </KeyboardAvoidingView>
  );
};

export default Posts;





const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f5f5f5',
  },
  previewBox: {
    height: 400,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addMediaCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addMediaText: {
    fontSize: 18,
    color: '#777',
  },
  mainMediaContent: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  thumbnailSection: {
    flex: 1,
    justifyContent: 'space-between',
  },
  horizontalThumbnails: {
    flexDirection: 'row',
  },
  thumbnailContainer: {
    position: 'relative',
    margin: 5,
  },
  thumbnail: {
    width: 100,
    height: 100,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  removeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(255, 0, 0, 0.8)',
    padding: 5,
    borderRadius: 15,
    width:22,
    height:22,
    alignItems:"center",
    justifyContent:"center"
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: 'bold',
  },
  addMoreButton: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  addMoreText: {
    fontSize: 24,
    color: '#777',
    fontWeight: 'bold',
  },
  captionInput: {
    fontSize: 16,
    padding: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    height: 100,
    color: 'black',
  },
  postButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  postButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
