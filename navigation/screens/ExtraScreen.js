import React, { useContext } from "react";
import styles from "../../styles.js";
import { Text, View, FlatList, Image } from "react-native";
import Button from "./Button.js";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database'
import { AuthContext } from "../AuthProvider.js";
import { processGuestAccept } from "../../unblock/index.js";

export default function ExtraScreen() {
  const { user, setUser, requests, setRequests } = useContext(AuthContext);

  
  const sendRequest = async () => {
    const ref = firebase.database().ref("requests");
    setUser(user);

    const newRef = await ref.child(user.uid + "/123")
    console.log(newRef.key);

    newRef.set({
      uid: "jPdZWtRaOIYl0NVxdO3atyMlauh1",
      lid: "lock1",
      rid: 123,
      type: "UNLOCK"
    })

    // ref.child(user.uid).child("blahblah").set({
    //   uid: "jgge",
    //   key: ""
    // });
  }

  const accept = async (item) => {
    const userToken = await user.getIdToken();
    await processGuestAccept(userToken, item, true);
  }

  const deny = async (item) => {
    const userToken = await user.getIdToken();
    await processGuestAccept(userToken, item, false);
  }
  const listItem = (item) => 
    <View style={styles.hcontainer}>
      <Image 
        style={styles.lockImg}
        source={{uri: 'https://cdn-icons-png.flaticon.com/512/61/61457.png'}}
      />
      <View style={styles.container}>
        <Text style={styles.colorText}>Lock 1</Text>
        {/* <Text style={styles2.item}>{item.key}</Text> */}
        <Text>{item.what}</Text>
        <View style={styles.hcontainer}>
          <Button title="Accept" onPress={() => accept(item)}/>
          <Button title="Deny" onPress={() => deny(item)}/>
        </View>
        <View
        style={{
          borderBottomColor: 'grey',
          borderBottomWidth: 1,
          marginLeft: 5,
          marginRight: 5,
          marginTop: 10,
          width: 343,
        }}
      />
      </View>
    </View>
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
