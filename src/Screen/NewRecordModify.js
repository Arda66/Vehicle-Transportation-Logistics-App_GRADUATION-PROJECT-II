import {View, Text, StyleSheet, TextInput, Button} from 'react-native';
import React from 'react';
import {Formik} from 'formik';
import {Input, NativeBaseProvider} from 'native-base';

const NewRecordModify = ({navigation}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Formik
        initialValues={{
          Date: '',
          CustomerCode: '',
          Scrap: '',
          WaybillNo: '',
          WaybillDate: '',
          Exper: '',
          Situation: '',
          Plate: '',
          ContainerNo: '',
          InvoiceReferenceNo: '',
          Port: '',
          WeighingNo: '',
          Registrant: '',
          RegistrationDate: '',
        }}
        onSubmit={values => {
          console.log(values); // burada handle submit yani axios şeysini çağırcaz misal login kontrol yapan
        }}>
        {props => {
          <View>
            <Input
              type="" // tipleri buradan giriyoruz
              autoCapitalize="none"
              style={styles.Input}
              placeholder="Tarihi gir"
              placeholderTextColor="#ddd"
              onChangeText={props.handleChange('Date')}
              value={props.values.Date}
            />
            <Input
              autoCapitalize="none"
              style={styles.Input}
              placeholder="Musteri Kodu gir"
              placeholderTextColor="#ddd"
              onChangeText={props.handleChange('CustomerCode')}
              value={props.values.CustomerCode}
            />
            <Input
              autoCapitalize="none"
              style={styles.Input}
              placeholder="KabHurda gir"
              placeholderTextColor="#ddd"
              onChangeText={props.handleChange('Scrap')}
              value={props.values.Scrap}
            />
            <Input
              autoCapitalize="none"
              style={styles.Input}
              placeholder="Irsaliye Numarası gir"
              placeholderTextColor="#ddd"
              onChangeText={props.handleChange('WaybillNo')}
              value={props.values.WaybillNo}
            />
            <Input
              autoCapitalize="none"
              style={styles.Input}
              placeholder="Irsaliye Tarihi gir"
              placeholderTextColor="#ddd"
              onChangeText={props.handleChange('WaybillDate')}
              value={props.values.WaybillDate}
            />
            <Input
              autoCapitalize="none"
              style={styles.Input}
              placeholder="Exper gir"
              placeholderTextColor="#ddd"
              onChangeText={props.handleChange('Exper')}
              value={props.values.Exper}
            />
            <Input
              autoCapitalize="none"
              style={styles.Input}
              placeholder="Durum gir"
              placeholderTextColor="#ddd"
              onChangeText={props.handleChange('Situation')}
              value={props.values.Situation}
            />
            <Input
              autoCapitalize="none"
              style={styles.Input}
              placeholder="Plaka gir"
              placeholderTextColor="#ddd"
              onChangeText={props.handleChange('Plate')}
              value={props.values.Plate}
            />
            <Input
              autoCapitalize="none"
              style={styles.Input}
              placeholder="Konteyner Numarası gir"
              placeholderTextColor="#ddd"
              onChangeText={props.handleChange('ContainerNo')}
              value={props.values.ContainerNo}
            />
            <Input
              autoCapitalize="none"
              style={styles.Input}
              placeholder="FaturaReferans numarası gir"
              placeholderTextColor="#ddd"
              onChangeText={props.handleChange('InvoiceReferenceNo')}
              value={props.values.InvoiceReferenceNo}
            />
            <Input
              autoCapitalize="none"
              style={styles.Input}
              placeholder="Liman gir"
              placeholderTextColor="#ddd"
              onChangeText={props.handleChange('Port')}
              value={props.values.Port}
            />
            <Input
              autoCapitalize="none"
              style={styles.Input}
              placeholder="Tartim numarası gir"
              placeholderTextColor="#ddd"
              onChangeText={props.handleChange('WeighingNo')}
              value={props.values.WeighingNo}
            />
            <Input
              autoCapitalize="none"
              style={styles.Input}
              placeholder="KayitEden gir"
              placeholderTextColor="#ddd"
              onChangeText={props.handleChange('Registrant')}
              value={props.values.Registrant}
            />
            <Input
              autoCapitalize="none"
              style={styles.Input}
              placeholderTextColor="#ddd"
              placeholder="KayitTarihi gir"
              onChangeText={props.handleChange('RegistrationDate')}
              value={props.values.RegistrationDate}
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
              onPress={props.handleSubmit} //ONsubmit Fonksiyonunu Çağırır
            />
          </View>;
        }}
      </Formik>
    </View>
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
