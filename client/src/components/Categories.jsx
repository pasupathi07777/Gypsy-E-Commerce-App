import React, {useEffect} from 'react';
import {StyleSheet, Text, View, FlatList, Image, Pressable} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {categoryStates, getCategory} from '../slices/categorySlice';
import {useNavigation} from '@react-navigation/native';

const Categories = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation(); // Hook for navigation
  const {categories} = useSelector(categoryStates);

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  const handleCategoryPress = category => {
    navigation.navigate('CategoryProduct', {
      category
    }); // Navigate to CategoryScreen with data
  };

  const renderCategory = ({item}) => (
    <Pressable
      style={styles.categoryContainer}
      onPress={() => handleCategoryPress(item.category)}>
      <Image source={{uri: item.image}} style={styles.categoryImage} />
      <Text style={styles.categoryText}>{item.category}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={item => item._id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  categoryContainer: {
    alignItems: 'center',
    marginRight: 15,
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 30, // Makes the image circular
    marginBottom: 5,
  },
  categoryText: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
    textAlign: 'center',
    textTransform: 'capitalize',
  },
});
