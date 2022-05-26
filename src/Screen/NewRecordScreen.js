import {View, Text, StyleSheet, Button, TextInput} from 'react-native';
import React, {useState} from 'react';
import {Formik} from 'formik';
import {StoreData} from './DataStore';
import {observer} from 'mobx-react';

const NewRecordScreen = observer(() => {
  return (
    <View style={{flex: 1}}>
      <StoreData.AddVehicle />
    </View>
  );
});

export default NewRecordScreen;
