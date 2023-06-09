import React, { FC, useCallback } from "react";
import { FlatList, ListRenderItemInfo, Modal, SafeAreaView, Text, StyleSheet, TouchableOpacity, Button} from "react-native";
import styles from "../styles.js";
import { Device } from "react-native-ble-plx";
import { AuthContext } from "./AuthProvider.js";
import {useState, useContext } from "react";




type DeviceModalListItemProps = {
  item: ListRenderItemInfo<Device>;
  connectToPeripheral: (device: Device) => Promise<void>;
  closeModal: () => void;
};

type DeviceModalProps = {
  devices: Device[];
  visible: boolean;
  connectToPeripheral: (device: Device) => Promise<void>;
  closeModal: () => void;
};

const DeviceModalListItem: FC<DeviceModalListItemProps> = (props) => {
  const { item, connectToPeripheral, closeModal } = props;
  const connectAndCloseModal = useCallback(() => {
    connectToPeripheral(item.item).then(() => closeModal());
    //closeModal();
  }, [closeModal, connectToPeripheral, item.item]);

  return (
    <TouchableOpacity
      onPress={connectAndCloseModal}
      style={styles.modalButton}
    >
      <Text >{item.item.name}</Text>
    </TouchableOpacity>
  );
};

const DeviceModal: FC<DeviceModalProps> = (props) => {
  const { devices, visible, connectToPeripheral, closeModal } = props;
  
  const renderDeviceModalListItem = useCallback(
    (item: ListRenderItemInfo<Device>) => {
      return (
        <DeviceModalListItem
          item={item}
          connectToPeripheral={connectToPeripheral}
          closeModal={closeModal}
        />
      );
    },
    [closeModal, connectToPeripheral]
  );

  return (
    <Modal
      style={styles.modalContainer}
      animationType="slide"
      transparent={false}
      visible={visible}
    >
      <SafeAreaView style={styles.modalTitle}>
        <Text style={styles.modalTitleText}>
          Connect to a lock
        </Text>
        <FlatList
          contentContainerStyle={styles.modalFlatlistContiner}
          data={devices}
          renderItem={renderDeviceModalListItem}
        />
        <Button title="close modal" onPress={() =>closeModal()}></Button>
        
      </SafeAreaView>
    </Modal>
  );
};

const modalStyle = StyleSheet.create({
  
});

export default DeviceModal;

