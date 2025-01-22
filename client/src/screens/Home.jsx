import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Pressable,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import HomeHeader from '../components/HomeHeader';
import Categories from '../components/Categories';
import {getProduct, productStates} from '../slices/productsSlice';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const {products} = useSelector(productStates);

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  const categorizedProducts = {};
  products.forEach(product => {
    if (!categorizedProducts[product.category]) {
      categorizedProducts[product.category] = [];
    }
    if (categorizedProducts[product.category].length < 4) {
      categorizedProducts[product.category].push(product);
    }
  });

  const categories = Object.keys(categorizedProducts);

  const renderCategory = ({item: category}) => (
    <View style={styles.categoryContainer}>
      <View style={styles.headingContainer}>
        <Text style={styles.categoryTitle}>{category}</Text>
        <Text style={styles.categoryHeadingBtn}>See All</Text>
      </View>
      <FlatList
        data={categorizedProducts[category]}
        renderItem={renderProduct}
        keyExtractor={item => item._id}
        numColumns={2} // Display two products per row
        columnWrapperStyle={styles.row} // Style for the row
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );

  const renderProduct = ({item}) => (
    <Pressable
      style={styles.productContainer}
      onPress={() => navigateScreen(item._id)}>
      <Image source={{uri: item.photos[0]}} style={styles.productImage} />
      <Text style={styles.productName}>{item.name.slice(0, 15)}</Text>
      <View style={styles.priceContainer}>
        <Text style={styles.newPrice}>₹{item.price}</Text>
      </View>
      {/* <TouchableOpacity style={styles.addToCartBtn}>
        <Text style={styles.addToCartText}>Add to Cart</Text>
      </TouchableOpacity> */}
    </Pressable>
  );

  const navigateScreen = id => {
    navigation.navigate('Product', {id});
  };

  return (
    <View style={styles.container}>
      <HomeHeader navigation={navigation} />
      <Categories />
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={item => item}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  categoryContainer: {
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    paddingHorizontal: 5,
  },
  categoryHeadingBtn: {
    color: '#FEAB0D',
  },
  row: {
    justifyContent: 'space-between', 
  },
  headingContainer: {
    justifyContent: 'space-between',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  productContainer: {
    flex: 1,
    margin: 5,
    borderRadius: 5,
    backgroundColor: '#EEEEEE',
    padding: 10,
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  productName: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
    // textAlign: 'center',
    width: '100%',
    justifyContent: 'start',
    // backgroundColor: 'red',
  },
  priceContainer: {
    marginTop: 2,
    alignItems: 'center',
    width: '100%',
  },
  newPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FEAB0D',
    justifyContent: 'start',
    width: '100%',
  },
  addToCartBtn: {
    backgroundColor: '#FF5722',
    padding: 8,
    marginTop: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  addToCartText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  flatListContent: {
    paddingBottom: 20,
  },
});
