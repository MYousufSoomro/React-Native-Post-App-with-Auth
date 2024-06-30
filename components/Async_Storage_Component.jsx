import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Async_Storage_Component = () => {
  const setDataHandle = async () => {
    try {
      const jsonValue = JSON.stringify({
        name: 'yousuf',
        number: 123456,
        type: 'admin',
      });
      await AsyncStorage.setItem('@userData', jsonValue);
    } catch (e) {
      // saving error
      console.log(e);
    }
  };
  const getDataHandle = async () => {
    try {
      const result = await AsyncStorage.getItem('@userData');
      console.log(result);
    } catch (e) {
      // saving error
      console.log(e);
    }
  };
  const removeDataHandle = async () => {
    try {
      await AsyncStorage.removeItem('@userData');
    } catch (e) {
      // saving error
      console.log(e);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
      }}>
      <TouchableOpacity onPress={setDataHandle}>
        <Text style={{fontSize: 30, color: 'orange'}}>SET DATA</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={getDataHandle}>
        <Text style={{fontSize: 30, color: 'green'}}>GET DATA</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={removeDataHandle}>
        <Text style={{fontSize: 30, color: 'red'}}>REMOVE DATA</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Async_Storage_Component;

const styles = StyleSheet.create({});
