import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';

const FirebaseComponent = () => {
  const [data, setData] = useState({});

  const inputDataHandler = (field, value) => {
    setData(pre => ({...pre, [field]: value}));
  };

  // console.log(data);

  const submitBtnHandler = () => {
    // console.log(data);

    auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };

  return (
    <View style={{gap: 10, padding: 10}}>
      <Text style={styles.heading}>Signup</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter email address"
        onChangeText={e => inputDataHandler('email', e)}
      />
      <TextInput
        onChangeText={e => inputDataHandler('password', e)}
        style={styles.input}
        placeholder="Enter password"
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.btn} onPress={submitBtnHandler}>
        <Text style={styles.btnText}>Signup</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FirebaseComponent;

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
  },
  btn: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    borderRadius: 10,
    borderColor: 'blue',
    borderWidth: 1,
  },
  btnText: {color: 'white', textAlign: 'center'},
  heading: {
    fontSize: 40,
    fontWeight: 'bold',
    paddingBottom: 20,
    paddingTop: 10,
    textAlign: 'center',
  },
});
