
export class Time{
    constructor(hrs, mins, secs, millis){
        this.validity_check(mins,secs,millis);
        this.hrs = hrs;
        this.mins = mins;
        this.secs = secs;
        this.millis = millis;
    }

    validity_check(m,s,mi){
        if (m > 59 || s > 59 || mi>99){
            console.log(`Invalid Time.`)
            return; ///add error handling here
        }
    }
    edit(hr,m,s,mi){
        this.hrs = hr;
        this.mins = m;
        this.secs = s;
        this.millis = mi;
    }
}


export class TimeCalc{ //also has stopwatch

    static currenttimer = new Time(0,0,0,0);
    static clocktimer = new Time(0,0,0,0);
    static calibration_time = new Time(0,0,0,0);
    static startTime;
    static interval;

    stopwatch(str){

        if (arguments.length === 0){
            TimeCalc.startTime = performance.now();
            var previous_calibration_var = performance.now();
            TimeCalc.interval = setInterval(()=>{
                this.stopwatchCount();
                this.printTime();
                if (performance.now() - previous_calibration_var >= 60000){           //per-minute calibration for precision
                    previous_calibration_var = performance.now();
                    calc.add(TimeCalc.calibration_time, minute);                        
                    TimeCalc.currenttimer.edit(TimeCalc.calibration_time.hrs, TimeCalc.calibration_time.mins, 0, 0);
                }
            },1);
        }

        else{
            clearInterval(TimeCalc.interval);
            TimeCalc.currenttimer.edit(0,0,0,0);
            this.printTime();
        }
    }

    stopwatchCount(){
        if (TimeCalc.currenttimer.millis > 98){
            TimeCalc.currenttimer.secs += 1;
            TimeCalc.currenttimer.millis = 0;
        }
        else{
            TimeCalc.currenttimer.millis += 1;
        }
    }
    
    add(t1,t2){
        
        let millis = t1.millis + t2.millis;
        
        let secs = t1.secs + t2.secs;
        if (millis > 99){
            millis -= 100;
            secs += 1;
        }

        let mins = t1.mins + t2.mins;

        if (secs > 59){
            mins++;
            secs -= 60;
        }

        let hrs = t1.hrs + t2.hrs;

        if (mins > 59){
            hrs++;
            mins -= 60;
        }
        t1.edit(hrs,mins,secs,millis);
    }
    printTime(a,b,c,d){

        if (arguments.length === 0){
            let str = `${String(TimeCalc.currenttimer.hrs)}:${String(TimeCalc.currenttimer.mins)}:${String(TimeCalc.currenttimer.secs)}:${String(TimeCalc.currenttimer.millis)}`;
            displaytime.innerText = str;
        }

        if (arguments.length === 4){
            let str = `${a}:${b}:${c}:${d}`;
            return str;
        }
    }
}

export const calc = new TimeCalc; //main object that runs clock and stopwatch
const milli = new Time(0,0,0,1);
const minute = new Time(0,1,0,0);
export const sec = new Time(0,0,1,0);