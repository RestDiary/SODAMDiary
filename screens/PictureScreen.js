import React, { useEffect, useState } from 'react';
import { Button, View, Text, Alert, Image,SafeAreaView,ScrollView } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { API } from '../config.js'
import { dark, votanical, town, classic, purple, block, pattern, magazine, winter } from './css/globalStyles';

function PictureScreen({ navigation }) {
  //테마
  useEffect(() => {
    getTheme()
  }, [])

const [nowTheme, setNowTheme] = useState({});

const getTheme = async () => {
    let selectedTheme = await AsyncStorage.getItem('theme');
    
    if (selectedTheme.includes("dark")) setNowTheme(dark);
    else if (selectedTheme.includes("votanical")) setNowTheme(votanical);
    else if (selectedTheme.includes("town")) setNowTheme(town);
    else if (selectedTheme.includes("classic")) setNowTheme(classic);
    else if (selectedTheme.includes("purple")) setNowTheme(purple);
    else if (selectedTheme.includes("block")) setNowTheme(block);
    else if (selectedTheme.includes("pattern")) setNowTheme(pattern);
    else if (selectedTheme.includes("magazine")) setNowTheme(magazine);
    else if (selectedTheme.includes("winter")) setNowTheme(winter);
}    
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
          console.log("들어온", res.data)
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
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:nowTheme.cardBg }}>
      <SafeAreaView>
        <ScrollView>
          {albumData.map((al) => {
            return (
              <TouchableOpacity onLongPress={() => navigation.navigate('Album', { album: al.diarykey })}>
                {(al.img !== null && al.img !== "") && <Image source={{ uri: al.img }} style={{ width: 200, height: 200 }} />}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </SafeAreaView>

    </View>

  );
}

export default PictureScreen;