import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthProvider";
import styles from "../../styles.js";
import { Text, View, Button, Image } from "react-native";
import ble from "../../bluetooth/ble_process";
import DeviceModal from "../DeviceConnectionModal";
import base64 from 'react-native-base64';



const BACKEND_URL = "http://ec2-54-177-39-50.us-west-1.compute.amazonaws.com:3000/";
export default function HomeScreen() {
  const { user, logout } = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false); 
  const [press, setPress] = useState(false);

  useEffect(() => {
    setUserName(user.displayName);
    setProfilePic(user.photoURL);
  }, []); //ComponentDidMount

  useEffect(() => {
    async function myfn(){
      if(press && connectedDevice){
        console.log("testt2")
        //unlock uid requestid
        //response: unlock_ack uid requestid lid nonce
        console.log(allDevices[0]?.id)
        resp = await handShake(allDevices[0]?.id)
        setPress(false)
        

        
      }
      else {
        console.log("didn't enter?")
        console.log(connectedDevice)
        console.log(press)
      }
      
    }
    
    myfn();
    
  }, [press, connectedDevice])
  const {
    requestPermissions,
    scanForPeripherals,
    allDevices,
    connectToDevice,
    connectedDevice,
    disconnectFromDevice,
    handShake
  } = ble()
  const pressed = () => {
    console.log("testtttt")
    setPress(true);
  }
  const scanForDevices = async () => {
    const isPermissionsEnabled = await requestPermissions();
    if (isPermissionsEnabled) {
      console.log("has permissions!")
      scanForPeripherals();
    }
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  const openModal = async () => {
    await scanForDevices();
    setIsModalVisible(true);
  };

  const logout_exit = () => {
    disconnectFromDevice();
    logout();
  }

  return (
    <View style={styles.container}>
      <Text>Welcome {userName}</Text>
      <Button
        onPress={connectedDevice ? disconnectFromDevice : openModal}
        title = {connectedDevice ? "Disconnect" : "Connect"}
      >
        
      </Button>
      <Button onPress = {() => handShake(allDevices[0]?.id)} title="test"></Button>
      <Button onPress={logout_exit} title="Log Out" />
      
      <DeviceModal
        closeModal={hideModal}
        visible={isModalVisible}
        connectToPeripheral={connectToDevice}
        devices={allDevices}
      />
    </View>
  );
}
