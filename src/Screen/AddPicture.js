import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import ImagePicker from 'react-native-image-crop-picker';

const AddPicture = ({navigation}) => {
  const PopUpFromBottomMenu = () => {
    return (
      <View style={styles.panel}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.panelTitle}>Resim Yükle</Text>
        </View>
        <TouchableOpacity style={styles.panelButton} onPress>
          <Text style={styles.panelButtonTitle}>Fotoğraf Çek</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.panelButton} onPress>
          <Text style={styles.panelButtonTitle}>Galeriden Seç</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.panelButton}
          onPress={() => this.bs.current.snapTo(1)}>
          <Text style={styles.panelButtonTitle}>İptal</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View>
      <PopUpFromBottomMenu></PopUpFromBottomMenu>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
    marginBottom: 20,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 15,
    marginHorizontal: 10,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
});
export default AddPicture;
