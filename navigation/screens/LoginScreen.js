import React, { useContext, useState } from "react";
import styles from "../../styles.js";
import { Text, View, TouchableOpacity, Image, Pressable} from "react-native";
import { AuthContext } from "../AuthProvider.js";
import Signup from "./Signup.js";
import Signin from "./Signin.js";

export default function LoginScreen() {
  const [showSignup, setShowSignup] = useState(false);
  return (
    <View style={styles.invertContainer}>
      <View style={styles.login}>
      <View style={styles.tinyLogoContainer}>
      <Image
        style={styles.tinyLogo}
        source={require('../../assets/logo3.png')}
      /></View></View>
      {/* <View style={styles.login2}><Text style={styles.login3}>Scan your Credit Card to Sign In!</Text></View>
      <View style={styles.qrcodebottom}></View>
      <View style={styles.qrcodebottom2}></View> */}
      <View style={styles.container}>
        {showSignup ? <Signup/> : 
          <View>      
            <Signin/>
            <Pressable style={styles.container} onPress={() => setShowSignup(true)}>
              <Text>Create an Account</Text>
            </Pressable>
        </View>}
      </View>

    </View>
  );
}
