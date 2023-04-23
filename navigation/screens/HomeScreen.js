import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthProvider";
import styles from "../../styles.js";
import { Text, View, Button, Image } from "react-native";
import { processLockResponse } from "../../unblock/index";

export default function HomeScreen() {
  const { user, logout } = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    user.getIdToken().then(async (token) => {
      console.log(token);
      const request = {
        uid: user.uid,
        rid: 123,
        lid: "lock1",
        type: "open"
      };
      console.log(await processLockResponse(token, request, {nonce:111, ...request}));
    });
    setUserName(user.displayName);
    setProfilePic(user.photoURL);
  }, []); //ComponentDidMount

  return (
    <View style={styles.container}>
      <Text>Welcome {userName}</Text>
      <Image style={styles.profileImage} source={{ uri: profilePic }} />

      <Button onPress={logout} title="Log Out" />
    </View>
  );
}
