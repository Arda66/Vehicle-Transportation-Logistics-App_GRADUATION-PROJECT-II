import {View, Text, TextInput, Button} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
const baseUrl = 'https://jsonplaceholder.typicode.com';

const LoginList = ({navigation}) => { // BURASI DENEME AMAÇLI!
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const fetchData = () => {
    axios
      .get(`${baseUrl}/posts`)
      .then(response => {
        console.log(response.data);
      })
      .catch(err => console.log('Fetch hata : ' + err));
  };
  const SendData = (username, password) => {
    axios
      .post(`${baseUrl}/posts`, {username: username, password: password})
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log('Update hata' + err));
  };

  useEffect(() => {
    // Only render once! at the start
    fetchData();
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TextInput
        value={username}
        onChangeText={username => {
          setUsername(username);
        }}
        placeholder="Kullanıcı adı gir"
        style={{
          borderWidth: 1,
          width: 200,
          margin: 30,
          borderRadius: 10,
        }}></TextInput>
      <TextInput
        value={password}
        onChangeText={password => {
          setPassword(password);
        }}
        placeholder="Şifre gir"
        style={{
          borderWidth: 1,
          width: 200,
          borderRadius: 10,
          marginBottom: 20,
        }}></TextInput>
      <Button
        onPress={() => SendData(username, password)}
        title="Ekle"></Button>
    </View>
  );
};

export default LoginList;
