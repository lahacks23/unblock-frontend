import { StatusBar } from 'expo-status-bar';
import { TextInput, StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import apiKeys from "./config/apiKeys";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = apiKeys.firebaseConfig

import { ThemeProvider } from 'react-native-elements';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

export default function App() {
  const updateDB = async () => {
    set(ref(db, 'users/123'), {
      email: false,
      profile_picture : 0,
    });
  }

  return (
    <ThemeProvider>
      <View style={styles.container}>
      <StatusBar style="auto" />
      <TouchableOpacity onPress={() => updateDB()}>
        <Text>UpdateDB</Text>
      </TouchableOpacity>

      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
