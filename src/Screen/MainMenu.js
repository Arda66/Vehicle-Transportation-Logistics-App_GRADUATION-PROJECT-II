import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  BackHandler,
  Image
} from 'react-native';
import React, {useEffect} from 'react';

const MainMenu = ({navigation}) => {


  useEffect(() => {    // SOL ALTTAKİ GERİ ÇIKMA TUŞUNA BASINCA NE YAPSIN !
    navigation.setOptions({    // SOL ÜSTTEKİ GERİ TUŞUNA BASINCA NE YAPSIN!                  
      headerLeft: () => (
        <TouchableOpacity
          onPress={() =>
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
                  onPress: () => navigation.navigate('Giriş Ekranı'),
                },
              ],
            )
          }
        >
          <Image style={{width:25,height:20,marginRight:15}}source={require('../Resim/left_arrow.png')}/>
        </TouchableOpacity>
      ),
    });
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
          {text: 'Evet', onPress: () => navigation.navigate('Giriş Ekranı')},
        ],
      );
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  // React.useEffect(
  //   // GERi TUŞUYLA GİRİŞ EKRANINA ÇIKMADAN ÖNCE EMİNMİSİNİZ DİYE SORMAK İÇİN useEffect kullandık.(YANLIŞLIKLA HER GERİ TUŞUNA BASTIKLARINDA GİRİŞ YAPMAK ZORUNDA KALMASINLAR DİYE)
  //   () =>
  //     navigation.addListener('beforeRemove', e => {
  //       // Prevent default behavior of leaving the screen
  //       // e.preventDefault();

  //       // Prompt the user before leaving the screen
  //       Alert.alert(
  //         'Çıkmak istediğinize emin misiniz?',
  //         'Kaydetmediğiniz değişiklikler var. Giriş ekranına dönmek istediğinize emin misiniz?',
  //         [
  //           {
  //             text: 'Çıkış yap.',
  //             style: 'destructive',
  //             // If the user confirmed, then we dispatch the action we blocked earlier
  //             // This will continue the action that had triggered the removal of the screen
  //             onPress: () => navigation.navigate('Giriş Ekranı'),
  //           },
  //           {
  //             text: 'Vazgeçtim.',
  //             style: 'cancel',
  //             onPress: () => navigation.push('Ana Menü Ekranı'),
  //           },
  //         ],
  //       );
  //     }),
  //   [navigation],
  // );
  //   const ScreenWithCustomBackBehavior = () => {
  //     // ...
  //     useFocusEffect(
  //       React.useCallback(() => {
  //         const onBackPress = () => {
  //   Alert.alert(
  //     'Çıkmak istediğinize emin misiniz?',
  //     'Kaydetmediğiniz değişiklikler var. Giriş ekranına dönmek istediğinize emin misiniz?',
  //     [
  //       {
  //         text: 'Çıkış yap.',
  //         style: 'destructive',
  //         // If the user confirmed, then we dispatch the action we blocked earlier
  //         // This will continue the action that had triggered the removal of the screen
  //         onPress: () => {
  //           return false;
  //         },
  //       },
  //       {
  //         text: 'Vazgeçtim.',
  //         style: 'cancel',
  //         onPress: () => {
  //           return true;
  //         },
  //       },
  //     ],
  //   );
  // };

  //         BackHandler.addEventListener('hardwareBackPress', onBackPress);

  //         return () =>
  //           BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  //       }),
  //     );

  //     // ...
  //   };

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
            onPress={() => navigation.navigate('GirişListesi Ekranı')}
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
