import { useEffect, useState } from "react";
import { TextInput, Text, View, TouchableOpacity } from 'react-native';
import Button from "./Button.js"
import styles from "../../styles.js";

import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import apiKeys from "../../config/apiKeys";
const firebaseConfig = apiKeys.firebaseConfig
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase();

export default function Signup() {
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
      const userCredential = await createUserWithEmailAndPassword(auth, value.email, value.password);
      const accessToken = userCredential.user.accessToken;
      console.log(userCredential);
      await updateDB();
      // navigation.navigate('Sign In');
    } catch (error) {
      setValue({
        ...value,
        error: error.message,
      })
    } 
  }

  const updateDB = async () => {
    set(ref(db, `users/${value.email}`), {
      email: value.email,
      password: value.password,
    });
  }

  return <View>
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

    <Button title="Sign Up" onPress={signUp} /> 
  </View>
}
