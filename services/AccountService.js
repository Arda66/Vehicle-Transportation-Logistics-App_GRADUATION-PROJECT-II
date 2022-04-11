import {View, Text} from 'react-native';
import React from 'react';
const baseUrl = 'http://slc.selectoptimus.com:43508/RestService.svc';
import axios from 'axios';
export default {
  login(userName, password) {
    const body = {User: userName, Password: password};
    console.log('Login input : ', body);
    return axios.get(
      `${baseUrl}/Login?userName=${userName}&password=${password}`,
    );
  },
};
