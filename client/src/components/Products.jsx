import React from 'react';
import {StyleSheet, Text, View, Pressable, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const ProductList = ({category, products}) => {
  const navigation = useNavigation();

  const navigateCategory = () => {
    navigation.navigate('CategoryProduct', {category});
  };

  const navigateProduct = id => {
    navigation.navigate('Product', {id});
  };

  const renderProduct = product => (
    <Pressable
      key={product._id}
      style={styles.productContainer}
      onPress={() => navigateProduct(product._id)}>
      <Image source={{uri: product.photos[0]}} style={styles.productImage} />
      <Text style={styles.productName}>{product.name.slice(0, 15)}</Text>
      <View style={styles.priceContainer}>
        <Text style={styles.newPrice}>₹{product.price}</Text>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.categoryContainer}>
      <View style={styles.headingContainer}>
        <Text style={styles.categoryTitle}>{category}</Text>
        <Pressable onPress={navigateCategory}>
          <Text style={styles.categoryHeadingBtn}>See All</Text>
        </Pressable>
      </View>
      <View style={styles.productsWrapper}>
        {products.slice(0, 4).map(renderProduct)}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  categoryContainer: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  headingContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    padding: 5,
  },
  categoryHeadingBtn: {
    color: '#f03922',  
    fontWeight: 'bold',
  },
  productsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productContainer: {
    width: '48%',
    marginBottom: 15,
    borderRadius: 5,

    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    borderRadius: 5,
  },
  productName: {
    marginTop: 5,
    fontSize: 14,
    width: '100%',
    alignItems: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
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
    // color: '#FEAB0D',
  },
});

export default ProductList;
