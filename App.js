import {
  Stack,
  Center,
  NativeBaseProvider,
  Button,
  Box,
  Icon,
  MaterialIcons,
  Toast,
} from 'native-base';
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
import AddPicture from './src/screen/AddPicture';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AccountService from './services/AccountService';
import RestService from './services/RestService';
import {Formik} from 'formik';
import {Input} from 'native-base';
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
          component={Login}
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
          component={AddPicture}
          options={{title: 'Resimler / Resim Ekle'}}
        />
      </StackNavigate.Navigator>
    </NavigationContainer>
  );
};

const Login = ({navigation}) => {
  const [Token, SetToken] = useState(null);
  const [LoginSuccess, setLoginSuccess] = useState(false);
  const [LoginPressedCaller, setLoginPressedCaller] = useState(false); // 2 3 kere yanlış girerse her seferinde ekranda uyarsan useeffect çağırsın diye

  const notifyMessage = msg => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      AlertIOS.alert(msg);
    }
  };
  const getToken = () => {
    // BU TOKENLE AUTO LOGİN İÇİN ALCAK
    try {
      AsyncStorage.getItem('UserToken').then(value => {
        console.log("GetToken Dönen DEĞER: ",value)
        if (value != null) {
          navigation.navigate('Main Menu Screen');
        }
        else if(value == null)
          setLoginSuccess(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken(); // BURAYA TOKEN ÇAĞRILARAK AUTO LOGİN YAPILCAK. Birde Eğer Token null ise lOGİN SUCCESS FALSE OLSUN. Gerçi zaten false ama genede kontrol etmekte fayda var
    // setLoginSuccess(false); // Eğer olurda çıkış yaparsak default olarak false olsun bu değer
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
    const [userName, setuserName] = useState('');
    const [password, setpassword] = useState('');
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    useEffect(() => {
      console.log('Selam LoginSuccess Değerim : ', LoginSuccess);
      // TRUE OLARAK ATADIKTAN SONRA BURADA YAPACAZ DEĞİŞİKLİK useeffect tanımlanmadan sonra yapılır.
      if (LoginSuccess == false) {
        // burası false olunca diğer kısımlardaki else kısmına gitmesin diye yaptık. Çıkış yaptan sonra token null ise false dedik bişey yapmasın yani.
      } else if (LoginSuccess == true) {
        setLoginSuccess(false);
        console.log('Giriş Başarılı!');
        notifyMessage('Giriş Başarılı!');
        console.log('Token Değerim : ', Token);
        // setToken();
        navigation.navigate('Main Menu Screen');
        setuserName('');
        setpassword('');
      }
      //  else
      //   Alert.alert(
      //     'Kullanıcı adı veya şifre yanlış!',
      //     'Lütfen Tekrar Deneyiniz.',
      //   );
    }, [LoginPressedCaller]);

    const setTokenFunction = async (Token) => {
      try {
        if(Token != null)
        await AsyncStorage.setItem('UserToken', Token);
      } catch (error) {
        console.log("SetTokenFunction ERROR : ",error);
      }
    };
    const LoginPressed = () => {
      // API ile buradan kıyaslama yapılacak
       if (userName.length != 0 && password.length != 0) {
        AccountService.login(userName, password)
        .then(response => {
          console.log('Response data : ', response.data);
          if (response.data.Success == true) {
            setLoginSuccess(true); // Burası DiREKT OLARAK TRUE YAPMIYOR. Usestate anında gerçekleşmez render olduktan sonra useeffect kısmında olur Ve burası aynı zamanda useEFFECT TETİKLİYOR KONTROL İŞLEMLERİ ORADA OLACAK.
            // SetToken(response.data.Token);
             setTokenFunction(response.data.Token);
          } else {
            setLoginSuccess(false);
            // SetToken(null);
          }
        })
        .catch(error => {
          console.log(error);
        });
      setLoginPressedCaller(!LoginPressedCaller);
      }
      else {
        notifyMessage('Kullanıcı adı veya şifre boş olamaz!');
      }
       // her yanlış girildiğinde sürekli çağırması için

      // Buradaki kıyaslama işlerini useeffect kısmında yaptık çünkü setloginsuccess render sonunda true dönüyor değer olarak
    };

    return (
      <Stack mt={'30%'} space={'15%'} width="100%" maxW="70%">
        <Input
          value={userName}
          onChangeText={text => setuserName(text)}
          size="lg"
          placeholder="Kullanıcı adı"
        />
        <Input
          onChangeText={text => setpassword(text)}
          value={password}
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
