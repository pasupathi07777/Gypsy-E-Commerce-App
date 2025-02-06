import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Pressable,
} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {productStates} from '../slices/productsSlice';
import {postWishlist, wishlistStates} from '../slices/wishlistSlice';
import {useNavigation} from '@react-navigation/native';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/AntDesign'; 



const CategoryProduct = ({route}) => {
  const {category} = route.params;
  const {products} = useSelector(productStates);
  const {wishlist} = useSelector(wishlistStates);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const filteredProducts = products.filter(
    product => product.category === category,
  );

  const navigateProduct = id => {
    navigation.navigate('Product', {id});
  };


  const handleHeartPress = id => {
    console.log(`Wishlist toggled for Product ID: ${id}`);
    dispatch(postWishlist({productId:id}));
  };

  if (filteredProducts.length === 0) {
    return (
      <View style={styles.noProductContainer}>
        <Header navigation={navigation} topic={category} />
        <Text style={styles.noProductText}>
          Currently, no products are available in this category.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header navigation={navigation} topic={category} />

      <FlatList
        data={filteredProducts}
        numColumns={2}
        keyExtractor={item => item._id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => {
          const isWishlisted = wishlist.some(w => w.productId === item._id);

          return (
            <Pressable
              onPress={() => navigateProduct(item._id)}
              style={styles.productContainer}>
              <Pressable
                onPress={() => handleHeartPress(item._id)}
                style={styles.heartIcon}>
                <Icon
                  name={isWishlisted ? 'heart' : 'heart'}
                  size={22}
                  color={isWishlisted ? 'red' : 'gray'}
                />
              </Pressable>

              <Image
                source={{uri: item.photos[0]}}
                style={styles.productImage}
              />

              <View style={styles.productInfo}>
                <Text style={styles.productName}>
                  {item.name.slice(0, 15)}...
                </Text>
                <Text style={styles.productPrice}>₹{item.price}</Text>
              </View>
            </Pressable>
          );
        }}
        contentContainerStyle={styles.productList}
        columnWrapperStyle={styles.columnWrapper}
      />
    </View>
  );
};

export default CategoryProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  noProductContainer: {
    flex: 1,
    backgroundColor: '#f9f9f9',

  },
  noProductText: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  productList: {
    paddingHorizontal: 5,
    paddingTop: 10,
    paddingBottom: 10,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  productContainer: {
    flex: 1,
    marginBottom: 10,
    marginHorizontal: 5,
    backgroundColor: '#fff',
    overflow: 'hidden',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  heartIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 5,
    borderRadius: 50,
    zIndex: 10,
  },
  productImage: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
  },
  productInfo: {
    padding: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FEAB0D',
    textAlign: 'center',
  },
});
