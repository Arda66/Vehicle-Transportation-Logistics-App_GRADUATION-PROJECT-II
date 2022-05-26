import React from 'react';
import {action, makeObservable, observable, trace} from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RestService from '../../services/RestService';
import {configure} from 'mobx';
import ModifyValues from './ModifyValues';

import {Alert} from 'react-native';

class DataStore {
  ListItems = [];

  constructor() {
    AsyncStorage.getItem('UserToken').then(value => {
      if (value != null) {
        RestService.GetWaitingVehicles(value).then(response => {
          this.ListItems = response.data;
        });
      }
 
    });

    makeObservable(this, {
      ListItems: observable,
      DeleteVehicle: action,
      ModifyVehicle: action,
    });
    configure({
      enforceActions: 'never',
    });
  }

  ModifyVehicle({navigation}) {
    return <ModifyValues navigation={navigation} />;
  }

  DeleteVehicle() {
    Alert.alert(
      'Seçtiğiniz araç bilgileriyle silinecektir.',
      'Silmek istediğinize emin misiniz ?',
      [
        {
          text: 'Hayır',
          onPress: () => {
            notifyMessage('Silme işlemi iptal edildi!');
          },
          style: 'cancel',
        },
        {
          text: 'Evet',
          onPress: () => {
            if (index_for_vehicle == this.ListItems.length - 1) {
              console.log(
                'Son eleman listItem üzerinden silindi! İndex değeri : ',
                index_for_vehicle,
              );
              // Son elemanı farklı şekilde sil  yoksa hata veriyor.
              index_for_vehicle -= 1;
              this.ListItems = this.ListItems.filter(
                // filter için aşağıdaki değeri index ile eşit olmayanları alcam şeklinde düşün
                (item, index) => {
                  return index !== this.ListItems.length - 1;
                },
              );
              ImageList.splice(-1, 1);
              DetailList.splice(-1, 1);

              console.log(
                'Son elemanı ImageList ve DetailList üzerinden sildiniz!',
              );
              console.log('ListItem: ', this.ListItems.length);

              // Son elemanı silince  o index değeri yok oluyordu hata veriyordu bu şekilde çözdük.
            } else {
              // this.ListItems.splice(index_for_vehicle, 1);
              this.ListItems = this.ListItems.filter(
                // filter için aşağıdaki değeri index ile eşit olmayanları alcam şeklinde düşün
                (item, index) => {
                  return index !== index_for_vehicle;
                },
              );

              console.log('ListItem: ', this.ListItems[5].Company);
              ImageList.splice(index_for_vehicle, 1);
              DetailList.splice(index_for_vehicle, 1);
              console.log(index_for_vehicle, ' indexli numarayı sildiniz.');
            }
            notifyMessage('Araç başarıyla silindi!');
            console.log('ImageList : ', ImageList);
            console.log('DetailList :', DetailList);
            setTimeout(() => {
              global_navigation.navigate(
                'Vehicle Waiting For Unloading Screen',
              );
            }, 200);

          },
        },
      ],
    );
  }
}

export const StoreData = new DataStore();
