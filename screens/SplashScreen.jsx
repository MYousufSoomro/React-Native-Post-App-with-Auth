import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Box, Button, Center, HStack, Heading} from 'native-base';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({navigation}) => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const storeData = async uid => {
    try {
      await AsyncStorage.setItem('UID', uid);
      console.log('UID DATA STORED IN ASYNC STORAGE');
    } catch (e) {
      // saving error
      console.log('ERROR >>>> ', e);
    }
  };

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // if (initializing) return null;

  if (user) {
    storeData(user.uid);
    navigation.navigate('Homescreen');
    console.log('USER >>>> ', user.uid);
  }

  return (
    <Box style={styles.mainBox}>
      <Heading size="2xl" style={styles.mainHeading}>
        Welcome!
      </Heading>
      <Text style={styles.textSample} fontSize="xl">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium,
        neque repudiandae veritatis dolore deleniti animi fugit labore
        temporibus libero. Reprehenderit totam fuga nulla quibusdam quis fugiat
        facilis ducimus nostrum illo.
      </Text>
      <Box style={styles.startBtn}>
        <Button onPress={() => navigation.navigate('Signin')}>
          Get Started
        </Button>
      </Box>
    </Box>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  mainBox: {
    flex: 1,
    backgroundColor: '#ECCBD9',
    justifyContent: 'center',
    paddingHorizontal: 10,
    gap: 20,
  },
  mainHeading: {
    textAlign: 'center',
    color: '#345995',
  },
  textSample: {
    color: '#000',
    textAlign: 'center',
  },
  startBtn: {
    paddingHorizontal: 100,
  },
});
