import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const Camera_Gallery_Component = () => {
  const [image, setImage] = useState([]);

  const openCameraHandler = async () => {
    try {
      await launchCamera(
        {
          includeBase64: false,
          mediaType: 'photo',
        },
        res => {
          //   console.log('RESPONSE: ' + res.assets[0].uri);
          setImage(res.assets);
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  const openGalleyHandler = async () => {
    try {
      await launchImageLibrary(
        {
          includeBase64: false,
          mediaType: 'photo',
          selectionLimit: 5,
        },
        res => {
          //   console.log('RESPONSE: ' + res.assets[0].uri);
          setImage(res.assets);
        },
      );
    } catch (error) {
      console.log(error);
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
      <ScrollView style={{gap: 10}}>
        {image.length > 0 &&
          image.map((image, ind) => (
            <Image
              key={ind}
              style={{width: 400, height: 200, resizeMode: 'cover'}}
              source={{uri: image.uri}}
            />
          ))}
      </ScrollView>

      <TouchableOpacity onPress={openCameraHandler}>
        <Text style={{fontSize: 30, color: 'orange'}}>OPEN CAMERA</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={openGalleyHandler}>
        <Text style={{fontSize: 30, color: 'green'}}>OPEN GALLERY</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Camera_Gallery_Component;

const styles = StyleSheet.create({});
