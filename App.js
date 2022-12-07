import * as React from 'react';
import { View, Text, Button, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

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

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

//Drawer
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      
      <View style={{backgroundColor:"#f6f6f6", padding:15, height:350}}>
        <Image source={require('./assets/images/logo.png')}
        />
      </View>

      <DrawerItemList {...props} />

      <DrawerItem
        label="Close drawer"
        onPress={() => props.navigation.closeDrawer()}
      />

      <DrawerItem
        label="Toggle drawer"
        onPress={() => props.navigation.toggleDrawer()}
      />

    </DrawerContentScrollView>
  );
}

function MyDrawer() {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      drawerStyle={{backgroundColor:'#C6CBEF'}}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="drawerHome" options={{ headerShown: false }} component={HomeScreen} />
    </Drawer.Navigator>
  );
}

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
      <Stack.Screen name="Home" options={{ headerShown: false }} component={MyDrawer} />

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
