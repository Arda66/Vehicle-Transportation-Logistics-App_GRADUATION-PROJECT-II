import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';


  const Vehicle_Waiting_For_Unloading = ({navigation}) => {
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
              Giriş Listesi {item.index}. Item
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                margin: 5,
              }}>
              <TouchableOpacity onPress={()=> navigation.navigate('NewRecord or Modify Screen')} style={styles.button}>
                <Text style={styles.text}>Düzelt</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> navigation.navigate('NewRecord or Modify Screen')} style={styles.button}>
                <Text style={styles.text}>Yeni Kayıt</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> navigation.navigate('Pictures Screen')} style={styles.button}>
                <Text style={styles.text}>Resim Ekle</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };
  return ( // BU FLATLİST OLACAK DAHA SONRA .  AMA ŞUAN İÇİN ARRAY OLUŞTURMADIM. BU DENEMELİK
    <ScrollView style={{flex: 1}}> 
      <ListItem index={'1'} />
      <ListItem index={'2'} />
      <ListItem index={'3'} />
      <ListItem index={'4'} />
      <ListItem index={'5'} />
      <ListItem index={'6'} />
      <ListItem index={'7'} />
      <ListItem index={'8'} />
      <ListItem index={'9'} />
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


export default Vehicle_Waiting_For_Unloading;
