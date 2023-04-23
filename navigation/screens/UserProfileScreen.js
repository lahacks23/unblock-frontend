import React, {useContext} from "react";
import { AuthContext } from "../AuthProvider";
import styles from "../../styles.js";
import { Text, View } from "react-native";
import Button from "./Button.js"

export default function UserProfileScreen() {
  const { user, logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>User Profile Screen</Text>

      <Text>{user && user.email}</Text>

      <Button onPress={logout} title="Log Out" />
    </View>
  );
}
