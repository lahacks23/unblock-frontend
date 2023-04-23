import React, { useContext } from "react";
import styles from "../../styles.js";
import { Text, View } from "react-native";
import Button from "./Button.js";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database'
import { AuthContext } from "../AuthProvider.js";

export default function ExtraScreen() {
  const { user, setUser } = useContext(AuthContext);
  const sendRequest = () => {
    const ref = firebase.database().ref("requests");
    if (user) ref.child(user.uid).off("child_added");
      
    console.log(user);
      
    setUser(user);
    ref.child(user.uid).push({what: "what3"});
  }
  return (
    <View style={styles.container}>
      <Text>An Extra Screen</Text>
      <Button onPress={sendRequest} title="Test"/>
    </View>
  );
}
