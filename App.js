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
import Vehicle_Waiting_For_Unloading from './src/screen/VehicleWaitingForUnloading';
import MainMenu from './src/screen/MainMenu';
import NewRecordModify from './src/screen/NewRecordModify';
import LoginList from './src/screen/LoginList';
import Pictures from './src/screen/Pictures';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
          name="Login Screen"
          component={GirişYap}
          options={{title: 'Giriş Ekranı'}}
        />
        <StackNavigate.Screen
          name="Main Menu Screen"
          component={MainMenu}
          options={{
            title: 'Ana Menü',
            headerShown: false,
          }}
        />
        <StackNavigate.Screen
          name="Vehicle Waiting For Unloading Screen"
          component={Vehicle_Waiting_For_Unloading}
          options={{title: 'Boşaltma Bekleyen Araç Listesi'}}
        />
        <StackNavigate.Screen
          name="NewRecord or Modify Screen"
          component={NewRecordModify}
          options={{title: 'Yeni Kayıt veya Düzenle'}}
        />
        <StackNavigate.Screen
          name="LoginList Screen"
          component={LoginList}
          options={{title: 'Giriş Listesi'}}
        />
        <StackNavigate.Screen
          name="Pictures Screen"
          component={Pictures}
          options={{title: 'Resim Ekle'}}
        />
      </StackNavigate.Navigator>
    </NavigationContainer>
  );
};

const GirişYap = ({navigation}) => {
  const getData = () => {
    try {
      AsyncStorage.getItem('UserData').then(value => {
        if (value != null) {
          navigation.navigate('Main Menu Screen');
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();

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
    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);

    const notifyMessage = msg => {
      if (Platform.OS === 'android') {
        ToastAndroid.show(msg, ToastAndroid.SHORT);
      } else {
        AlertIOS.alert(msg);
      }
    };

    const setData = async () => {
      try {
        var user = {Username: Username, Password: Password};
        await AsyncStorage.setItem('UserData', JSON.stringify(user));
      } catch (error) {
        console.log(error);
      }
    };
    const LoginPressed = () => {
      // API geldiğinde BUrada kıyaslama yapacaksın eğer girdiği kullanıcı adı && şifre eşitmi şeklinde if else kullanarak eğer eşitse navigate etçek eğer değilse alert şeklinde ekranda hata vercek tekrar deneyin diye!
      if (
        (Username == 'arda' && Password == '123') ||
        (Username == 'aslan' && Password == '45')
      ) {
        notifyMessage('Giriş Başarılı!');
        setData();
        navigation.navigate('Main Menu Screen');
        setUsername('');
        setPassword('');
      } else if (Username.length == 0 || Password.length == 0)
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
          value={Username}
          onChangeText={text => setUsername(text)}
          size="lg"
          placeholder="Kullanıcı adı"
        />
        <Input
          onChangeText={text => setPassword(text)}
          value={Password}
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
          <Button style={styles.button} onPress={() => LoginPressed()}>
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
