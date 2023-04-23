import React, { useContext } from "react";
import styles from "../../styles.js";
import { Text, View, FlatList } from "react-native";
import Button from "./Button.js";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database'
import { AuthContext } from "../AuthProvider.js";

export default function ExtraScreen() {
  const { user, setUser, requests } = useContext(AuthContext);

  const listItem = (item) => <Text>{item.what}</Text>
  
  const sendRequest = () => {
    const ref = firebase.database().ref("requests");
    console.log(user);
    setUser(user);
    ref.child(user.uid).push({what: "what" + Math.random()});
  }
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Guest Requests</Text>
      <Button onPress={sendRequest} title="Test"/>
      <FlatList
        data={requests}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => listItem(item)}
      />
    </View>
  );
}
