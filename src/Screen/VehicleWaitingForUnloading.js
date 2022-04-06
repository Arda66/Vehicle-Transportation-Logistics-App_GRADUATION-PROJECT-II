import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import RestService from '../../services/RestService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Vehicle_Waiting_For_Unloading = ({navigation}) => {
  var token = '';
  var total_vehicle_number = '';
  const ListItems = [{}];
  const [FlatListRefresher, setFlatListRefresher] = useState(false);

  useEffect(() => {
    GetWaitingVehicles();
  }, []);

  const GetWaitingVehicles = () => {
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
          // for (let i = 0; i < total_vehicle_number; i++) {
          //   // 21 araç var 0-20 ikiside dahil
          //   ListItems[i];
          // }
          // console.log(ListItems);
        });
      }
    });
  };

  const ListItem = item => {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={styles.container}>
          <View style={{flex: 1}}>
            <Text
              style={{
                fontWeight: 'bold',
                color: 'black',
                top: 10,
                flex: 1,
                left: 10,
              }}>
              Firma : {item.Firma}
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
                color: 'black',
                top: 10,
                flex: 1,
                left: 10,
              }}>
              Giriş zamanı : {item.GirisZamani}
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
                color: 'black',
                top: 10,
                flex: 1,
                left: 10,
              }}>
              Plaka : {item.Plaka}
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
                color: 'black',
                top: 10,
                flex: 1,
                left: 10,
              }}>
              Set3Deger : {item.Set3Deger}
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
                color: 'black',
                top: 10,
                flex: 1,
                left: 10,
              }}>
              Tartim No : {item.TartimNo}
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
    <FlatList
       extraData={(FlatListRefresher)}
      data={ListItems}
      renderItem={({item}) => {
        return (
          <ListItem
            Firma={item.Firma}
            GirisZamani={item.GirisZamani}
            Plaka={item.Plaka}
            Set3Deger={item.Set3Deger}
            TartimNo={item.TartimNo}
          />
        );
      }}
    />
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
});

export default Vehicle_Waiting_For_Unloading;
