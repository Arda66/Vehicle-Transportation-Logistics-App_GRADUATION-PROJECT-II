import {
  Input,
  Stack,
  Center,
  NativeBaseProvider,
  Button,
  Box,
  Icon,
  MaterialIcons,
} from 'native-base';
import React from 'react';
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

import MainMenu from './src/Screen/MainMenu';

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
          name="MainMenuScreen"
          component={MainMenu}
          options={{title: 'Ana Menü'}}
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

  return (
    <DismissKeyboard>
      <NativeBaseProvider>
        <SafeAreaView style={[backgroundStyle, styles.sectionContainer]}>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <KeyboardAvoidingView style={{flex: 1}}>
            <InputBoxes />
            <Box alignItems="center" marginTop={'1%'}>
              <Button
                style={{
                  borderRadius: 25,
                  width: '50%',
                  minHeight: '7%',
                  maxHeight: '100%',
                }}
                onPress={() =>
                  navigation.navigate('MainMenuScreen')
                }>
                Giriş Yap
              </Button>
            </Box>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </NativeBaseProvider>
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StackNavigator;
