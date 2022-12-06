import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//screen
import CalenderScreen from './screens/CalenderScreen';
import WriteScreen from './screens/WriteScreen';
import PictureScreen from './screens/PictureScreen';
import JoinScreen from './screens/JoinScreen';
import DiaryScreen from './screens/DiaryScreen';
import ChartScreen from './screens/ChartScreen';
import HomeScreen from './screens/Home';
import FindPwScreen from './screens/FindPwScreen';
import ChangePwScreen from './screens/ChangePwScreen';
import LoginScreen from './screens/LoginScreen';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
      <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />

      {/* Home */}
      <Stack.Screen name="Calender" component={CalenderScreen} />
      <Stack.Screen name="Chart" component={ChartScreen} />
      <Stack.Screen name="Write" component={WriteScreen} />
      <Stack.Screen name="Diary" component={DiaryScreen} />
      <Stack.Screen name="Picture" component={PictureScreen} />

      {/* 기타 스크린 */}
      <Stack.Screen name="Join" options={{ title:"회원가입" }} component={JoinScreen} />
      <Stack.Screen name="FindPw" options={{ title:"비밀번호 찾기" }} component={FindPwScreen} />
      <Stack.Screen name="ChangePw" component={ChangePwScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
