import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import DatePicker from 'react-native-date-picker';
import {observer} from 'mobx-react';
import {StoreData} from './DataStore';
import {action, runInAction, toJS} from 'mobx';

const Vehicle_Waiting_For_Unloading = observer(({navigation}) => {
  const [date, setDate] = useState(new Date());
  var NoVehicleFound = true;

  useEffect(() => {
    global_date = date;
  }, []);

  const DateTimePicker = () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            marginHorizontal: 10,
            marginVertical: 10,
            top: '1%',
          }}
          title="Date"
          onPress={() => setOpen(true)}>
          <Text style={{color: 'black', fontWeight: 'bold'}}>
            Tarih : {date.toString()}
          </Text>
        </TouchableOpacity>
        <DatePicker
          mode="date"
          modal
          open={open}
          date={date}
          onConfirm={date => {
            setOpen(false);
            setDate(date);
            global_date = date;
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </>
    );
  };

  const ListItem = React.memo(item => {
    // For avoid re-rendering (optimization)
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={styles.container}>
          <View style={{flex: 1}}>
            <Text style={styles.ValuesOnScreen}>
              Firma : {item.Company} 
            </Text>
            <Text style={styles.ValuesOnScreen}>
              Giriş zamanı : {item.LoginTime}
            </Text>
            <Text style={styles.ValuesOnScreen}>Plaka : {item.Plate}</Text>
            <Text style={styles.ValuesOnScreen}>
              Set3Deger : {item.Set3Deger}
            </Text>
            <Text style={styles.ValuesOnScreen}>
              Tartım No : {item.WeighingNo}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                margin: 5,
              }}>
              <TouchableOpacity
                onPress={() => {
                  index_for_vehicle = item.index;
                  navigation.navigate('Modify Screen');
                }}
                style={styles.button}>
                <Text style={styles.text}>Düzelt</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('New Record Screen')}
                style={styles.button}>
                <Text style={styles.text}>Yeni Kayıt</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  index_for_vehicle = item.index;
                  navigation.navigate('Pictures Screen');
                }}
                style={styles.button}>
                <Text style={styles.text}>Resimler</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );

    {
      /* ({ImageList[item.index].length}) bunu resimlerin yanına koy sonra */
    }
  });

  global.notifyMessage = msg => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      AlertIOS.alert(msg);
    }
  };

  const NoVehicleFoundFalse = () => {
    return (NoVehicleFound = false);
  };

  const No_Vehicle_Found_Alert = () => {
    if (NoVehicleFound == true) {
      Alert.alert(
        'Bu tarihte veri bulunamadı!',
        'Lütfen farklı bir tarih seçiniz.',
      );
      NoVehicleFound = false;
    }
  };

  const renderItem = ({item, index}) => {
    return item.GirisZamani.toString().substring(0, 10) ==
      date.toISOString().substring(0, 10) ? (
      <View>
        <ListItem
          Company={item.Firma}
          LoginTime={item.GirisZamani.toString().substring(0, 10)}
          Plate={item.Plaka}
          Set3Deger={item.Set3Deger}
          WeighingNo={item.TartimNo}
          index={index}
        />
        {<NoVehicleFoundFalse />}
      </View>
    ) : (
      No_Vehicle_Found_Alert()
    );
  };

  const FlatListData = React.memo(
    observer(() => {
      // STRİCT MODE HATASI BU OBSERVER YÜZÜNDEN GELDİ. AMA BUNA OBSERVER EKLEYİNCE ANLIK OLARAK SİLİYOR İSTEDİĞİMİZ GİBİ.
      return (
        <View style={{flex: 1}}>
          <FlatList data={StoreData.ListItems} renderItem={renderItem} />
        </View>
      );
    }),
  );
  return (
    <View style={{flex: 1}}>
      <DateTimePicker />
      <FlatListData />
    </View>
  );
});

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    color: 'black',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 20,
    width: 90,
    height: 40,
    marginHorizontal: 10,
  },
  container: {
    top: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    width: '87%',
    height: '95%',
    marginVertical: '25%',
  },
  ValuesOnScreen: {
    fontWeight: 'bold',
    color: 'black',
    top: 10,
    flex: 1,
    left: 10,
  },
  Input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    marginVertical: 5,
  },
});

export default Vehicle_Waiting_For_Unloading;
