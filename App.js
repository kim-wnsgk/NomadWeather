import { StatusBar } from 'expo-status-bar';
import React, { useState, useDffect, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';

const winWidth = Dimensions.get('window').width;
const winHeight = Dimensions.get('window').height;

const API_KEY = `2de0ea15145d0846e423576784651531`;

import { Fontisto } from "@expo/vector-icons";
const icons = {
  Clouds: "cloudy",
  Clear: "day-sunny",
  Atmosphere: "cloudy-gusts",
  Snow: "snow",
  Rain: "rains",
  Drizzle: "rain",
  Thunderstorm: "lightning",
}

export default function App() {
  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);

  const getWeather = async () => {
    const permission = await Location.requestForegroundPermissionsAsync();
    //console.log(permission.granted);

    if (!permission.granted) {
      setOk(false);
    }
    const locationDetail = await Location.getCurrentPositionAsync({ accuracy: 5 })
    const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({ accuracy: 5 })
    //console.log(locationDetail);

    const location = await Location.reverseGeocodeAsync({ latitude, longitude }, { useGoogleMaps: false })

    console.log(location[0].city);
    setCity(location[0].city);

    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric`);

    const weatherJson = await response.json();

    setDays(weatherJson.daily);
  }

  useEffect(() => {
    getWeather();
  }, [])


  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={true}
        persistentScrollbar={true}
        contentContainerStyle={styles.weather}>
        {days.length === 0 ? (
          <View style={styles.day}>
            <ActivityIndicator
              color="white"
              style={{ marginTop: 10 }}
              size="large"
            />
          </View>
        ) : (
          days.map((day, index) => (
            <View key={index} style={styles.day}>
              <Text style={styles.temp}>
                {parseFloat(day.temp.day).toFixed(1)}<Text style={{ fontSize: 80 }}>℃</Text>
              </Text>
              <Text style={styles.description}>
                {day.weather[0].main}
                <Fontisto
                  name={icons[day.weather[0].main]}
                  size={68}
                  color="white"
                  style={{ margin: 100 }}
                />
              </Text>
              <Text style={styles.tinyText}>{day.weather[0].description}</Text>
            </View>
          ))
        )}
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
    //backgroundColor: 'yellow',
  },
  day: {
    width: winWidth - 25,
    //alignItems: "center",
    //backgroundColor: 'white',
    //borderRadius: 10,
    marginTop: 100,
    marginLeft: 25,
  },
  temp: {
    marginTop: 20,
    fontSize: 100,
  },
  description: {
    marginTop: -20,
    fontSize: 48,
  },
  tinyText: {
    fontSize: 20,
  }
})