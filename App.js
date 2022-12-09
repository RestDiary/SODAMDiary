import * as React from 'react';
import { View, Text, Button, Image, Dimensions, TouchableOpacity, StyleSheet, Alert, useState, useEffect } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
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
import DetailScreen from './screens/DetailScreen';

import AsyncStorage from "@react-native-async-storage/async-storage";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

//사용 디바이스 크기 값 받아오기
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

//Drawer
function CustomDrawerContent(props) {
  const [id, setId] = React.useState("");
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

  React.useEffect(() => {
    AsyncStorage.getItem('id', (err, result) => {
      setId(result)
    });
  },[])

  return (
    <DrawerContentScrollView style={styles.drawerBox} {...props} contentContainerStyle={{ flex: 1 }}>
      <View style={{ height: SCREEN_HEIGHT / 5, alignItems: 'center', justifyContent: "center", flexDirection: 'row' }}>
        <Image resizeMode='contain' style={{ height: SCREEN_HEIGHT / 5 }} source={require('./assets/images/logo.png')} />
      </View>

      {/* <DrawerItemList {...props} /> */}

      <View style={{alignItems:"flex-end",marginRight:24,}}>
        <TouchableOpacity style={{...styles.nameBox}}>
          <Text style={{ color:"white", fontWeight:'bold'}}>
            {id} 님
          </Text>
        </TouchableOpacity>
      </View>



      {/* 감정차트*/}
      <View style={{marginTop:20}}>
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
        <View style={{marginTop:20}}>
          <TouchableOpacity style={styles.drawerItem}
            // label="Close drawer"
            onPress={() => props.navigation.navigate("테마변경기능")}
          >
            <MaterialCommunityIcons name="theme-light-dark" size={24} color="white" />
            <Text style={styles.drawerItemText}>테마변경</Text>
          </TouchableOpacity>
        </View>

        {/* 백업 기능 */}
        <View>
          <TouchableOpacity style={styles.drawerItem}
            // label="Close drawer"
            onPress={() => props.navigation.navigate("백업기능")}
          >
            <MaterialCommunityIcons name="backup-restore" size={24} color="white" />
            <Text style={styles.drawerItemText}>백업</Text>
          </TouchableOpacity>
        </View>

        {/* 초기화 기능 */}
        <View>
          <TouchableOpacity style={styles.drawerItem}
            // label="Close drawer"
            onPress={() => props.navigation.navigate("초기화기능")}
          >
            <Ionicons name="refresh" size={24} color="red" />
            <Text style={styles.drawerItemText}>초기화</Text>
          </TouchableOpacity>
        </View>

        {/* 공유 기능 */}
        <View>
          <TouchableOpacity style={styles.drawerItem}
            // label="Close drawer"
            onPress={() => props.navigation.navigate("공유기능")}
          >
            <Entypo name="share" size={24} color="white" />
            <Text style={styles.drawerItemText}>공유</Text>
          </TouchableOpacity>
        </View>

        {/* 로그아웃 기능 */}
        <View style={{}}>
          <TouchableOpacity style={styles.drawerItem}
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
      <Stack.Screen name="Join" options={{ title: "회원가입" }} component={JoinScreen} />
      <Stack.Screen name="FindPw" options={{ title: "비밀번호 찾기" }} component={FindPwScreen} />
      <Stack.Screen name="ChangePw" component={ChangePwScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
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
  nameBox:{
    padding:6,
    backgroundColor:"#456185",
    borderRadius:10,
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