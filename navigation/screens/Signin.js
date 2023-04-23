import {useState } from "react";
import { TextInput, Text, View } from 'react-native';
import Button from "./Button.js"
import styles from "../../styles.js";

import { initializeApp } from "firebase/app";
import apiKeys from "../../config/apiKeys";
const firebaseConfig = apiKeys.firebaseConfig
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function Signin() {
  const [value, setValue] = useState({
    email: '',
    password: '',
    error: ''
  })
  const signUp = async () => {
    if (value.email === '' || value.password === '') {
      setValue({
        ...value,
        error: 'Email and password are mandatory.'
      })
      return;
    }
  
    try {
      const userCredential = await signInWithEmailAndPassword(auth, value.email, value.password);
      const accessToken = userCredential.user.accessToken;
      // navigation.navigate('Sign In');
    } catch (error) {
      setValue({
        ...value,
        error: error.message,
      })
    } 
  }


  return <View>
    <Text>Log In</Text>
    {!!value.error && <View><Text>{value.error}</Text></View>}

    <TextInput
      style={styles.input}
      placeholder='Email'
      value={value.email}
      onChangeText={(text) => setValue({ ...value, email: text })}
    /> 

    <TextInput
      style={styles.input}
      placeholder='Password'
      value={value.password}
      onChangeText={(text) => setValue({ ...value, password: text })}
      secureTextEntry={true}
    />

    <Button title="Log In" onPress={signUp} /> 
  </View>
}
