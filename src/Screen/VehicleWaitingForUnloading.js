import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import RestService from '../../services/RestService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Vehicle_Waiting_For_Unloading = ({navigation}) => {
  var token = '';
  var total_vehicle_number = '';
  const ListItems = [{}];

  // const [FlatListRefresher, setFlatListRefresher] = useState(false);

  useEffect(() => {
    UpdateVehicles();
  }, []);

  const UpdateVehicles = () => {
    AsyncStorage.getItem('UserToken').then(value => {
      // Tokeni daha iyi çekebiliriz şuan için deneme amaçlı
      if (value != null) {
        token = value;
        RestService.GetWaitingVehicles(token).then(response => {
          //  ListItems =  JSON.parse(response.data);
          // console.log(response.data.splice(0,5))
          // obj = JSON.parse(response.data);
          total_vehicle_number = Object.keys(response.data).length; // KAÇ TANE ARAÇ OLDUĞUNA BAKTIK YANİ JSON ARRAYI İÇİNDE KAÇ JSON OBJESİ VAR
          for (let i = 0; i < total_vehicle_number; i++) {
            // HERŞEYİ LİSTİTEM ARRAYINA ATTIK
            ListItems.push(response.data[i]);
          }
          AsyncStorage.setItem('VehicleItems', JSON.stringify(ListItems));
          // AsyncStorage.setItem("VehicleList",ListItems);
          // AsyncStorage.
          // for (let i = 0; i < total_vehicle_number; i++) {
          //   // 21 araç var 0-20 ikiside dahil
          //   ListItems[i];
          // }
          console.log(ListItems);
        });
      }
    });
  };

  const ListItem = item => {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={styles.container}>
          <View style={{flex: 1}}>
            <Text style={styles.ValuesOnScreen}>Firma : {item.Company}</Text>
            <Text style={styles.ValuesOnScreen}>
              Giriş zamanı : {item.LoginTime}
            </Text>
            <Text style={styles.ValuesOnScreen}>Plaka : {item.Plate}</Text>
            <Text style={styles.ValuesOnScreen}>
              Set3Deger : {item.Set3Deger}
            </Text>
            <Text style={styles.ValuesOnScreen}>
              Tartim No : {item.WeighingNo}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                margin: 5,
              }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('NewRecord or Modify Screen')
                }
                style={styles.button}>
                <Text style={styles.text}>Düzelt</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('NewRecord or Modify Screen')
                }
                style={styles.button}>
                <Text style={styles.text}>Yeni Kayıt</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('Pictures Screen')}
                style={styles.button}>
                <Text style={styles.text}>Resimler</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={{flex:1}}>
      <FlatList
        // extraData={FlatListRefresher}
        data={ListItems} // Program başlarken değer girdiğmiz için null kalıyor. useEffect güncelledikten sonra geliyor ctrl + s yapınca
        renderItem={({item}) => {
          return (
            <ListItem
              Company={item.Firma}
              LoginTime={item.GirisZamani}
              Plate={item.Plaka}
              Set3Deger={item.Set3Deger}
              WeighingNo={item.TartimNo}
            />
          );
        }}
      />
      
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    color: 'black',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 20,
    width: 90,
    height: 40,
    marginHorizontal: 10,
  },
  container: {
    top: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    width: '87%',
    height: '95%',
    marginVertical: '25%',
  },
  ValuesOnScreen: {
    fontWeight: 'bold',
    color: 'black',
    top: 10,
    flex: 1,
    left: 10,
  },
});

export default Vehicle_Waiting_For_Unloading;
