import {View, Text, TextInput, Button} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
const baseUrl = 'https://jsonplaceholder.typicode.com';

const LoginList = ({navigation}) => {
  const fetchData = () => {
    axios
      .get(`${baseUrl}/posts`)
      .then(response => {
        console.log(response.data);
      })
      .catch(err => console.log('Fetch hata : ' + err));
  };
  const SendData = (userId) =>{
    axios.post(`${baseUrl}/posts`,{userId}).then(res =>{
      console.log(res.data);

    }).catch(err => console.log('Update hata' + err));
  
  }

  const [text, setText] = useState('');
  useEffect(() => {
    // Only render once! at the start
    fetchData();
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TextInput
        value={text}
        onChangeText={text => {
          setText(text);
        }}
        placeholder="isim değerini güncelle"
        style={{
          borderWidth: 1,
          width: 200,
          margin: 30,
          borderRadius: 10,
        }}></TextInput>
      <Button onPress={() => SendData(text)} title="Update"></Button>
    </View>
  );
};

export default LoginList;
