import * as React from 'react';
import { Button, View, Text } from 'react-native';


function LoginScreen({ navigation }) {
    //링크이동
    const moveNavigate = (screen) => {
        navigation.navigate(screen)
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>로그인 스크린</Text>
            <Button onPress={(screen) => moveNavigate("Home")} title="ㅎㅇ"></Button>
        </View>
    );
}

export default LoginScreen;