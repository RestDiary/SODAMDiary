import * as React from 'react';
import { Button, View, Text, StyleSheet, Dimensions } from 'react-native';
import { Audio } from 'expo-av';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function AudioPlayer(props) {
    const playAudio = async () => {
        const sound = new Audio.Sound();
        await sound.loadAsync({ uri: props.audio.file });
        console.log('Playing Sound');
        await sound.replayAsync();
    }

    return (
        <View style={styles.container}>
            <Text style={styles.noteText}>{props.audio.duration}</Text>
            <Button style={styles.button} onPress={playAudio} title="Play"></Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: SCREEN_WIDTH/1.5,
        backgroundColor:'blue',
        justifyContent:'center',
        alignItems:'center',
    },
    noteText: {
        fontSize: 12,
        marginTop: 5,
        color:'white'
    },
    button: {
        width: 50,
        margin: 16
    }
});