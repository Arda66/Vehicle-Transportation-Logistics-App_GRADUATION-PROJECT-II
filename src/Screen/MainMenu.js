import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';

const MainMenu = ({navigation}) => {
  return (
    <View style={styles.Container}>
      <View style={styles.Container}>
        <Text
          style={{
            fontWeight: 'bold',
            color: 'black',
            fontSize: 40,
            bottom: '90%',
            position: 'absolute',
          }}>
          Ana Ekran
        </Text>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '35%',
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Boşaltma Bekleyen Araç Ekranı')}
            style={styles.touchable}>
            <Text style={styles.text}>Boşalta Bekleyen Araç Listesi</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Yeni kayıt veya düzenle Ekranı')
            }
            style={styles.touchable}>
            <Text style={styles.text}>Giriş Listesi</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: 'black',
  },
  touchable: {
    margin: '7%',
    borderRadius: 25,
    borderWidth: 1,
    padding: 10,
    width: 300,
    maxWidth: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MainMenu;
