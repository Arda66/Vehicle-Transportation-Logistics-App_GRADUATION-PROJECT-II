import {View, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react';
import {StoreData} from './DataStore';
import {useNavigation} from '@react-navigation/native';

const ModifyScreen = observer(({navigation}) => {
  global.global_navigation = useNavigation();

  return (
    <View style={{flex: 1}}>
      <StoreData.ModifyVehicle navigation={navigation} />
    </View>
  );
});
const styles = StyleSheet.create({
  Input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    marginVertical: 5,
  },
});

export default ModifyScreen;
