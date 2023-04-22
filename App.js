import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import Providers from "./navigation/index";

// Import the functions you need from the SDKs you need
import { ThemeProvider } from 'react-native-elements';
import Login from './navigation/screens/Login.js';


export default function App() {
//   return (
//     <ThemeProvider>
//       <View style={styles.container}>
//       <StatusBar style="auto" />

//       <Text>Hello world!</Text>
//       <Login/>
//       </View>
//     </ThemeProvider>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   input: {
//     height: 40,
//     width: 200,
//     margin: 12,
//     borderWidth: 1,
//     padding: 10,
//   },
// });
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
