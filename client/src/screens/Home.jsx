import React, {useEffect} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import HomeHeader from '../components/HomeHeader';
import Categories from '../components/Categories';
import {getProduct, productStates} from '../slices/productsSlice';
import CustomCarousel from '../components/CustomCarousel';
import ProductList from '../components/Products';
import { getCartItems } from '../slices/cartSlice';
import { getwishlist } from '../slices/wishlistSlice';


const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const {products} = useSelector(productStates);

  useEffect(() => {
    dispatch(getProduct());
    dispatch(getCartItems());
    dispatch(getwishlist());
  }, [dispatch]);


  const categorizedProducts = {};
  products.forEach(product => {
    if (!categorizedProducts[product.category]) {
      categorizedProducts[product.category] = [];
    }
    categorizedProducts[product.category].push(product);
  });
  const categories = Object.keys(categorizedProducts);

  return (
    <View style={styles.container}>
      <HomeHeader navigation={navigation} />
      <ScrollView vertical showsVerticalScrollIndicator={false}>
        <Categories />
        <CustomCarousel />

        {categories.map(category => (
          <ProductList
            key={category}
            category={category}
            products={categorizedProducts[category]}
          />
        ))}

        
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
});
