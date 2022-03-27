import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';

const HeaderLeftFunction = props => {  // BUNU NAVİGATİON.SETOPTİONS KISMI İLE DİĞER SAYFALARDA ÇAĞIR USEEFFECT İÇİNDE ! 
  return (
    <TouchableOpacity
      onPress={() =>
        Alert.alert(props.üstmesaj, props.altmesaj, [
          {
            text: props.solbutontext,
            onPress: props.solbutongörev,
            style: 'cancel',
          },
          {
            text: props.sağbutontext,
            onPress: props.sağbutongörev,
          },
        ])
      }>
      <Image
        style={{width: 25, height: 20, marginRight: 15}}
        source={require('./src/Resim/left_arrow.png')}
      />
    </TouchableOpacity>
  );
};

export default HeaderLeftFunction;
