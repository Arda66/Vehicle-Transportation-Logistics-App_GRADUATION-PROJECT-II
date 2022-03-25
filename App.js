import {
  Input,
  Stack,
  Center,
  NativeBaseProvider,
  Button,
  Box,
  Icon,
  MaterialIcons,
} from 'native-base'; /* AUTOFİLL EKLENCEK KEYBOARD DİSMİSS ÇALIŞMIYOR VE GİRİŞ YAPA BASINCA İÇERİSİNDEKİ TEXTLER NULL OLMALI */
import React, {useState} from 'react';
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
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import Boşaltma_Bekleyen_Araç from './src/Screen/Boşaltma_Bekleyen_Araç';
import MainMenu from './src/Screen/MainMenu';
import Yeni_kayıt_veya_düzenle from './src/Screen/Yeni_kayıt_veya_düzenle';

const Section = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
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
};

const DismissKeyboard = ({children}) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );
};

const InputBoxes = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const [KullanıcıAdı, setKullanıcıAdı] = useState('Kullanıcı adı');
  const [Şifre, setŞifre] = useState('Şifre');

  return (
    <Stack mt={'30%'} space={'15%'} width="100%" maxW="70%">
      <Input size="lg" placeholder="Kullanıcı adı" />
      <Input
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
    </Stack>
  );
};

const StackNavigate = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <StackNavigate.Navigator initialRouteName="LoginScreen">
        <StackNavigate.Screen
          name="LoginScreen"
          component={App}
          options={{title: 'Giriş Ekranı'}}
        />
        <StackNavigate.Screen
          name="Ana Menü Ekranı"
          component={MainMenu}
          options={{title: 'Ana Menü'}}
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
      </StackNavigate.Navigator>
    </NavigationContainer>
  );
};

const App = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const NavigateToMainScreen = () => {
    navigation.navigate('Ana Menü Ekranı');
    // ANA EKRANA GEÇERKEN KULLANICI ADI VE ŞİFRE TEXTLERİ NULL OLACAK O BUTONA BASILDIĞINDA
  };
  return (
    <NativeBaseProvider>
      <SafeAreaView style={[backgroundStyle, styles.sectionContainer]}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <KeyboardAvoidingView style={{flex: 1}}>
          <InputBoxes />
          <DismissKeyboard>
            <Box alignItems="center" marginTop={'3%'}>
              <Button
                style={styles.button}
                onPress={() => NavigateToMainScreen()}>
                Giriş Yap
              </Button>
            </Box>
          </DismissKeyboard>
        </KeyboardAvoidingView>
      </SafeAreaView>
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
