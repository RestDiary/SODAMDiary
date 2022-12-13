import * as React from 'react';
import { Button, View, Text, Dimensions, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Alert, ImageBackground, StatusBar } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
// import { greaterOrEq } from 'react-native-reanimated';
import { Entypo, AntDesign ,FontAwesome, MaterialIcons   } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SimpleLineIcons } from '@expo/vector-icons';


//사용 디바이스 크기 값 받아오기
const { width: SCREEN_WIDTH ,height:SCREEN_HEIGHT} = Dimensions.get('window');

function HomeScreen({ navigation }) {

    //로그인 여부 확인
    React.useEffect(() => {
        isLogin()
    }, [])
    
    const isLogin = async() => {
        const userId = await AsyncStorage.getItem('id')
        if(!userId){
            Alert.alert("로그인 후에 이용해 주세요.")
            navigation.navigate("Login")
        }
    }

    //링크 이동
    const moveNavigate = (screen) => {
        navigation.navigate(screen)
    }

    return (
        <View style={styles.container}>
            <SafeAreaView>
                <StatusBar barStyle="light-content"/>
                <ScrollView>
                    {/* 테마 대표 이미지 넣기 */}
                    <View style={styles.imgBox}>
                        {/* 이미지 들어가는 자리 */}
                        <ImageBackground style={{height:'100%', width:'100%'}} source={require('../assets/images/nightStar.png')}>

                            <TouchableOpacity onPress={() => navigation.openDrawer()}>
                                <View style={{marginLeft:'5.5%', marginTop:'6%',}}>
                                    <SimpleLineIcons name="menu" size={24} color="white" />
                                </View>
                            </TouchableOpacity>

                        </ImageBackground>

                    </View>

                    <View style={styles.content}>
                        {/* 새로로 긴 위젯을 위한 위젯 나누기 View */}
                        <View style={styles.headWidgetContainer}>
                                <View style={styles.headWidgetDiv1} >
                                    <TouchableOpacity  onPress={(screen) => moveNavigate('Calender')}>
                                        <View style={{...styles.longWidget, backgroundColor: '#262955'}}>
                                            <Entypo name="calendar" size={24} color="white" />
                                            <Text style={styles.textStyle}>calender</Text>
                                        </View>
                                        
                                    </TouchableOpacity>
                                </View>
                                <View  style={styles.headWidgetDiv2}>
                                    <View style={styles.smallWidgetContaner}>
                                        <TouchableOpacity onPress={(screen) => moveNavigate('Chart')}>
                                            <View style={{...styles.smallWidget, backgroundColor:'#BF2311'}}>
                                                <AntDesign name="piechart" size={24} color="white" />
                                                <Text style={styles.textStyle}>chart</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.smallWidgetContaner}>
                                        <TouchableOpacity onPress={(screen) => moveNavigate('Diary')}>
                                            <View style={{...styles.smallWidget, backgroundColor:'#456185'}}>
                                                <Entypo name="list" size={24} color="white" />
                                                <Text style={styles.textStyle}>diary</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                        </View>
                        <View style={styles.widgetContainer}>
                            <View style={styles.smallWidgetContaner}>
                            <TouchableOpacity onPress={(screen) => moveNavigate('Picture')}>
                                    <View style={{...styles.smallWidget, backgroundColor:'#274180'}}>
                                        <MaterialIcons name="photo-album" size={24} color="white" />
                                        <Text style={styles.textStyle}>picture</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.smallWidgetContaner}>
                                <TouchableOpacity onPress={(screen) => moveNavigate('Write')}>
                                    <View style={{...styles.smallWidget, backgroundColor:'#152F5E'}}>
                                        <FontAwesome name="pencil-square-o" size={24} color="white" />  
                                        <Text style={styles.textStyle}>write</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.widgetContainer}>
                            <View style={styles.smallWidgetContaner}>
                            <TouchableOpacity onPress={(screen) => moveNavigate('Share')}>
                                    <View style={{...styles.smallWidget2, backgroundColor:'#456185'}}>
                                        <Entypo name="shareable" size={24} color="white" />
                                        <Text style={styles.textStyle}>Share</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

export default HomeScreen;

// 반응형 css
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'black',
        flexDirection:'column',
        width:SCREEN_WIDTH,
    },
    imgBox:{
        height:SCREEN_HEIGHT/3,
        width:SCREEN_WIDTH,
        justifyContent:'center',
        alignItems:'center',
    },
    content:{

    },
    headWidgetContainer:{
        flexDirection:'row',
        width:SCREEN_WIDTH,
        height:SCREEN_HEIGHT/2.4,       
    },
    headWidgetDiv1:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    headWidgetDiv2:{
        flexDirection:'column',
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    widgetContainer:{
        flexDirection:'row',
        width:SCREEN_WIDTH,
        height:SCREEN_HEIGHT/4.8,
    },
    longWidget:{
        height:SCREEN_HEIGHT/2.6,
        width:SCREEN_WIDTH/2.4,
        borderRadius: 20,
        alignItems:'center',
        justifyContent:'center',
    },
    smallWidgetContaner:{
        flex:1,
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
    },
    smallWidget:{
        height:SCREEN_HEIGHT/5.8,
        width:SCREEN_WIDTH/2.4,
        backgroundColor:'#de8260',
        alignItems:'center',
        justifyContent:'center',
        borderRadius: 20,
    },
    smallWidget2:{
        height:SCREEN_HEIGHT/5.8,
        width:SCREEN_WIDTH/1.1,
        backgroundColor:'#de8260',
        alignItems:'center',
        justifyContent:'center',
        borderRadius: 20,
    },
    textStyle:{
        color:'white',
    }
})