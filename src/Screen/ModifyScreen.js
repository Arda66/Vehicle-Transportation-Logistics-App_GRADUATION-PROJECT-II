import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  TextInput,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Formik} from 'formik';

const ModifyScreen = ({navigation}) => {
  const ModifyScreenPopUp = () => {
    // burdaki değeri index yap isim olarak güzel dursun en son.
    return (
      <HideKeyboard>
        <View style={{flex: 1}}>
          <Formik
            initialValues={{
              Company: ListItems[index_for_vehicle].Firma,
              LoginTime: ListItems[
                index_for_vehicle
              ].GirisZamani.toString().substring(0, 10),
              Plate: ListItems[index_for_vehicle].Plaka,
              Set3Value: ListItems[index_for_vehicle].Set3Deger,
              WeighingNo: ListItems[index_for_vehicle].TartimNo.toString(),
            }}
            onSubmit={values => {
              if (
                values.Company == ListItems[index_for_vehicle].Firma &&
                values.LoginTime ==
                  ListItems[index_for_vehicle].GirisZamani.toString().substring(
                    0,
                    10,
                  ) &&
                values.Plate == ListItems[index_for_vehicle].Plaka &&
                values.Set3Value == ListItems[index_for_vehicle].Set3Deger &&
                values.WeighingNo.toString() ==
                  ListItems[index_for_vehicle].TartimNo.toString()
              ) {
                notifyMessage('Hiçbir değişiklik yapmadınız!');
              } else {
                notifyMessage('Değerler başarıyla değiştirildi!');
                let Firma = values.Company;
                let GirisZamani = values.LoginTime;
                let Plaka = values.Plate;
                let Set3Deger = values.Set3Value;
                let TartimNo = values.WeighingNo.toString();

                let Array = {Firma, GirisZamani, Plaka, Set3Deger, TartimNo};
                if (index_for_vehicle != null) {
                  ListItems.splice(index_for_vehicle, 1, Array);
                }

                setTimeout(() => {
                  navigation.navigate('Vehicle Waiting For Unloading Screen');
                }, 1000);
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
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('DetailListScreen');
                  }}>
                  <View
                    style={{
                      padding: 8,
                      position: 'absolute',
                      borderRadius: 25,
                      borderWidth: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      left: '70%',
                      bottom: '45%',
                    }}>
                    <Text style={{fontSize: 20, color: 'black'}}>Detaylar</Text>
                  </View>
                </TouchableOpacity>
                <Text
                  style={{
                    alignSelf: 'center',
                    marginTop: 10,
                    marginBottom: 20,
                    fontSize: 25,
                    fontWeight: 'bold',
                    color: 'black',
                  }}>
                  Değerleri Düzenle
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
                  placeholder="Giriş  Zamanı gir"
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
                  placeholder="TartimNo  gir"
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
                <KeyboardAvoidingView>
                  <TouchableOpacity
                    onPress={() => {
                      Delete_With_Alert();
                    }}
                    style={{
                      position: 'absolute',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 50,
                      height: 50,
                      borderRadius: 10,
                      borderColor: 'maroon',
                      borderWidth: 1,
                      left: '44%',
                      marginTop: 20,
                      backgroundColor: 'maroon',
                    }}>
                    <Text style={{color: 'white'}}>SİL</Text>
                  </TouchableOpacity>
                </KeyboardAvoidingView>
              </View>
            )}
          </Formik>
        </View>
      </HideKeyboard>
    );
  };

  const Delete_With_Alert = () => {
    Alert.alert(
      'Seçtiğiniz araç bilgileriyle silinecektir.',
      'Silmek istediğinize emin misiniz ?',
      [
        {
          text: 'Hayır',
          onPress: () => {
            notifyMessage('Silme işlemi iptal edildi!');
          },
          style: 'cancel',
        },
        {
          text: 'Evet',
          onPress: () => {
            if (index_for_vehicle == ListItems.length - 1) {
              console.log(
                'Son eleman listItem üzerinden silindi! İndex değeri : ',
                index_for_vehicle,
              );
              // Son elemanı farklı şekilde sil  yoksa hata veriyor.
              index_for_vehicle -= 1;
              ListItems.splice(-1, 1);
              ImageList.splice(-1, 1);
              DetailList.splice(-1, 1);

              console.log(
                'Son elemanı ImageList ve DetailList üzerinden sildiniz!',
              );

              // Son elemanı silince  o index değeri yok oluyordu hata veriyordu bu şekilde çözdük.
            } else {
              ListItems.splice(index_for_vehicle, 1);
              ImageList.splice(index_for_vehicle, 1);
              DetailList.splice(index_for_vehicle, 1);
              console.log(index_for_vehicle, ' indexli numarayı sildiniz.');
            }
            notifyMessage('Araç başarıyla silindi!');
            console.log('ImageList : ', ImageList);
            console.log('DetailList :', DetailList);
            console.log('ListItem', ListItems);
            setTimeout(() => {
              navigation.navigate('Vehicle Waiting For Unloading Screen');
            }, 1000);
          },
        },
      ],
    );
  };

  return (
    <View style={{flex: 1}}>
      <ModifyScreenPopUp />
    </View>
  );
};
const styles = StyleSheet.create({
  Input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    marginVertical: 5,
  },
});

export default ModifyScreen;
