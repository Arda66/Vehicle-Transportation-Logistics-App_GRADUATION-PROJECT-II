import {View, Text, StyleSheet, Button, TextInput} from 'react-native';
import React, {useState} from 'react';
import {Formik} from 'formik';
import {StoreData} from './DataStore';

const NewRecordScreen = ({navigation}) => {
  const NewRecordPopUp = () => {
    return (
      <HideKeyboard>
        <View style={{flex: 1}}>
          <Formik
            initialValues={{
              Company: '',
              LoginTime: global_date.toISOString().substring(0, 10),
              Plate: '',
              Set3Value: '',
              WeighingNo: '',
            }}
            onSubmit={values => {
              if (
                values.Company == '' &&
                (values.LoginTime ==
                  global_date.toISOString().substring(0, 10) ||
                  values.LoginTime == '') &&
                values.Plate == '' &&
                values.Set3Value == '' &&
                values.WeighingNo == ''
              ) {
                notifyMessage('Boş liste eklenemez lütfen değerleri girin!');
              } else {
                let Firma = values.Company;
                let GirisZamani = values.LoginTime;
                let Plaka = values.Plate;
                let Set3Deger = values.Set3Value;
                let TartimNo = values.WeighingNo.toString();

                StoreData.ListItems.push({
                  Firma,
                  GirisZamani,
                  Plaka,
                  Set3Deger,
                  TartimNo,
                });
                ImageList.push([]);
                DetailList.push([]);
                notifyMessage('Yeni kayıt başarılı!');
                console.log('ImageList : ', ImageList);
                console.log('DetailList :', DetailList);
                setTimeout(() => {
                  navigation.navigate('Vehicle Waiting For Unloading Screen');
                }, 200);
              }
            }}>
            {({handleChange, handleSubmit, values}) => (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'stretch',
                  bottom: '1%',
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
                  color="black"
                  autoCapitalize="none"
                  style={styles.Input}
                  placeholder="Firma gir"
                  placeholderTextColor="#9791cc"
                  onChangeText={handleChange('Company')}
                  value={values.Company}
                />
                <TextInput
                  color="black"
                  autoCapitalize="none"
                  style={styles.Input}
                  placeholder="Giriş Zamanı gir"
                  placeholderTextColor="#9791cc"
                  onChangeText={handleChange('LoginTime')}
                  value={values.LoginTime}
                />
                <TextInput
                  color="black"
                  autoCapitalize="none"
                  style={styles.Input}
                  placeholder="Plaka gir"
                  placeholderTextColor="#9791cc"
                  onChangeText={handleChange('Plate')}
                  value={values.Plate}
                />
                <TextInput
                  color="black"
                  autoCapitalize="none"
                  style={styles.Input}
                  placeholder="Set3Değer gir"
                  placeholderTextColor="#9791cc"
                  onChangeText={handleChange('Set3Value')}
                  value={values.Set3Value}
                />
                <TextInput
                  color="black"
                  autoCapitalize="none"
                  style={styles.Input}
                  placeholder="TartimNo gir"
                  placeholderTextColor="#9791cc"
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
            )}
          </Formik>
        </View>
      </HideKeyboard>
    );
  };

  return (
    <View style={{flex: 1}}>
      <NewRecordPopUp />
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
  Input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    marginVertical: 5,
  },
});

export default NewRecordScreen;
