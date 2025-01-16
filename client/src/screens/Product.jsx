import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productState } from '../slices/productsSlice';
import Header from '../components/Header';



const Product = ({navigation}) => {
  const dispatch = useDispatch();
  const {currentViewProduce} = useSelector(productState);
  const handleAddToCart = () => {};

  const productData = currentViewProduce ?? [];

  return (
    <ScrollView style={styles.container}>
      <Header navigation={navigation} topic={''} />
      {/* Image Carousel */}
      <View style={styles.carouselContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {productData.images.map((image, index) => (
            <Image key={index} source={image.img} style={styles.productImage} />
          ))}
        </ScrollView>
      </View>

      {/* Product Details */}
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{productData.name}</Text>
        <Text style={styles.productDescription}>{productData.description}</Text>
        <Text style={styles.productPrice}>
          ₹{productData.latestPrice}{' '}
          <Text style={styles.oldPrice}>₹{productData.pastPrice}</Text>
        </Text>

        <View style={styles.stockContainer}>
          <Text style={styles.stockText}>
            In Stock: {productData.stock.quantity}
          </Text>
        </View>

        <View style={styles.sizeContainer}>
          <Text style={styles.sizeText}>Available Sizes:</Text>
          {productData.size.map((size, index) => (
            <Text key={index} style={styles.size}>
              {size}
            </Text>
          ))}
        </View>

        {/* Add to Cart Button */}
        <TouchableOpacity style={styles.addToCartBtn} onPress={handleAddToCart}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Product;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  carouselContainer: {
    width: '100%',
    height: 300,
    marginBottom: 20,
  },
  productImage: {
    width: 300,
    height: 300,
    resizeMode: 'cover',
    marginRight: 10,
    borderRadius: 10,
  },
  productDetails: {
    paddingHorizontal: 10,
  },
  productName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  oldPrice: {
    textDecorationLine: 'line-through',
    color: 'gray',
    fontSize: 16,
  },
  stockContainer: {
    marginVertical: 10,
  },
  stockText: {
    fontSize: 16,
  },
  sizeContainer: {
    marginVertical: 10,
  },
  sizeText: {
    fontSize: 16,
    marginBottom: 5,
  },
  size: {
    fontSize: 16,
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
    marginBottom: 5,
  },
  addToCartBtn: {
    backgroundColor: '#FF5722',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  addToCartText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
