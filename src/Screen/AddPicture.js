import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ImageBackground,
  Button,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ImagePicker from 'react-native-image-crop-picker';

const AddPicture = () => {
  const [FlatListRenderer, setFlatListRenderer] = useState(false);
  // const ImageList = ["https://img01.imgsinemalar.com/images/afis_buyuk/u/uri-the-surgical-strike-1573833071.jpg","https://media-cdn.tripadvisor.com/media/photo-s/1c/44/c1/93/canton-uri-31-ottobre.jpg","https://media-cdn.tripadvisor.com/media/photo-s/1c/44/c3/6e/canton-uri-31-ottobre.jpg"];
  //index_for_pictures kullan array olarak ImageList[index_for_pictures] şeklinde

  useEffect(() => {
    console.log('ImageList : ', ImageList);
    console.log('IndexforPictures : ', index_for_pictures);
  }, []);
  const TakePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
    })
      .then(image => {
        if (image != null) {
          console.log('Index for pictures : ', index_for_pictures);
          // ImageList.push(image.path);
          // ImageList.splice( // BÖYLE YAPINCA 1 FOTOĞRAF EKLİYOR
          //   index_for_pictures,
          //   1,
          //   'https://img01.imgsinemalar.com/images/afis_buyuk/u/uri-the-surgical-strike-1573833071.jpg',
          // );
          // ImageList.splice(
          //   index_for_pictures,
          //   0,
          //   'https://img01.imgsinemalar.com/images/afis_buyuk/u/uri-the-surgical-strike-1573833071.jpg',
          // );
          ImageList[index_for_pictures].splice( // Buraya yazılan index for pictures ın bir önemi yok onu düzeltmeye çalış her arraya ekliyor değeri
            ImageList[index_for_pictures].length-1,0,image.path,
          );
          console.log('ImageList : ', ImageList);
          setFlatListRenderer(!FlatListRenderer);
        }
      })
      .catch(err => {
        console.log('TakePhotoFromCamera err catch ' + err.toString());
      });
  };
  const ChoosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      width: 300,
      height: 300,
      cropping: true,
    })
      .then(image => {
        if (image != null) {
          ImageList[index_for_pictures].splice( // Buraya yazılan index for pictures ın bir önemi yok onu düzeltmeye çalış her arraya ekliyor değeri
          ImageList[index_for_pictures].length-1,0,image.path,
        ); // push kullanabiliriz aynı sonuç çıkıyor.
          console.log('ImageList : ', ImageList);
          setFlatListRenderer(!FlatListRenderer);
        }
      })
      .catch(err => {
        console.log('ChoosePhotoFromLibrary err catch  ' + err.toString());
      });
  };

  const BottomAddPhotoMenu = () => {
    // BUNU İOS İÇİNDE YAPMAMIZ GEREKİYOR ANDROİD İÇİN KURDUM BEN. POD İNSTALL YAPAMADIM(MAC CİHAZIM YOK)
    return (
      <View style={styles.panel}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.panelTitle}>Resim Yükle</Text>
        </View>
        <TouchableOpacity
          style={styles.panelButton}
          onPress={TakePhotoFromCamera}>
          <Text style={styles.panelButtonTitle}>Fotoğraf Çek</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.panelButton}
          onPress={ChoosePhotoFromLibrary}>
          <Text style={styles.panelButtonTitle}>Galeriden Seç</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const ImageListBox = () => {
    // Fotoğrafları flatlist ile alt alta göstercez.
    return (
      <View style={{flex: 1}}>
        <FlatList
          extraData={FlatListRenderer}
          data={ImageList[index_for_pictures]}
          renderItem={({item}) => {
            return (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  bottom: '30%',
                  marginVertical: 10,
                  top: '2%',
                }}>
                <Image style={{width: 300, height: 300}} source={{uri: item}} />
              </View> // item[index_for_pictures] yapmamız lazım.
            );
          }}
        />
      </View>
    );
  };

  const ShowImages = () => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          bottom: '30%',
          marginVertical: 10,
          top: '2%',
        }}>
        <Image
          style={{width: 300, height: 300}}
          source={{uri: ImageList[index_for_pictures]}}
        />
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <ImageListBox />
      {/* <ShowImages></ShowImages> */}
      <BottomAddPhotoMenu></BottomAddPhotoMenu>
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
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,
    shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
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
