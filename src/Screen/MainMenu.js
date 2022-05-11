import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  BackHandler,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RestService from '../../services/RestService';
const MainMenu = ({navigation, route}) => {
  const GetWaitingVehiclesFromAPI = () => {
    AsyncStorage.getItem('UserToken').then(value => {
      if (value != null) {
        RestService.GetWaitingVehicles(value).then(response => {
          global.ListItems = [];
          global.total_vehicle_number = Object.keys(response.data).length; // KAÇ TANE ARAÇ OLDUĞUNA BAKTIK YANİ JSON ARRAYI İÇİNDE KAÇ JSON OBJESİ VAR
          global.total_index_for_picturelist = total_vehicle_number - 1; // bu doğru çalışıyor toplamda kaç index varsa ekleyip çıkarınca değişiyor.
          for (let i = 0; i < total_vehicle_number; i++) {
            ListItems.push(response.data[i]);
          }
        });
      }
    });
  };
  useEffect(() => {
    GetWaitingVehiclesFromAPI();

    const backAction = () => {
      return true;
    };
    // headerleffunction();
    const backHandler = BackHandler.addEventListener(
      // Bu sadece Androidde geçerli
      'hardwareBackPress',
      backAction,
    );
    return () => {
      // headerleffunction();
      backHandler.remove();
    };
  }, []);
  const ExitwithAlertForButton = () => {
    Alert.alert(
      'Hesabınızdan çıkış yapılacaktır.',
      'Giriş Ekranına dönmek istediğinize emin misiniz?',
      [
        {
          text: 'Hayır',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'Evet',
          onPress: async () => {
            await AsyncStorage.removeItem('UserToken');
            await AsyncStorage.removeItem('VehicleItems');
            navigation.navigate('Login Screen');
          },
        },
      ],
    );
  };
  return (
    <View style={styles.Container}>
      <Text
        style={{
          fontWeight: 'bold',
          color: 'black',
          fontSize: 40,
          bottom: '90%',
          position: 'absolute',
        }}>
        Ana Menü
      </Text>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '35%',
        }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Vehicle Waiting For Unloading Screen')
          }
          style={styles.touchable}>
          <Text style={styles.text}>Boşaltma Bekleyen Araç Listesi</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Vehicle Waiting For Unloading Screen')
          }
          style={styles.touchable}>
          <Text style={styles.text}>Giriş Listesi</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => ExitwithAlertForButton()}
          style={[styles.touchable, styles.exitButton]}>
          <Text style={styles.text}>Çıkış Yap</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: 'black',
  },
  touchable: {
    margin: '7%',
    borderRadius: 25,
    borderWidth: 1,
    padding: 10,
    width: 300,
    maxWidth: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    top: '5%',
  },
  exitButton: {
    top: '40%',
  },
});

export default MainMenu;
