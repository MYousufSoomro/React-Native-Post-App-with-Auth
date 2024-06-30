import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {Button} from 'native-base';
import Alert_Component from '../components/Alert_Component';

const Signin = ({navigation}) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const inputDataHandler = (field, value) => {
    setData(pre => ({...pre, [field]: value}));
    <Alert_Component />;
  };

  // console.log(data);

  const submitBtnHandler = () => {
    // console.log(data);
    if (data.email == '' || data.password == '') {
      Alert_Component();
    }

    setIsLoading(true);
    auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then(() => {
        console.log('User account signed in!');
        setData({});
        navigation.navigate('Homescreen');
        setIsLoading(false);
      })
      .catch(error => {
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
        setIsLoading(false);

        console.error(error);
      });
  };

  return (
    <View style={{gap: 10, padding: 10}}>
      <Text style={styles.heading}>Signin</Text>
      <TextInput
        keyboardType="email-address"
        style={styles.input}
        placeholder="Enter email address"
        onChangeText={e => inputDataHandler('email', e)}
        value={data.email}
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
          <Text style={styles.btnText}>Signin</Text>
        </TouchableOpacity>
      ) : (
        <Button isLoading isLoadingText="Submitting">
          Signin
        </Button>
      )}
      <View>
        <Text>
          Don't have an account?
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.secondaryBtn}>Signup here</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  );
};

export default Signin;

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
