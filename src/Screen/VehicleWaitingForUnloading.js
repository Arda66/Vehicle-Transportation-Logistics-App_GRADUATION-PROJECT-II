import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  Button,
  ToastAndroid,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import RestService from '../../services/RestService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Formik} from 'formik';
import {NativeBaseProvider} from 'native-base';
const Vehicle_Waiting_For_Unloading = ({navigation}) => {
  // var token = '';
  var total_vehicle_number = '';
  const [ModalVisible, setModalVisible] = useState(false);
  const [FlatlistRenderer, setFlatlistRenderer] = useState(false);
  const ListItems = [{}];
  useEffect(() => {
    UpdateVehicles();
  }, []);

  const UpdateVehicles = () => {
    AsyncStorage.getItem('UserToken').then(value => {
      if (value != null) {
        RestService.GetWaitingVehicles(value).then(response => {
          //  ListItems =  JSON.parse(response.data);
          // console.log(response.data.splice(0,5))
          // obj = JSON.parse(response.data);
          total_vehicle_number = Object.keys(response.data).length; // KAÇ TANE ARAÇ OLDUĞUNA BAKTIK YANİ JSON ARRAYI İÇİNDE KAÇ JSON OBJESİ VAR
          for (let i = 0; i < total_vehicle_number; i++) {
            // HERŞEYİ LİSTİTEM ARRAYINA ATTIK
            ListItems.push(response.data[i]);
          }
          console.log(ListItems);
          AsyncStorage.setItem('VehicleItems', JSON.stringify(ListItems));
          // AsyncStorage.setItem("VehicleList",ListItems);
          // AsyncStorage.
          // for (let i = 0; i < total_vehicle_number; i++) {
          //   // 21 araç var 0-20 ikiside dahil
          //   ListItems[i];
          // }
          //console.log(ListItems);
        });
      }
    });
  };
  const GetVehicles = () => {
    // Şuan çalışmıyor  bunu let listitems ile tanımlayıp değer atarsan renderdan önce çalışır
    AsyncStorage.getItem('VehicleItems').then(value => {
      ListItems = value;
      console.log('Listİtems : ', ListItems);
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
                  // () => setModalVisible(true)
                  navigation.navigate('NewRecord or Modify Screen')
                }
                style={styles.button}>
                <Text style={styles.text}>Düzelt</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={
                  () => setModalVisible(true)
                  // navigation.navigate('NewRecord or Modify Screen')
                }
                style={styles.button}>
                <Text style={styles.text}>Yeni Kayıt</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('Pictures Screen')}
                style={styles.button}>
                <Text style={styles.text}>Resimler</Text>
              </TouchableOpacity>
              <NewRecordPopUpModal />
            </View>
          </View>
        </View>
      </View>
    );
  };
  const notifyMessage = msg => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      AlertIOS.alert(msg);
    }
  };
  const NewRecordPopUpModal = () => {
    return (
      <Modal
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        animationType="fade"
        transparent={false}
        visible={ModalVisible}
        onRequestClose={() => {
          notifyMessage('Yeni kayıt işlemi iptal edildi!.');
          setModalVisible(false);
        }}>
        <View style={{flex: 1}}>
          <Formik
            initialValues={{
              Company: '',
              LoginTime: '',
              Plate: '',
              Set3Value: '',
              WeighingNo: '',
            }}
            onSubmit={values => {
              let Firma = values.Company;
              let GirisZamani = values.LoginTime;
              let Plaka = values.Plate;
              let Set3Deger = values.Set3Value;
              let TartimNo = values.WeighingNo;
              ListItems.push({
                Firma,
                GirisZamani,
                Plaka,
                Set3Deger,
                TartimNo,
              });
              console.log('Push sonrası LİSTİTEM : ', ListItems);
              console.log(values);

              setFlatlistRenderer(!FlatlistRenderer);
              setModalVisible(false);
              // burada handle submit yani axios şeysini çağırcaz misal login kontrol yapan(values.Company fln)
            }}>
            {({handleChange, handleSubmit, values}) => (
              <NativeBaseProvider>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'stretch',
                  }}>
                  <Text
                    style={{
                      alignSelf: 'center',
                      marginTop: 20,
                      marginBottom: 50,
                      fontSize: 25,
                      fontWeight: 'bold',
                      color: 'black',
                    }}>
                    Yeni kayıt ekleme
                  </Text>
                  <TextInput
                    type="" // tipleri buradan giriyoruz
                    autoCapitalize="none"
                    style={styles.Input}
                    placeholder="Firma gir"
                    placeholderTextColor="#ddd"
                    onChangeText={handleChange('Company')}
                    value={values.Company}
                  />
                  <TextInput
                    autoCapitalize="none"
                    style={styles.Input}
                    placeholder="Giriş  Zamanı gir"
                    placeholderTextColor="#ddd"
                    onChangeText={handleChange('LoginTime')}
                    value={values.LoginTime}
                  />
                  <TextInput
                    autoCapitalize="none"
                    style={styles.Input}
                    placeholder="Plaka gir"
                    placeholderTextColor="#ddd"
                    onChangeText={handleChange('Plate')}
                    value={values.Plate}
                  />
                  <TextInput
                    autoCapitalize="none"
                    style={styles.Input}
                    placeholder="Set3Değer gir"
                    placeholderTextColor="#ddd"
                    onChangeText={handleChange('Set3Value')}
                    value={values.Set3Value}
                  />
                  <TextInput
                    autoCapitalize="none"
                    style={styles.Input}
                    placeholder="TartimNo  gir"
                    placeholderTextColor="#ddd"
                    onChangeText={handleChange('WeighingNo')}
                    value={values.WeighingNo}
                  />
                  <Button
                    block
                    success
                    style={{
                      borderRadius: 4,
                      elevation: 1,
                      marginHorizontal: 1,
                      marginTop: 10,
                    }}
                    title="Kaydet"
                    color="maroon"
                    onPress={handleSubmit} //ONsubmit Fonksiyonunu Çağırır
                  />
                </View>
              </NativeBaseProvider>
            )}
          </Formik>
        </View>
      </Modal>
    );
  };

  return (
    <FlatList
      extraData={FlatlistRenderer}
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
  Input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
  },
});

export default Vehicle_Waiting_For_Unloading;
