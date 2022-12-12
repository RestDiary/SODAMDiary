import React, { useEffect, useState } from 'react';
import { Button, View, Text, Alert, Image } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { API } from '../config.js'




function PictureScreen({ navigation }) {

  const [albumData, setAlbumData] = useState([]);
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    getAlbumData()
  }, [])


  //앨범 data 요청
  const getAlbumData = async () => {
    setLoading(true)
    const userId = await AsyncStorage.getItem("id");
    try {
      await axios({
        method: "post",
        url: `${API.ALBUM}`,
        params: {
          id: userId, //****작성자 id
        }
      }, null)
        .then(res => {
          setAlbumData(res.data)
          console.log("들어온",res.data)
        })
        .catch(function (error) {
          Alert.alert("❗error : bad response")
          console.log(error);
        })
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      {albumData.map((al) => {
        return (
          <TouchableOpacity onLongPress={() => navigation.navigate('Album',  {album: al.diarykey})}>
           {(al.img !== null && al.img !== "") && <Image source={{ uri: al.img }} style={{ width: 200, height: 200}} />}
        </TouchableOpacity>
          );
      })}

    </View>

  );
}

export default PictureScreen;