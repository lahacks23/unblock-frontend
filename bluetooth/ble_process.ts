import { useMemo, useState } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import base64 from 'react-native-base64';
import {
  BleError,
  BleManager,
  Characteristic,
  Device,
  UUID
} from "react-native-ble-plx";
//import UUID from "uuid";
import * as ExpoDevice from "expo-device";
import { initializeApp } from "firebase/app";
import apiKeys from "../config/apiKeys";
const firebaseConfig = apiKeys.firebaseConfig
import { getAuth} from 'firebase/auth';
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

interface BluetoothLowEnergyApi {
  requestPermissions(): Promise<boolean>;
  scanForPeripherals(): void;
  connectToDevice: (deviceId: Device) => Promise<void>;
  disconnectFromDevice: () => void;
  connectedDevice: Device | null;
  allDevices: Device[];
  handShake: (device_id : UUID) => Promise<Characteristic>;
}
const BACKEND_URL = "http://ec2-54-177-39-50.us-west-1.compute.amazonaws.com:3000/";


async function processLockResponse (userToken, lockRequest, lockResponse) {
  console.log(lockRequest, lockRequest);
  if (!(
      lockRequest.uid === lockResponse.uid &&
      lockRequest.lid === lockResponse.lid &&
      lockRequest.rid === lockResponse.rid &&
      lockRequest.type === lockResponse.type &&
      lockResponse.nonce
  )) {
      return; // Drop bad lock response
  }

  const response = await fetch(BACKEND_URL + "sign", {
      method: "POST",
      headers: {
          'Content-Type': "application/json",
          "Authorization": `Bearer ${userToken}`
      },
      body: JSON.stringify(lockResponse)
  });

  const body = await response.json();
  return body;
}

export default function ble(): BluetoothLowEnergyApi {
  const bleManager = useMemo(() => new BleManager(), []);
  const [allDevices, setAllDevices] = useState<Device[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);
  const [heartRate, setHeartRate] = useState<number>(0);

  const requestAndroid31Permissions = async () => {
    const bluetoothScanPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      {
        title: "Location Permission",
        message: "Bluetooth Low Energy requires Location",
        buttonPositive: "OK",
      }
    );
    const bluetoothConnectPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      {
        title: "Location Permission",
        message: "Bluetooth Low Energy requires Location",
        buttonPositive: "OK",
      }
    );
    const fineLocationPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Location Permission",
        message: "Bluetooth Low Energy requires Location",
        buttonPositive: "OK",
      }
    );

    return (
      bluetoothScanPermission === "granted" &&
      bluetoothConnectPermission === "granted" &&
      fineLocationPermission === "granted"
    );
  };

  const requestPermissions = async () => {
    if (Platform.OS === "android") {
      if ((ExpoDevice.platformApiLevel ?? -1) < 31) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message: "Bluetooth Low Energy requires Location",
            buttonPositive: "OK",
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        const isAndroid31PermissionsGranted =
          await requestAndroid31Permissions();

        return isAndroid31PermissionsGranted;
      }
    } else {
      return true;
    }
  };

  const isDuplicteDevice = (devices: Device[], nextDevice: Device) =>
    devices.findIndex((device) => nextDevice.id === device.id) > -1;

  const scanForPeripherals = () =>
    bleManager.startDeviceScan(null, null, (error, device) => {
      
      if (error) {
        console.log(error);
      }
      if (device && device.name?.includes("unblock-lock")  ) {
        setAllDevices((prevState: Device[]) => {
          if (!isDuplicteDevice(prevState, device)) {
            return [...prevState, device];
          }
          return prevState;
        });
      }
    });

  const connectToDevice = async (device: Device) => {
    try {
      bleManager.stopDeviceScan();
      const deviceConnection = await device.connect();
      setConnectedDevice(deviceConnection);
      
      await deviceConnection.discoverAllServicesAndCharacteristics();
      
      
    } catch (e) {
      console.log("FAILED TO CONNECT", e);
    }
  };

  const disconnectFromDevice = () => {
    if (connectedDevice) {
      bleManager.cancelDeviceConnection(connectedDevice.id);
      setConnectedDevice(null);
      setHeartRate(0);
    }
  };

  const handShake = async (device_id : UUID) => {
    console.log("testing12233 ");
    console.log("DEVICE ID");
    console.log(device_id);
    const res : Characteristic = await bleManager.writeCharacteristicWithResponseForDevice(device_id, "BAAD", "F00D", base64.encode("UNLOCK "+auth.currentUser?.uid + " 1" ),)
    console.log("testing12233123123")
    console.log("res:" + base64.decode( res && res.value ? res.value : ""));
    const resp1 = await bleManager.readCharacteristicForDevice(allDevices[0].id, "BAAD", "F00D", )
    console.log(base64.decode(resp1.value ? resp1.value : ""))


    const resp_split = (base64.decode(resp1.value ? resp1.value : "")).trim().split(/(\s+)/);
    console.log(resp_split)
    const resp_uid = resp_split[2]
    const resp_requestid = resp_split[4]
    const resp_lid = resp_split[6]
    const resp_nonce = resp_split[8]

    

    
    const response_body = {
      "lid": resp_lid,
    "nonce": resp_nonce,
    "rid": resp_requestid,
    "type": "UNLOCK",
    "uid": resp_uid,
    }
    console.log(response_body)
    const response = await fetch(BACKEND_URL + "sign", {
      method: "POST",
      headers: {
          'Content-Type': "application/json",
          "Authorization": `Bearer `+ await auth.currentUser?.getIdToken(),
      },
      body: JSON.stringify(response_body)
    });
    
    const body = await response.json();
    var string_body = JSON.stringify(body)
    console.log(JSON.stringify(body))
    console.log("testttttt")
    while (string_body.length > 50){
      await bleManager.writeCharacteristicWithResponseForDevice(device_id, "BAAD", "F00D", base64.encode("S "+ string_body.substring(0,50)),)
      string_body = string_body.substring(50)
    }

    
    const res2 = await bleManager.writeCharacteristicWithResponseForDevice(device_id, "BAAD", "F00D", base64.encode("F "+ string_body.substring(0,string_body.length)),)
    
    return res2;
  }

  

  

  return {
    scanForPeripherals,
    requestPermissions,
    connectToDevice,
    allDevices,
    connectedDevice,
    disconnectFromDevice,
    handShake
  };
}

