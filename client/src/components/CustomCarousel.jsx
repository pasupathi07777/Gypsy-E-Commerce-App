// import {
//   Dimensions,
//   FlatList,
//   ImageBackground,
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
// } from 'react-native';
// import React, {useRef, useState} from 'react';
// import {useSelector} from 'react-redux';
// import {bannerStates} from '../slices/bannerSlice';
// import { useNavigation } from '@react-navigation/core';
// const screenWidth = Dimensions.get('window').width;

// const CustomCarousel = () => {
//    const navigation = useNavigation();
//   const {banners} = useSelector(bannerStates);
//   const arr = [banners, banners];
//   const [activeSlide, setActiveSlide] = useState(0);

//   const onCurrent = useRef(view => {
//     if (view.viewableItems.length > 0) {
//       setActiveSlide(view.viewableItems[0].index);
//     }
//   });

//   const onNavigate = id => {
//     navigation.navigate('Product', {id});
//   };

//   return (
//     <View style={styles.bannerContainer}>
//       <FlatList
//         data={banners}
//         keyExtractor={(item, index) => index.toString()}
//         horizontal
//         pagingEnabled
//         showsHorizontalScrollIndicator={false}
//         snapToAlignment="center"
//         snapToInterval={screenWidth}
//         decelerationRate="fast"
//         onViewableItemsChanged={onCurrent.current}
//         renderItem={({item, index}) => (
//           <ImageBackground style={styles.banner} source={{uri: item.image}}>

import {
  Dimensions,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import {bannerStates} from '../slices/bannerSlice';
import {useNavigation} from '@react-navigation/core';

const screenWidth = Dimensions.get('window').width;

const CustomCarousel = () => {
  const navigation = useNavigation();
  const {banners} = useSelector(bannerStates);
  const [activeSlide, setActiveSlide] = useState(0);
  const flatListRef = useRef(null);

  // Auto-scroll logic if more than one banner
  useEffect(() => {
    if (banners.length > 1) {
      const interval = setInterval(() => {
        setActiveSlide(prev => {
          const nextIndex = (prev + 1) % banners.length;
          flatListRef.current?.scrollToIndex({
            index: nextIndex,
            animated: true,
          });
          return nextIndex;
        });
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [banners]);

  const onNavigate = id => {
    navigation.navigate('Product', {id});
  };

  return (
    <View style={styles.bannerContainer}>
      <FlatList
        ref={flatListRef}
        data={banners}
        keyExtractor={item => item._id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        snapToInterval={screenWidth}
        decelerationRate="fast"
        onViewableItemsChanged={({viewableItems}) => {
          if (viewableItems.length > 0) {
            setActiveSlide(viewableItems[0].index);
          }
        }}
        renderItem={({item}) => (
          <ImageBackground style={styles.banner} source={{uri: item.image}}>
            <View style={styles.content}>
              <Text style={styles.title}>{item.description}</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => onNavigate(item.productId)}>
                <Text style={styles.btnText}>Checkout</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        )}
      />

      {/* Pagination Dots */}
      {banners.length > 1 && (
        <View style={styles.pagination}>
          {banners.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                activeSlide === index && {width: 30, backgroundColor: '#000'},
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
};

export default CustomCarousel;

const styles = StyleSheet.create({
  bannerContainer: {
    height: 300,
  },
  banner: {
    width: screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  btnText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  button: {
    alignSelf: 'center',
    borderColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
});
