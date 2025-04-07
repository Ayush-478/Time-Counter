/*
2HRS,20MINS

Goals-
1. Start Timer, Stop Timer, Current/Last recorded Time
2. Logs, Log Total, Clear Log
3. Maybe Notepad
4. Cursor Light
5. Implement Error Handling
6. Current time with addable timezones(?)

*/

///time format= "HH:MM:SS-:MM"
import { calc, TimeCalc, Time } from "./time.js";

const displaytime = document.getElementById('displaytime');
const startTimerButton = document.getElementById('start');
const stopTimerButton = document.getElementById('stop');
const clearLogButton = document.getElementById('clear');
const logsList = document.querySelectorAll('div#logtext');     //nodelist
const totalTime = document.getElementById('total');
const weatherimg = document.getElementById('tempimg');
const tempcel = document.getElementById('tempcel');
const citycountry = document.getElementById('citycou');
const daydate = document.getElementById('daydate');
const feelslike = document.getElementById('feelslike');
const windy = document.getElementById('windy');
const humid = document.getElementById('humid');
const rainy = document.getElementById('rainy');

logsList.forEach((log)=>{
    log.innerText = "text";
})

//Functionaility for Timer and LogTable

class Log{
    static stopwatchrunning = false;
    static total = new Time(0,0,0,0);

    constructor(){
        startTimerButton.addEventListener(('click'),() => {
            if (!Log.stopwatchrunning){
                calc.stopwatch();
                Log.stopwatchrunning = true;
            }
        })
        stopTimerButton.addEventListener(('click'), ()=>{
            if (Log.stopwatchrunning){
                this.addLog(TimeCalc.currenttimer);
                calc.stopwatch("stop");
                Log.stopwatchrunning = false;
            }
        })
        clearLogButton.addEventListener(('click'), ()=>{
            logsList.forEach((log)=>{
                log.innerText = "text";
            })
        })
    }

    addLog(time){
        let num = 5;
        logsList.forEach((log)=>{
            if (log.innerText == "text"){
                num--;
            }
        })

        let txt = "";

        if (time.hrs > 1){
            txt = `${time.hrs}hrs, ${time.mins}mins, ${time.secs}secs`;
        }
        if (time.hrs > 0){
            txt = `${time.hrs}hr, ${time.mins}mins, ${time.secs}secs`;
        }
        if (time.hrs == 0 && time.mins == 0){
            txt = `${time.secs}secs`;
        }
        if (time.hrs == 0 && time.mins > 0){
            txt = `${time.mins}mins, ${time.secs}secs`;
        }
        logsList[num].innerText = txt;
        calc.add(Log.total, time);
        totalTime.innerText = calc.printTime(Log.total.hrs,Log.total.mins,Log.total.secs,Log.total.millis);
    }
}

const log = new Log();


// Handling tempreature functionality here------------------------------------------------------------------------------------------------

var IP = "";
var IPData = {};
var tempData = {};

function getIP(){
    return new Promise((res, rej)=>{
        fetch("https://api.ipify.org").then((ip)=>{
            res(ip.text());
        });
    })
}

function getIPData(url){
    return new Promise((res,rej)=>{
        fetch(url).then((data)=>data.json()).then((obj)=>{
            console.log(obj)
            res(obj);
        })
    })
}

function getTemp(url){
    return new Promise((res,rej)=>{
        fetch(url).then((data)=>data.json()).then((obj)=>res(obj))
    })
}

function getSVG(code, isDay){
    return new Promise((res,rej)=>{
        var svg_name = "";
        fetch("svgNAME.json").then((res)=>res.json()).then((json)=>{
            if (isDay > 0){
                svg_name = json[code]["svg"];
            }
            else{
                svg_name = json[code]["svg-night"];
            }
            weatherimg.setAttribute("src",`https://raw.githubusercontent.com/basmilius/weather-icons/refs/heads/dev/design/fill/final/${svg_name}.svg`);
        });
        })
}

function integrateTemp(){
    tempcel.innerText = `${tempData.current.temp_c}\u00B0C`;
    citycountry.innerText = `${tempData.location.name},${tempData.location.country}`
    feelslike.innerText = `feels like ${tempData.current.feelslike_c}\u00B0C`

    let wind = tempData.wind_kph;
    switch (true) {
        case (wind > 75):
            windy.innerText = "Violently Windy"
            break;
        case (wind > 55):
            windy.innerText = "Severely Windy"
            break;
        case (wind > 39):
            windy.innerText = "Very Windy"
            break;
        case (wind > 25):
            windy.innerText = "Quite Windy"
            break;
        case (wind > 15):
            windy.innerText = "Breezy"
            break;
        case (wind > 5):
            windy.innerText = "Light Breeze"
            break;
        case (wind > 0):
            windy.innerText = "No Wind"
            break;
    }

    let rain = tempData.precip_mm;

    switch (true){
        case (rain > 20):
            rainy.innerText = "Flood Possible"
            break;
        case (rain > 8):
            rainy.innerText = "Heavy Rain"
            break;
        case (rain > 3):
            rainy.innerText = "Rainy"
            break;
        case (rain > 1):
            rainy.innerText = "Light Rain"
            break;
        case (rain > 0.1):
            rainy.innerText = "Drizzle"
            break;
        case (rain > 0):
            rainy.innerText = "No Rain"
            break;
                                                        
    }

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    
    let months = {
        "01" : "January",
        "02" : "Febuary",
        "03" : "March",
        "04" : "April",
        "05" : "May",
        "06" : "June",
        "07" : "July",
        "08" : "August",
        "09" : "September",
        "10" : "October",
        "11" : "November",
        "12" : "December"
    };

    let days = {
        "1":"Sunday",
        "2":"Monday",
        "3":"Tuesday",
        "4":"Wednesday",
        "5":"Thursday",
        "6":"Friday",
        "7":"Saturday",
    }
    
    let day = days[today.getDay()+1];    
    today = `${dd} ${months[mm]},${yyyy}`;
    daydate.innerText = `${day}, ${today}`;
}

async function handleTemp(){
    IP = await getIP();
    let ipdataAPI = `https://api.ipdata.co/${IP}?api-key=43578aa1a901dd079b5746d035a876bfef61be997f1a3a3429f38721&fields=ip,latitude,longitude,city,country_name,postal`
    IPData = await getIPData(ipdataAPI);
    let tempAPI = `http://api.weatherapi.com/v1/current.json?key=c1fc16a319094981964181531250204&q=${IPData.latitude},${IPData.longitude}`
    tempData = await getTemp(tempAPI);
    getSVG(tempData.current.condition.code,tempData.current.is_day);
    integrateTemp();
}

handleTemp();