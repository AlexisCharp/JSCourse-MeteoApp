import React, { useState, useEffect } from 'react';
import {ActivityIndicator, Image, View, Text, StyleSheet, ImageBackground, DatePickerIOS, Platform} from 'react-native';
import Previsions from './Previsions';
import * as Font from 'expo-font';
// import Constants from 'expo-constants';
// import * as Location from 'expo-location';
// import * as Permissions from 'expo-permissions';

(async () => {
    await Font.loadAsync({
    'RobotoBold': {
        uri: require('../assets/fonts/RobotoBold.ttf'),
    },
    'RobotoLight': {
        uri: require('../assets/fonts/RobotoLight.ttf'),
    }
})
})

function Home(props) {

    const apikey = 'becfa4eb6b7a49c0838657d82bacaf9d';
    let city = 'Roma';
    let date = new Date();
    const [hours, setHours] = useState(date.getHours());
    const [minutes, setMinutes] = useState(date.getMinutes());
    const [localisation, setLocalisation] = useState('');
    const [temp, setTemp] = useState('');
    const [desc, setDesc] = useState('');
    
    useEffect(()=>{
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}&lang=en`)
        .then(data=>data.json())
        .then(data => {
            setTemp(data.main.temp.toFixed(0) + '°');
            setLocalisation(data.name);
            setDesc(data.weather[0].description);
            console.log(data);
        });
    }, [])

    

    setInterval(() => {
        date = new Date();
        if(date.getHours() < 10){
            setHours('0' + date.getHours());
        } else {
            setHours(date.getHours());
        }
        if(date.getMinutes() < 10){
            setMinutes('0' + date.getMinutes())
        } else {
            setMinutes(date.getMinutes());
        }
    }, 100);

    return (
        <View style={styles.container}>
            <View style={styles.menu}>
                <Image style={{width: 30, height: 30, marginTop: '5%'}} source={require('../assets/img/settings.png')}/>
                <Text style={styles.textMenu}>{localisation}</Text>
                <Image style={{width: 30, height: 30, marginTop: '5%'}} source={require('../assets/img/burgerMenu.png')}/>
            </View>
            <View style={styles.actualWeather}>
                <View style={{width: 100}}>
                    <Image style={{width: 100, height: 100}} source={require('../assets/img/littleRain.png')}/>
                </View>
                <View style={{width:100}}>
                    {/* <Text style={{width: 100, fontSize:30, color: '#666', textAlign: 'center', fontFamily : 'RobotoBold'}}>...</Text> */}
                    <Text style={{width: 100, fontSize:20, textAlign: 'center', fontFamily : 'RobotoLight'}}>{hours}:{minutes}</Text>
                </View>
                <Text style={{width: 100, fontSize:50, textAlign: 'center', fontFamily : 'RobotoBold'}}>{temp}</Text>
            </View>
            <View style={styles.actualWeatherIs}>
                <Text style={{textTransform: 'uppercase', fontFamily: 'RobotoLight'}}>The weather now is</Text>
                <Text style={styles.weatherIsText}>{desc}</Text>
            </View>
            <Previsions city={city}></Previsions>
        </View >
    );
}

const styles = StyleSheet.create({
    container : {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    menu : {
        marginTop: '5%',
        width: '100%',
        height: '10%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'space-around',
        alignItems: 'center',
        backgroundColor: '#f7bb42'
    },
    textMenu : {
        marginTop: '5%',
        textTransform: 'uppercase',
        fontFamily : 'RobotoBold',
        fontSize: 20,
    },
    actualWeather : {
        width: '100%',
        height: '25%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#f7bb42'
    },
    actualWeatherIs : {
        width: '100%',
        height: '25%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffcf54'
    },
    weatherIsText : {
        fontSize: 40,
        textTransform: 'uppercase',
        fontFamily: 'RobotoBold',
    },
})

export default Home;