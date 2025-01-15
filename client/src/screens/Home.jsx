// import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
// import React from 'react';
// import HomeHeader from '../components/HomeHeader';
// import { outProducts } from '../data/Products';

// const Home = ({navigation}) => {
//   const renderProduct = ({ item }) => {
//     return (
//       <View style={styles.productContainer}>
//         {/* Display product image */}
//         <Image source={item.coverImage} style={styles.productImage} />
        
//         {/* Display product name */}
//         <Text style={styles.productName}>{item.name}</Text>
        
//         {/* Display old and new prices */}
//         <View style={styles.priceContainer}>
//           <Text style={styles.oldPrice}>₹{item.pastPrice}</Text>
//           <Text style={styles.newPrice}>₹{item.latestPrice}</Text>
//         </View>
//       </View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//           <HomeHeader navigation={navigation}/>
//       <FlatList
//         data={outProducts}
//         renderItem={renderProduct}
//         keyExtractor={(item) => item.id.toString()}
//         numColumns={2} // Display items in two columns
//         showsVerticalScrollIndicator={false} // Hide vertical scrollbar
//       />
//     </View>
//   );
// };

// export default Home;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   productContainer: {
//     flex: 1,
//     margin: 10,
//     borderRadius: 10,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     padding: 10,
//     elevation: 5, 
//     shadowColor: '#000', 
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.8,
//     shadowRadius: 3,
//   },
//   productImage: {
//     width: '100%',
//     height: 150,
//     resizeMode: 'cover',
//     borderRadius: 10,
//   },
//   productName: {
//     marginTop: 10,
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   priceContainer: {
//     flexDirection: 'row',
//     marginTop: 10,
//   },
//   oldPrice: {
//     fontSize: 14,
//     textDecorationLine: 'line-through',
//     color: '#888',
//     marginRight: 5,
//   },
//   newPrice: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#000',
//   },
// });

// import { StyleSheet, Text, View, FlatList, Image, TextInput } from 'react-native';
// import React, { useState, useRef } from 'react';
// import { outProducts } from '../data/Products';
// import HomeHeader from '../components/HomeHeader';

// const Home = ({ navigation }) => {
//   const [searchText, setSearchText] = useState('');
//   const [scrollY, setScrollY] = useState(0);
//   const [headerVisible, setHeaderVisible] = useState(true);
//   const lastOffset = useRef(0); // Track the last scroll position

//   const handleScroll = (event) => {
//     const currentOffset = event.nativeEvent.contentOffset.y;

//     // Determine if user is scrolling up or down
//     if (currentOffset > lastOffset.current) {
//       // Scrolling down, hide search bar
//       setHeaderVisible(false);
//     } else if (currentOffset < lastOffset.current) {
//       // Scrolling up, show search bar
//       setHeaderVisible(true);
//     }

//     // Update last scroll position
//     lastOffset.current = currentOffset;

//     setScrollY(currentOffset);
//   };

//   const renderProduct = ({ item }) => {
//     return (
//       <View style={styles.productContainer}>
//         {/* Display product image */}
//         <Image source={item.coverImage} style={styles.productImage} />
        
//         {/* Display product name */}
//         <Text style={styles.productName}>{item.name}</Text>
        
//         {/* Display old and new prices */}
//         <View style={styles.priceContainer}>
//           <Text style={styles.oldPrice}>₹{item.pastPrice}</Text>
//           <Text style={styles.newPrice}>₹{item.latestPrice}</Text>
//         </View>
//       </View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       {/* Always visible HomeHeader */}
//       <HomeHeader navigation={navigation} />
      
//       {/* Conditionally render Search Bar */}
//       {headerVisible && (
//         <View style={styles.headerContainer}>
//           <TextInput
//             style={styles.searchInput}
//             placeholder="Search products..."
//             value={searchText}
//             onChangeText={setSearchText}
//           />
//         </View>
//       )}

//       {/* FlatList for Products */}
//       <FlatList
//         data={outProducts}
//         renderItem={renderProduct}
//         keyExtractor={(item) => item.id.toString()}
//         numColumns={2} // Display items in two columns
//         showsVerticalScrollIndicator={false} // Hide vertical scrollbar
//         onScroll={handleScroll} // Track the scroll position
//         scrollEventThrottle={16} // To update the scroll position smoothly
        
//       />
//     </View>
//   );
// };

// export default Home;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // paddingTop: , // Ensure space for the header
//   },
//   headerContainer: {
//     position: 'absolute',
//     top: 50,
//     left: 0,
//     right: 0,
//     zIndex: 10, // Ensure the search input stays above the product list
//     backgroundColor: '#fff',
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     // elevation: 5, // Adds shadow effect for Android
//     // shadowColor: '#000', // Adds shadow for iOS
//     // shadowOffset: { width: 0, height: 2 },
//     // shadowOpacity: 0.8,
//     // shadowRadius: 3,
//   },
//   searchInput: {
//     height: 40,
//     borderColor: '#ddd',
//     borderWidth: 1,
//     borderRadius: 20,
//     paddingLeft: 15,
//     backgroundColor: '#f7f7f7',
//   },
//   productContainer: {
//     flex: 1,
//     margin: 10,
//     borderRadius: 10,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     padding: 10,
//     elevation: 5, // Adds shadow effect for Android
//     shadowColor: '#000', // Adds shadow for iOS
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.8,
//     shadowRadius: 3,

//   },
//   productImage: {
//     width: '100%',
//     height: 150,
//     resizeMode: 'cover',
//     borderRadius: 10,
//   },
//   productName: {
//     marginTop: 10,
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   priceContainer: {
//     flexDirection: 'row',
//     marginTop: 10,
//   },
//   oldPrice: {
//     fontSize: 14,
//     textDecorationLine: 'line-through',
//     color: '#888',
//     marginRight: 5,
//   },
//   newPrice: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#000',
//   },
// });

import { StyleSheet, Text, View, FlatList, Image, TextInput, Animated } from 'react-native';
import React, { useState, useRef } from 'react';
import { outProducts } from '../data/Products';
import HomeHeader from '../components/HomeHeader';

const Home = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [scrollY, setScrollY] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(true);
  const searchBarHeight = useRef(new Animated.Value(0)).current; // Animated value for search bar height
  const lastOffset = useRef(0); // Track the last scroll position

  const handleScroll = (event) => {
    const currentOffset = event.nativeEvent.contentOffset.y;

    // Determine if user is scrolling up or down
    if (currentOffset > lastOffset.current) {
      // Scrolling down, hide search bar with animation
      Animated.timing(searchBarHeight, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
      setHeaderVisible(false);
    } else if (currentOffset < lastOffset.current) {
      // Scrolling up, show search bar with animation
      Animated.timing(searchBarHeight, {
        toValue: 50, // Height of the search bar
        duration: 200,
        useNativeDriver: false,
      }).start();
      setHeaderVisible(true);
    }

    // Update last scroll position
    lastOffset.current = currentOffset;

    setScrollY(currentOffset);
  };

  const renderProduct = ({ item }) => {
    return (
      <View style={styles.productContainer}>
        {/* Display product image */}
        <Image source={item.coverImage} style={styles.productImage} />
        
        {/* Display product name */}
        <Text style={styles.productName}>{item.name}</Text>
        
        {/* Display old and new prices */}
        <View style={styles.priceContainer}>
          <Text style={styles.oldPrice}>₹{item.pastPrice}</Text>
          <Text style={styles.newPrice}>₹{item.latestPrice}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Always visible HomeHeader */}
      <HomeHeader navigation={navigation} />
      
      {/* Conditionally render Search Bar with animation */}
      <Animated.View style={[styles.headerContainer, { height: searchBarHeight }]}>
        {headerVisible && (
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            value={searchText}
            onChangeText={setSearchText}
          />
        )}
      </Animated.View>

      {/* FlatList for Products */}
      <FlatList
        data={outProducts}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2} // Display items in two columns
        showsVerticalScrollIndicator={false} // Hide vertical scrollbar
        onScroll={handleScroll} // Track the scroll position
        scrollEventThrottle={16} // To update the scroll position smoothly
        contentContainerStyle={{
          marginTop: headerVisible ? 50 : 0, // Add margin top when search bar is visible
        }}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: , // Ensure space for the header
  },
  headerContainer: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    zIndex: 10, // Ensure the search input stays above the product list
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    // elevation: 5, // Adds shadow effect for Android
    // shadowColor: '#000', // Adds shadow for iOS
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.8,
    // shadowRadius: 3,
  },
  searchInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 15,
    backgroundColor: '#f7f7f7',
  },
  productContainer: {
    flex: 1,
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 10,
    elevation: 5, // Adds shadow effect for Android
    shadowColor: '#000', // Adds shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,

  },
  productImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  productName: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  priceContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  oldPrice: {
    fontSize: 14,
    textDecorationLine: 'line-through',
    color: '#888',
    marginRight: 5,
  },
  newPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});
