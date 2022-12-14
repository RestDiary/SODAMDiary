import React, { useEffect, useState } from 'react';
import { View, Text, Button, Image, Dimensions, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import axios from 'axios';
import { dark, votanical, town, classic, purple, block, pattern, magazine, winter } from './screens/css/globalStyles';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
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
import NewPwScreen from './screens/NewPwScreen';
import ChangeEmailScreen from './screens/ChangeEmailScreen';
import UserInfoScreen from './screens/UserInfoScreen';
import LoginScreen from './screens/LoginScreen';
import ShareScreen from './screens/ShareScreen'; 
import ShareAllScreen from './screens/ShareAllScreen';

import ThemeScreen from './screens/ThemeScreen';
import AsyncStorage from "@react-native-async-storage/async-storage";

import DetailScreen from './screens/DetailScreen';
import ModifyScreen from './screens/ModifyScreen';
import PictureDeailScreen from './screens/PictureDeailScreen';
import MyPieChart from './screens/component/charts/MyPieChart';
import EmotionPieChart from './screens/component/charts/EmotionPieChart';


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

//?????? ???????????? ?????? ??? ????????????
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

//Drawer
function CustomDrawerContent(props) {
  //????????? ????????? ??? lifecycle ??????
  const isFocused = useIsFocused();
  //??????
  const [nowTheme, setNowTheme] = useState(dark);

  useEffect(() => {
    getTheme()
  }, [isFocused])
  
  useEffect(() => {
    getPieData()
  },[])


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
  const [pieData, setPieData] = useState([]);

  //???????????? ??????
  const logOut = async () => {
    try {
      await AsyncStorage.removeItem('id')
      Alert.alert("???????????? ???????????????.")
      navigation.navigate("Login")
    } catch (e) {
      console.log(e)
    }
  }

  //????????? ?????? ?????? ???
  const deleteAll = () => {
    Alert.alert(
      "????????? ?????? ???????????????????",
      "??? ??? ??????????????? ????????? ??? ?????????!",
      [                           
        {
          text: "???",                              
          onPress: () => deleteAll2(),    
          style: "cancel"
        },
        { text: "?????????", onPress: () => console.log("?????????") }, 
      ],
      { cancelable: false }
    )
    
  }

  const deleteAll2 = async() => {
    await axios({
      method: "post",
      url: 'http://people-env.eba-35362bbh.ap-northeast-2.elasticbeanstalk.com:3001/deleteAll',
      params: {
        id: id, 
      }
    }, null)
      .then(res => {
        alert("????????? ????????? ???????????????.")
      })
      .catch(function (error) {
        Alert.alert("???error : bad response")
      })
  }

   // ?????? ?????? ?????? ?????? ???
   const withdrawal = () => {
    Alert.alert(
      "?????? ??????????????????????",
      "?????? ????????? ??? ????????????!",
      [                           
        {
          text: "???",                              
          onPress: () => withdrawal2(),    
          style: "cancel"
        },
        { text: "?????????", onPress: () => console.log("?????????") }, 
      ],
      { cancelable: false }
    )
    
  }


  const withdrawal2 = async() => {
    await axios({
      method: "post",
      url: 'http://people-env.eba-35362bbh.ap-northeast-2.elasticbeanstalk.com:3001/withdrawal',
      params: {
        id: id, 
      }
    }, null)
      .then(async res => {
        await AsyncStorage.removeItem('id');
        alert("?????????????????????.");
        navigation.navigate("Login");

      })
      .catch(function (error) {
        Alert.alert("???error : bad response")
      })
  }


  useEffect(() => {
    AsyncStorage.getItem('id', (err, result) => {
      setId(result)
    });
  }, [])

  //getPiedata
  const getPieData = async() => {
    let userId = await AsyncStorage.getItem('id')

    await axios({
      method: "post",
      url: 'http://people-env.eba-35362bbh.ap-northeast-2.elasticbeanstalk.com:3001/ratio',
      params: {
        id: userId, 
      }
    }, null)
      .then(res => {
        setPieData(res.data)
      })
      .catch(function (error) {
        Alert.alert("???error : bad response")
      })
  }

  return (
    <DrawerContentScrollView style={{ ...styles.drawerBox, backgroundColor: nowTheme.drawer }} {...props} contentContainerStyle={{ flex: 1 }}>
      <View style={{ height: SCREEN_HEIGHT / 5, alignItems: 'center', justifyContent: "center", flexDirection: 'row' }}>
        <Image resizeMode='contain' style={{ height: SCREEN_HEIGHT / 5 }} source={nowTheme.logo} />
      </View>

      {/* <DrawerItemList {...props} /> */}

      <View style={{ alignItems: "flex-end", marginRight: 24, }}>
        <TouchableOpacity style={{ ...styles.nameBox, backgroundColor:nowTheme.btn}}>
          <Text style={{ color: "white", fontWeight: 'bold' }}>
            {id} ???
          </Text>
        </TouchableOpacity>
      </View>


{/* ???????????? */}
{pieData.length > 0 ? (
        <EmotionPieChart data={pieData} />
      ) : (
        <ActivityIndicator size="large" color="white" />
      )}

      

        {/* ???????????? ?????? */}
        <View style={{ marginTop: 20 }}>
          <TouchableOpacity style={{...styles.drawerItem,backgroundColor:nowTheme.btn}}
            // label="Close drawer"
            onPress={() => props.navigation.navigate('Theme')}
          >
            <MaterialCommunityIcons name="theme-light-dark" size={24} color="white" />
            <Text style={styles.drawerItemText}>????????????</Text>
          </TouchableOpacity>
        </View>

        {/* ???????????? ?????? ?????? */}
        <View>
          <TouchableOpacity style={{...styles.drawerItem,backgroundColor:nowTheme.btn}}
            // label="Close drawer"
            onPress={() => props.navigation.navigate("UserInfo")}
          >
            <FontAwesome5 name="user" size={24} color="white" />
            <Text style={styles.drawerItemText}> ????????????</Text>
          </TouchableOpacity>
        </View>

        {/* ????????? ?????? */}
        <View>
          <TouchableOpacity style={{...styles.drawerItem,backgroundColor:nowTheme.btn}}
            // label="Close drawer"
            onPress={() => deleteAll()}
          >
            <Ionicons name="refresh" size={24} color="red" />
            <Text style={styles.drawerItemText}>?????????</Text>
          </TouchableOpacity>
        </View>


        {/* ???????????? ?????? */}
        <View style={{}}>
          <TouchableOpacity style={{...styles.drawerItem,backgroundColor:nowTheme.btn}}
            // label="Close drawer"
            onPress={() => logOut()}
          >
            <MaterialIcons name="logout" size={24} color="white" />
            <Text style={styles.drawerItemText}>????????????</Text>
          </TouchableOpacity>
        </View>

        {/* ???????????? ?????? */}
        <View>
          <TouchableOpacity style={{...styles.drawerItem,backgroundColor:nowTheme.btn}}
            // label="Close drawer"
            onPress={() => withdrawal()}
          >
            <AntDesign name="deleteuser" size={24} color="red" />
            <Text style={styles.drawerItemText}>????????????</Text>
          </TouchableOpacity>
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
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false, headerTintColor: "black" }} />
      <Stack.Screen name="Home" component={MyDrawer} options={{ headerShown: false, headerTintColor: "black" }} />

      {/* Home */}
      <Stack.Screen name="Calender" component={CalenderScreen} options={{  headerTintColor: "black", headerShown: false }} />
      <Stack.Screen name="Chart" component={ChartScreen} options={{ headerTintColor: "black", headerShown: false }} />
      <Stack.Screen name="Write" component={WriteScreen} options={{ headerTintColor: "black", headerShown: false }} />
      <Stack.Screen name="Diary" component={DiaryScreen} options={{ headerTintColor: "black", headerShown: false }} />
      <Stack.Screen name="Picture" component={PictureScreen} options={{ headerTintColor: "black", headerShown: false }} />
      <Stack.Screen name="Share" component={ShareScreen} options={{ headerTintColor: "black", headerShown: false }}/>

      {/* ?????? ????????? */}
      <Stack.Screen name="Join" component={JoinScreen} options={{ title: "????????????", headerTintColor: "black", headerShown: false }} />
      <Stack.Screen name="FindPw" component={FindPwScreen} options={{ title: "???????????? ??????", headerTintColor: "black", headerShown: false }} />
      <Stack.Screen name="ChangePw" component={ChangePwScreen} options={{ headerTintColor: "black", headerShown: false }} />
      <Stack.Screen name="NewPw" component={NewPwScreen} options={{ headerTintColor: "black", headerShown: false }} />
      <Stack.Screen name="ChangeEmail" component={ChangeEmailScreen} options={{ headerTintColor: "black", headerShown: false }} />
      <Stack.Screen name="UserInfo" component={UserInfoScreen} options={{ headerTintColor: "black", headerShown: false }} />
      <Stack.Screen name="Theme" component={ThemeScreen} options={{ headerTintColor: "black" , headerShown: false}} />
      <Stack.Screen name="Detail" component={DetailScreen} options={{ headerTintColor: "black" , headerShown: false}} />
      <Stack.Screen name="Modify" component={ModifyScreen} options={{ headerTintColor: "black" , headerShown: false}} />
      <Stack.Screen name="Album" component={PictureDeailScreen} options={{ headerTintColor: "black", headerShown: false }} />
      <Stack.Screen name="ShareAll" component={ShareAllScreen} options={{ headerTintColor: "black", headerShown: false }}/>

    </Stack.Navigator>
  );
}

export default function App() {
  useEffect (()=>{
    defaultTheme()
  },[])

  const defaultTheme = async() => {
    let theme = await AsyncStorage.getItem('theme');
    if(!theme){
      await AsyncStorage.setItem('theme', "dark");
    }
  }

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