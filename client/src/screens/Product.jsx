import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {useSelector} from 'react-redux';
import {productState} from '../slices/productsSlice';
import Header from '../components/Header';

const Product = ({navigation}) => {
  const {currentViewProduce} = useSelector(productState);

  const productData = currentViewProduce ?? {};
  const [mainImage, setMainImage] = useState(
    productData.images?.[0]?.img || null,
  );

  const renderThumbnails = () => (
    <FlatList
      data={productData.images}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => (
        <TouchableOpacity onPress={() => setMainImage(item.img)}>
          <Image source={item.img} style={styles.thumbnailImage} />
        </TouchableOpacity>
      )}
      contentContainerStyle={styles.thumbnailContainer}
    />
  );

  return (
    <View style={styles.container}>
      {/* Fixed Header */}
      <Header navigation={navigation} topic="Product Details" />

      {/* Scrollable Content */}
      <ScrollView style={styles.scrollView}>
        {/* Main Product Image */}
        <View style={styles.mainImageContainer}>
          {mainImage && (
            <Image source={mainImage} style={styles.mainProductImage} />
          )}
        </View>

        {/* Thumbnails */}
        <View>{renderThumbnails()}</View>

        {/* Product Details */}
        <View style={styles.productDetails}>
          <Text style={styles.productName}>{productData.name}</Text>
          <Text style={styles.productDescription}>
            {productData.description}
          </Text>
          <Text style={styles.productPrice}>
            ₹{productData.latestPrice}{' '}
            <Text style={styles.oldPrice}>₹{productData.pastPrice}</Text>
          </Text>
          <Text style={styles.stockText}>
            {productData.stock.available
              ? `In Stock: ${productData.stock.quantity}`
              : 'Out of Stock'}
          </Text>

          <View style={styles.sizeContainer}>
            <Text style={styles.sizeText}>Available Sizes:</Text>
            <View style={styles.sizeList}>
              {productData.size.map((size, index) => (
                <Text key={index} style={styles.size}>
                  {size}
                </Text>
              ))}
            </View>
          </View>

          {/* Additional Product Details */}
          <View style={styles.additionalDetails}>
            <Text style={styles.additionalText}>
              Brand: {productData.brand}
            </Text>
            <Text style={styles.additionalText}>
              Material: {productData.material}
            </Text>
            <Text style={styles.additionalText}>
              Category: {productData.category}
            </Text>
            <Text style={styles.additionalText}>Type: {productData.type}</Text>
            <Text style={styles.additionalText}>
              Seller: {productData.seller}
            </Text>
            <Text style={styles.additionalText}>
              Ratings: {productData.ratings} ⭐
            </Text>
            <Text style={styles.additionalText}>
              Tags: {productData.tags.join(', ')}
            </Text>
            <Text style={styles.additionalText}>SKU: {productData.sku}</Text>
            <Text style={styles.additionalText}>
              Launch Date: {productData.launchDate}
            </Text>
            <Text style={styles.additionalText}>
              Shipping: {productData.shipping.cost} (
              {productData.shipping.estimatedDelivery})
            </Text>
            <Text style={styles.additionalText}>
              Return Policy: {productData.returnPolicy}
            </Text>
          </View>

          {/* Add to Cart Button */}
          <TouchableOpacity style={styles.addToCartBtn}>
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Product;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  scrollView: {
    flex: 1,
  },
  mainImageContainer: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainProductImage: {
    resizeMode: 'cover',
    borderRadius: 10,
  },
  thumbnailContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  thumbnailImage: {
    width: 60,
    height: 60,
    resizeMode: 'cover',
    borderRadius: 5,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  productDetails: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 0,
  },
  productName: {
    fontSize: 24,
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
  oldPrice: {
    textDecorationLine: 'line-through',
    color: '#999',
    fontSize: 16,
  },
  stockText: {
    fontSize: 16,
    color: '#4CAF50',
    marginBottom: 15,
  },
  sizeContainer: {
    marginBottom: 15,
  },
  sizeText: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  sizeList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  size: {
    fontSize: 16,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginRight: 10,
  },
  additionalDetails: {
    // marginVertical: 15,
  },
  additionalText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  addToCartBtn: {
    backgroundColor: '#1E90FF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
