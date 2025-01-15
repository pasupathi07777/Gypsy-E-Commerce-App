import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ScrollView,

} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addPost, setPostCaption } from '../../slices/postSlices/addPostSlice'; 
import { addPostState } from '../../slices/postSlices/addPostSlice';
import Header from '../../components/Header';
import Video from 'react-native-video';

const PostSubmit = ({ navigation }) => {
  const { mediaList, postCaption } = useSelector(addPostState);
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event) => {
    const index = Math.round(
      event.nativeEvent.contentOffset.x / Dimensions.get('window').width
    );
    setCurrentIndex(index);
  };

  const handlePost = () => {
    if (postCaption.trim() === '') {
      alert('Please add a caption!');
      return;
    }
    // Handle post submission logic here
    console.log('Posting:', { mediaList, postCaption });
    return 
    dispatch(addPost(mediaList,postCaption))
  };

  return (


        <View style={styles.outerContainer}>
          <Header navigation={navigation} />
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.container}>
              <FlatList
                data={mediaList}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                contentContainerStyle={styles.carouselContent}
                renderItem={({ item }) => (
                  item.uri.includes('mp4') ? (
                    <Video
                      source={{ uri: item.uri }}
                      style={styles.image}
                      resizeMode="cover"
                      repeat={true}
                      controls={true}
                    />
                  ) : (
                    <Image source={{ uri: item.uri }} style={styles.image} />
                  )
                )}
                keyExtractor={(item, index) => index.toString()}
              />

              {/* Page Indicator */}
              <View style={styles.indicatorContainer}>
                {mediaList.map((_, index) => (
                  <View
                    key={index}
                    style={[
                      styles.indicator,
                      currentIndex === index && styles.activeIndicator,
                    ]}
                  />
                ))}
              </View>

              {/* Caption Input */}
              <TextInput
                style={styles.captionInput}
                placeholder="Write a caption..."
                placeholderTextColor={"#000"}
                value={postCaption}
                onChangeText={(text) => dispatch(setPostCaption(text))}
                multiline={true}
                textAlignVertical="top"
              />

              {/* Post Button */}
              <TouchableOpacity style={styles.postButton} onPress={handlePost}>
                <Text style={styles.postButtonText}>Post</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>


  );
};

export default PostSubmit;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  carouselContent: {
    // marginEnd: 10, // Adds space between the images
  },
  image: {
    width: Dimensions.get('window').width - 100,
    resizeMode: 'cover',
    borderRadius: 10,
    marginEnd: 10,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: '#000',
  },
  captionInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    fontSize: 16,
    height: Dimensions.get('window').height * 0.3, 
    textAlignVertical: 'top',
    color: "#000"
  },
  postButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  postButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
