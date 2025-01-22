// import { Pressable, StyleSheet, Text, View } from 'react-native';
// import React, { useState } from 'react';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import AntDesign from 'react-native-vector-icons/AntDesign';

// const HomeHeader = ({ navigation }) => {
//   const [cartCount, setCartCount] = useState(1); 

//   const iconGroup = [
//     { name: 'search-outline', type: 'Search' },
//   ];

//   const onClickIcon = path => {
//     if (path === 'back') {
//       navigation.goBack();
//     } else {
//       navigation.navigate(path);
//     }
//   };

//   return (
//     <View style={styles.headerContainer}>

//       <View style={styles.logoContainer}>
//         <Text style={styles.logoText}>Feathrly</Text>
//       </View>

//       <View style={styles.rightContainer}>


//       </View>
//     </View>
//   );
// };

// export default HomeHeader;

// const styles = StyleSheet.create({
//   headerContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 10,
//     paddingHorizontal: 10,
//     backgroundColor: '#fff',
//     height: 60,
//     zIndex:100
//   },
//   logoContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   logoText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#000',
//     // textTransform: 'uppercase',
//     letterSpacing: 1.5,
//     fontFamily: 'sans-serif-condensed',
//   },
//   rightContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   icon: {
//     marginLeft: 20,
//   },
//   cartContainer: {
//     position: 'relative',
//   },
//   cartBadge: {
//     position: 'absolute',
//     top: -5,
//     right: -10,
//     backgroundColor: 'red',
//     borderRadius: 10,
//     paddingHorizontal: 5,
//     paddingVertical: 2,
//     minWidth: 20,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   cartBadgeText: {
//     color: '#fff',
//     fontSize: 12,
//     fontWeight: 'bold',
//   },
// });



        {
          /* {iconGroup.map((icon, index) => (
          <Pressable key={index} onPress={() => onClickIcon(icon.type)}>
            <Ionicons
              name={icon.name}
              color="#000"
              size={24}
              style={styles.icon}
            />
          </Pressable>
        ))} */
        }

        {
          /* <Pressable onPress={() => onClickIcon('Cart')} style={styles.cartContainer}>
          <Ionicons
            name="cart-outline"
            color="#000"
            size={24}
            style={styles.icon}
          />
    
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartCount}</Text>
            </View>
   
        </Pressable>

        <Pressable onPress={() => onClickIcon('Profile')}>
          <AntDesign
            name="user"
            color="#000"
            size={24}
            style={styles.icon}
          />
        </Pressable> */
        }


import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HomeHeader = ({navigation}) => {
  const [searchText, setSearchText] = useState('');

  return (
    <View style={styles.headerContainer}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>Feathrly</Text>
      </View>

      <View style={styles.rightContainer}>
        <View style={styles.searchContainer}>
          <Ionicons
            name="search-outline"
            size={20}
            color="#888"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            value={searchText}
            onChangeText={text => setSearchText(text)}
          />
        </View>
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    height: 60,
    zIndex: 100,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
    letterSpacing: 1.5,
    fontFamily: 'sans-serif-condensed',
  },
  rightContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end', 
    alignItems: 'center',
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF6C5',
    borderRadius: 20,
    paddingHorizontal: 10,
    height: 35,
    width: '90%', 
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#000',
  },
});

