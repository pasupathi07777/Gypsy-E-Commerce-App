import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Text, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import HomeHeader from '../components/HomeHeader';
import Categories from '../components/Categories';
import { getProduct, productStates } from '../slices/productsSlice';
import CustomCarousel from '../components/CustomCarousel';
import ProductList from '../components/Products';
import { getCartItems } from '../slices/cartSlice';
import { getwishlist } from '../slices/wishlistSlice';
import { getAddress } from '../slices/addressSlice';
import { getOurOrder } from '../slices/orderSlice';
import { bannerStates, fetchBanners } from '../slices/bannerSlice';
import { categoryStates, getCategory } from '../slices/categorySlice';

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const { products } = useSelector(productStates);
  const { banners } = useSelector(bannerStates);
  const { categories } = useSelector(categoryStates);
  const [refreshing, setRefreshing] = useState(false);

  // Function to handle refresh
  const onRefresh = async () => {
    setRefreshing(true); // Show the loader
    console.log('Refreshing data...');

    try {
      // Dispatch all data-fetching actions
      await Promise.all([
        dispatch(getProduct()),
        dispatch(getCartItems()),
        dispatch(getwishlist()),
        dispatch(getAddress()),
        dispatch(getOurOrder()),
        dispatch(fetchBanners()),
         dispatch(getCategory())
      ]);
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setRefreshing(false); // Hide the loader
    }
  };

  // Initial data fetch on component mount
  useEffect(() => {
    onRefresh(); // Fetch data when the component mounts
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <HomeHeader navigation={navigation} />

      <ScrollView
        vertical
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing} // Controlled by the `refreshing` state
            onRefresh={onRefresh} // Function to call when refreshing
          />
        }
      >
        <Categories />

        {banners.length > 0 && categories.length>0 && <CustomCarousel />}

        {categories.length > 0 ? (
          categories.map((category) => (
            <ProductList
              key={category._id}
              category={category.category}
              products={products}
            />
          ))
        ) : (
          <View style={styles.noProductsContainer}>
            <Text style={styles.noProductsText}>No Products Available</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  noProductsContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  noProductsText: {
    fontSize: 16,
    fontWeight: 'semibold',
    color: '#000',
  },
});