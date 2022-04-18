import {View, Text, StyleSheet, TextInput, Button} from 'react-native';
import React from 'react';
import {Formik} from 'formik';
import {Input, NativeBaseProvider} from 'native-base';

const NewRecordModify = ({navigation}) => {
    return (
      <View>
        <Text>New Record</Text>
      </View>
      // <Modal
      //   style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
      //   animationType="fade"
      //   transparent={false}
      //   visible={ModalVisible}
      //   onRequestClose={() => {
      //     notifyMessage('Düzeltme işlemi iptal edildi!.');
      //     // values going to be null.
      //     setModalVisible(false);
      //   }}>
      //   <View style={{flex: 1}}>
      //     <Formik
      //       initialValues={{
      //         Company: '',
      //         LoginTime: '',
      //         Plate: '',
      //         Set3Value: '',
      //         WeighingNo: '',
      //       }}
      //       onSubmit={values => {
      //         let Firma = values.Company;
      //         let GirisZamani = values.LoginTime;
      //         let Plaka = values.Plate;
      //         let Set3Deger = values.Set3Value;
      //         let TartimNo = values.WeighingNo;

      //         // ListItems[0].Firma = values.Company;
      //         // console.log('Push öncesi LİSTİTEM : ', ListItems);
      //         ListItems.push({
      //           Firma,
      //           GirisZamani,
      //           Plaka,
      //           Set3Deger,
      //           TartimNo,
      //         });
      //         console.log('Push sonrası LİSTİTEM : ', ListItems);
      //         console.log(values);

      //         //  console.log(values.Company);
      //         setFlatlistRenderer(!FlatlistRenderer);
      //         setModalVisible(false);
      //         // burada handle submit yani axios şeysini çağırcaz misal login kontrol yapan(values.Company fln)
      //       }}>
      //       {({handleChange, handleSubmit, values}) => (
      //         <NativeBaseProvider>
      //           <View
      //             style={{
      //               flex: 1,
      //               justifyContent: 'center',
      //               alignItems: 'stretch',
      //             }}>
      //             <Text
      //               style={{
      //                 alignSelf: 'center',
      //                 marginTop: 20,
      //                 marginBottom: 50,
      //                 fontSize: 25,
      //                 fontWeight: 'bold',
      //                 color: 'black',
      //               }}>
      //               Değerleri Düzenleyin
      //             </Text>
      //             <Input
      //               type="" // tipleri buradan giriyoruz
      //               autoCapitalize="none"
      //               style={styles.Input}
      //               placeholder="Firma gir"
      //               placeholderTextColor="#ddd"
      //               onChangeText={handleChange('Company')}
      //               value={values.Company}
      //             />
      //             <Input
      //               autoCapitalize="none"
      //               style={styles.Input}
      //               placeholder="Giriş  Zamanı gir"
      //               placeholderTextColor="#ddd"
      //               onChangeText={handleChange('LoginTime')}
      //               value={values.LoginTime}
      //             />
      //             <Input
      //               autoCapitalize="none"
      //               style={styles.Input}
      //               placeholder="Plaka gir"
      //               placeholderTextColor="#ddd"
      //               onChangeText={handleChange('Plate')}
      //               value={values.Plate}
      //             />
      //             <Input
      //               autoCapitalize="none"
      //               style={styles.Input}
      //               placeholder="Set3Değer gir"
      //               placeholderTextColor="#ddd"
      //               onChangeText={handleChange('Set3Value')}
      //               value={values.Set3Value}
      //             />
      //             <Input
      //               autoCapitalize="none"
      //               style={styles.Input}
      //               placeholder="TartimNo  gir"
      //               placeholderTextColor="#ddd"
      //               onChangeText={handleChange('WeighingNo')}
      //               value={values.WeighingNo}
      //             />
      //             <Button
      //               block
      //               success
      //               style={{
      //                 borderRadius: 4,
      //                 elevation: 1,
      //                 marginHorizontal: 1,
      //                 marginTop: 10,
      //               }}
      //               title="Kaydet"
      //               color="maroon"
      //               onPress={handleSubmit} //ONsubmit Fonksiyonunu Çağırır
      //             />
      //           </View>
      //         </NativeBaseProvider>
      //       )}
      //     </Formik>
      //   </View>
      // </Modal>
    );
};

const styles = StyleSheet.create({
  Input: {
    height: 40,
    paddingHorizontal: 5,
    borderWidth: 2,
    borderRadius: 4,
    borderColor: '#f1f1f1',
    color: '#999',
    marginBottom: 8,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default NewRecordModify;
