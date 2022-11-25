import * as React from 'react';
import { Button, View, Text, Dimensions, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
// import { greaterOrEq } from 'react-native-reanimated';
import { Entypo, AntDesign ,FontAwesome, MaterialIcons   } from '@expo/vector-icons';
import {Image} from 'react-native';

//사용 디바이스 크기 값 받아오기
const { width: SCREEN_WIDTH ,height:SCREEN_HEIGHT} = Dimensions.get('window');

function HomeScreen({ navigation }) {

    //링크 이동
    const moveNavigate = (screen) => {
        navigation.navigate(screen)
    }

    return (
        <View style={styles.container}>
            <SafeAreaView>
                <ScrollView>
                    {/* 테마 대표 이미지 넣기 */}
                    <View style={styles.imgBox}>
                        {/* 이미지 들어가는 자리 */}
                        <Image source={require('../assets/images/nightStar.png')}></Image>
                        
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
                                <TouchableOpacity onPress={(screen) => moveNavigate('MyPage')}>
                                    <View style={{...styles.smallWidget, backgroundColor:'#274180'}}>
                                        <Text style={styles.textStyle}>MyPage</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.smallWidgetContaner}>
                                <TouchableOpacity onPress={(screen) => moveNavigate('Write')}>
                                    <View style={{...styles.smallWidget, backgroundColor:'#152F5E'}}>
                                        <FontAwesome name="pencil-square-o" size={24} color="white" />  
                                        <Text style={styles.textStyle}>Write</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.widgetContainer}>
                            <View style={styles.smallWidgetContaner}>
                                <TouchableOpacity onPress={(screen) => moveNavigate('Setting')}>
                                    <View style={{...styles.smallWidget, backgroundColor:'#ED7C58'}}>
                                        <Text style={styles.textStyle}>Setting</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.smallWidgetContaner}>
                                <TouchableOpacity onPress={(screen) => moveNavigate('Picture')}>
                                    <View style={{...styles.smallWidget, backgroundColor:'#252958'}}>
                                        <MaterialIcons name="photo-album" size={24} color="white" />
                                        <Text style={styles.textStyle}>Picture</Text>
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
        height:SCREEN_HEIGHT/2,
        width:SCREEN_WIDTH,
        backgroundColor:'black',
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
    textStyle:{
        color:'white',
    }
})