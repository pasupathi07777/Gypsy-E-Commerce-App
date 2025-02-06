import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {productStates} from '../slices/productsSlice';
import {addCartItem, cartStates, removeCart} from '../slices/cartSlice';
import ButtonField from '../components/ButtonField';
import {
  postWishlist,
  removeWishlist,
  wishlistStates,
} from '../slices/wishlistSlice';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/AntDesign';
import {setDirectOrder} from '../slices/orderSlice';

const Product = ({navigation, route}) => {
  const {id} = route.params;
  const {products} = useSelector(productStates);
  const {cartItems, removeCartLoading} = useSelector(cartStates);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const dispatch = useDispatch();
  const {postCartLoading} = useSelector(cartStates);
  const {postWishlistLoading, deleteWishlistLoading, wishlist} =
    useSelector(wishlistStates);

  useEffect(() => {
    const product = products.find(prod => prod._id === id);
    setCurrentProduct(product);
    setMainImage(product?.photos?.[0] || null);
  }, [id, products]);

  if (!currentProduct) {
    return (
      <View style={styles.container}>
        <Text>Product not found</Text>
      </View>
    );
  }

  const isWishlisted = wishlist.some(
    item => item.productId === currentProduct._id,
  );

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      dispatch(removeWishlist(currentProduct._id));
    } else {
      dispatch(postWishlist({productId: currentProduct._id}));
    }
  };

  const handleBuyNow = productId => {
    dispatch(setDirectOrder(productId));
    navigation.navigate('Direct-Order');
    console.log('Buying product with ID:', productId);
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Product Image Section */}
        <View style={styles.mainImageContainer}>
          {mainImage && (
            <Image source={{uri: mainImage}} style={styles.mainProductImage} />
          )}
          <Pressable
            style={styles.heartIcon}
            onPress={handleWishlistToggle}>
            <Icon
              name="heart"
              size={24}
              color={isWishlisted ? 'red' : 'gray'}
            />
          </Pressable>
        </View>

        <FlatList
          data={currentProduct.photos}
          horizontal
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => setMainImage(item)}>
              <Image source={{uri: item}} style={styles.thumbnailImage} />
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.thumbnailContainer}
        />

        {/* Product Details Section */}
        <View style={styles.productDetails}>
          <Text style={styles.productName}>{currentProduct.name}</Text>
          <Text style={styles.productPrice}>₹{currentProduct.price}</Text>
          <Text style={styles.stockText}>In Stock: {currentProduct.stock}</Text>

          <View style={styles.detailContainer}>
            <Text style={styles.detailLabel}>Category: </Text>
            <Text style={styles.additionalText}>{currentProduct.category}</Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.detailLabel}>Seller: </Text>
            <Text style={styles.additionalText}>{currentProduct.seller}</Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.detailLabel}>Warranty: </Text>
            <Text style={styles.additionalText}>
              {currentProduct.warranty} year(s)
            </Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.detailLabel}>Delivery Time: </Text>
            <Text style={styles.additionalText}>
              {currentProduct.deliveryTime} days
            </Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.detailLabel}>Return Policy: </Text>
            <Text style={styles.additionalText}>
              {currentProduct.returnPolicy} days
            </Text>
          </View>
          <Text style={styles.productDescription}>
            {currentProduct.description}
          </Text>

          {/* Cart and Wishlist Buttons */}
        </View>
      </ScrollView>
      <View style={styles.btnGroup}>
        {cartItems.find(item => item.productId === currentProduct._id) ? (
          <ButtonField
            title={'Remove From Cart'}
            loading={removeCartLoading}
            style={styles.removeToCartButton}
            onPress={() => dispatch(removeCart(currentProduct._id))}
          />
        ) : (
          <ButtonField
            title={'Add to Cart'}
            loading={postCartLoading}
            style={styles.addToCartButton}
            onPress={() =>
              dispatch(
                addCartItem({productId: currentProduct._id, quantity: 1}),
              )
            }
          />
        )}
        <ButtonField
          title={'Buy Now'}
          style={styles.buyNowButton}
          onPress={() => handleBuyNow(currentProduct)}
        />
      </View>
    </View>
  );
};

export default Product;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  mainImageContainer: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 20,
    position: 'relative',
  },
  mainProductImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: 10,
  },
  heartIcon: {
    position: 'absolute',
    top: 0,
    right: 5,
    backgroundColor: 'transparent',
    padding: 8,
    zIndex: 10,
  },
  thumbnailContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  thumbnailImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    borderRadius: 5,
    marginRight: 10,
  },
  productDetails: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  productDescription: {
    fontSize: 16,
    color: '#777',
    marginBottom: 15,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff5722',
    marginBottom: 10,
  },
  stockText: {
    fontSize: 16,
    color: '#4CAF50',
    marginBottom: 15,
  },
  detailContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  detailLabel: {
    fontWeight: 'bold',
    color: '#333',
    fontSize: 16,
    width: '40%',
  },
  addToCartButton: {
    backgroundColor: '#FF5722',
    paddingVertical: 15,
    flex: 1,
  },
  removeToCartButton: {
    backgroundColor: '#000',
    paddingVertical: 15,

    flex: 1,
  },
  buyNowButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,

    flex: 1,
  },
  btnGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
