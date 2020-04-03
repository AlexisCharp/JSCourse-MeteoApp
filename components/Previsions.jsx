import React, {useState, useEffect} from "react";
import {View, StyleSheet, Text, Image} from "react-native";
import * as Font from "expo-font";

//Pareil, la typo marche pas
async () => {
  await Font.loadAsync({
    RobotoBold: {
      uri: require("../assets/fonts/RobotoBold.ttf")
    },
    RobotoLight: {
      uri: require("../assets/fonts/RobotoLight.ttf")
    }
  });
};

function Previsions(props) {
  


  //Déclaration des states
  const IMAGES = props.IMAGES;
  const [temp0, setTemp0] = useState(''); 
  const [icon0, setIcon0] = useState('');
  const [temp1, setTemp1] = useState(''); 
  const [icon1, setIcon1] = useState('');
  const [temp2, setTemp2] = useState(''); 
  const [icon2, setIcon2] = useState('');

  const apikey = "becfa4eb6b7a49c0838657d82bacaf9d";
  // Je déclare un tableau avec le nom des jours
  const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  // Je déclare une variable date que j'initialise à l'heure actuelle
  let date = new Date();
  // Je récupère le numéro du jour que j'adapte afin qu'il corresponde à un nom du tableau
  let dateDay = date.getDay() - 1;
  // Je récupère la date du jour
  let dateDate = date.getDate()
  let appDays = [];
  // Dans cette fonction, je stocke dans un tableau le nom des trois jours suivant celui d'aujourd'hui
  for(let i=0; i<3; i++){
    if(dateDay === 6){
      dateDay = -1;
    }
    dateDay += 1;
    appDays[i] = days[dateDay];
  }
  const city = props.city;


  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apikey}&lang=en`).then(data => data.json()).then(data => {
      // Je récupère les données météo pour les 3 jours suivant
      const dayList = data.list;
      // On initie les tableaux de température, de temps pour le premier jour
      let day = 0;
      let nextDayDate;
      for(let i = 0; i < dayList.length; i++){
        nextDayDate = new Date(data.list[i].dt * 1000);
        //Si nous changons de jour
        if(nextDayDate.getDate() != dateDate){
          // S'il est entre 11 et 15 heures
          if(nextDayDate.getHours() > 11 && nextDayDate.getHours() < 15){
            // On récupère cette nouvelle date
            dateDate = nextDayDate.getDate();
            //On stocke la température "moyenne" de la journée et l'icone correspondant
            if(day === 0){
              setTemp0(data.list[i].main.temp.toFixed(0) + '°');
              let imageRef = data.list[i].weather[0].icon.substring(0,2) + 'd';
              setIcon0(IMAGES[imageRef]);
            } else if (day === 1) {
              setTemp1(data.list[i].main.temp.toFixed(0) + '°');
              let imageRef = data.list[i].weather[0].icon.substring(0,2) + 'd';
              setIcon1(IMAGES[imageRef]);
            } else if (day === 2){
              setTemp2(data.list[i].main.temp.toFixed(0) + '°');
              let imageRef = data.list[i].weather[0].icon.substring(0,2) + 'd';
              setIcon2(IMAGES[imageRef]);
            }
            // On passe au jour suivant
            day += 1;
          }
        }
      }
      console.log(temp0, temp1, temp2);
    });
  }, []);

  return (<View style={styles.futureWeather}>
    <View style={styles.futureWeatherDiv}>
      <Text style={styles.futureWeatherDay}>{appDays[0]}</Text>
      <Image style={{
          width: 50,
          height: 50
        }} source={icon0}/>
      <Text style={styles.futureWeatherTemp}>{temp0}</Text>
    </View>
    <View style={styles.futureWeatherDiv}>
      <Text style={styles.futureWeatherDay}>{appDays[1]}</Text>
      <Image style={{
          width: 50,
          height: 50
        }} source={icon1}/>
      <Text style={styles.futureWeatherTemp}>{temp1}</Text>
    </View>
    <View style={styles.futureWeatherDiv}>
      <Text style={styles.futureWeatherDay}>{appDays[2]}</Text>
      <Image style={{
          width: 50,
          height: 50
        }} source={icon2}/>
      <Text style={styles.futureWeatherTemp}>{temp2}</Text>
    </View>
  </View>);
}

const styles = StyleSheet.create({
  futureWeather: {
    width: "100%",
    height: "40%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#f7bb42"
  },
  futureWeatherDiv: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  futureWeatherDay: {
    fontFamily: "RobotoLight"
  },
  futureWeatherTemp: {
    fontFamily: "RobotoBold"
  }
});

export default Previsions;