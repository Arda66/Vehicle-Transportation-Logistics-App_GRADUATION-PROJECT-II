import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  BackHandler,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {useRoute} from '@react-navigation/native';
const MainMenu = ({navigation, route}) => {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  // const route = useRoute();

  // const getData = () => {    // KULLANICI ADI VE ŞİFRE DEĞERLERİNİ EKRANA BASTIRMAK İÇİN BURAYA GÖNDERDİK (İSTEĞE BAĞLI)
  //   try {
  //     AsyncStorage.getItem('UserData').then(value => {
  //       if (value != null) {
  //         let user = JSON.parse(value);
  //         setUsername(user.Username);
  //         setPassword(user.Password);
  //       }
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    // getData();
    // const headerleffunction = () => {
    //   // SOL ÜSTTEKİ GERİ TUŞUNA BASINCA NE YAPSIN!
    //   navigation.setOptions({
    //     headerLeft: () => (
    //       //   // <TouchableOpacity
    //       //   //   onPress={() =>
    //       //   //     Alert.alert(
    //       //   //       'Hesabınızdan çıkış yapılacaktır.',
    //       //   //       'Giriş Ekranına dönmek istediğinize emin misiniz?',
    //       //   //       [
    //       //   //         {
    //       //   //           text: 'Hayır',
    //       //   //           onPress: () => null,
    //       //   //           style: 'cancel',
    //       //   //         },
    //       //   //         {
    //       //   //           text: 'Evet',
    //       //   //           onPress: () => navigation.navigate('Giriş Ekranı'),
    //       //   //         },
    //       //   //       ],
    //       //   //     )
    //       //   //   }>
    //       //   //   <Image
    //       //   //     style={{width: 25, height: 20, marginRight: 15}}
    //       //   //     source={require('../Resim/left_arrow.png')}
    //       //   //   />
    //       //   // </TouchableOpacity>
    //     ),
    //   });
    // };
    const backAction = () => {
      // SADECE BU SAYFADA GERİ YAPINCA UYARSIN HER SAYFADA UYARIYOR
      // Alert.alert(
      //   'Hesabınızdan çıkış yapılacaktır.',
      //   'Giriş Ekranına dönmek istediğinize emin misiniz?',
      //   [
      //     {
      //       text: 'Hayır',
      //       onPress: () => console.log(route.name),
      //       style: 'cancel',
      //     },
      //     {text: 'Evet', onPress: () => {
      //       if(route.name == "Main Menu Screen") // Her Sayfayı Main Menu Screen olarak görüyor
      //       navigation.navigate('Login Screen')}}, // Parametre ile tokenvalue : null diye geri gönder ana ekrana
      //   ],
      // );
      return true;
    };

    // headerleffunction();
    const backHandler = BackHandler.addEventListener(
      // Bu sadece Androidde geçerli
      'hardwareBackPress',
      backAction,
    );

    return () => {
      // headerleffunction();
      backHandler.remove();
    };
  }, []);
  const ExitwithAlertForButton = () => {
    Alert.alert(
      'Hesabınızdan çıkış yapılacaktır.',
      'Giriş Ekranına dönmek istediğinize emin misiniz?',
      [
        {
          text: 'Hayır',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'Evet',
          onPress: () => {
            // AsyncStorage.removeItem('UserToken');
            navigation.navigate('Login Screen'); //LOGİN SUCCESS DEĞERİ FALSE OLMALI
          },
        },
      ],
    );
  };

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
          Ana Menü
        </Text>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '35%',
          }}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Vehicle Waiting For Unloading Screen')
            }
            style={styles.touchable}>
            <Text style={styles.text}>Boşalta Bekleyen Araç Listesi</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('LoginList Screen')}
            style={styles.touchable}>
            <Text style={styles.text}>Giriş Listesi</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => ExitwithAlertForButton()}
            style={[styles.touchable, styles.exitButton]}>
            <Text style={styles.text}>Çıkış Yap</Text>
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
    top: '5%',
  },
  exitButton: {
    top: '40%',
  },
});

export default MainMenu;
