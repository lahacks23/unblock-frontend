import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import Providers from "./navigation/index";

// Import the functions you need from the SDKs you need
import { ThemeProvider } from 'react-native-elements';
import Login from './navigation/screens/Login.js';


export default function App() {
  return <Providers />;
}
