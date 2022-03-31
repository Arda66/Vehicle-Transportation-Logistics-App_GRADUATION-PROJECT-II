import {View, Text} from 'react-native';
import React from 'react';
const RESOURCE_NAME = 'accounts';

export default {
  login(username, password) {
    return axios.post(`${RESOURCE_NAME}/login`, {username, password});
  },
};
