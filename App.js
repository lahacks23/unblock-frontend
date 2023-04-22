import { StatusBar } from 'expo-status-bar';
import { TextInput, StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';

// Import the functions you need from the SDKs you need
import { ThemeProvider } from 'react-native-elements';
import Login from './navigation/screens/Login.js';


export default function App() {
  return (
    <ThemeProvider>
      <View style={styles.container}>
      <StatusBar style="auto" />

      <Text>Hello world!</Text>
      <Login/>
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
