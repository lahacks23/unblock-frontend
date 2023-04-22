import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import Providers from "./navigation/index";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import apiKeys from "./config/apiKeys";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = apiKeys.firebaseConfig

// import * as WebBrowser from "expo-web-browser";
// import * as Google from "expo-auth-session/providers/google";

// WebBrowser.maybeCompleteAuthSession();

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

export default function App() {
  return <Providers />;
}

// export default function App() {
//   // const [token, setToken] = useState("");
//   // const [userInfo, setUserInfo] = useState(null);

//   // const [request, response, promptAsync] = Google.useAuthRequest({
//   //   // androidClientId: "GOOGLE_GUID.apps.googleusercontent.com",
//   //   iosClientId: "GOOGLE_GUID.apps.googleusercontent.com",
//   // });  
//   // useEffect(() => {
//   //   if (response?.type === "success") {
//   //     setToken(response.authentication.accessToken);
//   //     getUserInfo();
//   //   }
//   // }, [response, token]);

//   const updateDB = async () => {
//     set(ref(db, 'users/123'), {
//       email: false,
//       profile_picture : 0,
//     });
//   }
//   const getUserInfo = async () => {
//     try {
//       const response = await fetch(
//         "https://www.googleapis.com/userinfo/v2/me",
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       const user = await response.json();
//       setUserInfo(user);
//     } catch (error) {
//       // Add your own error handler here
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//       <TouchableOpacity onPress={() => updateDB()}>
//         <Text>Sign In or Register With Google</Text>
//       </TouchableOpacity>
//       {/* <Button
//         title="Sign in with Google"
//         disabled={!request}
//         onPress={() => {
//           promptAsync();
//         }}
//       /> */}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
