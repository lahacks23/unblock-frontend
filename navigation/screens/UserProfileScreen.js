import React, {useContext} from "react";
import { AuthContext } from "../AuthProvider";
import styles from "../../styles.js";
import { Text, View, Button } from "react-native";

export default function UserProfileScreen() {
  const { logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text>User Profile Screen</Text>

      <Button onPress={logout} title="Log Out" />
    </View>
  );
}
