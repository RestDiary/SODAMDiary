import * as React from 'react';
import { Button, View, Text, Dimensions, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

function HomeScreen({ navigation }) {

    //링크 이동
    const moveNavigate = (screen) => {
        navigation.navigate(screen)
    }

    return (
        <View style={styles.container}>
            <SafeAreaView>
                <ScrollView>
                    <View style={styles.imgBox}>
                        {/* 이미지 들어가는 자리 */}
                        <Text style={{ color: 'white' }}>사진 넣기</Text>
                    </View>

                    {/* 링크 버튼들 */}
                    <View style={styles.linkContainer}>
                        <TouchableOpacity onPress={(screen) => moveNavigate('Calender')}>
                            <View style={{ ...styles.linkView, backgroundColor: '#252958' }}>
                                <Text style={styles.linkText}>calender</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={(screen) => moveNavigate('Chart')}>
                            <View style={{ ...styles.linkView, backgroundColor: '#BF2311' }}>
                                <Text style={styles.linkText}>chart</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.linkContainer}>
                        <TouchableOpacity onPress={(screen) => moveNavigate('Diary')}>
                            <View style={{ ...styles.linkView, backgroundColor: '#456185' }}>
                                <Text style={styles.linkText}>diary</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={(screen) => moveNavigate('MyPage')}>
                            <View style={{ ...styles.linkView, backgroundColor: '#274180' }}>
                                <Text style={styles.linkText}>mypage</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.linkContainer}>
                        <TouchableOpacity onPress={(screen) => moveNavigate('Write')}>
                            <View style={{ ...styles.linkView, backgroundColor: '#152F5E' }}>
                                <Text style={styles.linkText}>write</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={(screen) => moveNavigate('Setting')}>
                            <View style={{ ...styles.linkView, backgroundColor: '#ED7C58' }}>
                                <Text style={styles.linkText}>setting</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.linkContainer}>
                        <TouchableOpacity onPress={(screen) => moveNavigate('Picture')}>
                            <View style={{ ...styles.linkView, backgroundColor: '#252958' }}>
                                <Text style={styles.linkText}>picture</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    imgBox: {
        width: SCREEN_WIDTH,
        height: 380,
        backgroundColor: '#274180',
        justifyContent: 'center',
        alignItems: 'center',
    },
    linkContainer: {
        width: SCREEN_WIDTH,
        height: 'auto',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        marginTop: 20,
    },
    linkView: {
        width: 154,
        height: 110,
        borderRadius: 20,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
    },
    linkText: {
        color: 'white'
    }
})