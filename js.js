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