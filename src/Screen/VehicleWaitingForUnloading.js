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
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Formik} from 'formik';
import {NativeBaseProvider} from 'native-base';
const Vehicle_Waiting_For_Unloading = ({navigation}) => {
  const [NewRecordModalVisible, setNewRecordModalVisible] = useState(false);
  const [ModifyModalVisible, setModifyModalVisible] = useState(false);
  const [FlatlistRenderer, setFlatlistRenderer] = useState(false);
  const [index, setIndex] = useState(0);

  const ListItem = item => {
    // item.index şeklinde gönder oradan index = index yap
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={styles.container}>
          <View style={{flex: 1}}>
            <Text style={styles.ValuesOnScreen}>
              Firma : {item.Company} İndex:{item.index}
            </Text>
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
                onPress={() => {
                  setIndex(item.index);
                  console.log('Index : ', index);
                  setModifyModalVisible(true);
                }}
                style={styles.button}>
                <Text style={styles.text}>Düzelt</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setNewRecordModalVisible(true)}
                style={styles.button}>
                <Text style={styles.text}>Yeni Kayıt</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('Pictures Screen')}
                style={styles.button}>
                <Text style={styles.text}>Resimler</Text>
              </TouchableOpacity>
              <NewRecordPopUpModal />
              <ModifyPopUpModal />
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
        visible={NewRecordModalVisible}
        onRequestClose={() => {
          notifyMessage('Yeni kayıt işlemi iptal edildi!');
          setNewRecordModalVisible(false);
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
              // Buradaki şeyleri yoruma alsakta genede ekrandaki değerler gidiyor kaydetsekte iptalda etsek
              if (
                values.Company == '' &&
                values.LoginTime == '' &&
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
                ListItems.push({
                  Firma,
                  GirisZamani,
                  Plaka,
                  Set3Deger,
                  TartimNo,
                });
                setFlatlistRenderer(!FlatlistRenderer);
                setNewRecordModalVisible(false);
              }
            }}>
            {({handleChange, handleSubmit, values}) => (
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
                  placeholderTextColor="#9791cc"
                  onChangeText={handleChange('Company')}
                  value={values.Company}
                />
                <TextInput
                  autoCapitalize="none"
                  style={styles.Input}
                  placeholder="Giriş Zamanı gir"
                  placeholderTextColor="#9791cc"
                  onChangeText={handleChange('LoginTime')}
                  value={values.LoginTime}
                />
                <TextInput
                  autoCapitalize="none"
                  style={styles.Input}
                  placeholder="Plaka gir"
                  placeholderTextColor="#9791cc"
                  onChangeText={handleChange('Plate')}
                  value={values.Plate}
                />
                <TextInput
                  autoCapitalize="none"
                  style={styles.Input}
                  placeholder="Set3Değer gir"
                  placeholderTextColor="#9791cc"
                  onChangeText={handleChange('Set3Value')}
                  value={values.Set3Value}
                />
                <TextInput
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
      </Modal>
    );
  };
  const ModifyPopUpModal = () => {
    return (
      <Modal
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        animationType="fade"
        transparent={false}
        visible={ModifyModalVisible}
        onRequestClose={() => {
          notifyMessage('Düzenleme işlemi iptal edildi!');
          setModifyModalVisible(false);
        }}>
        <View style={{flex: 1}}>
          <Formik
            initialValues={{
              Company: ListItems[index].Firma, // Buralara oradaki değerleri koy null yerine çalışıoyr bu 0 yerine index yazıoz ama array başta boş olduğu için tanımıyor useeffect yüzünden
              LoginTime: ListItems[index].GirisZamani,
              Plate: ListItems[index].Plaka,
              Set3Value: ListItems[index].Set3Deger,
              WeighingNo: ListItems[index].TartimNo.toString(),
            }}
            onSubmit={values => {
              if (
                values.Company == ListItems[index].Firma &&
                values.LoginTime == ListItems[index].GirisZamani &&
                values.Plate == ListItems[index].Plaka &&
                values.Set3Value == ListItems[index].Set3Deger &&
                values.WeighingNo.toString() ==
                  ListItems[index].TartimNo.toString()
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
                if (index != null) {
                  ListItems.splice(index, 1, Array);
                } else console.log('Index is null !');
                setFlatlistRenderer(!FlatlistRenderer);
                setModifyModalVisible(false);
              }
            }}>
            {({handleChange, handleSubmit, values}) => (
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
                  Değerleri Düzenle
                </Text>
                <TextInput
                  // type="" // tipleri buradan giriyoruz
                  autoCapitalize="none"
                  style={styles.Input}
                  placeholder="Firma gir"
                  placeholderTextColor="#9791cc"
                  onChangeText={handleChange('Company')}
                  value={values.Company}
                />
                <TextInput
                  autoCapitalize="none"
                  style={styles.Input}
                  placeholder="Giriş  Zamanı gir"
                  placeholderTextColor="#9791cc"
                  onChangeText={handleChange('LoginTime')}
                  value={values.LoginTime}
                />
                <TextInput
                  autoCapitalize="none"
                  style={styles.Input}
                  placeholder="Plaka gir"
                  placeholderTextColor="#9791cc"
                  onChangeText={handleChange('Plate')}
                  value={values.Plate}
                />
                <TextInput
                  autoCapitalize="none"
                  style={styles.Input}
                  placeholder="Set3Değer gir"
                  placeholderTextColor="#9791cc"
                  onChangeText={handleChange('Set3Value')}
                  value={values.Set3Value}
                />
                <TextInput
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
                    top: '87%',
                    left: '45%',
                    backgroundColor: 'maroon',
                  }}>
                  <Text style={{color: 'white'}}>SİL</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </View>
      </Modal>
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
            if (index == ListItems.length - 1) {
              // Son elemanı farklı şekilde sil pop ile yoksa hata veriyor.
              console.log('Son elemanı sildiniz!');
               ListItems.pop();
               setIndex(0); // index değeri yok oluyordu bu şekilde çözdük.
            } else ListItems.splice(index, 1);

            notifyMessage('Başarıyla silindi!');
            setFlatlistRenderer(!FlatlistRenderer);
            setModifyModalVisible(false);
          },
        },
      ],
    );
  };
  return (
    <FlatList
      extraData={FlatlistRenderer}
      data={ListItems} // Program başlarken değer girdiğmiz için null kalıyor. useEffect güncelledikten sonra geliyor ctrl + s yapınca
      renderItem={({item, index}) => {
        return (
          <ListItem
            Company={item.Firma}
            LoginTime={item.GirisZamani}
            Plate={item.Plaka}
            Set3Deger={item.Set3Deger}
            WeighingNo={item.TartimNo}
            index={index}
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
    marginVertical: 5,
  },
});

export default Vehicle_Waiting_For_Unloading;
