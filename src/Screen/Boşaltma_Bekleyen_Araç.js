import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';


  const Boşaltma_Bekleyen_Araç = ({navigation}) => {
  const GirişListeItem = item => {
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
              Giriş Listesi {item.index}. Item
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                margin: 5,
              }}>
              <TouchableOpacity onPress={()=> navigation.navigate('Yeni kayıt veya düzenle Ekranı')} style={styles.button}>
                <Text style={styles.text}>Düzelt</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> navigation.navigate('Yeni kayıt veya düzenle Ekranı')} style={styles.button}>
                <Text style={styles.text}>Yeni Kayıt</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> navigation.navigate('Resimler Ekranı')} style={styles.button}>
                <Text style={styles.text}>Resim Ekle</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };
  return (
    <ScrollView style={{flex: 1}}>
      <GirişListeItem index={'1'} />
      <GirişListeItem index={'2'} />
      <GirişListeItem index={'3'} />
      <GirişListeItem index={'4'} />
      <GirişListeItem index={'5'} />
      <GirişListeItem index={'6'} />
      <GirişListeItem index={'7'} />
      <GirişListeItem index={'8'} />
    </ScrollView>
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
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    width: '85%',
    height: '80%',
    marginVertical: '20%',
  },
});


export default Boşaltma_Bekleyen_Araç;
