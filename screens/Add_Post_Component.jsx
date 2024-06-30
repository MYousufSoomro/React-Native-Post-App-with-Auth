import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Button,
  FormControl,
  Input,
  ScrollView,
  Stack,
  TextArea,
} from 'native-base';
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Add_Post_Component = ({navigation}) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const inputDataHandler = (field, value) => {
    setData(pre => ({...pre, [field]: value}));
  };

  const dataSubmitHandler = async () => {
    setIsLoading(true);
    const postRef = database().ref('posts').push();

    let dataForPost = data;
    dataForPost.date = new Date().toString();
    dataForPost.uid = await AsyncStorage.getItem('UID');
    dataForPost.postKey = postRef.key;
    console.log('data >> ', dataForPost);

    database()
      .ref(`/posts/${dataForPost.postKey}`)
      .set(dataForPost)
      .then(() => console.log('Post Added to database...'))
      .catch(error => {
        console.error(error);
        setIsLoading(false);
      });

    setData({});
    navigation.navigate('Homescreen');
  };

  return (
    <ScrollView>
      <Stack space={4} paddingX={7} marginTop={5}>
        <FormControl.Label>Title:</FormControl.Label>
        <Input
          onChangeText={e => inputDataHandler('title', e)}
          value={data.title}
          variant="outline"
          placeholder="Enter title here..."
        />
        <FormControl.Label>Image URL:</FormControl.Label>
        <Input
          onChangeText={e => inputDataHandler('imgUrl', e)}
          value={data.imgUrl}
          variant="outline"
          placeholder="Enter URL here..."
        />
        <FormControl.Label>Description:</FormControl.Label>
        <TextArea
          onChangeText={e => inputDataHandler('description', e)}
          value={data.description}
          h={20}
          placeholder="Write brief description..."
        />
        {!isLoading ? (
          <Button onPress={dataSubmitHandler}>Add Post</Button>
        ) : (
          <Button isLoading isLoadingText="Adding...">
            Add Post
          </Button>
        )}
      </Stack>
    </ScrollView>
  );
};

export default Add_Post_Component;

const styles = StyleSheet.create({});
