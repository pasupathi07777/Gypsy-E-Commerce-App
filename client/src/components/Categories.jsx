import {StyleSheet, Text, View, FlatList} from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { categoryStates, getCategory } from '../slices/categorySlice';

const Categories = () => {

    const dispatch = useDispatch();
    const {categories} = useSelector(categoryStates); 

  const renderCategory = ({item}) => (
    <View style={styles.categoryContainer}>
      <Text style={styles.categoryText}>{item.category}</Text>
    </View>
  );

  useEffect(()=>{
    dispatch(getCategory());
  },[])

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
    paddingVertical: 5,
  },
  categoryContainer: {
    backgroundColor: '#f0f0f0',
    marginRight: 10,
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 16,
    color: '#333',
  },
});
