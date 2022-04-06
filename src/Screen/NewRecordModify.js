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
          KabHurda: '',
          IrsaliyeNo: '',
          IrsaliyeTarihi: '',
          Exper: '',
          Durum: '',
          Plaka: '',
          KonteynerNo: '',
          FaturaReferansNo: '',
          Liman: '',
          TartimNo: '',
          KayitEden: '',
          KayitTarihi: '',
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
              onChangeText={props.handleChange('Tarih')}
              value={props.values.Date}
            />
            <Input
              autoCapitalize="none"
              style={styles.Input}
              placeholder="MusteriKodu gir"
              placeholderTextColor="#ddd"
              onChangeText={props.handleChange('MusteriKodu')}
              value={props.values.CustomerCode}
            />
            <Input
              autoCapitalize="none"
              style={styles.Input}
              placeholder="KabHurda gir"
              placeholderTextColor="#ddd"
              onChangeText={props.handleChange('KabHurda')}
              value={props.values.KabHurda}
            />
            <Input
              autoCapitalize="none"
              style={styles.Input}
              placeholder="IrsaliyeNo gir"
              placeholderTextColor="#ddd"
              onChangeText={props.handleChange('IrsaliyeNo')}
              value={props.values.IrsaliyeNo}
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
              onChangeText={props.handleChange('Durum')}
              value={props.values.Durum}
            />
            <Input
              autoCapitalize="none"
              style={styles.Input}
              placeholder="Plaka gir"
              placeholderTextColor="#ddd"
              onChangeText={props.handleChange('Plaka')}
              value={props.values.Plaka}
            />
            <Input
              autoCapitalize="none"
              style={styles.Input}
              placeholder="KonteynerNo gir"
              placeholderTextColor="#ddd"
              onChangeText={props.handleChange('KonteynerNo')}
              value={props.values.KonteynerNo}
            />
            <Input
              autoCapitalize="none"
              style={styles.Input}
              placeholder="FaturaReferansNo gir"
              placeholderTextColor="#ddd"
              onChangeText={props.handleChange('FaturaReferansNo')}
              value={props.values.FaturaReferansNo}
            />
            <Input
              autoCapitalize="none"
              style={styles.Input}
              placeholder="Liman gir"
              placeholderTextColor="#ddd"
              onChangeText={props.handleChange('Liman')}
              value={props.values.Liman}
            />
            <Input
              autoCapitalize="none"
              style={styles.Input}
              placeholder="TartimNo gir"
              placeholderTextColor="#ddd"
              onChangeText={props.handleChange('TartimNo')}
              value={props.values.TartimNo}
            />
            <Input
              autoCapitalize="none"
              style={styles.Input}
              placeholder="KayitEden gir"
              placeholderTextColor="#ddd"
              onChangeText={props.handleChange('KayitEden')}
              value={props.values.KayitEden}
            />
            <Input
              autoCapitalize="none"
              style={styles.Input}
              placeholderTextColor="#ddd"
              placeholder="KayitTarihi gir"
              onChangeText={props.handleChange('KayitTarihi')}
              value={props.values.KayitTarihi}
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
