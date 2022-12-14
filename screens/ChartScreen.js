import React, { useEffect, useState } from 'react';
import { Button, View, Text, Dimensions } from 'react-native';
import { dark, votanical, town, classic, purple, block, pattern, magazine, winter } from './css/globalStyles';
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyLineChart from './component/charts/MyLineChart';

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
    else if (selectedTheme.includes("classic")) setNowTheme(classic);
    else if (selectedTheme.includes("purple")) setNowTheme(purple);
    else if (selectedTheme.includes("block")) setNowTheme(block);
    else if (selectedTheme.includes("pattern")) setNowTheme(pattern);
    else if (selectedTheme.includes("magazine")) setNowTheme(magazine);
    else if (selectedTheme.includes("winter")) setNowTheme(winter);
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: nowTheme.cardBg }}>
      <MyLineChart/>

    </View>
  );
}

export default ChartScreen;