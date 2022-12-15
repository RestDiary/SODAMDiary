import React, { useEffect, useState } from 'react';
import { Button, View, Text, StyleSheet, Dimensions } from 'react-native';
import { Audio } from 'expo-av';
import { dark, votanical, town, classic, purple, block, pattern, magazine, winter } from './../css/globalStyles';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function AudioPlayer(props) {
    //테마
    useEffect(() => {
        getTheme()
    }, [])

    const [nowTheme, setNowTheme] = useState({});

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

    const playAudio = async () => {
        const sound = new Audio.Sound();
        await sound.loadAsync({ uri: props.audio.file });
        console.log('Playing Sound');
        await sound.replayAsync();
    }

    return (
        <View style={{ ...styles.container, backgroundColor: nowTheme.back, borderWidth: 1, borderColor: nowTheme.cardBorder, borderRadius: 10, }}>
            <Text style={{ ...styles.noteText, color: nowTheme.cardBorder }}>{props.audio.duration}</Text>
            <TouchableOpacity style={{ ...styles.button }} onPress={playAudio} >
                <AntDesign name="play" size={24} color="white" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 16,
        padding: 10,
        width: SCREEN_WIDTH / 3,
        backgroundColor: 'blue',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: "row",
    },
    noteText: {
        fontSize: 18,
    },
    button: {

        alignItems: "center",
        justifyContent: "center",

    }
});