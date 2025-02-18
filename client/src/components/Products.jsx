

// import React from 'react';
// import {StyleSheet, Text, View, Pressable, Image} from 'react-native';
// import {useNavigation} from '@react-navigation/native';

// const ProductList = ({category, products}) => {
//   const navigation = useNavigation();

//   const navigateCategory = () => {
//     navigation.navigate('CategoryProduct', {category});
//   };

//   const navigateProduct = id => {
//     navigation.navigate('Product', {id});
//   };

//   return (
//     <View style={styles.categoryContainer}>
//       <View style={styles.headingContainer}>
//         <Text style={styles.categoryTitle}>{category}</Text>
//         <Pressable onPress={navigateCategory}>
//           <Text style={styles.categoryHeadingBtn}>See All</Text>
//         </Pressable>
//       </View>

//       <View style={styles.productsWrapper}>
//         {products.slice(0, 4).map(product => (
//           <Pressable
//             key={product._id}
//             style={styles.productContainer}
//             onPress={() => navigateProduct(product._id)}>
//             <Image source={{uri: product.photos[0]}} style={styles.productImage} />
//             <Text style={styles.productName}>{product.name.slice(0, 15)}</Text>
//             <View style={styles.priceContainer}>
//               <Text style={styles.newPrice}>₹{product.price}</Text>
//             </View>
//           </Pressable>
//         ))}
//       </View>
//     </View>
//   );
// };

// export default ProductList;

// const styles = StyleSheet.create({
//   categoryContainer: {
//     marginTop: 20,
//     paddingHorizontal: 15,
//   },
//   headingContainer: {
//     justifyContent: 'space-between',
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   categoryTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     textTransform: 'capitalize',
//     padding: 5,
//   },
//   categoryHeadingBtn: {
//     color: '#f03922',  
//     fontWeight: 'bold',
//   },
//   productsWrapper: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//   },
//   productContainer: {
//     width: '48%',
//     marginBottom: 15,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   productImage: {
//     width: '100%',
//     height: 150,
//     resizeMode: 'contain',
//     borderRadius: 5,
//   },
//   productName: {
//     marginTop: 5,
//     fontSize: 14,
//     width: '100%',
//     textAlign: 'center',
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   priceContainer: {
//     marginTop: 2,
//     alignItems: 'center',
//     width: '100%',
//   },
//   newPrice: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#f03922',
//   },
// });
import React from 'react';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const ProductList = ({ category, products }) => {
  const navigation = useNavigation();

  const navigateCategory = () => {
    navigation.navigate('CategoryProduct', { category });
  };

  const navigateProduct = id => {
    navigation.navigate('Product', { id });
  };

  // Filter products based on the passed category
  const filteredProducts = products.filter(
    product => product.category.toLowerCase() === category.toLowerCase()
  );

  return (
    <View style={styles.categoryContainer}>
      {
        filteredProducts.length > 0 && (
          <View style={styles.headingContainer}>
            <Text style={styles.categoryTitle}>{category}</Text>
            <Pressable onPress={navigateCategory}>
              <Text style={styles.categoryHeadingBtn}><FontAwesome6 name="arrow-right-long" size={20}/></Text>
            </Pressable>
          </View>
        )
      }

      <View style={styles.productsWrapper}>
        {filteredProducts.slice(0, 4).map(product => (
          <Pressable
            key={product._id}
            style={styles.productContainer}
            onPress={() => navigateProduct(product._id)}>
            <Image source={{ uri: product.photos[0] }} style={styles.productImage} />
            <Text style={styles.productName}>{product.name.slice(0, 15)}</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.newPrice}>₹{product.price}</Text>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  categoryContainer: {
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  headingContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: 10,
    // backgroundColor: 'yellow',
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    padding: 5,
    color: '#000',
  },
  categoryHeadingBtn: {
    color: '#000',
    fontWeight: 'bold',
  },
  productsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 5,
  },
  productContainer: {
    width: '48%',
    // marginBottom: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: 120,
    resizeMode: 'contain',
    // borderRadius: 5,
    // backgroundColor: 'red',
  },
  productName: {
    marginTop: 5,
    fontSize: 14,
    width: '100%',
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
    textTransform: 'capitalize',
  },
  priceContainer: {
    marginTop: 2,
    alignItems: 'center',
    width: '100%',
  },
  newPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f03922',
  },
});
