// import {Pressable, StyleSheet, Text, View} from 'react-native';
// import React from 'react';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

// const Header = ({navigation, topic}) => {


//   const onClickIcon = path => {
//     if (path === 'back') {
//       navigation.goBack();
//     } else {
//       navigation.navigate('Home', {screen: path});
//     }
//   };

//   return (
//     <View style={styles.headerContainer}>
//       <View style={styles.leftContainer}>
//         <Pressable onPress={() => onClickIcon('back')}>
//           <FontAwesome6 name="arrow-left-long" color="#000" size={24} />
//         </Pressable>

//         <Text style={styles.headerText}>{topic}</Text>
//       </View>

//       <View style={styles.iconGroup}>
//         <Pressable onPress={() => onClickIcon('Cart')}>
//           <MaterialIcons name={'shopping-cart'} size={24} color={'#000'} />
//         </Pressable>

//         <Pressable onPress={() => onClickIcon('Profile')}>
//           <FontAwesome name={'user'} size={24} color={'#000'} />
//         </Pressable>
//       </View>
//     </View>
//   );
// };

// export default Header;

// const styles = StyleSheet.create({
//   headerContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 10,
//     paddingHorizontal: 10,
//     backgroundColor: '#fff',
//     borderBottomWidth: 1,
//     borderBottomColor: '#f8f8f8',
//     height: 50,
//   },
//   leftContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   iconGroup: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     gap: 15,
//   },
//   headerText: {
//     fontSize: 16,
//     fontWeight: '500',
//     marginLeft: 10,
//     textTransform: 'capitalize',
//     color: '#000',
//   },

//   icon: {
//     marginLeft: 20,
//   },
// });
import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { useSelector } from 'react-redux';
import { cartStates } from '../slices/cartSlice';

const Header = ({ navigation, topic, btnVisibility = true }) => {

  const { cartItems } = useSelector(cartStates);
  const onClickIcon = path => {
    if (path === 'back') {
      navigation.goBack();
    } else {
      navigation.navigate('Home', { screen: path });
    }
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.leftContainer}>
        <Pressable onPress={() => onClickIcon('back')}>
          <FontAwesome6 name="arrow-left-long" color="#000" size={24} />
        </Pressable>

        <Text style={styles.headerText}>{topic}</Text>
      </View>

      {
        btnVisibility && (
          <View style={styles.iconGroup}>

            <Pressable onPress={() => onClickIcon('Cart')} style={styles.iconWrapper}>
              <MaterialIcons name={'shopping-cart'} size={24} color={'#000'} />
              {cartItems.length > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{cartItems.length}</Text>
                </View>
              )}
            </Pressable>


            <Pressable onPress={() => onClickIcon('Profile')}>
              <FontAwesome name={'user'} size={24} color={'#000'} />
            </Pressable>
          </View>
        )
      }

    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f8f8f8',
    height: 50,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 15,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 10,
    textTransform: 'capitalize',
    color: '#000',
  },
  iconWrapper: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    right: -6,
    top: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
