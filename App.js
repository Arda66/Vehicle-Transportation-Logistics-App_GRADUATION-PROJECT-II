import {
  Input,
  Stack,
  Center,
  NativeBaseProvider,
  Button,
  Box,
  Icon,
  MaterialIcons,
  Toast,
} from 'native-base'; /* AUTOFİLL EKLENCEK  VE GİRİŞ YAPA BASINCA İÇERİSİNDEKİ TEXTLER NULL OLMALI. Eğer kullanıcı adı şifre api ile uyuşmazsa Altında kırmızı bir uyarı yazısı çıkmalı */
import React, {useState, useEffect} from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
  ToastAndroid,
  BackHandler,
  TouchableOpacity,
  Image,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import Boşaltma_Bekleyen_Araç from './src/Screen/Boşaltma_Bekleyen_Araç';
import MainMenu from './src/Screen/MainMenu';
import Yeni_kayıt_veya_düzenle from './src/Screen/Yeni_kayıt_veya_düzenle';
import GirişListesi from './src/Screen/GirişListesi';
import Resimler from './src/Screen/Resimler';

/* 
const Section = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,f
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}; */

const HideKeyboard = ({children}) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );
};

const StackNavigate = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <StackNavigate.Navigator initialRouteName="Giriş Ekranı">
        <StackNavigate.Screen
          name="Giriş Ekranı"
          component={GirişYap}
          options={{title: 'Giriş Ekranı'}}
        />
        <StackNavigate.Screen
          name="Ana Menü Ekranı"
          component={MainMenu}
          options={{
            title: 'Ana Menü',
          }}
        />
        <StackNavigate.Screen
          name="Boşaltma Bekleyen Araç Ekranı"
          component={Boşaltma_Bekleyen_Araç}
          options={{title: 'Boşaltma Bekleyen Araç Listesi'}}
        />
        <StackNavigate.Screen
          name="Yeni kayıt veya düzenle Ekranı"
          component={Yeni_kayıt_veya_düzenle}
          options={{title: 'Yeni Kayıt veya Düzenle'}}
        />
        <StackNavigate.Screen
          name="GirişListesi Ekranı"
          component={GirişListesi}
          options={{title: 'Giriş Listesi'}}
        />
        <StackNavigate.Screen
          name="Resimler Ekranı"
          component={Resimler}
          options={{title: 'Resim Ekle'}}
        />
      </StackNavigate.Navigator>
    </NavigationContainer>
  );
};

const GirişYap = ({navigation}) => {
  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        'Uygulamadan çıkış yapılacaktır!',
        'Çıkış yapmak istediğinize emin misiniz?',
        [
          {
            text: 'Hayır',
            onPress: () => null,
            style: 'cancel',
          },
          {text: 'Evet', onPress: () => BackHandler.exitApp()},
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

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const InputBoxes = () => {
    const [KullanıcıAdı, setKullanıcıAdı] = useState('');
    const [Şifre, setŞifre] = useState('');
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);

    const notifyMessage = msg => {
      if (Platform.OS === 'android') {
        ToastAndroid.show(msg, ToastAndroid.SHORT);
      } else {
        AlertIOS.alert(msg);
      }
    };

    const GirişYapPressed = () => {
      // API geldiğinde BUrada kıyaslama yapacaksın eğer girdiği kullanıcı adı && şifre eşitmi şeklinde if else kullanarak eğer eşitse navigate etçek eğer değilse alert şeklinde ekranda hata vercek tekrar deneyin diye!
      if (KullanıcıAdı == '1' && Şifre == '2') {
        notifyMessage('Giriş Başarılı!');
        navigation.navigate('Ana Menü Ekranı');
        setKullanıcıAdı('');
        setŞifre('');
      } else if (KullanıcıAdı == '' || Şifre == '')
        notifyMessage('Kullanıcı adı veya şifre boş olamaz!');
      else
        Alert.alert(
          'Kullanıcı adı veya şifre yanlış!',
          'Lütfen Tekrar Deneyiniz.',
        );
    };

    return (
      <Stack mt={'30%'} space={'15%'} width="100%" maxW="70%">
        <Input
          value={KullanıcıAdı}
          onChangeText={text => setKullanıcıAdı(text)}
          size="lg"
          placeholder="Kullanıcı adı"
        />
        <Input
          onChangeText={text => setŞifre(text)}
          value={Şifre}
          size="lg"
          type={show ? 'text' : 'password'}
          width="100%"
          py="0"
          InputRightElement={
            <Button
              size="lg"
              rounded="none"
              w="30%"
              h="full"
              onPress={handleClick}>
              {show ? 'Gizle' : 'Göster'}
            </Button>
          }
          placeholder="Şifre"
        />
        <Box alignItems="center" marginTop={'3%'}>
          <Button style={styles.button} onPress={() => GirişYapPressed()}>
            Giriş Yap
          </Button>
        </Box>
      </Stack>
    );
  };

  return (
    <NativeBaseProvider>
      <HideKeyboard>
        <SafeAreaView style={[backgroundStyle, styles.sectionContainer]}>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <KeyboardAvoidingView style={{flex: 1}}>
            <InputBoxes />
          </KeyboardAvoidingView>
        </SafeAreaView>
      </HideKeyboard>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderRadius: 25,
    width: '50%',
    height: 50,
    minHeight: '8%',
    maxHeight: '100%',
  },
});

export default StackNavigator;
