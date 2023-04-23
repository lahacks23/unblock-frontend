import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthProvider";
import styles from "../../styles.js";
import { Text, View, Image, FlatList, StyleSheet, Pressable } from "react-native";
import Button from './Button.js'
import Lock from "./Lock";

const styles2 = StyleSheet.create({
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    marginTop: 10,
    borderRadius: 5,
    borderColor: "gray",
    borderWidth: 1,
    // color: "white",
  },
  list: {
    width: 300,
    // backgroundColor: "#131C47",
  },
});


export default function HomeScreen() {
  const { user } = useContext(AuthContext);
  const [lockNum, setLockNum] = useState("");
  const [userName, setUserName] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const data = [
    {key: 'Device Title'},
    {key: 'Dan'},
    {key: 'Dominic'},
    {key: 'Jackson'},
    {key: 'James'},
    {key: 'Joel'},
    {key: 'John'},
    {key: 'Jillian'},
    {key: 'Jimmy'},
    {key: 'Julie'},
  ]
  
  const updateSelection = () => {
    console.log("lock selected!")
    setLockNum("Bob")
  }

  useEffect(() => {
    setUserName(user.displayName);
    setProfilePic(user.photoURL);
  }, []); //ComponentDidMount

  const listItem = (item) => 
    <View style={styles.hcontainer}>
      <Image 
        style={styles.lockImg}
        source={{uri: 'https://cdn-icons-png.flaticon.com/512/61/61457.png'}}
      />
      <View style={styles.container}>
        <Text style={styles.colorText}>Lock 1</Text>
        {/* <Text style={styles2.item}>{item.key}</Text> */}
        <Text>{item.key}</Text>
        <Button title="Request Access" onPress={updateSelection} />
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
      {lockNum ? 
        <View style={styles.container}>
          <Button title="Back" onPress={() => setLockNum("")}
          />
          <Lock />
        </View> : 
        <View style={styles.container}>
          <Text style={styles.titleText}>Welcome {userName}</Text>
          <Text style={styles.colorText}>Nearby Devices</Text>
          <FlatList
            style={styles2.list}
            data={data}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => listItem(item)}
          />
        </View>
      }
      {/* <Image style={styles.profileImage} source={{ uri: profilePic }} /> */}
    </View>
  );
}