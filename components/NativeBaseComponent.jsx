import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Box, Button} from 'native-base';

const NativeBaseComponent = () => {
  return (
    <Box style={{gap: 10}}>
      <Button
        variant="outline"
        colorScheme="secondary"
        onPress={() => console.log('hello world')}>
        Click me
      </Button>
      <Button
        variant="outline"
        colorScheme="primary"
        onPress={() => console.log('hello world')}>
        PRIMARY BUTTON
      </Button>
      ;
    </Box>
  );
};

export default NativeBaseComponent;

const styles = StyleSheet.create({});
