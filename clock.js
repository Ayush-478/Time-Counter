//CIRCULAR DEPENDENCY

import { sec, calc, TimeCalc, Time } from "./time.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const h = canvas.offsetHeight;
const w = canvas.offsetWidth;

canvas.height = h;
canvas.width = w;

console.log(h,w)

ctx.fillStyle = "lavender";
const pi = Math.PI;
const r = w/2;

function WriteNumbers(){   
    ctx.lineWidth = 1;
    var len = r*.90;
    for (let i = 1; i < 13; i++){
        let angle = (i * pi/6) - pi/2;
        let x = w/2 + (len * Math.cos(angle))
        let y = h/2 + (len * Math.sin(angle))
        ctx.fillStyle = "white";
        ctx.font = "13px Arial";
        ctx.fillText(i, (x*.985),(y*1.02));

        angle += pi/12;
        x = w/2 + ((r) * Math.cos(angle))
        y = h/2 + ((r) * Math.sin(angle))

        let x0 = x + 0.08*(h/2-x);
        let y0 = y + 0.08*(w/2-y);
        ctx.beginPath();
        ctx.strokeStyle = "white";
        ctx.moveTo(x0, y0);
        ctx.lineTo(x,y);
        ctx.stroke(); 
    }
}

function DrawClock(){
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.arc(w/2,h/2,r,0,Math.PI*2);
    ctx.fill();
    WriteNumbers();
}

function updateClock(){
    var len = w/2;
    function hour(){
        let time = TimeCalc.clocktimer;
        let angle = (time.hrs * pi/6) - pi/2;

        let mins = time.mins;
        angle += pi/6 * 5 * (mins/300);

        let x = w/2 + ((len * 0.6) * Math.cos(angle));
        let y = h/2 + ((len * .6) * Math.sin(angle));

        ctx.beginPath();
        ctx.strokeStyle = "pink";
        ctx.lineWidth = 2.5;
        ctx.moveTo(h/2,w/2);
        ctx.lineTo(x,y);
        ctx.stroke(); 
    }

    function minute(){
        let time = TimeCalc.clocktimer;
        let angle = (time.mins * pi/30) - pi/2;

        let x = w/2 + ((len * .75) * Math.cos(angle));
        let y = h/2 + ((len * .75) * Math.sin(angle));

        ctx.beginPath();
        ctx.strokeStyle = "#ff073a";
        ctx.moveTo(h/2,w/2);
        ctx.lineTo(x,y);
        ctx.stroke();
    }

    function second(){
        let time = TimeCalc.clocktimer;
        let angle = (time.secs * pi/30) - pi/2;
        let x = w/2 + ((len * .93) * Math.cos(angle));
        let y = h/2 + ((len * .93) * Math.sin(angle));

        ctx.strokeStyle = "#ffff33";
        ctx.beginPath();
        ctx.moveTo(h/2,w/2);
        ctx.lineTo(x,y);
        ctx.stroke();
    }

    DrawClock();
    hour();
    minute();
    second();
}


function formatTime(number) {
    return number < 10 ? '0' + number : number;
}

let now = new Date();
let hours = formatTime(now.getHours());
let minutes = formatTime(now.getMinutes());
let seconds = formatTime(now.getSeconds());

console.log(`Current Time: ${(hours)}:${minutes}:${seconds}`);
TimeCalc.clocktimer.edit(hours,minutes,seconds,0);

setInterval(()=>{
    updateClock();
    calc.add(TimeCalc.clocktimer, sec);
},1000);
