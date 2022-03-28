import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  BackHandler,
  Image,
} from 'react-native';
import React, {useEffect} from 'react';

const MainMenu = ({navigation}) => {
  useEffect(() => {
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
      Alert.alert(
        'Hesabınızdan çıkış yapılacaktır.',
        'Giriş Ekranına dönmek istediğinize emin misiniz?',
        [
          {
            text: 'Hayır',
            onPress: () => null,
            style: 'cancel',
          },
          {text: 'Evet', onPress: () => navigation.navigate('Login Screen')},
        ],
      );
      return true;
    };

    // headerleffunction();
    const backHandler = BackHandler.addEventListener(
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
          onPress: () => navigation.navigate('Login Screen'),
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
            style={styles.touchable}>
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
});

export default MainMenu;
