import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//screen
import CalenderScreen from './screens/CalenderScreen';
import WriteScreen from './screens/WriteScreen';
import SettingScreen from './screens/SettingScreen';
import PictureScreen from './screens/PictureScreen';
import MyPageScreen from './screens/MyPageScreen';
import DiaryScreen from './screens/DiaryScreen';
import ChartScreen from './screens/ChartScreen';
import HomeScreen from './screens/Home';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown:false }} name="Home" component={HomeScreen} />
        <Stack.Screen name="Calender" component={CalenderScreen} />
        <Stack.Screen name="Write" component={WriteScreen} />
        <Stack.Screen name="Setting" component={SettingScreen} />
        <Stack.Screen name="Picture" component={PictureScreen} />
        <Stack.Screen name="MyPage" component={MyPageScreen} />
        <Stack.Screen name="Diary" component={DiaryScreen} />
        <Stack.Screen name="Chart" component={ChartScreen} />
      </Stack.Navigator>
    </>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
