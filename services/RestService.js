import {View, Text} from 'react-native';
import React from 'react';
const baseUrl = 'http://slc.selectoptimus.com:43508/RestService.svc';
import axios from 'axios';
export default {
  GetWaitingVehicles(token) {
    return axios.get(`${baseUrl}/GetWaitingVehicles?token=${token}`);
  },
  GetEntries(token, FilterDate) {
    return axios.get(
      `${baseUrl}/GetEntries?token=${token}&filterDate=${FilterDate}`,
    );
  },
  AddEntry(token, entry) {
    return axios.post(`${baseUrl}/AddEntry?token=${entry}`);
  },
  GetEntry(token, entryId) {
    return axios.get(`${baseUrl}/GetEntry?token=${token}&entryId=${entryId}`);
  },
};
