import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import React from 'react';
import { outProducts } from '../../data/Products';

const Home = () => {
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
      <FlatList
        data={outProducts}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2} // Display items in two columns
        showsVerticalScrollIndicator={false} // Hide vertical scrollbar
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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
