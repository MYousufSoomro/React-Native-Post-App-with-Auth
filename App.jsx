import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
// import Async_Storage_Component from './components/Async_Storage_Component';
import Camera_Gallery_Component from './components/Camera_Gallery_Component';
import FirebaseComponent from './components/FirebaseComponent';
import {Button, NativeBaseProvider} from 'native-base';
import NativeBaseComponent from './components/NativeBaseComponent';
import SplashScreen from './screens/SplashScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Signup from './screens/Signup';
import Signin from './screens/Signin';
import Homescreen from './screens/Homescreen';
import Add_Post_Component from './screens/Add_Post_Component';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        {/* <Async_Storage_Component/> */}
        {/* <Camera_Gallery_Component /> */}
        {/* <FirebaseComponent /> */}
        {/* <NativeBaseComponent /> */}
        {/* <SplashScreen /> */}
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen
            options={{
              headerShown: true,
              headerBackVisible: false,
              title: 'My home',
              headerStyle: {
                backgroundColor: '#f4511e',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              headerRight: () => <Button title="Logout" />,
            }}
            name="Homescreen"
            component={Homescreen}
          />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Signin" component={Signin} />
          <Stack.Screen
            options={{
              headerShown: true,
              title: 'Add Post',
              headerStyle: {
                backgroundColor: '#f4511e',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
            name="AddPost"
            component={Add_Post_Component}
          />
        </Stack.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
