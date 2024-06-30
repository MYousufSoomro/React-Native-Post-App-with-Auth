import React, {useState, useEffect} from 'react';
import {Button, View, Text, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';
import Card_Component from '../components/Card_Component';
import {Fab, Icon, ScrollView} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import database from '@react-native-firebase/database';
const postsRef = database().ref('/posts');
const usersRef = database().ref('/users');

const Homescreen = ({navigation}) => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  // const getDataFromCloud = async () => {
  //   try {
  //     const reference = database().ref('/posts');
  //     const usersRef = database().ref('/users');
  //     const snapshot = await reference.once('value');
  //     const usersSnap = await usersRef.once('value');
  //     const posts = snapshot.val();
  //     const users = usersSnap.val();

  //     if (posts) {
  //       const allPosts = [];
  //       // Efficiently iterate using for...of loop (modern syntax)
  //       for (const postId in posts) {
  //         allPosts.push(posts[postId]);
  //       }
  //       console.log('All posts:', allPosts);
  //       setPosts(allPosts);
  //       // Use the array of retrieved posts in your component
  //     } else {
  //       console.log('No posts found');
  //     }

  //     if (users) {
  //       const allUsers = [];
  //       for (const userId in users) {
  //         allUsers.push(users[userId]);
  //       }
  //       console.log('All users:', allUsers);
  //       setUsers(allUsers);
  //     } else {
  //       console.log('No users found');
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   };

  const getDataFromCloud = async () => {
    try {
      const reference = database().ref('/posts');
      const usersRef = database().ref('/users');
      const unsubscribePosts = reference.on('value', snapshot => {
        const posts = snapshot.val();

        if (posts) {
          const allPosts = [];
          // Efficiently iterate using for...of loop (modern syntax)
          for (const postId in posts) {
            allPosts.push(posts[postId]);
          }
          // console.log('All posts:', allPosts);
          setPosts(allPosts);
          // Use the array of retrieved posts in your component
        } else {
          console.log('No posts found');
        }
      });
      const usersSnap = await usersRef.once('value');
      const users = usersSnap.val();

      if (users) {
        const allUsers = [];
        for (const userId in users) {
          allUsers.push(users[userId]);
        }
        // console.log('All users:', allUsers);
        setUsers(allUsers);
      } else {
        console.log('No users found');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUsernameFromUID = uid => {
    for (let u in users) {
      if (users[u].uid == uid) {
        return users[u].fullname;
      }
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    getDataFromCloud();
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    // Use `setOptions` to update the button that we previously specified
    // Now the button includes an `onPress` handler to update the count
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() =>
            auth()
              .signOut()
              .then(() => navigation.navigate('Signin'))
          }>
          <Text>Logout</Text>
        </TouchableOpacity>
        // <Button
        //   onPress={
        //     () => console.log('Logout button has been clicked...')
        //     // auth()
        //     //   .signOut()
        //     //   .then(() => console.log('User signed out!'))
        //   }
        //   title="Logout"
        // />
      ),
    });
  }, [navigation]);

  if (initializing) return null;

  if (!user) {
    navigation.navigate('Signin');
  }

  return (
    <View>
      <ScrollView>
        {posts.length > 0 &&
          posts.map((item, index) => {
            return (
              <Card_Component
                key={index}
                imageURL={item.imgUrl}
                Title={item.title}
                Author={getUsernameFromUID(item.uid)}
                Description={item.description}
                Date={item.date}
              />
            );
          })}
        {/* <Card_Component
          imageURL="https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg"
          Title="The Garden City"
          Author="Muhammad Yousuf"
          Description="Bengaluru (also called Bangalore) is the center of India's high-tech
            industry. The city is also known for its parks and nightlife."
          Date="12 Dec 2014 at 12:00 PM"
        /> */}
      </ScrollView>
      <Fab
        onPress={() => navigation.navigate('AddPost')}
        renderInPortal={false}
        shadow={2}
        size="sm"
        icon={<Icon color="white" as={<AntDesign name="plus" />} size="sm" />}
      />
    </View>
  );
};

export default Homescreen;
