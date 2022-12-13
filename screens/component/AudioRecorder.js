import React, { useEffect } from 'react';
import { Text, View, StyleSheet, Button, Touchable, TouchableOpacity, Dimensions } from 'react-native';
import { Audio } from 'expo-av';
import { SimpleLineIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

//녹음 설정
const recordingOptions = {
  android: {
    extension: '.m4a',
    outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
    audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
    sampleRate: 44100,
    numberOfChannels: 2,
    bitRate: 128000,
  },
  ios: {
    extension: '.wav',
    audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
    sampleRate: 44100,
    numberOfChannels: 1,
    bitRate: 128000,
    linearPCMBitDepth: 16,
    linearPCMIsBigEndian: false,
    linearPCMIsFloat: false,
  },
};

export default function AudioRecorder({ getAudio }) {
  const [recording, setRecording] = React.useState();

  //녹음 시작
  async function startRecording() {
    try {
      console.log('Requesting permissions..');
      getAudio(undefined, true)
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log('Starting recording..');
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(recordingOptions);
      await recording.startAsync();

      setRecording(recording);
      console.log('Recording started');

    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  //녹음 종료
  async function stopRecording() {
    setRecording(undefined);
    await recording.stopAndUnloadAsync();

    //녹음파일 객체 생성
    const { sound, status } = await recording.createNewLoadedSoundAsync();

    const audio = {
      sound: sound,
      file: recording.getURI(),
      duration: getDurationFormatted(status.durationMillis),
      status: status
    }

    //부모에게 전달
    getAudio(audio, false)
  }

  //시간 표시
  function getDurationFormatted(millis) {
    const minutes = millis / 1000 / 60;
    const minutesDisplay = Math.floor(minutes);
    const seconds = Math.round((minutes - minutesDisplay) * 60);
    const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutesDisplay}:${secondsDisplay}`;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} onPress={recording ? stopRecording : startRecording}>
        {recording ?
          <>
            <MaterialCommunityIcons name="stop" size={60} color="red" />
          </>
          :
          <>
            <SimpleLineIcons name="microphone" size={40} color="black" />
          </>
        }
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH / 3,
    height: SCREEN_HEIGHT / 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
  },

  noteText: {
    fontSize: 12,
    marginTop: 5,
  },
  button: {
    width: 50,
    margin: 16
  }
});