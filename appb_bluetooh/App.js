// @ts-nocheck
import React, { useState, useEffect } from "react";
import { View,Text, Button, FlatList, StyleSheet, PermissionsAndroid, Platform } from "react-native";
import { BleManager } from "react-native-ble-plx";

const manager = new BleManager();

function BleScannerComponent(){
  // Variavel de estado 'devices' guardara lista de dispositivos 
  const [devices, setDevices] = useState([]);

  // O estado radioPowerOn verifica se o blue está ligado (true) ou desligado (false)
  const [radioPowerOn, setRadioPowerOn] = useState(false);

  useEffect( () => {
    const subscription = manager.onStateChange((state)=>{
      if(state == "PoweOn"){
        setRadioPowerOn(true);
        subscription.remove();
      }
    }, true);
    return () =>{
      subscription.remove();
      manager.destroy();
    }
  },[])
  const requestBluetoothPermission = async () => {
    const apiLevel= parseInt(Platform.Version.toString(), 10);
    if (apiLevel < 31){
      const grant = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title:'Permissão de localização',
          message: 'O app precisa de acesso a sua localização parascannerar dispositivos bluetooth',
          buttonPositive: 'ok'
        },
      );
      return grant === PermissionsAndroid.RESULTS.GRANTED;
    }else{
      const result = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      ]);
      return(
        result[PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN] === PermissionsAndroid.RESULTS.GRANTED && 
        result[PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT] === PermissionsAndroid.RESULTS.GRANTED &&
        result[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] === PermissionsAndroid.RESULTS.GRANTED 
      );







    }
    return true;
  };


  const scanForDevices = async () =>{
    const hasPermission = await requestBluetoothPermission();
    if(!hasPermission){
      alert('permisão negada, o app não pode escanear dispositivos bluethooth')
      return;
    }
    if(!radioPowerOn){
      alert('por favor ligue o bluetooth para escanerar dispositivos')
      return;
    }
    setDevices([])
    manager.startDeviceScan(null, null,(error,device)=>{
      if(error){
        console.log('error: ', error)
        if(error.errorCode === 601){
          alert('verifique as conexões')
        }
        manager.stopDeviceScan();
      return;
      }
      if(device && device.name){
        setDevices(prevDevices =>{
          if(!prevDevices.some(d => d.id === device.id)){
            return [...prevDevices, device];
          }
          return prevDevices;
        });
      }
    });
    setTimeout(()=> {
      manager.stopDeviceScan()
    },5000)
  }

  
}export default BleScannerComponent;