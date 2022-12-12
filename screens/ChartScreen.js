import React, { useEffect, useState } from 'react';
import { Button, View, Text } from 'react-native';
import {dark, votanical, town} from './css/globalStyles';
import AsyncStorage from "@react-native-async-storage/async-storage";

function ChartScreen({ navigation }) {
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
      // else if (selectedTheme === "votanical") setNowTheme(votanical);
      // else if (selectedTheme === "votanical") setNowTheme(votanical);
      // else if (selectedTheme === "votanical") setNowTheme(votanical);
      // else if (selectedTheme === "votanical") setNowTheme(votanical);
      // else if (selectedTheme === "votanical") setNowTheme(votanical);
  }    
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:nowTheme.bg }}>
      <Text>차트 스크린</Text>
    </View>
  );
}

export default ChartScreen;