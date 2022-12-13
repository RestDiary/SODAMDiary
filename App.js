import React, { useEffect, useState } from 'react';
import { View, Text, Button, Image, Dimensions, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { dark, votanical, town, classic, purple, block, pattern, magazine, winter } from './screens/css/globalStyles';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useIsFocused } from '@react-navigation/native';
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
import ShareScreen from './screens/ShareScreen'; 
import ShareAllScreen from './screens/ShareAllScreen';

import ThemeScreen from './screens/ThemeScreen';
import AsyncStorage from "@react-native-async-storage/async-storage";

import DetailScreen from './screens/DetailScreen';
import ModifyScreen from './screens/ModifyScreen';
import PictureDeailScreen from './screens/PictureDeailScreen';


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

//사용 디바이스 크기 값 받아오기
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

//Drawer
function CustomDrawerContent(props) {
  //스크린 이동할 때 lifecycle 실행
  const isFocused = useIsFocused();
  //테마
  const [nowTheme, setNowTheme] = useState({});

  useEffect(() => {
    getTheme()
  }, [isFocused])

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

  const [id, setId] = useState("");
  const navigation = useNavigation();

  //로그아웃 버튼
  const logOut = async () => {
    try {
      await AsyncStorage.removeItem('id')
      Alert.alert("로그아웃 되었습니다.")
      navigation.navigate("Login")
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    AsyncStorage.getItem('id', (err, result) => {
      setId(result)
    });
  }, [])

  return (
    <DrawerContentScrollView style={{ ...styles.drawerBox, backgroundColor: nowTheme.drawer }} {...props} contentContainerStyle={{ flex: 1 }}>
      <View style={{ height: SCREEN_HEIGHT / 5, alignItems: 'center', justifyContent: "center", flexDirection: 'row' }}>
        <Image resizeMode='contain' style={{ height: SCREEN_HEIGHT / 5 }} source={nowTheme.logo} />
      </View>

      {/* <DrawerItemList {...props} /> */}

      <View style={{ alignItems: "flex-end", marginRight: 24, }}>
        <TouchableOpacity style={{ ...styles.nameBox, backgroundColor:nowTheme.btn}}>
          <Text style={{ color: "white", fontWeight: 'bold' }}>
            {id} 님
          </Text>
        </TouchableOpacity>
      </View>



      {/* 감정차트*/}
      <View style={{ marginTop: 20 }}>
        {/* 행복 */}
        <Text style={{ color: "white", marginLeft: 24, marginBottom: 8, fontWeight: 'bold' }}>
          Happy
        </Text>
        <View style={styles.drawerChart}>
          <View style={styles.drawerInnerChart}></View>
        </View>

        {/* 중립 */}
        <Text style={{ color: "white", marginLeft: 24, marginBottom: 8, fontWeight: 'bold' }}>
          Netural
        </Text>
        <View style={styles.drawerChart}>
          <View style={styles.drawerInnerChart2}></View>
        </View>

        {/* 슬픔 */}
        <Text style={{ color: "white", marginLeft: 24, marginBottom: 8, fontWeight: 'bold' }}>
          Sad
        </Text>
        <View style={styles.drawerChart}>
          <View style={styles.drawerInnerChart3}></View>
        </View>

        {/* 테마변경 기능 */}
        <View style={{ marginTop: 20 }}>
          <TouchableOpacity style={{...styles.drawerItem,backgroundColor:nowTheme.btn}}
            // label="Close drawer"
            onPress={() => props.navigation.navigate('Theme')}
          >
            <MaterialCommunityIcons name="theme-light-dark" size={24} color="white" />
            <Text style={styles.drawerItemText}>테마변경</Text>
          </TouchableOpacity>
        </View>

        {/* 백업 기능 */}
        <View>
          <TouchableOpacity style={{...styles.drawerItem,backgroundColor:nowTheme.btn}}
            // label="Close drawer"
            onPress={() => props.navigation.navigate("백업기능")}
          >
            <MaterialCommunityIcons name="backup-restore" size={24} color="white" />
            <Text style={styles.drawerItemText}>백업</Text>
          </TouchableOpacity>
        </View>

        {/* 초기화 기능 */}
        <View>
          <TouchableOpacity style={{...styles.drawerItem,backgroundColor:nowTheme.btn}}
            // label="Close drawer"
            onPress={() => props.navigation.navigate("초기화기능")}
          >
            <Ionicons name="refresh" size={24} color="red" />
            <Text style={styles.drawerItemText}>초기화</Text>
          </TouchableOpacity>
        </View>

        {/* 공유 기능 */}
        <View>
          <TouchableOpacity style={{...styles.drawerItem,backgroundColor:nowTheme.btn}}
            // label="Close drawer"
            onPress={() => props.navigation.navigate("공유기능")}
          >
            <Entypo name="share" size={24} color="white" />
            <Text style={styles.drawerItemText}>공유</Text>
          </TouchableOpacity>
        </View>

        {/* 로그아웃 기능 */}
        <View style={{}}>
          <TouchableOpacity style={{...styles.drawerItem,backgroundColor:nowTheme.btn}}
            // label="Close drawer"
            onPress={() => logOut()}
          >
            <MaterialIcons name="logout" size={24} color="white" />
            <Text style={styles.drawerItemText}>로그아웃</Text>
          </TouchableOpacity>
        </View>
      </View>
    </DrawerContentScrollView>
  );
}

function MyDrawer() {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      drawerStyle={{ backgroundColor: '#C6CBEF' }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="home" options={{ headerShown: false }} component={HomeScreen} />

    </Drawer.Navigator>
  );
}

function MyStack() {
  //스크린 이동할 때 lifecycle 실행
  const isFocused = useIsFocused();
  //테마
  const [nowTheme, setNowTheme] = useState({});

  useEffect(() => {
    getTheme()
  }, [isFocused])

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
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false, headerTintColor: "black" }} />
      <Stack.Screen name="Home" component={MyDrawer} options={{ headerShown: false, headerTintColor: "black" }} />

      {/* Home */}
      <Stack.Screen name="Calender" component={CalenderScreen} options={{ headerTintColor: "black" }} />
      <Stack.Screen name="Chart" component={ChartScreen} options={{ headerTintColor: "black" }} />
      <Stack.Screen name="Write" component={WriteScreen} options={{ headerTintColor: "black" }} />
      <Stack.Screen name="Diary" component={DiaryScreen} options={{ headerTintColor: "black" }} />
      <Stack.Screen name="Picture" component={PictureScreen} options={{ headerTintColor: "black" }} />
      <Stack.Screen name="Share" component={ShareScreen} options={{ headerTintColor: "black" }}/>

      {/* 기타 스크린 */}
      <Stack.Screen name="Join" component={JoinScreen} options={{ title: "회원가입", headerTintColor: "black" }} />
      <Stack.Screen name="FindPw" component={FindPwScreen} options={{ title: "비밀번호 찾기", headerTintColor: "black" }} />
      <Stack.Screen name="ChangePw" component={ChangePwScreen} options={{ headerTintColor: "black" }} />
      <Stack.Screen name="Theme" component={ThemeScreen} options={{ headerTintColor: "black" }} />
      <Stack.Screen name="Detail" component={DetailScreen} options={{ headerTintColor: "black" }} />
      <Stack.Screen name="Modify" component={ModifyScreen} options={{ headerTintColor: "black" }} />
      <Stack.Screen name="Album" component={PictureDeailScreen} options={{ headerTintColor: "black" }} />
      <Stack.Screen name="ShareAll" component={ShareAllScreen} options={{ headerTintColor: "black" }}/>

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

const styles = StyleSheet.create({
  nameBox: {
    padding: 6,
    backgroundColor: "#456185",
    borderRadius: 10,
  }
  ,
  drawerBox: {
    backgroundColor: "#071D3A",
    borderRightWidth: 1,
    borderColor: "#555",
  },

  drawerChart: {
    width: "90%",
    height: "3%",
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 8,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#555",
    backgroundColor: "white",
  },

  drawerInnerChart: {
    width: "70%",
    height: "100%",
    borderRadius: 100,
    borderRightWidth: 1,
    borderColor: "#fff",
    backgroundColor: "#9f3e8f",
  },

  drawerInnerChart2: {
    width: "40%",
    height: "100%",
    borderRadius: 100,
    borderRightWidth: 1,
    borderColor: "#fff",
    backgroundColor: "#c17c7c",
  },

  drawerInnerChart3: {
    width: "50%",
    height: "100%",
    borderRadius: 100,
    borderRightWidth: 1,
    borderColor: "#fff",
    backgroundColor: "#1e654b",
  },

  drawerItem: {
    padding: 16,
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 8,
    backgroundColor: "#456185",
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: "center",
    opacity: 0.8,
  },

  drawerItemText: {
    marginLeft: 4,
    color: "white",
    fontWeight: "bold",
  },
})