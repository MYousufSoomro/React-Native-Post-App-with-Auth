import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {Button} from 'native-base';

const Signup = ({navigation}) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const inputDataHandler = (field, value) => {
    setData(pre => ({...pre, [field]: value}));
  };

  // console.log(data);

  const submitBtnHandler = () => {
    // console.log(data);
    setIsLoading(true);
    auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(userCredential => {
        console.log('User account created & signed in!');
        const user = userCredential.user;
        let userDataObj = data;
        userDataObj.uid = user.uid;
        console.log('DATA >>> ', userDataObj);
        console.log('USER UID >>> ', user.uid);

        database()
          .ref(`/users/${userDataObj.uid}`)
          .set(userDataObj)
          .then(() => console.log('Data set.'))
          .catch(error => {
            console.error(error);
            setIsLoading(false);
          });

        setData({});
        navigation.navigate('Homescreen');
        setIsLoading(false);
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
        setIsLoading(false);
      });
  };

  return (
    <View style={{gap: 10, padding: 10}}>
      <Text style={styles.heading}>Signup</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Full Name"
        onChangeText={e => inputDataHandler('fullname', e)}
        value={data.fullname}
      />
      <TextInput
        keyboardType="email-address"
        style={styles.input}
        placeholder="Enter email address"
        onChangeText={e => inputDataHandler('email', e)}
        value={data.email}
      />
      <TextInput
        keyboardType="number-pad"
        style={styles.input}
        placeholder="Enter your age"
        onChangeText={e => inputDataHandler('age', e)}
        value={data.age}
      />
      <TextInput
        onChangeText={e => inputDataHandler('password', e)}
        style={styles.input}
        placeholder="Enter password"
        secureTextEntry={true}
        value={data.password}
      />
      {!isLoading ? (
        <TouchableOpacity style={styles.btn} onPress={submitBtnHandler}>
          <Text style={styles.btnText}>Signup</Text>
        </TouchableOpacity>
      ) : (
        <Button isLoading isLoadingText="Submitting">
          Signup
        </Button>
      )}
      <View>
        <Text>
          Already have an account?
          <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
            <Text style={styles.secondaryBtn}>Signin here</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  );
};

export default Signup;

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
  secondaryBtn: {
    marginHorizontal: 5,
    color: 'blue',
  },
});
