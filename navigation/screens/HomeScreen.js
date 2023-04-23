import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthProvider";
import styles from "../../styles.js";
import { processLockResponse } from "../../unblock/index";
import { Text, View, Image, FlatList, StyleSheet, Pressable } from "react-native";
import Button from './Button.js'
import Lock from "./Lock";

const styles2 = StyleSheet.create({
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    marginTop: 10,
    borderRadius: 5,
    borderColor: "gray",
    borderWidth: 1,
    // color: "white",
  },
  list: {
    width: 300,
    // backgroundColor: "#131C47",
  },
});

import { Text, View, Button, Image } from "react-native";
import ble from "../../bluetooth/ble_process";
import DeviceModal from "../DeviceConnectionModal";
import base64 from 'react-native-base64';



const BACKEND_URL = "http://ec2-54-177-39-50.us-west-1.compute.amazonaws.com:3000/";
export default function HomeScreen() {
  const { user } = useContext(AuthContext);
  const [lockNum, setLockNum] = useState("");
  const [userName, setUserName] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const data = [
    {key: 'Device Title'},
    {key: 'Dan'},
    {key: 'Dominic'},
    {key: 'Jackson'},
    {key: 'James'},
    {key: 'Joel'},
    {key: 'John'},
    {key: 'Jillian'},
    {key: 'Jimmy'},
    {key: 'Julie'},
  ]
  
  const updateSelection = () => {
    console.log("lock selected!")
    setLockNum("Bob")
  }
  const [isModalVisible, setIsModalVisible] = useState(false); 
  const [press, setPress] = useState(false);

  useEffect(() => {
    user.getIdToken().then(async (token) => {
      console.log(token);
      const request = {
        uid: user.uid,
        rid: 123,
        lid: "lock1",
        type: "open"
      };
      console.log(await processLockResponse(token, request, {nonce:111, ...request}));
    });
    setUserName(user.displayName);
    setProfilePic(user.photoURL);
  }, []); //ComponentDidMount
  useEffect(() => {
    async function myfn(){
      if(press && connectedDevice){
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

  const listItem = (item) => 
    <View style={styles.hcontainer}>
      <Image 
        style={styles.lockImg}
        source={{uri: 'https://cdn-icons-png.flaticon.com/512/61/61457.png'}}
      />
      <View style={styles.container}>
        <Text style={styles.colorText}>Lock 1</Text>
        {/* <Text style={styles2.item}>{item.key}</Text> */}
        <Text>{item.key}</Text>
        <Button title="Request Access" onPress={updateSelection} />
        <View
        style={{
          borderBottomColor: 'grey',
          borderBottomWidth: 1,
          marginLeft: 5,
          marginRight: 5,
          marginTop: 10,
          width: 343,
        }}
      />
      </View>
    </View>
  return (
    <View style={styles.container}>
      {lockNum ? 
        <View style={styles.container}>
          <Button title="Back" onPress={() => setLockNum("")}
          />
          <Lock />
        </View> : 
        <View style={styles.container}>
          <Text style={styles.titleText}>Welcome {userName}</Text>
          <Text style={styles.colorText}>Nearby Devices</Text>
          <FlatList
            style={styles2.list}
            data={data}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => listItem(item)}
          />
          <View style={styles.container}>
      
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
        </View>
      }
      {/* <Image style={styles.profileImage} source={{ uri: profilePic }} /> */}
      </View>
  
  
    
  );
}