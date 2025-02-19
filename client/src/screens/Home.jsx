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

  const onRefresh = async () => {
    setRefreshing(true); 
    console.log('Refreshing data...');

    try {
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
      setRefreshing(false); 
    }
  };

  useEffect(() => {
    onRefresh(); 
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <HomeHeader navigation={navigation} />

      <ScrollView
        vertical
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing} 
            onRefresh={onRefresh} 
          />
        }>
        <Categories />

        {banners.length > 0 && categories.length > 0 && <CustomCarousel />}

        {categories.length > 0
          ? categories.map(category => (
              <ProductList
                key={category._id}
                category={category.category}
                products={products}
              />
            ))
          : !refreshing && (
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