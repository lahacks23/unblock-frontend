import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthProvider";
import styles from "../../styles.js";
import { Text, View, Image, FlatList, StyleSheet, Pressable } from "react-native";
import Button from './Button.js'

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
  const [userName, setUserName] = useState("");
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    setUserName(user.displayName);
    setProfilePic(user.photoURL);
  }, []); //ComponentDidMount

  const listItem = (item) => 
    <View>
      <View>
        <Text style={styles2.item}>{item.key}</Text>
        <Text>{item.key}</Text>
      </View>
      <Button title="Request Access" />
      <View
        style={{
          borderBottomColor: 'grey',
          borderBottomWidth: 1,
          marginLeft: 5,
          marginRight: 5,
          marginTop: 10,
        }}
      />
    </View>
  return (
    <View style={styles.container}>
      <Text>Welcome {userName}</Text>
      <Text>Nearby Devices</Text>
      <FlatList
        style={styles2.list}
        data={[
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
        ]}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => listItem(item)}
      />
      <Image style={styles.profileImage} source={{ uri: profilePic }} />
    </View>
  );
}