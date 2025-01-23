import {
  Dimensions,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useRef, useState} from 'react';
import { banners } from '../data/Banners';
const screenWidth = Dimensions.get('window').width;

const CustomCarousel = () => {
  const arr = [banners, banners];
  console.log(arr[0].bannerOne);
  const [activeSlide, setActiveSlide] = useState(0);

  const onCurrent = useRef(view => {
    if (view.viewableItems.length > 0) {
      setActiveSlide(view.viewableItems[0].index);
    }
  });

  return (
    <View style={styles.bannerContainer}> 
      <FlatList
        data={arr}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        snapToInterval={screenWidth}
        decelerationRate="fast"
        onViewableItemsChanged={onCurrent.current}
        renderItem={({item, index}) => (
          <ImageBackground style={styles.banner} source={item.bannerOne?.img}>
            <View style={styles.content}>
              <Text style={styles.title}>{item.bannerOne.title}</Text>
              <Text style={styles.subHeading}>{item.bannerOne.subHeading}</Text>
              <Text style={styles.offer}>{item.bannerOne.offer}</Text>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.btnText}>{item.bannerOne.btnText}</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        )}
      />

      <View style={styles.pagination}>
        {arr.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              activeSlide === index && {width: 30, backgroundColor: '#000'},
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default CustomCarousel;

const styles = StyleSheet.create({
  bannerContainer:{
    height: 300,
  },
  banner: {
    width: screenWidth,
    // height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 5,
    borderRadius: 5,
  },
  pagination: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    backgroundColor: 'gray',
  },
  content: {
    gap: 10,
  },
  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  subHeading: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  offer: {
    fontSize: 18,
    color: 'yellow',
    textAlign: 'center',
  },
  btnText: {
    fontSize: 16,
    color: 'white',

    textAlign: 'center',
    width: '',
  },
  button: {
    alignSelf: 'flex-start',
    borderColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 2,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginHorizontal: 'auto',
  },
});
