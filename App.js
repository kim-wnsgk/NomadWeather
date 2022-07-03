import { StatusBar } from 'expo-status-bar';
import React, { useState, useDffect, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import * as Location from 'expo-location';

const winWidth = Dimensions.get('window').width
const winHeight = Dimensions.get('window').height

export default function App() {
  const [location, setLocation] = useState(null);
  const [ok, setOk] = useState(true);

  useEffect(() => {
    ask();
  }, [])

  const ask = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }
    const {
      coords: { latitude, logitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 })
    colsole.log(location);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.city}>
        <Text style={styles.cityName}>Suwon</Text>
      </View>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={true}
        persistentScrollbar={true}
        contentContainerStyle={styles.weather}>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
      </ScrollView >
    </View>

  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(147, 255, 255, 0.986)",

  },
  city: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

  },
  cityName: {
    color: "white",
    fontSize: 50,
    fontWeight: "600",
  },
  weather: {
    backgroundColor: 'yellow',
  },
  day: {
    width: winWidth - 60,
    alignItems: "center",
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 30,
  },
  temp: {
    marginTop: 20,
    fontSize: 188,
  },
  description: {
    marginTop: -20,
    fontSize: 68,
  }
})