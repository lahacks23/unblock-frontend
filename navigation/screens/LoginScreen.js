import React, { useContext } from "react";
import styles from "../../styles.js";
import { Text, View, TouchableOpacity, Image} from "react-native";
import { AuthContext } from "../AuthProvider.js";
import Login from "./Login.js";
import Signin from "./Signin.js";

export default function LoginScreen() {
  const { login } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <View style={styles.login}>
      <View style={styles.tinyLogoContainer}>
      <Image
        style={styles.tinyLogo}
        source={require('../../assets/logo3.png')}
      /></View></View>
      {/* <View style={styles.login2}><Text style={styles.login3}>Scan your Credit Card to Sign In!</Text></View>
      <View style={styles.qrcodebottom}></View>
      <View style={styles.qrcodebottom2}></View> */}
    
      <Signin></Signin>
      <Login></Login>
    </View>
  );
}
