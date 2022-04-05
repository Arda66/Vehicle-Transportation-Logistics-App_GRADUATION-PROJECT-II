import {View, Text} from 'react-native';
import React from 'react';
const baseUrl = 'http://slc.selectoptimus.com:43508/RestService.svc';

export default {
  login(userName, password) {
    return axios.post(`${baseUrl}/Login`, {userName, password});
  },
};
