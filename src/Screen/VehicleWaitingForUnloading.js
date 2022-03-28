import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';

const Vehicle_Waiting_For_Unloading = ({navigation}) => {
  const [ListItems, setListItems] = useState([
    {index: '1'},
    {index: '2'},
    {index: '3'},
    {index: '4'},
    {index: '5'},
    {index: '6'},
  ]);

  const ListItem = item => {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={styles.container}>
          <View style={{flex: 1}}>
            <Text
              style={{
                fontWeight: 'bold',
                color: 'black',
                top: 10,
                flex: 1,
                left: 10,
              }}>
              Giriş Listesi {item.index}. Item
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                margin: 5,
              }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('NewRecord or Modify Screen')
                }
                style={styles.button}>
                <Text style={styles.text}>Düzelt</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('NewRecord or Modify Screen')
                }
                style={styles.button}>
                <Text style={styles.text}>Yeni Kayıt</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('Pictures Screen')}
                style={styles.button}>
                <Text style={styles.text}>Resim Ekle</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };
  return (
    <FlatList
      data={ListItems}
      renderItem={({item}) => {
        return <ListItem index={item.index} />;
      }}
    />
  );
};

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
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    width: '85%',
    height: '80%',
    marginVertical: '20%',
  },
});

export default Vehicle_Waiting_For_Unloading;
