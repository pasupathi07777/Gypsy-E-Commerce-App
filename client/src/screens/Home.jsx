import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TextInput,
  Animated,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React, {useRef, useState} from 'react';
import HomeHeader from '../components/HomeHeader';
import {useDispatch, useSelector} from 'react-redux';
import {
  filterProductsByName,
  findProduct,
  productState,
} from '../slices/productsSlice';


const Home = ({navigation}) => {
  const [searchText, setSearchText] = useState('');
  const {filteredProducts} = useSelector(productState);
  const dispatch = useDispatch();

  const [scrollDirection, setScrollDirection] = useState(false);
  const lastOffset = useRef(0);

  const handleScroll = event => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const scrollDifference = currentOffset - lastOffset.current;

    if (scrollDifference > 0) {
      if (scrollDifference > 2) {
        setScrollDirection(true);
      }
      console.log(scrollDifference);
    } else if (scrollDifference < -1) {
      console.log(scrollDifference);
      if (scrollDifference < 2) {
        setScrollDirection(false);
      }
    }
    lastOffset.current = currentOffset;
  };

  const navigateScreen = id => {
    navigation.navigate('Product');
    dispatch(findProduct(id));
  };

  const handleSearch = text => {
    setSearchText(text);
    dispatch(filterProductsByName(text)); 
  };

  const renderProduct = ({item}) => {
    return (
      <Pressable
        style={styles.productContainer}
        onPress={() => navigateScreen(item.id)}>
        <Image source={item.coverImage} style={styles.productImage} />
        <Text style={styles.productName}>{item.name}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.oldPrice}>₹{item.pastPrice}</Text>
          <Text style={styles.newPrice}>₹{item.latestPrice}</Text>
        </View>
        <TouchableOpacity style={styles.addToCartBtn}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <HomeHeader navigation={navigation} />

      <Animated.View
        style={[
          styles.searchContainer,
          {
            opacity: scrollDirection ? 0 : 1,
            transform: [
              {
                translateY: scrollDirection ? -50 : 0,
              },
            ],
          },
        ]}>

        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          value={searchText}
          onChange={e => handleSearch(e.nativeEvent.text)} 
        />
      </Animated.View>

      <FlatList
        data={filteredProducts} 
        renderItem={renderProduct}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.flatListContent}
      />

    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    zIndex: 10,
    padding: 10,
  },
  searchInput: {
    height: 40,
    borderRadius: 5,
    paddingLeft: 15,
    backgroundColor: '#fff',
  },
  productContainer: {
    flex: 1,
    margin: 5, 
    borderRadius: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 10,
  },
  productImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  productName: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  priceContainer: {
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
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
  flatListContent: {
    paddingTop: 55,
    paddingBottom: 20,
    paddingHorizontal: 5, 
  },
  addToCartBtn: {
    backgroundColor: '#FF5722',
    padding: 5,
    marginTop: 5,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  addToCartText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

