//BASE URL, API KEY AND PREFFERED USER LANGUAGE
//temp email vaxaniy152@bnovel.com

const API_KEY = '1adb4acf515841479e671928230810'
const BASE_URL = 'http://api.weatherapi.com/v1'
const userLang = navigator.language
const divHTML = document.querySelector(".weather-display")
const body = document.querySelector("body")
const ADVANCED_DATA_OVERLAY = document.querySelector(".advanced-data-overlay")

//GETTING APPROXIMATE USER LOCATION, IN MOST CASES THE CAPITAL
const userCapital = () =>{
    const capitalOfUser = Intl.DateTimeFormat().resolvedOptions().timeZone
    const sliceUntil = capitalOfUser.lastIndexOf('/') + 1
    const sliced = capitalOfUser.slice(sliceUntil)
    const finalLocation = sliced.replace('_', ' ')

    return finalLocation
}

 
//FUNCTION WORKING PERFECTLY FINE + USER INPUT
//FUNCTION DISPLAYING EVERYTHING IN THE BROWSER
const updateHtml = async (weatherData) =>{

    //console.log(weatherData)

    //determines the dew point in the location at the current time
    const dewPoint = () =>{
        const dateLatest = new Date(weatherData.current.last_updated).getHours()
        //console.log(dateLatest)

        for(let i = 0; i < weatherData.forecast.forecastday[0].hour.length; i++){
            //console.log(weatherData.forecast.forecastday[0].hour[i].dewpoint_c)
            let dewPointHours = weatherData.forecast.forecastday[0].hour[i].time
            dewPointHours = dewPointHours.slice("10", "13")
            dewPointHours = Number(dewPointHours)

            if(dateLatest == dewPointHours){
                return `The dew point is ${Math.round(weatherData.forecast.forecastday[0].hour[i].dewpoint_c)}° right now`
            }
        }
    }

    //1 of 4 functions to determine when is sunset and sunrise
    const sunrise =  () =>{
        if(weatherData.current.is_day){
            return 'SUNSET'
        } else {
            return 'SUNRISE'
        }
    }

    //function to determine which svg will be put on sunrise and sunset
    const svgSun = () =>{
        if(sunrise() == 'SUNSET'){
            return '<svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" ><path d="M23,24H1a1,1,0,0,1,0-2H5.071A6.991,6.991,0,0,1,5.5,20.39L1.982,18.349a1,1,0,0,1,1-1.731L6.51,18.662A7.053,7.053,0,0,1,7.662,17.51L5.618,13.985a1,1,0,0,1,1.731-1L9.39,16.5A6.991,6.991,0,0,1,11,16.071V12a1,1,0,0,1,2,0v4.071a6.97,6.97,0,0,1,1.609.433l2.042-3.522a1,1,0,1,1,1.731,1L16.338,17.51a7.047,7.047,0,0,1,1.151,1.152l3.527-2.044a1,1,0,0,1,1,1.731L18.5,20.39A6.894,6.894,0,0,1,18.929,22H23A1,1,0,0,1,23,24ZM8.3,5.708l3,3a1,1,0,0,0,1.414,0l3-3A1,1,0,0,0,14.3,4.293L13,5.586V1a1,1,0,0,0-2,0V5.586L9.7,4.293A1,1,0,0,0,8.291,5.708h0Z"/></svg>'
        } else {
            return '<svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" ><path d="M23,24H1a1,1,0,0,1,0-2H5.079a6.821,6.821,0,0,1,.428-1.607L1.982,18.349a1,1,0,1,1,1-1.731l3.529,2.046a7.062,7.062,0,0,1,1.151-1.148L5.618,13.984a1,1,0,0,1,1.731-1l2.044,3.527A6.915,6.915,0,0,1,11,16.072V12a1,1,0,0,1,2,0v4.072a6.915,6.915,0,0,1,1.607.437l2.044-3.528a1,1,0,0,1,1.731,1l-2.047,3.531a7.062,7.062,0,0,1,1.151,1.148l3.529-2.046a1,1,0,0,1,1,1.731L18.5,20.391a6.852,6.852,0,0,1,.436,1.617L23,22A1,1,0,0,1,23,24ZM15.705,3.292l-3-3a1,1,0,0,0-1.414,0l-3,3A1,1,0,0,0,9.705,4.707L11,3.414V8a1,1,0,0,0,2,0V3.414l1.3,1.293A1,1,0,0,0,15.71,3.292h-.005Z"/></svg>'
        }
    }

    //2 of 4 functions
    const sunset = () =>{
        if(!weatherData.current.is_day){
            return 'Sunset'
        } else{
            return 'Sunrise'
        }
    }

    //3 of 4 functions
    const sunriseORsunset = () =>{
        if(weatherData.current.is_day){
            return weatherData.forecast.forecastday[0].astro.sunset
        } else {
            return weatherData.forecast.forecastday[0].astro.sunrise
        }
    }

    //will return proper uv value
    const UVINDEX = () =>{
        if(weatherData.current.uv == 1 || weatherData.current.uv == 2 || weatherData.current.uv == 0){
            return 'Low'
        } else if (weatherData.current.uv == 3 || weatherData.current.uv == 4 || weatherData.current.uv == 5){
            return 'Moderate'
        } else if (weatherData.current.uv == 6 || weatherData.current.uv == 7){
            return 'High'
        } else if(weatherData.current.uv == 8 || weatherData.current.uv == 9 || weatherData.current.uv == 10){
            return 'Very High'
        } else if (weatherData.current.uv > 11){
            return 'Extreme'
        }
    }

    const sliderUV = () =>{
        const ball = document.querySelector(".ball")
        const uvIndexNumber = weatherData.current.uv
        
        //console.log(uvIndexNumber)
        if(uvIndexNumber == 1){
            ball.style.left = `10px`
        } else if (uvIndexNumber == 2){
            ball.style.left = `20px`
        } else if (uvIndexNumber == 3){
            ball.style.left = `35px`
        } else if (uvIndexNumber == 4){
            ball.style.left = `55px`
        } else if (uvIndexNumber == 5){
            ball.style.left = `75px`
        } else if (uvIndexNumber == 6){
            ball.style.left = `85px`
        } else if (uvIndexNumber == 7){
            ball.style.left = `95px`
        } else if (uvIndexNumber == 8){
            ball.style.left = `115px`
        } else if (uvIndexNumber == 9){
            ball.style.left = `130px`
        } else if (uvIndexNumber == 10){
            ball.style.left = `140px`
        } else if (uvIndexNumber > 10){
            ball.style.left = `150px`
        }
    }

    const sliderAQ = () =>{
        const ball = document.querySelector(".ball-air-quality")
        const airQuality = weatherData.current.air_quality['gb-defra-index']
        
        //console.log(uvIndexNumber)
        if(airQuality == 1){
            ball.style.left = `10px`
        } else if (airQuality == 2){
            ball.style.left = `20px`
        } else if (airQuality == 3){
            ball.style.left = `35px`
        } else if (airQuality == 4){
            ball.style.left = `55px`
        } else if (airQuality == 5){
            ball.style.left = `75px`
        } else if (airQuality == 6){
            ball.style.left = `85px`
        } else if (airQuality == 7){
            ball.style.left = `95px`
        } else if (airQuality == 8){
            ball.style.left = `115px`
        } else if (airQuality == 9){
            ball.style.left = `130px`
        } else if (airQuality == 10){
            ball.style.left = `140px`
        } else if (airQuality > 10){
            ball.style.left = `150px`
        }
    }
    

    const useOfSunscreen = () =>{
        const currentUvIndex = weatherData.current.uv
        let sunset = weatherData.forecast.forecastday[0].astro.sunset
        sunset = Number(sunset.slice("0", "2")) + 12
        let lastUpdated = weatherData.current.last_updated
        lastUpdated = Number(lastUpdated.slice("10", "13") )

        //console.log(sunset, "SUNSET")
        //console.log(lastUpdated, "LAST UPDATE")

        
        const timeArray = []
        for(let i = 0; i < weatherData.forecast.forecastday[0].hour.length; i++){

            let time = weatherData.forecast.forecastday[0].hour[i].time
            time = Number(time.slice("11", "13"))
            //console.log(time)
            

            if(weatherData.forecast.forecastday[0].hour[i].uv >= 3 && time <= sunset){
                timeArray.push(weatherData.forecast.forecastday[0].hour[i].time)
                
            }
            
            
        }
        return timeArray
    }
    //console.log(useOfSunscreen())

    const sunscreenBetweenTimes = () => {
        const currentUvIndex = weatherData.current.uv
        let lastUpdated = weatherData.current.last_updated
        lastUpdated = Number(lastUpdated.slice("10", "13") )
        let sunset = weatherData.forecast.forecastday[0].astro.sunset
        sunset = Number(sunset.slice("0", "2")) + 12

        if(useOfSunscreen().length > 0){
            if(currentUvIndex < 3 && lastUpdated >= sunset){
                return "Low for the rest of the day."
            } else if(currentUvIndex < 3){
                return `Use sun protection ${useOfSunscreen()[0].slice("11")}-${useOfSunscreen()[useOfSunscreen().length - 1].slice("11")}.`
            } else if (currentUvIndex >= 3) {
                return `Use protection until ${useOfSunscreen()[useOfSunscreen().length - 1].slice("11")}.`
            }
        }else{
            return 'Low levels all day.'
        }
    }

    //4 of 4 functions, last one
    const sunriseORsunsetLittleText = () =>{

        if(!weatherData.current.is_day){
            return weatherData.forecast.forecastday[0].astro.sunset
        } else {
            return weatherData.forecast.forecastday[0].astro.sunrise
        }
    }

    let labelToChange = new Date(weatherData.current.last_updated).getHours()
        //console.log(labelToChange)

    const currentFeelsLikeTemp = () => {
        for(let i = 0; i < weatherData.forecast.forecastday[0].hour.length; i++){

            if(i == labelToChange){
                return Math.round(weatherData.forecast.forecastday[0].hour[i].feelslike_c)
            }
        }
    }
    //console.log(currentFeelsLikeTemp())

    //based on actual temp and feels like temp 
    const howDoesItFeel = () =>{
        if(Math.round(weatherData.current.temp_c) == currentFeelsLikeTemp()){
            return 'Similar to the actual temperature.'
        }else if(Math.round(weatherData.current.temp_c) > currentFeelsLikeTemp()) {
            return 'Wind is making it feel cooler.'
        } else{
            return 'Humidity is making it feel warmer.'
        }
    }

    //wheather it feels hotter or colder we would retun an svg 
    const howDoesItFeelSVG = () =>{
        if(howDoesItFeel() == 'Similar to the actual temperature.'){
            return '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M416 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm0 128A96 96 0 1 0 416 0a96 96 0 1 0 0 192zM96 112c0-26.5 21.5-48 48-48s48 21.5 48 48V276.5c0 17.3 7.1 31.9 15.3 42.5C217.8 332.6 224 349.5 224 368c0 44.2-35.8 80-80 80s-80-35.8-80-80c0-18.5 6.2-35.4 16.7-48.9C88.9 308.4 96 293.8 96 276.5V112zM144 0C82.1 0 32 50.2 32 112V276.5c0 .1-.1 .3-.2 .6c-.2 .6-.8 1.6-1.7 2.8C11.2 304.2 0 334.8 0 368c0 79.5 64.5 144 144 144s144-64.5 144-144c0-33.2-11.2-63.8-30.1-88.1c-.9-1.2-1.5-2.2-1.7-2.8c-.1-.3-.2-.5-.2-.6V112C256 50.2 205.9 0 144 0zm0 416c26.5 0 48-21.5 48-48c0-20.9-13.4-38.7-32-45.3V112c0-8.8-7.2-16-16-16s-16 7.2-16 16V322.7c-18.6 6.6-32 24.4-32 45.3c0 26.5 21.5 48 48 48z"/></svg>'
        } else if(howDoesItFeel() == 'Wind is making it feel cooler.'){
            return '<svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" ><path d="M7,24c-6.079.117-9.334-7.638-5-11.89V5c.211-6.609,9.791-6.6,10,0v7.11C16.335,16.363,13.077,24.117,7,24ZM7,2A3,3,0,0,0,4,5v7.537a1,1,0,0,1-.332.744A5.018,5.018,0,0,0,7,22a5.018,5.018,0,0,0,3.332-8.719A1,1,0,0,1,10,12.537V5A3,3,0,0,0,7,2ZM7,20a3.007,3.007,0,0,1-1-5.829V12a1,1,0,0,1,2,0v2.171A3.007,3.007,0,0,1,7,20Zm0-4a1,1,0,0,0,0,2A1,1,0,0,0,7,16Zm8.3-7.308,3,3a1,1,0,0,0,1.414,0l3-3A1,1,0,0,0,21.3,7.277L20,8.57V.985a1,1,0,0,0-2,0V8.57L16.7,7.277a1,1,0,0,0-1.413,1.415h0Z"/></svg>'
        } else {
            return '<svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24"><path d="M7,24c-6.079.117-9.334-7.638-5-11.89V5c.211-6.609,9.791-6.6,10,0v7.11C16.335,16.363,13.077,24.117,7,24ZM7,2A3,3,0,0,0,4,5v7.537a1,1,0,0,1-.332.744A5.018,5.018,0,0,0,7,22a5.018,5.018,0,0,0,3.332-8.719A1,1,0,0,1,10,12.537V5A3,3,0,0,0,7,2ZM7,20a3.007,3.007,0,0,1-1-5.829V4.89a1,1,0,0,1,2,0v9.281A3.007,3.007,0,0,1,7,20Zm0-4a1,1,0,0,0,0,2A1,1,0,0,0,7,16Zm15.7-12.707-3-3a1,1,0,0,0-1.414,0l-3,3A1,1,0,0,0,16.7,4.708L18,3.415V11a1,1,0,0,0,2,0V3.415l1.3,1.293A1,1,0,0,0,22.71,3.293h-.005Z"/></svg>'
        }
    }


    const styleSunOnImg = () =>{
        let timeRightNow = new Date(weatherData.current.last_updated).getHours()
        const littleSun = document.querySelector(".little-sun")

        let sunriseTime = weatherData.forecast.forecastday[0].astro.sunrise 
        sunriseTime = sunriseTime.slice("0", "2")
        //console.log(sunriseTime)

        let sunsetTime = weatherData.forecast.forecastday[0].astro.sunset 
        sunsetTime = Number(sunsetTime.slice("0", "2")) + 12
        //console.log(sunsetTime)

        if(weatherData.current.is_day){
            //console.log("Before sunrise")

            littleSun.classList.remove("night")
            littleSun.classList.add("day")
        }else {
            //console.log("Daytime")

            littleSun.classList.add("night")
            littleSun.classList.remove("day")
        } 
        
        for(let i = 0; i < weatherData.forecast.forecastday[0].hour.length; i++){
            let everyHour24 = weatherData.forecast.forecastday[0].hour[i].time
            everyHour24 = Number(everyHour24.slice("11", "13"))

            

            if(timeRightNow == everyHour24){
                //console.log(timeRightNow, everyHour24)
                //let timeRightNow = 0

                if(timeRightNow == 0){
                   // console.log(timeRightNow, everyHour24)

                    littleSun.style.left = `0`
                    littleSun.style.bottom = `1px`
                } else if(timeRightNow == 1){
                    //console.log(timeRightNow, everyHour24)

                    littleSun.style.left = `10px`
                    littleSun.style.bottom = `4px`
                }else if(timeRightNow == 2){
                    //console.log(timeRightNow, everyHour24)

                    littleSun.style.left = `17px`
                    littleSun.style.bottom = `7px`
                }else if(timeRightNow == 3){
                    //console.log(timeRightNow, everyHour24)

                    littleSun.style.left = `25px`
                    littleSun.style.bottom = `11px`
                }else if(timeRightNow == 4){
                   // console.log(timeRightNow, everyHour24)

                    littleSun.style.left = `30px`
                    littleSun.style.bottom = `14px`
                }else if(timeRightNow == 5){
                    //console.log(timeRightNow, everyHour24)

                    littleSun.style.left = `40px`
                    littleSun.style.bottom = `21px`
                }else if(timeRightNow == 6){
                    //console.log(timeRightNow, everyHour24)

                    littleSun.style.left = `50px`
                    littleSun.style.bottom = `29px`
                }else if(timeRightNow == 7){
                    //console.log(timeRightNow, everyHour24)

                    littleSun.style.left = `55px`
                    littleSun.style.bottom = `32px`
                }else if(timeRightNow == 8){
                    //console.log(timeRightNow, everyHour24)

                    littleSun.style.left = `60px`
                    littleSun.style.bottom = `36px`
                }else if(timeRightNow == 9){
                    //console.log(timeRightNow, everyHour24)

                    littleSun.style.left = `65px`
                    littleSun.style.bottom = `39px`
                }else if(timeRightNow == 10){
                    //console.log(timeRightNow, everyHour24)

                    littleSun.style.left = `73px`
                    littleSun.style.bottom = `43px`
                }else if(timeRightNow == 11){
                    //console.log(timeRightNow, everyHour24)

                    littleSun.style.left = `78px`
                    littleSun.style.bottom = `45px`
                }else if(timeRightNow == 12){
                    //console.log(timeRightNow, everyHour24)

                    littleSun.style.left = `90px`
                    littleSun.style.bottom = `47px`
                }else if(timeRightNow == 13){
                    //console.log(timeRightNow, everyHour24)

                    littleSun.style.left = `105px`
                    littleSun.style.bottom = `44px`
                }else if(timeRightNow == 14){
                    //console.log(timeRightNow, everyHour24)

                    littleSun.style.left = `112px`
                    littleSun.style.bottom = `42px`
                }else if(timeRightNow == 15){
                    //console.log(timeRightNow, everyHour24)

                    littleSun.style.left = `120px`
                    littleSun.style.bottom = `38px`
                }else if(timeRightNow == 16){
                    //console.log(timeRightNow, everyHour24)

                    littleSun.style.left = `125px`
                    littleSun.style.bottom = `34px`
                }else if(timeRightNow == 17){
                    //console.log(timeRightNow, everyHour24)

                    littleSun.style.left = `130px`
                    littleSun.style.bottom = `31px`
                }else if(timeRightNow == 18){
                    //console.log(timeRightNow, everyHour24)

                    littleSun.style.left = `135px`
                    littleSun.style.bottom = `25px`
                }else if(timeRightNow == 19){
                    //console.log(timeRightNow, everyHour24)

                    littleSun.style.left = `140px`
                    littleSun.style.bottom = `21px`
                }else if(timeRightNow == 20){
                    //console.log(timeRightNow, everyHour24)

                    littleSun.style.left = `150px`
                    littleSun.style.bottom = `16px`
                }else if(timeRightNow == 21){
                    //console.log(timeRightNow, everyHour24)

                    littleSun.style.left = `160px`
                    littleSun.style.bottom = `11px`
                }else if(timeRightNow == 22){
                    //console.log(timeRightNow, everyHour24)

                    littleSun.style.left = `170px`
                    littleSun.style.bottom = `7px`
                }else if(timeRightNow == 23){
                    //console.log(timeRightNow, everyHour24)

                    littleSun.style.left = `176px`
                    littleSun.style.bottom = `5px`
                }
            }
            
        }
    }
    //styleSunOnImg()


    //returns proper visibility 
    const visibility = () =>{
        if(weatherData.current.vis_km > 15){
            return "It's perfectly clear right now."
        } else if(weatherData.current.vis_km >= 10){
            return "It's clear right now."
        } else if (weatherData.current.vis_km == 0){
            return "Visibility is less than 1km."
        } else if (weatherData.current.vis_km > 1){
            return 'Visibility is moderate.'
        }
    }

    const visibilitySVG = () =>{
        if(visibility() == "It's clear right now." || visibility() == "It's perfectly clear right now."){
            return '<svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" ><path d="M23.271,9.419C21.72,6.893,18.192,2.655,12,2.655S2.28,6.893.729,9.419a4.908,4.908,0,0,0,0,5.162C2.28,17.107,5.808,21.345,12,21.345s9.72-4.238,11.271-6.764A4.908,4.908,0,0,0,23.271,9.419Zm-1.705,4.115C20.234,15.7,17.219,19.345,12,19.345S3.766,15.7,2.434,13.534a2.918,2.918,0,0,1,0-3.068C3.766,8.3,6.781,4.655,12,4.655s8.234,3.641,9.566,5.811A2.918,2.918,0,0,1,21.566,13.534Z"/><path d="M12,7a5,5,0,1,0,5,5A5.006,5.006,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z"/></svg>'
        } else if(visibility() == "Visibility is moderate."){
            return '<svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" ><path d="m14.828,19.071c.576.576.266,1.559-.534,1.707-.008.001-.016.003-.024.004-.322.059-.656-.053-.888-.285L2.216,9.332c-.361-.361-.397-.932-.083-1.334.004-.005.008-.011.013-.016.371-.474,1.08-.514,1.505-.088l11.177,11.177ZM.528,10.473c-.143.272-.261.514-.35.708-.237.521-.237,1.118,0,1.64.041.091.094.199.147.308l5.915,5.915c.782.782,1.758,1.346,2.833,1.603.086.021.173.04.261.059.537.116.902-.524.514-.912L.528,10.473Zm23.179,11.82c.391.391.391,1.023,0,1.414-.195.195-.451.293-.707.293s-.512-.098-.707-.293L.293,1.707C-.098,1.316-.098.684.293.293S1.316-.098,1.707.293l4.268,4.268c1.838-1.036,3.862-1.561,6.025-1.561,6.192,0,9.72,4.238,11.271,6.764.978,1.592.978,3.57,0,5.162-.632,1.029-1.678,2.473-3.178,3.753l3.614,3.614ZM7.455,6.041l1.788,1.788c1.94-1.283,4.586-1.071,6.293.636,1.707,1.708,1.919,4.353.636,6.293l2.502,2.502c1.368-1.135,2.322-2.45,2.894-3.381.581-.946.581-2.122,0-3.068-1.333-2.17-4.349-5.811-9.567-5.811-1.619,0-3.143.35-4.545,1.041Zm7.252,7.252c.531-1.115.336-2.492-.585-3.414-.922-.922-2.3-1.116-3.414-.585l4,4Z"/></svg>'
        } else {
            return '<svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" ><path d="M23.271,9.419A15.866,15.866,0,0,0,19.9,5.51l2.8-2.8a1,1,0,0,0-1.414-1.414L18.241,4.345A12.054,12.054,0,0,0,12,2.655C5.809,2.655,2.281,6.893.729,9.419a4.908,4.908,0,0,0,0,5.162A15.866,15.866,0,0,0,4.1,18.49l-2.8,2.8a1,1,0,1,0,1.414,1.414l3.052-3.052A12.054,12.054,0,0,0,12,21.345c6.191,0,9.719-4.238,11.271-6.764A4.908,4.908,0,0,0,23.271,9.419ZM2.433,13.534a2.918,2.918,0,0,1,0-3.068C3.767,8.3,6.782,4.655,12,4.655A10.1,10.1,0,0,1,16.766,5.82L14.753,7.833a4.992,4.992,0,0,0-6.92,6.92l-2.31,2.31A13.723,13.723,0,0,1,2.433,13.534ZM15,12a3,3,0,0,1-3,3,2.951,2.951,0,0,1-1.285-.3L14.7,10.715A2.951,2.951,0,0,1,15,12ZM9,12a3,3,0,0,1,3-3,2.951,2.951,0,0,1,1.285.3L9.3,13.285A2.951,2.951,0,0,1,9,12Zm12.567,1.534C20.233,15.7,17.218,19.345,12,19.345A10.1,10.1,0,0,1,7.234,18.18l2.013-2.013a4.992,4.992,0,0,0,6.92-6.92l2.31-2.31a13.723,13.723,0,0,1,3.09,3.529A2.918,2.918,0,0,1,21.567,13.534Z"/></svg>'
        }
    }

    let totalRain = 0

    //console.log(weatherData)

    const nextRainingDay = () =>{
        for(let i = 1; i < weatherData.forecast.forecastday.length; i++){
            //console.log(weatherData.forecast.forecastday[i].day.totalprecip_mm)
    
            if (weatherData.forecast.forecastday[i].day.totalprecip_mm){
                totalRain += Math.round(weatherData.forecast.forecastday[i].day.totalprecip_mm)
                
                let rainingDate = new Date(weatherData.forecast.forecastday[i].date)
                let dateNow = new Date()
                
                let formatedDate = rainingDate.toLocaleDateString("default", {day: "2-digit"})
                let formattedNow = dateNow.toLocaleDateString("default", {day: "2-digit"})
    
                rainingDate = rainingDate.toLocaleDateString("default", {day: "2-digit", weekday: "short"})
    
                if (formatedDate - formattedNow == 1){
                    return `${totalRain} mm expected in the next 24h.`
                    
                    
                } else if (totalRain){
                    return `Next expected is ${totalRain} mm on ${rainingDate}.`
                }
            }  

            if (i == weatherData.forecast.forecastday.length - 1){
                return `No rain expected in the next 14 days.`
            }
        } 
        
    }
    //console.log(nextRainingDay())

    


    const styleTemperatureAmplitude = () =>{
        //const container = document.querySelector(".container");
        //const highlight = document.querySelector(".highlight");
        const slider = document.querySelectorAll(".slider")
        let ampMax = weatherData.forecast.forecastday[0].day.maxtemp_c
        let ampMin = weatherData.forecast.forecastday[0].day.mintemp_c
        
        

        for(let i = 0; i < weatherData.forecast.forecastday.length; i++){
            let maxTemp = weatherData.forecast.forecastday[i].day.maxtemp_c
            let minTemp = weatherData.forecast.forecastday[i].day.mintemp_c

            // Define the color mapping function
            //fix this
            
            const getColor = (low, high) =>{
                if(low <= 0 && high <= 5){
                    return 'linear-gradient(to right,#5493ff, #7adeff)'
                }else if(low <= 0 && high <= 10){
                    return 'linear-gradient(to right,#5493ff, #10c6cf)'
                }else if(low <= 0 && high <= 15){
                    return 'linear-gradient(to right,#5493ff, #54f8ca)'
                }else if(low <= 0 && high <=20){
                    return 'linear-gradient(to right,#5493ff, #35f68c)'
                }else if(low <= 0 && high <=25){
                    return 'linear-gradient(to right,#5493ff, #12e403)'
                }else if(low <= 5 && high <=10){
                    return 'linear-gradient(to right,#7adeff, #10c6cf)'
                }else if(low <= 5 && high <=15){
                    return 'linear-gradient(to right,#7adeff, #54f8ca)'
                }else if(low <= 5 && high <=20){
                    return 'linear-gradient(to right,#7adeff, #54f8ca)'
                }else if(low <= 5 && high <=25){
                    return 'linear-gradient(to right,#7adeff, #12e403)'
                }else if(low <= 5 && high <=30){
                    return 'linear-gradient(to right,#7adeff, #cef72b)'
                }else if(low <= 10 && high <=15){
                    return 'linear-gradient(to right,#54f8ca, #35f68c)'
                }else if(low <= 10 && high <=20){
                    return 'linear-gradient(to right,#54f8ca, #12e403)'
                }else if(low <= 10 && high <=25){
                    return 'linear-gradient(to right,#54f8ca, #cef72b)'
                }else if(low <=10 && high <=30){
                    return 'linear-gradient(to right,#54f8ca, #ddd200)'
                }else if(low <= 10 && high <=35){
                    return 'linear-gradient(to right,#54f8ca, #fab623)'
                }else if(low <= 15 && high <=20){
                    return 'linear-gradient(to right,#12e403, #cef72b)'
                }else if(low <= 15 && high <=25){
                    return 'linear-gradient(to right,#12e403, #ddd200)'
                }else if(low <= 15 && high <=30){
                    return 'linear-gradient(to right,#12e403, #fab623)'
                }else if(low <= 15 && high <=35){
                    return 'linear-gradient(to right,#12e403, #ff9819)'
                }else if(low <= 15 && high <=40){
                    return 'linear-gradient(to right,#12e403, #ff4800)'
                }else if(low <= 20 && high <=25){
                    return 'linear-gradient(to right,#cef72b, #ddd200)'
                }else if(low <= 20 && high <=30){
                    return 'linear-gradient(to right,#cef72b, #fab623)'
                }else if(low <= 20 && high <=35){
                    return 'linear-gradient(to right,#cef72b, #ff9819)'
                }else if(low <= 20 && high <=40){
                    return 'linear-gradient(to right,#cef72b, #ff4800)'
                }else if(low <= 25 && high <=30){
                    return 'linear-gradient(to right,#ddd200, #fab623)'
                }else if(low <=25 && high <=35){
                    return 'linear-gradient(to right,#ddd200, #ff9819)'
                }else if(low <= 25 && high <=40){
                    return 'linear-gradient(to right,#ddd200, #ff4800)'
                }else if(low <=30 && high <=35){
                    return 'linear-gradient(to right,#fab623, #ff9819)'
                }else if(low <= 30 && high <=40){
                    return 'linear-gradient(to right,#fab623, #ff4800)'
                }else if(low <= 30 && high <=45){
                    return 'linear-gradient(to right,#fab623, #da1203)'
                }else if(low <= 35 && high <=40){
                    return 'linear-gradient(to right,#ff4800, #da1203)'
                }else if(low <= 35 && high <=45){
                    return 'linear-gradient(to right,#da1203, #a00000)'
                }
            }

            
            
            //styleElement()
            
            if(maxTemp > ampMax){
                ampMax = maxTemp
                
            }

            if(minTemp < ampMin){
                ampMin = minTemp
            }

            if(i == weatherData.forecast.forecastday.length - 1){
                //console.log(`L:${Math.round(ampMin)}, H:${Math.round(ampMax)}`)

                const lowValue = Math.round(ampMin)
                const highValue = Math.round(ampMax)

                for(let i = 0; i < slider.length; i++){
                    slider[i].innerHTML = ``
                    //console.log(Math.round(weatherData.forecast.forecastday[i].day.maxtemp_c), Math.round(weatherData.forecast.forecastday[i].day.mintemp_c))
                    const styleElement = (low, high) => {
                        const totalWidth = 220; // Width of the container
                        const containerRange = highValue - lowValue;

                        if (low === high) {
                            // If low and high are the same, style a small portion of the element
                            const width = 10; // Adjust this value to determine the width for the same numbers case
                            const color = getColor(low, high); // You can implement getColor(low, high) as needed
                    
                            highlight.style.left = '0px'; // Set left position to the beginning
                            highlight.style.width = `${width}px`;
                            highlight.style.background = color;
                    
                            return; // Exit the function early
                        }

                        const lowOffset = ((low - lowValue) / containerRange) * totalWidth;
                        const width = Math.min(((high - low) / containerRange) * totalWidth, totalWidth - lowOffset);
                        const color = getColor(low, high);

                        highlight.style.left = `${lowOffset}px`;
                        highlight.style.width = `${width}px`;
                        highlight.style.background = color;

                        //console.log(low, high)
                    }

                    

                    
                    

                    const container = document.createElement("div")
                    container.classList.add("container")
                    const highlight = document.createElement("div")
                    highlight.classList.add("highlight")
                    container.appendChild(highlight)
                    styleElement(Math.round(weatherData.forecast.forecastday[i].day.mintemp_c), Math.round(weatherData.forecast.forecastday[i].day.maxtemp_c))                
                    slider[i].appendChild(container)

                    
                }
                    
                
            }
        }
        
    }

    


    //NOTE HERE, HAS TO BE CALLED AT THE END
    const forecast14Days = () =>{

        const daysWrapHTML = document.querySelector(".days-wrap")
        daysWrapHTML.innerHTML = ``

        let today = new Date() 
        today = today.toLocaleDateString("default", {day: "2-digit", month: "short"})
        //console.log(today)

        for(let i = 0; i < weatherData.forecast.forecastday.length; i++){
            let forecast14Days = new Date(weatherData.forecast.forecastday[i].date)
            let todayFormatted = forecast14Days.toLocaleDateString("default", {day: "2-digit", month: "short"})

            let forecastWeather = weatherData.forecast.forecastday[i].day.condition.text

            const WEATHER_PER_HOUR = () =>{
                
                if(forecastWeather == 'Mist'){
                    //console.log("Mist Day")
                    return '<img src="fog.png">'
                } else if (forecastWeather == 'Sunny'){
                    //console.log("Sunny Day")
                    return '<img src="sunny.png">'
                }else if((forecastWeather == 'Partly cloudy')) {
                    //console.log("Partly Cloudy Day")
                    return '<img src="cloud-sun-off.png">'
                } else if((forecastWeather == 'Cloudy') || (forecastWeather == 'Overcast')) {
                    //console.log("Overcast or cloudy Day")
                    return '<img src="cloud-removebg-preview.png">'
                } else if ((forecastWeather == 'Heavy rain')){
                    //console.log("Heavy Rain Day")
                    return '<img src="rain.png">'
                } else if ((forecastWeather == 'Moderate rain')){
                    //console.log("Moderate Rain Day")
                    return '<img src="rain.png">'
                } else if ((forecastWeather == 'Fog')){
                    //console.log("Fog Day")
                    return '<img src="fog.png">'
                } else if((forecastWeather == 'Patchy rain possible' || forecastWeather == 'Light drizzle' || forecastWeather == 'Light rain shower')){
                    return '<img src="rain.png">'
                } else if(forecastWeather.includes("snow")){
                    return '<img src="snowflake.png">'
                }else if(forecastWeather = "Light freezing rain"){
                    return '<img src="rain.png">'
                }else if(forecastWeather = "Blizzard"){
                    return '<img src="snowflake.png">'
                }else{
                    console.log((forecastWeather))
                    return 'CONDITION NOT DEFINED'
                }
                
            }
            const weatherPercentage = () =>{
                

                const daysHighestRain = []
                const daysHighestSnow = []

                for(let j = 0; j < weatherData.forecast.forecastday[i].hour.length; j++){
                    daysHighestRain.push(weatherData.forecast.forecastday[i].hour[j].chance_of_rain)
                    daysHighestSnow.push(weatherData.forecast.forecastday[i].hour[j].chance_of_snow)
                }

                if(Math.max(...daysHighestRain) < Math.max(...daysHighestSnow)){
                    return `<span>${Math.round(Math.max(...daysHighestSnow) / 10) * 10}%</span>`
                }else if(Math.max(...daysHighestRain) >= Math.max(...daysHighestSnow) && Math.max(...daysHighestRain)){
                    return `<span>${Math.round(Math.max(...daysHighestRain) / 10) * 10}%</span>`
                }else {
                    return ''
                }
            }
            const actualHighAndLow = () =>{
                const temps = []
                for(let i = 0; i < weatherData.forecast.forecastday[0].hour.length; i++){
                    temps.push(weatherData.forecast.forecastday[0].hour[i].temp_c)
                }
                return temps 
            }

            if(i == 0){
                //console.log(`Today ${Math.round(weatherData.forecast.forecastday[i].day.mintemp_c)}° ${Math.round(weatherData.forecast.forecastday[i].day.maxtemp_c)}°`)
                let eachDayElement = document.createElement("div")
                eachDayElement.classList.add("each-day")
                eachDayElement.innerHTML = `
                <span>Today</span>
                <div class="weather-icon-wrap">
                    ${WEATHER_PER_HOUR()}
                    ${weatherPercentage()}
                </div>
                <span>${Math.round(Math.min(...actualHighAndLow()))}°</span>
                <div class="slider"></div>
                <span>${Math.round(Math.max(...actualHighAndLow()))}°</span>
                `
                //console.log(forecastWeather)

                daysWrapHTML.appendChild(eachDayElement)
                continue
            }

            forecast14Days = forecast14Days.toLocaleDateString("default", {weekday: "short"})
            //console.log(`${forecast14Days} ${Math.round(weatherData.forecast.forecastday[i].day.mintemp_c)}° ${Math.round(weatherData.forecast.forecastday[i].day.maxtemp_c)}°`)
            let eachDayElement = document.createElement("div")
            eachDayElement.classList.add("each-day")
            eachDayElement.innerHTML = `
            <span>${forecast14Days}</span>
            <div class="weather-icon-wrap">
                ${WEATHER_PER_HOUR()}
                ${weatherPercentage()}
            </div>
            <span>${Math.round(weatherData.forecast.forecastday[i].day.mintemp_c)}°</span>
            <div class="slider"></div>
            <span>${Math.round(weatherData.forecast.forecastday[i].day.maxtemp_c)}°</span>
            `
            //console.log(forecastWeather)

            daysWrapHTML.appendChild(eachDayElement)

        }
    } 
    //forecast14Days()


    //HOURLY FORECAST CALLED AT THE END ASWELL
    const hourlyForecast = () =>{
        let timeRightNow = new Date(weatherData.current.last_updated).getHours()   
        //console.log(timeRightNow) 
        

        const hourTempsHTML = document.querySelector(".hour-temps")
        hourTempsHTML.innerHTML = ``

        let sunriseTomorrow = weatherData.forecast.forecastday[1].astro.sunrise
        let sunsetTomorrow = weatherData.forecast.forecastday[1].astro.sunset

        sunriseTomorrow = sunriseTomorrow.slice("0", "2")
        sunsetTomorrow = sunsetTomorrow.slice("0", "2")

        sunsetTomorrow = Number(sunsetTomorrow) + 12

        //console.log(sunriseTomorrow)
        //console.log(sunsetTomorrow)

        let hourForeCast24 = 0

        //console.log(weatherData.forecast.forecastday[0].date)
        //console.log(weatherData.forecast.forecastday[0].hour[0].condition.text)

        for(let i = 0; i < weatherData.forecast.forecastday[0].hour.length; i++){
            //console.log(weatherData.forecast.forecastday[0].hour[i].time)
            
            let hourForeCast = new Date(weatherData.forecast.forecastday[0].hour[i].time)
            hourForeCast = hourForeCast.getHours()

            
            //hourForeCast = hourForeCast.toLocaleDateString("default", {hour: "2-digit", hourCycle: "h23"})
            //hourForeCast = hourForeCast.slice("12", "14")
            

            let sunriseToday = weatherData.forecast.forecastday[0].astro.sunrise
            let sunsetToday = weatherData.forecast.forecastday[0].astro.sunset

            sunriseToday = sunriseToday.slice("0", "2")
            sunsetToday = sunsetToday.slice("0", "2")

            sunsetToday = Number(sunsetToday) + 12

            const WEATHER_PER_HOUR = () =>{
                if(weatherData.forecast.forecastday[0].hour[i].is_day == 1){
                    if(weatherData.forecast.forecastday[0].hour[i].condition.text == 'Mist'){
                        //console.log("Mist Day")
                        return '<img src="fog.png">'
                    } else if (weatherData.forecast.forecastday[0].hour[i].condition.text == 'Sunny'){
                        //console.log("Sunny Day")
                        return '<img src="sunny.png">'
                    }else if((weatherData.forecast.forecastday[0].hour[i].condition.text == 'Partly cloudy')) {
                        //console.log("Partly Cloudy Day")
                        return '<img src="cloud-sun-off.png">'
                    } else if((weatherData.forecast.forecastday[0].hour[i].condition.text == 'Cloudy') || (weatherData.forecast.forecastday[0].hour[i].condition.text == 'Overcast')) {
                        //console.log("Overcast or cloudy Day")
                        return '<img src="cloud-removebg-preview.png">'
                    } else if ((weatherData.forecast.forecastday[0].hour[i].condition.text == 'Heavy rain')){
                        //console.log("Heavy Rain Day")
                        return '<img src="rain.png">'
                    } else if ((weatherData.forecast.forecastday[0].hour[i].condition.text == 'Moderate rain')){
                        //console.log("Moderate Rain Day")
                        return '<img src="rain.png">'
                    } else if ((weatherData.forecast.forecastday[0].hour[i].condition.text == 'Fog')){
                        //console.log("Fog Day")
                        return '<img src="fog.png">'
                    } else if((weatherData.forecast.forecastday[0].hour[i].condition.text == 'Patchy rain possible' || weatherData.forecast.forecastday[0].hour[i].condition.text == 'Light drizzle' || weatherData.forecast.forecastday[0].hour[i].condition.text == 'Light rain shower')){
                        return '<img src="rain.png">'
                    } else if (weatherData.forecast.forecastday[0].hour[i].condition.text == 'Patchy light rain' || weatherData.forecast.forecastday[0].hour[i].condition.text == 'Light rain' || weatherData.forecast.forecastday[0].hour[i].condition.text == 'Moderate or heavy rain shower' || weatherData.forecast.forecastday[0].hour[i].condition.text == 'Moderate rain at times' || weatherData.forecast.forecastday[0].hour[i].condition.text == 'Patchy light drizzle' || weatherData.forecast.forecastday[0].hour[i].condition.text == 'Light freezing rain'){
                        return '<img src="rain.png">'
                    } else if(weatherData.forecast.forecastday[0].hour[i].condition.text == 'Thundery outbreaks possible' || weatherData.forecast.forecastday[0].hour[i].condition.text == 'Patchy light rain with thunder' || weatherData.forecast.forecastday[0].hour[i].condition.text == 'Moderate or heavy rain with thunder') {
                        return '<img src="thunder.png">'
                    } else if(weatherData.forecast.forecastday[0].hour[i].condition.text.includes("snow")){
                        return '<img src="snowflake.png">'
                    }else if(weatherData.forecast.forecastday[0].hour[i].condition.text = "Light freezing rain"){
                        return '<img src="rain.png">'
                    }else if(weatherData.forecast.forecastday[0].hour[i].condition.text = "Blizzard"){
                        return '<img src="snowflake.png">'
                    }else{
                        console.log((weatherData.forecast.forecastday[0].hour[i].condition.text))
                        return 'CONDITION NOT DEFINED'
                    }

                } else {
                    if(weatherData.forecast.forecastday[0].hour[i].condition.text == 'Mist'){
                        //console.log("Mist Night")
                        return '<img src="fog.png">'
                    } else if (weatherData.forecast.forecastday[0].hour[i].condition.text == 'Clear'){
                        //console.log("Clear Night")
                        return '<img src="moon.png">'
                    }else if((weatherData.forecast.forecastday[0].hour[i].condition.text == 'Partly cloudy')) {
                        //console.log("Partly Cloudy Night")
                        return '<img src="cloud-moon.png">'
                    } else if((weatherData.forecast.forecastday[0].hour[i].condition.text == 'Cloudy') || (weatherData.forecast.forecastday[0].hour[i].condition.text == 'Overcast')) {
                        //console.log("Overcast or Cloudy Night")
                        return '<img src="cloud-removebg-preview.png">'
                    } else if ((weatherData.forecast.forecastday[0].hour[i].condition.text == 'Heavy rain')){
                        //console.log("Heavy Rain Night")
                        return '<img src="moon rain.png">'
                    } else if ((weatherData.forecast.forecastday[0].hour[i].condition.text == 'Moderate rain')){
                        //console.log("Moderate Rain Night")
                        return '<img src="moon rain.png">'
                    } else if ((weatherData.forecast.forecastday[0].hour[i].condition.text == 'Fog')){
                        //console.log("Fog Night")
                        return '<img src="fog.png">'
                    } else if((weatherData.forecast.forecastday[0].hour[i].condition.text == 'Patchy rain possible' || weatherData.forecast.forecastday[0].hour[i].condition.text == 'Light drizzle' || weatherData.forecast.forecastday[0].hour[i].condition.text == 'Light rain shower')){
                        return '<img src="moon rain.png">'
                    } else if (weatherData.forecast.forecastday[0].hour[i].condition.text == 'Patchy light rain' || weatherData.forecast.forecastday[0].hour[i].condition.text == 'Light rain' || weatherData.forecast.forecastday[0].hour[i].condition.text == 'Moderate or heavy rain shower' || weatherData.forecast.forecastday[0].hour[i].condition.text == 'Moderate rain at times' || weatherData.forecast.forecastday[0].hour[i].condition.text == 'Patchy light drizzle' || weatherData.forecast.forecastday[0].hour[i].condition.text == 'Light freezing rain'){
                        return '<img src="moon rain.png">'
                    } else if(weatherData.forecast.forecastday[0].hour[i].condition.text == 'Thundery outbreaks possible' || weatherData.forecast.forecastday[0].hour[i].condition.text == 'Patchy light rain with thunder' || weatherData.forecast.forecastday[0].hour[i].condition.text == 'Moderate or heavy rain with thunder') {
                        return '<img src="thunder night.png">'
                    } else if(weatherData.forecast.forecastday[0].hour[i].condition.text.includes("snow")){
                        return '<img src="snowflake.png">'
                    }else if(weatherData.forecast.forecastday[0].hour[i].condition.text = "Light freezing rain"){
                        return '<img src="rain.png">'
                    }else if(weatherData.forecast.forecastday[0].hour[i].condition.text = "Blizzard"){
                        return '<img src="snowflake.png">'
                    }else{
                        console.log((weatherData.forecast.forecastday[0].hour[i].condition.text))
                        return 'CONDITION NOT DEFINED'
                    }
                }
            }

            const hourWillITRain = () =>{
                if(weatherData.forecast.forecastday[0].hour[i].chance_of_rain){
                    //console.log(weatherData.forecast.forecastday[0].hour[i])
                    return `<span>${Math.round(weatherData.forecast.forecastday[0].hour[i].chance_of_rain / 10) * 10}%</span>`
                } else{
                    return ''
                }
            }
            const weatherPercentage = () =>{

                if(weatherData.forecast.forecastday[0].hour[i].chance_of_rain < weatherData.forecast.forecastday[0].hour[i].chance_of_snow){
                    return `<span>${Math.round(weatherData.forecast.forecastday[0].hour[i].chance_of_snow / 10) * 10}%</span>`
                }else if(weatherData.forecast.forecastday[0].hour[i].chance_of_rain >= weatherData.forecast.forecastday[0].hour[i].chance_of_snow && weatherData.forecast.forecastday[0].hour[i].chance_of_rain){
                    return `<span>${Math.round(weatherData.forecast.forecastday[0].hour[i].chance_of_rain / 10) * 10}%</span>`
                }else {
                    return ''
                }
            }
            
            
            if(timeRightNow == hourForeCast){
                const everyHour = document.createElement("div")
                everyHour.classList.add("every-hour")
                everyHour.innerHTML = `
                <span>Now</span>
                
                <div>
                    ${WEATHER_PER_HOUR()}
                    
                </div>
                <span>${Math.round(weatherData.forecast.forecastday[0].hour[i].temp_c)}°</span>
                `
                hourTempsHTML.appendChild(everyHour)
                hourForeCast24++

                
                
            }
            
            if(timeRightNow < hourForeCast){
                //console.log(`${hourForeCast} ${Math.round(weatherData.forecast.forecastday[0].hour[i].temp_c)}°`)
                


                if(Number(hourForeCast) == sunriseToday){
                    let hoursSunrise = weatherData.forecast.forecastday[0].astro.sunrise
                    hoursSunrise = hoursSunrise.slice("0", "5")

                    

                    const everyHour = document.createElement("div")
                    everyHour.classList.add("every-hour")
                    everyHour.innerHTML = `
                    <span>${hoursSunrise}</span>
                    <img src="sunrise-for-hour.png">
                    <span>Sunrise</span>
                    `
                    hourTempsHTML.appendChild(everyHour)
                }
        
                if(hourForeCast == sunsetToday){
                    //console.log(hourForeCast, sunsetToday)
                    let hoursSunset = weatherData.forecast.forecastday[0].astro.sunset
                    let hoursSunsetSLICED = (Number(hoursSunset.slice("0", "2")) + 12)
                    let lastValue = hoursSunsetSLICED.toString() + hoursSunset.slice("2", "5")
                    //console.log(lastValue)

                    const everyHour = document.createElement("div")
                    everyHour.classList.add("every-hour")
                    everyHour.innerHTML = `
                    <span>${lastValue}</span>
                    <img src="sunset-for-hour.png">
                    <span>Sunset</span>
                    `
                    hourTempsHTML.appendChild(everyHour)
                }

                //console.log(hourForeCast, sunsetToday)
                //console.log(weatherData.forecast.forecastday[0].astro.sunset)

                hourForeCast24++

                const everyHour = document.createElement("div")
                everyHour.classList.add("every-hour")
                everyHour.innerHTML = `
                <span>${String(hourForeCast).padStart(2, "0")}</span>
                <div>
                    ${WEATHER_PER_HOUR()}
                    ${weatherPercentage()}
                </div>
                <span>${Math.round(weatherData.forecast.forecastday[0].hour[i].temp_c)}°</span>
                `
                hourTempsHTML.appendChild(everyHour)
                
            }

            //console.log(hourForeCast)

             
        }

        for(let i = 0; i < weatherData.forecast.forecastday[1].hour.length; i++){
            //console.log(weatherData.forecast.forecastday[1].hour[i].time)
            
            let hourForeCast = new Date(weatherData.forecast.forecastday[0].hour[i].time)
            hourForeCast = hourForeCast.getHours()

            //hourForeCast = hourForeCast.toLocaleDateString("default", {hour: "2-digit", hourCycle: "h23"})
            //hourForeCast = hourForeCast.slice("12", "14")

            //console.log(hourForeCast)

            const WEATHER_PER_HOUR = () =>{
                if(weatherData.forecast.forecastday[1].hour[i].is_day == 1){
                    if(weatherData.forecast.forecastday[1].hour[i].condition.text == 'Mist'){
                        //console.log("Mist Day")
                        return '<img src="fog.png">'
                    } else if (weatherData.forecast.forecastday[1].hour[i].condition.text == 'Sunny'){
                        //console.log("Sunny Day")
                        return '<img src="sunny.png">'
                    }else if((weatherData.forecast.forecastday[1].hour[i].condition.text == 'Partly cloudy')) {
                        //console.log("Partly Cloudy Day")
                        return '<img src="cloud-sun-off.png">'
                    } else if((weatherData.forecast.forecastday[1].hour[i].condition.text == 'Cloudy') || (weatherData.forecast.forecastday[1].hour[i].condition.text == 'Overcast')) {
                        //console.log("Overcast or cloudy Day")
                        return '<img src="cloud-removebg-preview.png">'
                    } else if ((weatherData.forecast.forecastday[1].hour[i].condition.text == 'Heavy rain')){
                        //console.log("Heavy Rain Day")
                        return '<img src="rain.png">'
                    } else if ((weatherData.forecast.forecastday[1].hour[i].condition.text == 'Moderate rain')){
                        //console.log("Moderate Rain Day")
                        return '<img src="rain.png">'
                    } else if ((weatherData.forecast.forecastday[1].hour[i].condition.text == 'Fog')){
                        //console.log("Fog Day")
                        return '<img src="fog.png">'
                    } else if((weatherData.forecast.forecastday[1].hour[i].condition.text == 'Patchy rain possible' || weatherData.forecast.forecastday[1].hour[i].condition.text == 'Light drizzle' || weatherData.forecast.forecastday[1].hour[i].condition.text == 'Light rain shower')){
                        return '<img src="rain.png">'
                    } else if (weatherData.forecast.forecastday[1].hour[i].condition.text == 'Patchy light rain' || weatherData.forecast.forecastday[1].hour[i].condition.text == 'Light rain' || weatherData.forecast.forecastday[1].hour[i].condition.text == 'Moderate or heavy rain shower' || weatherData.forecast.forecastday[1].hour[i].condition.text == 'Moderate rain at times' || weatherData.forecast.forecastday[1].hour[i].condition.text == 'Patchy light drizzle' || weatherData.forecast.forecastday[1].hour[i].condition.text == 'Light freezing rain'){
                        return '<img src="rain.png">'
                    } else if(weatherData.forecast.forecastday[1].hour[i].condition.text == 'Thundery outbreaks possible' || weatherData.forecast.forecastday[1].hour[i].condition.text == 'Patchy light rain with thunder' || weatherData.forecast.forecastday[1].hour[i].condition.text == 'Moderate or heavy rain with thunder') {
                        return '<img src="thunder.png">'
                    } else if(weatherData.forecast.forecastday[1].hour[i].condition.text.includes("snow")){
                        return '<img src="snowflake.png">'
                    }else if(weatherData.forecast.forecastday[1].hour[i].condition.text = "Light freezing rain"){
                        return '<img src="rain.png">'
                    }else if(weatherData.forecast.forecastday[1].hour[i].condition.text = "Blizzard"){
                        return '<img src="snowflake.png">'
                    }else{
                        console.log((weatherData.forecast.forecastday[1].hour[i].condition.text))
                        return 'CONDITION NOT DEFINED'
                    }

                } else {
                    if(weatherData.forecast.forecastday[1].hour[i].condition.text == 'Mist'){
                        //console.log("Mist Night")
                        return '<img src="fog.png">'
                    } else if (weatherData.forecast.forecastday[1].hour[i].condition.text == 'Clear'){
                        //console.log("Clear Night")
                        return '<img src="moon.png">'
                    }else if((weatherData.forecast.forecastday[1].hour[i].condition.text == 'Partly cloudy')) {
                        //console.log("Partly Cloudy Night")
                        return '<img src="cloud-moon.png">'
                    } else if((weatherData.forecast.forecastday[1].hour[i].condition.text == 'Cloudy') || (weatherData.forecast.forecastday[1].hour[i].condition.text == 'Overcast')) {
                        //console.log("Overcast or Cloudy Night")
                        return '<img src="cloud-removebg-preview.png">'
                    } else if ((weatherData.forecast.forecastday[1].hour[i].condition.text == 'Heavy rain')){
                        //console.log("Heavy Rain Night")
                        return '<img src="moon rain.png">'
                    } else if ((weatherData.forecast.forecastday[1].hour[i].condition.text == 'Moderate rain')){
                        //console.log("Moderate Rain Night")
                        return '<img src="moon rain.png">'
                    } else if ((weatherData.forecast.forecastday[1].hour[i].condition.text == 'Fog')){
                        //console.log("Fog Night")
                        return '<img src="fog.png">'
                    } else if((weatherData.forecast.forecastday[1].hour[i].condition.text == 'Patchy rain possible' || weatherData.forecast.forecastday[1].hour[i].condition.text == 'Light drizzle' || weatherData.forecast.forecastday[1].hour[i].condition.text == 'Light rain shower')){
                        return '<img src="moon rain.png">'
                    } else if (weatherData.forecast.forecastday[1].hour[i].condition.text == 'Patchy light rain' || weatherData.forecast.forecastday[1].hour[i].condition.text == 'Light rain' || weatherData.forecast.forecastday[1].hour[i].condition.text == 'Moderate or heavy rain shower' || weatherData.forecast.forecastday[1].hour[i].condition.text == 'Moderate rain at times' || weatherData.forecast.forecastday[1].hour[i].condition.text == 'Patchy light drizzle' || weatherData.forecast.forecastday[1].hour[i].condition.text == 'Light freezing rain'){
                        return '<img src="moon rain.png">'
                    } else if(weatherData.forecast.forecastday[1].hour[i].condition.text == 'Thundery outbreaks possible' || weatherData.forecast.forecastday[1].hour[i].condition.text == 'Patchy light rain with thunder' || weatherData.forecast.forecastday[1].hour[i].condition.text == 'Moderate or heavy rain with thunder') {
                        return '<img src="thunder night.png">'
                    } else if(weatherData.forecast.forecastday[1].hour[i].condition.text.includes("snow")){
                        return '<img src="snowflake.png">'
                    }else if(weatherData.forecast.forecastday[1].hour[i].condition.text = "Light freezing rain"){
                        console.log(weatherData.forecast.forecastday[1].hour[i])
                        return '<img src="rain.png">'
                    }else if(weatherData.forecast.forecastday[1].hour[i].condition.text = "Blizzard"){
                        
                        return '<img src="snowflake.png">'
                    }else{
                        console.log((weatherData.forecast.forecastday[1].hour[i].condition.text))
                        return 'CONDITION NOT DEFINED'
                    }
                }
            }

            const hourWillITRain = () =>{
                if(weatherData.forecast.forecastday[1].hour[i].chance_of_rain){
                    //console.log(weatherData.forecast.forecastday[1].hour[i])
                    return `<span>${Math.round(weatherData.forecast.forecastday[1].hour[i].chance_of_rain / 10) * 10}%</span>`
                } else{
                    return ''
                }
            }
            const weatherPercentage = () =>{

                if(weatherData.forecast.forecastday[1].hour[i].chance_of_rain < weatherData.forecast.forecastday[1].hour[i].chance_of_snow){
                    return `<span>${Math.round(weatherData.forecast.forecastday[1].hour[i].chance_of_snow / 10) * 10}%</span>`
                }else if(weatherData.forecast.forecastday[1].hour[i].chance_of_rain >= weatherData.forecast.forecastday[0].hour[i].chance_of_snow && weatherData.forecast.forecastday[1].hour[i].chance_of_rain){
                    return `<span>${Math.round(weatherData.forecast.forecastday[1].hour[i].chance_of_rain / 10) * 10}%</span>`
                }else {
                    return ''
                }
            }

            if(hourForeCast24 <= 24){
                hourForeCast24++
                //console.log(`${hourForeCast} ${Math.round(weatherData.forecast.forecastday[1].hour[i].temp_c)}°`)
                
                //console.log(weatherData.forecast.forecastday[1].hour[i].time, weatherData.forecast.forecastday[1].hour[i].condition.text)
                //console.log(weatherData)

                //console.log(sunriseTomorrow, hourForeCast)
                const everyHour = document.createElement("div")
                everyHour.classList.add("every-hour")
                everyHour.innerHTML = `
                <span>${String(hourForeCast).padStart(2, "0")}</span>
                <div>
                    ${WEATHER_PER_HOUR()}
                    ${weatherPercentage()}
                </div>
                <span>${Math.round(weatherData.forecast.forecastday[1].hour[i].temp_c)}°</span>
                `
                hourTempsHTML.appendChild(everyHour)

                

                if(Number(hourForeCast) == sunriseTomorrow){
                    let hoursSunrise = weatherData.forecast.forecastday[1].astro.sunrise
                    hoursSunrise = hoursSunrise.slice("0", "5")
                    //console.log(hoursSunrise)

                    const everyHour = document.createElement("div")
                    everyHour.classList.add("every-hour")
                    everyHour.innerHTML = `
                    <span>${hoursSunrise}</span>
                    <img src="sunrise-for-hour.png">
                    <span>Sunrise</span>
                    `
                    hourTempsHTML.appendChild(everyHour)
                }
        
                if(hourForeCast == sunsetTomorrow){
                    let hoursSunset = weatherData.forecast.forecastday[1].astro.sunset
                    let hoursSunsetSLICED = (Number(hoursSunset.slice("0", "2")) + 12)
                    let lastValue = hoursSunsetSLICED.toString() + hoursSunset.slice("2", "5")

                    const everyHour = document.createElement("div")
                    everyHour.classList.add("every-hour")
                    everyHour.innerHTML = `
                    <span>${lastValue}</span>
                    <img src="sunset-for-hour.png">
                    <span>Sunset</span>
                    `
                    hourTempsHTML.appendChild(everyHour)
                }


                
            }  
        }

        //console.log(weatherData.current.last_updated)
        //console.log(hourForeCast24)

        //console.log(weatherData.forecast.forecastday[0].astro)
    }
    //hourlyForecast()

    const windDirectionFunction = () =>{
        const lineWrap = document.querySelector(".line-wrap")

        //console.log(weatherData.current.wind_dir)

        let wind_direction = weatherData.current.wind_dir

        if(wind_direction == 'N'){
            lineWrap.style.rotate = '0deg'
            
        }else if(wind_direction == 'S'){
            lineWrap.style.rotate = '180deg'
        }else if(wind_direction == 'E'){
            lineWrap.style.rotate = '90deg'
        }else if(wind_direction == 'W'){
            lineWrap.style.rotate = '270deg'
        }else if(wind_direction == 'NE'){
            lineWrap.style.rotate = '45deg'
        }else if(wind_direction == 'SE'){
            lineWrap.style.rotate = '135deg'
        }else if(wind_direction == 'SW'){
            lineWrap.style.rotate = '225deg'
        }else if(wind_direction == 'NW'){
            lineWrap.style.rotate = '315deg'
        }else if(wind_direction == 'NNE'){
            lineWrap.style.rotate = '22.5deg'
        }else if(wind_direction == 'ENE'){
            lineWrap.style.rotate = '67.5deg'
        }else if(wind_direction == 'ESE'){
            lineWrap.style.rotate = '112.5deg'
        }else if(wind_direction == 'SSE'){
            lineWrap.style.rotate = '157.5deg'
        }else if(wind_direction == 'SSW'){
            lineWrap.style.rotate = '202.5deg'
        }else if(wind_direction == 'WSW'){
            lineWrap.style.rotate = '247.5deg'
        }else if(wind_direction == 'WNW'){
            lineWrap.style.rotate = '292.5deg'
        }else if(wind_direction == 'NNW'){
            lineWrap.style.rotate = '337.5deg'
        }
    }

    //windDirectionFunction()

    const pressureLevels = () =>{
        //console.log(weatherData.current.pressure_mb)

        if(weatherData.current.pressure_mb > 1015){
            return 'High'
        }else if(weatherData.current.pressure_mb < 1011){
            return 'Low'
        }else{
            return 'Average'
        }
    }

    const airQuality = () =>{

        let qualityIndex = weatherData.current.air_quality['gb-defra-index']

        if(qualityIndex >= 10){
            return `${qualityIndex}`
        }else if(qualityIndex > 6){
            return `${qualityIndex}`
        }else if(qualityIndex > 3){
            return `${qualityIndex}`
        }else if(qualityIndex >= 0){
            return `${qualityIndex}`
        }
    }

    const airQualityHighLow = () =>{
        let qualityIndex = weatherData.current.air_quality['gb-defra-index']

        if(qualityIndex >= 10){
            return `Very High`
        }else if(qualityIndex > 6){
            return `High`
        }else if(qualityIndex > 3){
            return `Moderate`
        }else if(qualityIndex >= 0){
            return `Low`
        }
    }
    
    
    const airQualityMessage = () =>{
        let qualityIndex = weatherData.current.air_quality['gb-defra-index']

        if(qualityIndex >= 10){
            return `People with lung and heart problems, should avoid any physical activity.`
        }else if(qualityIndex > 6){
            return `People with lung and heart problems, should limit outdoor physical activities.`
        }else if(qualityIndex > 3){
            return `People with lung or heart issues, should reduce strenuous outdoor activity.`
        }else if(qualityIndex >= 0){
            return `Enjoy your usual outdoor activities.`
        }
    }
    
    

    //const max_temp = weatherData.forecast.forecastday[0].day.maxtemp_c
    //const min_temp = weatherData.forecast.forecastday[0].day.mintemp_c
    
    const actualHighAndLow = () =>{
        const temps = []
        for(let i = 0; i < weatherData.forecast.forecastday[0].hour.length; i++){
            temps.push(weatherData.forecast.forecastday[0].hour[i].temp_c)
        }
        return temps 
    }
    
    

    //creating the html elements
    divHTML.innerHTML =  `
    <div class="top-info">
        <span>${weatherData.location.name}, ${weatherData.location.country}</span>
        <span>${Math.round(weatherData.current.temp_c)}°</span>
        <span>${weatherData.current.condition.text}</span>
        <div class="high-low">
            <span>H:${Math.round(Math.max(...actualHighAndLow()))}°</span>
            <span>L:${Math.round(Math.min(...actualHighAndLow()))}°</span>
        </div>
    </div>
    <div class="alerts-wrapper"></div>
    <div class="hour-14dayforecast">
        <div class="hour-temps">
            
        </div>
        <div class="longforecast">
            <div>
            <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" ><path d="M19.5,2h-1.5V.5c0-.28-.22-.5-.5-.5s-.5,.22-.5,.5v1.5H7V.5c0-.28-.22-.5-.5-.5s-.5,.22-.5,.5v1.5h-1.5C2.02,2,0,4.02,0,6.5v13c0,2.48,2.02,4.5,4.5,4.5h15c2.48,0,4.5-2.02,4.5-4.5V6.5c0-2.48-2.02-4.5-4.5-4.5Zm-8,7v4H7v-4h4.5Zm5.5,0v4h-4.5v-4h4.5Zm6,0v4h-5v-4h5ZM6,13H1v-4H6v4Zm-5,1H6v4H1v-4Zm6,0h4.5v4H7v-4Zm4.5,5v4H7v-4h4.5Zm1,0h4.5v4h-4.5v-4Zm0-1v-4h4.5v4h-4.5Zm5.5-4h5v4h-5v-4ZM4.5,3h15c1.93,0,3.5,1.57,3.5,3.5v1.5H1v-1.5c0-1.93,1.57-3.5,3.5-3.5ZM1,19.5v-.5H6v4h-1.5c-1.93,0-3.5-1.57-3.5-3.5Zm18.5,3.5h-1.5v-4h5v.5c0,1.93-1.57,3.5-3.5,3.5Z"/></svg>  
                <span>14-DAY FORECAST</span>
            </div>

            <div class="days-wrap">
            
            </div>
            
        </div>
    </div>
    <div class="weather-data-atm">
        <div class="uv-index">
            <div>
            <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" ><path d="M12,17c-2.76,0-5-2.24-5-5s2.24-5,5-5,5,2.24,5,5-2.24,5-5,5Zm1-13V1c0-.55-.45-1-1-1s-1,.45-1,1v3c0,.55,.45,1,1,1s1-.45,1-1Zm0,19v-3c0-.55-.45-1-1-1s-1,.45-1,1v3c0,.55,.45,1,1,1s1-.45,1-1ZM5,12c0-.55-.45-1-1-1H1c-.55,0-1,.45-1,1s.45,1,1,1h3c.55,0,1-.45,1-1Zm19,0c0-.55-.45-1-1-1h-3c-.55,0-1,.45-1,1s.45,1,1,1h3c.55,0,1-.45,1-1ZM6.71,6.71c.39-.39,.39-1.02,0-1.41l-2-2c-.39-.39-1.02-.39-1.41,0s-.39,1.02,0,1.41l2,2c.2,.2,.45,.29,.71,.29s.51-.1,.71-.29Zm14,14c.39-.39,.39-1.02,0-1.41l-2-2c-.39-.39-1.02-.39-1.41,0s-.39,1.02,0,1.41l2,2c.2,.2,.45,.29,.71,.29s.51-.1,.71-.29Zm-16,0l2-2c.39-.39,.39-1.02,0-1.41s-1.02-.39-1.41,0l-2,2c-.39,.39-.39,1.02,0,1.41,.2,.2,.45,.29,.71,.29s.51-.1,.71-.29ZM18.71,6.71l2-2c.39-.39,.39-1.02,0-1.41s-1.02-.39-1.41,0l-2,2c-.39,.39-.39,1.02,0,1.41,.2,.2,.45,.29,.71,.29s.51-.1,.71-.29Z"/></svg>
                <span>UV INDEX</span>
            </div>
            <span>${weatherData.current.uv} </span>
            <span>${UVINDEX()}</span>
            <div class="uv-slider">
                <div class="ball"></div>
            </div>
            <span>${sunscreenBetweenTimes()}</span>
        </div>
        <div class="sunset">
            <div>
                ${svgSun()}
                <span>${sunrise()}</span>
            </div>
            <span>${sunriseORsunset()}</span>

            <div class="sunrise-sunset-icon">
                <img class="sunrise-img" src="final image.png">
                <div class="little-sun"></div>
            </div>

            <span>${sunset()}: ${sunriseORsunsetLittleText()}</span>
            
        </div>
        <div class="wind">
            <div>
            <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24"><path d="M0,12a1,1,0,0,1,1-1H7a1,1,0,0,1,0,2H1A1,1,0,0,1,0,12Zm20.886-.893A4.99,4.99,0,1,0,12,8a1,1,0,0,0,2,0,3,3,0,1,1,3,3H11a1,1,0,0,0,0,2h9a2,2,0,0,1,2,2c-.009,2.337-3.281,2.648-4.057.667a1,1,0,0,0-1.886.666C17.615,20.415,23.952,19.579,24,15A4,4,0,0,0,20.886,11.107ZM11,16H1a1,1,0,0,0,0,2H11a2,2,0,0,1,2,2c-.009,2.337-3.281,2.648-4.057.667a1,1,0,1,0-1.886.666C8.615,25.415,14.952,24.579,15,20A4,4,0,0,0,11,16ZM1,8H7a4,4,0,0,0,4-4C10.952-.581,4.613-1.414,3.057,2.667a1,1,0,0,0,1.886.666C5.72,1.351,8.991,1.663,9,4A2,2,0,0,1,7,6H1A1,1,0,0,0,1,8Z"/></svg>
                <span>WIND</span>
            </div>
        
            <div class="wind-compas">
                <svg class="svg-north" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>
                
                <div class="south-north">
                    <div class="north">N</div>
                    <div class="south">S</div>
                </div>
                
                <div class="west-east">
                    <div class="west">W</div>
                    <div class="east">E</div>
                </div>

                <div class="text-place">
                    <span>${Math.round(weatherData.current.wind_kph)}</span>
                    <span>km/h</span>
                </div>

                <div class="line-wrap">
                    <div class="line"></div>
                    <div class="circle"></div>
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M0 55.2V426c0 12.2 9.9 22 22 22c6.3 0 12.4-2.7 16.6-7.5L121.2 346l58.1 116.3c7.9 15.8 27.1 22.2 42.9 14.3s22.2-27.1 14.3-42.9L179.8 320H297.9c12.2 0 22.1-9.9 22.1-22.1c0-6.3-2.7-12.3-7.4-16.5L38.6 37.9C34.3 34.1 28.9 32 23.2 32C10.4 32 0 42.4 0 55.2z"/></svg>
                </div>
                
            </div>
        </div>
        <div class="rain">
            <div>
                <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512.000000 512.000000"
                preserveAspectRatio="xMidYMid meet">

                <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                >
                <path d="M2413 4898 c-779 -1184 -1258 -2187 -1394 -2918 -26 -137 -36 -428
                -20 -553 84 -631 499 -1151 1076 -1345 434 -147 924 -86 1305 159 472 305 750
                820 751 1387 0 180 -20 332 -66 522 -147 597 -468 1299 -995 2175 -196 325
                -495 785 -511 785 -3 0 -70 -96 -146 -212z"/>
                </g>
                </svg>
                <span>PRECIPITATION</span>
            </div>
            <span>${Math.round(weatherData.forecast.forecastday[0].day.totalprecip_mm)} mm in last 24h</span>
            <span>${nextRainingDay()}</span>
        </div>
        <div class="feels-like">
            <div>
                ${howDoesItFeelSVG()}
                <span>FEELS LIKE</span>
            </div>
            <span>${currentFeelsLikeTemp()}°</span>
            <span>${howDoesItFeel()}</span>
        </div>
        <div class="humidity">
            <div>
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512.000000 512.000000"
            preserveAspectRatio="xMidYMid meet">
           
           <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
           >
           <path d="M1866 4785 c-22 -7 -49 -24 -62 -37 -39 -40 -329 -452 -499 -708
           -524 -791 -834 -1397 -948 -1850 -28 -113 -31 -140 -32 -285 0 -184 17 -297
           72 -470 91 -287 267 -550 492 -737 218 -181 456 -294 736 -350 148 -30 422
           -32 570 -4 199 36 431 126 582 225 77 50 108 102 100 169 -9 81 -77 142 -157
           142 -35 0 -60 -8 -106 -36 -234 -142 -431 -199 -694 -199 -172 0 -243 11 -396
           60 -201 66 -348 157 -505 314 -110 110 -181 206 -241 326 -118 234 -164 517
           -119 731 80 384 395 1001 916 1789 196 295 333 490 345 490 19 0 401 -565 595
           -880 317 -515 557 -998 633 -1273 19 -66 19 -72 4 -72 -33 0 -118 48 -177 99
           -83 72 -219 138 -325 157 -202 38 -404 -18 -565 -156 -78 -68 -146 -99 -238
           -109 -41 -5 -88 -16 -104 -26 -97 -57 -103 -201 -11 -267 47 -33 141 -36 249
           -9 109 27 193 71 281 144 104 88 163 112 268 112 104 -1 163 -25 260 -109 161
           -138 378 -194 585 -151 94 20 214 81 305 156 105 86 144 102 255 103 79 1 97
           -2 145 -26 31 -15 85 -53 120 -83 80 -70 201 -130 300 -151 188 -39 295 13
           295 144 0 101 -53 148 -182 163 -95 10 -142 32 -233 109 -126 107 -292 170
           -445 170 -133 0 -294 -54 -398 -133 -26 -21 -51 -37 -55 -37 -4 0 -18 35 -31
           78 -90 311 -364 856 -698 1391 -194 311 -635 957 -712 1045 -39 45 -116 63
           -175 41z"/>
           <path d="M4025 4625 c-50 -18 -76 -48 -214 -244 -200 -285 -345 -546 -413
           -742 -30 -86 -32 -104 -32 -214 1 -100 5 -132 26 -197 39 -119 92 -204 182
           -294 90 -90 175 -143 294 -182 67 -22 94 -26 212 -26 118 0 145 4 212 26 119
           39 204 92 294 182 90 90 143 175 182 294 21 65 25 96 26 197 0 131 -13 183
           -89 357 -105 238 -466 792 -542 832 -45 23 -94 27 -138 11z m152 -562 c155
           -239 246 -409 283 -532 30 -97 23 -170 -25 -267 -42 -86 -102 -144 -193 -187
           -61 -29 -76 -32 -162 -32 -86 0 -101 3 -162 32 -91 43 -151 101 -193 187 -48
           97 -55 170 -25 267 22 75 82 202 153 324 63 109 218 345 227 345 4 0 48 -62
           97 -137z"/>
           <path d="M2380 1725 c-91 -21 -212 -83 -300 -156 -92 -76 -139 -98 -233 -108
           -89 -10 -128 -29 -158 -78 -69 -111 14 -243 153 -243 140 1 288 58 418 164
           119 96 154 111 265 111 107 0 170 -24 252 -97 258 -230 635 -235 893 -12 99
           86 155 109 265 109 110 0 166 -23 265 -109 122 -106 298 -172 437 -164 43 3
           71 10 90 24 93 70 96 192 7 261 -26 19 -52 27 -114 34 -97 11 -149 35 -245
           114 -277 228 -645 217 -910 -26 -16 -15 -55 -40 -85 -56 -48 -24 -67 -27 -145
           -28 -107 0 -166 23 -255 99 -132 114 -264 166 -430 172 -68 2 -128 -2 -170
           -11z"/>
           </g>
           </svg>
                <span>HUMIDITY</span>
            </div>
            <span>${weatherData.current.humidity}%</span>
            <span>${dewPoint()}.</span>
        </div>
        <div class="visibility">
            <div>
                ${visibilitySVG()}
                <span>VISIBILITY</span>
            </div>
            <span>${weatherData.current.vis_km} km</span>
            <span>${visibility()}</span>
        </div>
        <div class="pressure">
            <div>
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 512.000000 512.000000"
            preserveAspectRatio="xMidYMid meet">
           
            <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)">
           <path d="M2300 4656 c-386 -53 -721 -190 -1022 -417 -107 -80 -317 -290 -397
           -397 -703 -931 -529 -2240 392 -2954 366 -283 822 -438 1287 -438 809 1 1539
           457 1896 1186 350 714 266 1566 -217 2206 -80 107 -290 317 -397 397 -278 210
           -596 347 -946 407 -124 21 -471 27 -596 10z m100 -445 c0 -144 7 -171 53 -219
           75 -77 199 -57 246 42 18 36 21 61 21 174 l0 132 28 0 c56 0 219 -33 330 -66
           202 -61 389 -155 560 -281 l74 -54 -105 -108 c-83 -85 -107 -116 -112 -145
           -28 -148 127 -250 256 -167 24 16 78 63 119 106 l75 77 28 -34 c54 -63 149
           -213 199 -312 83 -165 154 -404 174 -583 l7 -63 -150 0 c-139 0 -152 -2 -184
           -23 -109 -73 -105 -212 7 -267 34 -17 61 -20 183 -20 l144 0 -7 -52 c-23 -173
           -82 -384 -146 -521 l-32 -67 -1610 2 -1609 3 -34 75 c-65 148 -120 347 -141
           508 l-7 52 134 0 c112 0 139 3 173 20 117 57 123 215 11 277 -36 20 -54 23
           -179 23 l-139 0 7 63 c32 285 162 607 349 860 l50 68 96 -94 c107 -105 142
           -127 201 -127 107 0 183 105 149 207 -8 25 -45 72 -111 139 l-100 102 59 44
           c128 99 282 186 436 247 130 52 364 108 460 110 l37 1 0 -129z m1522 -2808
           c-51 -61 -192 -197 -257 -250 -135 -109 -347 -226 -521 -286 -209 -73 -411
           -102 -648 -94 -342 11 -638 107 -932 302 -110 73 -281 226 -365 326 l-41 49
           1402 0 1402 0 -40 -47z"/>
           <path d="M2505 3609 c-44 -12 -78 -54 -115 -139 -18 -41 -89 -196 -157 -345
           -170 -368 -177 -390 -178 -540 0 -118 1 -121 37 -199 49 -101 148 -203 240
           -246 252 -118 552 -18 680 227 45 85 63 171 55 267 -8 91 -35 166 -149 421
           -50 110 -117 261 -151 335 -74 165 -89 187 -141 211 -44 20 -74 22 -121 8z
           m110 -641 c91 -193 135 -310 135 -361 0 -77 -48 -152 -113 -176 -69 -26 -174
           -4 -219 46 -45 50 -60 137 -34 209 24 70 168 384 176 384 4 0 29 -46 55 -102z"/>
           </g>
           </svg>
                <span>PRESSURE</span>
            </div>
            <span>${weatherData.current.pressure_mb} hPa</span>
            <span>${pressureLevels()}</span>

        </div>

        <div class="air-quality">
            <div>
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M320 0c17.7 0 32 14.3 32 32V164.1c0 16.4 8.4 31.7 22.2 40.5l9.8 6.2V165.3C384 127 415 96 453.3 96c21.7 0 42.8 10.2 55.8 28.8c15.4 22.1 44.3 65.4 71 116.9c26.5 50.9 52.4 112.5 59.6 170.3c.2 1.3 .2 2.6 .2 4v7c0 49.1-39.8 89-89 89c-7.3 0-14.5-.9-21.6-2.7l-72.7-18.2C414 480.5 384 442.1 384 398V325l90.5 57.6c7.5 4.7 17.3 2.5 22.1-4.9s2.5-17.3-4.9-22.1L384 287.1v-.4l-44.1-28.1c-7.3-4.6-13.9-10.1-19.9-16.1c-5.9 6-12.6 11.5-19.9 16.1L256 286.7 161.2 347l-13.5 8.6c0 0 0 0-.1 0c-7.4 4.8-9.6 14.6-4.8 22.1c4.7 7.5 14.6 9.7 22.1 4.9l91.1-58V398c0 44.1-30 82.5-72.7 93.1l-72.7 18.2c-7.1 1.8-14.3 2.7-21.6 2.7c-49.1 0-89-39.8-89-89v-7c0-1.3 .1-2.7 .2-4c7.2-57.9 33.1-119.4 59.6-170.3c26.8-51.5 55.6-94.8 71-116.9c13-18.6 34-28.8 55.8-28.8C225 96 256 127 256 165.3v45.5l9.8-6.2c13.8-8.8 22.2-24.1 22.2-40.5V32c0-17.7 14.3-32 32-32z"/></svg>
                <span>AIR QUALITY</span>
            </div>
            <span>${airQuality()} </span>
            <span>${airQualityHighLow()}</span>
            <div class="air-quality-slider">
                <div class="ball-air-quality"></div>
            </div>

            <span>${airQualityMessage()}</span>
        </div>

    </div>
    `
    

    //NOTE IT HAS TO BE CALLED IN THE END
    forecast14Days()
    hourlyForecast()
    sliderUV()
    styleSunOnImg()
    windDirectionFunction()
    sliderAQ()
    styleTemperatureAmplitude()
    

    //SCROLLABLE THINGY PART
    //selecting the wrapper
    const wrapper = document.querySelector(".hour-temps")

    let mouseDown = false //will change if mouse is clicked

    const dragging = (e)=>{
        if(!mouseDown){ //if the mouse isnt click this will not run
            return
        }
        wrapper.style.cursor = `grabbing` //styling for the cursor
        e.preventDefault() //preventing default behaviour
        wrapper.scrollLeft -= e.movementX //the scroll movement
    }

    wrapper.addEventListener("mousedown", ()=>{
        mouseDown = true //when the mouse is down change the variable value
        wrapper.style.cursor = `grabbing`
    })
    wrapper.addEventListener("mousemove", dragging) //when the mouse moves run the function

    wrapper.addEventListener("mouseup", ()=>{
        mouseDown = false //mouse is no longer clicked
        wrapper.style.cursor = `grab`
    })
    wrapper.addEventListener("mouseleave", ()=>{
        mouseDown = false //mouse leaves the element
        wrapper.style.cursor = `grab`
    })

    const createElement = () =>{
        //const wrapper = document.querySelector(".forecast-days-wrap")
        //const WHLE_ELMNT = document.querySelector(".advanced-data")
        const PARENT_ELEMENT = document.querySelector(".additional-info")

        PARENT_ELEMENT.style.marginTop = `8.9rem`

        PARENT_ELEMENT.innerHTML = ` `
        const headline = document.createElement("div")
        headline.classList.add("headline")
        headline.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24"><path d="M12,17c-2.76,0-5-2.24-5-5s2.24-5,5-5,5,2.24,5,5-2.24,5-5,5Zm1-13V1c0-.55-.45-1-1-1s-1,.45-1,1v3c0,.55,.45,1,1,1s1-.45,1-1Zm0,19v-3c0-.55-.45-1-1-1s-1,.45-1,1v3c0,.55,.45,1,1,1s1-.45,1-1ZM5,12c0-.55-.45-1-1-1H1c-.55,0-1,.45-1,1s.45,1,1,1h3c.55,0,1-.45,1-1Zm19,0c0-.55-.45-1-1-1h-3c-.55,0-1,.45-1,1s.45,1,1,1h3c.55,0,1-.45,1-1ZM6.71,6.71c.39-.39,.39-1.02,0-1.41l-2-2c-.39-.39-1.02-.39-1.41,0s-.39,1.02,0,1.41l2,2c.2,.2,.45,.29,.71,.29s.51-.1,.71-.29Zm14,14c.39-.39,.39-1.02,0-1.41l-2-2c-.39-.39-1.02-.39-1.41,0s-.39,1.02,0,1.41l2,2c.2,.2,.45,.29,.71,.29s.51-.1,.71-.29Zm-16,0l2-2c.39-.39,.39-1.02,0-1.41s-1.02-.39-1.41,0l-2,2c-.39,.39-.39,1.02,0,1.41,.2,.2,.45,.29,.71,.29s.51-.1,.71-.29ZM18.71,6.71l2-2c.39-.39,.39-1.02,0-1.41s-1.02-.39-1.41,0l-2,2c-.39,.39-.39,1.02,0,1.41,.2,.2,.45,.29,.71,.29s.51-.1,.71-.29Z"></path></svg>
        <span>UV Index</span>
        `
        const closeX = document.createElement("div")
        closeX.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
        `
        headline.appendChild(closeX)
        PARENT_ELEMENT.appendChild(headline)

        closeX.addEventListener("click", ()=>{
            PARENT_ELEMENT.innerHTML = ``
            ADVANCED_DATA_OVERLAY.style.display = "none"
            body.style.overflow = "auto"
        })
        
        const WHLE_ELMNT = document.createElement("div")
        WHLE_ELMNT.classList.add("advanced-data")
        PARENT_ELEMENT.appendChild(WHLE_ELMNT)
        WHLE_ELMNT.innerHTML = ``
        const wrapper = document.createElement("div")
        wrapper.classList.add("forecast-days-wrap")
        const index = document.createElement("div")
        index.classList.add("index")
        const extraText = document.createElement("div")
        extraText.classList.add("extra-text")
        WHLE_ELMNT.appendChild(wrapper)
        const finalInfo = document.createElement("div")
        finalInfo.classList.add("final-info")
        finalInfo.innerHTML = `
        <span>About the UV Index</span>
        <span>The World Heath Organization's UV Index (UVI) measures ultraviolet radiation. The higher the UVI, the greater the potention for damage and the faster harm can occur. The UVI can help you decide when to protect yourself from the sun and when to avoid being outside. The WHO recommends using shade, sunscreen, hats and protective clothing at levels of 3 (Moderate or higher.)</span>
        `
        

        //will determine if uv is high low or average
        const UVINDEX = () =>{
            if(weatherData.current.uv == 1 || weatherData.current.uv == 2 || weatherData.current.uv == 0){
                return 'Low'
            } else if (weatherData.current.uv == 3 || weatherData.current.uv == 4 || weatherData.current.uv == 5){
                return 'Moderate'
            } else if (weatherData.current.uv == 6 || weatherData.current.uv == 7){
                return 'High'
            } else if(weatherData.current.uv == 8 || weatherData.current.uv == 9 || weatherData.current.uv == 10){
                return 'Very High'
            } else if (weatherData.current.uv > 11){
                return 'Extreme'
            }
        }

        for(let i = 0; i < weatherData.forecast.forecastday.length; i++){
            let days = new Date(weatherData.forecast.forecastday[i].date)
            let daysShort = days.toLocaleDateString("default", {"weekday": "narrow"})
            let fullDay = days.toLocaleDateString("default", {weekday: "long", day: "2-digit", month: "long", "year": "numeric"})
            let numbersDays = days.toLocaleDateString("default", {day: "2-digit"})
            let currentHour = new Date(weatherData.current.last_updated).getHours()
            let sunsetToday = Number(weatherData.forecast.forecastday[i].astro.sunset.slice("0", "2")) + 12
            
            //console.log(fullDay)
            if(i == 0){
                //console.log("Today", weatherData.current.uv)
                const day = document.createElement("div")
                day.classList.add("forecast-each-day")
                day.innerHTML = `
                <span>${daysShort}</span>
                <span class="numbers active">${numbersDays}</span>
                `
                wrapper.appendChild(day)

                const textForUVIndex = () =>{
                    let arrayOfHours = []
                    for(let j = 0; j < weatherData.forecast.forecastday[i].hour.length; j++){
                        //console.log(weatherData.forecast.forecastday[i].hour[j].uv)
                        
                        if(weatherData.forecast.forecastday[i].hour[j].uv >= 3){
                            arrayOfHours.push(weatherData.forecast.forecastday[i].hour[j].time)
                            //console.log(arrayOfHours)
                        }

                        if(j == weatherData.forecast.forecastday[i].hour.length - 1){
                            if(arrayOfHours.length > 0){
                                if(currentHour > sunsetToday){
                                    return `Low for the rest of the day. Levels of Moderate or higher were reached from ${arrayOfHours[0].slice("11")} to ${arrayOfHours[arrayOfHours.length - 1].slice("11")}.`
                                    
                                }else if(currentHour <= sunsetToday && weatherData.current.uv >= 6){
                                    return `Sun protection strongly recommended. Levels of Moderate or higher are reached from ${arrayOfHours[0].slice("11")} to ${arrayOfHours[arrayOfHours.length - 1].slice("11")}.`
                                    //console.log(arrayOfHours)
                                    
                                }else if(currentHour <= sunsetToday && weatherData.current.uv < 3 && arrayOfHours){
                                    //console.log(arrayOfHours)
                                    return `Low levels at the moment. Levels of Moderate or higher are reached from ${arrayOfHours[0].slice("11")} to ${arrayOfHours[arrayOfHours.length - 1].slice("11")}.`
                                    
                                }else if(currentHour <= sunsetToday && weatherData.current.uv >= 3){
                                    return `Sun protection recommended. Levels of Moderate or higher are reached from ${arrayOfHours[0].slice("11")} to ${arrayOfHours[arrayOfHours.length - 1].slice("11")}.`
                                    //console.log(arrayOfHours)
                                }
                            }else {
                                return 'Low levels all day.'
                            }
                        }
                    }
                }

                const fullDate = document.createElement("div")
                fullDate.classList.add("datepicked")
                fullDate.textContent = fullDay
                WHLE_ELMNT.appendChild(fullDate)
                index.innerHTML = `
                <span>${weatherData.current.uv}</span>
                <span class="determiner">${UVINDEX()}</span>
                <span>World Health Organization UVI</span>

                <div class="dropdown">

                    <div class="select">
                        <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24"><path d="M12,17c-2.76,0-5-2.24-5-5s2.24-5,5-5,5,2.24,5,5-2.24,5-5,5Zm1-13V1c0-.55-.45-1-1-1s-1,.45-1,1v3c0,.55,.45,1,1,1s1-.45,1-1Zm0,19v-3c0-.55-.45-1-1-1s-1,.45-1,1v3c0,.55,.45,1,1,1s1-.45,1-1ZM5,12c0-.55-.45-1-1-1H1c-.55,0-1,.45-1,1s.45,1,1,1h3c.55,0,1-.45,1-1Zm19,0c0-.55-.45-1-1-1h-3c-.55,0-1,.45-1,1s.45,1,1,1h3c.55,0,1-.45,1-1ZM6.71,6.71c.39-.39,.39-1.02,0-1.41l-2-2c-.39-.39-1.02-.39-1.41,0s-.39,1.02,0,1.41l2,2c.2,.2,.45,.29,.71,.29s.51-.1,.71-.29Zm14,14c.39-.39,.39-1.02,0-1.41l-2-2c-.39-.39-1.02-.39-1.41,0s-.39,1.02,0,1.41l2,2c.2,.2,.45,.29,.71,.29s.51-.1,.71-.29Zm-16,0l2-2c.39-.39,.39-1.02,0-1.41s-1.02-.39-1.41,0l-2,2c-.39,.39-.39,1.02,0,1.41,.2,.2,.45,.29,.71,.29s.51-.1,.71-.29ZM18.71,6.71l2-2c.39-.39,.39-1.02,0-1.41s-1.02-.39-1.41,0l-2,2c-.39,.39-.39,1.02,0,1.41,.2,.2,.45,.29,.71,.29s.51-.1,.71-.29Z"></path></svg>
                        <svg class="rotated " xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"/></svg>
                    </div>

                    <div class="menu-wrapper">
                        <div class="each-item-menu">
                            <div class="svg-tick">
                                
                            </div>
                            <div>
                                <span>Conditions</span>
                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M0 336c0 79.5 64.5 144 144 144H512c70.7 0 128-57.3 128-128c0-61.9-44-113.6-102.4-125.4c4.1-10.7 6.4-22.4 6.4-34.6c0-53-43-96-96-96c-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32C167.6 32 96 103.6 96 192c0 2.7 .1 5.4 .2 8.1C40.2 219.8 0 273.2 0 336z"></path></svg>
                            </div>
                        </div>
                        <div class="each-item-menu">
                            <div class="svg-tick">
                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
                            </div>
                            <div>
                                <span>UV Index</span>
                                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24"><path d="M12,17c-2.76,0-5-2.24-5-5s2.24-5,5-5,5,2.24,5,5-2.24,5-5,5Zm1-13V1c0-.55-.45-1-1-1s-1,.45-1,1v3c0,.55,.45,1,1,1s1-.45,1-1Zm0,19v-3c0-.55-.45-1-1-1s-1,.45-1,1v3c0,.55,.45,1,1,1s1-.45,1-1ZM5,12c0-.55-.45-1-1-1H1c-.55,0-1,.45-1,1s.45,1,1,1h3c.55,0,1-.45,1-1Zm19,0c0-.55-.45-1-1-1h-3c-.55,0-1,.45-1,1s.45,1,1,1h3c.55,0,1-.45,1-1ZM6.71,6.71c.39-.39,.39-1.02,0-1.41l-2-2c-.39-.39-1.02-.39-1.41,0s-.39,1.02,0,1.41l2,2c.2,.2,.45,.29,.71,.29s.51-.1,.71-.29Zm14,14c.39-.39,.39-1.02,0-1.41l-2-2c-.39-.39-1.02-.39-1.41,0s-.39,1.02,0,1.41l2,2c.2,.2,.45,.29,.71,.29s.51-.1,.71-.29Zm-16,0l2-2c.39-.39,.39-1.02,0-1.41s-1.02-.39-1.41,0l-2,2c-.39,.39-.39,1.02,0,1.41,.2,.2,.45,.29,.71,.29s.51-.1,.71-.29ZM18.71,6.71l2-2c.39-.39,.39-1.02,0-1.41s-1.02-.39-1.41,0l-2,2c-.39,.39-.39,1.02,0,1.41,.2,.2,.45,.29,.71,.29s.51-.1,.71-.29Z"></path></svg>
                            </div>
                        </div>
                        <div class="each-item-menu">
                            <div class="svg-tick"></div>
                            <div>
                                <span>Wind</span>
                                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24"><path d="M0,12a1,1,0,0,1,1-1H7a1,1,0,0,1,0,2H1A1,1,0,0,1,0,12Zm20.886-.893A4.99,4.99,0,1,0,12,8a1,1,0,0,0,2,0,3,3,0,1,1,3,3H11a1,1,0,0,0,0,2h9a2,2,0,0,1,2,2c-.009,2.337-3.281,2.648-4.057.667a1,1,0,0,0-1.886.666C17.615,20.415,23.952,19.579,24,15A4,4,0,0,0,20.886,11.107ZM11,16H1a1,1,0,0,0,0,2H11a2,2,0,0,1,2,2c-.009,2.337-3.281,2.648-4.057.667a1,1,0,1,0-1.886.666C8.615,25.415,14.952,24.579,15,20A4,4,0,0,0,11,16ZM1,8H7a4,4,0,0,0,4-4C10.952-.581,4.613-1.414,3.057,2.667a1,1,0,0,0,1.886.666C5.72,1.351,8.991,1.663,9,4A2,2,0,0,1,7,6H1A1,1,0,0,0,1,8Z"></path></svg>
                        
                            </div>
                        </div>
                        <div class="each-item-menu">
                            <div class="svg-tick"></div>
                            <div>
                                <span>Precipitation</span>
                                <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">

                                    <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)">
                                    <path d="M2413 4898 c-779 -1184 -1258 -2187 -1394 -2918 -26 -137 -36 -428
                                    -20 -553 84 -631 499 -1151 1076 -1345 434 -147 924 -86 1305 159 472 305 750
                                    820 751 1387 0 180 -20 332 -66 522 -147 597 -468 1299 -995 2175 -196 325
                                    -495 785 -511 785 -3 0 -70 -96 -146 -212z"></path>
                                    </g>
                                    </svg>
                            </div>
                        </div>
                        <div class="each-item-menu">
                            <div class="svg-tick"></div>
                            <div>
                                <span>Feels Like</span>
                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M416 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm0 128A96 96 0 1 0 416 0a96 96 0 1 0 0 192zM96 112c0-26.5 21.5-48 48-48s48 21.5 48 48V276.5c0 17.3 7.1 31.9 15.3 42.5C217.8 332.6 224 349.5 224 368c0 44.2-35.8 80-80 80s-80-35.8-80-80c0-18.5 6.2-35.4 16.7-48.9C88.9 308.4 96 293.8 96 276.5V112zM144 0C82.1 0 32 50.2 32 112V276.5c0 .1-.1 .3-.2 .6c-.2 .6-.8 1.6-1.7 2.8C11.2 304.2 0 334.8 0 368c0 79.5 64.5 144 144 144s144-64.5 144-144c0-33.2-11.2-63.8-30.1-88.1c-.9-1.2-1.5-2.2-1.7-2.8c-.1-.3-.2-.5-.2-.6V112C256 50.2 205.9 0 144 0zm0 416c26.5 0 48-21.5 48-48c0-20.9-13.4-38.7-32-45.3V112c0-8.8-7.2-16-16-16s-16 7.2-16 16V322.7c-18.6 6.6-32 24.4-32 45.3c0 26.5 21.5 48 48 48z"></path></svg>
                        
                            </div>
                        </div>
                        <div class="each-item-menu">
                            <div class="svg-tick"></div>
                            
                            <div>
                                <span>Humidity</span>
                                <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
                        
                                    <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)">
                                    <path d="M1866 4785 c-22 -7 -49 -24 -62 -37 -39 -40 -329 -452 -499 -708
                                    -524 -791 -834 -1397 -948 -1850 -28 -113 -31 -140 -32 -285 0 -184 17 -297
                                    72 -470 91 -287 267 -550 492 -737 218 -181 456 -294 736 -350 148 -30 422
                                    -32 570 -4 199 36 431 126 582 225 77 50 108 102 100 169 -9 81 -77 142 -157
                                    142 -35 0 -60 -8 -106 -36 -234 -142 -431 -199 -694 -199 -172 0 -243 11 -396
                                    60 -201 66 -348 157 -505 314 -110 110 -181 206 -241 326 -118 234 -164 517
                                    -119 731 80 384 395 1001 916 1789 196 295 333 490 345 490 19 0 401 -565 595
                                    -880 317 -515 557 -998 633 -1273 19 -66 19 -72 4 -72 -33 0 -118 48 -177 99
                                    -83 72 -219 138 -325 157 -202 38 -404 -18 -565 -156 -78 -68 -146 -99 -238
                                    -109 -41 -5 -88 -16 -104 -26 -97 -57 -103 -201 -11 -267 47 -33 141 -36 249
                                    -9 109 27 193 71 281 144 104 88 163 112 268 112 104 -1 163 -25 260 -109 161
                                    -138 378 -194 585 -151 94 20 214 81 305 156 105 86 144 102 255 103 79 1 97
                                    -2 145 -26 31 -15 85 -53 120 -83 80 -70 201 -130 300 -151 188 -39 295 13
                                    295 144 0 101 -53 148 -182 163 -95 10 -142 32 -233 109 -126 107 -292 170
                                    -445 170 -133 0 -294 -54 -398 -133 -26 -21 -51 -37 -55 -37 -4 0 -18 35 -31
                                    78 -90 311 -364 856 -698 1391 -194 311 -635 957 -712 1045 -39 45 -116 63
                                    -175 41z"></path>
                                    <path d="M4025 4625 c-50 -18 -76 -48 -214 -244 -200 -285 -345 -546 -413
                                    -742 -30 -86 -32 -104 -32 -214 1 -100 5 -132 26 -197 39 -119 92 -204 182
                                    -294 90 -90 175 -143 294 -182 67 -22 94 -26 212 -26 118 0 145 4 212 26 119
                                    39 204 92 294 182 90 90 143 175 182 294 21 65 25 96 26 197 0 131 -13 183
                                    -89 357 -105 238 -466 792 -542 832 -45 23 -94 27 -138 11z m152 -562 c155
                                    -239 246 -409 283 -532 30 -97 23 -170 -25 -267 -42 -86 -102 -144 -193 -187
                                    -61 -29 -76 -32 -162 -32 -86 0 -101 3 -162 32 -91 43 -151 101 -193 187 -48
                                    97 -55 170 -25 267 22 75 82 202 153 324 63 109 218 345 227 345 4 0 48 -62
                                    97 -137z"></path>
                                    <path d="M2380 1725 c-91 -21 -212 -83 -300 -156 -92 -76 -139 -98 -233 -108
                                    -89 -10 -128 -29 -158 -78 -69 -111 14 -243 153 -243 140 1 288 58 418 164
                                    119 96 154 111 265 111 107 0 170 -24 252 -97 258 -230 635 -235 893 -12 99
                                    86 155 109 265 109 110 0 166 -23 265 -109 122 -106 298 -172 437 -164 43 3
                                    71 10 90 24 93 70 96 192 7 261 -26 19 -52 27 -114 34 -97 11 -149 35 -245
                                    114 -277 228 -645 217 -910 -26 -16 -15 -55 -40 -85 -56 -48 -24 -67 -27 -145
                                    -28 -107 0 -166 23 -255 99 -132 114 -264 166 -430 172 -68 2 -128 -2 -170
                                    -11z"></path>
                                    </g>
                                    </svg>
                            </div>
                        </div>
                        <div class="each-item-menu">
                            <div class="svg-tick"></div>
                            <div>
                                <span>Visibility</span>
                                <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24"><path d="M23.271,9.419C21.72,6.893,18.192,2.655,12,2.655S2.28,6.893.729,9.419a4.908,4.908,0,0,0,0,5.162C2.28,17.107,5.808,21.345,12,21.345s9.72-4.238,11.271-6.764A4.908,4.908,0,0,0,23.271,9.419Zm-1.705,4.115C20.234,15.7,17.219,19.345,12,19.345S3.766,15.7,2.434,13.534a2.918,2.918,0,0,1,0-3.068C3.766,8.3,6.781,4.655,12,4.655s8.234,3.641,9.566,5.811A2.918,2.918,0,0,1,21.566,13.534Z"></path><path d="M12,7a5,5,0,1,0,5,5A5.006,5.006,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z"></path></svg>
                        
                            </div>
                        </div>
                        <div class="each-item-menu">
                            <div class="svg-tick"></div>
                            
                            <div>
                                <span>Pressure</span>
                                <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
                        
                                    <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)">
                                <path d="M2300 4656 c-386 -53 -721 -190 -1022 -417 -107 -80 -317 -290 -397
                                -397 -703 -931 -529 -2240 392 -2954 366 -283 822 -438 1287 -438 809 1 1539
                                457 1896 1186 350 714 266 1566 -217 2206 -80 107 -290 317 -397 397 -278 210
                                -596 347 -946 407 -124 21 -471 27 -596 10z m100 -445 c0 -144 7 -171 53 -219
                                75 -77 199 -57 246 42 18 36 21 61 21 174 l0 132 28 0 c56 0 219 -33 330 -66
                                202 -61 389 -155 560 -281 l74 -54 -105 -108 c-83 -85 -107 -116 -112 -145
                                -28 -148 127 -250 256 -167 24 16 78 63 119 106 l75 77 28 -34 c54 -63 149
                                -213 199 -312 83 -165 154 -404 174 -583 l7 -63 -150 0 c-139 0 -152 -2 -184
                                -23 -109 -73 -105 -212 7 -267 34 -17 61 -20 183 -20 l144 0 -7 -52 c-23 -173
                                -82 -384 -146 -521 l-32 -67 -1610 2 -1609 3 -34 75 c-65 148 -120 347 -141
                                508 l-7 52 134 0 c112 0 139 3 173 20 117 57 123 215 11 277 -36 20 -54 23
                                -179 23 l-139 0 7 63 c32 285 162 607 349 860 l50 68 96 -94 c107 -105 142
                                -127 201 -127 107 0 183 105 149 207 -8 25 -45 72 -111 139 l-100 102 59 44
                                c128 99 282 186 436 247 130 52 364 108 460 110 l37 1 0 -129z m1522 -2808
                                c-51 -61 -192 -197 -257 -250 -135 -109 -347 -226 -521 -286 -209 -73 -411
                                -102 -648 -94 -342 11 -638 107 -932 302 -110 73 -281 226 -365 326 l-41 49
                                1402 0 1402 0 -40 -47z"></path>
                                <path d="M2505 3609 c-44 -12 -78 -54 -115 -139 -18 -41 -89 -196 -157 -345
                                -170 -368 -177 -390 -178 -540 0 -118 1 -121 37 -199 49 -101 148 -203 240
                                -246 252 -118 552 -18 680 227 45 85 63 171 55 267 -8 91 -35 166 -149 421
                                -50 110 -117 261 -151 335 -74 165 -89 187 -141 211 -44 20 -74 22 -121 8z
                                m110 -641 c91 -193 135 -310 135 -361 0 -77 -48 -152 -113 -176 -69 -26 -174
                                -4 -219 46 -45 50 -60 137 -34 209 24 70 168 384 176 384 4 0 29 -46 55 -102z"></path>
                                </g>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="canvas-holder">
                    <div class="container-for-values">
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                    </div>
                    <canvas id="canvas"></canvas>
                </div>
                `
                
                

                

                WHLE_ELMNT.appendChild(index)
                extraText.innerHTML = `
                <span class="time">Now, ${weatherData.current.last_updated.slice("11")}</span>
                <span class="date">${textForUVIndex()}</span>
                `
                WHLE_ELMNT.appendChild(extraText)
                WHLE_ELMNT.appendChild(finalInfo)
                continue
            }
            //console.log(daysShort, weatherData.forecast.forecastday[i].day.uv)
            const day = document.createElement("div")
            day.classList.add("forecast-each-day")
            day.innerHTML = `
            <span>${daysShort}</span>
            <span class="numbers">${numbersDays}</span>
            `
            wrapper.appendChild(day)
            
        }   
        
    }
    const eventFunction = () =>{
        const elements = document.querySelectorAll(".numbers")
        const fullDate = document.querySelector(".datepicked")
        const index = document.querySelector(".index span")
        const determiner = document.querySelector(".determiner")
        const extraText = document.querySelector(".time")
        const extraTextDATE = document.querySelector(".date")

        for(let i = 0; i < elements.length; i++){
            const highestFromTheDay = () =>{
                let highestUV = 0
                for(let j = 0; j < weatherData.forecast.forecastday[i].hour.length; j++){

                    if(weatherData.forecast.forecastday[i].hour[j].uv > highestUV){
                        highestUV = weatherData.forecast.forecastday[i].hour[j].uv
                    }
                }

                return highestUV
            }

            const UVINDEX = () =>{
                if(highestFromTheDay() == 1 || highestFromTheDay() == 2 || highestFromTheDay() == 0){
                    return 'Low'
                } else if (highestFromTheDay() == 3 || highestFromTheDay() == 4 || highestFromTheDay() == 5){
                    return 'Moderate'
                } else if (highestFromTheDay() == 6 || highestFromTheDay() == 7){
                    return 'High'
                } else if(highestFromTheDay() == 8 || highestFromTheDay() == 9 || highestFromTheDay() == 10){
                    return 'Very High'
                } else if (highestFromTheDay() > 11){
                    return 'Extreme'
                }
            }

            const textForUVIndex = () =>{
                if(weatherData.forecast.forecastday[i].day.uv >=3){
                    let arrayOfHours = []
                    for(let j = 0; j < weatherData.forecast.forecastday[i].hour.length; j++){
                        if(weatherData.forecast.forecastday[i].hour[j].uv >= 3){
                            arrayOfHours.push(weatherData.forecast.forecastday[i].hour[j].time)
        
                        }

                        if(j == weatherData.forecast.forecastday[i].hour.length - 1){
                            //console.log(arrayOfHours)
                            return `Sun protection recommended from ${arrayOfHours[0].slice("11")} to ${arrayOfHours[arrayOfHours.length - 1].slice("11")}.`
                            
                        }
                    }
                }else{
                    return `Low levels all day.`
                }
            }

            let days = new Date(weatherData.forecast.forecastday[i].date)
                let fullDay = days.toLocaleDateString("default", {weekday: "long", day: "2-digit", month: "long", "year": "numeric"})
                elements[i].addEventListener("click", ()=>{
                elements.forEach(element =>{
                    element.classList.remove("active")
                })

                elements[0].addEventListener("click", ()=>{
                    mainFunction()
                })

                
                
                extraTextDATE.textContent = textForUVIndex()
                extraText.textContent = days.toLocaleDateString("default", {day: "2-digit", month: "short", year: "numeric"})
                determiner.textContent = UVINDEX()
                index.textContent = highestFromTheDay()
                fullDate.textContent = fullDay
                elements[i].classList.add("active")

                //CHART FOR OTHER DAYS
                const RESETCHART = document.querySelector(".canvas-holder")
                RESETCHART.innerHTML = `
                <div class="container-for-values">
                        <div class="value-hrs">1</div>
                        <div class="value-hrs">1</div>
                        <div class="value-hrs">1</div>
                        <div class="value-hrs">1</div>
                        <div class="value-hrs">5</div>
                        <div class="value-hrs">5</div>
                        <div class="value-hrs">6</div>
                        <div class="value-hrs">6</div>
                        <div class="value-hrs">6</div>
                        <div class="value-hrs">4</div>
                        <div class="value-hrs">1</div>
                        <div class="value-hrs">1</div>
                </div>
                <canvas id="canvas" height="340" style="display: block; box-sizing: border-box; height: 272px; width: 476px;" width="595"></canvas>
                `
                const UVFINALCHART = (arg) =>{
                    //the labels representing each hour
                    const hoursArray = []
            
                    for(let i = 0; i < 24; i++){
                        hoursArray.push(i)
                    }
            
                    //the index at which the change will occur
                    let labelToChange = new Date(weatherData.current.last_updated).getHours()
            
            
                    //when will the line be dashed and stright
                    const dash = (ctx) => {
                        //console.log(ctx.p0DataIndex)
                        if(ctx.p0DataIndex < labelToChange){
                            return [8, 10]
                        }
                    }
                    
                    let ctx = document.querySelector("#canvas").getContext("2d")
            
            
                    //READY FOR FINAL STYLING
                
                    //the uv indexes for each hour
                    const uvDataFunction = () =>{
                        uvIndexesArray = []
                        for(let U = 0; U < weatherData.forecast.forecastday[arg].hour.length; U++){
                            uvIndexesArray.push(weatherData.forecast.forecastday[arg].hour[U].uv)
                        }
            
                        return uvIndexesArray
                    }
            
                    const canvasElement = document.querySelector(".canvas-holder")
                    const scaleLabels = ['Low', 'Moderate', 'High', 'Very High', 'Extreme']
                    for(let el = 0; el < 5; el++){
                        const UVSCALE = document.createElement("span")
                        UVSCALE.classList.add("uv-scale-span")
                        canvasElement.appendChild(UVSCALE)

                        UVSCALE.textContent = `${scaleLabels[el]}`
                    }
                    
                    const invisibleOverlay = document.createElement("div")
                    invisibleOverlay.classList.add("blank-overlay")
                    canvasElement.appendChild(invisibleOverlay)
                    //putting a value into the html element
                    const all = document.querySelectorAll(".value-hrs")
            
                    all[0].textContent = uvDataFunction()[0]
                    all[1].textContent = uvDataFunction()[2]
                    all[2].textContent = uvDataFunction()[4]
                    all[3].textContent = uvDataFunction()[6]
                    all[4].textContent = uvDataFunction()[8]
                    all[5].textContent = uvDataFunction()[10]
                    all[6].textContent = uvDataFunction()[12]
                    all[7].textContent = uvDataFunction()[14]
                    all[8].textContent = uvDataFunction()[16]
                    all[9].textContent = uvDataFunction()[18]
                    all[10].textContent = uvDataFunction()[20]
                    all[11].textContent = uvDataFunction()[22]
                    
            
                    //change the line color as it goes up
                    const lineColor = (ctx) =>{
            
                        if(ctx.p0.parsed.y > 10){
                            return '#A50166'
                        }else if(ctx.p0.parsed.y >= 8){
                            return "#CF0205"
                        }else if(ctx.p0.parsed.y > 5){
                            return '#FF8600'
                        }else if(ctx.p0.parsed.y >= 3){
                            return '#FAE300'
                        }else {
                            return '#52FF00'
                        }
                    }
            
                    const gradient = window['chartjs-plugin-gradient'];
            
                    //data block
                    const chartData = {
                        labels: hoursArray,
                        datasets: [{
                            label: "",
                            data: uvDataFunction(),
                            gradient: {
                                backgroundColor: {
                                    axis: 'y',
                                    colors: {
                                    0: 'rgba(0, 125, 8, 0.20)',
                                    4: 'rgba(154, 152, 0, 0.20)',
                                    5: 'rgba(154, 123, 0, 0.20)',
                                    7: 'rgba(142, 43, 0, 0.20)',
                                    8.5: 'rgba(142, 0, 0, 0.20)',
                                    10: 'rgba(105, 0, 142, 0.20)',
                                    }
                                },
                                borderColor: {
                                    axis: "y",
                                    colors: {
                                        3: "rgba(26, 225, 0, 1)",
                                        3.5: "rgba(115, 225, 0, 1)",
                                        4: "rgba(181, 225, 0, 1)",
                                        4.5: "rgba(229, 221, 0, 1)",
                                        5: "rgba(229, 183, 0, 1)",
                                        6.5: "rgba(229, 155, 0, 1)",
                                        8: "rgba(229, 50, 0, 1)",
                                        9: "rgba(211, 37, 0, 1)",
                                        10: "rgba(155, 0, 211, 1)"
                                    }
                                }
                            },
                            borderWidth: 6.5,
                            segment: {
                                //borderDash: ctx => dash(ctx),
                                //borderColor: ctx => lineColor(ctx),
                                
                            },
                            //backgroundColor: ctx => gradientFunc(ctx),
                            borderColor: "blue",
                            pointBackgroundColor: "transparent",
                            pointBorderColor: "transparent",
                            
                            borderCapStyle: 'round',
                            clip: {
                                left: 0,
                                right: 0,
                                top: false,
                                bottom: 3
                            },
                            tension: 0.2,
                            fill: true
                            
                        }]
                    }
            
                    const plugin = {
                        id: 'customCanvasBackgroundColor',
                        beforeDraw: (chart, args, options) => {
                        const {ctx} = chart;
                        ctx.save();
                        ctx.globalCompositeOperation = 'destination-over';
                        ctx.fillStyle = options.color
                        ctx.fillRect(0, 0, chart.width, chart.height);
                        ctx.restore();
                        
                        }
                    };
            
                    //config block
                    const config = {
                        type: "line",
                        data: chartData,  
                        options: {
                            aspectRatio: 7/4,
                            responsive: true,
                            scales: {
                                y: {
                                    beginAtZero: false,
                                    suggestedMax: 11,
                                    grid: {
                                        drawTicks: false,
                                        display: true,
                                        drawOnChartArea: true,
                                        color: "#302F32",
                                        lineWidth: 1,
                                        
                                    },
                                    border: {
                                        display: true,
                                        color: "#302F32"
                                    },
                                    ticks: {
                                        color: "#9D9D9E",
                                        padding: 15,
                                        align: "center",
                                        crossAlign: "center",
                                        font: {
                                            size: 14,
                                            weight: 400
                                        }
                                    },
                                    offset: false,
                                    position: "right",
                                    
                                },
                                
            
                                x: {
                                    
                                    border: {
                                        display: false,
                                        dash: [2, 2]
                                    },
                                    grid: {
                                        display: true,
                                        drawOnChartArea: true,
                                        drawTicks: false,
                                        color: "#302F32",
            
                                    },
            
                                    ticks: {
                                        color: "#9D9D9E",
                                        maxTicksLimit: 4,
                                        padding: 5,
                                        align: "start",
                                        crossAlign: "near",
                                        font: {
                                            size: 15,
                                            weight: 400
                                        }
                                    },
            
                                },
            
                                
                            },
                            plugins: {
                                customCanvasBackgroundColor: {
                                    //color: "#1C1C1E",
                                    color: "#202023"
                                },
                                legend: {
                                    display: false,
                                    
                                },
                                autocolors: false,
                                annotation: {
                                    
                                    annotations: {
                                        
                                        point2: {
                                            type: "point",
                                            xValue: uvDataFunction().indexOf(Math.max(...uvDataFunction())),
                                            yValue: Math.max(...uvDataFunction()),
                                            backgroundColor: "transparent",
                                            borderWidth: 4,
                                            borderColor: "black",
                                            radius: 5.5,
                                            
                                        },
                                        label1: {
                                            type: "label",
                                            yValue: Math.max(...uvDataFunction()) + 0.8,
                                            xValue: uvDataFunction().indexOf(Math.max(...uvDataFunction())),
                                            backgroundColor: "transparent",
                                            color: "#9D9D9E",
                                            content: `${Math.max(...uvDataFunction())}`,
                                            font: {
                                                size: 15
                                            }
                                        },
                                    },
                                    clip: false
                                } 
                            },
                            
                        },
                        plugins: [plugin, gradient]
                    }
                    
                    //console.log(Math.max(...uvDataFunction()))
                    //render block
                    const uvChart = new Chart(ctx, config)
                }
                UVFINALCHART(i)
            })
        }
    }

    //for UV INDEX
    const mainFunction = () =>{
        createElement()
        eventFunction()
        const wrapper = document.querySelector(".forecast-days-wrap")

        let mouseDown = false //will change if mouse is clicked

        const dragging = (e)=>{
            if(!mouseDown){ //if the mouse isnt click this will not run
                return
            }
            wrapper.style.cursor = `grabbing` //styling for the cursor
            e.preventDefault() //preventing default behaviour
            wrapper.scrollLeft -= e.movementX //the scroll movement
        }

        wrapper.addEventListener("mousedown", ()=>{
            mouseDown = true //when the mouse is down change the variable value
            wrapper.style.cursor = `grabbing`
        })
        wrapper.addEventListener("mousemove", dragging) //when the mouse moves run the function

        wrapper.addEventListener("mouseup", ()=>{
            mouseDown = false //mouse is no longer clicked
            wrapper.style.cursor = `grab`
        })
        wrapper.addEventListener("mouseleave", ()=>{
            mouseDown = false //mouse leaves the element
            wrapper.style.cursor = `grab`
        })
        const selectDropdown = document.querySelector(".select")
        const littleCaret = document.querySelector(".rotated")
        let elementActive = false 
        const menuItemspWrapper = document.querySelector(".menu-wrapper")
        const eachItemMenu = document.querySelectorAll(".each-item-menu")
        const divWithTick = document.querySelectorAll(".svg-tick")

        

        eachItemMenu[0].addEventListener("click", ()=>{
            mainFunctionForecast()
            
        })

        eachItemMenu[1].addEventListener("click", ()=>{
            mainFunction()
        
        })

        eachItemMenu[2].addEventListener("click", ()=>{
            mainFunctionFORWIND()
        
        })

        eachItemMenu[3].addEventListener("click", ()=>{
            mainFunctionRAIN()
        
        })

        eachItemMenu[4].addEventListener("click", ()=>{
            mainFunctionFEELSLIKE()
            
        })

        eachItemMenu[5].addEventListener("click", ()=>{
            mainFunctionHUMIDITY()
        
        })

        eachItemMenu[6].addEventListener("click", ()=>{
            mainFunctionVISIBILITY()
        
        })

        eachItemMenu[7].addEventListener("click", ()=>{
            mainFunctionPRESSURE()
        
        })
        
    

        const functionForDropdownActivation = (e) =>{
            if(!elementActive){
                selectDropdown.style.backgroundColor = '#515154'
                littleCaret.classList.add("true")
                menuItemspWrapper.style.display = 'block'
                menuItemspWrapper.style.height = `auto`
            }else{
                selectDropdown.style.backgroundColor = '#3A3A3D'
                littleCaret.classList.remove("true")
                menuItemspWrapper.style.display = 'none'
                menuItemspWrapper.style.height = `0`
            }

            elementActive = !elementActive
            e.stopPropagation()
        }
        
        const clickAnywhereElse = () =>{
            if(elementActive){
                selectDropdown.style.backgroundColor = '#3A3A3D'
                elementActive = false
                littleCaret.classList.remove("true")
                menuItemspWrapper.style.display = 'none'
                menuItemspWrapper.style.height = `0`
            }
        }

        selectDropdown.addEventListener("click", functionForDropdownActivation)

        document.body.addEventListener("click", clickAnywhereElse)


        //REALISATION OF CHART HERE
        const UVFINALCHART = () =>{
            //the labels representing each hour
            const hoursArray = []
    
            for(let i = 0; i < 24; i++){
                hoursArray.push(i)
            }
    
            //the index at which the change will occur
            let labelToChange = new Date(weatherData.current.last_updated).getHours()
    
    
            //when will the line be dashed and stright
            const dash = (ctx) => {
                //console.log(ctx.p0DataIndex)
                if(ctx.p0DataIndex < labelToChange){
                    return [8, 10]
                }
            }
    
            let ctx = document.querySelector("#canvas").getContext("2d")
    
    
            //READY FOR FINAL STYLING
        
            //the uv indexes for each hour
            const uvDataFunction = () =>{
                uvIndexesArray = []
                for(let i = 0; i < weatherData.forecast.forecastday[0].hour.length; i++){
                    uvIndexesArray.push(weatherData.forecast.forecastday[0].hour[i].uv)
                }
    
                return uvIndexesArray
            }

            

            
    
            
            //putting a value into the html element
            const all = document.querySelectorAll(".value-hrs")
    
            all[0].textContent = uvDataFunction()[0]
            all[1].textContent = uvDataFunction()[2]
            all[2].textContent = uvDataFunction()[4]
            all[3].textContent = uvDataFunction()[6]
            all[4].textContent = uvDataFunction()[8]
            all[5].textContent = uvDataFunction()[10]
            all[6].textContent = uvDataFunction()[12]
            all[7].textContent = uvDataFunction()[14]
            all[8].textContent = uvDataFunction()[16]
            all[9].textContent = uvDataFunction()[18]
            all[10].textContent = uvDataFunction()[20]
            all[11].textContent = uvDataFunction()[22]
            
            const canvasElement = document.querySelector(".canvas-holder")
            const scaleLabels = ['Low', 'Moderate', 'High', 'Very High', 'Extreme']
            for(let el = 0; el < 5; el++){
                const UVSCALE = document.createElement("span")
                UVSCALE.classList.add("uv-scale-span")
                canvasElement.appendChild(UVSCALE)

                UVSCALE.textContent = `${scaleLabels[el]}`
            }

            const chartOverlay = document.createElement("div")
            chartOverlay.classList.add("time-passed-overlay")

            const lineDivider = document.createElement("div")
            lineDivider.classList.add("line-divider")
            chartOverlay.appendChild(lineDivider)
            
            canvasElement.appendChild(chartOverlay)
            const overlayStyle = () =>{
                if(labelToChange == 0){
                    chartOverlay.style.width = `8px`
                    
                }else if(labelToChange == 1){
                    chartOverlay.style.width = `27px`
                    
                }else if(labelToChange == 2){
                    chartOverlay.style.width = `45px`
                    
                }else if(labelToChange == 3){
                    chartOverlay.style.width = `64px`
                    
                }else if(labelToChange == 4){
                    chartOverlay.style.width = `82px`
                    
                }else if(labelToChange == 5){
                    chartOverlay.style.width = `100px`
                    
                }else if(labelToChange == 6){
                    chartOverlay.style.width = `118px`
                    
                }else if(labelToChange == 7){
                    chartOverlay.style.width = `137px`
                    
                }else if(labelToChange == 8){
                    chartOverlay.style.width = `154px`
                    
                }else if(labelToChange == 9){

                    chartOverlay.style.width = `173px`
                    
                }else if(labelToChange == 10){
                    chartOverlay.style.width = `191px`
                    
                }else if(labelToChange == 11){
                    chartOverlay.style.width = `210px`
                    
                }else if(labelToChange == 12){
                    chartOverlay.style.width = `228px`
                    
                }else if(labelToChange == 13){
                    chartOverlay.style.width = `246px`
                    
                }else if(labelToChange == 14){
                    chartOverlay.style.width = `264px`
                    
                }else if(labelToChange == 15){
                    chartOverlay.style.width = `282.5px`
                    
                }else if(labelToChange == 16){
                    chartOverlay.style.width = `301px`
                    
                }else if(labelToChange == 17){
                    chartOverlay.style.width = `319px`
                    
                }else if(labelToChange == 18){
                    chartOverlay.style.width = `337px`
                    
                }else if(labelToChange == 19){
                    chartOverlay.style.width = `356px`
                    
                }else if(labelToChange == 20){
                    chartOverlay.style.width = `374px`
                    
                }else if(labelToChange == 21){
                    chartOverlay.style.width = `392px`
                    
                }else if(labelToChange == 22){
                    chartOverlay.style.width = `410px`
                    
                }else if(labelToChange == 23){
                    chartOverlay.style.width = `428px`
                    
                }

                lineDivider.style.left = chartOverlay.style.width 
            }
            overlayStyle()

            const invisibleOverlay = document.createElement("div")
        invisibleOverlay.classList.add("blank-overlay")
        canvasElement.appendChild(invisibleOverlay)
    
            //change the line color as it goes up
            const lineColor = (ctx) =>{
    
                if(ctx.p0.parsed.y > 10){
                    return '#A50166'
                }else if(ctx.p0.parsed.y >= 8){
                    return "#CF0205"
                }else if(ctx.p0.parsed.y > 5){
                    return '#FF8600'
                }else if(ctx.p0.parsed.y >= 3){
                    return '#FAE300'
                }else {
                    return '#52FF00'
                }
            }
    
            const gradient = window['chartjs-plugin-gradient'];
    
            //data block
            const chartData = {
                labels: hoursArray,
                datasets: [{
                    label: "",
                    data: uvDataFunction(),
                    gradient: {
                        backgroundColor: {
                            axis: 'y',
                            colors: {
                            0: 'rgba(0, 125, 8, 0.20)',
                            4: 'rgba(154, 152, 0, 0.20)',
                            5: 'rgba(154, 123, 0, 0.20)',
                            7: 'rgba(142, 43, 0, 0.20)',
                            8.5: 'rgba(142, 0, 0, 0.20)',
                            10: 'rgba(105, 0, 142, 0.20)',
                            }
                        },
                        borderColor: {
                            axis: "y",
                            colors: {
                                3: "rgba(26, 225, 0, 1)",
                                3.5: "rgba(115, 225, 0, 1)",
                                4: "rgba(181, 225, 0, 1)",
                                4.5: "rgba(229, 221, 0, 1)",
                                5: "rgba(229, 183, 0, 1)",
                                6.5: "rgba(229, 155, 0, 1)",
                                8: "rgba(229, 50, 0, 1)",
                                9: "rgba(211, 37, 0, 1)",
                                10: "rgba(155, 0, 211, 1)"
                            }
                        }
                    },
                    borderWidth: 6.5,
                    segment: {
                        borderDash: ctx => dash(ctx),
                        //borderColor: ctx => lineColor(ctx),
                        
                    },
                    //backgroundColor: ctx => gradientFunc(ctx),
                    borderColor: "blue",
                    pointBackgroundColor: "transparent",
                    pointBorderColor: "transparent",
                    
                    borderCapStyle: 'round',
                    clip: {
                        left: 0,
                        right: 0,
                        top: false,
                        bottom: 3
                    },
                    tension: 0.2,
                    fill: true
                    
                }]
            }
    
            const plugin = {
                id: 'customCanvasBackgroundColor',
                beforeDraw: (chart, args, options) => {
                const {ctx} = chart;
                ctx.save();
                ctx.globalCompositeOperation = 'destination-over';
                ctx.fillStyle = options.color
                ctx.fillRect(0, 0, chart.width, chart.height);
                ctx.restore();
                
                }
            };
    
            //config block
            const config = {
                type: "line",
                data: chartData,  
                options: {
                    aspectRatio: 7/4,
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: false,
                            suggestedMax: 11,
                            grid: {
                                drawTicks: false,
                                display: true,
                                drawOnChartArea: true,
                                color: "#302F32",
                                lineWidth: 1,
                                
                            },
                            border: {
                                display: true,
                                color: "#302F32"
                            },
                            ticks: {
                                color: "#9D9D9E",
                                padding: 15,
                                align: "center",
                                crossAlign: "center",
                                font: {
                                    size: 14,
                                    weight: 400
                                }
                            },
                            offset: false,
                            position: "right",
                            
                        },
                        
    
                        x: {
                            
                            border: {
                                display: false,
                                dash: [2, 2]
                            },
                            grid: {
                                display: true,
                                drawOnChartArea: true,
                                drawTicks: false,
                                color: "#302F32",
    
                            },
    
                            ticks: {
                                color: "#9D9D9E",
                                maxTicksLimit: 4,
                                padding: 5,
                                align: "start",
                                crossAlign: "near",
                                font: {
                                    size: 15,
                                    weight: 400
                                }
                            },
    
                        },
    
                        
                    },
                    plugins: {
                        customCanvasBackgroundColor: {
                            //color: "#1C1C1E",
                            color: "#202023"
                        },
                        legend: {
                            display: false,
                            
                        },
                        autocolors: false,
                        annotation: {
                            
                            annotations: {
                                
                                point2: {
                                    type: "point",
                                    xValue: labelToChange,
                                    yValue: uvDataFunction()[labelToChange],
                                    backgroundColor: "#fafafa",
                                    borderWidth: 4,
                                    borderColor: "black",
                                    radius: 5.5,
                                    
                                }
                            },
                            clip: false
                        } 
                    },
                    
                },
                plugins: [plugin, gradient]
            }
            
    
            //render block
            const uvChart = new Chart(ctx, config)
        }
        UVFINALCHART()
    }
    

    const divUV = document.querySelector(".uv-index")
    divUV.addEventListener("click", ()=>{
        mainFunction()
        const addInfo = document.querySelector(".additional-info")
        ADVANCED_DATA_OVERLAY.style.display = 'flex'
        
        body.style.overflow = "hidden"
    })


    //FOR WIND ADVANCED DATA
    const createElementWIND = () =>{
        //const wrapper = document.querySelector(".forecast-days-wrap")
        //const WHLE_ELMNT = document.querySelector(".advanced-data")
        const PARENT_ELEMENT = document.querySelector(".additional-info")
        PARENT_ELEMENT.innerHTML = ` `

        PARENT_ELEMENT.style.marginTop = `54rem`
        const headline = document.createElement("div")
        headline.classList.add("headline")
        headline.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24"><path d="M0,12a1,1,0,0,1,1-1H7a1,1,0,0,1,0,2H1A1,1,0,0,1,0,12Zm20.886-.893A4.99,4.99,0,1,0,12,8a1,1,0,0,0,2,0,3,3,0,1,1,3,3H11a1,1,0,0,0,0,2h9a2,2,0,0,1,2,2c-.009,2.337-3.281,2.648-4.057.667a1,1,0,0,0-1.886.666C17.615,20.415,23.952,19.579,24,15A4,4,0,0,0,20.886,11.107ZM11,16H1a1,1,0,0,0,0,2H11a2,2,0,0,1,2,2c-.009,2.337-3.281,2.648-4.057.667a1,1,0,1,0-1.886.666C8.615,25.415,14.952,24.579,15,20A4,4,0,0,0,11,16ZM1,8H7a4,4,0,0,0,4-4C10.952-.581,4.613-1.414,3.057,2.667a1,1,0,0,0,1.886.666C5.72,1.351,8.991,1.663,9,4A2,2,0,0,1,7,6H1A1,1,0,0,0,1,8Z"></path></svg>
        <span>Wind</span>
        `
        const closeX = document.createElement("div")
        closeX.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
        ` 
        headline.appendChild(closeX)
        PARENT_ELEMENT.appendChild(headline)

        closeX.addEventListener("click", ()=>{
            PARENT_ELEMENT.innerHTML = ``
            ADVANCED_DATA_OVERLAY.style.display = "none"
            body.style.overflow = "auto"
        })

        
        
        
        const WHLE_ELMNT = document.createElement("div")
        WHLE_ELMNT.classList.add("advanced-data")
        PARENT_ELEMENT.appendChild(WHLE_ELMNT)
        WHLE_ELMNT.innerHTML = ``
        const wrapper = document.createElement("div")
        wrapper.classList.add("forecast-days-wrap")
        const index = document.createElement("div")
        index.classList.add("index")
        const extraText = document.createElement("div")
        extraText.classList.add("extra-text")
        WHLE_ELMNT.appendChild(wrapper)
        const finalInfo = document.createElement("div")
        finalInfo.classList.add("final-info")
        finalInfo.innerHTML = `
        <span>About Wind Speeds and Gusts</span>
        <span>The wind speed is calculated using the average over a short period of time. Gusts are short bursts of wind above this average. A gust typically lasts under 20 seconds.</span>
        `
        

        //wind speeds
        const windSpeeds = () =>{
            let fastestWind = weatherData.current.wind_kph
            let slowestWind = weatherData.current.wind_kph
            for(let i = 0; i < weatherData.forecast.forecastday[0].hour.length; i++){
                if(weatherData.forecast.forecastday[0].hour[i].wind_kph > fastestWind){
                    fastestWind = weatherData.forecast.forecastday[0].hour[i].wind_kph
                }

                if(weatherData.forecast.forecastday[0].hour[i].wind_kph < slowestWind){
                    slowestWind = weatherData.forecast.forecastday[0].hour[i].wind_kph
                }

                if(i == weatherData.forecast.forecastday[0].hour.length - 1){
                    //console.log(fastestWind, "Fast")
                    //console.log(slowestWind, "Slow")
                }
            }
            return [fastestWind, slowestWind]
        }
        //console.log(windSpeeds())

        //gust Speeds
        const gustSpeeds = () =>{
            let fastestGust = weatherData.current.gust_kph
            for(let i = 0; i < weatherData.forecast.forecastday[0].hour.length; i++){
                if(weatherData.forecast.forecastday[0].hour[i].gust_kph > fastestGust){
                    fastestGust = weatherData.forecast.forecastday[0].hour[i].gust_kph
                }

                if(i == weatherData.forecast.forecastday[0].hour.length - 1){
                    //console.log(fastestGust, "Fast")
                }
            }
            return fastestGust
        }
        //gustSpeeds()
        
        //wind Directions 
        const windDirections = () =>{
            let currentWindDir = weatherData.current.wind_dir
            
            if(currentWindDir == 'N'){
                return 'north'
            }else if(currentWindDir == 'S'){
                return 'south'
            }else if(currentWindDir == 'E'){
                return 'east'
            }else if(currentWindDir == 'W'){
                return 'west'
            }else if(currentWindDir == 'NE'){
                return 'north-east'
            }else if(currentWindDir == 'SE'){
                return 'south-east'
            }else if(currentWindDir == 'SW'){
                return 'south-west'
            }else if(currentWindDir == 'NW'){
                return 'north-west'
            }else if(currentWindDir == 'NNE'){
                return 'north-north-east'
            }else if(currentWindDir == 'ENE'){
                return 'east-north-east'
            }else if(currentWindDir == 'ESE'){
                return 'east-south-east'
            }else if(currentWindDir == 'SSE'){
                return 'south-south-east'
            }else if(currentWindDir == 'SSW'){
                return 'south-south-west'
            }else if(currentWindDir == 'WSW'){
                return 'west-south-west'
            }else if(currentWindDir == 'WNW'){
                return 'west-north-west'
            }else if(currentWindDir == 'NNW'){
                return 'north-north-west'
            }
        }

        for(let i = 0; i < weatherData.forecast.forecastday.length; i++){
            let days = new Date(weatherData.forecast.forecastday[i].date)
            let daysShort = days.toLocaleDateString("default", {"weekday": "narrow"})
            let fullDay = days.toLocaleDateString("default", {weekday: "long", day: "2-digit", month: "long", "year": "numeric"})
            let numbersDays = days.toLocaleDateString("default", {day: "2-digit"})
            let currentHour = new Date(weatherData.current.last_updated).getHours()
            let sunsetToday = Number(weatherData.forecast.forecastday[i].astro.sunset.slice("0", "2")) + 12
            

            //console.log(fullDay)
            if(i == 0){
                
                const day = document.createElement("div")
                day.classList.add("forecast-each-day")
                day.innerHTML = `
                <span>${daysShort}</span>
                <span class="numbers active">${numbersDays}</span>
                `
                wrapper.appendChild(day)

                //console.log(weatherData)

                const fullDate = document.createElement("div")
                fullDate.classList.add("datepicked")
                fullDate.textContent = fullDay
                WHLE_ELMNT.appendChild(fullDate)
                index.innerHTML = `
                <span>${Math.round(weatherData.current.wind_kph)}</span>
                <span class="determiner">km/h</span>
                <span class="direction">${weatherData.current.wind_dir}</span>
                <span class="gusts">Gusts: ${Math.round(weatherData.current.gust_kph)} km/h</span>

                <div class="dropdown">

                    <div class="select">
                        <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24"><path d="M0,12a1,1,0,0,1,1-1H7a1,1,0,0,1,0,2H1A1,1,0,0,1,0,12Zm20.886-.893A4.99,4.99,0,1,0,12,8a1,1,0,0,0,2,0,3,3,0,1,1,3,3H11a1,1,0,0,0,0,2h9a2,2,0,0,1,2,2c-.009,2.337-3.281,2.648-4.057.667a1,1,0,0,0-1.886.666C17.615,20.415,23.952,19.579,24,15A4,4,0,0,0,20.886,11.107ZM11,16H1a1,1,0,0,0,0,2H11a2,2,0,0,1,2,2c-.009,2.337-3.281,2.648-4.057.667a1,1,0,1,0-1.886.666C8.615,25.415,14.952,24.579,15,20A4,4,0,0,0,11,16ZM1,8H7a4,4,0,0,0,4-4C10.952-.581,4.613-1.414,3.057,2.667a1,1,0,0,0,1.886.666C5.72,1.351,8.991,1.663,9,4A2,2,0,0,1,7,6H1A1,1,0,0,0,1,8Z"></path></svg>
                        <svg class="rotated " xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"/></svg>
                    </div>

                    <div class="menu-wrapper">
                        <div class="each-item-menu">
                            <div class="svg-tick">
                                
                            </div>
                            <div>
                                <span>Conditions</span>
                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M0 336c0 79.5 64.5 144 144 144H512c70.7 0 128-57.3 128-128c0-61.9-44-113.6-102.4-125.4c4.1-10.7 6.4-22.4 6.4-34.6c0-53-43-96-96-96c-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32C167.6 32 96 103.6 96 192c0 2.7 .1 5.4 .2 8.1C40.2 219.8 0 273.2 0 336z"></path></svg>
                            </div>
                        </div>
                        <div class="each-item-menu">
                            <div class="svg-tick">
                                
                            </div>
                            <div>
                                <span>UV Index</span>
                                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24"><path d="M12,17c-2.76,0-5-2.24-5-5s2.24-5,5-5,5,2.24,5,5-2.24,5-5,5Zm1-13V1c0-.55-.45-1-1-1s-1,.45-1,1v3c0,.55,.45,1,1,1s1-.45,1-1Zm0,19v-3c0-.55-.45-1-1-1s-1,.45-1,1v3c0,.55,.45,1,1,1s1-.45,1-1ZM5,12c0-.55-.45-1-1-1H1c-.55,0-1,.45-1,1s.45,1,1,1h3c.55,0,1-.45,1-1Zm19,0c0-.55-.45-1-1-1h-3c-.55,0-1,.45-1,1s.45,1,1,1h3c.55,0,1-.45,1-1ZM6.71,6.71c.39-.39,.39-1.02,0-1.41l-2-2c-.39-.39-1.02-.39-1.41,0s-.39,1.02,0,1.41l2,2c.2,.2,.45,.29,.71,.29s.51-.1,.71-.29Zm14,14c.39-.39,.39-1.02,0-1.41l-2-2c-.39-.39-1.02-.39-1.41,0s-.39,1.02,0,1.41l2,2c.2,.2,.45,.29,.71,.29s.51-.1,.71-.29Zm-16,0l2-2c.39-.39,.39-1.02,0-1.41s-1.02-.39-1.41,0l-2,2c-.39,.39-.39,1.02,0,1.41,.2,.2,.45,.29,.71,.29s.51-.1,.71-.29ZM18.71,6.71l2-2c.39-.39,.39-1.02,0-1.41s-1.02-.39-1.41,0l-2,2c-.39,.39-.39,1.02,0,1.41,.2,.2,.45,.29,.71,.29s.51-.1,.71-.29Z"></path></svg>
                            </div>
                        </div>
                        <div class="each-item-menu">
                            <div class="svg-tick">
                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
                            </div>
                            <div>
                                <span>Wind</span>
                                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24"><path d="M0,12a1,1,0,0,1,1-1H7a1,1,0,0,1,0,2H1A1,1,0,0,1,0,12Zm20.886-.893A4.99,4.99,0,1,0,12,8a1,1,0,0,0,2,0,3,3,0,1,1,3,3H11a1,1,0,0,0,0,2h9a2,2,0,0,1,2,2c-.009,2.337-3.281,2.648-4.057.667a1,1,0,0,0-1.886.666C17.615,20.415,23.952,19.579,24,15A4,4,0,0,0,20.886,11.107ZM11,16H1a1,1,0,0,0,0,2H11a2,2,0,0,1,2,2c-.009,2.337-3.281,2.648-4.057.667a1,1,0,1,0-1.886.666C8.615,25.415,14.952,24.579,15,20A4,4,0,0,0,11,16ZM1,8H7a4,4,0,0,0,4-4C10.952-.581,4.613-1.414,3.057,2.667a1,1,0,0,0,1.886.666C5.72,1.351,8.991,1.663,9,4A2,2,0,0,1,7,6H1A1,1,0,0,0,1,8Z"></path></svg>
                        
                            </div>
                        </div>
                        <div class="each-item-menu">
                            <div class="svg-tick"></div>
                            <div>
                                <span>Precipitation</span>
                                <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">

                                    <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)">
                                    <path d="M2413 4898 c-779 -1184 -1258 -2187 -1394 -2918 -26 -137 -36 -428
                                    -20 -553 84 -631 499 -1151 1076 -1345 434 -147 924 -86 1305 159 472 305 750
                                    820 751 1387 0 180 -20 332 -66 522 -147 597 -468 1299 -995 2175 -196 325
                                    -495 785 -511 785 -3 0 -70 -96 -146 -212z"></path>
                                    </g>
                                    </svg>
                            </div>
                        </div>
                        <div class="each-item-menu">
                            <div class="svg-tick"></div>
                            <div>
                                <span>Feels Like</span>
                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M416 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm0 128A96 96 0 1 0 416 0a96 96 0 1 0 0 192zM96 112c0-26.5 21.5-48 48-48s48 21.5 48 48V276.5c0 17.3 7.1 31.9 15.3 42.5C217.8 332.6 224 349.5 224 368c0 44.2-35.8 80-80 80s-80-35.8-80-80c0-18.5 6.2-35.4 16.7-48.9C88.9 308.4 96 293.8 96 276.5V112zM144 0C82.1 0 32 50.2 32 112V276.5c0 .1-.1 .3-.2 .6c-.2 .6-.8 1.6-1.7 2.8C11.2 304.2 0 334.8 0 368c0 79.5 64.5 144 144 144s144-64.5 144-144c0-33.2-11.2-63.8-30.1-88.1c-.9-1.2-1.5-2.2-1.7-2.8c-.1-.3-.2-.5-.2-.6V112C256 50.2 205.9 0 144 0zm0 416c26.5 0 48-21.5 48-48c0-20.9-13.4-38.7-32-45.3V112c0-8.8-7.2-16-16-16s-16 7.2-16 16V322.7c-18.6 6.6-32 24.4-32 45.3c0 26.5 21.5 48 48 48z"></path></svg>
                        
                            </div>
                        </div>
                        <div class="each-item-menu">
                            <div class="svg-tick"></div>
                            
                            <div>
                                <span>Humidity</span>
                                <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
                        
                                    <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)">
                                    <path d="M1866 4785 c-22 -7 -49 -24 -62 -37 -39 -40 -329 -452 -499 -708
                                    -524 -791 -834 -1397 -948 -1850 -28 -113 -31 -140 -32 -285 0 -184 17 -297
                                    72 -470 91 -287 267 -550 492 -737 218 -181 456 -294 736 -350 148 -30 422
                                    -32 570 -4 199 36 431 126 582 225 77 50 108 102 100 169 -9 81 -77 142 -157
                                    142 -35 0 -60 -8 -106 -36 -234 -142 -431 -199 -694 -199 -172 0 -243 11 -396
                                    60 -201 66 -348 157 -505 314 -110 110 -181 206 -241 326 -118 234 -164 517
                                    -119 731 80 384 395 1001 916 1789 196 295 333 490 345 490 19 0 401 -565 595
                                    -880 317 -515 557 -998 633 -1273 19 -66 19 -72 4 -72 -33 0 -118 48 -177 99
                                    -83 72 -219 138 -325 157 -202 38 -404 -18 -565 -156 -78 -68 -146 -99 -238
                                    -109 -41 -5 -88 -16 -104 -26 -97 -57 -103 -201 -11 -267 47 -33 141 -36 249
                                    -9 109 27 193 71 281 144 104 88 163 112 268 112 104 -1 163 -25 260 -109 161
                                    -138 378 -194 585 -151 94 20 214 81 305 156 105 86 144 102 255 103 79 1 97
                                    -2 145 -26 31 -15 85 -53 120 -83 80 -70 201 -130 300 -151 188 -39 295 13
                                    295 144 0 101 -53 148 -182 163 -95 10 -142 32 -233 109 -126 107 -292 170
                                    -445 170 -133 0 -294 -54 -398 -133 -26 -21 -51 -37 -55 -37 -4 0 -18 35 -31
                                    78 -90 311 -364 856 -698 1391 -194 311 -635 957 -712 1045 -39 45 -116 63
                                    -175 41z"></path>
                                    <path d="M4025 4625 c-50 -18 -76 -48 -214 -244 -200 -285 -345 -546 -413
                                    -742 -30 -86 -32 -104 -32 -214 1 -100 5 -132 26 -197 39 -119 92 -204 182
                                    -294 90 -90 175 -143 294 -182 67 -22 94 -26 212 -26 118 0 145 4 212 26 119
                                    39 204 92 294 182 90 90 143 175 182 294 21 65 25 96 26 197 0 131 -13 183
                                    -89 357 -105 238 -466 792 -542 832 -45 23 -94 27 -138 11z m152 -562 c155
                                    -239 246 -409 283 -532 30 -97 23 -170 -25 -267 -42 -86 -102 -144 -193 -187
                                    -61 -29 -76 -32 -162 -32 -86 0 -101 3 -162 32 -91 43 -151 101 -193 187 -48
                                    97 -55 170 -25 267 22 75 82 202 153 324 63 109 218 345 227 345 4 0 48 -62
                                    97 -137z"></path>
                                    <path d="M2380 1725 c-91 -21 -212 -83 -300 -156 -92 -76 -139 -98 -233 -108
                                    -89 -10 -128 -29 -158 -78 -69 -111 14 -243 153 -243 140 1 288 58 418 164
                                    119 96 154 111 265 111 107 0 170 -24 252 -97 258 -230 635 -235 893 -12 99
                                    86 155 109 265 109 110 0 166 -23 265 -109 122 -106 298 -172 437 -164 43 3
                                    71 10 90 24 93 70 96 192 7 261 -26 19 -52 27 -114 34 -97 11 -149 35 -245
                                    114 -277 228 -645 217 -910 -26 -16 -15 -55 -40 -85 -56 -48 -24 -67 -27 -145
                                    -28 -107 0 -166 23 -255 99 -132 114 -264 166 -430 172 -68 2 -128 -2 -170
                                    -11z"></path>
                                    </g>
                                    </svg>
                            </div>
                        </div>
                        <div class="each-item-menu">
                            <div class="svg-tick"></div>
                            <div>
                                <span>Visibility</span>
                                <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24"><path d="M23.271,9.419C21.72,6.893,18.192,2.655,12,2.655S2.28,6.893.729,9.419a4.908,4.908,0,0,0,0,5.162C2.28,17.107,5.808,21.345,12,21.345s9.72-4.238,11.271-6.764A4.908,4.908,0,0,0,23.271,9.419Zm-1.705,4.115C20.234,15.7,17.219,19.345,12,19.345S3.766,15.7,2.434,13.534a2.918,2.918,0,0,1,0-3.068C3.766,8.3,6.781,4.655,12,4.655s8.234,3.641,9.566,5.811A2.918,2.918,0,0,1,21.566,13.534Z"></path><path d="M12,7a5,5,0,1,0,5,5A5.006,5.006,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z"></path></svg>
                        
                            </div>
                        </div>
                        <div class="each-item-menu">
                            <div class="svg-tick"></div>
                            
                            <div>
                                <span>Pressure</span>
                                <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
                        
                                    <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)">
                                <path d="M2300 4656 c-386 -53 -721 -190 -1022 -417 -107 -80 -317 -290 -397
                                -397 -703 -931 -529 -2240 392 -2954 366 -283 822 -438 1287 -438 809 1 1539
                                457 1896 1186 350 714 266 1566 -217 2206 -80 107 -290 317 -397 397 -278 210
                                -596 347 -946 407 -124 21 -471 27 -596 10z m100 -445 c0 -144 7 -171 53 -219
                                75 -77 199 -57 246 42 18 36 21 61 21 174 l0 132 28 0 c56 0 219 -33 330 -66
                                202 -61 389 -155 560 -281 l74 -54 -105 -108 c-83 -85 -107 -116 -112 -145
                                -28 -148 127 -250 256 -167 24 16 78 63 119 106 l75 77 28 -34 c54 -63 149
                                -213 199 -312 83 -165 154 -404 174 -583 l7 -63 -150 0 c-139 0 -152 -2 -184
                                -23 -109 -73 -105 -212 7 -267 34 -17 61 -20 183 -20 l144 0 -7 -52 c-23 -173
                                -82 -384 -146 -521 l-32 -67 -1610 2 -1609 3 -34 75 c-65 148 -120 347 -141
                                508 l-7 52 134 0 c112 0 139 3 173 20 117 57 123 215 11 277 -36 20 -54 23
                                -179 23 l-139 0 7 63 c32 285 162 607 349 860 l50 68 96 -94 c107 -105 142
                                -127 201 -127 107 0 183 105 149 207 -8 25 -45 72 -111 139 l-100 102 59 44
                                c128 99 282 186 436 247 130 52 364 108 460 110 l37 1 0 -129z m1522 -2808
                                c-51 -61 -192 -197 -257 -250 -135 -109 -347 -226 -521 -286 -209 -73 -411
                                -102 -648 -94 -342 11 -638 107 -932 302 -110 73 -281 226 -365 326 l-41 49
                                1402 0 1402 0 -40 -47z"></path>
                                <path d="M2505 3609 c-44 -12 -78 -54 -115 -139 -18 -41 -89 -196 -157 -345
                                -170 -368 -177 -390 -178 -540 0 -118 1 -121 37 -199 49 -101 148 -203 240
                                -246 252 -118 552 -18 680 227 45 85 63 171 55 267 -8 91 -35 166 -149 421
                                -50 110 -117 261 -151 335 -74 165 -89 187 -141 211 -44 20 -74 22 -121 8z
                                m110 -641 c91 -193 135 -310 135 -361 0 -77 -48 -152 -113 -176 -69 -26 -174
                                -4 -219 46 -45 50 -60 137 -34 209 24 70 168 384 176 384 4 0 29 -46 55 -102z"></path>
                                </g>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="canvas-holder">
                    <div class="container-for-values">
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                    </div>
                    <canvas id="canvas"></canvas>
                </div>
                `
                WHLE_ELMNT.appendChild(index)
                extraText.innerHTML = `
                <span class="timeFORWIND">Daily Summary</span>
                <span class="textForWIND">Wind is currently ${Math.round(weatherData.current.wind_kph)} km/h from the ${windDirections()}. Today, wind speeds are ${Math.round(windSpeeds()[1])} to ${Math.round(windSpeeds()[0])} km/h, with gusts up to ${Math.round(gustSpeeds())} km/h.</span>
                `
                WHLE_ELMNT.appendChild(extraText)
                WHLE_ELMNT.appendChild(finalInfo)

                const windScale = document.createElement("div")
                WHLE_ELMNT.appendChild(windScale)
                windScale.classList.add("last-element-wind")

                windScale.innerHTML = `
                <span>Beaufort Scale</span>

                <div class="wind-scale-wrapper">
                    <div class="scale-headline">
                        <span>bft</span>
                        <span>Description</span>
                        <span>km/h</span>
                    </div>
                    <div class="scale-table">
                        <div>
                            <div class="color-based-ball"></div>
                            <span>0</span>
                        </div>
                        <span>Calm</span>
                        <span>< 2</span>
                    </div>
                    <div class="scale-table">
                        <div>
                            <div class="color-based-ball"></div>
                            <span>1</span>
                        </div>
                        <span>Light air</span>
                        <span>2 - 5</span>
                    </div>
                    <div class="scale-table">
                        <div>
                            <div class="color-based-ball"></div>
                            <span>2</span>
                        </div>
                        <span>Light Breeze</span>
                        <span>6 - 11</span>
                    </div>
                    <div class="scale-table">
                        <div>
                            <div class="color-based-ball"></div>
                            <span>3</span>
                        </div>
                        <span>Gentle breeze</span>
                        <span>12 - 19</span>
                    </div>
                    <div class="scale-table">
                        <div>
                            <div class="color-based-ball"></div>
                            <span>4</span>
                        </div>
                        <span>Moderate breeze</span>
                        <span>20 -28</span>
                    </div>
                    <div class="scale-table">
                        <div>
                            <div class="color-based-ball"></div>
                            <span>5</span>
                        </div>
                        <span>Fresh breeze</span>
                        <span>29 - 38</span>
                    </div>
                    <div class="scale-table">
                        <div>
                            <div class="color-based-ball"></div>
                            <span>6</span>
                        </div>
                        <span>Strong breeze</span>
                        <span>39 - 49</span>
                    </div>
                    <div class="scale-table">
                        <div>
                            <div class="color-based-ball"></div>
                            <span>7</span>
                        </div>
                        <span>High wind</span>
                        <span>50 - 61</span>
                    </div>
                    <div class="scale-table">
                        <div>
                            <div class="color-based-ball"></div>
                            <span>8</span>
                        </div>
                        <span>Gale</span>
                        <span>62 - 74</span>
                    </div>
                    <div class="scale-table">
                        <div>
                            <div class="color-based-ball"></div>
                            <span>9</span>
                        </div>
                        <span>Strong gale</span>
                        <span>75 - 87</span>
                    </div>
                    <div class="scale-table">
                        <div>
                            <div class="color-based-ball"></div>
                            <span>10</span>
                        </div>
                        <span>Storm</span>
                        <span>88 - 102</span>
                    </div>
                    <div class="scale-table">
                        <div>
                            <div class="color-based-ball"></div>
                            <span>11</span>
                        </div>
                        <span>Violent storm</span>
                        <span>103 - 117</span>
                    </div>
                    <div class="scale-table">
                        <div>
                            <div class="color-based-ball"></div>
                            <span>12</span>
                        </div>
                        <span>Hurricane-force</span>
                        <span>> 118</span>
                    </div>
                </div>

                <span>About the Beaufort Scale</span>
                <span class="scale-text">The Beaufort wind scale expresses how forceful or strong the wind is at a given speed. The Beaufort scale may make it easier to understand how windy it will feel or how much effect the wind could have. Each value on the scale corresponds to a wind speed range.</span>
                `
                
                continue
            }
            //console.log(daysShort, weatherData.forecast.forecastday[i].day.uv)
            const day = document.createElement("div")
            day.classList.add("forecast-each-day")
            day.innerHTML = `
            <span>${daysShort}</span>
            <span class="numbers">${numbersDays}</span>
            `
            wrapper.appendChild(day)
            
        }   
        const allCircles = document.querySelectorAll(".color-based-ball")
        const circlesColorsArray = ["#03bafc", "#03e3fc", "#03fcdb", "#03fcad", "#03fc80", "#03fc4e", "#c2fc03", "#fcdb03", "#fcb503", "#fc8403", "#fc4103", "#fc1803", "#fc0367"]

        for(let i = 0; i < allCircles.length; i++){
            allCircles[i].style.backgroundColor = circlesColorsArray[i]
        }
        
    }
    const eventFunctionFORWIND = () =>{
        const elements = document.querySelectorAll(".numbers")
        const fullDate = document.querySelector(".datepicked")
        const index = document.querySelector(".index span")
        const determiner = document.querySelector(".determiner")
        const extraText = document.querySelector(".timeFORWIND")
        const extraTextDATE = document.querySelector(".textForWIND")
        const direction = document.querySelector(".direction")
        const gusts = document.querySelector(".gusts")
        
        //console.log(windSpeeds())

        for(let i = 0; i < elements.length; i++){
            const windSpeeds = () =>{
                let fastestWind = weatherData.forecast.forecastday[i].hour[0].wind_kph
                let slowestWind = weatherData.forecast.forecastday[i].hour[0].wind_kph
                

                for(let j = 0; j < weatherData.forecast.forecastday[i].hour.length; j++){
                    //console.log(weatherData.forecast.forecastday[1].hour[j].wind_kph)

                    if(weatherData.forecast.forecastday[i].hour[j].wind_kph > fastestWind){                        
                        fastestWind = weatherData.forecast.forecastday[i].hour[j].wind_kph
                    }
    
                    if(weatherData.forecast.forecastday[i].hour[j].wind_kph < slowestWind){
                        slowestWind = weatherData.forecast.forecastday[i].hour[j].wind_kph
                    }
    
                    if(j == weatherData.forecast.forecastday[i].hour.length - 1){
                        //console.log(fastestWind, "Fast")
                        //console.log(slowestWind, "Slow")
                        //console.log(weatherData.forecast.forecastday[i].hour[j])
                    }
                    
                }
                return [fastestWind, slowestWind]
            }
            

            const gustSpeeds = () =>{
                let fastestGust = weatherData.forecast.forecastday[i].hour[0].gust_kph
                for(let j = 0; j < weatherData.forecast.forecastday[i].hour.length; j++){
                    if(weatherData.forecast.forecastday[i].hour[j].gust_kph > fastestGust){
                        fastestGust = weatherData.forecast.forecastday[i].hour[j].gust_kph
                    }
    
                    if(j == weatherData.forecast.forecastday[i].hour.length - 1){
                        //console.log(fastestGust, "Fast")
                    }
                }
                return fastestGust
            }

            let days = new Date(weatherData.forecast.forecastday[i].date)
                let fullDay = days.toLocaleDateString("default", {weekday: "long", day: "2-digit", month: "long", "year": "numeric"})
                elements[i].addEventListener("click", ()=>{
                elements.forEach(element =>{
                    element.classList.remove("active")
                })

                elements[0].addEventListener("click", ()=>{
                    mainFunctionFORWIND()
                })
                let weekday = days.toLocaleDateString("default", {weekday: "long"})

                //console.log(windSpeeds()[0])
                
                extraTextDATE.textContent = `On ${weekday}, wind speeds will be ${Math.round(windSpeeds()[1])} to ${Math.round(windSpeeds()[0])} km/h, with gusts up to ${Math.round(gustSpeeds())} km/h.`
                
                extraText.textContent = "Daily Summary"
                determiner.textContent = "km/h"
                index.textContent = `${Math.round(windSpeeds()[1])}-${Math.round(windSpeeds()[0])}`
                fullDate.textContent = fullDay
                elements[i].classList.add("active")
                gusts.textContent = `Gusts up to: ${Math.round(gustSpeeds())} km/h`
                direction.remove()

                const RESETCHART = document.querySelector(".canvas-holder")
                RESETCHART.innerHTML = `
                <div class="container-for-values">
                        <div class="value-hrs">1</div>
                        <div class="value-hrs">1</div>
                        <div class="value-hrs">1</div>
                        <div class="value-hrs">1</div>
                        <div class="value-hrs">5</div>
                        <div class="value-hrs">5</div>
                        <div class="value-hrs">6</div>
                        <div class="value-hrs">6</div>
                        <div class="value-hrs">6</div>
                        <div class="value-hrs">4</div>
                        <div class="value-hrs">1</div>
                        <div class="value-hrs">1</div>
                </div>
                <canvas id="canvas" height="340" style="display: block; box-sizing: border-box; height: 272px; width: 476px;" width="595"></canvas>
                `
                const WindChartFunction = () =>{

                    const hoursArray = []
            
                    for(let i = 0; i < 24; i++){
                        hoursArray.push(i)
                    }
            
                    //the index at which the change will occur
                    let labelToChange = new Date(weatherData.current.last_updated).getHours()
            
            
                    //when will the line be dashed and stright
                    const dash = (ctx) => {
                        //console.log(ctx.p0DataIndex)
                        if(ctx.p0DataIndex < labelToChange){
                            return [8, 10]
                        }
                    }
            
                    let ctx = document.querySelector("#canvas").getContext("2d")
            
                    const windData = () =>{
                        const windSpeeds = []
                        const gustSpeeds = []
                
                        for(let D = 0; D < weatherData.forecast.forecastday[i].hour.length; D++){
                            windSpeeds.push(Math.round(weatherData.forecast.forecastday[i].hour[D].wind_kph))
                            gustSpeeds.push(Math.round(weatherData.forecast.forecastday[i].hour[D].gust_kph))
                        }
                
                        return [windSpeeds, gustSpeeds]
                    }
                    //console.log(windData()[0])
                    
                    const container = document.querySelector(".container-for-values")
                    if((Math.ceil(Math.max(...windData()[1]) / 10) * 10) + 10 >= 100){
                        container.style.gap = `19.5px`
                        container.style.width = `425.1px`
                    }else if((Math.ceil(Math.max(...windData()[1]) / 10) * 10) + 10 >= 10){
                        
                        container.style.width = `432px`
                    }
                    
                    const canvasElement = document.querySelector(".canvas-holder")
                    const invisibleOverlay = document.createElement("div")
                    invisibleOverlay.classList.add("blank-overlay")
                    canvasElement.appendChild(invisibleOverlay)
                    
                    const all = document.querySelectorAll(".value-hrs")
                
                    const establishTheSVG = () =>{
                        all[0].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"/></svg>`
                        all[1].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"/></svg>`
                        all[2].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"/></svg>`
                        all[3].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"/></svg>`
                        all[4].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"/></svg>`
                        all[5].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"/></svg>`
                        all[6].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"/></svg>`
                        all[7].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"/></svg>`
                        all[8].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"/></svg>`
                        all[9].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"/></svg>`
                        all[10].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"/></svg>`
                        all[11].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"/></svg>`
                    }
                    establishTheSVG()
            
                    //svg rotation based on direction
                    const windRotation = (arg) =>{
                        if(arg == 'N'){
                            return 0
                        }else if(arg == 'S'){
                            return 180
                        }else if(arg == 'E'){
                            return 90
                        }else if(arg == 'W'){
                            return 270
                        }else if(arg == 'NE'){
                            return 45
                        }else if(arg == 'SE'){
                            return 135
                        }else if(arg == 'SW'){
                            return 225
                        }else if(arg == 'NW'){
                            return 315
                        }else if(arg == 'NNE'){
                            return 22.5
                        }else if(arg == 'ENE'){
                            return 67.5
                        }else if(arg = 'ESE'){
                            return 112.5
                        }else if(arg == 'SSE'){
                            return 157.5
                        }else if(arg == 'SSW'){
                            return 202.5
                        }else if(arg == 'WSW'){
                            return 247.5
                        }else if(arg == 'WNW'){
                            return 292.5
                        }else if(arg == 'NNW'){
                            return 337.5
                        }
                    }
            
                    const fastestWindForecast = () =>{
                        const fastestWind = []
                        for(let d = 0; d < weatherData.forecast.forecastday.length; d++){
            
                            for(let h = 0; h < weatherData.forecast.forecastday[d].hour.length; h++){
            
                                fastestWind.push(Math.round(weatherData.forecast.forecastday[d].hour[h].gust_kph))
                            
                            }
                        }
            
                        return Math.max(...fastestWind)
                    }
                    //console.log(fastestWindForecast())
            
                    const allSVG = document.querySelectorAll(".value-hrs svg")
            
                    allSVG[0].style.rotate = `${windRotation(weatherData.forecast.forecastday[i].hour[0].wind_dir)}deg`
                    allSVG[1].style.rotate = `${windRotation(weatherData.forecast.forecastday[i].hour[2].wind_dir)}deg`
                    allSVG[2].style.rotate = `${windRotation(weatherData.forecast.forecastday[i].hour[4].wind_dir)}deg`
                    allSVG[3].style.rotate = `${windRotation(weatherData.forecast.forecastday[i].hour[6].wind_dir)}deg`
                    allSVG[4].style.rotate = `${windRotation(weatherData.forecast.forecastday[i].hour[8].wind_dir)}deg`
                    allSVG[5].style.rotate = `${windRotation(weatherData.forecast.forecastday[i].hour[10].wind_dir)}deg`
                    allSVG[6].style.rotate = `${windRotation(weatherData.forecast.forecastday[i].hour[12].wind_dir)}deg`
                    allSVG[7].style.rotate = `${windRotation(weatherData.forecast.forecastday[i].hour[14].wind_dir)}deg`
                    allSVG[8].style.rotate = `${windRotation(weatherData.forecast.forecastday[i].hour[16].wind_dir)}deg`
                    allSVG[9].style.rotate = `${windRotation(weatherData.forecast.forecastday[i].hour[18].wind_dir)}deg`
                    allSVG[10].style.rotate = `${windRotation(weatherData.forecast.forecastday[i].hour[20].wind_dir)}deg`
                    allSVG[11].style.rotate = `${windRotation(weatherData.forecast.forecastday[i].hour[22].wind_dir)}deg`
                    
            
            
                    //data block
                    const chartData = {
                        labels: hoursArray,
                        datasets: [{
                            label: "",
                            data: windData()[0],
                            segment: {
                                //borderDash: ctx => dash(ctx),
                            },
                            
                            borderWidth: 6.5,
                            borderColor: "#03adfc",
                            pointBackgroundColor: "transparent",
                            pointBorderColor: "transparent",
                            borderCapStyle: 'round',
                            clip: {
                                left: 0,
                                right: 0,
                                top: false,
                                bottom: false
                            },
                            tension: 0.2,
                            fill: true,
                            backgroundColor: "rgba(0, 163, 238, 0.3)"
                        }, {
                            label: "",
                            data: windData()[1],
                            segment: {
                                //borderDash: ctx => dash(ctx),
                            },
                            
                            borderWidth: 6.5,
                            borderColor: "rgba(0, 122, 179, 0.77)",
                            pointBackgroundColor: "transparent",
                            pointBorderColor: "transparent",
                            borderCapStyle: 'round',
                            clip: {
                                left: 0,
                                right: 0,
                                top: false,
                                bottom: 4
                            },
                            tension: 0.2,
                        }]
                    }
                
                    const plugin = {
                        id: 'customCanvasBackgroundColor',
                        beforeDraw: (chart, args, options) => {
                        const {ctx} = chart;
                        ctx.save();
                        ctx.globalCompositeOperation = 'destination-over';
                        ctx.fillStyle = options.color
                        ctx.fillRect(0, 0, chart.width, chart.height);
                        ctx.restore();
                        
                        }
                    };
                
                    //console.log(Math.round(Math.min(...windData()[0]) / 10) * 10)
            
                    //console.log(Math.min(...windData()[0]))
            
                    
            
                    //the max based on wind
                    const windDeterminer = () =>{
                        if((fastestWindForecast() / 10) * 10 < 30){
                            return 30
                        }else if((fastestWindForecast() / 10) * 10 < 40){
                            return 40
                        }else if((fastestWindForecast() / 10) * 10 < 50){
                            return 50
                        }else if((fastestWindForecast() / 10) * 10 < 60){
                            return 60
                        }else if((fastestWindForecast() / 10) * 10 < 70){
                            return 70
                        }else if((fastestWindForecast() / 10) * 10 < 80){
                            return 80
                        }else if((fastestWindForecast() / 10) * 10 < 90){
                            return 90
                        }else if((fastestWindForecast() / 10) * 10 < 100){
                            return 100
                        }
                    }
                    //console.log(windDeterminer())
            
                    //the min based on wind
                    const minValue = () =>{
                        if(windDeterminer() == 30){
                            return 0
                        }else if(windDeterminer() == 40){
                            return 10
                        }else if(windDeterminer() == 50){
                            return 20
                        }else if(windDeterminer == 60){
                            return 30
                        }else if(windDeterminer == 70){
                            return 40
                        }else if(windDeterminer == 80){
                            return 50
                        }else if(windDeterminer == 90){
                            return 60
                        }else if(windDeterminer == 100){
                            return 70
                        }
                    }
            
                    //console.log((Math.ceil(Math.max(...windData()[1]) / 10) * 10) + 10)
                    
                    
                    //config block
                    const config = {
                        type: "line",
                        data: chartData,  
                        options: {
                            aspectRatio: 7/4,
                            responsive: true,
                            scales: {
                                y: {
                                    //min: minValue(),
                                    beginAtZero: true,
                                    //suggestedMax: Math.max(...windData()[1]) + 10,
                                    max: (Math.ceil(Math.max(...windData()[1]) / 10) * 10) + 10,
                                    grid: {
                                        drawTicks: false,
                                        display: true,
                                        drawOnChartArea: true,
                                        color: "#302F32"
                                    },
                                    border: {
                                        display: true,
                                        color: "#302F32"
                                    },
                                    ticks: {
                                        color: "#9D9D9E",
                                        padding: 15,
                                        align: "center",
                                        crossAlign: "center",
                                        font: {
                                            size: 13,
                                            weight: 400
                                        },
                                        maxTicksLimit: 12
                                    },
                                    position: "right"
                                },
                
                                x: {
                                    border: {
                                        display: false,
                                        dash: [3, 2]
                                    },
                                    grid: {
                                        display: true,
                                        drawOnChartArea: true,
                                        drawTicks: false,
                                        color: "#302F32",
            
                                    },
            
                                    ticks: {
                                        color: "#9D9D9E",
                                        maxTicksLimit: 4,
                                        padding: 5,
                                        align: "start",
                                        crossAlign: "near",
                                        font: {
                                            size: 15,
                                            weight: 400
                                        }
                                    },
                                   
                                },
                
                                
                            },
                            plugins: {
                                customCanvasBackgroundColor: {
                                    color: "#202023"
                                },
                                legend: {
                                    display: false
                                },
                                autocolors: false,
                                
                            },
                            
                            
                                
                            
                            
                        },
                        plugins: [plugin]
                    }
                
                    const windChart = new Chart(ctx, config)
                }
                WindChartFunction()
            })
        }
    }
    const mainFunctionFORWIND = ()=>{
        createElementWIND()
        eventFunctionFORWIND()

        //WIND CHART HERE
        const WindChartFunction = () =>{

            const hoursArray = []
    
            for(let i = 0; i < 24; i++){
                hoursArray.push(i)
            }
    
            //the index at which the change will occur
            let labelToChange = new Date(weatherData.current.last_updated).getHours()
    
    
            //when will the line be dashed and stright
            const dash = (ctx) => {
                //console.log(ctx.p0DataIndex)
                if(ctx.p0DataIndex < labelToChange){
                    return [8, 10]
                }
            }
    
            let ctx = document.querySelector("#canvas").getContext("2d")
    
            const windData = () =>{
                const windSpeeds = []
                const gustSpeeds = []
        
                for(let i = 0; i < weatherData.forecast.forecastday[0].hour.length; i++){
                    windSpeeds.push(Math.round(weatherData.forecast.forecastday[0].hour[i].wind_kph))
                    gustSpeeds.push(Math.round(weatherData.forecast.forecastday[0].hour[i].gust_kph))
                }
        
                return [windSpeeds, gustSpeeds]
            }
            
            const container = document.querySelector(".container-for-values")
            //container.classList.add("adjusted")
            
            if((Math.ceil(Math.max(...windData()[1]) / 10) * 10) + 10 >= 100){
                container.style.gap = `19.5px`
                container.style.width = `425.1px`
            }else if((Math.ceil(Math.max(...windData()[1]) / 10) * 10) + 10 >= 10){
                
                container.style.width = `432px`
            }
            
            const all = document.querySelectorAll(".value-hrs")

            const canvasElement = document.querySelector(".canvas-holder")
            const chartOverlay = document.createElement("div")
            chartOverlay.classList.add("time-passed-overlay")

            const invisibleOverlay = document.createElement("div")
            invisibleOverlay.classList.add("blank-overlay")
            canvasElement.appendChild(invisibleOverlay)

            const lineDivider = document.createElement("div")
            lineDivider.classList.add("line-divider")
            chartOverlay.appendChild(lineDivider)
            
            canvasElement.appendChild(chartOverlay)
            const overlayStyle = () =>{
                if(labelToChange == 0){
                    chartOverlay.style.width = `9px`
                    
                }else if(labelToChange == 1){
                    chartOverlay.style.width = `27px`
                    
                }else if(labelToChange == 2){
                    chartOverlay.style.width = `45px`
                    
                }else if(labelToChange == 3){
                    chartOverlay.style.width = `64px`
                    
                }else if(labelToChange == 4){
                    chartOverlay.style.width = `82px`
                    
                }else if(labelToChange == 5){
                    chartOverlay.style.width = `100px`
                    
                }else if(labelToChange == 6){
                    chartOverlay.style.width = `119px`
                    
                }else if(labelToChange == 7){
                    chartOverlay.style.width = `137px`
                    
                }else if(labelToChange == 8){
                    chartOverlay.style.width = `155px`
                    
                }else if(labelToChange == 9){

                    chartOverlay.style.width = `173px`
                    
                }else if(labelToChange == 10){
                    chartOverlay.style.width = `191px`
                    
                }else if(labelToChange == 11){
                    chartOverlay.style.width = `210px`
                    
                }else if(labelToChange == 12){
                    chartOverlay.style.width = `228px`
                    
                }else if(labelToChange == 13){
                    chartOverlay.style.width = `247px`
                    
                }else if(labelToChange == 14){
                    chartOverlay.style.width = `265px`
                    
                }else if(labelToChange == 15){
                    chartOverlay.style.width = `283px`
                    
                }else if(labelToChange == 16){
                    chartOverlay.style.width = `301px`
                    
                }else if(labelToChange == 17){
                    chartOverlay.style.width = `320px`
                    
                }else if(labelToChange == 18){
                    chartOverlay.style.width = `338px`
                    
                }else if(labelToChange == 19){
                    chartOverlay.style.width = `356px`
                    
                }else if(labelToChange == 20){
                    chartOverlay.style.width = `374px`
                    
                }else if(labelToChange == 21){
                    chartOverlay.style.width = `393px`
                    
                }else if(labelToChange == 22){
                    chartOverlay.style.width = `411px`
                    
                }else if(labelToChange == 23){
                    chartOverlay.style.width = `430px`
                    
                }

                lineDivider.style.left = chartOverlay.style.width 
            }
            overlayStyle()
        
            const establishTheSVG = () =>{
                all[0].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>`
                all[1].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>`
                all[2].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>`
                all[3].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>`
                all[4].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>`
                all[5].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>`
                all[6].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>`
                all[7].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>`
                all[8].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>`
                all[9].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>`
                all[10].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>`
                all[11].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>`
            }
            establishTheSVG()
    
            //svg rotation based on direction
            const windRotation = (arg) =>{
                if(arg == 'N'){
                    return 0
                }else if(arg == 'S'){
                    return 180
                }else if(arg == 'E'){
                    return 90
                }else if(arg == 'W'){
                    return 270
                }else if(arg == 'NE'){
                    return 45
                }else if(arg == 'SE'){
                    return 135
                }else if(arg == 'SW'){
                    return 225
                }else if(arg == 'NW'){
                    return 315
                }else if(arg == 'NNE'){
                    return 22.5
                }else if(arg == 'ENE'){
                    return 67.5
                }else if(arg = 'ESE'){
                    return 112.5
                }else if(arg == 'SSE'){
                    return 157.5
                }else if(arg == 'SSW'){
                    return 202.5
                }else if(arg == 'WSW'){
                    return 247.5
                }else if(arg == 'WNW'){
                    return 292.5
                }else if(arg == 'NNW'){
                    return 337.5
                }
            }
    
            const fastestWindForecast = () =>{
                const fastestWind = []
                for(let d = 0; d < weatherData.forecast.forecastday.length; d++){
    
                    for(let h = 0; h < weatherData.forecast.forecastday[d].hour.length; h++){
    
                        fastestWind.push(Math.round(weatherData.forecast.forecastday[d].hour[h].gust_kph))
                    
                    }
                }
    
                return Math.max(...fastestWind)
            }
            //console.log(fastestWindForecast())
    
            const allSVG = document.querySelectorAll(".value-hrs svg")
    
            allSVG[0].style.rotate = `${windRotation(weatherData.forecast.forecastday[0].hour[0].wind_dir)}deg`
            allSVG[1].style.rotate = `${windRotation(weatherData.forecast.forecastday[0].hour[2].wind_dir)}deg`
            allSVG[2].style.rotate = `${windRotation(weatherData.forecast.forecastday[0].hour[4].wind_dir)}deg`
            allSVG[3].style.rotate = `${windRotation(weatherData.forecast.forecastday[0].hour[6].wind_dir)}deg`
            allSVG[4].style.rotate = `${windRotation(weatherData.forecast.forecastday[0].hour[8].wind_dir)}deg`
            allSVG[5].style.rotate = `${windRotation(weatherData.forecast.forecastday[0].hour[10].wind_dir)}deg`
            allSVG[6].style.rotate = `${windRotation(weatherData.forecast.forecastday[0].hour[12].wind_dir)}deg`
            allSVG[7].style.rotate = `${windRotation(weatherData.forecast.forecastday[0].hour[14].wind_dir)}deg`
            allSVG[8].style.rotate = `${windRotation(weatherData.forecast.forecastday[0].hour[16].wind_dir)}deg`
            allSVG[9].style.rotate = `${windRotation(weatherData.forecast.forecastday[0].hour[18].wind_dir)}deg`
            allSVG[10].style.rotate = `${windRotation(weatherData.forecast.forecastday[0].hour[20].wind_dir)}deg`
            allSVG[11].style.rotate = `${windRotation(weatherData.forecast.forecastday[0].hour[22].wind_dir)}deg`
            
    
    
            //data block
            const chartData = {
                labels: hoursArray,
                datasets: [{
                    label: "",
                    data: windData()[0],
                    segment: {
                        borderDash: ctx => dash(ctx),
                    },
                    
                    borderWidth: 6.5,
                    borderColor: "#03adfc",
                    pointBackgroundColor: "transparent",
                    pointBorderColor: "transparent",
                    borderCapStyle: 'round',
                    clip: {
                        left: 0,
                        right: 0,
                        top: false,
                        bottom: false
                    },
                    tension: 0.2,
                    fill: true,
                    backgroundColor: "rgba(0, 163, 238, 0.3)"
                }, {
                    label: "",
                    data: windData()[1],
                    segment: {
                        borderDash: ctx => dash(ctx),
                    },
                    
                    borderWidth: 6.5,
                    borderColor: "rgba(0, 122, 179, 0.77)",
                    pointBackgroundColor: "transparent",
                    pointBorderColor: "transparent",
                    borderCapStyle: 'round',
                    clip: {
                        left: 0,
                        right: 0,
                        top: false,
                        bottom: 4
                    },
                    tension: 0.2,
                }]
            }
        
            const plugin = {
                id: 'customCanvasBackgroundColor',
                beforeDraw: (chart, args, options) => {
                const {ctx} = chart;
                ctx.save();
                ctx.globalCompositeOperation = 'destination-over';
                ctx.fillStyle = options.color
                ctx.fillRect(0, 0, chart.width, chart.height);
                ctx.restore();
                
                }
            };
        
            //console.log(Math.round(Math.min(...windData()[0]) / 10) * 10)
    
            //console.log(Math.min(...windData()[0]))
    
            
    
            //the max based on wind
            const windDeterminer = () =>{
                if((fastestWindForecast() / 10) * 10 < 30){
                    return 30
                }else if((fastestWindForecast() / 10) * 10 < 40){
                    return 40
                }else if((fastestWindForecast() / 10) * 10 < 50){
                    return 50
                }else if((fastestWindForecast() / 10) * 10 < 60){
                    return 60
                }
            }
    
            //the min based on wind
            const minValue = () =>{
                if(windDeterminer() == 30){
                    return 0
                }else if(windDeterminer() == 40){
                    return 10
                }else if(windDeterminer() == 50){
                    return 20
                }else if(windDeterminer == 60){
                    return 30
                }
            }
    
            //config block
            const config = {
                type: "line",
                data: chartData,  
                options: {
                    aspectRatio: 7/4,
                    responsive: true,
                    scales: {
                        y: {
                            //min: minValue(),
                            beginAtZero: true,
                            //suggestedMax: Math.max(...windData()[1]) + 10,
                            max: windDeterminer(),
                            grid: {
                                drawTicks: false,
                                display: true,
                                drawOnChartArea: true,
                                color: "#302F32"
                            },
                            border: {
                                display: true,
                                color: "#302F32"
                            },
                            ticks: {
                                color: "#9D9D9E",
                                padding: 15,
                                align: "center",
                                crossAlign: "center",
                                font: {
                                    size: 13,
                                    weight: 400
                                },
                                maxTicksLimit: 12
                            },
                            position: "right"
                        },
        
                        x: {
                            border: {
                                display: false,
                                dash: [3, 2]
                            },
                            grid: {
                                display: true,
                                drawOnChartArea: true,
                                drawTicks: false,
                                color: "#302F32",
    
                            },
    
                            ticks: {
                                color: "#9D9D9E",
                                maxTicksLimit: 4,
                                padding: 5,
                                align: "start",
                                crossAlign: "near",
                                font: {
                                    size: 15,
                                    weight: 400
                                }
                            },
                           
                        },
        
                        
                    },
                    plugins: {
                        customCanvasBackgroundColor: {
                            color: "#202023"
                        },
                        legend: {
                            display: false
                        },
                        autocolors: false,
                        annotation: {
                            
                            annotations: {
                                
                                point2: {
                                    type: "point",
                                    xValue: labelToChange,
                                    yValue: windData()[0][labelToChange],
                                    backgroundColor: "#fafafa",
                                    borderWidth: 4,
                                    borderColor: "black",
                                    radius: 5.5,
                                    
                                }
                            },
                            clip: false
                        } 
                    },
                    
                    
                        
                    
                    
                },
                plugins: [plugin]
            }
        
            const windChart = new Chart(ctx, config)
        }
        WindChartFunction()

        const wrapper = document.querySelector(".forecast-days-wrap")

        let mouseDown = false //will change if mouse is clicked

        const dragging = (e)=>{
            if(!mouseDown){ //if the mouse isnt click this will not run
                return
            }
            wrapper.style.cursor = `grabbing` //styling for the cursor
            e.preventDefault() //preventing default behaviour
            wrapper.scrollLeft -= e.movementX //the scroll movement
        }

        wrapper.addEventListener("mousedown", ()=>{
            mouseDown = true //when the mouse is down change the variable value
            wrapper.style.cursor = `grabbing`
        })
        wrapper.addEventListener("mousemove", dragging) //when the mouse moves run the function

        wrapper.addEventListener("mouseup", ()=>{
            mouseDown = false //mouse is no longer clicked
            wrapper.style.cursor = `grab`
        })
        wrapper.addEventListener("mouseleave", ()=>{
            mouseDown = false //mouse leaves the element
            wrapper.style.cursor = `grab`
        })
        const selectDropdown = document.querySelector(".select")
        const littleCaret = document.querySelector(".rotated")
        let elementActive = false 
        const menuItemspWrapper = document.querySelector(".menu-wrapper")
        const eachItemMenu = document.querySelectorAll(".each-item-menu")
        const divWithTick = document.querySelectorAll(".svg-tick")

        

        eachItemMenu[0].addEventListener("click", ()=>{
            mainFunctionForecast()
            
        })

        eachItemMenu[1].addEventListener("click", ()=>{
            mainFunction()
        
        })

        eachItemMenu[2].addEventListener("click", ()=>{
            mainFunctionFORWIND()
        
        })

        eachItemMenu[3].addEventListener("click", ()=>{
            mainFunctionRAIN()
        
        })

        eachItemMenu[4].addEventListener("click", ()=>{
            mainFunctionFEELSLIKE()
            
        })

        eachItemMenu[5].addEventListener("click", ()=>{
            mainFunctionHUMIDITY()
        
        })

        eachItemMenu[6].addEventListener("click", ()=>{
            mainFunctionVISIBILITY()
        
        })

        eachItemMenu[7].addEventListener("click", ()=>{
            mainFunctionPRESSURE()
        
        })
        
    

        const functionForDropdownActivation = (e) =>{
            if(!elementActive){
                selectDropdown.style.backgroundColor = '#515154'
                littleCaret.classList.add("true")
                menuItemspWrapper.style.display = 'block'
                menuItemspWrapper.style.height = `auto`
            }else{
                selectDropdown.style.backgroundColor = '#3A3A3D'
                littleCaret.classList.remove("true")
                menuItemspWrapper.style.display = 'none'
                menuItemspWrapper.style.height = `0`
            }

            elementActive = !elementActive
            e.stopPropagation()
        }
        
        const clickAnywhereElse = () =>{
            if(elementActive){
                selectDropdown.style.backgroundColor = '#3A3A3D'
                elementActive = false
                littleCaret.classList.remove("true")
                menuItemspWrapper.style.display = 'none'
                menuItemspWrapper.style.height = `0`
            }
        }

        selectDropdown.addEventListener("click", functionForDropdownActivation)

        document.body.addEventListener("click", clickAnywhereElse)
    }

    const divWIND = document.querySelector(".wind")
    divWIND.addEventListener("click", ()=>{
        mainFunctionFORWIND()
        const addInfo = document.querySelector(".additional-info")
        ADVANCED_DATA_OVERLAY.style.display = 'flex'
        
        body.style.overflow = "hidden"
    })

    //FOR RAIN ADVANCED DATA
    const createElementRAIN = () =>{
        //const wrapper = document.querySelector(".forecast-days-wrap")
        //const WHLE_ELMNT = document.querySelector(".advanced-data")
        const PARENT_ELEMENT = document.querySelector(".additional-info")
        PARENT_ELEMENT.innerHTML = ` `
        const headline = document.createElement("div")
        headline.classList.add("headline")
        headline.innerHTML = `
        <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">

                <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)">
                <path d="M2413 4898 c-779 -1184 -1258 -2187 -1394 -2918 -26 -137 -36 -428
                -20 -553 84 -631 499 -1151 1076 -1345 434 -147 924 -86 1305 159 472 305 750
                820 751 1387 0 180 -20 332 -66 522 -147 597 -468 1299 -995 2175 -196 325
                -495 785 -511 785 -3 0 -70 -96 -146 -212z"></path>
                </g>
                </svg>
        <span>Precipitation</span>
        `
        const closeX = document.createElement("div")
        closeX.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
        `
        headline.appendChild(closeX)
        PARENT_ELEMENT.appendChild(headline)

        closeX.addEventListener("click", ()=>{
            PARENT_ELEMENT.innerHTML = ``
            body.style.overflow = "auto"
            ADVANCED_DATA_OVERLAY.style.display = "none"
        })

        
        PARENT_ELEMENT.style.marginTop = `0`
        
        const WHLE_ELMNT = document.createElement("div")
        WHLE_ELMNT.classList.add("advanced-data")
        PARENT_ELEMENT.appendChild(WHLE_ELMNT)
        WHLE_ELMNT.innerHTML = ``
        const wrapper = document.createElement("div")
        wrapper.classList.add("forecast-days-wrap")
        const index = document.createElement("div")
        index.classList.add("index")
        const extraText = document.createElement("div")
        extraText.classList.add("extra-text")
        WHLE_ELMNT.appendChild(wrapper)
        
        

        

        for(let i = 0; i < weatherData.forecast.forecastday.length; i++){
            let days = new Date(weatherData.forecast.forecastday[i].date)
            let daysShort = days.toLocaleDateString("default", {"weekday": "narrow"})
            let fullDay = days.toLocaleDateString("default", {weekday: "long", day: "2-digit", month: "long", "year": "numeric"})
            let numbersDays = days.toLocaleDateString("default", {day: "2-digit"})
            let currentHour = new Date(weatherData.current.last_updated).getHours()
            let sunsetToday = Number(weatherData.forecast.forecastday[i].astro.sunset.slice("0", "2")) + 12
            

            //console.log(fullDay)
            if(i == 0){
                
                const day = document.createElement("div")
                day.classList.add("forecast-each-day")
                day.innerHTML = `
                <span>${daysShort}</span>
                <span class="numbers active">${numbersDays}</span>

                
                `
                wrapper.appendChild(day)

                //console.log(weatherData.forecast.forecastday[0])

                const rainFunction = () =>{
                    if(Math.round(weatherData.forecast.forecastday[0].day.totalprecip_mm) <= 0 && Math.round(weatherData.forecast.forecastday[0].day.totalsnow_cm) <= 0){
                        return 'No precipitation in the past 24 hours.'
                    }else if(Math.round(weatherData.forecast.forecastday[0].day.totalprecip_mm) > 0 && Math.round(weatherData.forecast.forecastday[0].day.totalsnow_cm) <= 0){
                        return `There has been a total of ${Math.round(weatherData.forecast.forecastday[0].day.totalprecip_mm)} mm of rainfall in the past 24 hours.`
                    }else if(Math.round(weatherData.forecast.forecastday[0].day.totalprecip_mm) > 0 && Math.round(weatherData.forecast.forecastday[0].day.totalsnow_cm) > 0){
                        return `There has been a total of ${Math.round(weatherData.forecast.forecastday[0].day.totalprecip_mm)} mm of rainfall, as well as ${Math.round(weatherData.forecast.forecastday[0].day.totalsnow_cm)} cm of snowfall, in the past 24 hours.`
                    }else if(Math.round(weatherData.forecast.forecastday[0].day.totalprecip_mm) <= 0 && Math.round(weatherData.forecast.forecastday[0].day.totalsnow_cm) > 0){
                        return `There has been a total of ${Math.round(weatherData.forecast.forecastday[0].day.totalsnow_cm)} cm of snowfall in the past 24 hours.`
                    }
                }

                const fullDate = document.createElement("div")
                fullDate.classList.add("datepicked")
                fullDate.textContent = fullDay
                WHLE_ELMNT.appendChild(fullDate)
                index.innerHTML = `
                <span>${Math.round(weatherData.forecast.forecastday[0].day.totalprecip_mm)}</span>
                <span class="determiner">mm</span>
                <span class="rain-total">Total in last 24 hours</span>

                <div class="dropdown">

                    <div class="select">
                    <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">

                    <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)">
                    <path d="M2413 4898 c-779 -1184 -1258 -2187 -1394 -2918 -26 -137 -36 -428
                    -20 -553 84 -631 499 -1151 1076 -1345 434 -147 924 -86 1305 159 472 305 750
                    820 751 1387 0 180 -20 332 -66 522 -147 597 -468 1299 -995 2175 -196 325
                    -495 785 -511 785 -3 0 -70 -96 -146 -212z"></path>
                    </g>
                    </svg>
                        <svg class="rotated " xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"/></svg>
                    </div>

                    <div class="menu-wrapper">
                        <div class="each-item-menu">
                            <div class="svg-tick">
                                
                            </div>
                            <div>
                                <span>Conditions</span>
                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M0 336c0 79.5 64.5 144 144 144H512c70.7 0 128-57.3 128-128c0-61.9-44-113.6-102.4-125.4c4.1-10.7 6.4-22.4 6.4-34.6c0-53-43-96-96-96c-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32C167.6 32 96 103.6 96 192c0 2.7 .1 5.4 .2 8.1C40.2 219.8 0 273.2 0 336z"></path></svg>
                            </div>
                        </div>
                        <div class="each-item-menu">
                            <div class="svg-tick">
                                
                            </div>
                            <div>
                                <span>UV Index</span>
                                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24"><path d="M12,17c-2.76,0-5-2.24-5-5s2.24-5,5-5,5,2.24,5,5-2.24,5-5,5Zm1-13V1c0-.55-.45-1-1-1s-1,.45-1,1v3c0,.55,.45,1,1,1s1-.45,1-1Zm0,19v-3c0-.55-.45-1-1-1s-1,.45-1,1v3c0,.55,.45,1,1,1s1-.45,1-1ZM5,12c0-.55-.45-1-1-1H1c-.55,0-1,.45-1,1s.45,1,1,1h3c.55,0,1-.45,1-1Zm19,0c0-.55-.45-1-1-1h-3c-.55,0-1,.45-1,1s.45,1,1,1h3c.55,0,1-.45,1-1ZM6.71,6.71c.39-.39,.39-1.02,0-1.41l-2-2c-.39-.39-1.02-.39-1.41,0s-.39,1.02,0,1.41l2,2c.2,.2,.45,.29,.71,.29s.51-.1,.71-.29Zm14,14c.39-.39,.39-1.02,0-1.41l-2-2c-.39-.39-1.02-.39-1.41,0s-.39,1.02,0,1.41l2,2c.2,.2,.45,.29,.71,.29s.51-.1,.71-.29Zm-16,0l2-2c.39-.39,.39-1.02,0-1.41s-1.02-.39-1.41,0l-2,2c-.39,.39-.39,1.02,0,1.41,.2,.2,.45,.29,.71,.29s.51-.1,.71-.29ZM18.71,6.71l2-2c.39-.39,.39-1.02,0-1.41s-1.02-.39-1.41,0l-2,2c-.39,.39-.39,1.02,0,1.41,.2,.2,.45,.29,.71,.29s.51-.1,.71-.29Z"></path></svg>
                            </div>
                        </div>
                        <div class="each-item-menu">
                            <div class="svg-tick"></div>
                            <div>
                                <span>Wind</span>
                                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24"><path d="M0,12a1,1,0,0,1,1-1H7a1,1,0,0,1,0,2H1A1,1,0,0,1,0,12Zm20.886-.893A4.99,4.99,0,1,0,12,8a1,1,0,0,0,2,0,3,3,0,1,1,3,3H11a1,1,0,0,0,0,2h9a2,2,0,0,1,2,2c-.009,2.337-3.281,2.648-4.057.667a1,1,0,0,0-1.886.666C17.615,20.415,23.952,19.579,24,15A4,4,0,0,0,20.886,11.107ZM11,16H1a1,1,0,0,0,0,2H11a2,2,0,0,1,2,2c-.009,2.337-3.281,2.648-4.057.667a1,1,0,1,0-1.886.666C8.615,25.415,14.952,24.579,15,20A4,4,0,0,0,11,16ZM1,8H7a4,4,0,0,0,4-4C10.952-.581,4.613-1.414,3.057,2.667a1,1,0,0,0,1.886.666C5.72,1.351,8.991,1.663,9,4A2,2,0,0,1,7,6H1A1,1,0,0,0,1,8Z"></path></svg>
                        
                            </div>
                        </div>
                        <div class="each-item-menu">
                            <div class="svg-tick">
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
                            </div>
                            <div>
                                <span>Precipitation</span>
                                <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">

                                    <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)">
                                    <path d="M2413 4898 c-779 -1184 -1258 -2187 -1394 -2918 -26 -137 -36 -428
                                    -20 -553 84 -631 499 -1151 1076 -1345 434 -147 924 -86 1305 159 472 305 750
                                    820 751 1387 0 180 -20 332 -66 522 -147 597 -468 1299 -995 2175 -196 325
                                    -495 785 -511 785 -3 0 -70 -96 -146 -212z"></path>
                                    </g>
                                    </svg>
                            </div>
                        </div>
                        <div class="each-item-menu">
                            <div class="svg-tick"></div>
                            <div>
                                <span>Feels Like</span>
                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M416 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm0 128A96 96 0 1 0 416 0a96 96 0 1 0 0 192zM96 112c0-26.5 21.5-48 48-48s48 21.5 48 48V276.5c0 17.3 7.1 31.9 15.3 42.5C217.8 332.6 224 349.5 224 368c0 44.2-35.8 80-80 80s-80-35.8-80-80c0-18.5 6.2-35.4 16.7-48.9C88.9 308.4 96 293.8 96 276.5V112zM144 0C82.1 0 32 50.2 32 112V276.5c0 .1-.1 .3-.2 .6c-.2 .6-.8 1.6-1.7 2.8C11.2 304.2 0 334.8 0 368c0 79.5 64.5 144 144 144s144-64.5 144-144c0-33.2-11.2-63.8-30.1-88.1c-.9-1.2-1.5-2.2-1.7-2.8c-.1-.3-.2-.5-.2-.6V112C256 50.2 205.9 0 144 0zm0 416c26.5 0 48-21.5 48-48c0-20.9-13.4-38.7-32-45.3V112c0-8.8-7.2-16-16-16s-16 7.2-16 16V322.7c-18.6 6.6-32 24.4-32 45.3c0 26.5 21.5 48 48 48z"></path></svg>
                        
                            </div>
                        </div>
                        <div class="each-item-menu">
                            <div class="svg-tick"></div>
                            
                            <div>
                                <span>Humidity</span>
                                <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
                        
                                    <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)">
                                    <path d="M1866 4785 c-22 -7 -49 -24 -62 -37 -39 -40 -329 -452 -499 -708
                                    -524 -791 -834 -1397 -948 -1850 -28 -113 -31 -140 -32 -285 0 -184 17 -297
                                    72 -470 91 -287 267 -550 492 -737 218 -181 456 -294 736 -350 148 -30 422
                                    -32 570 -4 199 36 431 126 582 225 77 50 108 102 100 169 -9 81 -77 142 -157
                                    142 -35 0 -60 -8 -106 -36 -234 -142 -431 -199 -694 -199 -172 0 -243 11 -396
                                    60 -201 66 -348 157 -505 314 -110 110 -181 206 -241 326 -118 234 -164 517
                                    -119 731 80 384 395 1001 916 1789 196 295 333 490 345 490 19 0 401 -565 595
                                    -880 317 -515 557 -998 633 -1273 19 -66 19 -72 4 -72 -33 0 -118 48 -177 99
                                    -83 72 -219 138 -325 157 -202 38 -404 -18 -565 -156 -78 -68 -146 -99 -238
                                    -109 -41 -5 -88 -16 -104 -26 -97 -57 -103 -201 -11 -267 47 -33 141 -36 249
                                    -9 109 27 193 71 281 144 104 88 163 112 268 112 104 -1 163 -25 260 -109 161
                                    -138 378 -194 585 -151 94 20 214 81 305 156 105 86 144 102 255 103 79 1 97
                                    -2 145 -26 31 -15 85 -53 120 -83 80 -70 201 -130 300 -151 188 -39 295 13
                                    295 144 0 101 -53 148 -182 163 -95 10 -142 32 -233 109 -126 107 -292 170
                                    -445 170 -133 0 -294 -54 -398 -133 -26 -21 -51 -37 -55 -37 -4 0 -18 35 -31
                                    78 -90 311 -364 856 -698 1391 -194 311 -635 957 -712 1045 -39 45 -116 63
                                    -175 41z"></path>
                                    <path d="M4025 4625 c-50 -18 -76 -48 -214 -244 -200 -285 -345 -546 -413
                                    -742 -30 -86 -32 -104 -32 -214 1 -100 5 -132 26 -197 39 -119 92 -204 182
                                    -294 90 -90 175 -143 294 -182 67 -22 94 -26 212 -26 118 0 145 4 212 26 119
                                    39 204 92 294 182 90 90 143 175 182 294 21 65 25 96 26 197 0 131 -13 183
                                    -89 357 -105 238 -466 792 -542 832 -45 23 -94 27 -138 11z m152 -562 c155
                                    -239 246 -409 283 -532 30 -97 23 -170 -25 -267 -42 -86 -102 -144 -193 -187
                                    -61 -29 -76 -32 -162 -32 -86 0 -101 3 -162 32 -91 43 -151 101 -193 187 -48
                                    97 -55 170 -25 267 22 75 82 202 153 324 63 109 218 345 227 345 4 0 48 -62
                                    97 -137z"></path>
                                    <path d="M2380 1725 c-91 -21 -212 -83 -300 -156 -92 -76 -139 -98 -233 -108
                                    -89 -10 -128 -29 -158 -78 -69 -111 14 -243 153 -243 140 1 288 58 418 164
                                    119 96 154 111 265 111 107 0 170 -24 252 -97 258 -230 635 -235 893 -12 99
                                    86 155 109 265 109 110 0 166 -23 265 -109 122 -106 298 -172 437 -164 43 3
                                    71 10 90 24 93 70 96 192 7 261 -26 19 -52 27 -114 34 -97 11 -149 35 -245
                                    114 -277 228 -645 217 -910 -26 -16 -15 -55 -40 -85 -56 -48 -24 -67 -27 -145
                                    -28 -107 0 -166 23 -255 99 -132 114 -264 166 -430 172 -68 2 -128 -2 -170
                                    -11z"></path>
                                    </g>
                                    </svg>
                            </div>
                        </div>
                        <div class="each-item-menu">
                            <div class="svg-tick"></div>
                            <div>
                                <span>Visibility</span>
                                <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24"><path d="M23.271,9.419C21.72,6.893,18.192,2.655,12,2.655S2.28,6.893.729,9.419a4.908,4.908,0,0,0,0,5.162C2.28,17.107,5.808,21.345,12,21.345s9.72-4.238,11.271-6.764A4.908,4.908,0,0,0,23.271,9.419Zm-1.705,4.115C20.234,15.7,17.219,19.345,12,19.345S3.766,15.7,2.434,13.534a2.918,2.918,0,0,1,0-3.068C3.766,8.3,6.781,4.655,12,4.655s8.234,3.641,9.566,5.811A2.918,2.918,0,0,1,21.566,13.534Z"></path><path d="M12,7a5,5,0,1,0,5,5A5.006,5.006,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z"></path></svg>
                        
                            </div>
                        </div>
                        <div class="each-item-menu">
                            <div class="svg-tick"></div>
                            
                            <div>
                                <span>Pressure</span>
                                <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
                        
                                    <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)">
                                <path d="M2300 4656 c-386 -53 -721 -190 -1022 -417 -107 -80 -317 -290 -397
                                -397 -703 -931 -529 -2240 392 -2954 366 -283 822 -438 1287 -438 809 1 1539
                                457 1896 1186 350 714 266 1566 -217 2206 -80 107 -290 317 -397 397 -278 210
                                -596 347 -946 407 -124 21 -471 27 -596 10z m100 -445 c0 -144 7 -171 53 -219
                                75 -77 199 -57 246 42 18 36 21 61 21 174 l0 132 28 0 c56 0 219 -33 330 -66
                                202 -61 389 -155 560 -281 l74 -54 -105 -108 c-83 -85 -107 -116 -112 -145
                                -28 -148 127 -250 256 -167 24 16 78 63 119 106 l75 77 28 -34 c54 -63 149
                                -213 199 -312 83 -165 154 -404 174 -583 l7 -63 -150 0 c-139 0 -152 -2 -184
                                -23 -109 -73 -105 -212 7 -267 34 -17 61 -20 183 -20 l144 0 -7 -52 c-23 -173
                                -82 -384 -146 -521 l-32 -67 -1610 2 -1609 3 -34 75 c-65 148 -120 347 -141
                                508 l-7 52 134 0 c112 0 139 3 173 20 117 57 123 215 11 277 -36 20 -54 23
                                -179 23 l-139 0 7 63 c32 285 162 607 349 860 l50 68 96 -94 c107 -105 142
                                -127 201 -127 107 0 183 105 149 207 -8 25 -45 72 -111 139 l-100 102 59 44
                                c128 99 282 186 436 247 130 52 364 108 460 110 l37 1 0 -129z m1522 -2808
                                c-51 -61 -192 -197 -257 -250 -135 -109 -347 -226 -521 -286 -209 -73 -411
                                -102 -648 -94 -342 11 -638 107 -932 302 -110 73 -281 226 -365 326 l-41 49
                                1402 0 1402 0 -40 -47z"></path>
                                <path d="M2505 3609 c-44 -12 -78 -54 -115 -139 -18 -41 -89 -196 -157 -345
                                -170 -368 -177 -390 -178 -540 0 -118 1 -121 37 -199 49 -101 148 -203 240
                                -246 252 -118 552 -18 680 227 45 85 63 171 55 267 -8 91 -35 166 -149 421
                                -50 110 -117 261 -151 335 -74 165 -89 187 -141 211 -44 20 -74 22 -121 8z
                                m110 -641 c91 -193 135 -310 135 -361 0 -77 -48 -152 -113 -176 -69 -26 -174
                                -4 -219 46 -45 50 -60 137 -34 209 24 70 168 384 176 384 4 0 29 -46 55 -102z"></path>
                                </g>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="canvas-holder">
                    <div class="container-for-values" style="width: 426px; gap: 19px;">
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                    </div>
                    <canvas id="canvas" height="340" style="display: block; box-sizing: border-box; height: 272px; width: 476px;" width="595"></canvas>
                </div>
                `
                WHLE_ELMNT.appendChild(index)
                extraText.innerHTML = `
                <span class="timeFORWIND">Daily Summary</span>
                <span class="textForRAIN">${rainFunction()}</span>
                `
                WHLE_ELMNT.appendChild(extraText)
                continue
            }
            //console.log(daysShort, weatherData.forecast.forecastday[i].day.uv)
            const day = document.createElement("div")
            day.classList.add("forecast-each-day")
            day.innerHTML = `
            <span>${daysShort}</span>
            <span class="numbers">${numbersDays}</span>
            `
            wrapper.appendChild(day)
            
        }   
        
    }
    const eventFunctionRAIN = () =>{
        const elements = document.querySelectorAll(".numbers")
        const fullDate = document.querySelector(".datepicked")
        const index = document.querySelector(".index span")
        const determiner = document.querySelector(".determiner")
        const totalRain = document.querySelector(".rain-total")
        const textForRAIN = document.querySelector(".textForRAIN")
        
        //console.log(windSpeeds())

        for(let i = 0; i < elements.length; i++){
            

            let days = new Date(weatherData.forecast.forecastday[i].date)
                let fullDay = days.toLocaleDateString("default", {weekday: "long", day: "2-digit", month: "long", "year": "numeric"})
                elements[i].addEventListener("click", ()=>{
                elements.forEach(element =>{
                    element.classList.remove("active")
                })

                elements[0].addEventListener("click", ()=>{
                    mainFunctionRAIN()
                })
                let weekday = days.toLocaleDateString("default", {weekday: "long"})

                const rainFunction = () =>{
                    if(Math.round(weatherData.forecast.forecastday[i].day.totalprecip_mm) <= 0 && Math.round(weatherData.forecast.forecastday[i].day.totalsnow_cm) <= 0){
                        return 'No precipitation expected.'
                    }else if(Math.round(weatherData.forecast.forecastday[i].day.totalprecip_mm) > 0 && Math.round(weatherData.forecast.forecastday[i].day.totalsnow_cm) <= 0){
                        return `A total of ${Math.round(weatherData.forecast.forecastday[i].day.totalprecip_mm)} mm of rainfall expected on ${weekday}.`
                    }else if(Math.round(weatherData.forecast.forecastday[i].day.totalprecip_mm) > 0 && Math.round(weatherData.forecast.forecastday[i].day.totalsnow_cm) > 0){
                        return `A total of ${Math.round(weatherData.forecast.forecastday[i].day.totalprecip_mm)} mm of rainfall, as well as ${Math.round(weatherData.forecast.forecastday[i].day.totalsnow_cm)} cm of snowfall, expected on ${weekday}.`
                    }else if(Math.round(weatherData.forecast.forecastday[i].day.totalprecip_mm) <= 0 && Math.round(weatherData.forecast.forecastday[i].day.totalsnow_cm) > 0){
                        return `A total of ${Math.round(weatherData.forecast.forecastday[i].day.totalsnow_cm)} cm of snowfall expected on ${weekday}.`
                    }
                }
                
                
                totalRain.textContent = "Total for the day"
                determiner.textContent = "mm"
                index.textContent = Math.round(weatherData.forecast.forecastday[i].day.totalprecip_mm)
                fullDate.textContent = fullDay
                elements[i].classList.add("active")
                textForRAIN.textContent = rainFunction()
                
                const CANVAS_ELEMENT = document.querySelector(".canvas-holder")
                CANVAS_ELEMENT.innerHTML = `
                <div class="container-for-values" style="width: 426px; gap: 19px;">
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                </div>
                <canvas id="canvas" height="340" style="display: block; box-sizing: border-box; height: 272px; width: 476px;" width="595"></canvas>
                `
                const rainChartFunction = () =>{ 
                    const hoursArray = []
            
                    for(let i = 0; i < 24; i++){
                        hoursArray.push(i)
                    }
            
                    //the index at which the change will occur
                    let labelToChange = new Date(weatherData.current.last_updated).getHours()
            
                    const precipData = () =>{
                        const rainArray = []
            
                        for(let d = 0; d < weatherData.forecast.forecastday[i].hour.length; d++){
                            rainArray.push(Math.round(weatherData.forecast.forecastday[i].hour[d].precip_mm))
            
                        }
            
                        return rainArray
                    }
                    //console.log(weatherData.forecast.forecastday[9].hour[7])
                    let ctx = document.querySelector("#canvas").getContext("2d")
                    const gradient = window['chartjs-plugin-gradient'];
            
                    const container = document.querySelector(".container-for-values")
                    container.style.width = `413.6px`
                    container.style.padding = `5px`
            
                    const all = document.querySelectorAll(".value-hrs")

                    const canvasElement = document.querySelector(".canvas-holder")
                    const invisibleOverlay = document.createElement("div")
                    invisibleOverlay.classList.add("blank-overlay")
                    canvasElement.appendChild(invisibleOverlay)

                    const weatherIconValues = (arg) =>{
                        const weatherCondition = weatherData.forecast.forecastday[i].hour[arg].condition.text
                        
                
                        if(weatherData.forecast.forecastday[i].hour[arg].is_day){
                            if(weatherCondition == 'Mist'){
                                //console.log("Mist Day")
                                return '<img src="fog.png">'
                            } else if (weatherCondition == 'Sunny'){
                                //console.log("Sunny Day")
                                return '<img src="sunny.png">'
                            }else if((weatherCondition == 'Partly cloudy')) {
                                //console.log("Partly Cloudy Day")
                                return '<img src="cloud-sun-off.png">'
                            } else if((weatherCondition == 'Cloudy') || (weatherCondition == 'Overcast')) {
                                //console.log("Overcast or cloudy Day")
                                return '<img src="cloud-removebg-preview.png">'
                            } else if ((weatherCondition == 'Heavy rain')){
                                //console.log("Heavy Rain Day")
                                return '<img src="rain.png">'
                            } else if ((weatherCondition == 'Moderate rain')){
                                //console.log("Moderate Rain Day")
                                return '<img src="rain.png">'
                            } else if ((weatherCondition == 'Fog' || weatherCondition.includes("fog"))){
                                //console.log("Fog Day")
                                return '<img src="fog.png">'
                            } else if((weatherCondition == 'Patchy rain possible' || weatherCondition == 'Light drizzle' || weatherCondition == 'Light rain shower')){
                                return '<img src="rain.png">'
                            } else if (weatherCondition == 'Patchy light rain' || weatherCondition == 'Light rain' || weatherCondition == 'Moderate or heavy rain shower' || weatherCondition== 'Moderate rain at times' || weatherCondition == 'Patchy light drizzle' || weatherCondition == 'Light freezing rain'){
                                return '<img src="rain.png">'
                            } else if(weatherCondition == 'Thundery outbreaks possible' || weatherCondition == 'Patchy light rain with thunder' || weatherCondition == 'Moderate or heavy rain with thunder') {
                                return '<img src="thunder.png">'
                            } else if(weatherCondition.includes("snow")){
                                return '<img src="snowflake.png">'
                            }else if(weatherCondition == "Light freezing rain"){
                                return '<img src="rain.png">'
                            }else if(weatherCondition == "Blizzard"){
                                return '<img src="snowflake.png">'
                            }else{
                                console.log((weatherCondition))
                                return 'CONDITION NOT DEFINED'
                            }
                        }else {
                            
                            if(weatherCondition == 'Mist'){
                                //console.log("Mist Night")
                                return '<img src="fog.png">'
                            } else if (weatherCondition == 'Clear'){
                                //console.log("Clear Night")
                                return '<img src="moon.png">'
                            }else if((weatherCondition == 'Partly cloudy')) {
                                //console.log("Partly Cloudy Night")
                                return '<img src="cloud-moon.png">'
                            } else if((weatherCondition == 'Cloudy') || (weatherCondition == 'Overcast')) {
                                //console.log("Overcast or Cloudy Night")
                                return '<img src="cloud-removebg-preview.png">'
                            } else if ((weatherCondition == 'Heavy rain')){
                                //console.log("Heavy Rain Night")
                                return '<img src="moon rain.png">'
                            } else if ((weatherCondition == 'Moderate rain')){
                                //console.log("Moderate Rain Night")
                                return '<img src="moon rain.png">'
                            } else if ((weatherCondition == 'Fog' || weatherCondition == 'Freezing fog')){
                                //console.log("Fog Night")
                                return '<img src="fog.png">'
                            } else if((weatherCondition == 'Patchy rain possible' || weatherCondition == 'Light drizzle' || weatherCondition == 'Light rain shower')){
                                return '<img src="moon rain.png">'
                            } else if (weatherCondition == 'Patchy light rain' || weatherCondition == 'Light rain' || weatherCondition == 'Moderate or heavy rain shower' || weatherCondition == 'Moderate rain at times' || weatherCondition == 'Patchy light drizzle' || weatherCondition == 'Light freezing rain'){
                                return '<img src="moon rain.png">'
                            } else if(weatherCondition == 'Thundery outbreaks possible' || weatherCondition == 'Patchy light rain with thunder' || weatherCondition == 'Moderate or heavy rain with thunder') {
                                return '<img src="thunder night.png">'
                            } else if(weatherCondition.includes("snow")){
                                return '<img src="snowflake.png">'
                            }else if(weatherCondition == "Light freezing rain"){
                                return '<img src="rain.png">'
                            }else if(weatherCondition == "Blizzard"){
                                return '<img src="snowflake.png">'
                            }else{
                                console.log((weatherCondition))
                                return 'CONDITION NOT DEFINED'
                            }
                            
                        }
                    }
                    
                    all[0].innerHTML = `${weatherIconValues(0)}`
                    all[1].innerHTML = `${weatherIconValues(2)}`
                    all[2].innerHTML = `${weatherIconValues(4)}`
                    all[3].innerHTML = `${weatherIconValues(6)}`
                    all[4].innerHTML = `${weatherIconValues(8)}`
                    all[5].innerHTML = `${weatherIconValues(10)}`
                    all[6].innerHTML = `${weatherIconValues(12)}`
                    all[7].innerHTML = `${weatherIconValues(14)}`
                    all[8].innerHTML = `${weatherIconValues(16)}`
                    all[9].innerHTML = `${weatherIconValues(18)}`
                    all[10].innerHTML = `${weatherIconValues(20)}`
                    all[11].innerHTML = `${weatherIconValues(22)}`
                    
                    
                    //data block
                    const chartData = {
                        labels: hoursArray,
                        datasets: [{
                            label: "",
                            data: precipData(),
                            segment: {
                                borderDash: ctx => dash(ctx),
                            },
                            gradient: {
                                backgroundColor: {
                                  axis: 'y',
                                  colors: {
                        
                                    
                                  }
                                },
                                borderColor: {
                                    axis: "y",
                                    colors: {
                                        
                                    }
                                }
                            },
                            borderRadius: 4,
                            borderWidth: 0,
                            borderColor: "#36C8EB",
                            pointBackgroundColor: "transparent",
                            pointBorderColor: "transparent",
                            borderCapStyle: 'round',
                            clip: {
                                left: false,
                                right: false,
                                top: false,
                                bottom: false
                            },
                            tension: 0.2,
                            fill: "stack",
                            backgroundColor: "#36C8EB" 
                        }]
                    }
                
                    const plugin = {
                        id: 'customCanvasBackgroundColor',
                        beforeDraw: (chart, args, options) => {
                        const {ctx} = chart;
                        ctx.save();
                        ctx.globalCompositeOperation = 'destination-over';
                        ctx.fillStyle = options.color
                        ctx.fillRect(0, 0, chart.width, chart.height);
                        ctx.restore();
                        
                        }
                    };
                
                    
                
                    //config block
                    const config = {
                        type: "bar",
                        data: chartData,  
                        options: {
                            aspectRatio: 7/4,
                            responsive: true,
                            scales: {
                                y: {
                                
                                    beginAtZero: true,
                                    suggestedMax: 10,
                                    grid: {
                                        drawTicks: false,
                                        display: true,
                                        drawOnChartArea: true,
                                        color: "#302F32"
                                    },
                                    border: {
                                        display: true,
                                        color: "#302F32"
                                    },
                                    ticks: {
                                        color: "#9D9D9E",
                                        maxTicksLimit: 6,
                                        padding: 15,
                                        align: "center",
                                        crossAlign: "center", 
                                        font: {
                                            size: 13,
                                            weight: 400
                                        },
                                        callback: function(value){
                                            if(value == 0){
                                                return `${value} mm`
                                            }
                                            return value
                                        }
                                    },
                                    position: "right"
                                },
                
                                x: {
                                    border: {
                                        display: false,
                                        dash: [3, 2]
                                    },
                                    grid: {
                                        display: true,
                                        drawOnChartArea: true,
                                        drawTicks: false,
                                        //color: "#302F32",
                                        color: function(context){
                                            let index = context.index
            
                                            if(index == 6 || index == 12 || index == 18){
                                                return "#302F32"
                                            }
                                        }
                                    },
                
                                    ticks: {
                                        //color: "#9D9D9E",
                                        maxTicksLimit: 24,
                                        padding: 5,
                                        align: "center",
                                        crossAlign: "near",
                                        font: {
                                            size: 15,
                                            weight: 400
                                        },
                                        color: function(context){
                                            let index = context.index
                                            
                                            if(index == 0 || index == 6 || index == 12 || index == 18 ){
                                                return "#9D9D9E"
                                            }
                                            return "transparent"
                                        },
                                        minRotation: 360
                                    }
                                },
                
                                
                            },
                            plugins: {
                                customCanvasBackgroundColor: {
                                    color: "#202023"
                                },
                                legend: {
                                    display: false
                                },
                            },
                            
                            
                                
                            
                            
                        },
                        plugins: [plugin, gradient]
                    }
                
                    const rainFallSnowChart = new Chart(ctx, config)
            
                }
                rainChartFunction()
            })
        }
    }

    const mainFunctionRAIN = () =>{
        createElementRAIN()
        eventFunctionRAIN()

        //RAIN CHART HERE
        const rainChartFunction = () =>{ 
            const hoursArray = []
    
            for(let i = 0; i < 24; i++){
                hoursArray.push(i)
            }
    
            //the index at which the change will occur
            let labelToChange = new Date(weatherData.current.last_updated).getHours()
    
            const precipData = () =>{
                const rainArray = []
    
                for(let i = 0; i < weatherData.forecast.forecastday[0].hour.length; i++){
                    rainArray.push(Math.round(weatherData.forecast.forecastday[0].hour[i].precip_mm))
    
                }
    
                return rainArray
            }
            //console.log(weatherData.forecast.forecastday[9].hour[7])
            let ctx = document.querySelector("#canvas").getContext("2d")
            const gradient = window['chartjs-plugin-gradient'];
    
            const container = document.querySelector(".container-for-values")
            container.style.width = `413.6px`
            container.style.padding = `5px`
    
            const all = document.querySelectorAll(".value-hrs")

            const canvasElement = document.querySelector(".canvas-holder")
            const chartOverlay = document.createElement("div")
            chartOverlay.classList.add("time-passed-overlay")

            const lineDivider = document.createElement("div")
            lineDivider.classList.add("line-divider")
            chartOverlay.appendChild(lineDivider)

            
            const invisibleOverlay = document.createElement("div")
            invisibleOverlay.classList.add("blank-overlay")
            canvasElement.appendChild(invisibleOverlay)
            
            canvasElement.appendChild(chartOverlay)
            const overlayStyle = () =>{
                if(labelToChange == 0){
                    chartOverlay.style.width = `5px`
                    
                }else if(labelToChange == 1){
                    chartOverlay.style.width = `21px`
                    
                }else if(labelToChange == 2){
                    chartOverlay.style.width = `38px`
                    
                }else if(labelToChange == 3){
                    chartOverlay.style.width = `55px`
                    
                }else if(labelToChange == 4){
                    chartOverlay.style.width = `72px`
                    
                }else if(labelToChange == 5){
                    chartOverlay.style.width = `89.5px`
                    
                }else if(labelToChange == 6){
                    chartOverlay.style.width = `106px`
                    
                }else if(labelToChange == 7){
                    chartOverlay.style.width = `123px`
                    
                }else if(labelToChange == 8){
                    chartOverlay.style.width = `140px`
                    
                }else if(labelToChange == 9){

                    chartOverlay.style.width = `157.5px`
                    
                }else if(labelToChange == 10){
                    chartOverlay.style.width = `174px`
                    
                }else if(labelToChange == 11){
                    chartOverlay.style.width = `191px`
                    
                }else if(labelToChange == 12){
                    chartOverlay.style.width = `208px`
                    
                }else if(labelToChange == 13){
                    chartOverlay.style.width = `225px`
                    
                }else if(labelToChange == 14){
                    chartOverlay.style.width = `242.5px`
                    
                }else if(labelToChange == 15){
                    chartOverlay.style.width = `259.5px`
                    
                }else if(labelToChange == 16){
                    chartOverlay.style.width = `276.5px`
                    
                }else if(labelToChange == 17){
                    chartOverlay.style.width = `293.5px`
                    
                }else if(labelToChange == 18){
                    chartOverlay.style.width = `310px`
                    
                }else if(labelToChange == 19){
                    chartOverlay.style.width = `327.5px`
                    
                }else if(labelToChange == 20){
                    chartOverlay.style.width = `345px`
                    
                }else if(labelToChange == 21){
                    chartOverlay.style.width = `361.5px`
                    
                }else if(labelToChange == 22){
                    chartOverlay.style.width = `378.5px`
                    
                }else if(labelToChange == 23){
                    chartOverlay.style.width = `396px`
                    
                }

                lineDivider.style.left = chartOverlay.style.width 
            }
            overlayStyle()

            const weatherIconValues = (arg) =>{
                const weatherCondition = weatherData.forecast.forecastday[0].hour[arg].condition.text
                
        
                if(weatherData.forecast.forecastday[0].hour[arg].is_day){
                    if(weatherCondition == 'Mist'){
                        //console.log("Mist Day")
                        return '<img src="fog.png">'
                    } else if (weatherCondition == 'Sunny'){
                        //console.log("Sunny Day")
                        return '<img src="sunny.png">'
                    }else if((weatherCondition == 'Partly cloudy')) {
                        //console.log("Partly Cloudy Day")
                        return '<img src="cloud-sun-off.png">'
                    } else if((weatherCondition == 'Cloudy') || (weatherCondition == 'Overcast')) {
                        //console.log("Overcast or cloudy Day")
                        return '<img src="cloud-removebg-preview.png">'
                    } else if ((weatherCondition == 'Heavy rain')){
                        //console.log("Heavy Rain Day")
                        return '<img src="rain.png">'
                    } else if ((weatherCondition == 'Moderate rain')){
                        //console.log("Moderate Rain Day")
                        return '<img src="rain.png">'
                    } else if ((weatherCondition == 'Fog' || weatherCondition.includes("fog"))){
                        //console.log("Fog Day")
                        return '<img src="fog.png">'
                    } else if((weatherCondition == 'Patchy rain possible' || weatherCondition == 'Light drizzle' || weatherCondition == 'Light rain shower')){
                        return '<img src="rain.png">'
                    } else if (weatherCondition == 'Patchy light rain' || weatherCondition == 'Light rain' || weatherCondition == 'Moderate or heavy rain shower' || weatherCondition== 'Moderate rain at times' || weatherCondition == 'Patchy light drizzle' || weatherCondition == 'Light freezing rain'){
                        return '<img src="rain.png">'
                    } else if(weatherCondition == 'Thundery outbreaks possible' || weatherCondition == 'Patchy light rain with thunder' || weatherCondition == 'Moderate or heavy rain with thunder') {
                        return '<img src="thunder.png">'
                    } else if(weatherCondition.includes("snow")){
                        return '<img src="snowflake.png">'
                    }else if(weatherCondition == "Light freezing rain"){
                        return '<img src="rain.png">'
                    }else if(weatherCondition == "Blizzard"){
                        return '<img src="snowflake.png">'
                    }else{
                        console.log((weatherCondition))
                        return 'CONDITION NOT DEFINED'
                    }
                }else {
                    
                    if(weatherCondition == 'Mist'){
                        //console.log("Mist Night")
                        return '<img src="fog.png">'
                    } else if (weatherCondition == 'Clear'){
                        //console.log("Clear Night")
                        return '<img src="moon.png">'
                    }else if((weatherCondition == 'Partly cloudy')) {
                        //console.log("Partly Cloudy Night")
                        return '<img src="cloud-moon.png">'
                    } else if((weatherCondition == 'Cloudy') || (weatherCondition == 'Overcast')) {
                        //console.log("Overcast or Cloudy Night")
                        return '<img src="cloud-removebg-preview.png">'
                    } else if ((weatherCondition == 'Heavy rain')){
                        //console.log("Heavy Rain Night")
                        return '<img src="moon rain.png">'
                    } else if ((weatherCondition == 'Moderate rain')){
                        //console.log("Moderate Rain Night")
                        return '<img src="moon rain.png">'
                    } else if ((weatherCondition == 'Fog' || weatherCondition == 'Freezing fog')){
                        //console.log("Fog Night")
                        return '<img src="fog.png">'
                    } else if((weatherCondition == 'Patchy rain possible' || weatherCondition == 'Light drizzle' || weatherCondition == 'Light rain shower')){
                        return '<img src="moon rain.png">'
                    } else if (weatherCondition == 'Patchy light rain' || weatherCondition == 'Light rain' || weatherCondition == 'Moderate or heavy rain shower' || weatherCondition == 'Moderate rain at times' || weatherCondition == 'Patchy light drizzle' || weatherCondition == 'Light freezing rain'){
                        return '<img src="moon rain.png">'
                    } else if(weatherCondition == 'Thundery outbreaks possible' || weatherCondition == 'Patchy light rain with thunder' || weatherCondition == 'Moderate or heavy rain with thunder') {
                        return '<img src="thunder night.png">'
                    } else if(weatherCondition.includes("snow")){
                        return '<img src="snowflake.png">'
                    }else if(weatherCondition == "Light freezing rain"){
                        return '<img src="rain.png">'
                    }else if(weatherCondition == "Blizzard"){
                        return '<img src="snowflake.png">'
                    }else{
                        console.log((weatherCondition))
                        return 'CONDITION NOT DEFINED'
                    }
                    
                }
            }
            
            all[0].innerHTML = `${weatherIconValues(0)}`
            all[1].innerHTML = `${weatherIconValues(2)}`
            all[2].innerHTML = `${weatherIconValues(4)}`
            all[3].innerHTML = `${weatherIconValues(6)}`
            all[4].innerHTML = `${weatherIconValues(8)}`
            all[5].innerHTML = `${weatherIconValues(10)}`
            all[6].innerHTML = `${weatherIconValues(12)}`
            all[7].innerHTML = `${weatherIconValues(14)}`
            all[8].innerHTML = `${weatherIconValues(16)}`
            all[9].innerHTML = `${weatherIconValues(18)}`
            all[10].innerHTML = `${weatherIconValues(20)}`
            all[11].innerHTML = `${weatherIconValues(22)}`
            
            //data block
            const chartData = {
                labels: hoursArray,
                datasets: [{
                    label: "",
                    data: precipData(),
                    segment: {
                        borderDash: ctx => dash(ctx),
                    },
                    gradient: {
                        backgroundColor: {
                          axis: 'y',
                          colors: {
                
                            
                          }
                        },
                        borderColor: {
                            axis: "y",
                            colors: {
                                
                            }
                        }
                    },
                    borderRadius: 4,
                    borderWidth: 0,
                    borderColor: "#36C8EB",
                    pointBackgroundColor: "transparent",
                    pointBorderColor: "transparent",
                    borderCapStyle: 'round',
                    clip: {
                        left: false,
                        right: false,
                        top: false,
                        bottom: false
                    },
                    tension: 0.2,
                    fill: "stack",
                    backgroundColor: "#36C8EB" 
                }]
            }
        
            const plugin = {
                id: 'customCanvasBackgroundColor',
                beforeDraw: (chart, args, options) => {
                const {ctx} = chart;
                ctx.save();
                ctx.globalCompositeOperation = 'destination-over';
                ctx.fillStyle = options.color
                ctx.fillRect(0, 0, chart.width, chart.height);
                ctx.restore();
                
                }
            };
        
            
        
            //config block
            const config = {
                type: "bar",
                data: chartData,  
                options: {
                    aspectRatio: 7/4,
                    responsive: true,
                    scales: {
                        y: {
                        
                            beginAtZero: true,
                            suggestedMax: 10,
                            grid: {
                                drawTicks: false,
                                display: true,
                                drawOnChartArea: true,
                                color: "#302F32"
                            },
                            border: {
                                display: true,
                                color: "#302F32"
                            },
                            ticks: {
                                color: "#9D9D9E",
                                maxTicksLimit: 6,
                                padding: 15,
                                align: "center",
                                crossAlign: "center", 
                                font: {
                                    size: 13,
                                    weight: 400
                                },
                                callback: function(value){
                                    if(value == 0){
                                        return `${value} mm`
                                    }
                                    return value
                                }
                            },
                            position: "right"
                        },
        
                        x: {
                            border: {
                                display: false,
                                dash: [3, 2]
                            },
                            grid: {
                                display: true,
                                drawOnChartArea: true,
                                drawTicks: false,
                                //color: "#302F32",
                                color: function(context){
                                    let index = context.index
    
                                    if(index == 6 || index == 12 || index == 18){
                                        return "#302F32"
                                    }
                                }
                            },
        
                            ticks: {
                                //color: "#9D9D9E",
                                maxTicksLimit: 24,
                                padding: 5,
                                align: "center",
                                crossAlign: "near",
                                font: {
                                    size: 15,
                                    weight: 400
                                },
                                color: function(context){
                                    let index = context.index
                                    
                                    if(index == 0 || index == 6 || index == 12 || index == 18 ){
                                        return "#9D9D9E"
                                    }
                                    return "transparent"
                                },
                                minRotation: 360
                            }
                        },
        
                        
                    },
                    plugins: {
                        customCanvasBackgroundColor: {
                            color: "#202023"
                        },
                        legend: {
                            display: false
                        },
                    },
                    
                    
                        
                    
                    
                },
                plugins: [plugin, gradient]
            }
        
            const rainFallSnowChart = new Chart(ctx, config)
    
        }
        rainChartFunction()

        const wrapper = document.querySelector(".forecast-days-wrap")

        let mouseDown = false //will change if mouse is clicked

        const dragging = (e)=>{
            if(!mouseDown){ //if the mouse isnt click this will not run
                return
            }
            wrapper.style.cursor = `grabbing` //styling for the cursor
            e.preventDefault() //preventing default behaviour
            wrapper.scrollLeft -= e.movementX //the scroll movement
        }

        wrapper.addEventListener("mousedown", ()=>{
            mouseDown = true //when the mouse is down change the variable value
            wrapper.style.cursor = `grabbing`
        })
        wrapper.addEventListener("mousemove", dragging) //when the mouse moves run the function

        wrapper.addEventListener("mouseup", ()=>{
            mouseDown = false //mouse is no longer clicked
            wrapper.style.cursor = `grab`
        })
        wrapper.addEventListener("mouseleave", ()=>{
            mouseDown = false //mouse leaves the element
            wrapper.style.cursor = `grab`
        })
        const selectDropdown = document.querySelector(".select")
        const littleCaret = document.querySelector(".rotated")
        let elementActive = false 
        const menuItemspWrapper = document.querySelector(".menu-wrapper")
        const eachItemMenu = document.querySelectorAll(".each-item-menu")
        const divWithTick = document.querySelectorAll(".svg-tick")

        

        eachItemMenu[0].addEventListener("click", ()=>{
            mainFunctionForecast()
            
        })

        eachItemMenu[1].addEventListener("click", ()=>{
            mainFunction()
        
        })

        eachItemMenu[2].addEventListener("click", ()=>{
            mainFunctionFORWIND()
        
        })

        eachItemMenu[3].addEventListener("click", ()=>{
            mainFunctionRAIN()
        
        })

        eachItemMenu[4].addEventListener("click", ()=>{
            mainFunctionFEELSLIKE()
            
        })

        eachItemMenu[5].addEventListener("click", ()=>{
            mainFunctionHUMIDITY()
        
        })

        eachItemMenu[6].addEventListener("click", ()=>{
            mainFunctionVISIBILITY()
        
        })

        eachItemMenu[7].addEventListener("click", ()=>{
            mainFunctionPRESSURE()
        
        })
        
    

        const functionForDropdownActivation = (e) =>{
            if(!elementActive){
                selectDropdown.style.backgroundColor = '#515154'
                littleCaret.classList.add("true")
                menuItemspWrapper.style.display = 'block'
                menuItemspWrapper.style.height = `auto`
            }else{
                selectDropdown.style.backgroundColor = '#3A3A3D'
                littleCaret.classList.remove("true")
                menuItemspWrapper.style.display = 'none'
                menuItemspWrapper.style.height = `0`
            }

            elementActive = !elementActive
            e.stopPropagation()
        }
        
        const clickAnywhereElse = () =>{
            if(elementActive){
                selectDropdown.style.backgroundColor = '#3A3A3D'
                elementActive = false
                littleCaret.classList.remove("true")
                menuItemspWrapper.style.display = 'none'
                menuItemspWrapper.style.height = `0`
            }
        }

        selectDropdown.addEventListener("click", functionForDropdownActivation)

        document.body.addEventListener("click", clickAnywhereElse)
    }

    const divRAIN = document.querySelector(".rain")
    divRAIN.addEventListener("click", ()=>{
        mainFunctionRAIN()
        const addInfo = document.querySelector(".additional-info")
        ADVANCED_DATA_OVERLAY.style.display = 'flex'
        
        body.style.overflow = "hidden"
    })


    //FEELS LIKE
    const createElementFEELSLIKE = () =>{
        //const wrapper = document.querySelector(".forecast-days-wrap")
        //const WHLE_ELMNT = document.querySelector(".advanced-data")
        const PARENT_ELEMENT = document.querySelector(".additional-info")
        PARENT_ELEMENT.innerHTML = ` `
        const headline = document.createElement("div")
        headline.classList.add("headline")
        headline.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M416 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm0 128A96 96 0 1 0 416 0a96 96 0 1 0 0 192zM96 112c0-26.5 21.5-48 48-48s48 21.5 48 48V276.5c0 17.3 7.1 31.9 15.3 42.5C217.8 332.6 224 349.5 224 368c0 44.2-35.8 80-80 80s-80-35.8-80-80c0-18.5 6.2-35.4 16.7-48.9C88.9 308.4 96 293.8 96 276.5V112zM144 0C82.1 0 32 50.2 32 112V276.5c0 .1-.1 .3-.2 .6c-.2 .6-.8 1.6-1.7 2.8C11.2 304.2 0 334.8 0 368c0 79.5 64.5 144 144 144s144-64.5 144-144c0-33.2-11.2-63.8-30.1-88.1c-.9-1.2-1.5-2.2-1.7-2.8c-.1-.3-.2-.5-.2-.6V112C256 50.2 205.9 0 144 0zm0 416c26.5 0 48-21.5 48-48c0-20.9-13.4-38.7-32-45.3V112c0-8.8-7.2-16-16-16s-16 7.2-16 16V322.7c-18.6 6.6-32 24.4-32 45.3c0 26.5 21.5 48 48 48z"></path></svg>
        <span>Feels Like</span>
        `
        const closeX = document.createElement("div")
        closeX.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
        ` 
        headline.appendChild(closeX)
        PARENT_ELEMENT.appendChild(headline)
        

        closeX.addEventListener("click", ()=>{
            PARENT_ELEMENT.innerHTML = ``
            ADVANCED_DATA_OVERLAY.style.display = "none"
            body.style.overflow = "auto"
        })

        PARENT_ELEMENT.style.marginTop = `6.5rem`
        
        
        const WHLE_ELMNT = document.createElement("div")
        WHLE_ELMNT.classList.add("advanced-data")
        PARENT_ELEMENT.appendChild(WHLE_ELMNT)
        WHLE_ELMNT.innerHTML = ``
        const wrapper = document.createElement("div")
        wrapper.classList.add("forecast-days-wrap")
        const index = document.createElement("div")
        index.classList.add("index")
        const extraText = document.createElement("div")
        extraText.classList.add("extra-text")
        WHLE_ELMNT.appendChild(wrapper)
        const finalInfo = document.createElement("div")
        finalInfo.classList.add("final-info")
        finalInfo.innerHTML = `
        <span>About the Feels Like Temperature</span>
        <span>Feels Like conveys how warm or cold it feels and can be different from the actual temperature. The Feels Like temperature is affected by humidity and wind.</span>
        `
        
        let labelToChange = new Date(weatherData.current.last_updated).getHours()
        //console.log(labelToChange)

        const currentFeelsLikeTemp = () => {
            for(let i = 0; i < weatherData.forecast.forecastday[0].hour.length; i++){

                if(i == labelToChange){
                    return Math.round(weatherData.forecast.forecastday[0].hour[i].feelslike_c)
                }
            }
        }
        //console.log(currentFeelsLikeTemp())
        

        for(let i = 0; i < weatherData.forecast.forecastday.length; i++){
            let days = new Date(weatherData.forecast.forecastday[i].date)
            let daysShort = days.toLocaleDateString("default", {"weekday": "narrow"})
            let fullDay = days.toLocaleDateString("default", {weekday: "long", day: "2-digit", month: "long", "year": "numeric"})
            let numbersDays = days.toLocaleDateString("default", {day: "2-digit"})
            let currentHour = new Date(weatherData.current.last_updated).getHours()
            let sunsetToday = Number(weatherData.forecast.forecastday[i].astro.sunset.slice("0", "2")) + 12
            
            //temp feels like function
            const feelsLike = () =>{
                if(Math.round(weatherData.current.temp_c) == currentFeelsLikeTemp()){
                    return `The temperature currently feels like ${currentFeelsLikeTemp()}°, which is similar to the actual temperature.`
                }else if(Math.round(weatherData.current.temp_c) < currentFeelsLikeTemp()){
                    return `The temperature currently feels like ${currentFeelsLikeTemp()}°, but is actually ${Math.round(weatherData.current.temp_c)}°. Humidity is making if feel wramer.`
                }else if (Math.round(weatherData.current.temp_c) > currentFeelsLikeTemp()){
                    return `The temperature currently feels like ${currentFeelsLikeTemp()}°, but is actually ${Math.round(weatherData.current.temp_c)}°. Wind is making it feel cooler.`
                }
            }

            const daysFeelsLikeRANGES = () =>{
                let feelsLikeHigh = Math.round(weatherData.forecast.forecastday[i].hour[0].feelslike_c)
                let feelsLikeLow = Math.round(weatherData.forecast.forecastday[i].hour[0].feelslike_c)
                //console.log("------")
                for(let j = 0; j < weatherData.forecast.forecastday[i].hour.length; j++){
                    
                    if(Math.round(weatherData.forecast.forecastday[i].hour[j].feelslike_c) > feelsLikeHigh){
                        feelsLikeHigh = Math.round(weatherData.forecast.forecastday[i].hour[j].feelslike_c)
                    }

                    if(Math.round(weatherData.forecast.forecastday[i].hour[j].feelslike_c) < feelsLikeLow){
                        feelsLikeLow = Math.round(weatherData.forecast.forecastday[i].hour[j].feelslike_c)
                    }
                }

                return [feelsLikeHigh, feelsLikeLow]
            }

            //console.log(fullDay)
            if(i == 0){
                
                const day = document.createElement("div")
                day.classList.add("forecast-each-day")
                day.innerHTML = `
                <span>${daysShort}</span>
                <span class="numbers active">${numbersDays}</span>
                `
                wrapper.appendChild(day)

                //console.log(weatherData)

                const fullDate = document.createElement("div")
                fullDate.classList.add("datepicked")
                fullDate.textContent = fullDay
                WHLE_ELMNT.appendChild(fullDate)
                index.innerHTML = `
                <span>${currentFeelsLikeTemp()}°</span>
                <span class="low-temp"></span>
                <span class="actual">Actual: ${Math.round(weatherData.current.temp_c)}°</span>

                <div class="dropdown">

                    <div class="select">
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M416 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm0 128A96 96 0 1 0 416 0a96 96 0 1 0 0 192zM96 112c0-26.5 21.5-48 48-48s48 21.5 48 48V276.5c0 17.3 7.1 31.9 15.3 42.5C217.8 332.6 224 349.5 224 368c0 44.2-35.8 80-80 80s-80-35.8-80-80c0-18.5 6.2-35.4 16.7-48.9C88.9 308.4 96 293.8 96 276.5V112zM144 0C82.1 0 32 50.2 32 112V276.5c0 .1-.1 .3-.2 .6c-.2 .6-.8 1.6-1.7 2.8C11.2 304.2 0 334.8 0 368c0 79.5 64.5 144 144 144s144-64.5 144-144c0-33.2-11.2-63.8-30.1-88.1c-.9-1.2-1.5-2.2-1.7-2.8c-.1-.3-.2-.5-.2-.6V112C256 50.2 205.9 0 144 0zm0 416c26.5 0 48-21.5 48-48c0-20.9-13.4-38.7-32-45.3V112c0-8.8-7.2-16-16-16s-16 7.2-16 16V322.7c-18.6 6.6-32 24.4-32 45.3c0 26.5 21.5 48 48 48z"></path></svg>
                        <svg class="rotated " xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"/></svg>
                    </div>

                    <div class="menu-wrapper">
                        <div class="each-item-menu">
                            <div class="svg-tick">
                                
                            </div>
                            <div>
                                <span>Conditions</span>
                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M0 336c0 79.5 64.5 144 144 144H512c70.7 0 128-57.3 128-128c0-61.9-44-113.6-102.4-125.4c4.1-10.7 6.4-22.4 6.4-34.6c0-53-43-96-96-96c-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32C167.6 32 96 103.6 96 192c0 2.7 .1 5.4 .2 8.1C40.2 219.8 0 273.2 0 336z"></path></svg>
                            </div>
                        </div>
                        <div class="each-item-menu">
                            <div class="svg-tick">
                                
                            </div>
                            <div>
                                <span>UV Index</span>
                                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24"><path d="M12,17c-2.76,0-5-2.24-5-5s2.24-5,5-5,5,2.24,5,5-2.24,5-5,5Zm1-13V1c0-.55-.45-1-1-1s-1,.45-1,1v3c0,.55,.45,1,1,1s1-.45,1-1Zm0,19v-3c0-.55-.45-1-1-1s-1,.45-1,1v3c0,.55,.45,1,1,1s1-.45,1-1ZM5,12c0-.55-.45-1-1-1H1c-.55,0-1,.45-1,1s.45,1,1,1h3c.55,0,1-.45,1-1Zm19,0c0-.55-.45-1-1-1h-3c-.55,0-1,.45-1,1s.45,1,1,1h3c.55,0,1-.45,1-1ZM6.71,6.71c.39-.39,.39-1.02,0-1.41l-2-2c-.39-.39-1.02-.39-1.41,0s-.39,1.02,0,1.41l2,2c.2,.2,.45,.29,.71,.29s.51-.1,.71-.29Zm14,14c.39-.39,.39-1.02,0-1.41l-2-2c-.39-.39-1.02-.39-1.41,0s-.39,1.02,0,1.41l2,2c.2,.2,.45,.29,.71,.29s.51-.1,.71-.29Zm-16,0l2-2c.39-.39,.39-1.02,0-1.41s-1.02-.39-1.41,0l-2,2c-.39,.39-.39,1.02,0,1.41,.2,.2,.45,.29,.71,.29s.51-.1,.71-.29ZM18.71,6.71l2-2c.39-.39,.39-1.02,0-1.41s-1.02-.39-1.41,0l-2,2c-.39,.39-.39,1.02,0,1.41,.2,.2,.45,.29,.71,.29s.51-.1,.71-.29Z"></path></svg>
                            </div>
                        </div>
                        <div class="each-item-menu">
                            <div class="svg-tick"></div>
                            <div>
                                <span>Wind</span>
                                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24"><path d="M0,12a1,1,0,0,1,1-1H7a1,1,0,0,1,0,2H1A1,1,0,0,1,0,12Zm20.886-.893A4.99,4.99,0,1,0,12,8a1,1,0,0,0,2,0,3,3,0,1,1,3,3H11a1,1,0,0,0,0,2h9a2,2,0,0,1,2,2c-.009,2.337-3.281,2.648-4.057.667a1,1,0,0,0-1.886.666C17.615,20.415,23.952,19.579,24,15A4,4,0,0,0,20.886,11.107ZM11,16H1a1,1,0,0,0,0,2H11a2,2,0,0,1,2,2c-.009,2.337-3.281,2.648-4.057.667a1,1,0,1,0-1.886.666C8.615,25.415,14.952,24.579,15,20A4,4,0,0,0,11,16ZM1,8H7a4,4,0,0,0,4-4C10.952-.581,4.613-1.414,3.057,2.667a1,1,0,0,0,1.886.666C5.72,1.351,8.991,1.663,9,4A2,2,0,0,1,7,6H1A1,1,0,0,0,1,8Z"></path></svg>
                        
                            </div>
                        </div>
                        <div class="each-item-menu">
                            <div class="svg-tick"></div>
                            <div>
                                <span>Precipitation</span>
                                <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">

                                    <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)">
                                    <path d="M2413 4898 c-779 -1184 -1258 -2187 -1394 -2918 -26 -137 -36 -428
                                    -20 -553 84 -631 499 -1151 1076 -1345 434 -147 924 -86 1305 159 472 305 750
                                    820 751 1387 0 180 -20 332 -66 522 -147 597 -468 1299 -995 2175 -196 325
                                    -495 785 -511 785 -3 0 -70 -96 -146 -212z"></path>
                                    </g>
                                    </svg>
                            </div>
                        </div>
                        <div class="each-item-menu">
                            <div class="svg-tick">
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
                            </div>
                            <div>
                                <span>Feels Like</span>
                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M416 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm0 128A96 96 0 1 0 416 0a96 96 0 1 0 0 192zM96 112c0-26.5 21.5-48 48-48s48 21.5 48 48V276.5c0 17.3 7.1 31.9 15.3 42.5C217.8 332.6 224 349.5 224 368c0 44.2-35.8 80-80 80s-80-35.8-80-80c0-18.5 6.2-35.4 16.7-48.9C88.9 308.4 96 293.8 96 276.5V112zM144 0C82.1 0 32 50.2 32 112V276.5c0 .1-.1 .3-.2 .6c-.2 .6-.8 1.6-1.7 2.8C11.2 304.2 0 334.8 0 368c0 79.5 64.5 144 144 144s144-64.5 144-144c0-33.2-11.2-63.8-30.1-88.1c-.9-1.2-1.5-2.2-1.7-2.8c-.1-.3-.2-.5-.2-.6V112C256 50.2 205.9 0 144 0zm0 416c26.5 0 48-21.5 48-48c0-20.9-13.4-38.7-32-45.3V112c0-8.8-7.2-16-16-16s-16 7.2-16 16V322.7c-18.6 6.6-32 24.4-32 45.3c0 26.5 21.5 48 48 48z"></path></svg>
                        
                            </div>
                        </div>
                        <div class="each-item-menu">
                            <div class="svg-tick"></div>
                            
                            <div>
                                <span>Humidity</span>
                                <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
                        
                                    <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)">
                                    <path d="M1866 4785 c-22 -7 -49 -24 -62 -37 -39 -40 -329 -452 -499 -708
                                    -524 -791 -834 -1397 -948 -1850 -28 -113 -31 -140 -32 -285 0 -184 17 -297
                                    72 -470 91 -287 267 -550 492 -737 218 -181 456 -294 736 -350 148 -30 422
                                    -32 570 -4 199 36 431 126 582 225 77 50 108 102 100 169 -9 81 -77 142 -157
                                    142 -35 0 -60 -8 -106 -36 -234 -142 -431 -199 -694 -199 -172 0 -243 11 -396
                                    60 -201 66 -348 157 -505 314 -110 110 -181 206 -241 326 -118 234 -164 517
                                    -119 731 80 384 395 1001 916 1789 196 295 333 490 345 490 19 0 401 -565 595
                                    -880 317 -515 557 -998 633 -1273 19 -66 19 -72 4 -72 -33 0 -118 48 -177 99
                                    -83 72 -219 138 -325 157 -202 38 -404 -18 -565 -156 -78 -68 -146 -99 -238
                                    -109 -41 -5 -88 -16 -104 -26 -97 -57 -103 -201 -11 -267 47 -33 141 -36 249
                                    -9 109 27 193 71 281 144 104 88 163 112 268 112 104 -1 163 -25 260 -109 161
                                    -138 378 -194 585 -151 94 20 214 81 305 156 105 86 144 102 255 103 79 1 97
                                    -2 145 -26 31 -15 85 -53 120 -83 80 -70 201 -130 300 -151 188 -39 295 13
                                    295 144 0 101 -53 148 -182 163 -95 10 -142 32 -233 109 -126 107 -292 170
                                    -445 170 -133 0 -294 -54 -398 -133 -26 -21 -51 -37 -55 -37 -4 0 -18 35 -31
                                    78 -90 311 -364 856 -698 1391 -194 311 -635 957 -712 1045 -39 45 -116 63
                                    -175 41z"></path>
                                    <path d="M4025 4625 c-50 -18 -76 -48 -214 -244 -200 -285 -345 -546 -413
                                    -742 -30 -86 -32 -104 -32 -214 1 -100 5 -132 26 -197 39 -119 92 -204 182
                                    -294 90 -90 175 -143 294 -182 67 -22 94 -26 212 -26 118 0 145 4 212 26 119
                                    39 204 92 294 182 90 90 143 175 182 294 21 65 25 96 26 197 0 131 -13 183
                                    -89 357 -105 238 -466 792 -542 832 -45 23 -94 27 -138 11z m152 -562 c155
                                    -239 246 -409 283 -532 30 -97 23 -170 -25 -267 -42 -86 -102 -144 -193 -187
                                    -61 -29 -76 -32 -162 -32 -86 0 -101 3 -162 32 -91 43 -151 101 -193 187 -48
                                    97 -55 170 -25 267 22 75 82 202 153 324 63 109 218 345 227 345 4 0 48 -62
                                    97 -137z"></path>
                                    <path d="M2380 1725 c-91 -21 -212 -83 -300 -156 -92 -76 -139 -98 -233 -108
                                    -89 -10 -128 -29 -158 -78 -69 -111 14 -243 153 -243 140 1 288 58 418 164
                                    119 96 154 111 265 111 107 0 170 -24 252 -97 258 -230 635 -235 893 -12 99
                                    86 155 109 265 109 110 0 166 -23 265 -109 122 -106 298 -172 437 -164 43 3
                                    71 10 90 24 93 70 96 192 7 261 -26 19 -52 27 -114 34 -97 11 -149 35 -245
                                    114 -277 228 -645 217 -910 -26 -16 -15 -55 -40 -85 -56 -48 -24 -67 -27 -145
                                    -28 -107 0 -166 23 -255 99 -132 114 -264 166 -430 172 -68 2 -128 -2 -170
                                    -11z"></path>
                                    </g>
                                    </svg>
                            </div>
                        </div>
                        <div class="each-item-menu">
                            <div class="svg-tick"></div>
                            <div>
                                <span>Visibility</span>
                                <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24"><path d="M23.271,9.419C21.72,6.893,18.192,2.655,12,2.655S2.28,6.893.729,9.419a4.908,4.908,0,0,0,0,5.162C2.28,17.107,5.808,21.345,12,21.345s9.72-4.238,11.271-6.764A4.908,4.908,0,0,0,23.271,9.419Zm-1.705,4.115C20.234,15.7,17.219,19.345,12,19.345S3.766,15.7,2.434,13.534a2.918,2.918,0,0,1,0-3.068C3.766,8.3,6.781,4.655,12,4.655s8.234,3.641,9.566,5.811A2.918,2.918,0,0,1,21.566,13.534Z"></path><path d="M12,7a5,5,0,1,0,5,5A5.006,5.006,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z"></path></svg>
                        
                            </div>
                        </div>
                        <div class="each-item-menu">
                            <div class="svg-tick"></div>
                            
                            <div>
                                <span>Pressure</span>
                                <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
                        
                                    <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)">
                                <path d="M2300 4656 c-386 -53 -721 -190 -1022 -417 -107 -80 -317 -290 -397
                                -397 -703 -931 -529 -2240 392 -2954 366 -283 822 -438 1287 -438 809 1 1539
                                457 1896 1186 350 714 266 1566 -217 2206 -80 107 -290 317 -397 397 -278 210
                                -596 347 -946 407 -124 21 -471 27 -596 10z m100 -445 c0 -144 7 -171 53 -219
                                75 -77 199 -57 246 42 18 36 21 61 21 174 l0 132 28 0 c56 0 219 -33 330 -66
                                202 -61 389 -155 560 -281 l74 -54 -105 -108 c-83 -85 -107 -116 -112 -145
                                -28 -148 127 -250 256 -167 24 16 78 63 119 106 l75 77 28 -34 c54 -63 149
                                -213 199 -312 83 -165 154 -404 174 -583 l7 -63 -150 0 c-139 0 -152 -2 -184
                                -23 -109 -73 -105 -212 7 -267 34 -17 61 -20 183 -20 l144 0 -7 -52 c-23 -173
                                -82 -384 -146 -521 l-32 -67 -1610 2 -1609 3 -34 75 c-65 148 -120 347 -141
                                508 l-7 52 134 0 c112 0 139 3 173 20 117 57 123 215 11 277 -36 20 -54 23
                                -179 23 l-139 0 7 63 c32 285 162 607 349 860 l50 68 96 -94 c107 -105 142
                                -127 201 -127 107 0 183 105 149 207 -8 25 -45 72 -111 139 l-100 102 59 44
                                c128 99 282 186 436 247 130 52 364 108 460 110 l37 1 0 -129z m1522 -2808
                                c-51 -61 -192 -197 -257 -250 -135 -109 -347 -226 -521 -286 -209 -73 -411
                                -102 -648 -94 -342 11 -638 107 -932 302 -110 73 -281 226 -365 326 l-41 49
                                1402 0 1402 0 -40 -47z"></path>
                                <path d="M2505 3609 c-44 -12 -78 -54 -115 -139 -18 -41 -89 -196 -157 -345
                                -170 -368 -177 -390 -178 -540 0 -118 1 -121 37 -199 49 -101 148 -203 240
                                -246 252 -118 552 -18 680 227 45 85 63 171 55 267 -8 91 -35 166 -149 421
                                -50 110 -117 261 -151 335 -74 165 -89 187 -141 211 -44 20 -74 22 -121 8z
                                m110 -641 c91 -193 135 -310 135 -361 0 -77 -48 -152 -113 -176 -69 -26 -174
                                -4 -219 46 -45 50 -60 137 -34 209 24 70 168 384 176 384 4 0 29 -46 55 -102z"></path>
                                </g>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="canvas-holder">
                    <div class="container-for-values">
                        <div class="value-hrs">1</div>
                        <div class="value-hrs">1</div>
                        <div class="value-hrs">1</div>
                        <div class="value-hrs">1</div>
                        <div class="value-hrs">4</div>
                        <div class="value-hrs">5</div>
                        <div class="value-hrs">5</div>
                        <div class="value-hrs">6</div>
                        <div class="value-hrs">6</div>
                        <div class="value-hrs">4</div>
                        <div class="value-hrs">1</div>
                        <div class="value-hrs">1</div>
                    </div>
                    <canvas id="canvas" height="340" style="display: block; box-sizing: border-box; height: 272px; width: 476px;" width="595"></canvas>
                </div>
                `
                WHLE_ELMNT.appendChild(index)
                extraText.innerHTML = `
                <span class="timeFORWIND">Daily Summary</span>
                <span class="textForFEELSLIKE">${feelsLike()} Today's temperature range feels like ${daysFeelsLikeRANGES()[1]}° to ${daysFeelsLikeRANGES()[0]}°.</span>
                `
                WHLE_ELMNT.appendChild(extraText)
                WHLE_ELMNT.appendChild(finalInfo)
                
                continue
            }
            //console.log(daysShort, weatherData.forecast.forecastday[i].day.uv)
            const day = document.createElement("div")
            day.classList.add("forecast-each-day")
            day.innerHTML = `
            <span>${daysShort}</span>
            <span class="numbers">${numbersDays}</span>
            `
            wrapper.appendChild(day)
            
        }   
        
    }
    const eventFunctionFEELSLIKE = () =>{
        const elements = document.querySelectorAll(".numbers")
        const fullDate = document.querySelector(".datepicked")
        const index = document.querySelector(".index span")
        const actual = document.querySelector(".actual")
        const textFORFEELSLIKE = document.querySelector(".textForFEELSLIKE")
        const feelsLikeSecondForDays = document.querySelector(".low-temp")
        const INDEXDIV = document.querySelector(".index")
        //console.log(windSpeeds())

        for(let i = 0; i < elements.length; i++){
            
            const daysFeelsLikeRANGES = () =>{
                let feelsLikeHigh = Math.round(weatherData.forecast.forecastday[i].hour[0].feelslike_c)
                let feelsLikeLow = Math.round(weatherData.forecast.forecastday[i].hour[0].feelslike_c)
                //console.log("------")
                for(let j = 0; j < weatherData.forecast.forecastday[i].hour.length; j++){
                    
                    if(Math.round(weatherData.forecast.forecastday[i].hour[j].feelslike_c) > feelsLikeHigh){
                        feelsLikeHigh = Math.round(weatherData.forecast.forecastday[i].hour[j].feelslike_c)
                    }

                    if(Math.round(weatherData.forecast.forecastday[i].hour[j].feelslike_c) < feelsLikeLow){
                        feelsLikeLow = Math.round(weatherData.forecast.forecastday[i].hour[j].feelslike_c)
                    }
                }

                return [feelsLikeHigh, feelsLikeLow]
            }
            //daysFeelsLikeRANGES()

            const daysFeelsLikeRANGESText = () =>{
                if(daysFeelsLikeRANGES()[0] + daysFeelsLikeRANGES()[1] == Math.round(weatherData.forecast.forecastday[i].day.maxtemp_c) + Math.round(weatherData.forecast.forecastday[i].day.mintemp_c)){
                    return 'It will feel similar to the actual temperature.'
                }else if(daysFeelsLikeRANGES()[0] + daysFeelsLikeRANGES()[1] > Math.round(weatherData.forecast.forecastday[i].day.maxtemp_c) + Math.round(weatherData.forecast.forecastday[i].day.mintemp_c)){
                    return 'Humidity will make it feel warmer than the actual temperature.'
                }else{
                    return 'Wind will make it feel cooler than the actual temperature.'
                }
            }

            let days = new Date(weatherData.forecast.forecastday[i].date)
                let fullDay = days.toLocaleDateString("default", {weekday: "long", day: "2-digit", month: "long", "year": "numeric"})
                elements[i].addEventListener("click", ()=>{
                elements.forEach(element =>{
                    element.classList.remove("active")
                })

                elements[0].addEventListener("click", ()=>{
                    mainFunctionFEELSLIKE()
                })
                let weekday = days.toLocaleDateString("default", {weekday: "long"})

                
                
                feelsLikeSecondForDays.textContent = `${daysFeelsLikeRANGES()[1]}°`
                textFORFEELSLIKE.textContent = `On ${weekday}, the temperature range will feel like ${daysFeelsLikeRANGES()[1]}° to ${daysFeelsLikeRANGES()[0]}°. ${daysFeelsLikeRANGESText()}`
                actual.textContent = `Actual: H:${Math.round(weatherData.forecast.forecastday[i].day.maxtemp_c)}° L:${Math.round(weatherData.forecast.forecastday[i].day.mintemp_c)}°`
                index.textContent = `${daysFeelsLikeRANGES()[0]}°`
                fullDate.textContent = fullDay
                elements[i].classList.add("active")

                const CANVAS_HOLDER = document.querySelector(".canvas-holder")
                CANVAS_HOLDER.innerHTML = `
                <div class="container-for-values" style="width: 427.1px;">
                    <div class="value-hrs">1</div>
                    <div class="value-hrs">1</div>
                    <div class="value-hrs">1</div>
                    <div class="value-hrs">1</div>
                    <div class="value-hrs">4</div>
                    <div class="value-hrs">5</div>
                    <div class="value-hrs">5</div>
                    <div class="value-hrs">6</div>
                    <div class="value-hrs">6</div>
                    <div class="value-hrs">4</div>
                    <div class="value-hrs">1</div>
                    <div class="value-hrs">1</div>
                </div>
                <canvas id="canvas" height="340" style="display: block; box-sizing: border-box; height: 272px; width: 476px;" width="595"></canvas>
                `
                
                const feelsLikeChartFunction = () => {
                    const hoursArray = []
                    for(let i = 0; i < 24; i++){
                        hoursArray.push(i)
                    }
                    
            
                    //the index at which the change will occur
                    let labelToChange = new Date(weatherData.current.last_updated).getHours()
            
            
                    //when will the line be dashed and stright
                    const dash = (ctx) => {
                        //console.log(ctx.p0DataIndex)
                        if(ctx.p0DataIndex < labelToChange){
                            return [8, 10]
                        }
                    }

                    const canvasElement = document.querySelector(".canvas-holder")
                    const invisibleOverlay = document.createElement("div")
                    invisibleOverlay.classList.add("blank-overlay")
                    canvasElement.appendChild(invisibleOverlay)
            
                    let ctx = document.querySelector("#canvas").getContext("2d")
            
                    
                    const feelsLikeData = () =>{
                        const feelsLikeArray = []
                        for(let h = 0; h < weatherData.forecast.forecastday[i].hour.length; h++){
                            feelsLikeArray.push(Math.round(weatherData.forecast.forecastday[i].hour[h].feelslike_c))
            
                        }
            
                        return feelsLikeArray
                    }
            
                    const all = document.querySelectorAll(".value-hrs")

                    const weatherIconValues = (arg) =>{
                        const weatherCondition = weatherData.forecast.forecastday[i].hour[arg].condition.text
                        
                
                        if(weatherData.forecast.forecastday[i].hour[arg].is_day){
                            if(weatherCondition == 'Mist'){
                                //console.log("Mist Day")
                                return '<img src="fog.png">'
                            } else if (weatherCondition == 'Sunny'){
                                //console.log("Sunny Day")
                                return '<img src="sunny.png">'
                            }else if((weatherCondition == 'Partly cloudy')) {
                                //console.log("Partly Cloudy Day")
                                return '<img src="cloud-sun-off.png">'
                            } else if((weatherCondition == 'Cloudy') || (weatherCondition == 'Overcast')) {
                                //console.log("Overcast or cloudy Day")
                                return '<img src="cloud-removebg-preview.png">'
                            } else if ((weatherCondition == 'Heavy rain')){
                                //console.log("Heavy Rain Day")
                                return '<img src="rain.png">'
                            } else if ((weatherCondition == 'Moderate rain')){
                                //console.log("Moderate Rain Day")
                                return '<img src="rain.png">'
                            } else if ((weatherCondition == 'Fog' || weatherCondition.includes("fog"))){
                                //console.log("Fog Day")
                                return '<img src="fog.png">'
                            } else if((weatherCondition == 'Patchy rain possible' || weatherCondition == 'Light drizzle' || weatherCondition == 'Light rain shower')){
                                return '<img src="rain.png">'
                            } else if (weatherCondition == 'Patchy light rain' || weatherCondition == 'Light rain' || weatherCondition == 'Moderate or heavy rain shower' || weatherCondition== 'Moderate rain at times' || weatherCondition == 'Patchy light drizzle' || weatherCondition == 'Light freezing rain'){
                                return '<img src="rain.png">'
                            } else if(weatherCondition == 'Thundery outbreaks possible' || weatherCondition == 'Patchy light rain with thunder' || weatherCondition == 'Moderate or heavy rain with thunder') {
                                return '<img src="thunder.png">'
                            } else if(weatherCondition.includes("snow")){
                                return '<img src="snowflake.png">'
                            }else if(weatherCondition == "Light freezing rain"){
                                return '<img src="rain.png">'
                            }else if(weatherCondition == "Blizzard"){
                                return '<img src="snowflake.png">'
                            }else{
                                console.log((weatherCondition))
                                return 'CONDITION NOT DEFINED'
                            }
                        }else {
                            
                            if(weatherCondition == 'Mist'){
                                //console.log("Mist Night")
                                return '<img src="fog.png">'
                            } else if (weatherCondition == 'Clear'){
                                //console.log("Clear Night")
                                return '<img src="moon.png">'
                            }else if((weatherCondition == 'Partly cloudy')) {
                                //console.log("Partly Cloudy Night")
                                return '<img src="cloud-moon.png">'
                            } else if((weatherCondition == 'Cloudy') || (weatherCondition == 'Overcast')) {
                                //console.log("Overcast or Cloudy Night")
                                return '<img src="cloud-removebg-preview.png">'
                            } else if ((weatherCondition == 'Heavy rain')){
                                //console.log("Heavy Rain Night")
                                return '<img src="moon rain.png">'
                            } else if ((weatherCondition == 'Moderate rain')){
                                //console.log("Moderate Rain Night")
                                return '<img src="moon rain.png">'
                            } else if ((weatherCondition == 'Fog' || weatherCondition == 'Freezing fog')){
                                //console.log("Fog Night")
                                return '<img src="fog.png">'
                            } else if((weatherCondition == 'Patchy rain possible' || weatherCondition == 'Light drizzle' || weatherCondition == 'Light rain shower')){
                                return '<img src="moon rain.png">'
                            } else if (weatherCondition == 'Patchy light rain' || weatherCondition == 'Light rain' || weatherCondition == 'Moderate or heavy rain shower' || weatherCondition == 'Moderate rain at times' || weatherCondition == 'Patchy light drizzle' || weatherCondition == 'Light freezing rain'){
                                return '<img src="moon rain.png">'
                            } else if(weatherCondition == 'Thundery outbreaks possible' || weatherCondition == 'Patchy light rain with thunder' || weatherCondition == 'Moderate or heavy rain with thunder') {
                                return '<img src="thunder night.png">'
                            } else if(weatherCondition.includes("snow")){
                                return '<img src="snowflake.png">'
                            }else if(weatherCondition == "Light freezing rain"){
                                return '<img src="rain.png">'
                            }else if(weatherCondition == "Blizzard"){
                                return '<img src="snowflake.png">'
                            }else{
                                console.log((weatherCondition))
                                return 'CONDITION NOT DEFINED'
                            }
                            
                        }
                    }
                    
                    all[0].innerHTML = `${weatherIconValues(0)}`
                    all[1].innerHTML = `${weatherIconValues(2)}`
                    all[2].innerHTML = `${weatherIconValues(4)}`
                    all[3].innerHTML = `${weatherIconValues(6)}`
                    all[4].innerHTML = `${weatherIconValues(8)}`
                    all[5].innerHTML = `${weatherIconValues(10)}`
                    all[6].innerHTML = `${weatherIconValues(12)}`
                    all[7].innerHTML = `${weatherIconValues(14)}`
                    all[8].innerHTML = `${weatherIconValues(16)}`
                    all[9].innerHTML = `${weatherIconValues(18)}`
                    all[10].innerHTML = `${weatherIconValues(20)}`
                    all[11].innerHTML = `${weatherIconValues(22)}`
                    
                    
                    const gradient = window['chartjs-plugin-gradient'];
                    
                    const container = document.querySelector(".container-for-values")
                    
            
                    //console.log((Math.round(Math.min(...feelsLikeData()) / 10) * 10) - 5)
            
                    //BACKGROUND GRADIENTS
                    const colorsObject = () =>{
                        if((Math.round(Math.min(...feelsLikeData()) / 10) * 10) - 5 < 0){
                            return {
                                "-20": "rgba(0, 27, 70, 0.3)",
                                "-15": "rgba(0, 40, 104, 0.3)",
                                "-10": "rgba(0, 56, 145, 0.3)",
                                "-5": "rgba(1, 69, 179, 0.3)",
            
                                "0": "rgba(0, 75, 197, 0.3)",
                                "3": "rgba(0, 105, 197, 0.3)",
                                "6": "rgba(0, 144, 197, 0.3)",
                                "9": "rgba(0, 187, 197, 0.3)",
                                "12": "rgba(0, 197, 167, 0.3)", 
                                "15": "rgba(0, 197, 118, 0.3)",
                                "18": "rgba(0, 197, 59, 0.3)",
                                "21": "rgba(0, 197, 23, 0.3)",
                                "24": "rgba(0, 197, 13, 0.3)",
                                "27": "rgba(62, 197, 0, 0.3)",
                                "30": "rgba(144, 197, 0, 0.3)",
                                "33": "rgba(197, 177, 0, 0.3)",
                                "36": "rgba(197, 151, 0, 0.3)",
                                "40": "rgba(197, 105, 0, 0.3)",
                                "43": "rgba(197, 69, 0, 0.3)",
                                "46": "rgba(197, 0, 0, 0.3)",
                            }
                        }else {
                            return {
                                "0": "rgba(0, 75, 197, 0.3)",
                                "3": "rgba(0, 105, 197, 0.3)",
                                "6": "rgba(0, 144, 197, 0.3)",
                                "9": "rgba(0, 187, 197, 0.3)",
                                "12": "rgba(0, 197, 167, 0.3)", 
                                "15": "rgba(0, 197, 118, 0.3)",
                                "18": "rgba(0, 197, 59, 0.3)",
                                "21": "rgba(0, 197, 23, 0.3)",
                                "24": "rgba(0, 197, 13, 0.3)",
                                "27": "rgba(62, 197, 0, 0.3)",
                                "30": "rgba(144, 197, 0, 0.3)",
                                "33": "rgba(197, 177, 0, 0.3)",
                                "36": "rgba(197, 151, 0, 0.3)",
                                "40": "rgba(197, 105, 0, 0.3)",
                                "43": "rgba(197, 69, 0, 0.3)",
                                "46": "rgba(197, 0, 0, 0.3)",
                            }
                        }
                    }
                    //console.log(colorsObject())
            
                    const borderColorObject = () =>{
                        if((Math.round(Math.min(...feelsLikeData()) / 10) * 10) - 5 < 0){
                            return {
                                "-20": "rgba(51, 0, 204, 1)",
                                "-15": "rgba(13, 0, 193, 1)",
                                "-10": "rgba(0, 29, 215, 1)",
                                "-5": "rgba(0, 47, 215, 1)",
            
                                "0": "rgba(0, 80, 193, 1)",
                                "3": "rgba(0, 107, 193, 1)",
                                "6": "rgba(0, 135, 193, 1)",
                                "9": "rgba(0, 175, 193, 1)",
                                "12": "rgba(0, 193, 166, 1)",
                                "15": "rgba(0, 193, 130, 1)",
                                "18": "rgba(0, 193, 98, 1)",
                                "21": "rgba(0, 193, 54, 1)",
                                "24": "rgba(79, 193, 0, 1)",
                                "27": "rgba(127, 193, 0, 1)",
                                "30": "rgba(147, 193, 0, 1)",
                                "33": "rgba(193, 178, 0, 1)",
                                "36": "rgba(193, 130, 0, 1)",
                                "40": "rgba(193, 82, 0, 1)",
                                "43": "rgba(193, 50, 0, 1)",
                                "46": "rgba(218, 0, 0, 1)",
                            }
            
                        }else {
                            return {
                                "0": "rgba(0, 80, 193, 1)",
                                "3": "rgba(0, 107, 193, 1)",
                                "6": "rgba(0, 135, 193, 1)",
                                "9": "rgba(0, 175, 193, 1)",
                                "12": "rgba(0, 193, 166, 1)",
                                "15": "rgba(0, 193, 130, 1)",
                                "18": "rgba(0, 193, 98, 1)",
                                "21": "rgba(0, 193, 54, 1)",
                                "24": "rgba(79, 193, 0, 1)",
                                "27": "rgba(127, 193, 0, 1)",
                                "30": "rgba(147, 193, 0, 1)",
                                "33": "rgba(193, 178, 0, 1)",
                                "36": "rgba(193, 130, 0, 1)",
                                "40": "rgba(193, 82, 0, 1)",
                                "43": "rgba(193, 50, 0, 1)",
                                "46": "rgba(218, 0, 0, 1)",
                            }
                        }
                    }
                    //console.log(borderColorObject())
            
                    //data block
                    const chartData = {
                        labels: hoursArray,
                        datasets: [{
                            label: "",
                            data: feelsLikeData(),
                            segment: {
                                //borderDash: ctx => dash(ctx),
                            },
                            gradient: {
                                backgroundColor: {
                                  axis: 'y',
                                  colors: colorsObject()
                                },
            
                                borderColor: {
                                    axis: 'y',
                                    colors: borderColorObject()
                                }
                            },
                            borderWidth: 6.5,
                            borderColor: "red", //fix with gradient function later
                            pointBackgroundColor: "transparent",
                            pointBorderColor: "transparent",
                            borderCapStyle: 'round',
                            clip: {
                                left: 0,
                                right: 0,
                                top: false,
                                bottom: false
                            },
                            tension: 0.2,
                            fill: "stack",
                            backgroundColor: "transparent" //fix with gradient func later
                        }]
                    }
                
                    const plugin = {
                        id: 'customCanvasBackgroundColor',
                        beforeDraw: (chart, args, options) => {
                        const {ctx} = chart;
                        ctx.save();
                        ctx.globalCompositeOperation = 'destination-over';
                        ctx.fillStyle = options.color
                        ctx.fillRect(0, 0, chart.width, chart.height);
                        ctx.restore();
                        
                        }
                    };
                
                    //console.log(Math.max(...feelsLikeData()) + 5)
                    const minMaxFunc = () =>{
                        if((Math.floor(Math.min(...feelsLikeData()) / 10) * 10) - 5 <= 0){
                            return (Math.floor(Math.min(...feelsLikeData()) / 10) * 10) - 5
            
                        }else if((Math.floor(Math.min(...feelsLikeData()) / 10) * 10) - 5 <= 11){
                            return 0
                        } else {
                            return (Math.floor(Math.min(...feelsLikeData()) / 10) * 10) - 5
                        }
                    }
                    //console.log(minMaxFunc())
                    
                    
                    //console.log(Math.min(...feelsLikeData()))
                    //console.log(Math.max(...feelsLikeData()) + 5)
            
                    let minValue = (Math.floor(Math.min(...feelsLikeData()) / 10) * 10) - 5
                    let maxValue = (Math.ceil(Math.max(...feelsLikeData()) / 10) * 10) + 5
            
            
                    if(maxValue < 10){
                        container.style.width = `422.5px`
                        container.style.gap = `19px`
                    }else {
                        container.style.width = `427px`
                        container.style.gap = `19px`
                    }
            
                    const amplitude = () =>{
                        //console.log(maxValue)
                        //console.log(minValue)
            
                        if(maxValue - minValue == 5){
                            return 3
                        }else if(maxValue - minValue == 10){
                            return 4
                        }else if(maxValue - minValue == 15){
                            return 5
                        }else if(maxValue - minValue == 20){
                            
                            return 7
                        }else if(maxValue - minValue == 25){
                            
                            return 7
                        }else if(maxValue - minValue == 30){
                            
                            return 100
                        }else if(maxValue - minValue == 35){
                            
                            return 15
                        }else if(maxValue - minValue == 40){
                            
                            return 10
                        }
                    }
                    //console.log(amplitude())
            
                    //console.log(30)
            
                    //console.log(minMaxFunc())
                    //console.log((Math.floor(Math.min(...feelsLikeData()) / 10) * 10) - 5)
            
                    //config block
                    const config = {
                        type: "line",
                        data: chartData,  
                        options: {
                            aspectRatio: 7/4,
                            responsive: true,
                            scales: {
                                y: {
                                    min: minMaxFunc(),
                                    //beginAtZero: minMaxFunc(),
                                    max: maxValue,
                                    
            
                                    grid: {
                                        drawTicks: false,
                                        display: true,
                                        drawOnChartArea: true,
                                        color: "#302F32"
                                    },
                                    border: {
                                        display: true,
                                        color: "#302F32"
                                    },
                                    ticks: {
                                        color: "#9D9D9E",
                                        padding: 15,
                                        align: "center",
                                        crossAlign: "center", 
                                        font: {
                                            size: 13,
                                            weight: 400
                                        },
                                        maxTicksLimit: amplitude(),
                                        callback: function(value, index, values){
                                            return `${value}°`
                                        }
                                    },
                                    position: "right"
                                },
                
                                x: {
                                    border: {
                                        display: false,
                                        dash: [3, 2]
                                    },
                                    grid: {
                                        display: true,
                                        drawOnChartArea: true,
                                        drawTicks: false,
                                        color: "#302F32"
                                    },
                
                                    ticks: {
                                        color: "#9D9D9E",
                                        maxTicksLimit: 4,
                                        padding: 5,
                                        align: "start",
                                        crossAlign: "near",
                                        font: {
                                            size: 15,
                                            weight: 400
                                        },
                                        
                                    }
                                },
                
                                
                            },
                            plugins: {
                                customCanvasBackgroundColor: {
                                    color: "#202023"
                                },
                                legend: {
                                    display: false
                                },
                                autocolors: false,
                                annotation: {
                                    
                                    annotations: {
                                        
                                        
                                        point1: {
                                            yValue: Math.min(...feelsLikeData()),
                                            xValue: feelsLikeData().indexOf(Math.min(...feelsLikeData())),
            
                                            type: "point",
                                            backgroundColor: "transparent",
                                            borderWidth: 4,
                                            borderColor: "black",
                                            radius: 5.5,
                                        },
                                        point3: {
                                            yValue: Math.max(...feelsLikeData()),
                                            xValue: feelsLikeData().indexOf(Math.max(...feelsLikeData())),
            
                                            type: "point",
                                            backgroundColor: "transparent",
                                            borderWidth: 4,
                                            borderColor: "black",
                                            radius: 5.5,
                                            //callback: yValue => 
                                        },
                                        label1: {
                                            type: "label",
                                            yValue: Math.max(...feelsLikeData()) + 2.5,
                                            xValue: feelsLikeData().indexOf(Math.max(...feelsLikeData())),
                                            backgroundColor: "transparent",
                                            color: "#9D9D9E",
                                            content: "H",
                                            font: {
                                                size: 15
                                            }
                                        },
                                        label2: {
                                            type: "label",
                                            yValue: Math.min(...feelsLikeData()) + 2.5,
                                            xValue: feelsLikeData().indexOf(Math.min(...feelsLikeData())),
                                            backgroundColor: "transparent",
                                            color: "#9D9D9E",
                                            content: "L",
                                            font: {
                                                size: 15
                                            }
                                        }
                                    },
                                    clip: false
                                } 
                            },   
                        },
                        plugins: [plugin, gradient]
                    }
                    //console.log(Math.max(...feelsLikeData()))
                
                    
                    const feelsLikeChart = new Chart(ctx, config)
                }
                feelsLikeChartFunction()
            })
        }
    }

    const mainFunctionFEELSLIKE = () =>{
        createElementFEELSLIKE()
        eventFunctionFEELSLIKE()

        //CHART DEPLOYED HERE
        const feelsLikeChartFunction = () =>{
            const hoursArray = []
    
            for(let i = 0; i < 24; i++){
                hoursArray.push(i)
            }
    
            //the index at which the change will occur
            let labelToChange = new Date(weatherData.current.last_updated).getHours()
    
    
            //when will the line be dashed and stright
            const dash = (ctx) => {
                //console.log(ctx.p0DataIndex)
                if(ctx.p0DataIndex < labelToChange){
                    return [8, 10]
                }
            }
    
            let ctx = document.querySelector("#canvas").getContext("2d")
    
            
            const feelsLikeData = () =>{
                const feelsLikeArray = []
                for(let i = 0; i < weatherData.forecast.forecastday[0].hour.length; i++){
                    feelsLikeArray.push(Math.round(weatherData.forecast.forecastday[0].hour[i].feelslike_c))
    
                }
    
                return feelsLikeArray
            }
    
            const canvasElement = document.querySelector(".canvas-holder")
            const chartOverlay = document.createElement("div")
            chartOverlay.classList.add("time-passed-overlay")

            
            const invisibleOverlay = document.createElement("div")
            invisibleOverlay.classList.add("blank-overlay")
            canvasElement.appendChild(invisibleOverlay)

            const lineDivider = document.createElement("div")
            lineDivider.classList.add("line-divider")
            chartOverlay.appendChild(lineDivider)
            
            canvasElement.appendChild(chartOverlay)
            const overlayStyle = () =>{
                if(labelToChange == 0){
                    chartOverlay.style.width = `8px`
                    
                }else if(labelToChange == 1){
                    chartOverlay.style.width = `27px`
                    
                }else if(labelToChange == 2){
                    chartOverlay.style.width = `45px`
                    
                }else if(labelToChange == 3){
                    chartOverlay.style.width = `63px`
                    
                }else if(labelToChange == 4){
                    chartOverlay.style.width = `81px`
                    
                }else if(labelToChange == 5){
                    chartOverlay.style.width = `99px`
                    
                }else if(labelToChange == 6){
                    chartOverlay.style.width = `117px`
                    
                }else if(labelToChange == 7){
                    chartOverlay.style.width = `135px`
                    
                }else if(labelToChange == 8){
                    chartOverlay.style.width = `153px`
                    
                }else if(labelToChange == 9){

                    chartOverlay.style.width = `170px`
                    
                }else if(labelToChange == 10){
                    chartOverlay.style.width = `189px`
                    
                }else if(labelToChange == 11){
                    chartOverlay.style.width = `206px`
                    
                }else if(labelToChange == 12){
                    chartOverlay.style.width = `225px`
                    
                }else if(labelToChange == 13){
                    chartOverlay.style.width = `242px`
                    
                }else if(labelToChange == 14){
                    chartOverlay.style.width = `261px`
                    
                }else if(labelToChange == 15){
                    chartOverlay.style.width = `278px`
                    
                }else if(labelToChange == 16){
                    chartOverlay.style.width = `297px`
                    
                }else if(labelToChange == 17){
                    chartOverlay.style.width = `315px`
                    
                }else if(labelToChange == 18){
                    chartOverlay.style.width = `334px`
                    
                }else if(labelToChange == 19){
                    chartOverlay.style.width = `351px`
                    
                }else if(labelToChange == 20){
                    chartOverlay.style.width = `369px`
                    
                }else if(labelToChange == 21){
                    chartOverlay.style.width = `388px`
                    
                }else if(labelToChange == 22){
                    chartOverlay.style.width = `405px`
                    
                }else if(labelToChange == 23){
                    chartOverlay.style.width = `424px`
                    
                }

                lineDivider.style.left = chartOverlay.style.width 
            }
            overlayStyle()
            
            
            const gradient = window['chartjs-plugin-gradient'];
            
            const container = document.querySelector(".container-for-values")
            const all = document.querySelectorAll(".value-hrs")

            const weatherIconValues = (arg) =>{
                const weatherCondition = weatherData.forecast.forecastday[0].hour[arg].condition.text
                
        
                if(weatherData.forecast.forecastday[0].hour[arg].is_day){
                    if(weatherCondition == 'Mist'){
                        //console.log("Mist Day")
                        return '<img src="fog.png">'
                    } else if (weatherCondition == 'Sunny'){
                        //console.log("Sunny Day")
                        return '<img src="sunny.png">'
                    }else if((weatherCondition == 'Partly cloudy')) {
                        //console.log("Partly Cloudy Day")
                        return '<img src="cloud-sun-off.png">'
                    } else if((weatherCondition == 'Cloudy') || (weatherCondition == 'Overcast')) {
                        //console.log("Overcast or cloudy Day")
                        return '<img src="cloud-removebg-preview.png">'
                    } else if ((weatherCondition == 'Heavy rain')){
                        //console.log("Heavy Rain Day")
                        return '<img src="rain.png">'
                    } else if ((weatherCondition == 'Moderate rain')){
                        //console.log("Moderate Rain Day")
                        return '<img src="rain.png">'
                    } else if ((weatherCondition == 'Fog' || weatherCondition.includes("fog"))){
                        //console.log("Fog Day")
                        return '<img src="fog.png">'
                    } else if((weatherCondition == 'Patchy rain possible' || weatherCondition == 'Light drizzle' || weatherCondition == 'Light rain shower')){
                        return '<img src="rain.png">'
                    } else if (weatherCondition == 'Patchy light rain' || weatherCondition == 'Light rain' || weatherCondition == 'Moderate or heavy rain shower' || weatherCondition== 'Moderate rain at times' || weatherCondition == 'Patchy light drizzle' || weatherCondition == 'Light freezing rain'){
                        return '<img src="rain.png">'
                    } else if(weatherCondition == 'Thundery outbreaks possible' || weatherCondition == 'Patchy light rain with thunder' || weatherCondition == 'Moderate or heavy rain with thunder') {
                        return '<img src="thunder.png">'
                    } else if(weatherCondition.includes("snow")){
                        return '<img src="snowflake.png">'
                    }else if(weatherCondition == "Light freezing rain"){
                        return '<img src="rain.png">'
                    }else if(weatherCondition == "Blizzard"){
                        return '<img src="snowflake.png">'
                    }else{
                        console.log((weatherCondition))
                        return 'CONDITION NOT DEFINED'
                    }
                }else {
                     
                    if(weatherCondition == 'Mist'){
                        //console.log("Mist Night")
                        return '<img src="fog.png">'
                    } else if (weatherCondition == 'Clear'){
                        //console.log("Clear Night")
                        return '<img src="moon.png">'
                    }else if((weatherCondition == 'Partly cloudy')) {
                        //console.log("Partly Cloudy Night")
                        return '<img src="cloud-moon.png">'
                    } else if((weatherCondition == 'Cloudy') || (weatherCondition == 'Overcast')) {
                        //console.log("Overcast or Cloudy Night")
                        return '<img src="cloud-removebg-preview.png">'
                    } else if ((weatherCondition == 'Heavy rain')){
                        //console.log("Heavy Rain Night")
                        return '<img src="moon rain.png">'
                    } else if ((weatherCondition == 'Moderate rain')){
                        //console.log("Moderate Rain Night")
                        return '<img src="moon rain.png">'
                    } else if ((weatherCondition == 'Fog' || weatherCondition.includes("fog"))){
                        //console.log("Fog Night")
                        return '<img src="fog.png">'
                    } else if((weatherCondition == 'Patchy rain possible' || weatherCondition == 'Light drizzle' || weatherCondition == 'Light rain shower')){
                        return '<img src="moon rain.png">'
                    } else if (weatherCondition == 'Patchy light rain' || weatherCondition == 'Light rain' || weatherCondition == 'Moderate or heavy rain shower' || weatherCondition == 'Moderate rain at times' || weatherCondition == 'Patchy light drizzle' || weatherCondition == 'Light freezing rain'){
                        return '<img src="moon rain.png">'
                    } else if(weatherCondition == 'Thundery outbreaks possible' || weatherCondition == 'Patchy light rain with thunder' || weatherCondition == 'Moderate or heavy rain with thunder') {
                        return '<img src="thunder night.png">'
                    } else if(weatherCondition.includes("snow")){
                        return '<img src="snowflake.png">'
                    }else if(weatherCondition == "Light freezing rain"){
                        return '<img src="rain.png">'
                    }else if(weatherCondition == "Blizzard"){
                        return '<img src="snowflake.png">'
                    }else{
                        console.log((weatherCondition))
                        return 'CONDITION NOT DEFINED'
                    }
                    
                }
            }
            
            all[0].innerHTML = `${weatherIconValues(0)}`
            all[1].innerHTML = `${weatherIconValues(2)}`
            all[2].innerHTML = `${weatherIconValues(4)}`
            all[3].innerHTML = `${weatherIconValues(6)}`
            all[4].innerHTML = `${weatherIconValues(8)}`
            all[5].innerHTML = `${weatherIconValues(10)}`
            all[6].innerHTML = `${weatherIconValues(12)}`
            all[7].innerHTML = `${weatherIconValues(14)}`
            all[8].innerHTML = `${weatherIconValues(16)}`
            all[9].innerHTML = `${weatherIconValues(18)}`
            all[10].innerHTML = `${weatherIconValues(20)}`
            all[11].innerHTML = `${weatherIconValues(22)}`
    
            //console.log((Math.round(Math.min(...feelsLikeData()) / 10) * 10) - 5)
    
            //BACKGROUND GRADIENTS
            const colorsObject = () =>{
                if((Math.round(Math.min(...feelsLikeData()) / 10) * 10) - 5 < 0){
                    return {
                        "-20": "rgba(0, 27, 70, 0.3)",
                        "-15": "rgba(0, 40, 104, 0.3)",
                        "-10": "rgba(0, 56, 145, 0.3)",
                        "-5": "rgba(1, 69, 179, 0.3)",
    
                        "0": "rgba(0, 75, 197, 0.3)",
                        "3": "rgba(0, 105, 197, 0.3)",
                        "6": "rgba(0, 144, 197, 0.3)",
                        "9": "rgba(0, 187, 197, 0.3)",
                        "12": "rgba(0, 197, 167, 0.3)", 
                        "15": "rgba(0, 197, 118, 0.3)",
                        "18": "rgba(0, 197, 59, 0.3)",
                        "21": "rgba(0, 197, 23, 0.3)",
                        "24": "rgba(0, 197, 13, 0.3)",
                        "27": "rgba(62, 197, 0, 0.3)",
                        "30": "rgba(144, 197, 0, 0.3)",
                        "33": "rgba(197, 177, 0, 0.3)",
                        "36": "rgba(197, 151, 0, 0.3)",
                        "40": "rgba(197, 105, 0, 0.3)",
                        "43": "rgba(197, 69, 0, 0.3)",
                        "46": "rgba(197, 0, 0, 0.3)",
                    }
                }else {
                    return {
                        "0": "rgba(0, 75, 197, 0.3)",
                        "3": "rgba(0, 105, 197, 0.3)",
                        "6": "rgba(0, 144, 197, 0.3)",
                        "9": "rgba(0, 187, 197, 0.3)",
                        "12": "rgba(0, 197, 167, 0.3)", 
                        "15": "rgba(0, 197, 118, 0.3)",
                        "18": "rgba(0, 197, 59, 0.3)",
                        "21": "rgba(0, 197, 23, 0.3)",
                        "24": "rgba(0, 197, 13, 0.3)",
                        "27": "rgba(62, 197, 0, 0.3)",
                        "30": "rgba(144, 197, 0, 0.3)",
                        "33": "rgba(197, 177, 0, 0.3)",
                        "36": "rgba(197, 151, 0, 0.3)",
                        "40": "rgba(197, 105, 0, 0.3)",
                        "43": "rgba(197, 69, 0, 0.3)",
                        "46": "rgba(197, 0, 0, 0.3)",
                    }
                }
            }
            //console.log(colorsObject())
    
            const borderColorObject = () =>{
                if((Math.round(Math.min(...feelsLikeData()) / 10) * 10) - 5 < 0){
                    return {
                        "-20": "rgba(51, 0, 204, 1)",
                        "-15": "rgba(13, 0, 193, 1)",
                        "-10": "rgba(0, 29, 215, 1)",
                        "-5": "rgba(0, 47, 215, 1)",
    
                        "0": "rgba(0, 80, 193, 1)",
                        "3": "rgba(0, 107, 193, 1)",
                        "6": "rgba(0, 135, 193, 1)",
                        "9": "rgba(0, 175, 193, 1)",
                        "12": "rgba(0, 193, 166, 1)",
                        "15": "rgba(0, 193, 130, 1)",
                        "18": "rgba(0, 193, 98, 1)",
                        "21": "rgba(0, 193, 54, 1)",
                        "24": "rgba(79, 193, 0, 1)",
                        "27": "rgba(127, 193, 0, 1)",
                        "30": "rgba(147, 193, 0, 1)",
                        "33": "rgba(193, 178, 0, 1)",
                        "36": "rgba(193, 130, 0, 1)",
                        "40": "rgba(193, 82, 0, 1)",
                        "43": "rgba(193, 50, 0, 1)",
                        "46": "rgba(218, 0, 0, 1)",
                    }
    
                }else {
                    return {
                        "0": "rgba(0, 80, 193, 1)",
                        "3": "rgba(0, 107, 193, 1)",
                        "6": "rgba(0, 135, 193, 1)",
                        "9": "rgba(0, 175, 193, 1)",
                        "12": "rgba(0, 193, 166, 1)",
                        "15": "rgba(0, 193, 130, 1)",
                        "18": "rgba(0, 193, 98, 1)",
                        "21": "rgba(0, 193, 54, 1)",
                        "24": "rgba(79, 193, 0, 1)",
                        "27": "rgba(127, 193, 0, 1)",
                        "30": "rgba(147, 193, 0, 1)",
                        "33": "rgba(193, 178, 0, 1)",
                        "36": "rgba(193, 130, 0, 1)",
                        "40": "rgba(193, 82, 0, 1)",
                        "43": "rgba(193, 50, 0, 1)",
                        "46": "rgba(218, 0, 0, 1)",
                    }
                }
            }
            //console.log(borderColorObject())
    
            //data block
            const chartData = {
                labels: hoursArray,
                datasets: [{
                    label: "",
                    data: feelsLikeData(),
                    segment: {
                        borderDash: ctx => dash(ctx),
                    },
                    gradient: {
                        backgroundColor: {
                          axis: 'y',
                          colors: colorsObject()
                        },
    
                        borderColor: {
                            axis: 'y',
                            colors: borderColorObject()
                        }
                    },
                    borderWidth: 6.5,
                    borderColor: "red", //fix with gradient function later
                    pointBackgroundColor: "transparent",
                    pointBorderColor: "transparent",
                    borderCapStyle: 'round',
                    clip: {
                        left: 0,
                        right: 0,
                        top: false,
                        bottom: false
                    },
                    tension: 0.2,
                    fill: "stack",
                    backgroundColor: "transparent" //fix with gradient func later
                }]
            }
        
            const plugin = {
                id: 'customCanvasBackgroundColor',
                beforeDraw: (chart, args, options) => {
                const {ctx} = chart;
                ctx.save();
                ctx.globalCompositeOperation = 'destination-over';
                ctx.fillStyle = options.color
                ctx.fillRect(0, 0, chart.width, chart.height);
                ctx.restore();
                
                }
            };
        
            //console.log(Math.max(...feelsLikeData()) + 5)
            const minMaxFunc = () =>{
                if((Math.floor(Math.min(...feelsLikeData()) / 10) * 10) - 5 <= 0){
                    return (Math.floor(Math.min(...feelsLikeData()) / 10) * 10) - 5
    
                }else if((Math.floor(Math.min(...feelsLikeData()) / 10) * 10) - 5 <= 11){
                    return 0
                } else {
                    return (Math.floor(Math.min(...feelsLikeData()) / 10) * 10) - 5
                }
            }
            //console.log(minMaxFunc())
            
            
            //console.log(Math.min(...feelsLikeData()))
            //console.log(Math.max(...feelsLikeData()) + 5)
    
            let minValue = (Math.floor(Math.min(...feelsLikeData()) / 10) * 10) - 5
            let maxValue = (Math.ceil(Math.max(...feelsLikeData()) / 10) * 10) + 5
    
    
            if(maxValue < 10){
                container.style.width = `422.6px`
                container.style.gap = `19px`
            }else {
                container.style.width = `427px`
                container.style.gap = `19px`
            }
    
            const amplitude = () =>{
                //console.log(maxValue)
                //console.log(minValue)
    
                if(maxValue - minValue == 5){
                    return 3
                }else if(maxValue - minValue == 10){
                    return 4
                }else if(maxValue - minValue == 15){
                    return 5
                }else if(maxValue - minValue == 20){
                    
                    return 7
                }else if(maxValue - minValue == 25){
                    
                    return 7
                }else if(maxValue - minValue == 30){
                    
                    return 100
                }else if(maxValue - minValue == 35){
                    
                    return 15
                }else if(maxValue - minValue == 40){
                    
                    return 10
                }
            }
            //console.log(amplitude())
    
            //console.log(30)
    
            //console.log(minMaxFunc())
            //console.log((Math.floor(Math.min(...feelsLikeData()) / 10) * 10) - 5)
    
            //config block
            const config = {
                type: "line",
                data: chartData,  
                options: {
                    aspectRatio: 7/4,
                    responsive: true,
                    scales: {
                        y: {
                            min: minMaxFunc(),
                            //beginAtZero: minMaxFunc(),
                            max: maxValue,
                            
    
                            grid: {
                                drawTicks: false,
                                display: true,
                                drawOnChartArea: true,
                                color: "#302F32"
                            },
                            border: {
                                display: true,
                                color: "#302F32"
                            },
                            ticks: {
                                color: "#9D9D9E",
                                padding: 15,
                                align: "center",
                                crossAlign: "center", 
                                font: {
                                    size: 13,
                                    weight: 400
                                },
                                maxTicksLimit: amplitude(),
                                callback: function(value, index, values){
                                    return `${value}°`
                                }
                            },
                            position: "right"
                        },
        
                        x: {
                            border: {
                                display: false,
                                dash: [3, 2]
                            },
                            grid: {
                                display: true,
                                drawOnChartArea: true,
                                drawTicks: false,
                                color: "#302F32"
                            },
        
                            ticks: {
                                color: "#9D9D9E",
                                maxTicksLimit: 4,
                                padding: 5,
                                align: "start",
                                crossAlign: "near",
                                font: {
                                    size: 15,
                                    weight: 400
                                },
                                
                            }
                        },
        
                        
                    },
                    plugins: {
                        customCanvasBackgroundColor: {
                            color: "#202023"
                        },
                        legend: {
                            display: false
                        },
                        autocolors: false,
                        annotation: {
                            
                            annotations: {
                                
                                point2: {
                                    type: "point",
                                    xValue: labelToChange,
                                    yValue: feelsLikeData()[labelToChange],
                                    backgroundColor: "#fafafa",
                                    borderWidth: 4,
                                    borderColor: "black",
                                    radius: 5.5,
                                    
                                },
                                point1: {
                                    yValue: Math.min(...feelsLikeData()),
                                    xValue: feelsLikeData().indexOf(Math.min(...feelsLikeData())),
    
                                    type: "point",
                                    backgroundColor: "transparent",
                                    borderWidth: 4,
                                    borderColor: "black",
                                    radius: 5.5,
                                },
                                point3: {
                                    yValue: Math.max(...feelsLikeData()),
                                    xValue: feelsLikeData().indexOf(Math.max(...feelsLikeData())),
    
                                    type: "point",
                                    backgroundColor: "transparent",
                                    borderWidth: 4,
                                    borderColor: "black",
                                    radius: 5.5,
                                    //callback: yValue => 
                                },
                                label1: {
                                    type: "label",
                                    yValue: Math.max(...feelsLikeData()) + 2.5,
                                    xValue: feelsLikeData().indexOf(Math.max(...feelsLikeData())),
                                    backgroundColor: "transparent",
                                    color: "#9D9D9E",
                                    content: "H",
                                    font: {
                                        size: 15
                                    }
                                },
                                label2: {
                                    type: "label",
                                    yValue: Math.min(...feelsLikeData()) + 2.5,
                                    xValue: feelsLikeData().indexOf(Math.min(...feelsLikeData())),
                                    backgroundColor: "transparent",
                                    color: "#9D9D9E",
                                    content: "L",
                                    font: {
                                        size: 15
                                    }
                                }
                            },
                            clip: false
                        } 
                    },   
                },
                plugins: [plugin, gradient]
            }
            //console.log(Math.max(...feelsLikeData()))
        
            
            const feelsLikeChart = new Chart(ctx, config)
        }
        feelsLikeChartFunction()

        const wrapper = document.querySelector(".forecast-days-wrap")

        let mouseDown = false //will change if mouse is clicked

        const dragging = (e)=>{
            if(!mouseDown){ //if the mouse isnt click this will not run
                return
            }
            wrapper.style.cursor = `grabbing` //styling for the cursor
            e.preventDefault() //preventing default behaviour
            wrapper.scrollLeft -= e.movementX //the scroll movement
        }

        wrapper.addEventListener("mousedown", ()=>{
            mouseDown = true //when the mouse is down change the variable value
            wrapper.style.cursor = `grabbing`
        })
        wrapper.addEventListener("mousemove", dragging) //when the mouse moves run the function

        wrapper.addEventListener("mouseup", ()=>{
            mouseDown = false //mouse is no longer clicked
            wrapper.style.cursor = `grab`
        })
        wrapper.addEventListener("mouseleave", ()=>{
            mouseDown = false //mouse leaves the element
            wrapper.style.cursor = `grab`
        })

        const selectDropdown = document.querySelector(".select")
        const littleCaret = document.querySelector(".rotated")
        let elementActive = false 
        const menuItemspWrapper = document.querySelector(".menu-wrapper")
        const eachItemMenu = document.querySelectorAll(".each-item-menu")
        const divWithTick = document.querySelectorAll(".svg-tick")

        

        eachItemMenu[0].addEventListener("click", ()=>{
            mainFunctionForecast()
            
        })

        eachItemMenu[1].addEventListener("click", ()=>{
            mainFunction()
        
        })

        eachItemMenu[2].addEventListener("click", ()=>{
            mainFunctionFORWIND()
        
        })

        eachItemMenu[3].addEventListener("click", ()=>{
            mainFunctionRAIN()
        
        })

        eachItemMenu[4].addEventListener("click", ()=>{
            mainFunctionFEELSLIKE()
            
        })

        eachItemMenu[5].addEventListener("click", ()=>{
            mainFunctionHUMIDITY()
        
        })

        eachItemMenu[6].addEventListener("click", ()=>{
            mainFunctionVISIBILITY()
        
        })

        eachItemMenu[7].addEventListener("click", ()=>{
            mainFunctionPRESSURE()
        
        })
        
    

        const functionForDropdownActivation = (e) =>{
            if(!elementActive){
                selectDropdown.style.backgroundColor = '#515154'
                littleCaret.classList.add("true")
                menuItemspWrapper.style.display = 'block'
                menuItemspWrapper.style.height = `auto`
            }else{
                selectDropdown.style.backgroundColor = '#3A3A3D'
                littleCaret.classList.remove("true")
                menuItemspWrapper.style.display = 'none'
                menuItemspWrapper.style.height = `0`
            }

            elementActive = !elementActive
            e.stopPropagation()
        }
        
        const clickAnywhereElse = () =>{
            if(elementActive){
                selectDropdown.style.backgroundColor = '#3A3A3D'
                elementActive = false
                littleCaret.classList.remove("true")
                menuItemspWrapper.style.display = 'none'
                menuItemspWrapper.style.height = `0`
            }
        }

        selectDropdown.addEventListener("click", functionForDropdownActivation)

        document.body.addEventListener("click", clickAnywhereElse)
    }

    const divFEELSLIKE = document.querySelector(".feels-like")
    divFEELSLIKE.addEventListener("click", ()=>{
        mainFunctionFEELSLIKE()
        const addInfo = document.querySelector(".additional-info")
        ADVANCED_DATA_OVERLAY.style.display = 'flex'
        
        body.style.overflow = "hidden"
    })


    //for humidity
    const createElementHUMIDITY = () =>{
        //const wrapper = document.querySelector(".forecast-days-wrap")
        //const WHLE_ELMNT = document.querySelector(".advanced-data")
        const PARENT_ELEMENT = document.querySelector(".additional-info")
        PARENT_ELEMENT.innerHTML = ` `
        const headline = document.createElement("div")
        headline.classList.add("headline")
        headline.innerHTML = `
        <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
           
           <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)">
           <path d="M1866 4785 c-22 -7 -49 -24 -62 -37 -39 -40 -329 -452 -499 -708
           -524 -791 -834 -1397 -948 -1850 -28 -113 -31 -140 -32 -285 0 -184 17 -297
           72 -470 91 -287 267 -550 492 -737 218 -181 456 -294 736 -350 148 -30 422
           -32 570 -4 199 36 431 126 582 225 77 50 108 102 100 169 -9 81 -77 142 -157
           142 -35 0 -60 -8 -106 -36 -234 -142 -431 -199 -694 -199 -172 0 -243 11 -396
           60 -201 66 -348 157 -505 314 -110 110 -181 206 -241 326 -118 234 -164 517
           -119 731 80 384 395 1001 916 1789 196 295 333 490 345 490 19 0 401 -565 595
           -880 317 -515 557 -998 633 -1273 19 -66 19 -72 4 -72 -33 0 -118 48 -177 99
           -83 72 -219 138 -325 157 -202 38 -404 -18 -565 -156 -78 -68 -146 -99 -238
           -109 -41 -5 -88 -16 -104 -26 -97 -57 -103 -201 -11 -267 47 -33 141 -36 249
           -9 109 27 193 71 281 144 104 88 163 112 268 112 104 -1 163 -25 260 -109 161
           -138 378 -194 585 -151 94 20 214 81 305 156 105 86 144 102 255 103 79 1 97
           -2 145 -26 31 -15 85 -53 120 -83 80 -70 201 -130 300 -151 188 -39 295 13
           295 144 0 101 -53 148 -182 163 -95 10 -142 32 -233 109 -126 107 -292 170
           -445 170 -133 0 -294 -54 -398 -133 -26 -21 -51 -37 -55 -37 -4 0 -18 35 -31
           78 -90 311 -364 856 -698 1391 -194 311 -635 957 -712 1045 -39 45 -116 63
           -175 41z"></path>
           <path d="M4025 4625 c-50 -18 -76 -48 -214 -244 -200 -285 -345 -546 -413
           -742 -30 -86 -32 -104 -32 -214 1 -100 5 -132 26 -197 39 -119 92 -204 182
           -294 90 -90 175 -143 294 -182 67 -22 94 -26 212 -26 118 0 145 4 212 26 119
           39 204 92 294 182 90 90 143 175 182 294 21 65 25 96 26 197 0 131 -13 183
           -89 357 -105 238 -466 792 -542 832 -45 23 -94 27 -138 11z m152 -562 c155
           -239 246 -409 283 -532 30 -97 23 -170 -25 -267 -42 -86 -102 -144 -193 -187
           -61 -29 -76 -32 -162 -32 -86 0 -101 3 -162 32 -91 43 -151 101 -193 187 -48
           97 -55 170 -25 267 22 75 82 202 153 324 63 109 218 345 227 345 4 0 48 -62
           97 -137z"></path>
           <path d="M2380 1725 c-91 -21 -212 -83 -300 -156 -92 -76 -139 -98 -233 -108
           -89 -10 -128 -29 -158 -78 -69 -111 14 -243 153 -243 140 1 288 58 418 164
           119 96 154 111 265 111 107 0 170 -24 252 -97 258 -230 635 -235 893 -12 99
           86 155 109 265 109 110 0 166 -23 265 -109 122 -106 298 -172 437 -164 43 3
           71 10 90 24 93 70 96 192 7 261 -26 19 -52 27 -114 34 -97 11 -149 35 -245
           114 -277 228 -645 217 -910 -26 -16 -15 -55 -40 -85 -56 -48 -24 -67 -27 -145
           -28 -107 0 -166 23 -255 99 -132 114 -264 166 -430 172 -68 2 -128 -2 -170
           -11z"></path>
           </g>
           </svg>
        <span>Humidity</span>
        `
        const closeX = document.createElement("div")
        closeX.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
        ` 
        headline.appendChild(closeX)
        PARENT_ELEMENT.appendChild(headline)

        closeX.addEventListener("click", ()=>{
            PARENT_ELEMENT.innerHTML = ``
            ADVANCED_DATA_OVERLAY.style.display = "none"
            body.style.overflow = "auto"
        })

        PARENT_ELEMENT.style.marginTop = `7.4rem`
        
        
        const WHLE_ELMNT = document.createElement("div")
        WHLE_ELMNT.classList.add("advanced-data")
        PARENT_ELEMENT.appendChild(WHLE_ELMNT)
        WHLE_ELMNT.innerHTML = ``
        const wrapper = document.createElement("div")
        wrapper.classList.add("forecast-days-wrap")
        const index = document.createElement("div")
        index.classList.add("index")
        const extraText = document.createElement("div")
        extraText.classList.add("extra-text")
        WHLE_ELMNT.appendChild(wrapper)
        const finalInfo = document.createElement("div")
        finalInfo.classList.add("final-info")
        finalInfo.innerHTML = `
        <span>About Relative Humidity</span>
        <span>Relative humidity, commonly known just as hummidity, is the amount of moisture in the air compared with what the air can hold. The air can hold more moisture at higher temperatures. A relative humidity near 100% means there may be dew or fog.</span>
        `
        
        const dewPoint = () =>{
            const dateLatest = new Date(weatherData.current.last_updated).getHours()
            //console.log(dateLatest)
    
            for(let i = 0; i < weatherData.forecast.forecastday[0].hour.length; i++){
                //console.log(weatherData.forecast.forecastday[0].hour[i].dewpoint_c)
                let dewPointHours = weatherData.forecast.forecastday[0].hour[i].time
                dewPointHours = dewPointHours.slice("10", "13")
                dewPointHours = Number(dewPointHours)
    
                if(dateLatest == dewPointHours){
                    return `${Math.round(weatherData.forecast.forecastday[0].hour[i].dewpoint_c)}°`
                }
            }
        }
        

        for(let i = 0; i < weatherData.forecast.forecastday.length; i++){
            let days = new Date(weatherData.forecast.forecastday[i].date)
            let daysShort = days.toLocaleDateString("default", {"weekday": "narrow"})
            let fullDay = days.toLocaleDateString("default", {weekday: "long", day: "2-digit", month: "long", "year": "numeric"})
            let numbersDays = days.toLocaleDateString("default", {day: "2-digit"})
            let currentHour = new Date(weatherData.current.last_updated).getHours()
            let sunsetToday = Number(weatherData.forecast.forecastday[i].astro.sunset.slice("0", "2")) + 12
            
        
            const lowHighDEWPOINT = () =>{
                let lowDew = weatherData.forecast.forecastday[0].hour[0].dewpoint_c
                let highDew = weatherData.forecast.forecastday[0].hour[0].dewpoint_c
                for(let j = 0; j < weatherData.forecast.forecastday[0].hour.length; j++){
                    
                    if(weatherData.forecast.forecastday[0].hour[j].dewpoint_c > highDew){
                        highDew = weatherData.forecast.forecastday[0].hour[j].dewpoint_c
                    }

                    if(weatherData.forecast.forecastday[0].hour[j].dewpoint_c < lowDew){
                        lowDew = weatherData.forecast.forecastday[0].hour[j].dewpoint_c
                    }
                }

                return [Math.round(lowDew), Math.round(highDew)]
            }
            
            

            //console.log(fullDay)
            if(i == 0){
                
                const day = document.createElement("div")
                day.classList.add("forecast-each-day")
                day.innerHTML = `
                <span>${daysShort}</span>
                <span class="numbers active">${numbersDays}</span>
                `
                wrapper.appendChild(day)

                //console.log(weatherData)

                const fullDate = document.createElement("div")
                fullDate.classList.add("datepicked")
                fullDate.textContent = fullDay
                WHLE_ELMNT.appendChild(fullDate)
                index.innerHTML = `
                <span>${weatherData.current.humidity}</span>
                <span class="humid-percent">%</span>
                <span class="humidity-text">Dew point: ${dewPoint()}</span>

                <div class="dropdown">

                    <div class="select">
                    <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
                        
                    <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)">
                    <path d="M1866 4785 c-22 -7 -49 -24 -62 -37 -39 -40 -329 -452 -499 -708
                    -524 -791 -834 -1397 -948 -1850 -28 -113 -31 -140 -32 -285 0 -184 17 -297
                    72 -470 91 -287 267 -550 492 -737 218 -181 456 -294 736 -350 148 -30 422
                    -32 570 -4 199 36 431 126 582 225 77 50 108 102 100 169 -9 81 -77 142 -157
                    142 -35 0 -60 -8 -106 -36 -234 -142 -431 -199 -694 -199 -172 0 -243 11 -396
                    60 -201 66 -348 157 -505 314 -110 110 -181 206 -241 326 -118 234 -164 517
                    -119 731 80 384 395 1001 916 1789 196 295 333 490 345 490 19 0 401 -565 595
                    -880 317 -515 557 -998 633 -1273 19 -66 19 -72 4 -72 -33 0 -118 48 -177 99
                    -83 72 -219 138 -325 157 -202 38 -404 -18 -565 -156 -78 -68 -146 -99 -238
                    -109 -41 -5 -88 -16 -104 -26 -97 -57 -103 -201 -11 -267 47 -33 141 -36 249
                    -9 109 27 193 71 281 144 104 88 163 112 268 112 104 -1 163 -25 260 -109 161
                    -138 378 -194 585 -151 94 20 214 81 305 156 105 86 144 102 255 103 79 1 97
                    -2 145 -26 31 -15 85 -53 120 -83 80 -70 201 -130 300 -151 188 -39 295 13
                    295 144 0 101 -53 148 -182 163 -95 10 -142 32 -233 109 -126 107 -292 170
                    -445 170 -133 0 -294 -54 -398 -133 -26 -21 -51 -37 -55 -37 -4 0 -18 35 -31
                    78 -90 311 -364 856 -698 1391 -194 311 -635 957 -712 1045 -39 45 -116 63
                    -175 41z"></path>
                    <path d="M4025 4625 c-50 -18 -76 -48 -214 -244 -200 -285 -345 -546 -413
                    -742 -30 -86 -32 -104 -32 -214 1 -100 5 -132 26 -197 39 -119 92 -204 182
                    -294 90 -90 175 -143 294 -182 67 -22 94 -26 212 -26 118 0 145 4 212 26 119
                    39 204 92 294 182 90 90 143 175 182 294 21 65 25 96 26 197 0 131 -13 183
                    -89 357 -105 238 -466 792 -542 832 -45 23 -94 27 -138 11z m152 -562 c155
                    -239 246 -409 283 -532 30 -97 23 -170 -25 -267 -42 -86 -102 -144 -193 -187
                    -61 -29 -76 -32 -162 -32 -86 0 -101 3 -162 32 -91 43 -151 101 -193 187 -48
                    97 -55 170 -25 267 22 75 82 202 153 324 63 109 218 345 227 345 4 0 48 -62
                    97 -137z"></path>
                    <path d="M2380 1725 c-91 -21 -212 -83 -300 -156 -92 -76 -139 -98 -233 -108
                    -89 -10 -128 -29 -158 -78 -69 -111 14 -243 153 -243 140 1 288 58 418 164
                    119 96 154 111 265 111 107 0 170 -24 252 -97 258 -230 635 -235 893 -12 99
                    86 155 109 265 109 110 0 166 -23 265 -109 122 -106 298 -172 437 -164 43 3
                    71 10 90 24 93 70 96 192 7 261 -26 19 -52 27 -114 34 -97 11 -149 35 -245
                    114 -277 228 -645 217 -910 -26 -16 -15 -55 -40 -85 -56 -48 -24 -67 -27 -145
                    -28 -107 0 -166 23 -255 99 -132 114 -264 166 -430 172 -68 2 -128 -2 -170
                    -11z"></path>
                    </g>
                    </svg>
                        <svg class="rotated " xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"/></svg>
                    </div>

                    <div class="menu-wrapper">
                        <div class="each-item-menu">
                            <div class="svg-tick">
                                
                            </div>
                            <div>
                                <span>Conditions</span>
                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M0 336c0 79.5 64.5 144 144 144H512c70.7 0 128-57.3 128-128c0-61.9-44-113.6-102.4-125.4c4.1-10.7 6.4-22.4 6.4-34.6c0-53-43-96-96-96c-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32C167.6 32 96 103.6 96 192c0 2.7 .1 5.4 .2 8.1C40.2 219.8 0 273.2 0 336z"></path></svg>
                            </div>
                        </div>
                        <div class="each-item-menu">
                            <div class="svg-tick">
                                
                            </div>
                            <div>
                                <span>UV Index</span>
                                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24"><path d="M12,17c-2.76,0-5-2.24-5-5s2.24-5,5-5,5,2.24,5,5-2.24,5-5,5Zm1-13V1c0-.55-.45-1-1-1s-1,.45-1,1v3c0,.55,.45,1,1,1s1-.45,1-1Zm0,19v-3c0-.55-.45-1-1-1s-1,.45-1,1v3c0,.55,.45,1,1,1s1-.45,1-1ZM5,12c0-.55-.45-1-1-1H1c-.55,0-1,.45-1,1s.45,1,1,1h3c.55,0,1-.45,1-1Zm19,0c0-.55-.45-1-1-1h-3c-.55,0-1,.45-1,1s.45,1,1,1h3c.55,0,1-.45,1-1ZM6.71,6.71c.39-.39,.39-1.02,0-1.41l-2-2c-.39-.39-1.02-.39-1.41,0s-.39,1.02,0,1.41l2,2c.2,.2,.45,.29,.71,.29s.51-.1,.71-.29Zm14,14c.39-.39,.39-1.02,0-1.41l-2-2c-.39-.39-1.02-.39-1.41,0s-.39,1.02,0,1.41l2,2c.2,.2,.45,.29,.71,.29s.51-.1,.71-.29Zm-16,0l2-2c.39-.39,.39-1.02,0-1.41s-1.02-.39-1.41,0l-2,2c-.39,.39-.39,1.02,0,1.41,.2,.2,.45,.29,.71,.29s.51-.1,.71-.29ZM18.71,6.71l2-2c.39-.39,.39-1.02,0-1.41s-1.02-.39-1.41,0l-2,2c-.39,.39-.39,1.02,0,1.41,.2,.2,.45,.29,.71,.29s.51-.1,.71-.29Z"></path></svg>
                            </div>
                        </div>
                        <div class="each-item-menu">
                            <div class="svg-tick"></div>
                            <div>
                                <span>Wind</span>
                                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24"><path d="M0,12a1,1,0,0,1,1-1H7a1,1,0,0,1,0,2H1A1,1,0,0,1,0,12Zm20.886-.893A4.99,4.99,0,1,0,12,8a1,1,0,0,0,2,0,3,3,0,1,1,3,3H11a1,1,0,0,0,0,2h9a2,2,0,0,1,2,2c-.009,2.337-3.281,2.648-4.057.667a1,1,0,0,0-1.886.666C17.615,20.415,23.952,19.579,24,15A4,4,0,0,0,20.886,11.107ZM11,16H1a1,1,0,0,0,0,2H11a2,2,0,0,1,2,2c-.009,2.337-3.281,2.648-4.057.667a1,1,0,1,0-1.886.666C8.615,25.415,14.952,24.579,15,20A4,4,0,0,0,11,16ZM1,8H7a4,4,0,0,0,4-4C10.952-.581,4.613-1.414,3.057,2.667a1,1,0,0,0,1.886.666C5.72,1.351,8.991,1.663,9,4A2,2,0,0,1,7,6H1A1,1,0,0,0,1,8Z"></path></svg>
                        
                            </div>
                        </div>
                        <div class="each-item-menu">
                            <div class="svg-tick"></div>
                            <div>
                                <span>Precipitation</span>
                                <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">

                                    <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)">
                                    <path d="M2413 4898 c-779 -1184 -1258 -2187 -1394 -2918 -26 -137 -36 -428
                                    -20 -553 84 -631 499 -1151 1076 -1345 434 -147 924 -86 1305 159 472 305 750
                                    820 751 1387 0 180 -20 332 -66 522 -147 597 -468 1299 -995 2175 -196 325
                                    -495 785 -511 785 -3 0 -70 -96 -146 -212z"></path>
                                    </g>
                                    </svg>
                            </div>
                        </div>
                        <div class="each-item-menu">
                            <div class="svg-tick"></div>
                            <div>
                                <span>Feels Like</span>
                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M416 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm0 128A96 96 0 1 0 416 0a96 96 0 1 0 0 192zM96 112c0-26.5 21.5-48 48-48s48 21.5 48 48V276.5c0 17.3 7.1 31.9 15.3 42.5C217.8 332.6 224 349.5 224 368c0 44.2-35.8 80-80 80s-80-35.8-80-80c0-18.5 6.2-35.4 16.7-48.9C88.9 308.4 96 293.8 96 276.5V112zM144 0C82.1 0 32 50.2 32 112V276.5c0 .1-.1 .3-.2 .6c-.2 .6-.8 1.6-1.7 2.8C11.2 304.2 0 334.8 0 368c0 79.5 64.5 144 144 144s144-64.5 144-144c0-33.2-11.2-63.8-30.1-88.1c-.9-1.2-1.5-2.2-1.7-2.8c-.1-.3-.2-.5-.2-.6V112C256 50.2 205.9 0 144 0zm0 416c26.5 0 48-21.5 48-48c0-20.9-13.4-38.7-32-45.3V112c0-8.8-7.2-16-16-16s-16 7.2-16 16V322.7c-18.6 6.6-32 24.4-32 45.3c0 26.5 21.5 48 48 48z"></path></svg>
                        
                            </div>
                        </div>
                        <div class="each-item-menu">
                            <div class="svg-tick">
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
                            </div>
                            
                            <div>
                                <span>Humidity</span>
                                <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
                        
                                    <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)">
                                    <path d="M1866 4785 c-22 -7 -49 -24 -62 -37 -39 -40 -329 -452 -499 -708
                                    -524 -791 -834 -1397 -948 -1850 -28 -113 -31 -140 -32 -285 0 -184 17 -297
                                    72 -470 91 -287 267 -550 492 -737 218 -181 456 -294 736 -350 148 -30 422
                                    -32 570 -4 199 36 431 126 582 225 77 50 108 102 100 169 -9 81 -77 142 -157
                                    142 -35 0 -60 -8 -106 -36 -234 -142 -431 -199 -694 -199 -172 0 -243 11 -396
                                    60 -201 66 -348 157 -505 314 -110 110 -181 206 -241 326 -118 234 -164 517
                                    -119 731 80 384 395 1001 916 1789 196 295 333 490 345 490 19 0 401 -565 595
                                    -880 317 -515 557 -998 633 -1273 19 -66 19 -72 4 -72 -33 0 -118 48 -177 99
                                    -83 72 -219 138 -325 157 -202 38 -404 -18 -565 -156 -78 -68 -146 -99 -238
                                    -109 -41 -5 -88 -16 -104 -26 -97 -57 -103 -201 -11 -267 47 -33 141 -36 249
                                    -9 109 27 193 71 281 144 104 88 163 112 268 112 104 -1 163 -25 260 -109 161
                                    -138 378 -194 585 -151 94 20 214 81 305 156 105 86 144 102 255 103 79 1 97
                                    -2 145 -26 31 -15 85 -53 120 -83 80 -70 201 -130 300 -151 188 -39 295 13
                                    295 144 0 101 -53 148 -182 163 -95 10 -142 32 -233 109 -126 107 -292 170
                                    -445 170 -133 0 -294 -54 -398 -133 -26 -21 -51 -37 -55 -37 -4 0 -18 35 -31
                                    78 -90 311 -364 856 -698 1391 -194 311 -635 957 -712 1045 -39 45 -116 63
                                    -175 41z"></path>
                                    <path d="M4025 4625 c-50 -18 -76 -48 -214 -244 -200 -285 -345 -546 -413
                                    -742 -30 -86 -32 -104 -32 -214 1 -100 5 -132 26 -197 39 -119 92 -204 182
                                    -294 90 -90 175 -143 294 -182 67 -22 94 -26 212 -26 118 0 145 4 212 26 119
                                    39 204 92 294 182 90 90 143 175 182 294 21 65 25 96 26 197 0 131 -13 183
                                    -89 357 -105 238 -466 792 -542 832 -45 23 -94 27 -138 11z m152 -562 c155
                                    -239 246 -409 283 -532 30 -97 23 -170 -25 -267 -42 -86 -102 -144 -193 -187
                                    -61 -29 -76 -32 -162 -32 -86 0 -101 3 -162 32 -91 43 -151 101 -193 187 -48
                                    97 -55 170 -25 267 22 75 82 202 153 324 63 109 218 345 227 345 4 0 48 -62
                                    97 -137z"></path>
                                    <path d="M2380 1725 c-91 -21 -212 -83 -300 -156 -92 -76 -139 -98 -233 -108
                                    -89 -10 -128 -29 -158 -78 -69 -111 14 -243 153 -243 140 1 288 58 418 164
                                    119 96 154 111 265 111 107 0 170 -24 252 -97 258 -230 635 -235 893 -12 99
                                    86 155 109 265 109 110 0 166 -23 265 -109 122 -106 298 -172 437 -164 43 3
                                    71 10 90 24 93 70 96 192 7 261 -26 19 -52 27 -114 34 -97 11 -149 35 -245
                                    114 -277 228 -645 217 -910 -26 -16 -15 -55 -40 -85 -56 -48 -24 -67 -27 -145
                                    -28 -107 0 -166 23 -255 99 -132 114 -264 166 -430 172 -68 2 -128 -2 -170
                                    -11z"></path>
                                    </g>
                                    </svg>
                            </div>
                        </div>
                        <div class="each-item-menu">
                            <div class="svg-tick"></div>
                            <div>
                                <span>Visibility</span>
                                <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24"><path d="M23.271,9.419C21.72,6.893,18.192,2.655,12,2.655S2.28,6.893.729,9.419a4.908,4.908,0,0,0,0,5.162C2.28,17.107,5.808,21.345,12,21.345s9.72-4.238,11.271-6.764A4.908,4.908,0,0,0,23.271,9.419Zm-1.705,4.115C20.234,15.7,17.219,19.345,12,19.345S3.766,15.7,2.434,13.534a2.918,2.918,0,0,1,0-3.068C3.766,8.3,6.781,4.655,12,4.655s8.234,3.641,9.566,5.811A2.918,2.918,0,0,1,21.566,13.534Z"></path><path d="M12,7a5,5,0,1,0,5,5A5.006,5.006,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z"></path></svg>
                        
                            </div>
                        </div>
                        <div class="each-item-menu">
                            <div class="svg-tick"></div>
                            
                            <div>
                                <span>Pressure</span>
                                <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
                        
                                    <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)">
                                <path d="M2300 4656 c-386 -53 -721 -190 -1022 -417 -107 -80 -317 -290 -397
                                -397 -703 -931 -529 -2240 392 -2954 366 -283 822 -438 1287 -438 809 1 1539
                                457 1896 1186 350 714 266 1566 -217 2206 -80 107 -290 317 -397 397 -278 210
                                -596 347 -946 407 -124 21 -471 27 -596 10z m100 -445 c0 -144 7 -171 53 -219
                                75 -77 199 -57 246 42 18 36 21 61 21 174 l0 132 28 0 c56 0 219 -33 330 -66
                                202 -61 389 -155 560 -281 l74 -54 -105 -108 c-83 -85 -107 -116 -112 -145
                                -28 -148 127 -250 256 -167 24 16 78 63 119 106 l75 77 28 -34 c54 -63 149
                                -213 199 -312 83 -165 154 -404 174 -583 l7 -63 -150 0 c-139 0 -152 -2 -184
                                -23 -109 -73 -105 -212 7 -267 34 -17 61 -20 183 -20 l144 0 -7 -52 c-23 -173
                                -82 -384 -146 -521 l-32 -67 -1610 2 -1609 3 -34 75 c-65 148 -120 347 -141
                                508 l-7 52 134 0 c112 0 139 3 173 20 117 57 123 215 11 277 -36 20 -54 23
                                -179 23 l-139 0 7 63 c32 285 162 607 349 860 l50 68 96 -94 c107 -105 142
                                -127 201 -127 107 0 183 105 149 207 -8 25 -45 72 -111 139 l-100 102 59 44
                                c128 99 282 186 436 247 130 52 364 108 460 110 l37 1 0 -129z m1522 -2808
                                c-51 -61 -192 -197 -257 -250 -135 -109 -347 -226 -521 -286 -209 -73 -411
                                -102 -648 -94 -342 11 -638 107 -932 302 -110 73 -281 226 -365 326 l-41 49
                                1402 0 1402 0 -40 -47z"></path>
                                <path d="M2505 3609 c-44 -12 -78 -54 -115 -139 -18 -41 -89 -196 -157 -345
                                -170 -368 -177 -390 -178 -540 0 -118 1 -121 37 -199 49 -101 148 -203 240
                                -246 252 -118 552 -18 680 227 45 85 63 171 55 267 -8 91 -35 166 -149 421
                                -50 110 -117 261 -151 335 -74 165 -89 187 -141 211 -44 20 -74 22 -121 8z
                                m110 -641 c91 -193 135 -310 135 -361 0 -77 -48 -152 -113 -176 -69 -26 -174
                                -4 -219 46 -45 50 -60 137 -34 209 24 70 168 384 176 384 4 0 29 -46 55 -102z"></path>
                                </g>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="canvas-holder">
                    <div class="container-for-values" style="width: 426px; gap: 19px;">
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                    </div>
                    <canvas id="canvas" height="340" style="display: block; box-sizing: border-box; height: 272px; width: 476px;" width="595"></canvas>
                </div>
                `
                WHLE_ELMNT.appendChild(index)
                extraText.innerHTML = `
                <span class="timeFORWIND">Daily Summary</span>
                <span class="textForHUMIDITY">Today, the average humidity is ${weatherData.forecast.forecastday[0].day.avghumidity}%. The dew point is ${lowHighDEWPOINT()[0]}° to ${lowHighDEWPOINT()[1]}°.</span>
                `
                WHLE_ELMNT.appendChild(extraText)
                WHLE_ELMNT.appendChild(finalInfo)
                
                continue
            }
            //console.log(daysShort, weatherData.forecast.forecastday[i].day.uv)
            const day = document.createElement("div")
            day.classList.add("forecast-each-day")
            day.innerHTML = `
            <span>${daysShort}</span>
            <span class="numbers">${numbersDays}</span>
            `
            wrapper.appendChild(day)
            
        }   
        
    }
    const eventFunctionHUMIDITY = () =>{
        const elements = document.querySelectorAll(".numbers")
        const fullDate = document.querySelector(".datepicked")
        const index = document.querySelector(".index span")
        const humidityText = document.querySelector(".humidity-text")
        const textDesc = document.querySelector(".textForHUMIDITY")

        for(let i = 0; i < elements.length; i++){
            
            const scaleHumidity = () =>{
                if(weatherData.forecast.forecastday[i].day.avghumidity > 80){
                    return 'Humid'
                }else if(weatherData.forecast.forecastday[i].day.avghumidity > 60){
                    return 'Balmy'
                }else if(weatherData.forecast.forecastday[i].day.avghumidity > 40){
                    return 'Average Humidity'
                }else if(weatherData.forecast.forecastday[i].day.avghumidity > 20){
                    return 'Dry'
                }else if(weatherData.forecast.forecastday[i].day.avghumidity >= 0){
                    return 'Arid'
                }
            }

            const lowHighDEWPOINT = () =>{
                let lowDew = weatherData.forecast.forecastday[i].hour[0].dewpoint_c
                let highDew = weatherData.forecast.forecastday[i].hour[0].dewpoint_c
                for(let j = 0; j < weatherData.forecast.forecastday[i].hour.length; j++){
                    
                    if(weatherData.forecast.forecastday[i].hour[j].dewpoint_c > highDew){
                        highDew = weatherData.forecast.forecastday[i].hour[j].dewpoint_c
                    }

                    if(weatherData.forecast.forecastday[i].hour[j].dewpoint_c < lowDew){
                        lowDew = weatherData.forecast.forecastday[i].hour[j].dewpoint_c
                    }
                }

                return [Math.round(lowDew), Math.round(highDew)]
            }

            let days = new Date(weatherData.forecast.forecastday[i].date)
                let fullDay = days.toLocaleDateString("default", {weekday: "long", day: "2-digit", month: "long", "year": "numeric"})
                elements[i].addEventListener("click", ()=>{
                elements.forEach(element =>{
                    element.classList.remove("active")
                })

                elements[0].addEventListener("click", ()=>{
                    mainFunctionHUMIDITY()
                })
                let weekday = days.toLocaleDateString("default", {weekday: "long"})

                humidityText.textContent = scaleHumidity()
                
                textDesc.textContent = `On ${weekday}, the average humidity will be ${weatherData.forecast.forecastday[i].day.avghumidity}%. The dew point will be ${lowHighDEWPOINT()[0]}° to ${lowHighDEWPOINT()[1]}°.`
                index.textContent = `${weatherData.forecast.forecastday[i].day.avghumidity}`
                fullDate.textContent = fullDay
                elements[i].classList.add("active")
                
                const CANVAS_ELEMENT = document.querySelector(".canvas-holder")

                CANVAS_ELEMENT.innerHTML = `
                <div class="container-for-values" style="width: 426px; gap: 19px;">
                    <div class="value-hrs"></div>
                    <div class="value-hrs"></div>
                    <div class="value-hrs"></div>
                    <div class="value-hrs"></div>
                    <div class="value-hrs"></div>
                    <div class="value-hrs"></div>
                    <div class="value-hrs"></div>
                    <div class="value-hrs"></div>
                    <div class="value-hrs"></div>
                    <div class="value-hrs"></div>
                    <div class="value-hrs"></div>
                    <div class="value-hrs"></div>
                </div>
                <canvas id="canvas" height="340" style="display: block; box-sizing: border-box; height: 272px; width: 476px;" width="595"></canvas>
                `

                const HumidityChartFunction = () =>{
                    const hoursArray = []
            
                    for(let i = 0; i < 24; i++){
                        hoursArray.push(i)
                    }
            
                    //the index at which the change will occur
                    let labelToChange = new Date(weatherData.current.last_updated).getHours()
            
                    const humidityData = () =>{
                        const humidityArray = []
                        for(let d = 0; d < weatherData.forecast.forecastday[i].hour.length; d++){
                            humidityArray.push(weatherData.forecast.forecastday[i].hour[d].humidity)
                        }
                
                        return humidityArray
                    }
        
                    //when will the line be dashed and stright
                    const dash = (ctx) => {
                        //console.log(ctx.p0DataIndex)
                        if(ctx.p0DataIndex < labelToChange){
                            return [8, 10]
                        }
                    }
        
                    let ctx = document.querySelector("#canvas").getContext("2d")
            
                    const gradient = window['chartjs-plugin-gradient'];
                    const container = document.querySelector(".container-for-values")
                    //container.classList.add("adjust-humid")
                    
                    container.style.width = `413px`

                    const canvasElement = document.querySelector(".canvas-holder")
                    const invisibleOverlay = document.createElement("div")
                    invisibleOverlay.classList.add("blank-overlay")
                    canvasElement.appendChild(invisibleOverlay)
            
                    //putting a value into the html element
                    const all = document.querySelectorAll(".value-hrs")
                
                    all[0].textContent = `${humidityData()[0]}%`
                    //all[1].textContent = `${humidityData()[2]}%`
                    all[2].textContent = `${humidityData()[4]}%`
                    //all[3].textContent = `${humidityData()[6]}%`
                    all[4].textContent = `${humidityData()[8]}%`
                    //all[5].textContent = `${humidityData()[0]}%`
                    all[6].textContent = `${humidityData()[12]}%`
                    //all[7].textContent = `${humidityData()[0]}%`
                    all[8].textContent = `${humidityData()[16]}%`
                    //all[9].textContent = `${humidityData()[0]}%`
                    all[10].textContent = `${humidityData()[20]}%`
                    //all[11].textContent = `${humidityData()[0]}%`
            
                    //data block
                    const chartData = {
                        labels: hoursArray,
                        datasets: [{
                            label: "",
                            data: humidityData(),
                            segment: {
                                //borderDash: ctx => dash(ctx),
                            },
                            gradient: {
                                backgroundColor: {
                                  axis: 'y',
                                  colors: {
                                    0: 'rgba(39, 197, 0, 0.3)',
                                    20: "rgba(0, 197, 105, 0.3)",
                                    40: "rgba(0, 197, 177, 0.3)",
                                    60: "rgba(0, 138, 197, 0.3)",
                                    80: "rgba(0, 92, 197, 0.3)", 
                                    90: "rgba(92, 0, 197, 0.3)"
                                  }
                                },
                                borderColor: {
                                    axis: "y",
                                    colors: {
                                        0: "rgba(24, 204, 0, 1)",
                                        10: "rgba(0, 204, 36, 1)",
                                        20: "rgba(0, 204, 108, 1)",
                                        30: "rgba(0, 204, 150, 1)",
                                        40: "rgba(0, 204, 184, 1)",
                                        50: "rgba(0, 181, 204, 1)",
                                        60: "rgba(0, 151, 204, 1)",
                                        70: "rgba(0, 117, 204, 1)",
                                        80: "rgba(0, 83, 204, 1)",
                                        90: "rgba(121, 0, 204, 1)",
                                        100: "rgba(163, 0, 204, 1)",
                                    }
                                }
                            },
                            borderWidth: 6.5,
                            borderColor: "red", //fix with gradient function later
                            pointBackgroundColor: "transparent",
                            pointBorderColor: "transparent",
                            borderCapStyle: 'round',
                            clip: {
                                left: 0,
                                right: 0,
                                top: false,
                                bottom: false
                            },
                            tension: 0.2,
                            fill: true,
                            backgroundColor: "transparent" //fix with gradient func later
                        }]
                    }
                
                    const plugin = {
                        id: 'customCanvasBackgroundColor',
                        beforeDraw: (chart, args, options) => {
                        const {ctx} = chart;
                        ctx.save();
                        ctx.globalCompositeOperation = 'destination-over';
                        ctx.fillStyle = options.color
                        ctx.fillRect(0, 0, chart.width, chart.height);
                        ctx.restore();
                        
                        }
                    };
                
                    //console.log(Math.max(...windData()[1]) + 10)
                
                    //config block
                    const config = {
                        type: "line",
                        data: chartData,  
                        options: {
                            aspectRatio: 7/4,
                            responsive: true,
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    max: 100,
                                    grid: {
                                        drawTicks: false,
                                        display: true,
                                        drawOnChartArea: true,
                                        color: "#302F32"
                                    },
                                    border: {
                                        display: true,
                                        color: "#302F32"
                                    },
                                    ticks: {
                                        color: "#9D9D9E",
                                        padding: 15,
                                        align: "center",
                                        crossAlign: "center",
                                        font: {
                                            size: 13,
                                            weight: 400
                                        },
                                        callback: function(value, index, values){
                                            return `${value}%`
                                        }     
                                    },
                                    position: "right"
                                },
                
                                x: {
                                    border: {
                                        display: false,
                                        dash: [3, 2]
                                    },
                                    grid: {
                                        display: true,
                                        drawOnChartArea: true,
                                        drawTicks: false,
                                        color: "#302F32"
                                    },
                
                                    ticks: {
                                        color: "#9D9D9E",
                                        maxTicksLimit: 4,
                                        padding: 5,
                                        align: "start",
                                        crossAlign: "near",
                                        font: {
                                            size: 15,
                                            weight: 400
                                        }
                                    }
                                },
                
                                
                            },
                            plugins: {
                                customCanvasBackgroundColor: {
                                    color: "#202023"
                                },
                                legend: {
                                    display: false
                                },
                                autocolors: false,
                                annotation: {
                                    
                                    annotations: {
                                        
                                        
                                    },
                                    clip: false
                                } 
                            },
                            
                            
                                
                            
                            
                        },
                        plugins: [plugin, gradient]
                    }
                
                    const humidityChart = new Chart(ctx, config)
                }
                HumidityChartFunction()
            })
        }
    }

    const mainFunctionHUMIDITY = () =>{
        createElementHUMIDITY()
        eventFunctionHUMIDITY()

        //HUMIDITY CHART HERE
        const HumidityChartFunction = () =>{
            const hoursArray = []
    
            for(let i = 0; i < 24; i++){
                hoursArray.push(i)
            }
    
            //the index at which the change will occur
            let labelToChange = new Date(weatherData.current.last_updated).getHours()
    
            const humidityData = () =>{
                const humidityArray = []
                for(let i = 0; i < weatherData.forecast.forecastday[0].hour.length; i++){
                    humidityArray.push(weatherData.forecast.forecastday[0].hour[i].humidity)
                }
        
                return humidityArray
            }

            //when will the line be dashed and stright
            const dash = (ctx) => {
                //console.log(ctx.p0DataIndex)
                if(ctx.p0DataIndex < labelToChange){
                    return [8, 10]
                }
            }

            const canvasElement = document.querySelector(".canvas-holder")
            const chartOverlay = document.createElement("div")
            chartOverlay.classList.add("time-passed-overlay")

            
                    const invisibleOverlay = document.createElement("div")
                    invisibleOverlay.classList.add("blank-overlay")
                    canvasElement.appendChild(invisibleOverlay)

            const lineDivider = document.createElement("div")
            lineDivider.classList.add("line-divider")
            chartOverlay.appendChild(lineDivider)
        
            canvasElement.appendChild(chartOverlay)
            const overlayStyle = () =>{
               
                if(labelToChange == 0){
                    chartOverlay.style.width = `9px`
                      
                }else if(labelToChange == 1){
                    chartOverlay.style.width = `27px`
                    
                }else if(labelToChange == 2){
                    chartOverlay.style.width = `44px`
                    
                }else if(labelToChange == 3){
                    chartOverlay.style.width = `61px`
                    
                }else if(labelToChange == 4){
                    chartOverlay.style.width = `78px`
                    
                }else if(labelToChange == 5){
                    chartOverlay.style.width = `96px`
                    
                }else if(labelToChange == 6){
                    chartOverlay.style.width = `113px`
                    
                }else if(labelToChange == 7){
                    chartOverlay.style.width = `131px`
                    
                }else if(labelToChange == 8){
                    chartOverlay.style.width = `148px`
                    
                }else if(labelToChange == 9){
    
                    chartOverlay.style.width = `166px`
                    
                }else if(labelToChange == 10){
                    chartOverlay.style.width = `183px`
                    
                }else if(labelToChange == 11){
                    chartOverlay.style.width = `201px`
                    
                }else if(labelToChange == 12){
                    chartOverlay.style.width = `219px`
                    
                }else if(labelToChange == 13){
                    chartOverlay.style.width = `236px`
                    
                }else if(labelToChange == 14){
                    chartOverlay.style.width = `253px`
                    
                }else if(labelToChange == 15){
                    chartOverlay.style.width = `271px`
                    
                }else if(labelToChange == 16){
                    chartOverlay.style.width = `288px`
                    
                }else if(labelToChange == 17){
                    chartOverlay.style.width = `306px`
                    
                }else if(labelToChange == 18){
                    chartOverlay.style.width = `323px`
                    
                }else if(labelToChange == 19){
                    chartOverlay.style.width = `341px`
                    
                }else if(labelToChange == 20){
                    chartOverlay.style.width = `359px`
                    
                }else if(labelToChange == 21){
                    chartOverlay.style.width = `376px`
                    
                }else if(labelToChange == 22){
                    chartOverlay.style.width = `393px`
                    
                }else if(labelToChange == 23){
                    chartOverlay.style.width = `411px`
                    
                }
    
                lineDivider.style.left = chartOverlay.style.width 
            }
            overlayStyle()

            let ctx = document.querySelector("#canvas").getContext("2d")
    
            const gradient = window['chartjs-plugin-gradient'];
            const container = document.querySelector(".container-for-values")
            //container.classList.add("adjust-humid")
            
            container.style.width = `413px`
    
            //putting a value into the html element
            const all = document.querySelectorAll(".value-hrs")
        
            all[0].textContent = `${humidityData()[0]}%`
            //all[1].textContent = `${humidityData()[2]}%`
            all[2].textContent = `${humidityData()[4]}%`
            //all[3].textContent = `${humidityData()[6]}%`
            all[4].textContent = `${humidityData()[8]}%`
            //all[5].textContent = `${humidityData()[0]}%`
            all[6].textContent = `${humidityData()[12]}%`
            //all[7].textContent = `${humidityData()[0]}%`
            all[8].textContent = `${humidityData()[16]}%`
            //all[9].textContent = `${humidityData()[0]}%`
            all[10].textContent = `${humidityData()[20]}%`
            //all[11].textContent = `${humidityData()[0]}%`
    
            //data block
            const chartData = {
                labels: hoursArray,
                datasets: [{
                    label: "",
                    data: humidityData(),
                    segment: {
                        borderDash: ctx => dash(ctx),
                    },
                    gradient: {
                        backgroundColor: {
                          axis: 'y',
                          colors: {
                            0: 'rgba(39, 197, 0, 0.3)',
                            20: "rgba(0, 197, 105, 0.3)",
                            40: "rgba(0, 197, 177, 0.3)",
                            60: "rgba(0, 138, 197, 0.3)",
                            80: "rgba(0, 92, 197, 0.3)", 
                            90: "rgba(92, 0, 197, 0.3)"
                          }
                        },
                        borderColor: {
                            axis: "y",
                            colors: {
                                0: "rgba(24, 204, 0, 1)",
                                10: "rgba(0, 204, 36, 1)",
                                20: "rgba(0, 204, 108, 1)",
                                30: "rgba(0, 204, 150, 1)",
                                40: "rgba(0, 204, 184, 1)",
                                50: "rgba(0, 181, 204, 1)",
                                60: "rgba(0, 151, 204, 1)",
                                70: "rgba(0, 117, 204, 1)",
                                80: "rgba(0, 83, 204, 1)",
                                90: "rgba(121, 0, 204, 1)",
                                100: "rgba(163, 0, 204, 1)",
                            }
                        }
                    },
                    borderWidth: 6.5,
                    borderColor: "red", //fix with gradient function later
                    pointBackgroundColor: "transparent",
                    pointBorderColor: "transparent",
                    borderCapStyle: 'round',
                    clip: {
                        left: 0,
                        right: 0,
                        top: false,
                        bottom: false
                    },
                    tension: 0.2,
                    fill: true,
                    backgroundColor: "transparent" //fix with gradient func later
                }]
            }
        
            const plugin = {
                id: 'customCanvasBackgroundColor',
                beforeDraw: (chart, args, options) => {
                const {ctx} = chart;
                ctx.save();
                ctx.globalCompositeOperation = 'destination-over';
                ctx.fillStyle = options.color
                ctx.fillRect(0, 0, chart.width, chart.height);
                ctx.restore();
                
                }
            };
        
            //console.log(Math.max(...windData()[1]) + 10)
        
            //config block
            const config = {
                type: "line",
                data: chartData,  
                options: {
                    aspectRatio: 7/4,
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100,
                            grid: {
                                drawTicks: false,
                                display: true,
                                drawOnChartArea: true,
                                color: "#302F32"
                            },
                            border: {
                                display: true,
                                color: "#302F32"
                            },
                            ticks: {
                                color: "#9D9D9E",
                                padding: 15,
                                align: "center",
                                crossAlign: "center",
                                font: {
                                    size: 13,
                                    weight: 400
                                },
                                callback: function(value, index, values){
                                    return `${value}%`
                                }     
                            },
                            position: "right"
                        },
        
                        x: {
                            border: {
                                display: false,
                                dash: [3, 2]
                            },
                            grid: {
                                display: true,
                                drawOnChartArea: true,
                                drawTicks: false,
                                color: "#302F32"
                            },
        
                            ticks: {
                                color: "#9D9D9E",
                                maxTicksLimit: 4,
                                padding: 5,
                                align: "start",
                                crossAlign: "near",
                                font: {
                                    size: 15,
                                    weight: 400
                                }
                            }
                        },
        
                        
                    },
                    plugins: {
                        customCanvasBackgroundColor: {
                            color: "#202023"
                        },
                        legend: {
                            display: false
                        },
                        autocolors: false,
                        annotation: {
                            
                            annotations: {
                                
                                point2: {
                                    type: "point",
                                    xValue: labelToChange,
                                    yValue: humidityData()[labelToChange],
                                    backgroundColor: "#fafafa",
                                    borderWidth: 4,
                                    borderColor: "black",
                                    radius: 5.5,
                                    
                                }
                            },
                            clip: false
                        } 
                    },
                    
                    
                        
                    
                    
                },
                plugins: [plugin, gradient]
            }
        
            const humidityChart = new Chart(ctx, config)
        }
        HumidityChartFunction()
        const wrapper = document.querySelector(".forecast-days-wrap")

        let mouseDown = false //will change if mouse is clicked

        const dragging = (e)=>{
            if(!mouseDown){ //if the mouse isnt click this will not run
                return
            }
            wrapper.style.cursor = `grabbing` //styling for the cursor
            e.preventDefault() //preventing default behaviour
            wrapper.scrollLeft -= e.movementX //the scroll movement
        }

        wrapper.addEventListener("mousedown", ()=>{
            mouseDown = true //when the mouse is down change the variable value
            wrapper.style.cursor = `grabbing`
        })
        wrapper.addEventListener("mousemove", dragging) //when the mouse moves run the function

        wrapper.addEventListener("mouseup", ()=>{
            mouseDown = false //mouse is no longer clicked
            wrapper.style.cursor = `grab`
        })
        wrapper.addEventListener("mouseleave", ()=>{
            mouseDown = false //mouse leaves the element
            wrapper.style.cursor = `grab`
        })
        const selectDropdown = document.querySelector(".select")
        const littleCaret = document.querySelector(".rotated")
        let elementActive = false 
        const menuItemspWrapper = document.querySelector(".menu-wrapper")
        const eachItemMenu = document.querySelectorAll(".each-item-menu")
        const divWithTick = document.querySelectorAll(".svg-tick")

        

        eachItemMenu[0].addEventListener("click", ()=>{
            mainFunctionForecast()
            
        })

        eachItemMenu[1].addEventListener("click", ()=>{
            mainFunction()
        
        })

        eachItemMenu[2].addEventListener("click", ()=>{
            mainFunctionFORWIND()
        
        })

        eachItemMenu[3].addEventListener("click", ()=>{
            mainFunctionRAIN()
        
        })

        eachItemMenu[4].addEventListener("click", ()=>{
            mainFunctionFEELSLIKE()
            
        })

        eachItemMenu[5].addEventListener("click", ()=>{
            mainFunctionHUMIDITY()
        
        })

        eachItemMenu[6].addEventListener("click", ()=>{
            mainFunctionVISIBILITY()
        
        })

        eachItemMenu[7].addEventListener("click", ()=>{
            mainFunctionPRESSURE()
        
        })
        
    

        const functionForDropdownActivation = (e) =>{
            if(!elementActive){
                selectDropdown.style.backgroundColor = '#515154'
                littleCaret.classList.add("true")
                menuItemspWrapper.style.display = 'block'
                menuItemspWrapper.style.height = `auto`
            }else{
                selectDropdown.style.backgroundColor = '#3A3A3D'
                littleCaret.classList.remove("true")
                menuItemspWrapper.style.display = 'none'
                menuItemspWrapper.style.height = `0`
            }

            elementActive = !elementActive
            e.stopPropagation()
        }
        
        const clickAnywhereElse = () =>{
            if(elementActive){
                selectDropdown.style.backgroundColor = '#3A3A3D'
                elementActive = false
                littleCaret.classList.remove("true")
                menuItemspWrapper.style.display = 'none'
                menuItemspWrapper.style.height = `0`
            }
        }

        selectDropdown.addEventListener("click", functionForDropdownActivation)

        document.body.addEventListener("click", clickAnywhereElse)
    }

    const divHUMIDITY = document.querySelector(".humidity")
    divHUMIDITY.addEventListener("click", ()=>{
        mainFunctionHUMIDITY()
        const addInfo = document.querySelector(".additional-info")
        ADVANCED_DATA_OVERLAY.style.display = 'flex'
        
        body.style.overflow = "hidden"
    })

    //VISIBILITY

    const createElementVISIBILITY = () =>{
        //const wrapper = document.querySelector(".forecast-days-wrap")
        //const WHLE_ELMNT = document.querySelector(".advanced-data")
        const PARENT_ELEMENT = document.querySelector(".additional-info")
        PARENT_ELEMENT.innerHTML = ` `
        const headline = document.createElement("div")
        headline.classList.add("headline")
        headline.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24"><path d="M23.271,9.419C21.72,6.893,18.192,2.655,12,2.655S2.28,6.893.729,9.419a4.908,4.908,0,0,0,0,5.162C2.28,17.107,5.808,21.345,12,21.345s9.72-4.238,11.271-6.764A4.908,4.908,0,0,0,23.271,9.419Zm-1.705,4.115C20.234,15.7,17.219,19.345,12,19.345S3.766,15.7,2.434,13.534a2.918,2.918,0,0,1,0-3.068C3.766,8.3,6.781,4.655,12,4.655s8.234,3.641,9.566,5.811A2.918,2.918,0,0,1,21.566,13.534Z"></path><path d="M12,7a5,5,0,1,0,5,5A5.006,5.006,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z"></path></svg>
        <span>Visibility</span>
        `
        const closeX = document.createElement("div")
        closeX.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
        ` 
        headline.appendChild(closeX)
        PARENT_ELEMENT.appendChild(headline)

        closeX.addEventListener("click", ()=>{
            PARENT_ELEMENT.innerHTML = ``
            ADVANCED_DATA_OVERLAY.style.display = "none"
            body.style.overflow = "auto"
        })

        
        PARENT_ELEMENT.style.marginTop = `8.5rem`
        
        const WHLE_ELMNT = document.createElement("div")
        WHLE_ELMNT.classList.add("advanced-data")
        PARENT_ELEMENT.appendChild(WHLE_ELMNT)
        WHLE_ELMNT.innerHTML = ``
        const wrapper = document.createElement("div")
        wrapper.classList.add("forecast-days-wrap")
        const index = document.createElement("div")
        index.classList.add("index")
        const extraText = document.createElement("div")
        extraText.classList.add("extra-text")
        WHLE_ELMNT.appendChild(wrapper)
        const finalInfo = document.createElement("div")
        finalInfo.classList.add("final-info")
        finalInfo.innerHTML = `
        <span>About Visibility</span>
        <span>Visibility tells you how far away you can clearly see objects like buildings and hills. It is a measure of the transparency of the air and does not take onto account the amount of sunlight or the presence of obstructions. Visibility at or above 10 km is considered clear.</span>
        `
        
        
        

        for(let i = 0; i < weatherData.forecast.forecastday.length; i++){
            let days = new Date(weatherData.forecast.forecastday[i].date)
            let daysShort = days.toLocaleDateString("default", {"weekday": "narrow"})
            let fullDay = days.toLocaleDateString("default", {weekday: "long", day: "2-digit", month: "long", "year": "numeric"})
            let numbersDays = days.toLocaleDateString("default", {day: "2-digit"})
            let currentHour = new Date(weatherData.current.last_updated).getHours()
            let sunsetToday = Number(weatherData.forecast.forecastday[i].astro.sunset.slice("0", "2")) + 12
            
        
            
            const visibilityText = () =>{
                if(weatherData.current.vis_km > 15){
                    return "Percectly clear"
                } else if(weatherData.current.vis_km >= 10){
                    return "Clear"
                } else if (weatherData.current.vis_km > 1){
                    return 'Moderately clear.'
                }
            }

            const visibilityHighestLowest = () =>{
                let highestVis = weatherData.forecast.forecastday[0].hour[0].vis_km
                let lowestVis = weatherData.forecast.forecastday[0].hour[0].vis_km

                for(let j = 0; j < weatherData.forecast.forecastday[0].hour.length; j++){
                    
                    if(weatherData.forecast.forecastday[0].hour[j].vis_km > highestVis){
                        highestVis = weatherData.forecast.forecastday[0].hour[j].vis_km
                    }

                    if(weatherData.forecast.forecastday[0].hour[j].vis_km < lowestVis){
                        lowestVis = weatherData.forecast.forecastday[0].hour[j].vis_km
                    }
                }

                return [highestVis, lowestVis]
            }
            
            const visibilityHighestLowestTextDETERMINER = () =>{
                const lowestVis = visibilityHighestLowest()[1]
                const highestVis = visibilityHighestLowest()[0]

                if(lowestVis > 15 && highestVis > 15){
                    return `the visiblity will be perfectly clear, at ${lowestVis} to ${highestVis} km.`
                }else if(lowestVis >= 10 && highestVis > 15){
                    return `the lowest visibility will be clear at ${lowestVis} km, and the highest will be perfectly clear at ${highestVis} km.`
                }else if(lowestVis >= 10 && highestVis >= 10){
                    return `the visibility will be clear, at ${lowestVis} and ${highestVis} km.`
                }else if(lowestVis > 0 && highestVis > 15){
                    return `the lowest visibility will be moderately clear at ${lowestVis} km, and the highest will be perfectly clear at ${highestVis} km.`
                }else if(lowestVis > 0 && highestVis >= 10){
                    return `the lowest visibility will be moderately clear at ${lowestVis} km, and the highest will be clear at ${highestVis} km.`
                }else if (lowestVis > 0 && highestVis > 0){
                    return `the visibility will be moderate, at ${lowestVis} and ${highestVis} km.`
                }else if(lowestVis == 0 && highestVis >=10){
                    return `the lowest visibility will be below 0 km, and the highest will be clear at ${highestVis} km.`
                }else if(lowestVis == 0 && highestVis > 0){
                    return `the lowest visibility will be below 0 km, and the highest will be moderately clear at ${highestVis} km.`
                }
            } 
            
            

            //console.log(fullDay)
            if(i == 0){
                
                const day = document.createElement("div")
                day.classList.add("forecast-each-day")
                day.innerHTML = `
                <span>${daysShort}</span>
                <span class="numbers active">${numbersDays}</span>
                `
                wrapper.appendChild(day)

                //console.log(weatherData)

                const fullDate = document.createElement("div")
                fullDate.classList.add("datepicked")
                fullDate.textContent = fullDay
                WHLE_ELMNT.appendChild(fullDate)
                index.innerHTML = `
                <span>${weatherData.current.vis_km}</span>
                <span >km</span>
                <span class="vis-text">${visibilityText()}</span>

                <div class="dropdown">

                    <div class="select">
                    <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24"><path d="M23.271,9.419C21.72,6.893,18.192,2.655,12,2.655S2.28,6.893.729,9.419a4.908,4.908,0,0,0,0,5.162C2.28,17.107,5.808,21.345,12,21.345s9.72-4.238,11.271-6.764A4.908,4.908,0,0,0,23.271,9.419Zm-1.705,4.115C20.234,15.7,17.219,19.345,12,19.345S3.766,15.7,2.434,13.534a2.918,2.918,0,0,1,0-3.068C3.766,8.3,6.781,4.655,12,4.655s8.234,3.641,9.566,5.811A2.918,2.918,0,0,1,21.566,13.534Z"></path><path d="M12,7a5,5,0,1,0,5,5A5.006,5.006,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z"></path></svg>
                        <svg class="rotated " xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"/></svg>
                    </div>

                    <div class="menu-wrapper">
                        <div class="each-item-menu">
                            <div class="svg-tick">
                                
                            </div>
                            <div>
                                <span>Conditions</span>
                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M0 336c0 79.5 64.5 144 144 144H512c70.7 0 128-57.3 128-128c0-61.9-44-113.6-102.4-125.4c4.1-10.7 6.4-22.4 6.4-34.6c0-53-43-96-96-96c-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32C167.6 32 96 103.6 96 192c0 2.7 .1 5.4 .2 8.1C40.2 219.8 0 273.2 0 336z"></path></svg>
                            </div>
                        </div>
                        <div class="each-item-menu">
                            <div class="svg-tick">
                                
                            </div>
                            <div>
                                <span>UV Index</span>
                                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24"><path d="M12,17c-2.76,0-5-2.24-5-5s2.24-5,5-5,5,2.24,5,5-2.24,5-5,5Zm1-13V1c0-.55-.45-1-1-1s-1,.45-1,1v3c0,.55,.45,1,1,1s1-.45,1-1Zm0,19v-3c0-.55-.45-1-1-1s-1,.45-1,1v3c0,.55,.45,1,1,1s1-.45,1-1ZM5,12c0-.55-.45-1-1-1H1c-.55,0-1,.45-1,1s.45,1,1,1h3c.55,0,1-.45,1-1Zm19,0c0-.55-.45-1-1-1h-3c-.55,0-1,.45-1,1s.45,1,1,1h3c.55,0,1-.45,1-1ZM6.71,6.71c.39-.39,.39-1.02,0-1.41l-2-2c-.39-.39-1.02-.39-1.41,0s-.39,1.02,0,1.41l2,2c.2,.2,.45,.29,.71,.29s.51-.1,.71-.29Zm14,14c.39-.39,.39-1.02,0-1.41l-2-2c-.39-.39-1.02-.39-1.41,0s-.39,1.02,0,1.41l2,2c.2,.2,.45,.29,.71,.29s.51-.1,.71-.29Zm-16,0l2-2c.39-.39,.39-1.02,0-1.41s-1.02-.39-1.41,0l-2,2c-.39,.39-.39,1.02,0,1.41,.2,.2,.45,.29,.71,.29s.51-.1,.71-.29ZM18.71,6.71l2-2c.39-.39,.39-1.02,0-1.41s-1.02-.39-1.41,0l-2,2c-.39,.39-.39,1.02,0,1.41,.2,.2,.45,.29,.71,.29s.51-.1,.71-.29Z"></path></svg>
                            </div>
                        </div>
                        <div class="each-item-menu">
                            <div class="svg-tick"></div>
                            <div>
                                <span>Wind</span>
                                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24"><path d="M0,12a1,1,0,0,1,1-1H7a1,1,0,0,1,0,2H1A1,1,0,0,1,0,12Zm20.886-.893A4.99,4.99,0,1,0,12,8a1,1,0,0,0,2,0,3,3,0,1,1,3,3H11a1,1,0,0,0,0,2h9a2,2,0,0,1,2,2c-.009,2.337-3.281,2.648-4.057.667a1,1,0,0,0-1.886.666C17.615,20.415,23.952,19.579,24,15A4,4,0,0,0,20.886,11.107ZM11,16H1a1,1,0,0,0,0,2H11a2,2,0,0,1,2,2c-.009,2.337-3.281,2.648-4.057.667a1,1,0,1,0-1.886.666C8.615,25.415,14.952,24.579,15,20A4,4,0,0,0,11,16ZM1,8H7a4,4,0,0,0,4-4C10.952-.581,4.613-1.414,3.057,2.667a1,1,0,0,0,1.886.666C5.72,1.351,8.991,1.663,9,4A2,2,0,0,1,7,6H1A1,1,0,0,0,1,8Z"></path></svg>
                        
                            </div>
                        </div>
                        <div class="each-item-menu">
                            <div class="svg-tick"></div>
                            <div>
                                <span>Precipitation</span>
                                <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">

                                    <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)">
                                    <path d="M2413 4898 c-779 -1184 -1258 -2187 -1394 -2918 -26 -137 -36 -428
                                    -20 -553 84 -631 499 -1151 1076 -1345 434 -147 924 -86 1305 159 472 305 750
                                    820 751 1387 0 180 -20 332 -66 522 -147 597 -468 1299 -995 2175 -196 325
                                    -495 785 -511 785 -3 0 -70 -96 -146 -212z"></path>
                                    </g>
                                    </svg>
                            </div>
                        </div>
                        <div class="each-item-menu">
                            <div class="svg-tick"></div>
                            <div>
                                <span>Feels Like</span>
                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M416 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm0 128A96 96 0 1 0 416 0a96 96 0 1 0 0 192zM96 112c0-26.5 21.5-48 48-48s48 21.5 48 48V276.5c0 17.3 7.1 31.9 15.3 42.5C217.8 332.6 224 349.5 224 368c0 44.2-35.8 80-80 80s-80-35.8-80-80c0-18.5 6.2-35.4 16.7-48.9C88.9 308.4 96 293.8 96 276.5V112zM144 0C82.1 0 32 50.2 32 112V276.5c0 .1-.1 .3-.2 .6c-.2 .6-.8 1.6-1.7 2.8C11.2 304.2 0 334.8 0 368c0 79.5 64.5 144 144 144s144-64.5 144-144c0-33.2-11.2-63.8-30.1-88.1c-.9-1.2-1.5-2.2-1.7-2.8c-.1-.3-.2-.5-.2-.6V112C256 50.2 205.9 0 144 0zm0 416c26.5 0 48-21.5 48-48c0-20.9-13.4-38.7-32-45.3V112c0-8.8-7.2-16-16-16s-16 7.2-16 16V322.7c-18.6 6.6-32 24.4-32 45.3c0 26.5 21.5 48 48 48z"></path></svg>
                        
                            </div>
                        </div>
                        <div class="each-item-menu">
                            <div class="svg-tick"></div>
                            
                            <div>
                                <span>Humidity</span>
                                <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
                        
                                    <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)">
                                    <path d="M1866 4785 c-22 -7 -49 -24 -62 -37 -39 -40 -329 -452 -499 -708
                                    -524 -791 -834 -1397 -948 -1850 -28 -113 -31 -140 -32 -285 0 -184 17 -297
                                    72 -470 91 -287 267 -550 492 -737 218 -181 456 -294 736 -350 148 -30 422
                                    -32 570 -4 199 36 431 126 582 225 77 50 108 102 100 169 -9 81 -77 142 -157
                                    142 -35 0 -60 -8 -106 -36 -234 -142 -431 -199 -694 -199 -172 0 -243 11 -396
                                    60 -201 66 -348 157 -505 314 -110 110 -181 206 -241 326 -118 234 -164 517
                                    -119 731 80 384 395 1001 916 1789 196 295 333 490 345 490 19 0 401 -565 595
                                    -880 317 -515 557 -998 633 -1273 19 -66 19 -72 4 -72 -33 0 -118 48 -177 99
                                    -83 72 -219 138 -325 157 -202 38 -404 -18 -565 -156 -78 -68 -146 -99 -238
                                    -109 -41 -5 -88 -16 -104 -26 -97 -57 -103 -201 -11 -267 47 -33 141 -36 249
                                    -9 109 27 193 71 281 144 104 88 163 112 268 112 104 -1 163 -25 260 -109 161
                                    -138 378 -194 585 -151 94 20 214 81 305 156 105 86 144 102 255 103 79 1 97
                                    -2 145 -26 31 -15 85 -53 120 -83 80 -70 201 -130 300 -151 188 -39 295 13
                                    295 144 0 101 -53 148 -182 163 -95 10 -142 32 -233 109 -126 107 -292 170
                                    -445 170 -133 0 -294 -54 -398 -133 -26 -21 -51 -37 -55 -37 -4 0 -18 35 -31
                                    78 -90 311 -364 856 -698 1391 -194 311 -635 957 -712 1045 -39 45 -116 63
                                    -175 41z"></path>
                                    <path d="M4025 4625 c-50 -18 -76 -48 -214 -244 -200 -285 -345 -546 -413
                                    -742 -30 -86 -32 -104 -32 -214 1 -100 5 -132 26 -197 39 -119 92 -204 182
                                    -294 90 -90 175 -143 294 -182 67 -22 94 -26 212 -26 118 0 145 4 212 26 119
                                    39 204 92 294 182 90 90 143 175 182 294 21 65 25 96 26 197 0 131 -13 183
                                    -89 357 -105 238 -466 792 -542 832 -45 23 -94 27 -138 11z m152 -562 c155
                                    -239 246 -409 283 -532 30 -97 23 -170 -25 -267 -42 -86 -102 -144 -193 -187
                                    -61 -29 -76 -32 -162 -32 -86 0 -101 3 -162 32 -91 43 -151 101 -193 187 -48
                                    97 -55 170 -25 267 22 75 82 202 153 324 63 109 218 345 227 345 4 0 48 -62
                                    97 -137z"></path>
                                    <path d="M2380 1725 c-91 -21 -212 -83 -300 -156 -92 -76 -139 -98 -233 -108
                                    -89 -10 -128 -29 -158 -78 -69 -111 14 -243 153 -243 140 1 288 58 418 164
                                    119 96 154 111 265 111 107 0 170 -24 252 -97 258 -230 635 -235 893 -12 99
                                    86 155 109 265 109 110 0 166 -23 265 -109 122 -106 298 -172 437 -164 43 3
                                    71 10 90 24 93 70 96 192 7 261 -26 19 -52 27 -114 34 -97 11 -149 35 -245
                                    114 -277 228 -645 217 -910 -26 -16 -15 -55 -40 -85 -56 -48 -24 -67 -27 -145
                                    -28 -107 0 -166 23 -255 99 -132 114 -264 166 -430 172 -68 2 -128 -2 -170
                                    -11z"></path>
                                    </g>
                                    </svg>
                            </div>
                        </div>
                        <div class="each-item-menu">
                            <div class="svg-tick">
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
                            </div>
                            <div>
                                <span>Visibility</span>
                                <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24"><path d="M23.271,9.419C21.72,6.893,18.192,2.655,12,2.655S2.28,6.893.729,9.419a4.908,4.908,0,0,0,0,5.162C2.28,17.107,5.808,21.345,12,21.345s9.72-4.238,11.271-6.764A4.908,4.908,0,0,0,23.271,9.419Zm-1.705,4.115C20.234,15.7,17.219,19.345,12,19.345S3.766,15.7,2.434,13.534a2.918,2.918,0,0,1,0-3.068C3.766,8.3,6.781,4.655,12,4.655s8.234,3.641,9.566,5.811A2.918,2.918,0,0,1,21.566,13.534Z"></path><path d="M12,7a5,5,0,1,0,5,5A5.006,5.006,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z"></path></svg>
                        
                            </div>
                        </div>
                        <div class="each-item-menu">
                            <div class="svg-tick"></div>
                            
                            <div>
                                <span>Pressure</span>
                                <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
                        
                                    <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)">
                                <path d="M2300 4656 c-386 -53 -721 -190 -1022 -417 -107 -80 -317 -290 -397
                                -397 -703 -931 -529 -2240 392 -2954 366 -283 822 -438 1287 -438 809 1 1539
                                457 1896 1186 350 714 266 1566 -217 2206 -80 107 -290 317 -397 397 -278 210
                                -596 347 -946 407 -124 21 -471 27 -596 10z m100 -445 c0 -144 7 -171 53 -219
                                75 -77 199 -57 246 42 18 36 21 61 21 174 l0 132 28 0 c56 0 219 -33 330 -66
                                202 -61 389 -155 560 -281 l74 -54 -105 -108 c-83 -85 -107 -116 -112 -145
                                -28 -148 127 -250 256 -167 24 16 78 63 119 106 l75 77 28 -34 c54 -63 149
                                -213 199 -312 83 -165 154 -404 174 -583 l7 -63 -150 0 c-139 0 -152 -2 -184
                                -23 -109 -73 -105 -212 7 -267 34 -17 61 -20 183 -20 l144 0 -7 -52 c-23 -173
                                -82 -384 -146 -521 l-32 -67 -1610 2 -1609 3 -34 75 c-65 148 -120 347 -141
                                508 l-7 52 134 0 c112 0 139 3 173 20 117 57 123 215 11 277 -36 20 -54 23
                                -179 23 l-139 0 7 63 c32 285 162 607 349 860 l50 68 96 -94 c107 -105 142
                                -127 201 -127 107 0 183 105 149 207 -8 25 -45 72 -111 139 l-100 102 59 44
                                c128 99 282 186 436 247 130 52 364 108 460 110 l37 1 0 -129z m1522 -2808
                                c-51 -61 -192 -197 -257 -250 -135 -109 -347 -226 -521 -286 -209 -73 -411
                                -102 -648 -94 -342 11 -638 107 -932 302 -110 73 -281 226 -365 326 l-41 49
                                1402 0 1402 0 -40 -47z"></path>
                                <path d="M2505 3609 c-44 -12 -78 -54 -115 -139 -18 -41 -89 -196 -157 -345
                                -170 -368 -177 -390 -178 -540 0 -118 1 -121 37 -199 49 -101 148 -203 240
                                -246 252 -118 552 -18 680 227 45 85 63 171 55 267 -8 91 -35 166 -149 421
                                -50 110 -117 261 -151 335 -74 165 -89 187 -141 211 -44 20 -74 22 -121 8z
                                m110 -641 c91 -193 135 -310 135 -361 0 -77 -48 -152 -113 -176 -69 -26 -174
                                -4 -219 46 -45 50 -60 137 -34 209 24 70 168 384 176 384 4 0 29 -46 55 -102z"></path>
                                </g>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="canvas-holder">
                    <div class="container-for-values" style="width: 426px; gap: 19px;">
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                    </div>
                    <canvas id="canvas" height="340" style="display: block; box-sizing: border-box; height: 272px; width: 476px;" width="595"></canvas>
                </div>
                `
                WHLE_ELMNT.appendChild(index)
                extraText.innerHTML = `
                <span class="timeFORWIND">Daily Summary</span>
                <span class="textForVISIBILITY">Today, ${visibilityHighestLowestTextDETERMINER()}</span>
                `
                WHLE_ELMNT.appendChild(extraText)
                WHLE_ELMNT.appendChild(finalInfo)
                
                continue
            }
            //console.log(daysShort, weatherData.forecast.forecastday[i].day.uv)
            const day = document.createElement("div")
            day.classList.add("forecast-each-day")
            day.innerHTML = `
            <span>${daysShort}</span>
            <span class="numbers">${numbersDays}</span>
            `
            wrapper.appendChild(day)
            
        }   
        
    }
    const eventFunctionVISIBILITY = () =>{
        const elements = document.querySelectorAll(".numbers")
        const fullDate = document.querySelector(".datepicked")
        const index = document.querySelector(".index span")
        const visText = document.querySelector(".vis-text")
        const textForVISIBILITY = document.querySelector(".textForVISIBILITY")

        for(let i = 0; i < elements.length; i++){
            
            const visibilityHighestLowest = () =>{
                let highestVis = weatherData.forecast.forecastday[i].hour[0].vis_km
                let lowestVis = weatherData.forecast.forecastday[i].hour[0].vis_km

                for(let j = 0; j < weatherData.forecast.forecastday[i].hour.length; j++){
                    
                    if(weatherData.forecast.forecastday[i].hour[j].vis_km > highestVis){
                        highestVis = weatherData.forecast.forecastday[i].hour[j].vis_km
                    }

                    if(weatherData.forecast.forecastday[i].hour[j].vis_km < lowestVis){
                        lowestVis = weatherData.forecast.forecastday[i].hour[j].vis_km
                    }
                }

                return [highestVis, lowestVis]
            }

            const visibilityHighestLowestTextDETERMINER = () =>{
                const lowestVis = visibilityHighestLowest()[1]
                const highestVis = visibilityHighestLowest()[0]

                if(lowestVis > 15 && highestVis > 15){
                    return [`the visiblity will be perfectly clear, at ${lowestVis} to ${highestVis} km.`, "Perfectly clear"]
                }else if(lowestVis >= 10 && highestVis > 15){
                    return [`the lowest visibility will be clear at ${lowestVis} km, and the highest will be perfectly clear at ${highestVis} km.`, "Clear to perfectly clear"]
                }else if(lowestVis >= 10 && highestVis >= 10){
                    return [`the visibility will be clear, at ${lowestVis} and ${highestVis} km.`, "Clear"]
                }else if(lowestVis > 0 && highestVis > 15){
                    return [`the lowest visibility will be moderately clear at ${lowestVis} km, and the highest will be perfectly clear at ${highestVis} km.`, "Moderate to perfectly clear"]
                }else if(lowestVis > 0 && highestVis >= 10){
                    return [`the lowest visibility will be moderately clear at ${lowestVis} km, and the highest will be clear at ${highestVis} km.`, "Moderate to clear"]
                }else if (lowestVis > 0 && highestVis > 0){
                    return [`the visibility will be moderately clear, at ${lowestVis} and ${highestVis} km.`, "Moderately clear"]
                }else if(lowestVis == 0 && highestVis >= 10) {
                    return [`the lowest visibility will be below 0 km, and the highest will be clear at ${highestVis} km.`, `Unclear to clear`]
                }else if(lowestVis == 0 && highestVis > 0){
                    return [`the lowest visibility will be below 0 km, and the highest will be moderately clear at ${highestVis} km.`, `Unclear to moderately clear`]
                }
            }

            let days = new Date(weatherData.forecast.forecastday[i].date)
                let fullDay = days.toLocaleDateString("default", {weekday: "long", day: "2-digit", month: "long", "year": "numeric"})
                elements[i].addEventListener("click", ()=>{
                elements.forEach(element =>{
                    element.classList.remove("active")
                })

                elements[0].addEventListener("click", ()=>{
                    mainFunctionVISIBILITY()
                })
                let weekday = days.toLocaleDateString("default", {weekday: "long"})

                
                visText.textContent = visibilityHighestLowestTextDETERMINER()[1]
                textForVISIBILITY.textContent = `On ${weekday}, ${visibilityHighestLowestTextDETERMINER()[0]}`
                index.textContent = `${visibilityHighestLowest()[1]} to ${visibilityHighestLowest()[0]}`
                fullDate.textContent = fullDay
                elements[i].classList.add("active")

                const CANVAS_HOLDER = document.querySelector(".canvas-holder")
                CANVAS_HOLDER.innerHTML = `
                
                <div class="container-for-values" style="width: 426px; gap: 19px;">
                    <div class="value-hrs"></div>
                    <div class="value-hrs"></div>
                    <div class="value-hrs"></div>
                    <div class="value-hrs"></div>
                    <div class="value-hrs"></div>
                    <div class="value-hrs"></div>
                    <div class="value-hrs"></div>
                    <div class="value-hrs"></div>
                    <div class="value-hrs"></div>
                    <div class="value-hrs"></div>
                    <div class="value-hrs"></div>
                    <div class="value-hrs"></div>
                </div>
                <canvas id="canvas" height="340" style="display: block; box-sizing: border-box; height: 272px; width: 476px;" width="595"></canvas>
            
                `
                const VisibilityChartFunction = () =>{
                    const hoursArray = []
            
                    for(let i = 0; i < 24; i++){
                        hoursArray.push(i)
                    }
            
                    //the index at which the change will occur
                    let labelToChange = new Date(weatherData.current.last_updated).getHours()
            
            
                    //when will the line be dashed and stright
                    const dash = (ctx) => {
                        //console.log(ctx.p0DataIndex)
                        if(ctx.p0DataIndex < labelToChange){
                            return [8, 10]
                        }
                    }
            
                    let ctx = document.querySelector("#canvas").getContext("2d")
            
                    const visibilityData = () =>{
                        const visibilityArray = []
                        for(let d = 0; d < weatherData.forecast.forecastday[i].hour.length; d++){
                            visibilityArray.push(weatherData.forecast.forecastday[i].hour[d].vis_km)
                        }
                
                        return visibilityArray
                    }

                    const canvasElement = document.querySelector(".canvas-holder")
                    const invisibleOverlay = document.createElement("div")
                    invisibleOverlay.classList.add("blank-overlay")
                    canvasElement.appendChild(invisibleOverlay)
            
                    const gradient = window['chartjs-plugin-gradient'];
            
                    const container = document.querySelector(".container-for-values")
                    container.style.width = `418.7px`
                    //container.classList.add("visibilityAdj")
                    //putting a value into the html element
                    const all = document.querySelectorAll(".value-hrs")
            
                    all[0].textContent = visibilityData()[0]
                    all[1].textContent = visibilityData()[2]
                    all[2].textContent = visibilityData()[4]
                    all[3].textContent = visibilityData()[6]
                    all[4].textContent = visibilityData()[8]
                    all[5].textContent = visibilityData()[10]
                    all[6].textContent = visibilityData()[12]
                    all[7].textContent = visibilityData()[14]
                    all[8].textContent = visibilityData()[16]
                    all[9].textContent = visibilityData()[18]
                    all[10].textContent = visibilityData()[20]
                    all[11].textContent = visibilityData()[22]
                    
                    //data block
                    const chartData = {
                        labels: hoursArray,
                        datasets: [{
                            label: "",
                            data: visibilityData(),
                            segment: {
                                //borderDash: ctx => dash(ctx),
                            },
                            
                            borderWidth: 6.5,
                            borderColor: "#fafafa",
                            pointBackgroundColor: "transparent",
                            pointBorderColor: "transparent",
                            borderCapStyle: 'round',
                            clip: {
                                left: 0,
                                right: 0,
                                top: false,
                                bottom: false
                            },
                            tension: 0.2,
                            fill: true,
                            gradient: {
                                backgroundColor: {
                                  axis: 'y',
                                  colors: {
                                    0: 'rgba(156, 156, 156, 0.3)',
                                    4: "rgba(144, 144, 144, 0.3)",
                                    6: "rgba(127, 127, 127, 0.3)",
                                    8: "rgba(104, 104, 104, 0.3)",
                                    10: "rgba(85, 85, 85, 0.3)",
                                    12: "rgba(60, 60, 60, 0.3)"
                                  }
                                },
                            }
                        }]
                    }
                
                    const plugin = {
                        id: 'customCanvasBackgroundColor',
                        beforeDraw: (chart, args, options) => {
                        const {ctx} = chart;
                        ctx.save();
                        ctx.globalCompositeOperation = 'destination-over';
                        ctx.fillStyle = options.color
                        ctx.fillRect(0, 0, chart.width, chart.height);
                        ctx.restore();
                        
                        }
                    };
                
                    //console.log(Math.max(...windData()[1]) + 10)
                
                    //config block
                    const config = {
                        type: "line",
                        data: chartData,  
                        options: {
                            aspectRatio: 7/4,
                            responsive: true,
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    suggestedMax: 20,
                                    grid: {
                                        drawTicks: false,
                                        display: true,
                                        drawOnChartArea: true,
                                        color: "#302F32"
                                    },
                                    border: {
                                        display: true,
                                        color: "#302F32"
                                    },
                                    ticks: {
                                        color: "#9D9D9E",
                                        padding: 15,
                                        align: "center",
                                        crossAlign: "center",
                                        font: {
                                            size: 13,
                                            weight: 400
                                        },
                                        callback: function(value){
                                            if(value == 0 ){
                                                return `${value} km`
                                            }else {
                                                return value
                                            }
                                        }
                                    },
                                    position: "right"
                                },
                
                                x: {
                                    border: {
                                        display: false,
                                        dash: [2, 2],
                                        
                                    },
                                    grid: {
                                        display: true,
                                        drawOnChartArea: true,
                                        drawTicks: false,
                                        color: "#302F32"
                                    },
                
                                    ticks: {
                                        color: "#9D9D9E",
                                        maxTicksLimit: 4,
                                        padding: 5,
                                        align: "start",
                                        crossAlign: "near",
                                        font: {
                                            size: 15,
                                            weight: 400
                                        },

                                    }
                                },
                
                                
                            },
                            plugins: {
                                customCanvasBackgroundColor: {
                                    color: "#202023"
                                },
                                legend: {
                                    display: false
                                },
                                autocolors: false,
                                annotation: {
                                    
                                    annotations: {
                                        
                                        
                                    },
                                    clip: false
                                } 
                            },
                            
                            
                                
                            
                            
                        },
                        plugins: [plugin, gradient]
                    }
                
                    const visibilityChart = new Chart(ctx, config)
                }
                VisibilityChartFunction()
            })
        }
    }

    const mainFunctionVISIBILITY = () =>{
        createElementVISIBILITY()
        eventFunctionVISIBILITY()

        //VISIBILITY DEPLOYED HERE
        const VisibilityChartFunction = () =>{
            const hoursArray = []
    
            for(let i = 0; i < 24; i++){
                hoursArray.push(i)
            }
    
            //the index at which the change will occur
            let labelToChange = new Date(weatherData.current.last_updated).getHours()
    
    
            //when will the line be dashed and stright
            const dash = (ctx) => {
                //console.log(ctx.p0DataIndex)
                if(ctx.p0DataIndex < labelToChange){
                    return [8, 10]
                }
            }
    
            let ctx = document.querySelector("#canvas").getContext("2d")

            const canvasElement = document.querySelector(".canvas-holder")
            const chartOverlay = document.createElement("div")
            chartOverlay.classList.add("time-passed-overlay")

            
                    const invisibleOverlay = document.createElement("div")
                    invisibleOverlay.classList.add("blank-overlay")
                    canvasElement.appendChild(invisibleOverlay)

            const lineDivider = document.createElement("div")
            lineDivider.classList.add("line-divider")
            chartOverlay.appendChild(lineDivider)
            
            canvasElement.appendChild(chartOverlay)
    
            const overlayStyle = () =>{
                if(labelToChange == 0){
                    chartOverlay.style.width = `8px`
                      
                }else if(labelToChange == 1){
                    chartOverlay.style.width = `26px`
                    
                }else if(labelToChange == 2){
                    chartOverlay.style.width = `45px`
                    
                }else if(labelToChange == 3){
                    chartOverlay.style.width = `62px`
                    
                }else if(labelToChange == 4){
                    chartOverlay.style.width = `78px`
                    
                }else if(labelToChange == 5){
                    chartOverlay.style.width = `97px`
                    
                }else if(labelToChange == 6){
                    chartOverlay.style.width = `115px`
                    
                }else if(labelToChange == 7){
                    chartOverlay.style.width = `133px`
                    
                }else if(labelToChange == 8){
                    chartOverlay.style.width = `150px`
                    
                }else if(labelToChange == 9){
    
                    chartOverlay.style.width = `168px`
                    
                }else if(labelToChange == 10){
                    chartOverlay.style.width = `185px`
                    
                }else if(labelToChange == 11){
                    chartOverlay.style.width = `203px`
                    
                }else if(labelToChange == 12){
                    chartOverlay.style.width = `221px`
                    
                }else if(labelToChange == 13){
                    chartOverlay.style.width = `239px`
                    
                }else if(labelToChange == 14){
                    chartOverlay.style.width = `257px`
                    
                }else if(labelToChange == 15){
                    chartOverlay.style.width = `274px`
                    
                }else if(labelToChange == 16){
                    chartOverlay.style.width = `292px`
                    
                }else if(labelToChange == 17){
                    chartOverlay.style.width = `310px`
                    
                }else if(labelToChange == 18){
                    chartOverlay.style.width = `327px`
                    
                }else if(labelToChange == 19){
                    chartOverlay.style.width = `345px`
                    
                }else if(labelToChange == 20){
                    chartOverlay.style.width = `363px`
                    
                }else if(labelToChange == 21){
                    chartOverlay.style.width = `380px`
                    
                }else if(labelToChange == 22){
                    chartOverlay.style.width = `398px`
                    
                }else if(labelToChange == 23){
                    chartOverlay.style.width = `416px`
                    
                }
    
                lineDivider.style.left = chartOverlay.style.width 
            }
            overlayStyle()
    
            const visibilityData = () =>{
                const visibilityArray = []
                for(let i = 0; i < weatherData.forecast.forecastday[0].hour.length; i++){
                    visibilityArray.push(weatherData.forecast.forecastday[0].hour[i].vis_km)
                }
        
                return visibilityArray
            }
    
            const gradient = window['chartjs-plugin-gradient'];
    
            const container = document.querySelector(".container-for-values")
            container.style.width = `418.7px`
            //container.classList.add("visibilityAdj")
            //putting a value into the html element
            const all = document.querySelectorAll(".value-hrs")
    
            all[0].textContent = visibilityData()[0]
            all[1].textContent = visibilityData()[2]
            all[2].textContent = visibilityData()[4]
            all[3].textContent = visibilityData()[6]
            all[4].textContent = visibilityData()[8]
            all[5].textContent = visibilityData()[10]
            all[6].textContent = visibilityData()[12]
            all[7].textContent = visibilityData()[14]
            all[8].textContent = visibilityData()[16]
            all[9].textContent = visibilityData()[18]
            all[10].textContent = visibilityData()[20]
            all[11].textContent = visibilityData()[22]
            
            //data block
            const chartData = {
                labels: hoursArray,
                datasets: [{
                    label: "",
                    data: visibilityData(),
                    segment: {
                        borderDash: ctx => dash(ctx),
                    },
                    
                    borderWidth: 6.5,
                    borderColor: "#fafafa",
                    pointBackgroundColor: "transparent",
                    pointBorderColor: "transparent",
                    borderCapStyle: 'round',
                    clip: {
                        left: 0,
                        right: 0,
                        top: false,
                        bottom: false
                    },
                    tension: 0.2,
                    fill: true,
                    gradient: {
                        backgroundColor: {
                          axis: 'y',
                          colors: {
                            0: 'rgba(156, 156, 156, 0.3)',
                            4: "rgba(144, 144, 144, 0.3)",
                            6: "rgba(127, 127, 127, 0.3)",
                            8: "rgba(104, 104, 104, 0.3)",
                            10: "rgba(85, 85, 85, 0.3)",
                            12: "rgba(60, 60, 60, 0.3)"
                          }
                        },
                    }
                }]
            }
        
            const plugin = {
                id: 'customCanvasBackgroundColor',
                beforeDraw: (chart, args, options) => {
                const {ctx} = chart;
                ctx.save();
                ctx.globalCompositeOperation = 'destination-over';
                ctx.fillStyle = options.color
                ctx.fillRect(0, 0, chart.width, chart.height);
                ctx.restore();
                
                }
            };
        
            //console.log(Math.max(...windData()[1]) + 10)
        
            //config block
            const config = {
                type: "line",
                data: chartData,  
                options: {
                    aspectRatio: 7/4,
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                            suggestedMax: 20,
                            grid: {
                                drawTicks: false,
                                display: true,
                                drawOnChartArea: true,
                                color: "#302F32"
                            },
                            border: {
                                display: true,
                                color: "#302F32"
                            },
                            ticks: {
                                color: "#9D9D9E",
                                padding: 15,
                                align: "center",
                                crossAlign: "center",
                                font: {
                                    size: 13,
                                    weight: 400
                                },
                                callback: function(value){
                                    if(value == 0 ){
                                        return `${value} km`
                                    }else {
                                        return value
                                    }
                                }
                            },
                            position: "right"
                        },
        
                        x: {
                            border: {
                                display: false,
                                dash: [2, 2],
                                
                            },
                            grid: {
                                display: true,
                                drawOnChartArea: true,
                                drawTicks: false,
                                color: "#302F32"
                            },
        
                            ticks: {
                                color: "#9D9D9E",
                                maxTicksLimit: 4,
                                padding: 5,
                                align: "start",
                                crossAlign: "near",
                                font: {
                                    size: 15,
                                    weight: 400
                                }
                            }
                        },
        
                        
                    },
                    plugins: {
                        customCanvasBackgroundColor: {
                            color: "#202023"
                        },
                        legend: {
                            display: false
                        },
                        autocolors: false,
                        annotation: {
                            
                            annotations: {
                                
                                point2: {
                                    type: "point",
                                    xValue: labelToChange,
                                    yValue: visibilityData()[labelToChange],
                                    backgroundColor: "#fafafa",
                                    borderWidth: 4,
                                    borderColor: "black",
                                    radius: 5.5,
                                    
                                }
                            },
                            clip: false
                        } 
                    },
                    
                    
                        
                    
                    
                },
                plugins: [plugin, gradient]
            }
        
            const visibilityChart = new Chart(ctx, config)
        }
        VisibilityChartFunction()

        const wrapper = document.querySelector(".forecast-days-wrap")

        let mouseDown = false //will change if mouse is clicked

        const dragging = (e)=>{
            if(!mouseDown){ //if the mouse isnt click this will not run
                return
            }
            wrapper.style.cursor = `grabbing` //styling for the cursor
            e.preventDefault() //preventing default behaviour
            wrapper.scrollLeft -= e.movementX //the scroll movement
        }

        wrapper.addEventListener("mousedown", ()=>{
            mouseDown = true //when the mouse is down change the variable value
            wrapper.style.cursor = `grabbing`
        })
        wrapper.addEventListener("mousemove", dragging) //when the mouse moves run the function

        wrapper.addEventListener("mouseup", ()=>{
            mouseDown = false //mouse is no longer clicked
            wrapper.style.cursor = `grab`
        })
        wrapper.addEventListener("mouseleave", ()=>{
            mouseDown = false //mouse leaves the element
            wrapper.style.cursor = `grab`
        })

        const selectDropdown = document.querySelector(".select")
        const littleCaret = document.querySelector(".rotated")
        let elementActive = false 
        const menuItemspWrapper = document.querySelector(".menu-wrapper")
        const eachItemMenu = document.querySelectorAll(".each-item-menu")
        const divWithTick = document.querySelectorAll(".svg-tick")

        

        eachItemMenu[0].addEventListener("click", ()=>{
            mainFunctionForecast()
            
        })

        eachItemMenu[1].addEventListener("click", ()=>{
            mainFunction()
        
        })

        eachItemMenu[2].addEventListener("click", ()=>{
            mainFunctionFORWIND()
        
        })

        eachItemMenu[3].addEventListener("click", ()=>{
            mainFunctionRAIN()
        
        })

        eachItemMenu[4].addEventListener("click", ()=>{
            mainFunctionFEELSLIKE()
            
        })

        eachItemMenu[5].addEventListener("click", ()=>{
            mainFunctionHUMIDITY()
        
        })

        eachItemMenu[6].addEventListener("click", ()=>{
            mainFunctionVISIBILITY()
        
        })

        eachItemMenu[7].addEventListener("click", ()=>{
            mainFunctionPRESSURE()
        
        })
        
    

        const functionForDropdownActivation = (e) =>{
            if(!elementActive){
                selectDropdown.style.backgroundColor = '#515154'
                littleCaret.classList.add("true")
                menuItemspWrapper.style.display = 'block'
                menuItemspWrapper.style.height = `auto`
            }else{
                selectDropdown.style.backgroundColor = '#3A3A3D'
                littleCaret.classList.remove("true")
                menuItemspWrapper.style.display = 'none'
                menuItemspWrapper.style.height = `0`
            }

            elementActive = !elementActive
            e.stopPropagation()
        }
        
        const clickAnywhereElse = () =>{
            if(elementActive){
                selectDropdown.style.backgroundColor = '#3A3A3D'
                elementActive = false
                littleCaret.classList.remove("true")
                menuItemspWrapper.style.display = 'none'
                menuItemspWrapper.style.height = `0`
            }
        }

        selectDropdown.addEventListener("click", functionForDropdownActivation)

        document.body.addEventListener("click", clickAnywhereElse)
    }

    const divVISIBILITY = document.querySelector(".visibility")
    divVISIBILITY.addEventListener("click", ()=>{
        mainFunctionVISIBILITY()
        const addInfo = document.querySelector(".additional-info")
        ADVANCED_DATA_OVERLAY.style.display = 'flex'
        
        body.style.overflow = "hidden"
    })


    //PRESSURE DATA
    const createElementPRESSURE = () =>{
        //const wrapper = document.querySelector(".forecast-days-wrap")
        //const WHLE_ELMNT = document.querySelector(".advanced-data")
        const PARENT_ELEMENT = document.querySelector(".additional-info")
        PARENT_ELEMENT.innerHTML = ` `
        const headline = document.createElement("div")
        headline.classList.add("headline")
        headline.innerHTML = `
        <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
           
            <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)">
           <path d="M2300 4656 c-386 -53 -721 -190 -1022 -417 -107 -80 -317 -290 -397
           -397 -703 -931 -529 -2240 392 -2954 366 -283 822 -438 1287 -438 809 1 1539
           457 1896 1186 350 714 266 1566 -217 2206 -80 107 -290 317 -397 397 -278 210
           -596 347 -946 407 -124 21 -471 27 -596 10z m100 -445 c0 -144 7 -171 53 -219
           75 -77 199 -57 246 42 18 36 21 61 21 174 l0 132 28 0 c56 0 219 -33 330 -66
           202 -61 389 -155 560 -281 l74 -54 -105 -108 c-83 -85 -107 -116 -112 -145
           -28 -148 127 -250 256 -167 24 16 78 63 119 106 l75 77 28 -34 c54 -63 149
           -213 199 -312 83 -165 154 -404 174 -583 l7 -63 -150 0 c-139 0 -152 -2 -184
           -23 -109 -73 -105 -212 7 -267 34 -17 61 -20 183 -20 l144 0 -7 -52 c-23 -173
           -82 -384 -146 -521 l-32 -67 -1610 2 -1609 3 -34 75 c-65 148 -120 347 -141
           508 l-7 52 134 0 c112 0 139 3 173 20 117 57 123 215 11 277 -36 20 -54 23
           -179 23 l-139 0 7 63 c32 285 162 607 349 860 l50 68 96 -94 c107 -105 142
           -127 201 -127 107 0 183 105 149 207 -8 25 -45 72 -111 139 l-100 102 59 44
           c128 99 282 186 436 247 130 52 364 108 460 110 l37 1 0 -129z m1522 -2808
           c-51 -61 -192 -197 -257 -250 -135 -109 -347 -226 -521 -286 -209 -73 -411
           -102 -648 -94 -342 11 -638 107 -932 302 -110 73 -281 226 -365 326 l-41 49
           1402 0 1402 0 -40 -47z"></path>
           <path d="M2505 3609 c-44 -12 -78 -54 -115 -139 -18 -41 -89 -196 -157 -345
           -170 -368 -177 -390 -178 -540 0 -118 1 -121 37 -199 49 -101 148 -203 240
           -246 252 -118 552 -18 680 227 45 85 63 171 55 267 -8 91 -35 166 -149 421
           -50 110 -117 261 -151 335 -74 165 -89 187 -141 211 -44 20 -74 22 -121 8z
           m110 -641 c91 -193 135 -310 135 -361 0 -77 -48 -152 -113 -176 -69 -26 -174
           -4 -219 46 -45 50 -60 137 -34 209 24 70 168 384 176 384 4 0 29 -46 55 -102z"></path>
           </g>
           </svg>
        <span>Pressure</span>
        `
        const closeX = document.createElement("div")
        closeX.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
        ` 
        headline.appendChild(closeX)
        PARENT_ELEMENT.appendChild(headline)

        closeX.addEventListener("click", ()=>{
            PARENT_ELEMENT.innerHTML = ``
            ADVANCED_DATA_OVERLAY.style.display = "none"
            body.style.overflow = "auto"
        })

        PARENT_ELEMENT.style.marginTop = `8.5rem`
        
        
        const WHLE_ELMNT = document.createElement("div")
        WHLE_ELMNT.classList.add("advanced-data")
        PARENT_ELEMENT.appendChild(WHLE_ELMNT)
        WHLE_ELMNT.innerHTML = ``
        const wrapper = document.createElement("div")
        wrapper.classList.add("forecast-days-wrap")
        const index = document.createElement("div")
        index.classList.add("index")
        const extraText = document.createElement("div")
        extraText.classList.add("extra-text")
        WHLE_ELMNT.appendChild(wrapper)
        const finalInfo = document.createElement("div")
        finalInfo.classList.add("final-info")
        finalInfo.innerHTML = `
        <span>About Pressure</span>
        <span>Significant, rapid changes in pressure are used to predict changes in the weather. For example, a drop in pressure can mean that rain or snow is on the way, and rising pressure can mean that weather will improve. Pressure is also called barometric pressure or atmospheric pressure.</span>
        `
        
        const todaysPressure = () =>{
            let timeRightNow = new Date(weatherData.current.last_updated).getHours()

            for(let j = 0; j < weatherData.forecast.forecastday[0].hour.length; j++){
                

                if(weatherData.forecast.forecastday[0].hour[j].time.slice("11", "13") == timeRightNow){
                    
                    let isError = false

                    try {
                        if(weatherData.forecast.forecastday[0].hour[j].pressure_mb > weatherData.forecast.forecastday[0].hour[j + 1].pressure_mb){
                            return 'Falling'
                        }else if(weatherData.forecast.forecastday[0].hour[j].pressure_mb < weatherData.forecast.forecastday[0].hour[j + 1].pressure_mb){
                            return 'Rising'
                        }else if(weatherData.forecast.forecastday[0].hour[j].pressure_mb == weatherData.forecast.forecastday[0].hour[j + 1].pressure_mb){
                            return 'Steady'
                        }
                    } catch (error) {
                        isError = true 
                        //console.log(weatherData)
                    } finally {
                        if (isError){
                            if(weatherData.forecast.forecastday[0].hour[j].pressure_mb > weatherData.forecast.forecastday[1].hour[0].pressure_mb){
                                return 'Falling'
                            }else if(weatherData.forecast.forecastday[0].hour[j].pressure_mb < weatherData.forecast.forecastday[1].hour[0].pressure_mb){
                                return 'Rising'
                            }else if(weatherData.forecast.forecastday[0].hour[j].pressure_mb == weatherData.forecast.forecastday[1].hour[0].pressure_mb){
                                return 'Steady'
                            }
                        }
                    }
                }
            }
        }

        const lowestHighestPressure = () =>{
            let lowestPressure = weatherData.forecast.forecastday[0].hour[0].pressure_mb
            let highestPressure = weatherData.forecast.forecastday[0].hour[0].pressure_mb
            for(let j = 0; j < weatherData.forecast.forecastday[0].hour.length; j++){
                //console.log(weatherData.forecast.forecastday[0].hour[j].pressure_mb)

                if(weatherData.forecast.forecastday[0].hour[j].pressure_mb > highestPressure){
                    highestPressure = weatherData.forecast.forecastday[0].hour[j].pressure_mb
            
                }

                if(weatherData.forecast.forecastday[0].hour[j].pressure_mb < lowestPressure){
                    lowestPressure = weatherData.forecast.forecastday[0].hour[j].pressure_mb
                
                }
            }
            return [lowestPressure, highestPressure]
        }
        //console.log(lowestHighestPressure())


        const averagePressure = () =>{
            let pressure = 0

            for(let j = 0; j < weatherData.forecast.forecastday[0].hour.length; j++){
                pressure += weatherData.forecast.forecastday[0].hour[j].pressure_mb
            }

            return Math.round(pressure / 24)
        }
        //console.log(averagePressure())


        for(let i = 0; i < weatherData.forecast.forecastday.length; i++){
            let days = new Date(weatherData.forecast.forecastday[i].date)
            let daysShort = days.toLocaleDateString("default", {"weekday": "narrow"})
            let fullDay = days.toLocaleDateString("default", {weekday: "long", day: "2-digit", month: "long", "year": "numeric"})
            let numbersDays = days.toLocaleDateString("default", {day: "2-digit"})
            let currentHour = new Date(weatherData.current.last_updated).getHours()
            let sunsetToday = Number(weatherData.forecast.forecastday[i].astro.sunset.slice("0", "2")) + 12
            

            //console.log(fullDay)
            if(i == 0){
                
                const day = document.createElement("div")
                day.classList.add("forecast-each-day")
                day.innerHTML = `
                <span>${daysShort}</span>
                <span class="numbers active">${numbersDays}</span>
                `
                wrapper.appendChild(day)

                //console.log(weatherData)

                const fullDate = document.createElement("div")
                fullDate.classList.add("datepicked")
                fullDate.textContent = fullDay
                WHLE_ELMNT.appendChild(fullDate)
                index.innerHTML = `
                <span>${weatherData.current.pressure_mb}</span>
                <span >hPa</span>
                <span class="vis-text">${todaysPressure()}</span>

                <div class="dropdown">

                    <div class="select">
                    <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
                        
                    <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)">
                <path d="M2300 4656 c-386 -53 -721 -190 -1022 -417 -107 -80 -317 -290 -397
                -397 -703 -931 -529 -2240 392 -2954 366 -283 822 -438 1287 -438 809 1 1539
                457 1896 1186 350 714 266 1566 -217 2206 -80 107 -290 317 -397 397 -278 210
                -596 347 -946 407 -124 21 -471 27 -596 10z m100 -445 c0 -144 7 -171 53 -219
                75 -77 199 -57 246 42 18 36 21 61 21 174 l0 132 28 0 c56 0 219 -33 330 -66
                202 -61 389 -155 560 -281 l74 -54 -105 -108 c-83 -85 -107 -116 -112 -145
                -28 -148 127 -250 256 -167 24 16 78 63 119 106 l75 77 28 -34 c54 -63 149
                -213 199 -312 83 -165 154 -404 174 -583 l7 -63 -150 0 c-139 0 -152 -2 -184
                -23 -109 -73 -105 -212 7 -267 34 -17 61 -20 183 -20 l144 0 -7 -52 c-23 -173
                -82 -384 -146 -521 l-32 -67 -1610 2 -1609 3 -34 75 c-65 148 -120 347 -141
                508 l-7 52 134 0 c112 0 139 3 173 20 117 57 123 215 11 277 -36 20 -54 23
                -179 23 l-139 0 7 63 c32 285 162 607 349 860 l50 68 96 -94 c107 -105 142
                -127 201 -127 107 0 183 105 149 207 -8 25 -45 72 -111 139 l-100 102 59 44
                c128 99 282 186 436 247 130 52 364 108 460 110 l37 1 0 -129z m1522 -2808
                c-51 -61 -192 -197 -257 -250 -135 -109 -347 -226 -521 -286 -209 -73 -411
                -102 -648 -94 -342 11 -638 107 -932 302 -110 73 -281 226 -365 326 l-41 49
                1402 0 1402 0 -40 -47z"></path>
                <path d="M2505 3609 c-44 -12 -78 -54 -115 -139 -18 -41 -89 -196 -157 -345
                -170 -368 -177 -390 -178 -540 0 -118 1 -121 37 -199 49 -101 148 -203 240
                -246 252 -118 552 -18 680 227 45 85 63 171 55 267 -8 91 -35 166 -149 421
                -50 110 -117 261 -151 335 -74 165 -89 187 -141 211 -44 20 -74 22 -121 8z
                m110 -641 c91 -193 135 -310 135 -361 0 -77 -48 -152 -113 -176 -69 -26 -174
                -4 -219 46 -45 50 -60 137 -34 209 24 70 168 384 176 384 4 0 29 -46 55 -102z"></path>
                </g>
                </svg>
                        <svg class="rotated " xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"/></svg>
                    </div>

                    <div class="menu-wrapper">
                        <div class="each-item-menu">
                            <div class="svg-tick">
                                
                            </div>
                            <div>
                                <span>Conditions</span>
                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M0 336c0 79.5 64.5 144 144 144H512c70.7 0 128-57.3 128-128c0-61.9-44-113.6-102.4-125.4c4.1-10.7 6.4-22.4 6.4-34.6c0-53-43-96-96-96c-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32C167.6 32 96 103.6 96 192c0 2.7 .1 5.4 .2 8.1C40.2 219.8 0 273.2 0 336z"></path></svg>
                            </div>
                        </div>
                        <div class="each-item-menu">
                            <div class="svg-tick">
                                
                            </div>
                            <div>
                                <span>UV Index</span>
                                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24"><path d="M12,17c-2.76,0-5-2.24-5-5s2.24-5,5-5,5,2.24,5,5-2.24,5-5,5Zm1-13V1c0-.55-.45-1-1-1s-1,.45-1,1v3c0,.55,.45,1,1,1s1-.45,1-1Zm0,19v-3c0-.55-.45-1-1-1s-1,.45-1,1v3c0,.55,.45,1,1,1s1-.45,1-1ZM5,12c0-.55-.45-1-1-1H1c-.55,0-1,.45-1,1s.45,1,1,1h3c.55,0,1-.45,1-1Zm19,0c0-.55-.45-1-1-1h-3c-.55,0-1,.45-1,1s.45,1,1,1h3c.55,0,1-.45,1-1ZM6.71,6.71c.39-.39,.39-1.02,0-1.41l-2-2c-.39-.39-1.02-.39-1.41,0s-.39,1.02,0,1.41l2,2c.2,.2,.45,.29,.71,.29s.51-.1,.71-.29Zm14,14c.39-.39,.39-1.02,0-1.41l-2-2c-.39-.39-1.02-.39-1.41,0s-.39,1.02,0,1.41l2,2c.2,.2,.45,.29,.71,.29s.51-.1,.71-.29Zm-16,0l2-2c.39-.39,.39-1.02,0-1.41s-1.02-.39-1.41,0l-2,2c-.39,.39-.39,1.02,0,1.41,.2,.2,.45,.29,.71,.29s.51-.1,.71-.29ZM18.71,6.71l2-2c.39-.39,.39-1.02,0-1.41s-1.02-.39-1.41,0l-2,2c-.39,.39-.39,1.02,0,1.41,.2,.2,.45,.29,.71,.29s.51-.1,.71-.29Z"></path></svg>
                            </div>
                        </div>
                        <div class="each-item-menu">
                            <div class="svg-tick"></div>
                            <div>
                                <span>Wind</span>
                                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24"><path d="M0,12a1,1,0,0,1,1-1H7a1,1,0,0,1,0,2H1A1,1,0,0,1,0,12Zm20.886-.893A4.99,4.99,0,1,0,12,8a1,1,0,0,0,2,0,3,3,0,1,1,3,3H11a1,1,0,0,0,0,2h9a2,2,0,0,1,2,2c-.009,2.337-3.281,2.648-4.057.667a1,1,0,0,0-1.886.666C17.615,20.415,23.952,19.579,24,15A4,4,0,0,0,20.886,11.107ZM11,16H1a1,1,0,0,0,0,2H11a2,2,0,0,1,2,2c-.009,2.337-3.281,2.648-4.057.667a1,1,0,1,0-1.886.666C8.615,25.415,14.952,24.579,15,20A4,4,0,0,0,11,16ZM1,8H7a4,4,0,0,0,4-4C10.952-.581,4.613-1.414,3.057,2.667a1,1,0,0,0,1.886.666C5.72,1.351,8.991,1.663,9,4A2,2,0,0,1,7,6H1A1,1,0,0,0,1,8Z"></path></svg>
                        
                            </div>
                        </div>
                        <div class="each-item-menu">
                            <div class="svg-tick"></div>
                            <div>
                                <span>Precipitation</span>
                                <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">

                                    <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)">
                                    <path d="M2413 4898 c-779 -1184 -1258 -2187 -1394 -2918 -26 -137 -36 -428
                                    -20 -553 84 -631 499 -1151 1076 -1345 434 -147 924 -86 1305 159 472 305 750
                                    820 751 1387 0 180 -20 332 -66 522 -147 597 -468 1299 -995 2175 -196 325
                                    -495 785 -511 785 -3 0 -70 -96 -146 -212z"></path>
                                    </g>
                                    </svg>
                            </div>
                        </div>
                        <div class="each-item-menu">
                            <div class="svg-tick"></div>
                            <div>
                                <span>Feels Like</span>
                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M416 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm0 128A96 96 0 1 0 416 0a96 96 0 1 0 0 192zM96 112c0-26.5 21.5-48 48-48s48 21.5 48 48V276.5c0 17.3 7.1 31.9 15.3 42.5C217.8 332.6 224 349.5 224 368c0 44.2-35.8 80-80 80s-80-35.8-80-80c0-18.5 6.2-35.4 16.7-48.9C88.9 308.4 96 293.8 96 276.5V112zM144 0C82.1 0 32 50.2 32 112V276.5c0 .1-.1 .3-.2 .6c-.2 .6-.8 1.6-1.7 2.8C11.2 304.2 0 334.8 0 368c0 79.5 64.5 144 144 144s144-64.5 144-144c0-33.2-11.2-63.8-30.1-88.1c-.9-1.2-1.5-2.2-1.7-2.8c-.1-.3-.2-.5-.2-.6V112C256 50.2 205.9 0 144 0zm0 416c26.5 0 48-21.5 48-48c0-20.9-13.4-38.7-32-45.3V112c0-8.8-7.2-16-16-16s-16 7.2-16 16V322.7c-18.6 6.6-32 24.4-32 45.3c0 26.5 21.5 48 48 48z"></path></svg>
                        
                            </div>
                        </div>
                        <div class="each-item-menu">
                            <div class="svg-tick"></div>
                            
                            <div>
                                <span>Humidity</span>
                                <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
                        
                                    <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)">
                                    <path d="M1866 4785 c-22 -7 -49 -24 -62 -37 -39 -40 -329 -452 -499 -708
                                    -524 -791 -834 -1397 -948 -1850 -28 -113 -31 -140 -32 -285 0 -184 17 -297
                                    72 -470 91 -287 267 -550 492 -737 218 -181 456 -294 736 -350 148 -30 422
                                    -32 570 -4 199 36 431 126 582 225 77 50 108 102 100 169 -9 81 -77 142 -157
                                    142 -35 0 -60 -8 -106 -36 -234 -142 -431 -199 -694 -199 -172 0 -243 11 -396
                                    60 -201 66 -348 157 -505 314 -110 110 -181 206 -241 326 -118 234 -164 517
                                    -119 731 80 384 395 1001 916 1789 196 295 333 490 345 490 19 0 401 -565 595
                                    -880 317 -515 557 -998 633 -1273 19 -66 19 -72 4 -72 -33 0 -118 48 -177 99
                                    -83 72 -219 138 -325 157 -202 38 -404 -18 -565 -156 -78 -68 -146 -99 -238
                                    -109 -41 -5 -88 -16 -104 -26 -97 -57 -103 -201 -11 -267 47 -33 141 -36 249
                                    -9 109 27 193 71 281 144 104 88 163 112 268 112 104 -1 163 -25 260 -109 161
                                    -138 378 -194 585 -151 94 20 214 81 305 156 105 86 144 102 255 103 79 1 97
                                    -2 145 -26 31 -15 85 -53 120 -83 80 -70 201 -130 300 -151 188 -39 295 13
                                    295 144 0 101 -53 148 -182 163 -95 10 -142 32 -233 109 -126 107 -292 170
                                    -445 170 -133 0 -294 -54 -398 -133 -26 -21 -51 -37 -55 -37 -4 0 -18 35 -31
                                    78 -90 311 -364 856 -698 1391 -194 311 -635 957 -712 1045 -39 45 -116 63
                                    -175 41z"></path>
                                    <path d="M4025 4625 c-50 -18 -76 -48 -214 -244 -200 -285 -345 -546 -413
                                    -742 -30 -86 -32 -104 -32 -214 1 -100 5 -132 26 -197 39 -119 92 -204 182
                                    -294 90 -90 175 -143 294 -182 67 -22 94 -26 212 -26 118 0 145 4 212 26 119
                                    39 204 92 294 182 90 90 143 175 182 294 21 65 25 96 26 197 0 131 -13 183
                                    -89 357 -105 238 -466 792 -542 832 -45 23 -94 27 -138 11z m152 -562 c155
                                    -239 246 -409 283 -532 30 -97 23 -170 -25 -267 -42 -86 -102 -144 -193 -187
                                    -61 -29 -76 -32 -162 -32 -86 0 -101 3 -162 32 -91 43 -151 101 -193 187 -48
                                    97 -55 170 -25 267 22 75 82 202 153 324 63 109 218 345 227 345 4 0 48 -62
                                    97 -137z"></path>
                                    <path d="M2380 1725 c-91 -21 -212 -83 -300 -156 -92 -76 -139 -98 -233 -108
                                    -89 -10 -128 -29 -158 -78 -69 -111 14 -243 153 -243 140 1 288 58 418 164
                                    119 96 154 111 265 111 107 0 170 -24 252 -97 258 -230 635 -235 893 -12 99
                                    86 155 109 265 109 110 0 166 -23 265 -109 122 -106 298 -172 437 -164 43 3
                                    71 10 90 24 93 70 96 192 7 261 -26 19 -52 27 -114 34 -97 11 -149 35 -245
                                    114 -277 228 -645 217 -910 -26 -16 -15 -55 -40 -85 -56 -48 -24 -67 -27 -145
                                    -28 -107 0 -166 23 -255 99 -132 114 -264 166 -430 172 -68 2 -128 -2 -170
                                    -11z"></path>
                                    </g>
                                    </svg>
                            </div>
                        </div>
                        <div class="each-item-menu">
                            <div class="svg-tick"></div>
                            <div>
                                <span>Visibility</span>
                                <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24"><path d="M23.271,9.419C21.72,6.893,18.192,2.655,12,2.655S2.28,6.893.729,9.419a4.908,4.908,0,0,0,0,5.162C2.28,17.107,5.808,21.345,12,21.345s9.72-4.238,11.271-6.764A4.908,4.908,0,0,0,23.271,9.419Zm-1.705,4.115C20.234,15.7,17.219,19.345,12,19.345S3.766,15.7,2.434,13.534a2.918,2.918,0,0,1,0-3.068C3.766,8.3,6.781,4.655,12,4.655s8.234,3.641,9.566,5.811A2.918,2.918,0,0,1,21.566,13.534Z"></path><path d="M12,7a5,5,0,1,0,5,5A5.006,5.006,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z"></path></svg>
                        
                            </div>
                        </div>
                        <div class="each-item-menu">
                            <div class="svg-tick">
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
                            </div>
                            
                            <div>
                                <span>Pressure</span>
                                <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
                        
                                    <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)">
                                <path d="M2300 4656 c-386 -53 -721 -190 -1022 -417 -107 -80 -317 -290 -397
                                -397 -703 -931 -529 -2240 392 -2954 366 -283 822 -438 1287 -438 809 1 1539
                                457 1896 1186 350 714 266 1566 -217 2206 -80 107 -290 317 -397 397 -278 210
                                -596 347 -946 407 -124 21 -471 27 -596 10z m100 -445 c0 -144 7 -171 53 -219
                                75 -77 199 -57 246 42 18 36 21 61 21 174 l0 132 28 0 c56 0 219 -33 330 -66
                                202 -61 389 -155 560 -281 l74 -54 -105 -108 c-83 -85 -107 -116 -112 -145
                                -28 -148 127 -250 256 -167 24 16 78 63 119 106 l75 77 28 -34 c54 -63 149
                                -213 199 -312 83 -165 154 -404 174 -583 l7 -63 -150 0 c-139 0 -152 -2 -184
                                -23 -109 -73 -105 -212 7 -267 34 -17 61 -20 183 -20 l144 0 -7 -52 c-23 -173
                                -82 -384 -146 -521 l-32 -67 -1610 2 -1609 3 -34 75 c-65 148 -120 347 -141
                                508 l-7 52 134 0 c112 0 139 3 173 20 117 57 123 215 11 277 -36 20 -54 23
                                -179 23 l-139 0 7 63 c32 285 162 607 349 860 l50 68 96 -94 c107 -105 142
                                -127 201 -127 107 0 183 105 149 207 -8 25 -45 72 -111 139 l-100 102 59 44
                                c128 99 282 186 436 247 130 52 364 108 460 110 l37 1 0 -129z m1522 -2808
                                c-51 -61 -192 -197 -257 -250 -135 -109 -347 -226 -521 -286 -209 -73 -411
                                -102 -648 -94 -342 11 -638 107 -932 302 -110 73 -281 226 -365 326 l-41 49
                                1402 0 1402 0 -40 -47z"></path>
                                <path d="M2505 3609 c-44 -12 -78 -54 -115 -139 -18 -41 -89 -196 -157 -345
                                -170 -368 -177 -390 -178 -540 0 -118 1 -121 37 -199 49 -101 148 -203 240
                                -246 252 -118 552 -18 680 227 45 85 63 171 55 267 -8 91 -35 166 -149 421
                                -50 110 -117 261 -151 335 -74 165 -89 187 -141 211 -44 20 -74 22 -121 8z
                                m110 -641 c91 -193 135 -310 135 -361 0 -77 -48 -152 -113 -176 -69 -26 -174
                                -4 -219 46 -45 50 -60 137 -34 209 24 70 168 384 176 384 4 0 29 -46 55 -102z"></path>
                                </g>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="canvas-holder">
                    <div class="container-for-values" style="width: 426px; gap: 19px;">
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                    </div>
                    <canvas id="canvas" height="340" style="display: block; box-sizing: border-box; height: 272px; width: 476px;" width="595"></canvas>
                </div>
                `
                WHLE_ELMNT.appendChild(index)
                extraText.innerHTML = `
                <span class="timeFORWIND">Daily Summary</span>
                <span class="textForPRESSURE">Pressure is currently ${weatherData.current.pressure_mb} hPa and ${todaysPressure().toLowerCase()}. Today, the average pressure will be ${averagePressure()} hPa, and will range between ${lowestHighestPressure()[0]} hPa and ${lowestHighestPressure()[1]} hPa.</span>
                `
                WHLE_ELMNT.appendChild(extraText)
                WHLE_ELMNT.appendChild(finalInfo)
                
                continue
            }
            //console.log(daysShort, weatherData.forecast.forecastday[i].day.uv)
            const day = document.createElement("div")
            day.classList.add("forecast-each-day")
            day.innerHTML = `
            <span>${daysShort}</span>
            <span class="numbers">${numbersDays}</span>
            `
            wrapper.appendChild(day)
            
        }   
        
    }
    const eventFunctionPRESSURE = () =>{
        const elements = document.querySelectorAll(".numbers")
        const fullDate = document.querySelector(".datepicked")
        const index = document.querySelector(".index span")
        const visText = document.querySelector(".vis-text")
        const textForPRESSURE = document.querySelector(".textForPRESSURE")

        for(let i = 0; i < elements.length; i++){
            
            const averagePressure = () =>{
                let pressure = 0
    
                for(let j = 0; j < weatherData.forecast.forecastday[i].hour.length; j++){
                    pressure += weatherData.forecast.forecastday[i].hour[j].pressure_mb
                }
    
                return Math.round(pressure / 24)
            }

            const pressureLevels = () =>{
                //console.log(weatherData.current.pressure_mb)
        
                if(averagePressure() > 1015){
                    return 'High'
                }else if(averagePressure() < 1011){
                    return 'Low'
                }else{
                    return 'Average'
                }
            }

            const lowestHighestPressure = () =>{
                let lowestPressure = weatherData.forecast.forecastday[i].hour[0].pressure_mb
                let highestPressure = weatherData.forecast.forecastday[i].hour[0].pressure_mb
                for(let j = 0; j < weatherData.forecast.forecastday[i].hour.length; j++){
                    //console.log(weatherData.forecast.forecastday[0].hour[j].pressure_mb)
    
                    if(weatherData.forecast.forecastday[i].hour[j].pressure_mb > highestPressure){
                        highestPressure = weatherData.forecast.forecastday[i].hour[j].pressure_mb
                
                    }
    
                    if(weatherData.forecast.forecastday[i].hour[j].pressure_mb < lowestPressure){
                        lowestPressure = weatherData.forecast.forecastday[i].hour[j].pressure_mb
                    
                    }
                }
                return [lowestPressure, highestPressure]
            }

            let days = new Date(weatherData.forecast.forecastday[i].date)
                let fullDay = days.toLocaleDateString("default", {weekday: "long", day: "2-digit", month: "long", "year": "numeric"})
                elements[i].addEventListener("click", ()=>{
                elements.forEach(element =>{
                    element.classList.remove("active")
                })

                elements[0].addEventListener("click", ()=>{
                    mainFunctionPRESSURE()
                })
                let weekday = days.toLocaleDateString("default", {weekday: "long"})
 
                
                textForPRESSURE.textContent = `On ${weekday}, the average pressure will be ${averagePressure()} hPa, with ranges between ${lowestHighestPressure()[0]} hPa, ${lowestHighestPressure()[1]} hPa.`
                visText.textContent = pressureLevels()
                index.textContent = `${averagePressure()}`
                fullDate.textContent = fullDay
                elements[i].classList.add("active")
                
                const CANVAS_HOLDER = document.querySelector(".canvas-holder")

                CANVAS_HOLDER.innerHTML = `
                <div class="container-for-values" style="width: 426px; gap: 19px;">
                    <div class="value-hrs"></div>
                    <div class="value-hrs"></div>
                    <div class="value-hrs"></div>
                    <div class="value-hrs"></div>
                    <div class="value-hrs"></div>
                    <div class="value-hrs"></div>
                    <div class="value-hrs"></div>
                    <div class="value-hrs"></div>
                    <div class="value-hrs"></div>
                    <div class="value-hrs"></div>
                    <div class="value-hrs"></div>
                    <div class="value-hrs"></div>
                </div>
                <canvas id="canvas" height="340" style="display: block; box-sizing: border-box; height: 272px; width: 476px;" width="595"></canvas>
                `
                const PressureChartFunction = () =>{
                    const hoursArray = []
            
                    for(let i = 0; i < 24; i++){
                        hoursArray.push(i)
                    }
            
                    //the index at which the change will occur
                    let labelToChange = new Date(weatherData.current.last_updated).getHours()
            
                    const all = document.querySelectorAll(".value-hrs")
            

                    //funtion to check if pressure if rising falling or steady
                    const todaysPressure = () => {
                        let pressureAtBeginning = weatherData.forecast.forecastday[i].hour[0].pressure_mb;
                    
                        // Loop through the HTML elements and j indexes as per your requirement
                        for (let DAY = 0, j = 0; DAY < all.length; DAY++, j += 2) {
                            if (pressureAtBeginning == weatherData.forecast.forecastday[i].hour[j].pressure_mb) {
                                all[DAY].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M48 128c-17.7 0-32 14.3-32 32s14.3 32 32 32H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H48zm0 192c-17.7 0-32 14.3-32 32s14.3 32 32 32H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H48z"/></svg>`;
                            } else if (pressureAtBeginning > weatherData.forecast.forecastday[i].hour[j].pressure_mb) {
                                all[DAY].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>`;
                            } else {
                                all[DAY].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"/></svg>`;
                            }
                            pressureAtBeginning = weatherData.forecast.forecastday[i].hour[j].pressure_mb;
                        }
                    }
                    todaysPressure()
            
                    //when will the line be dashed and stright
                    const dash = (ctx) => {
                        //console.log(ctx.p0DataIndex)
                        if(ctx.p0DataIndex < labelToChange){
                            return [8, 10]
                        }
                    }
            
                    let ctx = document.querySelector("#canvas").getContext("2d")
            
                    const pressureData = () =>{
                        const pressureArray = []
                        for(let d = 0; d < weatherData.forecast.forecastday[i].hour.length; d++){
                            pressureArray.push(weatherData.forecast.forecastday[i].hour[d].pressure_mb)
                        }
                
                        return pressureArray
                    }

                    const canvasElement = document.querySelector(".canvas-holder")
                    const invisibleOverlay = document.createElement("div")
                    invisibleOverlay.classList.add("blank-overlay")
                    canvasElement.appendChild(invisibleOverlay)
            
                    const gradient = window['chartjs-plugin-gradient'];
                
                    //data block
                    const chartData = {
                        labels: hoursArray,
                        datasets: [{
                            label: "",
                            data: pressureData(),
                            segment: {
                                //borderDash: ctx => dash(ctx),
                            },
                            
                            borderWidth: 6.5,
                            borderColor: "rgba(235, 0, 243, 1)",
                            pointBackgroundColor: "transparent",
                            pointBorderColor: "transparent",
                            borderCapStyle: 'round',
                            clip: {
                                left: 0,
                                right: 0,
                                top: false,
                                bottom: false
                            },
                            tension: 0.2,
                            fill: true,
                            //backgroundColor: "rgba(39, 0, 51, 0.75)",
                            gradient: {
                                backgroundColor: {
                                  axis: 'y',
                                  colors: {
                                    970: 'rgba(23, 0, 40, 0.30)',
                                    990: "rgba(46, 0, 79, 0.3)",
                                    1010: "rgba(57, 0, 98, 0.30)",
                                    
                                  }
                                },
                            }
                        }]
                    }
                
                    const plugin = {
                        id: 'customCanvasBackgroundColor',
                        beforeDraw: (chart, args, options) => {
                        const {ctx} = chart;
                        ctx.save();
                        ctx.globalCompositeOperation = 'destination-over';
                        ctx.fillStyle = options.color
                        ctx.fillRect(0, 0, chart.width, chart.height);
                        ctx.restore();
                        
                        }
                    };
                
                    //const container = document.querySelector(".container-for-values")

                    const container = document.querySelector(".container-for-values")
                    container.style.width = `414px`
                    container.style.gap = `18.5px`

                    //container.classList.add("adjusted")
                    //container.classList.remove("adjusted2")
                
                    //config block
                    const config = {
                        type: "line",
                        data: chartData,  
                        options: {
                            aspectRatio: 7/4,
                            responsive: true,
                            scales: {
                                y: {
                                    beginAtZero: false,
                                    min: 980,
                                    max: 1040,
                                    grid: {
                                        drawTicks: false,
                                        display: true,
                                        drawOnChartArea: true,
                                        color: "#302F32"
                                    },
                                    border: {
                                        display: true,
                                        color: "#302F32"
                                    },
                                    ticks: {
                                        color: "#9D9D9E",
                                        
                                        padding: 15,
                                        align: "center",
                                        crossAlign: "center",
                                        font: {
                                            size: 13,
                                            weight: 400
                                        }
                                    },
                                    position: "right"
                                },
                
                                x: {
                                    border: {
                                        display: true,
                                        dash: [3, 2]
                                    },
                                    grid: {
                                        display: true,
                                        drawOnChartArea: true,
                                        drawTicks: false,
                                        color: "#302F32"
                                    },
                
                                    ticks: {
                                        color: "#9D9D9E",
                                        maxTicksLimit: 4,
                                        padding: 5,
                                        align: "start",
                                        crossAlign: "near",
                                        font: {
                                            size: 15,
                                            weight: 400
                                        }
                                    }
                                },
                
                                
                            },
                            plugins: {
                                customCanvasBackgroundColor: {
                                    color: "#202023"
                                },
                                legend: {
                                    display: false
                                },
                                autocolors: false,
                                annotation: {
                                    
                                    annotations: {
                                        
                                        
                                    },
                                    clip: false
                                } 
                            },
                            
                            
                                
                            
                            
                        },
                        plugins: [plugin, gradient]
                    }
                
                    const pressureChart = new Chart(ctx, config)
                }
                PressureChartFunction()
            })
        }
    }

    const mainFunctionPRESSURE = () =>{
        createElementPRESSURE()
        eventFunctionPRESSURE()

        const PressureChartFunction = () =>{
            const hoursArray = []
    
            for(let i = 0; i < 24; i++){
                hoursArray.push(i)
            }
    
            //the index at which the change will occur
            let labelToChange = new Date(weatherData.current.last_updated).getHours()
    
            const all = document.querySelectorAll(".value-hrs")
            

            //funtion to check if pressure if rising falling or steady
            const todaysPressure = () => {
                let pressureAtBeginning = weatherData.forecast.forecastday[0].hour[0].pressure_mb;
            
                // Loop through the HTML elements and j indexes as per your requirement
                for (let i = 0, j = 0; i < all.length; i++, j += 2) {
                    if (pressureAtBeginning == weatherData.forecast.forecastday[0].hour[j].pressure_mb) {
                        all[i].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M48 128c-17.7 0-32 14.3-32 32s14.3 32 32 32H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H48zm0 192c-17.7 0-32 14.3-32 32s14.3 32 32 32H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H48z"/></svg>`;
                    } else if (pressureAtBeginning > weatherData.forecast.forecastday[0].hour[j].pressure_mb) {
                        all[i].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>`;
                    } else {
                        all[i].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"/></svg>`;
                    }
                    pressureAtBeginning = weatherData.forecast.forecastday[0].hour[j].pressure_mb;
                }
            }
            todaysPressure()
    
            //when will the line be dashed and stright
            const dash = (ctx) => {
                //console.log(ctx.p0DataIndex)
                if(ctx.p0DataIndex < labelToChange){
                    return [8, 10]
                }
            }

            const canvasElement = document.querySelector(".canvas-holder")
            const chartOverlay = document.createElement("div")
            chartOverlay.classList.add("time-passed-overlay")

        
            const invisibleOverlay = document.createElement("div")
            invisibleOverlay.classList.add("blank-overlay")
            canvasElement.appendChild(invisibleOverlay)

        const lineDivider = document.createElement("div")
        lineDivider.classList.add("line-divider")
        chartOverlay.appendChild(lineDivider)
        
        canvasElement.appendChild(chartOverlay)
        const overlayStyle = () =>{
            if(labelToChange == 0){
                chartOverlay.style.width = `8px`
                  
            }else if(labelToChange == 1){
                chartOverlay.style.width = `26px`
                
            }else if(labelToChange == 2){
                chartOverlay.style.width = `43px`
                
            }else if(labelToChange == 3){
                chartOverlay.style.width = `61px`
                
            }else if(labelToChange == 4){
                chartOverlay.style.width = `78px`
                
            }else if(labelToChange == 5){
                chartOverlay.style.width = `96px`
                
            }else if(labelToChange == 6){
                chartOverlay.style.width = `113px`
                
            }else if(labelToChange == 7){
                chartOverlay.style.width = `131px`
                
            }else if(labelToChange == 8){
                chartOverlay.style.width = `147.5px`
                
            }else if(labelToChange == 9){

                chartOverlay.style.width = `165px`
                
            }else if(labelToChange == 10){
                chartOverlay.style.width = `183px`
                
            }else if(labelToChange == 11){
                chartOverlay.style.width = `201px`
                
            }else if(labelToChange == 12){
                chartOverlay.style.width = `218px`
                
            }else if(labelToChange == 13){
                chartOverlay.style.width = `236px`
                
            }else if(labelToChange == 14){
                chartOverlay.style.width = `253px`
                
            }else if(labelToChange == 15){
                chartOverlay.style.width = `271px`
                
            }else if(labelToChange == 16){
                chartOverlay.style.width = `289px`
                
            }else if(labelToChange == 17){
                chartOverlay.style.width = `306px`
                
            }else if(labelToChange == 18){
                chartOverlay.style.width = `324px`
                
            }else if(labelToChange == 19){
                chartOverlay.style.width = `340px`
                
            }else if(labelToChange == 20){
                chartOverlay.style.width = `358px`
                
            }else if(labelToChange == 21){
                chartOverlay.style.width = `376px`
                
            }else if(labelToChange == 22){
                chartOverlay.style.width = `394px`
                
            }else if(labelToChange == 23){
                chartOverlay.style.width = `411px`
                
            }

            lineDivider.style.left = chartOverlay.style.width 
        }
        overlayStyle()
    
            let ctx = document.querySelector("#canvas").getContext("2d")

            const container = document.querySelector(".container-for-values")
            container.style.width = `414px`
            container.style.gap = `18.5px`
    
            const pressureData = () =>{
                const pressureArray = []
                for(let i = 0; i < weatherData.forecast.forecastday[0].hour.length; i++){
                    pressureArray.push(weatherData.forecast.forecastday[0].hour[i].pressure_mb)
                }
        
                return pressureArray
            }
    
            const gradient = window['chartjs-plugin-gradient'];
        
            //data block
            const chartData = {
                labels: hoursArray,
                datasets: [{
                    label: "",
                    data: pressureData(),
                    segment: {
                        borderDash: ctx => dash(ctx),
                    },
                    
                    borderWidth: 6.5,
                    borderColor: "rgba(235, 0, 243, 1)",
                    pointBackgroundColor: "transparent",
                    pointBorderColor: "transparent",
                    borderCapStyle: 'round',
                    clip: {
                        left: 0,
                        right: 0,
                        top: false,
                        bottom: false
                    },
                    tension: 0.2,
                    fill: true,
                    //backgroundColor: "rgba(39, 0, 51, 0.75)",
                    gradient: {
                        backgroundColor: {
                          axis: 'y',
                          colors: {
                            970: 'rgba(23, 0, 40, 0.30)',
                            990: "rgba(46, 0, 79, 0.3)",
                            1010: "rgba(57, 0, 98, 0.30)",
                            
                          }
                        },
                    }
                }]
            }
        
            const plugin = {
                id: 'customCanvasBackgroundColor',
                beforeDraw: (chart, args, options) => {
                const {ctx} = chart;
                ctx.save();
                ctx.globalCompositeOperation = 'destination-over';
                ctx.fillStyle = options.color
                ctx.fillRect(0, 0, chart.width, chart.height);
                ctx.restore();
                
                }
            };
        
            
        
            //config block
            const config = {
                type: "line",
                data: chartData,  
                options: {
                    aspectRatio: 7/4,
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: false,
                            min: 980,
                            max: 1040,
                            grid: {
                                drawTicks: false,
                                display: true,
                                drawOnChartArea: true,
                                color: "#302F32"
                            },
                            border: {
                                display: true,
                                color: "#302F32"
                            },
                            ticks: {
                                color: "#9D9D9E",
                                
                                padding: 15,
                                align: "center",
                                crossAlign: "center",
                                font: {
                                    size: 13,
                                    weight: 400
                                }
                            },
                            position: "right"
                        },
        
                        x: {
                            border: {
                                display: true,
                                dash: [3, 2]
                            },
                            grid: {
                                display: true,
                                drawOnChartArea: true,
                                drawTicks: false,
                                color: "#302F32"
                            },
        
                            ticks: {
                                color: "#9D9D9E",
                                maxTicksLimit: 4,
                                padding: 5,
                                align: "start",
                                crossAlign: "near",
                                font: {
                                    size: 15,
                                    weight: 400
                                }
                            }
                        },
        
                        
                    },
                    plugins: {
                        customCanvasBackgroundColor: {
                            color: "#202023"
                        },
                        legend: {
                            display: false
                        },
                        autocolors: false,
                        annotation: {
                            
                            annotations: {
                                
                                point2: {
                                    type: "point",
                                    xValue: labelToChange,
                                    yValue: pressureData()[labelToChange],
                                    backgroundColor: "#fafafa",
                                    borderWidth: 4,
                                    borderColor: "black",
                                    radius: 5.5,
                                    
                                }
                            },
                            clip: false
                        } 
                    },
                    
                    
                        
                    
                    
                },
                plugins: [plugin, gradient]
            }
        
            const pressureChart = new Chart(ctx, config)
        }
        PressureChartFunction()

        const wrapper = document.querySelector(".forecast-days-wrap")

        let mouseDown = false //will change if mouse is clicked

        const dragging = (e)=>{
            if(!mouseDown){ //if the mouse isnt click this will not run
                return
            }
            wrapper.style.cursor = `grabbing` //styling for the cursor
            e.preventDefault() //preventing default behaviour
            wrapper.scrollLeft -= e.movementX //the scroll movement
        }

        wrapper.addEventListener("mousedown", ()=>{
            mouseDown = true //when the mouse is down change the variable value
            wrapper.style.cursor = `grabbing`
        })
        wrapper.addEventListener("mousemove", dragging) //when the mouse moves run the function

        wrapper.addEventListener("mouseup", ()=>{
            mouseDown = false //mouse is no longer clicked
            wrapper.style.cursor = `grab`
        })
        wrapper.addEventListener("mouseleave", ()=>{
            mouseDown = false //mouse leaves the element
            wrapper.style.cursor = `grab`
        })

        const selectDropdown = document.querySelector(".select")
        const littleCaret = document.querySelector(".rotated")
        let elementActive = false 
        const menuItemspWrapper = document.querySelector(".menu-wrapper")
        const eachItemMenu = document.querySelectorAll(".each-item-menu")
        const divWithTick = document.querySelectorAll(".svg-tick")

        

        eachItemMenu[0].addEventListener("click", ()=>{
            mainFunctionForecast()
            
        })

        eachItemMenu[1].addEventListener("click", ()=>{
            mainFunction()
        
        })

        eachItemMenu[2].addEventListener("click", ()=>{
            mainFunctionFORWIND()
        
        })

        eachItemMenu[3].addEventListener("click", ()=>{
            mainFunctionRAIN()
        
        })

        eachItemMenu[4].addEventListener("click", ()=>{
            mainFunctionFEELSLIKE()
            
        })

        eachItemMenu[5].addEventListener("click", ()=>{
            mainFunctionHUMIDITY()
        
        })

        eachItemMenu[6].addEventListener("click", ()=>{
            mainFunctionVISIBILITY()
        
        })

        eachItemMenu[7].addEventListener("click", ()=>{
            mainFunctionPRESSURE()
        
        })
        
    

        const functionForDropdownActivation = (e) =>{
            if(!elementActive){
                selectDropdown.style.backgroundColor = '#515154'
                littleCaret.classList.add("true")
                menuItemspWrapper.style.display = 'block'
                menuItemspWrapper.style.height = `auto`
            }else{
                selectDropdown.style.backgroundColor = '#3A3A3D'
                littleCaret.classList.remove("true")
                menuItemspWrapper.style.display = 'none'
                menuItemspWrapper.style.height = `0`
            }

            elementActive = !elementActive
            e.stopPropagation()
        }
        
        const clickAnywhereElse = () =>{
            if(elementActive){
                selectDropdown.style.backgroundColor = '#3A3A3D'
                elementActive = false
                littleCaret.classList.remove("true")
                menuItemspWrapper.style.display = 'none'
                menuItemspWrapper.style.height = `0`
            }
        }

        selectDropdown.addEventListener("click", functionForDropdownActivation)

        document.body.addEventListener("click", clickAnywhereElse)
    }

    const divPRESSURE = document.querySelector(".pressure")
    divPRESSURE.addEventListener("click", ()=>{
        mainFunctionPRESSURE()
        const addInfo = document.querySelector(".additional-info")
        ADVANCED_DATA_OVERLAY.style.display = 'flex'
        
        body.style.overflow = "hidden"
    })
    
    
    //AIR QUALITY
    const createElementAIR_Q = () =>{
        //const wrapper = document.querySelector(".forecast-days-wrap")
        //const WHLE_ELMNT = document.querySelector(".advanced-data")
        const PARENT_ELEMENT = document.querySelector(".additional-info")
        PARENT_ELEMENT.innerHTML = ` `
        const headline = document.createElement("div")
        headline.classList.add("headline")
        headline.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M320 0c17.7 0 32 14.3 32 32V164.1c0 16.4 8.4 31.7 22.2 40.5l9.8 6.2V165.3C384 127 415 96 453.3 96c21.7 0 42.8 10.2 55.8 28.8c15.4 22.1 44.3 65.4 71 116.9c26.5 50.9 52.4 112.5 59.6 170.3c.2 1.3 .2 2.6 .2 4v7c0 49.1-39.8 89-89 89c-7.3 0-14.5-.9-21.6-2.7l-72.7-18.2C414 480.5 384 442.1 384 398V325l90.5 57.6c7.5 4.7 17.3 2.5 22.1-4.9s2.5-17.3-4.9-22.1L384 287.1v-.4l-44.1-28.1c-7.3-4.6-13.9-10.1-19.9-16.1c-5.9 6-12.6 11.5-19.9 16.1L256 286.7 161.2 347l-13.5 8.6c0 0 0 0-.1 0c-7.4 4.8-9.6 14.6-4.8 22.1c4.7 7.5 14.6 9.7 22.1 4.9l91.1-58V398c0 44.1-30 82.5-72.7 93.1l-72.7 18.2c-7.1 1.8-14.3 2.7-21.6 2.7c-49.1 0-89-39.8-89-89v-7c0-1.3 .1-2.7 .2-4c7.2-57.9 33.1-119.4 59.6-170.3c26.8-51.5 55.6-94.8 71-116.9c13-18.6 34-28.8 55.8-28.8C225 96 256 127 256 165.3v45.5l9.8-6.2c13.8-8.8 22.2-24.1 22.2-40.5V32c0-17.7 14.3-32 32-32z"></path></svg>
        <span>Air Quality</span>
        `
        const closeX = document.createElement("div")
        closeX.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
        ` 
        headline.appendChild(closeX)
        PARENT_ELEMENT.appendChild(headline)

        closeX.addEventListener("click", ()=>{
            PARENT_ELEMENT.innerHTML = ``
            ADVANCED_DATA_OVERLAY.style.display = "none"
            body.style.overflow = "auto"
        })

        PARENT_ELEMENT.style.marginTop = `16rem`
        
        const WHLE_ELMNT = document.createElement("div")
        WHLE_ELMNT.classList.add("advanced-data")
        PARENT_ELEMENT.appendChild(WHLE_ELMNT)
        WHLE_ELMNT.innerHTML = ``
        const wrapper = document.createElement("div")
        wrapper.classList.add("forecast-days-wrap")
        const index = document.createElement("div")
        index.classList.add("index")
        const extraText = document.createElement("div")
        extraText.classList.add("extra-text")
        WHLE_ELMNT.appendChild(wrapper)
        const finalInfo = document.createElement("div")
        finalInfo.classList.add("final-info")
        finalInfo.innerHTML = `
        <span>About Air Quality</span>
        <span>Air quality refers to the condition of the air we breathe, primarily focusing on the presence of pollutants and contaminants. Poor air quality, often caused by industrial emissions, vehicle exhaust, and natural factors, can lead to adverse health effects. These include respiratory issues, allergies, and an increased risk of heart disease.</span>
        `
        
        const mainPollutant = () =>{
            //console.log(weatherData.current.air_quality)
            
            let NITROGEN_DIOXIDE =  weatherData.current.air_quality.no2
            let OZONE = weatherData.current.air_quality.o3
            let PARTICLES_25 = weatherData.current.air_quality.pm2_5
            let PARTICLES10 = weatherData.current.air_quality.pm10
            let SULFUR_DIOXIDE = weatherData.current.air_quality.so2

            if(OZONE>= 241){
                OZONE = 10
            }else if(OZONE >= 214){
                OZONE = 9
            }else if(OZONE >= 188){
                OZONE = 8
            }else if(OZONE >= 161){
                OZONE = 7
            }else if(OZONE >= 141){
                OZONE = 6
            }else if(OZONE >= 121){
                OZONE = 5
            }else if(OZONE >= 101){
                OZONE = 4
            }else if(OZONE >= 67){
                OZONE = 3
            }else if(OZONE >= 34){
                OZONE = 2
            }else if(OZONE >= 0){
                OZONE = 1
            }

            if(NITROGEN_DIOXIDE > 601){
                NITROGEN_DIOXIDE = 10
            }else if(NITROGEN_DIOXIDE >= 535){
                NITROGEN_DIOXIDE = 9
            }else if(NITROGEN_DIOXIDE >= 468){
                NITROGEN_DIOXIDE = 8
            } else if(NITROGEN_DIOXIDE >= 401){
                NITROGEN_DIOXIDE = 7
            } else if(NITROGEN_DIOXIDE >= 335){
                NITROGEN_DIOXIDE = 6
            } else if(NITROGEN_DIOXIDE >= 268){
                NITROGEN_DIOXIDE = 5
            } else if(NITROGEN_DIOXIDE >= 201){
                NITROGEN_DIOXIDE = 4
            } else if(NITROGEN_DIOXIDE >= 135){
                NITROGEN_DIOXIDE = 3
            } else if(NITROGEN_DIOXIDE >= 68){
                NITROGEN_DIOXIDE = 2
            }else if(NITROGEN_DIOXIDE >= 0){
                NITROGEN_DIOXIDE = 1
            }

            if(SULFUR_DIOXIDE >= 1065){
                SULFUR_DIOXIDE = 10
            }else if(SULFUR_DIOXIDE >= 888){
                SULFUR_DIOXIDE = 9
            }else if(SULFUR_DIOXIDE >= 711){
                SULFUR_DIOXIDE = 8
            }else if(SULFUR_DIOXIDE >= 533){
                SULFUR_DIOXIDE = 7
            }else if(SULFUR_DIOXIDE >= 444){
                SULFUR_DIOXIDE = 6
            }else if(SULFUR_DIOXIDE >= 355){
                SULFUR_DIOXIDE = 5
            }else if(SULFUR_DIOXIDE >= 267){
                SULFUR_DIOXIDE = 4
            }else if(SULFUR_DIOXIDE >= 178){
                SULFUR_DIOXIDE = 3
            }else if(SULFUR_DIOXIDE >= 89){
                SULFUR_DIOXIDE = 2
            }else if(SULFUR_DIOXIDE >= 0){
                SULFUR_DIOXIDE = 1
            }

            if(PARTICLES_25 >= 71){
                PARTICLES_25 = 10
            }else if(PARTICLES_25 >= 65){
                PARTICLES_25 = 9
            }else if(PARTICLES_25 >= 59){
                PARTICLES_25 = 8
            }else if(PARTICLES_25 >= 54){
                PARTICLES_25 = 7
            }else if(PARTICLES_25 >= 48){
                PARTICLES_25 = 6
            }else if(PARTICLES_25 >= 42){
                PARTICLES_25 = 5
            }else if(PARTICLES_25 >= 36){
                PARTICLES_25 = 4
            }else if(PARTICLES_25 >= 24){
                PARTICLES_25 = 3
            }else if(PARTICLES_25 >= 12){
                PARTICLES_25 = 2
            }else if(PARTICLES_25 >= 0){
                PARTICLES_25 = 1
            }


            if(PARTICLES10 >= 101){
                PARTICLES10 = 10
            }else if(PARTICLES10 >= 92){
                PARTICLES10 = 9
            }else if(PARTICLES10 >= 84){
                PARTICLES10 = 8
            }else if(PARTICLES10 >= 76){
                PARTICLES10 = 7
            }else if(PARTICLES10 >= 67){
                PARTICLES10 = 6
            }else if(PARTICLES10 >= 59){
                PARTICLES10 = 5
            }else if(PARTICLES10 >= 51){
                PARTICLES10 = 4
            }else if(PARTICLES10 >= 34){
                PARTICLES10 = 3
            }else if(PARTICLES10 >= 17){
                PARTICLES10 = 2
            }else if(PARTICLES10 >= 0){
                PARTICLES10 = 1
            }

            return [{NAME: "PM2.5 (particulate matter under 2.5 µm)", VALUE: PARTICLES_25}, {NAME: "Ozone (O3)", VALUE: OZONE}, {NAME: "Nitrogen Dioxide (NO2)", VALUE: NITROGEN_DIOXIDE}, {NAME: "Sulphur Dioxide (SO2)", VALUE: SULFUR_DIOXIDE}, {NAME: "PM10 (particulate matter under 10 µm)", VALUE: PARTICLES10}]
            //return [OZONE, NITROGEN_DIOXIDE, SULFUR_DIOXIDE, PARTICLES_25, PARTICLES10]

        }
        //console.log(mainPollutant())

        const mainPollutantText = () =>{

            let highestValueObject = mainPollutant()[0]

            for(let i = 1; i < mainPollutant().length; i++){
                const currentObject = mainPollutant()[i]
                const currentValue = currentObject.VALUE

                if(currentValue > highestValueObject.VALUE){
                    highestValueObject = currentObject
                }
            }

            return highestValueObject.NAME
            
        }
        //console.log(mainPollutantText())

        const pollutantDesc = () =>{

            if(mainPollutantText() == "PM2.5 (particulate matter under 2.5 µm)"){
                return 'PM2.5 particles are small enough to enter the bloodstream and typically result from wildfires, smokestacks, bacteria or small dust particles.'
            }else if(mainPollutantText() == "Ozone (O3)"){
                return 'Ozone is typically elevated due to traffic, fossil fuel combustion and fires, and can be transported long distances.'
            }else if(mainPollutantText() == "Nitrogen Dioxide (NO2)"){
                return 'Nitrogen dioxide typically comes from traffic, fires and power stations.'
            }else if(mainPollutantText() == "Sulphur Dioxide (SO2)"){
                return 'Sulfur Dioxide is primarily emitted from industrial processes, power plants, and the combustion of fossil fuels containing sulfur. It can also be released during volcanic eruptions. Sulfur Dioxide contributes to the formation of acid rain and can irritate the respiratory system when present in high concentrations.'
            }else if(mainPollutantText() == "PM10 (particulate matter under 10 µm)"){
                return 'PM10 particles, with diameters under 10 µm, come from diverse sources: construction dust, industry, agriculture, and natural elements like pollen and sea salt. Inhalation can lead to respiratory issues, making control crucial for air quality management.'
            }
        }

        for(let i = 0; i < weatherData.forecast.forecastday.length; i++){
            let days = new Date(weatherData.forecast.forecastday[i].date)
            let daysShort = days.toLocaleDateString("default", {"weekday": "narrow"})
            let fullDay = days.toLocaleDateString("default", {weekday: "long", day: "2-digit", month: "long", "year": "numeric"})
            let numbersDays = days.toLocaleDateString("default", {day: "2-digit"})
            let currentHour = new Date(weatherData.current.last_updated).getHours()
            let sunsetToday = Number(weatherData.forecast.forecastday[i].astro.sunset.slice("0", "2")) + 12
            
            
        
            const airQualityHighLow = () =>{
                let qualityIndex = weatherData.current.air_quality['gb-defra-index']
        
                if(qualityIndex >= 10){
                    return `Very High`
                }else if(qualityIndex > 6){
                    return `High`
                }else if(qualityIndex > 3){
                    return `Moderate`
                }else if(qualityIndex >= 0){
                    return `Low`
                }
            }
            
            
            const airQualityMessage = () =>{
                let qualityIndex = weatherData.current.air_quality['gb-defra-index']
        
                if(qualityIndex >= 10){
                    return `People with lung and heart problems, should avoid any physical activity.`
                }else if(qualityIndex > 6){
                    return `People with lung and heart problems, should limit outdoor physical activities.`
                }else if(qualityIndex > 3){
                    return `People with lung or heart issues, should reduce strenuous outdoor activity.`
                }else if(qualityIndex >= 0){
                    return `Enjoy your usual outdoor activities.`
                }
            }

 

            //console.log(fullDay)
            if(i == 0){

                //console.log(weatherData)

                const OUTER_ELEMENT = document.createElement("div")
                OUTER_ELEMENT.classList.add("the-real-map-wrapper")
                WHLE_ELMNT.appendChild(OUTER_ELEMENT)

                OUTER_ELEMENT.innerHTML = `
                <div id="map-wrapper"></div>
                `
                
                index.innerHTML = `

                <span>${weatherData.current.air_quality['gb-defra-index']}</span>
                <span class="air-q-index">${airQualityHighLow()}</span>
                <span class="quality-scale">Scale: United Kingdom (DAQI)</span>
                `
                WHLE_ELMNT.appendChild(index)
                extraText.innerHTML = `
                <span class="timeFORWIND">Health Information</span>
                <span class="textForAIR-INFO">${airQualityMessage()}</span>

                <span class="Primary-Pollutant">Primary Pollutant</span>
                <span class="main-pollution">${mainPollutantText()}</span>
                <span class="pollution-description">${pollutantDesc()}</span>
                `
                WHLE_ELMNT.appendChild(extraText)
                WHLE_ELMNT.appendChild(finalInfo)
                
                break
            }
            
            
        }   
        
    }
    

    const mainFunctionAIR_Q = () =>{
        createElementAIR_Q()
        const airQualityMap = () =>{
            const lat = weatherData.location.lat
            const lon = weatherData.location.lon
    
            const quality_index = weatherData.current.air_quality["gb-defra-index"]
            const bg = (index) =>{
                if(index == 1){
                    return 'rgba(2, 164, 0, 0.7)'
                }else if(index == 2){
                    return 'rgba(14, 192, 0, 0.7)'
                }else if(index == 3){
                    return 'rgba(65, 160, 0, 0.7)'
                }else if(index == 4){
                    return 'rgba(116, 166, 0, 0.7)'
                }else if(index == 5){
                    return 'rgba(158, 174, 0, 0.7)'
                }else if(index == 6){
                    return 'rgba(180, 166, 0, 0.7)'
                }else if(index == 7){
                    return 'rgba(168, 100, 0, 0.7)'
                }else if(index == 8){
                    return 'rgba(149, 42, 0, 0.7)'
                }else if(index == 9){
                    return 'rgba(139, 0, 0, 0.7)'
                }else if(index >= 10){
                    return 'rgba(48, 0, 79, 0.7)'
                }
            }
            const borderColor = (index) => {
                if(index == 1){
                    return 'rgba(0, 200, 0, 1)'
                }else if(index == 2){
                    return 'rgba(98, 200, 0, 1)'
                }else if(index == 3){
                    return 'rgba(140, 200, 0, 1)'
                }else if(index == 4){
                    return 'rgba(165, 200, 0, 1)'
                }else if(index == 5){
                    return 'rgba(200, 189, 0, 1)'
                }else if(index == 6){
                    return 'rgba(200, 156, 0, 1)'
                }else if(index == 7){
                    return 'rgba(200, 122, 0, 1)'
                }else if(index == 8){
                    return 'rgba(200, 81, 0, 1)'
                }else if(index == 9){
                    return 'rgba(200, 0, 0, 1)'
                }else if(index == 10){
                    return 'rgba(113, 0, 200, 1)'
                }
            }
    
            const map = new mapboxgl.Map({
                container: 'map-wrapper',
                center: [lon, lat],
                zoom: 9,
                style: 'mapbox://styles/mapbox/streets-v11',
                accessToken: 'pk.eyJ1IjoiZG9lb2Zqb2huZXhhbXBsZTEiLCJhIjoiY2xuZXBtMTluMGhtNzJscmxkYnIwbGgzdSJ9.QPuG7kBCnBxk6957JM0W5A',
                attributionControl: false,
                doubleClickZoom: false,
                dragPan: false,
                dragRotate: false,
                scrollZoom: false,
                language: "auto",
                
            })
        
            const OUTER_ELEMENT = document.querySelector(".the-real-map-wrapper")
            const overlay = document.createElement("div")
            overlay.classList.add("air-quality-overlay")
            OUTER_ELEMENT.appendChild(overlay)
    
            overlay.style.backgroundColor = bg(quality_index)
    
            const circleAirQuality = document.createElement("div")
            circleAirQuality.classList.add("map-quality-circle")
            OUTER_ELEMENT.appendChild(circleAirQuality)
    
            circleAirQuality.style.borderColor = borderColor(quality_index)
    
            circleAirQuality.innerHTML = `<span class="city-index">${quality_index}</span>`
    
            const cityName = document.createElement("span")
            cityName.classList.add("city-name")
            OUTER_ELEMENT.appendChild(cityName)
    
            cityName.textContent = weatherData.location.name
        }
        airQualityMap()
    }

    const divAIR_Q = document.querySelector(".air-quality")
    divAIR_Q.addEventListener("click", ()=>{
        mainFunctionAIR_Q()
        const addInfo = document.querySelector(".additional-info")
        ADVANCED_DATA_OVERLAY.style.display = 'flex'
        
        body.style.overflow = "hidden"
    })

    const createElementSUNSET_SUNRISE = () =>{
        //const wrapper = document.querySelector(".forecast-days-wrap")
        //const WHLE_ELMNT = document.querySelector(".advanced-data")

        const sunrise =  () =>{
            if(weatherData.current.is_day){
                return ['Sunset', '<svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" ><path d="M23,24H1a1,1,0,0,1,0-2H5.071A6.991,6.991,0,0,1,5.5,20.39L1.982,18.349a1,1,0,0,1,1-1.731L6.51,18.662A7.053,7.053,0,0,1,7.662,17.51L5.618,13.985a1,1,0,0,1,1.731-1L9.39,16.5A6.991,6.991,0,0,1,11,16.071V12a1,1,0,0,1,2,0v4.071a6.97,6.97,0,0,1,1.609.433l2.042-3.522a1,1,0,1,1,1.731,1L16.338,17.51a7.047,7.047,0,0,1,1.151,1.152l3.527-2.044a1,1,0,0,1,1,1.731L18.5,20.39A6.894,6.894,0,0,1,18.929,22H23A1,1,0,0,1,23,24ZM8.3,5.708l3,3a1,1,0,0,0,1.414,0l3-3A1,1,0,0,0,14.3,4.293L13,5.586V1a1,1,0,0,0-2,0V5.586L9.7,4.293A1,1,0,0,0,8.291,5.708h0Z"/></svg>']
            } else {
                return ['Sunrise', '<svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" ><path d="M23,24H1a1,1,0,0,1,0-2H5.079a6.821,6.821,0,0,1,.428-1.607L1.982,18.349a1,1,0,1,1,1-1.731l3.529,2.046a7.062,7.062,0,0,1,1.151-1.148L5.618,13.984a1,1,0,0,1,1.731-1l2.044,3.527A6.915,6.915,0,0,1,11,16.072V12a1,1,0,0,1,2,0v4.072a6.915,6.915,0,0,1,1.607.437l2.044-3.528a1,1,0,0,1,1.731,1l-2.047,3.531a7.062,7.062,0,0,1,1.151,1.148l3.529-2.046a1,1,0,0,1,1,1.731L18.5,20.391a6.852,6.852,0,0,1,.436,1.617L23,22A1,1,0,0,1,23,24ZM15.705,3.292l-3-3a1,1,0,0,0-1.414,0l-3,3A1,1,0,0,0,9.705,4.707L11,3.414V8a1,1,0,0,0,2,0V3.414l1.3,1.293A1,1,0,0,0,15.71,3.292h-.005Z"/></svg>']
            }
        }
    
        

        const PARENT_ELEMENT = document.querySelector(".additional-info")
        PARENT_ELEMENT.innerHTML = ` `
        const headline = document.createElement("div")
        headline.classList.add("headline")
        headline.innerHTML = `
        ${sunrise()[1]}
        <span>${sunrise()[0]}</span>
        `
        const closeX = document.createElement("div")
        closeX.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
        ` 
        headline.appendChild(closeX)
        PARENT_ELEMENT.appendChild(headline)

        closeX.addEventListener("click", ()=>{
            PARENT_ELEMENT.innerHTML = ``
            ADVANCED_DATA_OVERLAY.style.display = "none"
            body.style.overflow = "auto"
        })

        PARENT_ELEMENT.style.marginTop = `35rem`
        
        const WHLE_ELMNT = document.createElement("div")
        WHLE_ELMNT.classList.add("advanced-data")
        PARENT_ELEMENT.appendChild(WHLE_ELMNT)
        WHLE_ELMNT.innerHTML = ``
        const wrapper = document.createElement("div")
        wrapper.classList.add("forecast-days-wrap")
        const index = document.createElement("div")
        index.classList.add("index")
        const extraText = document.createElement("div")
        extraText.classList.add("extra-text")
        WHLE_ELMNT.appendChild(wrapper)

    
        const totalDayLight = () =>{
            let sunriseTime = weatherData.forecast.forecastday[0].astro.sunrise
            let sunsetTime = weatherData.forecast.forecastday[0].astro.sunset

            const sunrise = new Date(`${weatherData.forecast.forecastday[0].date} ${sunriseTime}`)
            const sunset = new Date(`${weatherData.forecast.forecastday[0].date} ${sunsetTime}`)

            const timeDifference = sunset - sunrise

            const hours = Math.floor(timeDifference / (60 * 60 * 1000))
            const minutes = Math.floor((timeDifference % (60 * 60 * 1000)) / (60 * 1000))

            return {hours, minutes}
        }
        

        const sunriseSunsetDeterminer = () =>{
            let timeAtm = new Date(weatherData.current.last_updated).getHours()
            let sunset = weatherData.forecast.forecastday[0].astro.sunset
            sunset = Number(sunset.slice("0", "2")) + 12
            
            if(weatherData.current.is_day){
                if(daylightRemaining().hours == 0){
                    return [`${weatherData.forecast.forecastday[0].astro.sunset}`, `Daylight remaining: ${daylightRemaining().minutes} min`]
                }else {
                    return [`${weatherData.forecast.forecastday[0].astro.sunset}`, `Daylight remaining: ${daylightRemaining().hours} hrs ${daylightRemaining().minutes} min`]
                }
            }else if(!weatherData.current.is_day && timeAtm >= sunset){
                return [`${weatherData.forecast.forecastday[1].astro.sunrise}`, `Sunrise tomorrow`]
            }else{
                return [`${weatherData.forecast.forecastday[0].astro.sunset}` ,`Total daylight: ${totalDayLight().hours} hrs ${totalDayLight().minutes} min`]
            }
        }
        

        const daylightRemaining = () =>{
            let sunriseTime = weatherData.forecast.forecastday[0].astro.sunrise
            let sunsetTime = weatherData.forecast.forecastday[0].astro.sunset
            let currentTime = weatherData.current.last_updated

            
            const currentTimeIII = new Date(currentTime)
            const sunrise = new Date(`${weatherData.forecast.forecastday[0].date} ${sunriseTime}`)
            const sunset = new Date(`${weatherData.forecast.forecastday[0].date} ${sunsetTime}`)

            const remainingTime = sunset - currentTimeIII

            const hours = Math.floor(remainingTime / (60 * 60 * 1000))
            const minutes = Math.floor((remainingTime % (60 * 60 * 1000)) / (60 * 1000))

            return {hours, minutes}

        }

        for(let i = 0; i < weatherData.forecast.forecastday.length; i++){
            let days = new Date(weatherData.forecast.forecastday[i].date)
            let daysShort = days.toLocaleDateString("default", {"weekday": "narrow"})
            let fullDay = days.toLocaleDateString("default", {weekday: "long", day: "2-digit", month: "long", "year": "numeric"})
            let numbersDays = days.toLocaleDateString("default", {day: "2-digit"})
            let currentHour = new Date(weatherData.current.last_updated).getHours()
            let sunsetToday = Number(weatherData.forecast.forecastday[i].astro.sunset.slice("0", "2")) + 12


            //console.log(fullDay)
            if(i == 0){

                //console.log(weatherData)

                
                index.innerHTML = `
                
                <span class="air-q-index">${sunriseSunsetDeterminer()[0]}</span>
                <span class="remain-light">${sunriseSunsetDeterminer()[1]}</span>
                `
                WHLE_ELMNT.appendChild(index)
                extraText.innerHTML = `
                
                <div class="astro-data">

                    <div class="picture">
                        <div class="little-sun-ADVANCED"></div>

                        <img src="advanced-sunrise.jpg">
                        <div class="hours">
                            <span class="each-hour">00</span>
                            <span class="each-hour">06</span>
                            <span class="each-hour">12</span>
                            <span class="each-hour">18</span>
                        </div>
                    </div>
                
                    <div class="astro-element">
                        <span>Sunrise Today</span>
                        <span>${weatherData.forecast.forecastday[0].astro.sunrise}</span>
                    </div>

                    <div class="astro-element">
                        <span>Sunset Today</span>
                        <span>${weatherData.forecast.forecastday[0].astro.sunset}</span>
                    </div>

                    <div class="astro-element">
                        <span>Total Daylight</span>
                        <span>${totalDayLight().hours} <span class="smaller">HRS</span> ${totalDayLight().minutes} <span class="smaller">MIN</span></span>
                    </div>

                    <div class="astro-element">
                        <span>Moon illumination</span>
                        <span>${weatherData.forecast.forecastday[0].astro.moon_illumination}%</span>
                    </div>

                    <div class="astro-element">
                        <span>Moon phase</span>
                        <span>${weatherData.forecast.forecastday[0].astro.moon_phase}</span>
                    </div>

                    <div class="astro-element">
                        <span>Next full moon</span>
                        <span class="moon-phase"></span>
                    </div>
                </div>

                <div class="sunrise-sunset-year-averages">
                
                    <span>Sunrise and Sunset Averages</span>
                    <div class="months-wrapper">

                        <div class="each-month">
                            <span>Jan</span>
                            <div>
                                <span class="sunrise"></span>
                                <div class="sunrise-amplitude">
                                    <div class="amp-ss-style"></div>
                                </div>
                                <span class="sunset"></span>
                            </div>
                        </div>
                        <div class="each-month">
                            <span>Feb</span>
                            <div>
                                <span class="sunrise"></span>
                                <div class="sunrise-amplitude">
                                    <div class="amp-ss-style"></div>
                                </div>
                                <span class="sunset"></span>
                            </div>
                        </div>
                        <div class="each-month">
                            <span>Mar</span>
                            <div>
                                <span class="sunrise"></span>
                                <div class="sunrise-amplitude">
                                    <div class="amp-ss-style"></div>
                                </div>
                                <span class="sunset"></span>
                            </div>
                        </div>
                        <div class="each-month">
                            <span>Apr</span>
                            <div>
                                <span class="sunrise"></span>
                                <div class="sunrise-amplitude">
                                    <div class="amp-ss-style"></div>
                                </div>
                                <span class="sunset"></span>
                            </div>
                        </div>
                        <div class="each-month">
                            <span>May</span>
                            <div>
                                <span class="sunrise"></span>
                                <div class="sunrise-amplitude">
                                    <div class="amp-ss-style"></div>
                                </div>
                                <span class="sunset"></span>
                            </div>
                        </div>
                        <div class="each-month">
                            <span>Jun</span>
                            <div>
                                <span class="sunrise"></span>
                                <div class="sunrise-amplitude">
                                    <div class="amp-ss-style"></div>
                                </div>
                                <span class="sunset"></span>
                            </div>
                        </div>
                        <div class="each-month">
                            <span>Jul</span>
                            <div>
                                <span class="sunrise"></span>
                                <div class="sunrise-amplitude">
                                    <div class="amp-ss-style"></div>
                                </div>
                                <span class="sunset"></span>
                            </div>
                        </div>
                        <div class="each-month">
                            <span>Aug</span>
                            <div>
                                <span class="sunrise"></span>
                                <div class="sunrise-amplitude">
                                    <div class="amp-ss-style"></div>
                                </div>
                                <span class="sunset"></span>
                            </div>
                        </div>
                        <div class="each-month">
                            <span>Sep</span>
                            <div>
                                <span class="sunrise"></span>
                                <div class="sunrise-amplitude">
                                    <div class="amp-ss-style"></div>
                                </div>
                                <span class="sunset"></span>
                            </div>
                        </div>
                        <div class="each-month">
                            <span>Oct</span>
                            <div>
                                <span class="sunrise"></span>
                                <div class="sunrise-amplitude">
                                    <div class="amp-ss-style"></div>
                                </div>
                                <span class="sunset"></span>
                            </div>
                        </div>
                        <div class="each-month">
                            <span>Nov</span>
                            <div>
                                <span class="sunrise"></span>
                                <div class="sunrise-amplitude">
                                    <div class="amp-ss-style"></div>
                                </div>
                                <span class="sunset"></span>
                            </div>
                        </div>
                        <div class="each-month">
                            <span>Dec</span>
                            <div>
                                <span class="sunrise"></span>
                                <div class="sunrise-amplitude">
                                    <div class="amp-ss-style"></div>
                                </div>
                                <span class="sunset"></span>
                            </div>
                        </div>
                        
                    </div>
                </div>
                `
                WHLE_ELMNT.appendChild(extraText)
               
                const LOCATION = weatherData.location.name

                const sunriseSpan = document.querySelectorAll(".each-month .sunrise")
                const sunsetSpan = document.querySelectorAll(".each-month .sunset")
                const moonPhaseSpan = document.querySelector(".moon-phase")

                const INIT_MAIN_MONTHS = () => {
        
                    const fetchHistoricData = async () =>{
                        
            
                        const today = new Date(weatherData.current.last_updated)
                        const todayAYearAgo = new Date(today)
                
                        todayAYearAgo.setFullYear(today.getFullYear() - 1)
                
                        const allData = []
                
                        const formatDate = (dateInput) => {
                            const year = dateInput.getFullYear()
                            const month = String(dateInput.getMonth() + 1).padStart(2, "0")
                            const day = String(dateInput.getDate()).padStart(2, "0")
                
                            return `${year}-${month}-${day}`
                        }
                
                        //let i = 0
                        while(todayAYearAgo <= today){
                            //i++
                            const endDate = new Date(todayAYearAgo)
                            endDate.setDate(todayAYearAgo.getDate() + 31)
                
                            const startDateStr = formatDate(todayAYearAgo)
                            const endDateStr = formatDate(endDate)
                            
                            endDate.setHours(23, 59, 59, 999)
                
                            const API = await fetch(`${BASE_URL}/history.json?key=${API_KEY}&q=${weatherData.location.name}&aqi=yes&alerts=yes&dt=${startDateStr}&end_dt=${endDateStr}`)
                
                            if(API.ok){
                                const convert = await API.json()
                                //console.log(convert.forecast.forecastday)
                
                                allData.push(...convert.forecast.forecastday)
                            }
                
                            todayAYearAgo.setDate(todayAYearAgo.getDate() +32)
                        }
                        
                        return allData
                    }
                
                    const FINAL_CONVERT = async () =>{
                        
                        const START = await fetchHistoricData()
                
                        //the monthly arrays
                        const january = []
                        const february = []
                        const march = []
                        const april = []
                        const may = []
                        const june = []
                        const july = []
                        const august = []
                        const september = []
                        const october = []
                        const november = []
                        const decebmer = []
                
                        //loopeing over the year and splitting the array into 12 month arrays
                        for(let i = 0; i < 365; i++){
                            const date = new Date(START[i].date)
                
                            if(date.getMonth() + 1 == 1){
                                january.push(START[i])
                            } else if(date.getMonth() + 1 == 2){
                                february.push(START[i])
                            }else if(date.getMonth() + 1 == 3){
                                march.push(START[i])
                            }else if(date.getMonth() + 1 == 4){
                                april.push(START[i])
                            }else if(date.getMonth() + 1 == 5){
                                may.push(START[i])
                            }else if(date.getMonth() + 1 == 6){
                                june.push(START[i])
                            }else if(date.getMonth() + 1 == 7){
                                july.push(START[i])
                            }else if(date.getMonth() + 1 == 8){
                                august.push(START[i])
                            }else if(date.getMonth() + 1 == 9){
                                september.push(START[i])
                            }else if(date.getMonth() + 1 == 10){
                                october.push(START[i])
                            }else if(date.getMonth() + 1 == 11){
                                november.push(START[i])
                            }else if(date.getMonth() + 1 == 12){
                                decebmer.push(START[i])
                            }   
                        }
                
                        //JANUARY AVERAGE SUNRISE SUNSET
                        const januaryAverages = () =>{
                            const sunrise = []
                            const sunset = []
                            for(let i = 0; i < january.length; i++){
                                sunrise.push(january[i].astro.sunrise)
                                sunset.push(january[i].astro.sunset)
                            }
                
                            //max daylight
                            const dayLight = () =>{
                                const monthlyMaxesHRS = []
                                const monthlyMaxesMINS = []
                            
                                const totalDayLight = (riseTime, setTime, date) =>{
                        
                                    const sunrise = new Date(`${date.date} ${riseTime}`)
                                    const sunset = new Date(`${date.date} ${setTime}`)
                        
                                    const timeDifference = sunset - sunrise
                        
                                    const hours = Math.floor(timeDifference / (60 * 60 * 1000))
                                    const minutes = Math.floor((timeDifference % (60 * 60 * 1000)) / (60 * 1000))
                        
                                    return [hours, minutes]
                                }
                                
                                for(let i = 0; i < january.length; i++){
                                    monthlyMaxesHRS.push(totalDayLight(sunrise[i], sunset[i], january[i])[0])
                                    monthlyMaxesMINS.push(totalDayLight(sunrise[i], sunset[i], january[i])[1])
                
                                }
                
                                //console.log(Math.max(...monthlyMaxes[0]))
                                const hours = Math.max(...monthlyMaxesHRS)
                                const minutes = Math.max(...monthlyMaxesMINS)
                
                                return {hours, minutes}
                            }
                            
                            //average sunrise
                            const averageSunriseFunc = () =>{
                                const timeStringToMinutes = (timestring) => {
                                    if(timestring === 'No sunrise'){
                                        return null
                                    }
            
                                    const parts = timestring.split(" ");
                                    const timeParts = parts[0].split(":");
                                    let hours = parseInt(timeParts[0]);
                                    const minutes = parseInt(timeParts[1]);
                                    //const ampm = parts[1].toUpperCase();
            
                                    if(parts[1] == 'PM' && hours != 12){
                                        hours += 12
                                    }else if(parts[1] == 'AM' && hours == 12){
                                        hours = 0
                                    }
                                    
            
                                    return hours * 60 + minutes
                                }
            
                                const validTimestamps = sunrise.filter(time =>{
                                    return time !== 'No sunrise'
                                })
                                
            
                                const timeMinutes = validTimestamps.map(time => {
                                    return timeStringToMinutes(time)
                                })
                                
                                
            
                                const totalMinutes = timeMinutes.reduce((sum, minutes) =>{
                                    return sum + minutes
                                }, 0)
            
                                const averageMinutes = Math.round(totalMinutes / validTimestamps.length)
            
                                const averageHours = Math.floor(averageMinutes / 60)
                                const averageMinutesRemainder = averageMinutes % 60
            
                                return `${(averageHours).toString().padStart(2, "0")}:${averageMinutesRemainder.toString().padStart(2, "0")}`
                            }
                
                            //average sunset
                            /*
                            const averageSunset = () =>{
                                const timestampToMinutes = (timestamp) =>{
                                    if(timestamp === 'No sunset'){
                                        return null
                                    }
            
                                    const [time, period] = timestamp.split(' ')
                                    const [hours, minutes] = time.split(':').map(Number)
                                    let totalMinutes = (hours % 12) * 60 + minutes
                                    
                                    
                                    if(period == 'PM' && hours != 12){
                                        totalMinutes += 12 * 60
                                    }else if(period == 'AM' && hours == 12){
                                        totalMinutes -= 12 * 60
                                    }
                                    console.log(timestamp)
                                    return totalMinutes
                                }
                                
                                const validTimeStamps = sunset.filter(timestamp =>{
                                    return timestamp !== 'No sunset'
                                })
                                
                    
                                const totalMinutes = sunset.reduce((acc, timestamp) => {
                                    return acc + timestampToMinutes(timestamp)
                                    
                                }, 0)
                               
                                
                                const averageMinutes = Math.round(totalMinutes / validTimeStamps.length)
                                
                                let averageHours = Math.floor(averageMinutes / 60)
                                
                                const averageMinutesPart = averageMinutes % 60
            
                                if(averageHours == 0){
                                    averageHours = 12
                                }else if(averageHours > 12){
                                    averageHours -= 12
                                }
                                const formattedAverage = averageMinutesPart < 10 ? `0${averageMinutesPart}` : averageMinutesPart
                                
                                const averageSunrise = `${averageHours}:${formattedAverage}`
                                
                                return averageSunrise
                            } */
            
                            const averageSunset = () =>{
                                const timeStringToMinutes = (timestring) => {
                                    if(timestring === 'No sunset'){
                                        return null
                                    }
            
                                    const parts = timestring.split(" ");
                                    const timeParts = parts[0].split(":");
                                    let hours = parseInt(timeParts[0]);
                                    const minutes = parseInt(timeParts[1]);
                                    //const ampm = parts[1].toUpperCase();
            
                                    if(parts[1] == 'PM' && hours != 12){
                                        hours += 12
                                    }else if(parts[1] == 'AM' && hours == 12){
                                        hours = 0
                                    }
                                    
            
                                    return hours * 60 + minutes
                                }
            
                                const validTimestamps = sunset.filter(time =>{
                                    return time !== 'No sunset'
                                })
                                
            
                                const timeMinutes = validTimestamps.map(time => {
                                    return timeStringToMinutes(time)
                                })
                                
                                
            
                                const totalMinutes = timeMinutes.reduce((sum, minutes) =>{
                                    return sum + minutes
                                }, 0)
            
                                const averageMinutes = Math.round(totalMinutes / validTimestamps.length)
            
                                const averageHours = Math.floor(averageMinutes / 60)
                                const averageMinutesRemainder = averageMinutes % 60
            
                                return `${(averageHours).toString().padStart(2, "0")}:${averageMinutesRemainder.toString().padStart(2, "0")}`
            
                            
                            }
                
                            return [averageSunriseFunc(), averageSunset(), dayLight()]
                        }
                
                        //FEBRUARY SUNRISE SUNSET
                        const februaryAverages = () =>{
                            const sunrise = []
                            const sunset = []
                            for(let i = 0; i < february.length; i++){
                                sunrise.push(february[i].astro.sunrise)
                                sunset.push(february[i].astro.sunset)
                            }
                
                            const dayLight = () =>{
                                const monthlyMaxesHRS = []
                                const monthlyMaxesMINS = []
                            
                                const totalDayLight = (riseTime, setTime, date) =>{
                        
                                    const sunrise = new Date(`${date.date} ${riseTime}`)
                                    const sunset = new Date(`${date.date} ${setTime}`)
                        
                                    const timeDifference = sunset - sunrise
                        
                                    const hours = Math.floor(timeDifference / (60 * 60 * 1000))
                                    const minutes = Math.floor((timeDifference % (60 * 60 * 1000)) / (60 * 1000))
                        
                                    return [hours, minutes]
                                }
                                
                                for(let i = 0; i < february.length; i++){
                                    monthlyMaxesHRS.push(totalDayLight(sunrise[i], sunset[i], february[i])[0])
                                    monthlyMaxesMINS.push(totalDayLight(sunrise[i], sunset[i], february[i])[1])
                
                                }
                
                                //console.log(Math.max(...monthlyMaxes[0]))
                                const hours = Math.max(...monthlyMaxesHRS)
                                const minutes = Math.max(...monthlyMaxesMINS)
                
                                return {hours, minutes}
                            }
                
                            //average sunrise
                            const averageSunriseFunc = () =>{
                                const timeStringToMinutes = (timestring) => {
                                    if(timestring === 'No sunrise'){
                                        return null
                                    }
            
                                    const parts = timestring.split(" ");
                                    const timeParts = parts[0].split(":");
                                    let hours = parseInt(timeParts[0]);
                                    const minutes = parseInt(timeParts[1]);
                                    //const ampm = parts[1].toUpperCase();
            
                                    if(parts[1] == 'PM' && hours != 12){
                                        hours += 12
                                    }else if(parts[1] == 'AM' && hours == 12){
                                        hours = 0
                                    }
                                    
            
                                    return hours * 60 + minutes
                                }
            
                                const validTimestamps = sunrise.filter(time =>{
                                    return time !== 'No sunrise'
                                })
                                
            
                                const timeMinutes = validTimestamps.map(time => {
                                    return timeStringToMinutes(time)
                                })
                                
                                
            
                                const totalMinutes = timeMinutes.reduce((sum, minutes) =>{
                                    return sum + minutes
                                }, 0)
            
                                const averageMinutes = Math.round(totalMinutes / validTimestamps.length)
            
                                const averageHours = Math.floor(averageMinutes / 60)
                                const averageMinutesRemainder = averageMinutes % 60
            
                                return `${(averageHours).toString().padStart(2, "0")}:${averageMinutesRemainder.toString().padStart(2, "0")}`
                            }
                
                            //average sunset
                            const averageSunset = () =>{
                                const timeStringToMinutes = (timestring) => {
                                    if(timestring === 'No sunset'){
                                        return null
                                    }
            
                                    const parts = timestring.split(" ");
                                    const timeParts = parts[0].split(":");
                                    let hours = parseInt(timeParts[0]);
                                    const minutes = parseInt(timeParts[1]);
                                    //const ampm = parts[1].toUpperCase();
            
                                    if(parts[1] == 'PM' && hours != 12){
                                        hours += 12
                                    }else if(parts[1] == 'AM' && hours == 12){
                                        hours = 0
                                    }
                                    
            
                                    return hours * 60 + minutes
                                }
            
                                const validTimestamps = sunset.filter(time =>{
                                    return time !== 'No sunset'
                                })
                                
            
                                const timeMinutes = validTimestamps.map(time => {
                                    return timeStringToMinutes(time)
                                })
                                
                                
            
                                const totalMinutes = timeMinutes.reduce((sum, minutes) =>{
                                    return sum + minutes
                                }, 0)
            
                                const averageMinutes = Math.round(totalMinutes / validTimestamps.length)
            
                                const averageHours = Math.floor(averageMinutes / 60)
                                const averageMinutesRemainder = averageMinutes % 60
            
                                return `${(averageHours).toString().padStart(2, "0")}:${averageMinutesRemainder.toString().padStart(2, "0")}`
            
                            
                            }
                
                            return [averageSunriseFunc(), averageSunset(), dayLight()]
                        }
                
                        //MARCH AVERAGES 
                        const marchAverages = () =>{
                            const sunrise = []
                            const sunset = []
                            for(let i = 0; i < march.length; i++){
                                sunrise.push(march[i].astro.sunrise)
                                sunset.push(march[i].astro.sunset)
                            }
                
                            const dayLight = () =>{
                                const monthlyMaxesHRS = []
                                const monthlyMaxesMINS = []
                            
                                const totalDayLight = (riseTime, setTime, date) =>{
                        
                                    const sunrise = new Date(`${date.date} ${riseTime}`)
                                    const sunset = new Date(`${date.date} ${setTime}`)
                        
                                    const timeDifference = sunset - sunrise
                        
                                    const hours = Math.floor(timeDifference / (60 * 60 * 1000))
                                    const minutes = Math.floor((timeDifference % (60 * 60 * 1000)) / (60 * 1000))
                        
                                    return [hours, minutes]
                                }
                                
                                for(let i = 0; i < march.length; i++){
                                    monthlyMaxesHRS.push(totalDayLight(sunrise[i], sunset[i], march[i])[0])
                                    monthlyMaxesMINS.push(totalDayLight(sunrise[i], sunset[i], march[i])[1])
                
                                }
                
                                //console.log(Math.max(...monthlyMaxes[0]))
                                const hours = Math.max(...monthlyMaxesHRS)
                                const minutes = Math.max(...monthlyMaxesMINS)
                
                                return {hours, minutes}
                            }
                
                            //average sunrise
                            const averageSunriseFunc = () =>{
                                const timeStringToMinutes = (timestring) => {
                                    if(timestring === 'No sunrise'){
                                        return null
                                    }
            
                                    const parts = timestring.split(" ");
                                    const timeParts = parts[0].split(":");
                                    let hours = parseInt(timeParts[0]);
                                    const minutes = parseInt(timeParts[1]);
                                    //const ampm = parts[1].toUpperCase();
            
                                    if(parts[1] == 'PM' && hours != 12){
                                        hours += 12
                                    }else if(parts[1] == 'AM' && hours == 12){
                                        hours = 0
                                    }
                                    
            
                                    return hours * 60 + minutes
                                }
            
                                const validTimestamps = sunrise.filter(time =>{
                                    return time !== 'No sunrise'
                                })
                                
            
                                const timeMinutes = validTimestamps.map(time => {
                                    return timeStringToMinutes(time)
                                })
                                
                                
            
                                const totalMinutes = timeMinutes.reduce((sum, minutes) =>{
                                    return sum + minutes
                                }, 0)
            
                                const averageMinutes = Math.round(totalMinutes / validTimestamps.length)
            
                                const averageHours = Math.floor(averageMinutes / 60)
                                const averageMinutesRemainder = averageMinutes % 60
            
                                return `${(averageHours).toString().padStart(2, "0")}:${averageMinutesRemainder.toString().padStart(2, "0")}`
                            }
                
                            //average sunset
                            const averageSunset = () =>{
                                const timeStringToMinutes = (timestring) => {
                                    if(timestring === 'No sunset'){
                                        return null
                                    }
            
                                    const parts = timestring.split(" ");
                                    const timeParts = parts[0].split(":");
                                    let hours = parseInt(timeParts[0]);
                                    const minutes = parseInt(timeParts[1]);
                                    //const ampm = parts[1].toUpperCase();
            
                                    if(parts[1] == 'PM' && hours != 12){
                                        hours += 12
                                    }else if(parts[1] == 'AM' && hours == 12){
                                        hours = 0
                                    }
                                    
            
                                    return hours * 60 + minutes
                                }
            
                                const validTimestamps = sunset.filter(time =>{
                                    return time !== 'No sunset'
                                })
                                
            
                                const timeMinutes = validTimestamps.map(time => {
                                    return timeStringToMinutes(time)
                                })
                                
                                
            
                                const totalMinutes = timeMinutes.reduce((sum, minutes) =>{
                                    return sum + minutes
                                }, 0)
            
                                const averageMinutes = Math.round(totalMinutes / validTimestamps.length)
            
                                const averageHours = Math.floor(averageMinutes / 60)
                                const averageMinutesRemainder = averageMinutes % 60
            
                                return `${(averageHours).toString().padStart(2, "0")}:${averageMinutesRemainder.toString().padStart(2, "0")}`
            
                            
                            }
                
                            return [averageSunriseFunc(), averageSunset(), dayLight()]
                        }
                
                        //APRIL AVERAGES 
                        const aprilAverages = () =>{
                            const sunrise = []
                            const sunset = []
                            for(let i = 0; i < april.length; i++){
                                sunrise.push(april[i].astro.sunrise)
                                sunset.push(april[i].astro.sunset)
                            }
                
                            const dayLight = () =>{
                                const monthlyMaxesHRS = []
                                const monthlyMaxesMINS = []
                            
                                const totalDayLight = (riseTime, setTime, date) =>{
                        
                                    const sunrise = new Date(`${date.date} ${riseTime}`)
                                    const sunset = new Date(`${date.date} ${setTime}`)
                        
                                    const timeDifference = sunset - sunrise
                        
                                    const hours = Math.floor(timeDifference / (60 * 60 * 1000))
                                    const minutes = Math.floor((timeDifference % (60 * 60 * 1000)) / (60 * 1000))
                        
                                    return [hours, minutes]
                                }
                                
                                for(let i = 0; i < april.length; i++){
                                    monthlyMaxesHRS.push(totalDayLight(sunrise[i], sunset[i], april[i])[0])
                                    monthlyMaxesMINS.push(totalDayLight(sunrise[i], sunset[i], april[i])[1])
                
                                }
                
                                //console.log(Math.max(...monthlyMaxes[0]))
                                const hours = Math.max(...monthlyMaxesHRS)
                                const minutes = Math.max(...monthlyMaxesMINS)
                
                                return {hours, minutes}
                            }
                
                            //average sunrise
                            const averageSunriseFunc = () =>{
                                const timeStringToMinutes = (timestring) => {
                                    if(timestring === 'No sunrise'){
                                        return null
                                    }
            
                                    const parts = timestring.split(" ");
                                    const timeParts = parts[0].split(":");
                                    let hours = parseInt(timeParts[0]);
                                    const minutes = parseInt(timeParts[1]);
                                    //const ampm = parts[1].toUpperCase();
            
                                    if(parts[1] == 'PM' && hours != 12){
                                        hours += 12
                                    }else if(parts[1] == 'AM' && hours == 12){
                                        hours = 0
                                    }
                                    
            
                                    return hours * 60 + minutes
                                }
            
                                const validTimestamps = sunrise.filter(time =>{
                                    return time !== 'No sunrise'
                                })
                                
            
                                const timeMinutes = validTimestamps.map(time => {
                                    return timeStringToMinutes(time)
                                })
                                
                                
            
                                const totalMinutes = timeMinutes.reduce((sum, minutes) =>{
                                    return sum + minutes
                                }, 0)
            
                                const averageMinutes = Math.round(totalMinutes / validTimestamps.length)
            
                                const averageHours = Math.floor(averageMinutes / 60)
                                const averageMinutesRemainder = averageMinutes % 60
            
                                return `${(averageHours).toString().padStart(2, "0")}:${averageMinutesRemainder.toString().padStart(2, "0")}`
                            }
                
                            //average sunset
                            const averageSunset = () =>{
                                const timeStringToMinutes = (timestring) => {
                                    if(timestring === 'No sunset'){
                                        return null
                                    }
            
                                    const parts = timestring.split(" ");
                                    const timeParts = parts[0].split(":");
                                    let hours = parseInt(timeParts[0]);
                                    const minutes = parseInt(timeParts[1]);
                                    //const ampm = parts[1].toUpperCase();
            
                                    if(parts[1] == 'PM' && hours != 12){
                                        hours += 12
                                    }else if(parts[1] == 'AM' && hours == 12){
                                        hours = 0
                                    }
                                    
            
                                    return hours * 60 + minutes
                                }
            
                                const validTimestamps = sunset.filter(time =>{
                                    return time !== 'No sunset'
                                })
                                
            
                                const timeMinutes = validTimestamps.map(time => {
                                    return timeStringToMinutes(time)
                                })
                                
                                
            
                                const totalMinutes = timeMinutes.reduce((sum, minutes) =>{
                                    return sum + minutes
                                }, 0)
            
                                const averageMinutes = Math.round(totalMinutes / validTimestamps.length)
            
                                const averageHours = Math.floor(averageMinutes / 60)
                                const averageMinutesRemainder = averageMinutes % 60
            
                                return `${(averageHours).toString().padStart(2, "0")}:${averageMinutesRemainder.toString().padStart(2, "0")}`
            
                            
                            }
                
                            return [averageSunriseFunc(), averageSunset(), dayLight()]
                        }
                
                        //MAY AVERAGES
                        //THE VALUES HERE ARE FIXED LET'S SEE HOW IT WOULD PERFORM
                        //TAKE INTO ACCOUNT THAT NOT ONLY SUNSET SHOULD BE FIXED BUT ALSO SUNRISE
                        const mayAverages = () =>{
                            const sunrise = []
                            const sunset = []
                            for(let i = 0; i < may.length; i++){
                                sunrise.push(may[i].astro.sunrise)
                                sunset.push(may[i].astro.sunset)
                            }
                
                            const dayLight = () =>{
                                const monthlyMaxesHRS = []
                                const monthlyMaxesMINS = []
                            
                                const totalDayLight = (riseTime, setTime, date) =>{
                        
                                    const sunrise = new Date(`${date.date} ${riseTime}`)
                                    const sunset = new Date(`${date.date} ${setTime}`)
                        
                                    const timeDifference = sunset - sunrise
                        
                                    const hours = Math.floor(timeDifference / (60 * 60 * 1000))
                                    const minutes = Math.floor((timeDifference % (60 * 60 * 1000)) / (60 * 1000))
                        
                                    return [hours, minutes]
                                }
                                
                                for(let i = 0; i < may.length; i++){
                                    monthlyMaxesHRS.push(totalDayLight(sunrise[i], sunset[i], may[i])[0])
                                    monthlyMaxesMINS.push(totalDayLight(sunrise[i], sunset[i], may[i])[1])
                
                                }
                
                                //console.log(Math.max(...monthlyMaxes[0]))
                                const hours = Math.max(...monthlyMaxesHRS)
                                const minutes = Math.max(...monthlyMaxesMINS)
                
                                return {hours, minutes}
                            }
                
                            //average sunrise
                            const averageSunriseFunc = () =>{
                                const timeStringToMinutes = (timestring) => {
                                    if(timestring === 'No sunrise'){
                                        return null
                                    }
            
                                    const parts = timestring.split(" ");
                                    const timeParts = parts[0].split(":");
                                    let hours = parseInt(timeParts[0]);
                                    const minutes = parseInt(timeParts[1]);
                                    //const ampm = parts[1].toUpperCase();
            
                                    if(parts[1] == 'PM' && hours != 12){
                                        hours += 12
                                    }else if(parts[1] == 'AM' && hours == 12){
                                        hours = 0
                                    }
                                    
            
                                    return hours * 60 + minutes
                                }
            
                                const validTimestamps = sunrise.filter(time =>{
                                    return time !== 'No sunrise'
                                })
                                
            
                                const timeMinutes = validTimestamps.map(time => {
                                    return timeStringToMinutes(time)
                                })
                                
                                
            
                                const totalMinutes = timeMinutes.reduce((sum, minutes) =>{
                                    return sum + minutes
                                }, 0)
            
                                const averageMinutes = Math.round(totalMinutes / validTimestamps.length)
            
                                const averageHours = Math.floor(averageMinutes / 60)
                                const averageMinutesRemainder = averageMinutes % 60
            
                                return `${(averageHours).toString().padStart(2, "0")}:${averageMinutesRemainder.toString().padStart(2, "0")}`
                            }
                
                            //average sunset
                            const averageSunset = () =>{
                                const timeStringToMinutes = (timestring) => {
                                    if(timestring === 'No sunset'){
                                        return null
                                    }
            
                                    const parts = timestring.split(" ");
                                    const timeParts = parts[0].split(":");
                                    let hours = parseInt(timeParts[0]);
                                    const minutes = parseInt(timeParts[1]);
                                    //const ampm = parts[1].toUpperCase();
            
                                    if(parts[1] == 'PM' && hours != 12){
                                        hours += 12
                                    }else if(parts[1] == 'AM' && hours == 12){
                                        hours = 0
                                    }
                                    
            
                                    return hours * 60 + minutes
                                }
            
                                const validTimestamps = sunset.filter(time =>{
                                    return time !== 'No sunset'
                                })
                                
            
                                const timeMinutes = validTimestamps.map(time => {
                                    return timeStringToMinutes(time)
                                })
                                
                                
            
                                const totalMinutes = timeMinutes.reduce((sum, minutes) =>{
                                    return sum + minutes
                                }, 0)
            
                                const averageMinutes = Math.round(totalMinutes / validTimestamps.length)
            
                                const averageHours = Math.floor(averageMinutes / 60)
                                const averageMinutesRemainder = averageMinutes % 60
            
                                return `${(averageHours).toString().padStart(2, "0")}:${averageMinutesRemainder.toString().padStart(2, "0")}`
            
                            
                            }
                
                            return [averageSunriseFunc(), averageSunset(), dayLight()]
                        }
                        
                
                        //JUNE AVERAGES
                        const juneAverages = () =>{
                            const sunrise = []
                            const sunset = []
                            for(let i = 0; i < june.length; i++){
                                sunrise.push(june[i].astro.sunrise)
                                sunset.push(june[i].astro.sunset)
                            }
                
                            const dayLight = () =>{
                                const monthlyMaxesHRS = []
                                const monthlyMaxesMINS = []
                            
                                const totalDayLight = (riseTime, setTime, date) =>{
                        
                                    const sunrise = new Date(`${date.date} ${riseTime}`)
                                    const sunset = new Date(`${date.date} ${setTime}`)
                        
                                    const timeDifference = sunset - sunrise
                        
                                    const hours = Math.floor(timeDifference / (60 * 60 * 1000))
                                    const minutes = Math.floor((timeDifference % (60 * 60 * 1000)) / (60 * 1000))
                        
                                    return [hours, minutes]
                                }
                                
                                for(let i = 0; i < june.length; i++){
                                    monthlyMaxesHRS.push(totalDayLight(sunrise[i], sunset[i], june[i])[0])
                                    monthlyMaxesMINS.push(totalDayLight(sunrise[i], sunset[i], june[i])[1])
                
                                }
                
                                //console.log(Math.max(...monthlyMaxes[0]))
                                const hours = Math.max(...monthlyMaxesHRS)
                                const minutes = Math.max(...monthlyMaxesMINS)
                
                                return {hours, minutes}
                            }
                
                            //average sunrise
                            const averageSunriseFunc = () =>{
                                const timeStringToMinutes = (timestring) => {
                                    if(timestring === 'No sunrise'){
                                        return null
                                    }
            
                                    const parts = timestring.split(" ");
                                    const timeParts = parts[0].split(":");
                                    let hours = parseInt(timeParts[0]);
                                    const minutes = parseInt(timeParts[1]);
                                    //const ampm = parts[1].toUpperCase();
            
                                    if(parts[1] == 'PM' && hours != 12){
                                        hours += 12
                                    }else if(parts[1] == 'AM' && hours == 12){
                                        hours = 0
                                    }
                                    
            
                                    return hours * 60 + minutes
                                }
            
                                const validTimestamps = sunrise.filter(time =>{
                                    return time !== 'No sunrise'
                                })
                                
            
                                const timeMinutes = validTimestamps.map(time => {
                                    return timeStringToMinutes(time)
                                })
                                
                                
            
                                const totalMinutes = timeMinutes.reduce((sum, minutes) =>{
                                    return sum + minutes
                                }, 0)
            
                                const averageMinutes = Math.round(totalMinutes / validTimestamps.length)
            
                                const averageHours = Math.floor(averageMinutes / 60)
                                const averageMinutesRemainder = averageMinutes % 60
            
                                return `${(averageHours).toString().padStart(2, "0")}:${averageMinutesRemainder.toString().padStart(2, "0")}`
                            }
                
                            //average sunset
                            const averageSunset = () =>{
                                const timeStringToMinutes = (timestring) => {
                                    if(timestring === 'No sunset'){
                                        return null
                                    }
            
                                    const parts = timestring.split(" ");
                                    const timeParts = parts[0].split(":");
                                    let hours = parseInt(timeParts[0]);
                                    const minutes = parseInt(timeParts[1]);
                                    //const ampm = parts[1].toUpperCase();
            
                                    if(parts[1] == 'PM' && hours != 12){
                                        hours += 12
                                    }else if(parts[1] == 'AM' && hours == 12){
                                        hours = 0
                                    }
                                    
            
                                    return hours * 60 + minutes
                                }
            
                                const validTimestamps = sunset.filter(time =>{
                                    return time !== 'No sunset'
                                })
                                
            
                                const timeMinutes = validTimestamps.map(time => {
                                    return timeStringToMinutes(time)
                                })
                                
                                
            
                                const totalMinutes = timeMinutes.reduce((sum, minutes) =>{
                                    return sum + minutes
                                }, 0)
            
                                const averageMinutes = Math.round(totalMinutes / validTimestamps.length)
            
                                const averageHours = Math.floor(averageMinutes / 60)
                                const averageMinutesRemainder = averageMinutes % 60
            
                                return `${(averageHours).toString().padStart(2, "0")}:${averageMinutesRemainder.toString().padStart(2, "0")}`
            
                            
                            }
                
                            return [averageSunriseFunc(), averageSunset(), dayLight()]
                        }
                
                        //JULY AVERAGES
                        const julyAverages = () =>{
                            const sunrise = []
                            const sunset = []
                            for(let i = 0; i < july.length; i++){
                                sunrise.push(july[i].astro.sunrise)
                                sunset.push(july[i].astro.sunset)
                            }
                            const dayLight = () =>{
                                const monthlyMaxesHRS = []
                                const monthlyMaxesMINS = []
                            
                                const totalDayLight = (riseTime, setTime, date) =>{
                        
                                    const sunrise = new Date(`${date.date} ${riseTime}`)
                                    const sunset = new Date(`${date.date} ${setTime}`)
                        
                                    const timeDifference = sunset - sunrise
                        
                                    const hours = Math.floor(timeDifference / (60 * 60 * 1000))
                                    const minutes = Math.floor((timeDifference % (60 * 60 * 1000)) / (60 * 1000))
                        
                                    return [hours, minutes]
                                }
                                
                                for(let i = 0; i < july.length; i++){
                                    monthlyMaxesHRS.push(totalDayLight(sunrise[i], sunset[i], july[i])[0])
                                    monthlyMaxesMINS.push(totalDayLight(sunrise[i], sunset[i], july[i])[1])
                
                                }
                
                                //console.log(Math.max(...monthlyMaxes[0]))
                                const hours = Math.max(...monthlyMaxesHRS)
                                const minutes = Math.max(...monthlyMaxesMINS)
                
                                return {hours, minutes}
                            }
                
                            //average sunrise
                            const averageSunriseFunc = () =>{
                                const timeStringToMinutes = (timestring) => {
                                    if(timestring === 'No sunrise'){
                                        return null
                                    }
            
                                    const parts = timestring.split(" ");
                                    const timeParts = parts[0].split(":");
                                    let hours = parseInt(timeParts[0]);
                                    const minutes = parseInt(timeParts[1]);
                                    //const ampm = parts[1].toUpperCase();
            
                                    if(parts[1] == 'PM' && hours != 12){
                                        hours += 12
                                    }else if(parts[1] == 'AM' && hours == 12){
                                        hours = 0
                                    }
                                    
            
                                    return hours * 60 + minutes
                                }
            
                                const validTimestamps = sunrise.filter(time =>{
                                    return time !== 'No sunrise'
                                })
                                
            
                                const timeMinutes = validTimestamps.map(time => {
                                    return timeStringToMinutes(time)
                                })
                                
                                
            
                                const totalMinutes = timeMinutes.reduce((sum, minutes) =>{
                                    return sum + minutes
                                }, 0)
            
                                const averageMinutes = Math.round(totalMinutes / validTimestamps.length)
            
                                const averageHours = Math.floor(averageMinutes / 60)
                                const averageMinutesRemainder = averageMinutes % 60
            
                                return `${(averageHours).toString().padStart(2, "0")}:${averageMinutesRemainder.toString().padStart(2, "0")}`
                            }
                
                            //average sunset
                            const averageSunset = () =>{
                                const timeStringToMinutes = (timestring) => {
                                    if(timestring === 'No sunset'){
                                        return null
                                    }
            
                                    const parts = timestring.split(" ");
                                    const timeParts = parts[0].split(":");
                                    let hours = parseInt(timeParts[0]);
                                    const minutes = parseInt(timeParts[1]);
                                    //const ampm = parts[1].toUpperCase();
            
                                    if(parts[1] == 'PM' && hours != 12){
                                        hours += 12
                                    }else if(parts[1] == 'AM' && hours == 12){
                                        hours = 0
                                    }
                                    
            
                                    return hours * 60 + minutes
                                }
            
                                const validTimestamps = sunset.filter(time =>{
                                    return time !== 'No sunset'
                                })
                                
            
                                const timeMinutes = validTimestamps.map(time => {
                                    return timeStringToMinutes(time)
                                })
                                
                                
            
                                const totalMinutes = timeMinutes.reduce((sum, minutes) =>{
                                    return sum + minutes
                                }, 0)
            
                                const averageMinutes = Math.round(totalMinutes / validTimestamps.length)
            
                                const averageHours = Math.floor(averageMinutes / 60)
                                const averageMinutesRemainder = averageMinutes % 60
            
                                return `${(averageHours).toString().padStart(2, "0")}:${averageMinutesRemainder.toString().padStart(2, "0")}`
            
                            
                            }
                
                            return [averageSunriseFunc(), averageSunset(), dayLight()]
                        }
                
                        //AUGUST AVERAGES
                        const augustAverages = () =>{
                            const sunrise = []
                            const sunset = []
                            for(let i = 0; i < august.length; i++){
                                sunrise.push(august[i].astro.sunrise)
                                sunset.push(august[i].astro.sunset)
                            }
                
                            const dayLight = () =>{
                                const monthlyMaxesHRS = []
                                const monthlyMaxesMINS = []
                            
                                const totalDayLight = (riseTime, setTime, date) =>{
                        
                                    const sunrise = new Date(`${date.date} ${riseTime}`)
                                    const sunset = new Date(`${date.date} ${setTime}`)
                        
                                    const timeDifference = sunset - sunrise
                        
                                    const hours = Math.floor(timeDifference / (60 * 60 * 1000))
                                    const minutes = Math.floor((timeDifference % (60 * 60 * 1000)) / (60 * 1000))
                        
                                    return [hours, minutes]
                                }
                                
                                for(let i = 0; i < august.length; i++){
                                    monthlyMaxesHRS.push(totalDayLight(sunrise[i], sunset[i], august[i])[0])
                                    monthlyMaxesMINS.push(totalDayLight(sunrise[i], sunset[i], august[i])[1])
                
                                }
                
                                //console.log(Math.max(...monthlyMaxes[0]))
                                const hours = Math.max(...monthlyMaxesHRS)
                                const minutes = Math.max(...monthlyMaxesMINS)
                
                                return {hours, minutes}
                            }
                            //average sunrise
                            const averageSunriseFunc = () =>{
                                const timeStringToMinutes = (timestring) => {
                                    if(timestring === 'No sunrise'){
                                        return null
                                    }
            
                                    const parts = timestring.split(" ");
                                    const timeParts = parts[0].split(":");
                                    let hours = parseInt(timeParts[0]);
                                    const minutes = parseInt(timeParts[1]);
                                    //const ampm = parts[1].toUpperCase();
            
                                    if(parts[1] == 'PM' && hours != 12){
                                        hours += 12
                                    }else if(parts[1] == 'AM' && hours == 12){
                                        hours = 0
                                    }
                                    
            
                                    return hours * 60 + minutes
                                }
            
                                const validTimestamps = sunrise.filter(time =>{
                                    return time !== 'No sunrise'
                                })
                                
            
                                const timeMinutes = validTimestamps.map(time => {
                                    return timeStringToMinutes(time)
                                })
                                
                                
            
                                const totalMinutes = timeMinutes.reduce((sum, minutes) =>{
                                    return sum + minutes
                                }, 0)
            
                                const averageMinutes = Math.round(totalMinutes / validTimestamps.length)
            
                                const averageHours = Math.floor(averageMinutes / 60)
                                const averageMinutesRemainder = averageMinutes % 60
            
                                return `${(averageHours).toString().padStart(2, "0")}:${averageMinutesRemainder.toString().padStart(2, "0")}`
                            }
                
                            //average sunset
                            const averageSunset = () =>{
                                const timeStringToMinutes = (timestring) => {
                                    if(timestring === 'No sunset'){
                                        return null
                                    }
            
                                    const parts = timestring.split(" ");
                                    const timeParts = parts[0].split(":");
                                    let hours = parseInt(timeParts[0]);
                                    const minutes = parseInt(timeParts[1]);
                                    //const ampm = parts[1].toUpperCase();
            
                                    if(parts[1] == 'PM' && hours != 12){
                                        hours += 12
                                    }else if(parts[1] == 'AM' && hours == 12){
                                        hours = 0
                                    }
                                    
            
                                    return hours * 60 + minutes
                                }
            
                                const validTimestamps = sunset.filter(time =>{
                                    return time !== 'No sunset'
                                })
                                
            
                                const timeMinutes = validTimestamps.map(time => {
                                    return timeStringToMinutes(time)
                                })
                                
                                
            
                                const totalMinutes = timeMinutes.reduce((sum, minutes) =>{
                                    return sum + minutes
                                }, 0)
            
                                const averageMinutes = Math.round(totalMinutes / validTimestamps.length)
            
                                const averageHours = Math.floor(averageMinutes / 60)
                                const averageMinutesRemainder = averageMinutes % 60
            
                                return `${(averageHours).toString().padStart(2, "0")}:${averageMinutesRemainder.toString().padStart(2, "0")}`
            
                            
                            }
                
                            return [averageSunriseFunc(), averageSunset(), dayLight()]
                        }
                
                        //SEPTEMBER AVERAGES 
                        const septemberAverages = () =>{
                            const sunrise = []
                            const sunset = []
                            for(let i = 0; i < september.length; i++){
                                sunrise.push(september[i].astro.sunrise)
                                sunset.push(september[i].astro.sunset)
                            }
                
                            const dayLight = () =>{
                                const monthlyMaxesHRS = []
                                const monthlyMaxesMINS = []
                            
                                const totalDayLight = (riseTime, setTime, date) =>{
                        
                                    const sunrise = new Date(`${date.date} ${riseTime}`)
                                    const sunset = new Date(`${date.date} ${setTime}`)
                        
                                    const timeDifference = sunset - sunrise
                        
                                    const hours = Math.floor(timeDifference / (60 * 60 * 1000))
                                    const minutes = Math.floor((timeDifference % (60 * 60 * 1000)) / (60 * 1000))
                        
                                    return [hours, minutes]
                                }
                                
                                for(let i = 0; i < september.length; i++){
                                    monthlyMaxesHRS.push(totalDayLight(sunrise[i], sunset[i], september[i])[0])
                                    monthlyMaxesMINS.push(totalDayLight(sunrise[i], sunset[i], september[i])[1])
                
                                }
                
                                //console.log(Math.max(...monthlyMaxes[0]))
                                const hours = Math.max(...monthlyMaxesHRS)
                                const minutes = Math.max(...monthlyMaxesMINS)
                
                                return {hours, minutes}
                            }
                            //average sunrise
                            const averageSunriseFunc = () =>{
                                const timeStringToMinutes = (timestring) => {
                                    if(timestring === 'No sunrise'){
                                        return null
                                    }
            
                                    const parts = timestring.split(" ");
                                    const timeParts = parts[0].split(":");
                                    let hours = parseInt(timeParts[0]);
                                    const minutes = parseInt(timeParts[1]);
                                    //const ampm = parts[1].toUpperCase();
            
                                    if(parts[1] == 'PM' && hours != 12){
                                        hours += 12
                                    }else if(parts[1] == 'AM' && hours == 12){
                                        hours = 0
                                    }
                                    
            
                                    return hours * 60 + minutes
                                }
            
                                const validTimestamps = sunrise.filter(time =>{
                                    return time !== 'No sunrise'
                                })
                                
            
                                const timeMinutes = validTimestamps.map(time => {
                                    return timeStringToMinutes(time)
                                })
                                
                                
            
                                const totalMinutes = timeMinutes.reduce((sum, minutes) =>{
                                    return sum + minutes
                                }, 0)
            
                                const averageMinutes = Math.round(totalMinutes / validTimestamps.length)
            
                                const averageHours = Math.floor(averageMinutes / 60)
                                const averageMinutesRemainder = averageMinutes % 60
            
                                return `${(averageHours).toString().padStart(2, "0")}:${averageMinutesRemainder.toString().padStart(2, "0")}`
                            }
                
                            //average sunset
                            const averageSunset = () =>{
                                const timeStringToMinutes = (timestring) => {
                                    if(timestring === 'No sunset'){
                                        return null
                                    }
            
                                    const parts = timestring.split(" ");
                                    const timeParts = parts[0].split(":");
                                    let hours = parseInt(timeParts[0]);
                                    const minutes = parseInt(timeParts[1]);
                                    //const ampm = parts[1].toUpperCase();
            
                                    if(parts[1] == 'PM' && hours != 12){
                                        hours += 12
                                    }else if(parts[1] == 'AM' && hours == 12){
                                        hours = 0
                                    }
                                    
            
                                    return hours * 60 + minutes
                                }
            
                                const validTimestamps = sunset.filter(time =>{
                                    return time !== 'No sunset'
                                })
                                
            
                                const timeMinutes = validTimestamps.map(time => {
                                    return timeStringToMinutes(time)
                                })
                                
                                
            
                                const totalMinutes = timeMinutes.reduce((sum, minutes) =>{
                                    return sum + minutes
                                }, 0)
            
                                const averageMinutes = Math.round(totalMinutes / validTimestamps.length)
            
                                const averageHours = Math.floor(averageMinutes / 60)
                                const averageMinutesRemainder = averageMinutes % 60
            
                                return `${(averageHours).toString().padStart(2, "0")}:${averageMinutesRemainder.toString().padStart(2, "0")}`
            
                            
                            }
                
                            return [averageSunriseFunc(), averageSunset(), dayLight()]
                        }
                
                        //OCTOBER AVERAGES
                        const octoberAverages = () =>{
                            const sunrise = []
                            const sunset = []
                            for(let i = 0; i < october.length; i++){
                                sunrise.push(october[i].astro.sunrise)
                                sunset.push(october[i].astro.sunset)
                            }
                
                            const dayLight = () =>{
                                const monthlyMaxesHRS = []
                                const monthlyMaxesMINS = []
                            
                                const totalDayLight = (riseTime, setTime, date) =>{
                        
                                    const sunrise = new Date(`${date.date} ${riseTime}`)
                                    const sunset = new Date(`${date.date} ${setTime}`)
                        
                                    const timeDifference = sunset - sunrise
                        
                                    const hours = Math.floor(timeDifference / (60 * 60 * 1000))
                                    const minutes = Math.floor((timeDifference % (60 * 60 * 1000)) / (60 * 1000))
                        
                                    return [hours, minutes]
                                }
                                
                                for(let i = 0; i < october.length; i++){
                                    monthlyMaxesHRS.push(totalDayLight(sunrise[i], sunset[i], october[i])[0])
                                    monthlyMaxesMINS.push(totalDayLight(sunrise[i], sunset[i], october[i])[1])
                
                                }
                
                                //console.log(Math.max(...monthlyMaxes[0]))
                                const hours = Math.max(...monthlyMaxesHRS)
                                const minutes = Math.max(...monthlyMaxesMINS)
                
                                return {hours, minutes}
                            }
                
                            //average sunrise
                            const averageSunriseFunc = () =>{
                                const timeStringToMinutes = (timestring) => {
                                    if(timestring === 'No sunrise'){
                                        return null
                                    }
            
                                    const parts = timestring.split(" ");
                                    const timeParts = parts[0].split(":");
                                    let hours = parseInt(timeParts[0]);
                                    const minutes = parseInt(timeParts[1]);
                                    //const ampm = parts[1].toUpperCase();
            
                                    if(parts[1] == 'PM' && hours != 12){
                                        hours += 12
                                    }else if(parts[1] == 'AM' && hours == 12){
                                        hours = 0
                                    }
                                    
            
                                    return hours * 60 + minutes
                                }
            
                                const validTimestamps = sunrise.filter(time =>{
                                    return time !== 'No sunrise'
                                })
                                
            
                                const timeMinutes = validTimestamps.map(time => {
                                    return timeStringToMinutes(time)
                                })
                                
                                
            
                                const totalMinutes = timeMinutes.reduce((sum, minutes) =>{
                                    return sum + minutes
                                }, 0)
            
                                const averageMinutes = Math.round(totalMinutes / validTimestamps.length)
            
                                const averageHours = Math.floor(averageMinutes / 60)
                                const averageMinutesRemainder = averageMinutes % 60
            
                                return `${(averageHours).toString().padStart(2, "0")}:${averageMinutesRemainder.toString().padStart(2, "0")}`
                            }
                
                            //average sunset
                            const averageSunset = () =>{
                                const timeStringToMinutes = (timestring) => {
                                    if(timestring === 'No sunset'){
                                        return null
                                    }
            
                                    const parts = timestring.split(" ");
                                    const timeParts = parts[0].split(":");
                                    let hours = parseInt(timeParts[0]);
                                    const minutes = parseInt(timeParts[1]);
                                    //const ampm = parts[1].toUpperCase();
            
                                    if(parts[1] == 'PM' && hours != 12){
                                        hours += 12
                                    }else if(parts[1] == 'AM' && hours == 12){
                                        hours = 0
                                    }
                                    
            
                                    return hours * 60 + minutes
                                }
            
                                const validTimestamps = sunset.filter(time =>{
                                    return time !== 'No sunset'
                                })
                                
            
                                const timeMinutes = validTimestamps.map(time => {
                                    return timeStringToMinutes(time)
                                })
                                
                                
            
                                const totalMinutes = timeMinutes.reduce((sum, minutes) =>{
                                    return sum + minutes
                                }, 0)
            
                                const averageMinutes = Math.round(totalMinutes / validTimestamps.length)
            
                                const averageHours = Math.floor(averageMinutes / 60)
                                const averageMinutesRemainder = averageMinutes % 60
            
                                return `${(averageHours).toString().padStart(2, "0")}:${averageMinutesRemainder.toString().padStart(2, "0")}`
            
                            
                            }
                
                            return [averageSunriseFunc(), averageSunset(), dayLight()]
                        }
                
                        //NOVEMBER AVERAGES 
                        const novemberAverages = () =>{
                            const sunrise = []
                            const sunset = []
                            for(let i = 0; i < november.length; i++){
                                sunrise.push(november[i].astro.sunrise)
                                sunset.push(november[i].astro.sunset)
                            }
                
                            const dayLight = () =>{
                                const monthlyMaxesHRS = []
                                const monthlyMaxesMINS = []
                            
                                const totalDayLight = (riseTime, setTime, date) =>{
                        
                                    const sunrise = new Date(`${date.date} ${riseTime}`)
                                    const sunset = new Date(`${date.date} ${setTime}`)
                        
                                    const timeDifference = sunset - sunrise
                        
                                    const hours = Math.floor(timeDifference / (60 * 60 * 1000))
                                    const minutes = Math.floor((timeDifference % (60 * 60 * 1000)) / (60 * 1000))
                        
                                    return [hours, minutes]
                                }
                                
                                for(let i = 0; i < november.length; i++){
                                    monthlyMaxesHRS.push(totalDayLight(sunrise[i], sunset[i], november[i])[0])
                                    monthlyMaxesMINS.push(totalDayLight(sunrise[i], sunset[i], november[i])[1])
                
                                }
                
                                //console.log(Math.max(...monthlyMaxes[0]))
                                const hours = Math.max(...monthlyMaxesHRS)
                                const minutes = Math.max(...monthlyMaxesMINS)
                
                                return {hours, minutes}
                            }
                
                            //average sunrise
                            const averageSunriseFunc = () =>{
                                const timeStringToMinutes = (timestring) => {
                                    if(timestring === 'No sunrise'){
                                        return null
                                    }
            
                                    const parts = timestring.split(" ");
                                    const timeParts = parts[0].split(":");
                                    let hours = parseInt(timeParts[0]);
                                    const minutes = parseInt(timeParts[1]);
                                    //const ampm = parts[1].toUpperCase();
            
                                    if(parts[1] == 'PM' && hours != 12){
                                        hours += 12
                                    }else if(parts[1] == 'AM' && hours == 12){
                                        hours = 0
                                    }
                                    
            
                                    return hours * 60 + minutes
                                }
            
                                const validTimestamps = sunrise.filter(time =>{
                                    return time !== 'No sunrise'
                                })
                                
            
                                const timeMinutes = validTimestamps.map(time => {
                                    return timeStringToMinutes(time)
                                })
                                
                                
            
                                const totalMinutes = timeMinutes.reduce((sum, minutes) =>{
                                    return sum + minutes
                                }, 0)
            
                                const averageMinutes = Math.round(totalMinutes / validTimestamps.length)
            
                                const averageHours = Math.floor(averageMinutes / 60)
                                const averageMinutesRemainder = averageMinutes % 60
            
                                return `${(averageHours).toString().padStart(2, "0")}:${averageMinutesRemainder.toString().padStart(2, "0")}`
                            }
                
                            //average sunset
                            const averageSunset = () =>{
                                const timeStringToMinutes = (timestring) => {
                                    if(timestring === 'No sunset'){
                                        return null
                                    }
            
                                    const parts = timestring.split(" ");
                                    const timeParts = parts[0].split(":");
                                    let hours = parseInt(timeParts[0]);
                                    const minutes = parseInt(timeParts[1]);
                                    //const ampm = parts[1].toUpperCase();
            
                                    if(parts[1] == 'PM' && hours != 12){
                                        hours += 12
                                    }else if(parts[1] == 'AM' && hours == 12){
                                        hours = 0
                                    }
                                    
            
                                    return hours * 60 + minutes
                                }
            
                                const validTimestamps = sunset.filter(time =>{
                                    return time !== 'No sunset'
                                })
                                
            
                                const timeMinutes = validTimestamps.map(time => {
                                    return timeStringToMinutes(time)
                                })
                                
                                
            
                                const totalMinutes = timeMinutes.reduce((sum, minutes) =>{
                                    return sum + minutes
                                }, 0)
            
                                const averageMinutes = Math.round(totalMinutes / validTimestamps.length)
            
                                const averageHours = Math.floor(averageMinutes / 60)
                                const averageMinutesRemainder = averageMinutes % 60
            
                                return `${(averageHours).toString().padStart(2, "0")}:${averageMinutesRemainder.toString().padStart(2, "0")}`
            
                            
                            }
                
                            return [averageSunriseFunc(), averageSunset(), dayLight()]
                        }
                
                        //DECEMBER AVERAGES
                        const decemberAverages = () =>{
                            const sunrise = []
                            const sunset = []
                            for(let i = 0; i < decebmer.length; i++){
                                sunrise.push(decebmer[i].astro.sunrise)
                                sunset.push(decebmer[i].astro.sunset)
                            }
                
                            const dayLight = () =>{
                                const monthlyMaxesHRS = []
                                const monthlyMaxesMINS = []
                            
                                const totalDayLight = (riseTime, setTime, date) =>{
                        
                                    const sunrise = new Date(`${date.date} ${riseTime}`)
                                    const sunset = new Date(`${date.date} ${setTime}`)
                        
                                    const timeDifference = sunset - sunrise
                        
                                    const hours = Math.floor(timeDifference / (60 * 60 * 1000))
                                    const minutes = Math.floor((timeDifference % (60 * 60 * 1000)) / (60 * 1000))
                        
                                    return [hours, minutes]
                                }
                                
                                for(let i = 0; i < decebmer.length; i++){
                                    monthlyMaxesHRS.push(totalDayLight(sunrise[i], sunset[i], decebmer[i])[0])
                                    monthlyMaxesMINS.push(totalDayLight(sunrise[i], sunset[i], decebmer[i])[1])
                
                                }
                
                                //console.log(Math.max(...monthlyMaxes[0]))
                                const hours = Math.max(...monthlyMaxesHRS)
                                const minutes = Math.max(...monthlyMaxesMINS)
                
                                return {hours, minutes}
                            }
                
                            //average sunrise
                            const averageSunriseFunc = () =>{
                                const timeStringToMinutes = (timestring) => {
                                    if(timestring === 'No sunrise'){
                                        return null
                                    }
            
                                    const parts = timestring.split(" ");
                                    const timeParts = parts[0].split(":");
                                    let hours = parseInt(timeParts[0]);
                                    const minutes = parseInt(timeParts[1]);
                                    //const ampm = parts[1].toUpperCase();
            
                                    if(parts[1] == 'PM' && hours != 12){
                                        hours += 12
                                    }else if(parts[1] == 'AM' && hours == 12){
                                        hours = 0
                                    }
                                    
            
                                    return hours * 60 + minutes
                                }
            
                                const validTimestamps = sunrise.filter(time =>{
                                    return time !== 'No sunrise'
                                })
                                
            
                                const timeMinutes = validTimestamps.map(time => {
                                    return timeStringToMinutes(time)
                                })
                                
                                
            
                                const totalMinutes = timeMinutes.reduce((sum, minutes) =>{
                                    return sum + minutes
                                }, 0)
            
                                const averageMinutes = Math.round(totalMinutes / validTimestamps.length)
            
                                const averageHours = Math.floor(averageMinutes / 60)
                                const averageMinutesRemainder = averageMinutes % 60
            
                                return `${(averageHours).toString().padStart(2, "0")}:${averageMinutesRemainder.toString().padStart(2, "0")}`
                            }
                
                            //average sunset
                            const averageSunset = () =>{
                                const timeStringToMinutes = (timestring) => {
                                    if(timestring === 'No sunset'){
                                        return null
                                    }
            
                                    const parts = timestring.split(" ");
                                    const timeParts = parts[0].split(":");
                                    let hours = parseInt(timeParts[0]);
                                    const minutes = parseInt(timeParts[1]);
                                    //const ampm = parts[1].toUpperCase();
            
                                    if(parts[1] == 'PM' && hours != 12){
                                        hours += 12
                                    }else if(parts[1] == 'AM' && hours == 12){
                                        hours = 0
                                    }
                                    
            
                                    return hours * 60 + minutes
                                }
            
                                const validTimestamps = sunset.filter(time =>{
                                    return time !== 'No sunset'
                                })
                                
            
                                const timeMinutes = validTimestamps.map(time => {
                                    return timeStringToMinutes(time)
                                })
                                
                                
            
                                const totalMinutes = timeMinutes.reduce((sum, minutes) =>{
                                    return sum + minutes
                                }, 0)
            
                                const averageMinutes = Math.round(totalMinutes / validTimestamps.length)
            
                                const averageHours = Math.floor(averageMinutes / 60)
                                const averageMinutesRemainder = averageMinutes % 60
            
                                return `${(averageHours).toString().padStart(2, "0")}:${averageMinutesRemainder.toString().padStart(2, "0")}`
            
                            
                            }
                
                            return [averageSunriseFunc(), averageSunset(), dayLight()]
                        }
                
                        const ALL_SUNRISES = [
                            januaryAverages()[0], februaryAverages()[0], marchAverages()[0], aprilAverages()[0], mayAverages()[0],
                            juneAverages()[0], julyAverages()[0], augustAverages()[0], septemberAverages()[0], octoberAverages()[0], novemberAverages()[0], decemberAverages()[0]
                        ]
                        //console.log(ALL_SUNRISES)
            
                        const ALL_SUNSETS = [
                            januaryAverages()[1], februaryAverages()[1], marchAverages()[1], aprilAverages()[1], mayAverages()[1],
                            juneAverages()[1], julyAverages()[1], augustAverages()[1], septemberAverages()[1], octoberAverages()[1], novemberAverages()[1], decemberAverages()[1]
                        ]
                        //console.log(ALL_SUNSETS)
                
                        const sunriseTimes = ALL_SUNRISES.map(timestring => {
                            const [hours, minutes] = timestring.split(":")
                            return new Date(0, 0, 0, parseInt(hours), parseInt(minutes))
                        })
            
                        //OUR START
                        let earliestSunrise = sunriseTimes[0]
            
                        for(const time of sunriseTimes){
                            if(time < earliestSunrise){
                                earliestSunrise = time
                            }
                        }
                        
                        //console.log(`${String(earliestSunrise.getHours()).padStart(2, "0")}:${String(earliestSunrise.getMinutes()).padStart(2, "0")}`)
            
                        const sunsetTimes = ALL_SUNSETS.map(timestring => {
                            const [hours, minutes] = timestring.split(":")
                            return new Date(0, 0, 0, parseInt(hours), parseInt(minutes))
                        })
            
                        //OUR END
                        let latestSunset = sunsetTimes[0]
            
                        for(const time of sunsetTimes){
                            if(time > latestSunset){
                                latestSunset = time
                            }
                        }
            
                        //console.log(`${String(latestSunset.getHours()).padStart(2, "0")}:${String(latestSunset.getMinutes()).padStart(2, "0")}`)
            
                        //THE FUNCTION TO DETERMINE THE STYLING
                        const styleElementByTime = (sunrise, sunset, earliestSunrise, latestSunset) =>{
                            const totalWidth = 200
                            const startTime = new Date(0, 0, 0, parseInt(sunrise.split(":")[0]), parseInt(sunrise.split(":")[1]))
                            const endTime = new Date(0, 0, 0, parseInt(sunset.split(":")[0]), parseInt(sunset.split(":")[1]))
            
                            const totalMinutes = (latestSunset - earliestSunrise) / 60000
            
                            const styleStartTime = new Date(earliestSunrise)
                            const styleEnd = new Date(earliestSunrise.getTime() + (totalMinutes / 2) * 60000)
            
                            if(startTime.getTime() ===  endTime.getTime()){
                                return {
                                    width: `100%`,
                                    background: "blue", // subject of change
                                    left: `0px`
                                }
                            }
            
                            const lowOffset = ((startTime - earliestSunrise) / 60000) / totalMinutes
                            const widthPercentage = Math.min(((endTime - startTime) / 60000) / totalMinutes * 100, 100 - lowOffset * 100)
                            const width = (widthPercentage / 100) * totalWidth
            
                            
                            //console.log(widthPercentage.toFixed(1))
                            return {
                                left: `${lowOffset * 100}%`,
                                width: `${widthPercentage.toFixed(1)}%`
                            }
                        }
            
                        //GRAB THE ELEMENTS
                        const styleOnTop = document.querySelectorAll(".amp-ss-style") 
            
                        //EACH LOOP WILL CALL THE FUNCTION DO ITS STYLING
                        for(let i = 0; i < ALL_SUNRISES.length; i++){
                            const style = styleElementByTime(ALL_SUNRISES[i], ALL_SUNSETS[i], earliestSunrise, latestSunset)
                            
                            styleOnTop[i].style.left = style.left
                            styleOnTop[i].style.width = style.width
            
                            //console.log(ALL_SUNRISES[i], ALL_SUNSETS[i])

                            sunriseSpan[i].textContent = ALL_SUNRISES[i]
                            sunsetSpan[i].textContent = ALL_SUNSETS[i]
                        }
                        
                    }
                    
                   FINAL_CONVERT()
                }
                INIT_MAIN_MONTHS()

                const nextFullMoon =  () =>{

                    const forecastMoon = () =>{
                        for(let j = 1; j < weatherData.forecast.forecastday.length; j++){
            
                            if(weatherData.forecast.forecastday[j].astro.moon_phase === "Full Moon"){
                                let fullMoonDate = new Date(weatherData.forecast.forecastday[j].date)
                                return fullMoonDate.toLocaleDateString("default", {weekday: "long", day: "2-digit", month: "short"})
                                
                            }
                        }
                    }
            
                   
                    const currentDate = new Date(weatherData.current.last_updated);
            
                    // Calculate the first date, 14 days from now
                    const firstDate = new Date(currentDate);
                    firstDate.setDate(firstDate.getDate() + 14);
            
                    // Calculate the second date, 30 days from the first date
                    const secondDate = new Date(firstDate);
                    secondDate.setDate(secondDate.getDate() + 30);
            
                    // Format both dates as yyyy-mm-dd
                    const formatDate = (date) => {
                        const year = date.getFullYear();
                        const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-based
                        const day = String(date.getDate()).padStart(2, '0');
                        return `${year}-${month}-${day}`;
                    };
            
                    const fetchFutureData = async (date) =>{ 
                        const data = await fetch(`${BASE_URL}/future.json?key=${API_KEY}&q=${weatherData.location.name}&dt=${formatDate(date)}`) 
                        const convert = await data.json()
            
                        return convert
                    }
            
                    
                    const loopForFetchingData = async () =>{
                        const weatherArray = []
                        
            
                        while (firstDate < secondDate){
                            const data = await fetchFutureData(firstDate)
                            weatherArray.push(data.forecast.forecastday)
            
                            firstDate.setDate(firstDate.getDate() + 1)
                        }
                        return weatherArray
                    }
                    
                    const MAIN_INIT_FUNC = async () =>{
                        const data = await loopForFetchingData()
            
                        if(forecastMoon() === undefined){
                            for(let i = 0; i < data.length; i++){
                                if(data[i][0].astro.moon_phase === 'Full Moon'){
                                    const fullMoonDate = new Date(data[i][0].date)
                                    moonPhaseSpan.textContent = fullMoonDate.toLocaleDateString("default", {weekday: "long", day: "2-digit", month: "short"})
                                }
                            }
                        }else {
                            moonPhaseSpan.textContent = forecastMoon()
                        }
                    }
                    MAIN_INIT_FUNC()
                }
                nextFullMoon()
                break
            }
            
            
        }  
        
    }

    const styleSunOnImgADVANCED = () =>{
        let timeRightNow = new Date(weatherData.current.last_updated).getHours()
        

        const littleSun = document.querySelector(".little-sun-ADVANCED")

        let sunriseTime = weatherData.forecast.forecastday[0].astro.sunrise 
        sunriseTime = sunriseTime.slice("0", "2")
        //console.log(sunriseTime)

        let sunsetTime = weatherData.forecast.forecastday[0].astro.sunset 
        sunsetTime = Number(sunsetTime.slice("0", "2")) + 12
        //console.log(sunsetTime)

        if(weatherData.current.is_day){
            //console.log("Before sunrise")

            littleSun.classList.remove("night")
            littleSun.classList.add("day")
        }else {
            //console.log("Daytime")

            littleSun.classList.add("night")
            littleSun.classList.remove("day")
        } 
        
        for(let i = 0; i < weatherData.forecast.forecastday[0].hour.length; i++){
            let everyHour24 = weatherData.forecast.forecastday[0].hour[i].time
            everyHour24 = Number(everyHour24.slice("11", "13"))

            
            if(timeRightNow == everyHour24){
                //console.log(timeRightNow, everyHour24)
                //let timeRightNow = 0

                if(timeRightNow == 0){
                   // console.log(timeRightNow, everyHour24)

                    littleSun.style.left = `0`
                    littleSun.style.bottom = `69px`
                } else if(timeRightNow == 1){
                    //console.log(timeRightNow, everyHour24)

                    littleSun.style.left = `20px`
                    littleSun.style.bottom = `75px`
                }else if(timeRightNow == 2){
                    //console.log(timeRightNow, everyHour24)

                    littleSun.style.left = `40px`
                    littleSun.style.bottom = `86px`
                }else if(timeRightNow == 3){
                    //console.log(timeRightNow, everyHour24)

                    littleSun.style.left = `60px`
                    littleSun.style.bottom = `100.5px`
                }else if(timeRightNow == 4){
                   // console.log(timeRightNow, everyHour24)

                    littleSun.style.left = `80px`
                    littleSun.style.bottom = `116.5px`
                }else if(timeRightNow == 5){
                    //console.log(timeRightNow, everyHour24)

                    littleSun.style.left = `110px`
                    littleSun.style.bottom = `141px`
                }else if(timeRightNow == 6){
                    //console.log(timeRightNow, everyHour24)

                    littleSun.style.left = `119px`
                    littleSun.style.bottom = `151px`
                }else if(timeRightNow == 7){
                    //console.log(timeRightNow, everyHour24)

                    littleSun.style.left = `126px`
                    littleSun.style.bottom = `157px`
                }else if(timeRightNow == 8){
                    //console.log(timeRightNow, everyHour24)

                    littleSun.style.left = `138px`
                    littleSun.style.bottom = `166px`
                }else if(timeRightNow == 9){
                    //console.log(timeRightNow, everyHour24)

                    littleSun.style.left = `160px`
                    littleSun.style.bottom = `185px`
                }else if(timeRightNow == 10){
                    //console.log(timeRightNow, everyHour24)

                    littleSun.style.left = `180px`
                    littleSun.style.bottom = `201px`
                }else if(timeRightNow == 11){
                    //console.log(timeRightNow, everyHour24)

                    littleSun.style.left = `210px`
                    littleSun.style.bottom = `220px`
                }else if(timeRightNow == 12){
                    //console.log(timeRightNow, everyHour24)

                    littleSun.style.left = `243px`
                    littleSun.style.bottom = `230px`
                }else if(timeRightNow == 13){
                    //console.log(timeRightNow, everyHour24)

                    littleSun.style.right = `190px`
                    littleSun.style.bottom = `221px`
                }else if(timeRightNow == 14){
                    //console.log(timeRightNow, everyHour24)

                    littleSun.style.right = `160px`
                    littleSun.style.bottom = `204px`
                }else if(timeRightNow == 15){
                    //console.log(timeRightNow, everyHour24)

                    littleSun.style.right = `140px`
                    littleSun.style.bottom = `188px`
                }else if(timeRightNow == 16){
                    //console.log(timeRightNow, everyHour24)

                    littleSun.style.right = `125px`
                    littleSun.style.bottom = `176px`
                }else if(timeRightNow == 17){
                    //console.log(timeRightNow, everyHour24)

                    littleSun.style.right = `108px`
                    littleSun.style.bottom = `163px`
                }else if(timeRightNow == 18){
                    //console.log(timeRightNow, everyHour24)

                    littleSun.style.right = `96px`
                    littleSun.style.bottom = `151px`
                }else if(timeRightNow == 19){
                    //console.log(timeRightNow, everyHour24)

                    littleSun.style.right = `90px`
                    littleSun.style.bottom = `146px`
                }else if(timeRightNow == 20){
                    //console.log(timeRightNow, everyHour24)

                    littleSun.style.right = `60px`
                    littleSun.style.bottom = `120px`
                }else if(timeRightNow == 21){
                    //console.log(timeRightNow, everyHour24)

                    littleSun.style.right = `40px`
                    littleSun.style.bottom = `103px`
                }else if(timeRightNow == 22){
                    //console.log(timeRightNow, everyHour24)

                    littleSun.style.right = `20px`
                    littleSun.style.bottom = `89px`
                }else if(timeRightNow == 23){
                    //console.log(timeRightNow, everyHour24)

                    littleSun.style.right = `0px`
                    littleSun.style.bottom = `79px`
                }
            }
            
        }
    }
    

    const mainFunctionSUNRISE_SUNSET = () =>{
        createElementSUNSET_SUNRISE()
        styleSunOnImgADVANCED()

        //PUT MAIN SUNRISE/SUNSET HERE
        
    }
    
    const divSUNSET_SUNRISE = document.querySelector(".sunset")
    divSUNSET_SUNRISE.addEventListener("click", ()=>{
        mainFunctionSUNRISE_SUNSET()
        const addInfo = document.querySelector(".additional-info")
        ADVANCED_DATA_OVERLAY.style.display = 'flex'
        
        body.style.overflow = "hidden"
    })

    //ADVANCED FORECAST DATA IMPLEMENTATION
    const createElementFORECAST = () =>{
        //const wrapper = document.querySelector(".forecast-days-wrap")
        //const WHLE_ELMNT = document.querySelector(".advanced-data")
        const PARENT_ELEMENT = document.querySelector(".additional-info")
        PARENT_ELEMENT.innerHTML = ` `
        const headline = document.createElement("div")
        headline.classList.add("headline")
        headline.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M0 336c0 79.5 64.5 144 144 144H512c70.7 0 128-57.3 128-128c0-61.9-44-113.6-102.4-125.4c4.1-10.7 6.4-22.4 6.4-34.6c0-53-43-96-96-96c-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32C167.6 32 96 103.6 96 192c0 2.7 .1 5.4 .2 8.1C40.2 219.8 0 273.2 0 336z"/></svg>
        <span>Conditions</span>
        `
        const closeX = document.createElement("div")
        closeX.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
        ` 
        headline.appendChild(closeX)
        PARENT_ELEMENT.appendChild(headline)

        closeX.addEventListener("click", ()=>{
            PARENT_ELEMENT.innerHTML = ``
            ADVANCED_DATA_OVERLAY.style.display = "none"
            body.style.overflow = "auto"
        })

        
        PARENT_ELEMENT.style.marginTop = `16rem`
        
        const WHLE_ELMNT = document.createElement("div")
        WHLE_ELMNT.classList.add("advanced-data")
        PARENT_ELEMENT.appendChild(WHLE_ELMNT)
        WHLE_ELMNT.innerHTML = ``
        const wrapper = document.createElement("div")
        wrapper.classList.add("forecast-days-wrap")
        const index = document.createElement("div")
        index.classList.add("index")
        const extraText = document.createElement("div")
        extraText.classList.add("extra-text")
        WHLE_ELMNT.appendChild(wrapper)
        
        
        const actualHighAndLow = () =>{
            const temps = []
            for(let i = 0; i < weatherData.forecast.forecastday[0].hour.length; i++){
                temps.push(weatherData.forecast.forecastday[0].hour[i].temp_c)
            }
            return temps 
        }

        for(let i = 0; i < weatherData.forecast.forecastday.length; i++){
            let days = new Date(weatherData.forecast.forecastday[i].date)
            let daysShort = days.toLocaleDateString("default", {"weekday": "narrow"})
            let fullDay = days.toLocaleDateString("default", {weekday: "long", day: "2-digit", month: "long", "year": "numeric"})
            let numbersDays = days.toLocaleDateString("default", {day: "2-digit"})
            let currentHour = new Date(weatherData.current.last_updated).getHours()
            let sunsetToday = Number(weatherData.forecast.forecastday[i].astro.sunset.slice("0", "2")) + 12
            
            const WEATHER_PER_HOUR = () =>{
                if(weatherData.current.is_day == 1){
                    if(weatherData.current.condition.text == 'Mist'){
                        //console.log("Mist Day")
                        return '<img src="fog.png">'
                    } else if (weatherData.current.condition.text == 'Sunny'){
                        //console.log("Sunny Day")
                        return '<img src="sunny.png">'
                    }else if((weatherData.current.condition.text == 'Partly cloudy')) {
                        //console.log("Partly Cloudy Day")
                        return '<img src="cloud-sun-off.png">'
                    } else if((weatherData.current.condition.text == 'Cloudy') || (weatherData.current.condition.text == 'Overcast')) {
                        //console.log("Overcast or cloudy Day")
                        return '<img src="cloud-removebg-preview.png">'
                    } else if ((weatherData.current.condition.text == 'Heavy rain')){
                        //console.log("Heavy Rain Day")
                        return '<img src="rain.png">'
                    } else if ((weatherData.current.condition.text == 'Moderate rain')){
                        //console.log("Moderate Rain Day")
                        return '<img src="rain.png">'
                    } else if ((weatherData.current.condition.text == 'Fog')){
                        //console.log("Fog Day")
                        return '<img src="fog.png">'
                    } else if((weatherData.current.condition.text == 'Patchy rain possible' || weatherData.current.condition.text== 'Light drizzle' || weatherData.current.condition.text == 'Light rain shower')){
                        return '<img src="rain.png">'
                    } else if (weatherData.current.condition.text == 'Patchy light rain' || weatherData.current.condition.text == 'Light rain' || weatherData.current.condition.text == 'Moderate or heavy rain shower' || weatherData.current.condition.text == 'Moderate rain at times' || weatherData.current.condition.text == 'Patchy light drizzle' || weatherData.current.condition.text == 'Light freezing rain'){
                        return '<img src="rain.png">'
                    } else if(weatherData.current.condition.text == 'Thundery outbreaks possible' || weatherData.current.condition.text == 'Patchy light rain with thunder' || weatherData.current.condition.text == 'Moderate or heavy rain with thunder') {
                        return '<img src="thunder.png">'
                    } else if(weatherData.current.condition.text.includes("snow")){
                        return '<img src="snowflake.png">'
                    }else if(weatherData.current.condition.text = "Light freezing rain"){
                        return '<img src="rain.png">'
                    }else if(weatherData.current.condition.text = "Blizzard"){
                        return '<img src="snowflake.png">'
                    }else{
                        console.log((weatherData.current.condition.text))
                        return 'CONDITION NOT DEFINED'
                    }

                } else {
                    if(weatherData.current.condition.text == 'Mist'){
                        //console.log("Mist Night")
                        return '<img src="fog.png">'
                    } else if (weatherData.current.condition.text == 'Clear'){
                        //console.log("Clear Night")
                        return '<img src="moon.png">'
                    }else if((weatherData.current.condition.text == 'Partly cloudy')) {
                        //console.log("Partly Cloudy Night")
                        return '<img src="cloud-moon.png">'
                    } else if((weatherData.current.condition.text == 'Cloudy') || (weatherData.current.condition.text == 'Overcast')) {
                        //console.log("Overcast or Cloudy Night")
                        return '<img src="cloud-removebg-preview.png">'
                    } else if ((weatherData.current.condition.text == 'Heavy rain')){
                        //console.log("Heavy Rain Night")
                        return '<img src="moon rain.png">'
                    } else if ((weatherData.current.condition.text == 'Moderate rain')){
                        //console.log("Moderate Rain Night")
                        return '<img src="moon rain.png">'
                    } else if ((weatherData.current.condition.text == 'Fog')){
                        //console.log("Fog Night")
                        return '<img src="fog.png">'
                    } else if((weatherData.current.condition.text == 'Patchy rain possible' || weatherData.current.condition.text == 'Light drizzle' || weatherData.current.condition.text == 'Light rain shower')){
                        return '<img src="moon rain.png">'
                    } else if (weatherData.current.condition.text == 'Patchy light rain' || weatherData.current.condition.text == 'Light rain' || weatherData.current.condition.text == 'Moderate or heavy rain shower' || weatherData.current.condition.text == 'Moderate rain at times' || weatherData.current.condition.text == 'Patchy light drizzle' || weatherData.current.condition.text == 'Light freezing rain'){
                        return '<img src="moon rain.png">'
                    } else if(weatherData.current.condition.text == 'Thundery outbreaks possible' || weatherData.current.condition.text == 'Patchy light rain with thunder' || weatherData.current.condition.text == 'Moderate or heavy rain with thunder') {
                        return '<img src="thunder night.png">'
                    }  else if(weatherData.current.condition.text.includes("snow")){
                        return '<img src="snowflake.png">'
                    }else if(weatherData.current.condition.text = "Light freezing rain"){
                        return '<img src="rain.png">'
                    }else if(weatherData.current.condition.text = "Blizzard"){
                        return '<img src="snowflake.png">'
                    }else{
                        console.log((weatherData.current.condition.text))
                        return 'CONDITION NOT DEFINED'
                    }
                }
            }

            //console.log(fullDay)
            if(i == 0){
                
                const day = document.createElement("div")
                day.classList.add("forecast-each-day")
                day.innerHTML = `
                <span>${daysShort}</span>
                <span class="numbers active">${numbersDays}</span>
                `
                wrapper.appendChild(day)

                //console.log(weatherData)

                const fullDate = document.createElement("div")
                fullDate.classList.add("datepicked")
                fullDate.textContent = fullDay
                WHLE_ELMNT.appendChild(fullDate)
                index.innerHTML = `
                <div class="special">
                    <span>${Math.round(weatherData.current.temp_c)}°</span>
                    <span class="forecast-low-temp"></span>
                    ${WEATHER_PER_HOUR()}
                </div>
                <span class="highLow-precip">H:${Math.round(Math.max(...actualHighAndLow()))}° L:${Math.round(Math.min(...actualHighAndLow()))}°</span>

                <div class="dropdown">

                    <div class="select">
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M0 336c0 79.5 64.5 144 144 144H512c70.7 0 128-57.3 128-128c0-61.9-44-113.6-102.4-125.4c4.1-10.7 6.4-22.4 6.4-34.6c0-53-43-96-96-96c-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32C167.6 32 96 103.6 96 192c0 2.7 .1 5.4 .2 8.1C40.2 219.8 0 273.2 0 336z"></path></svg>
                        <svg class="rotated " xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"/></svg>
                    </div>

                    <div class="menu-wrapper">
                        <div class="each-item-menu">
                            <div class="svg-tick">
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
                            </div>
                            <div>
                                <span>Conditions</span>
                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M0 336c0 79.5 64.5 144 144 144H512c70.7 0 128-57.3 128-128c0-61.9-44-113.6-102.4-125.4c4.1-10.7 6.4-22.4 6.4-34.6c0-53-43-96-96-96c-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32C167.6 32 96 103.6 96 192c0 2.7 .1 5.4 .2 8.1C40.2 219.8 0 273.2 0 336z"></path></svg>
                            </div>
                        </div>
                        <div class="each-item-menu">
                            <div class="svg-tick">
                                
                            </div>
                            <div>
                                <span>UV Index</span>
                                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24"><path d="M12,17c-2.76,0-5-2.24-5-5s2.24-5,5-5,5,2.24,5,5-2.24,5-5,5Zm1-13V1c0-.55-.45-1-1-1s-1,.45-1,1v3c0,.55,.45,1,1,1s1-.45,1-1Zm0,19v-3c0-.55-.45-1-1-1s-1,.45-1,1v3c0,.55,.45,1,1,1s1-.45,1-1ZM5,12c0-.55-.45-1-1-1H1c-.55,0-1,.45-1,1s.45,1,1,1h3c.55,0,1-.45,1-1Zm19,0c0-.55-.45-1-1-1h-3c-.55,0-1,.45-1,1s.45,1,1,1h3c.55,0,1-.45,1-1ZM6.71,6.71c.39-.39,.39-1.02,0-1.41l-2-2c-.39-.39-1.02-.39-1.41,0s-.39,1.02,0,1.41l2,2c.2,.2,.45,.29,.71,.29s.51-.1,.71-.29Zm14,14c.39-.39,.39-1.02,0-1.41l-2-2c-.39-.39-1.02-.39-1.41,0s-.39,1.02,0,1.41l2,2c.2,.2,.45,.29,.71,.29s.51-.1,.71-.29Zm-16,0l2-2c.39-.39,.39-1.02,0-1.41s-1.02-.39-1.41,0l-2,2c-.39,.39-.39,1.02,0,1.41,.2,.2,.45,.29,.71,.29s.51-.1,.71-.29ZM18.71,6.71l2-2c.39-.39,.39-1.02,0-1.41s-1.02-.39-1.41,0l-2,2c-.39,.39-.39,1.02,0,1.41,.2,.2,.45,.29,.71,.29s.51-.1,.71-.29Z"></path></svg>
                            </div>
                        </div>
                        <div class="each-item-menu">
                            <div class="svg-tick"></div>
                            <div>
                                <span>Wind</span>
                                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24"><path d="M0,12a1,1,0,0,1,1-1H7a1,1,0,0,1,0,2H1A1,1,0,0,1,0,12Zm20.886-.893A4.99,4.99,0,1,0,12,8a1,1,0,0,0,2,0,3,3,0,1,1,3,3H11a1,1,0,0,0,0,2h9a2,2,0,0,1,2,2c-.009,2.337-3.281,2.648-4.057.667a1,1,0,0,0-1.886.666C17.615,20.415,23.952,19.579,24,15A4,4,0,0,0,20.886,11.107ZM11,16H1a1,1,0,0,0,0,2H11a2,2,0,0,1,2,2c-.009,2.337-3.281,2.648-4.057.667a1,1,0,1,0-1.886.666C8.615,25.415,14.952,24.579,15,20A4,4,0,0,0,11,16ZM1,8H7a4,4,0,0,0,4-4C10.952-.581,4.613-1.414,3.057,2.667a1,1,0,0,0,1.886.666C5.72,1.351,8.991,1.663,9,4A2,2,0,0,1,7,6H1A1,1,0,0,0,1,8Z"></path></svg>
                        
                            </div>
                        </div>
                        <div class="each-item-menu">
                            <div class="svg-tick"></div>
                            <div>
                                <span>Precipitation</span>
                                <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">

                                    <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)">
                                    <path d="M2413 4898 c-779 -1184 -1258 -2187 -1394 -2918 -26 -137 -36 -428
                                    -20 -553 84 -631 499 -1151 1076 -1345 434 -147 924 -86 1305 159 472 305 750
                                    820 751 1387 0 180 -20 332 -66 522 -147 597 -468 1299 -995 2175 -196 325
                                    -495 785 -511 785 -3 0 -70 -96 -146 -212z"></path>
                                    </g>
                                    </svg>
                            </div>
                        </div>
                        <div class="each-item-menu">
                            <div class="svg-tick"></div>
                            <div>
                                <span>Feels Like</span>
                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M416 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm0 128A96 96 0 1 0 416 0a96 96 0 1 0 0 192zM96 112c0-26.5 21.5-48 48-48s48 21.5 48 48V276.5c0 17.3 7.1 31.9 15.3 42.5C217.8 332.6 224 349.5 224 368c0 44.2-35.8 80-80 80s-80-35.8-80-80c0-18.5 6.2-35.4 16.7-48.9C88.9 308.4 96 293.8 96 276.5V112zM144 0C82.1 0 32 50.2 32 112V276.5c0 .1-.1 .3-.2 .6c-.2 .6-.8 1.6-1.7 2.8C11.2 304.2 0 334.8 0 368c0 79.5 64.5 144 144 144s144-64.5 144-144c0-33.2-11.2-63.8-30.1-88.1c-.9-1.2-1.5-2.2-1.7-2.8c-.1-.3-.2-.5-.2-.6V112C256 50.2 205.9 0 144 0zm0 416c26.5 0 48-21.5 48-48c0-20.9-13.4-38.7-32-45.3V112c0-8.8-7.2-16-16-16s-16 7.2-16 16V322.7c-18.6 6.6-32 24.4-32 45.3c0 26.5 21.5 48 48 48z"></path></svg>
                        
                            </div>
                        </div>
                        <div class="each-item-menu">
                            <div class="svg-tick"></div>
                            
                            <div>
                                <span>Humidity</span>
                                <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
                        
                                    <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)">
                                    <path d="M1866 4785 c-22 -7 -49 -24 -62 -37 -39 -40 -329 -452 -499 -708
                                    -524 -791 -834 -1397 -948 -1850 -28 -113 -31 -140 -32 -285 0 -184 17 -297
                                    72 -470 91 -287 267 -550 492 -737 218 -181 456 -294 736 -350 148 -30 422
                                    -32 570 -4 199 36 431 126 582 225 77 50 108 102 100 169 -9 81 -77 142 -157
                                    142 -35 0 -60 -8 -106 -36 -234 -142 -431 -199 -694 -199 -172 0 -243 11 -396
                                    60 -201 66 -348 157 -505 314 -110 110 -181 206 -241 326 -118 234 -164 517
                                    -119 731 80 384 395 1001 916 1789 196 295 333 490 345 490 19 0 401 -565 595
                                    -880 317 -515 557 -998 633 -1273 19 -66 19 -72 4 -72 -33 0 -118 48 -177 99
                                    -83 72 -219 138 -325 157 -202 38 -404 -18 -565 -156 -78 -68 -146 -99 -238
                                    -109 -41 -5 -88 -16 -104 -26 -97 -57 -103 -201 -11 -267 47 -33 141 -36 249
                                    -9 109 27 193 71 281 144 104 88 163 112 268 112 104 -1 163 -25 260 -109 161
                                    -138 378 -194 585 -151 94 20 214 81 305 156 105 86 144 102 255 103 79 1 97
                                    -2 145 -26 31 -15 85 -53 120 -83 80 -70 201 -130 300 -151 188 -39 295 13
                                    295 144 0 101 -53 148 -182 163 -95 10 -142 32 -233 109 -126 107 -292 170
                                    -445 170 -133 0 -294 -54 -398 -133 -26 -21 -51 -37 -55 -37 -4 0 -18 35 -31
                                    78 -90 311 -364 856 -698 1391 -194 311 -635 957 -712 1045 -39 45 -116 63
                                    -175 41z"></path>
                                    <path d="M4025 4625 c-50 -18 -76 -48 -214 -244 -200 -285 -345 -546 -413
                                    -742 -30 -86 -32 -104 -32 -214 1 -100 5 -132 26 -197 39 -119 92 -204 182
                                    -294 90 -90 175 -143 294 -182 67 -22 94 -26 212 -26 118 0 145 4 212 26 119
                                    39 204 92 294 182 90 90 143 175 182 294 21 65 25 96 26 197 0 131 -13 183
                                    -89 357 -105 238 -466 792 -542 832 -45 23 -94 27 -138 11z m152 -562 c155
                                    -239 246 -409 283 -532 30 -97 23 -170 -25 -267 -42 -86 -102 -144 -193 -187
                                    -61 -29 -76 -32 -162 -32 -86 0 -101 3 -162 32 -91 43 -151 101 -193 187 -48
                                    97 -55 170 -25 267 22 75 82 202 153 324 63 109 218 345 227 345 4 0 48 -62
                                    97 -137z"></path>
                                    <path d="M2380 1725 c-91 -21 -212 -83 -300 -156 -92 -76 -139 -98 -233 -108
                                    -89 -10 -128 -29 -158 -78 -69 -111 14 -243 153 -243 140 1 288 58 418 164
                                    119 96 154 111 265 111 107 0 170 -24 252 -97 258 -230 635 -235 893 -12 99
                                    86 155 109 265 109 110 0 166 -23 265 -109 122 -106 298 -172 437 -164 43 3
                                    71 10 90 24 93 70 96 192 7 261 -26 19 -52 27 -114 34 -97 11 -149 35 -245
                                    114 -277 228 -645 217 -910 -26 -16 -15 -55 -40 -85 -56 -48 -24 -67 -27 -145
                                    -28 -107 0 -166 23 -255 99 -132 114 -264 166 -430 172 -68 2 -128 -2 -170
                                    -11z"></path>
                                    </g>
                                    </svg>
                            </div>
                        </div>
                        <div class="each-item-menu">
                            <div class="svg-tick"></div>
                            <div>
                                <span>Visibility</span>
                                <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24"><path d="M23.271,9.419C21.72,6.893,18.192,2.655,12,2.655S2.28,6.893.729,9.419a4.908,4.908,0,0,0,0,5.162C2.28,17.107,5.808,21.345,12,21.345s9.72-4.238,11.271-6.764A4.908,4.908,0,0,0,23.271,9.419Zm-1.705,4.115C20.234,15.7,17.219,19.345,12,19.345S3.766,15.7,2.434,13.534a2.918,2.918,0,0,1,0-3.068C3.766,8.3,6.781,4.655,12,4.655s8.234,3.641,9.566,5.811A2.918,2.918,0,0,1,21.566,13.534Z"></path><path d="M12,7a5,5,0,1,0,5,5A5.006,5.006,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z"></path></svg>
                        
                            </div>
                        </div>
                        <div class="each-item-menu">
                            <div class="svg-tick">
                            
                            </div>
                            
                            <div>
                                <span>Pressure</span>
                                <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
                        
                                    <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)">
                                <path d="M2300 4656 c-386 -53 -721 -190 -1022 -417 -107 -80 -317 -290 -397
                                -397 -703 -931 -529 -2240 392 -2954 366 -283 822 -438 1287 -438 809 1 1539
                                457 1896 1186 350 714 266 1566 -217 2206 -80 107 -290 317 -397 397 -278 210
                                -596 347 -946 407 -124 21 -471 27 -596 10z m100 -445 c0 -144 7 -171 53 -219
                                75 -77 199 -57 246 42 18 36 21 61 21 174 l0 132 28 0 c56 0 219 -33 330 -66
                                202 -61 389 -155 560 -281 l74 -54 -105 -108 c-83 -85 -107 -116 -112 -145
                                -28 -148 127 -250 256 -167 24 16 78 63 119 106 l75 77 28 -34 c54 -63 149
                                -213 199 -312 83 -165 154 -404 174 -583 l7 -63 -150 0 c-139 0 -152 -2 -184
                                -23 -109 -73 -105 -212 7 -267 34 -17 61 -20 183 -20 l144 0 -7 -52 c-23 -173
                                -82 -384 -146 -521 l-32 -67 -1610 2 -1609 3 -34 75 c-65 148 -120 347 -141
                                508 l-7 52 134 0 c112 0 139 3 173 20 117 57 123 215 11 277 -36 20 -54 23
                                -179 23 l-139 0 7 63 c32 285 162 607 349 860 l50 68 96 -94 c107 -105 142
                                -127 201 -127 107 0 183 105 149 207 -8 25 -45 72 -111 139 l-100 102 59 44
                                c128 99 282 186 436 247 130 52 364 108 460 110 l37 1 0 -129z m1522 -2808
                                c-51 -61 -192 -197 -257 -250 -135 -109 -347 -226 -521 -286 -209 -73 -411
                                -102 -648 -94 -342 11 -638 107 -932 302 -110 73 -281 226 -365 326 l-41 49
                                1402 0 1402 0 -40 -47z"></path>
                                <path d="M2505 3609 c-44 -12 -78 -54 -115 -139 -18 -41 -89 -196 -157 -345
                                -170 -368 -177 -390 -178 -540 0 -118 1 -121 37 -199 49 -101 148 -203 240
                                -246 252 -118 552 -18 680 227 45 85 63 171 55 267 -8 91 -35 166 -149 421
                                -50 110 -117 261 -151 335 -74 165 -89 187 -141 211 -44 20 -74 22 -121 8z
                                m110 -641 c91 -193 135 -310 135 -361 0 -77 -48 -152 -113 -176 -69 -26 -174
                                -4 -219 46 -45 50 -60 137 -34 209 24 70 168 384 176 384 4 0 29 -46 55 -102z"></path>
                                </g>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="canvas-holder">
                    <div class="container-for-values">
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                    </div>
                    <canvas id="canvas"></canvas>
                </div>

                <span class="chance">Chance of Precipitation</span>

                <div class="canvas-holder-second">
                
                    <canvas id="canvasSecond"></canvas>
                </div>
                `
                WHLE_ELMNT.appendChild(index)
                extraText.innerHTML = `
                <span class="forecast-daily-sum">Forecast</span>
                <span class="textForCONDITIONS">${Math.round(weatherData.current.temp_c)}° now and ${weatherData.current.condition.text.toLowerCase()}. Today's temperature range is from ${Math.round(Math.min(...actualHighAndLow()))}° to ${Math.round(Math.max(...actualHighAndLow()))}°.</span>
                `
                WHLE_ELMNT.appendChild(extraText)
                
                continue
            }
            //console.log(daysShort, weatherData.forecast.forecastday[i].day.uv)
            const day = document.createElement("div")
            day.classList.add("forecast-each-day")
            day.innerHTML = `
            <span>${daysShort}</span>
            <span class="numbers">${numbersDays}</span>
            `
            wrapper.appendChild(day)
            
        }   
        
    }
    const eventFunctionFORECAST = () =>{
        const elements = document.querySelectorAll(".numbers")
        const fullDate = document.querySelector(".datepicked")
        const index = document.querySelector(".index .special span")
        const lowTempForecast = document.querySelector(".forecast-low-temp")
        const highLowpPrecip = document.querySelector(".highLow-precip")
        const textForCONDITIONS = document.querySelector(".textForCONDITIONS")
        const weatherIcon = document.querySelector(".special img")


        for(let i = 0; i < elements.length; i++){

            const WEATHER_PER_HOUR = () =>{

                let forecastWeather = weatherData.forecast.forecastday[i].day.condition.text
                    
                if(forecastWeather == 'Mist'){
                    //console.log("Mist Day")
                    return 'fog.png'
                } else if (forecastWeather == 'Sunny'){
                    //console.log("Sunny Day")
                    return 'sunny.png'
                }else if((forecastWeather == 'Partly cloudy')) {
                    //console.log("Partly Cloudy Day")
                    return 'cloud-sun-off.png'
                } else if((forecastWeather == 'Cloudy') || (forecastWeather == 'Overcast')) {
                    //console.log("Overcast or cloudy Day")
                    return 'cloud-removebg-preview.png'
                } else if ((forecastWeather == 'Heavy rain')){
                    //console.log("Heavy Rain Day")
                    return 'rain.png'
                } else if ((forecastWeather == 'Moderate rain')){
                    //console.log("Moderate Rain Day")
                    return 'rain.png'
                } else if ((forecastWeather == 'Fog')){
                    //console.log("Fog Day")
                    return 'fog.png'
                } else if((forecastWeather == 'Patchy rain possible' || forecastWeather == 'Light drizzle' || forecastWeather == 'Light rain shower')){
                    return 'rain.png'
                }  else if(forecastWeather.includes("snow")){
                    return 'snowflake.png'
                }else if(forecastWeather = "Light freezing rain"){
                    return 'rain.png'
                }else if(forecastWeather = "Blizzard"){
                    return 'snowflake.png'
                }else{
                    console.log((forecastWeather))
                    return 'CONDITION NOT DEFINED'
                }
                
            }
            /*
            const highestLowestTemp = () =>{
                const lowestTemps = []
                const highestTemps = []

                for(let j = 0; j < weatherData.forecast.forecastday[i].hour.length; j++){
                    
                    if(Math.round(weatherData.forecast.forecastday[i].hour[j].temp_c) == Math.round(weatherData.forecast.forecastday[i].day.maxtemp_c)){
                        highestTemps.push(weatherData.forecast.forecastday[i].hour[j].time)
                    }

                    if(Math.round(weatherData.forecast.forecastday[i].hour[j].temp_c) == Math.round(weatherData.forecast.forecastday[i].day.mintemp_c)){
                        lowestTemps.push(weatherData.forecast.forecastday[i].hour[j].time)
                    }
                }

                return [lowestTemps, highestTemps]
            }*/
            //console.log(weatherData.forecast.forecastday[2].day.maxtemp_c)
            //console.log(weatherData.forecast.forecastday[2].day.mintemp_c)
            //console.log(highestLowestTemp())
            
            /*
            const whichHour = () =>{
                let timeForHighest = highestLowestTemp()[1]
                let timeForLowest = highestLowestTemp()[0]

                if(timeForHighest.length > 1 && timeForLowest.length > 1){
                    return [[timeForHighest[0], timeForHighest[timeForHighest.length - 1]], [timeForLowest[0], timeForLowest[timeForLowest.length - 1]]]
                }else if(timeForHighest.length > 1 && timeForLowest.length == 1){
                    return [[timeForHighest[0], timeForHighest[timeForHighest.length - 1]], [timeForLowest[0]]]
                }else if(timeForHighest.length == 1 && timeForLowest.length == 1){
                    return [[timeForHighest[0]], [timeForLowest[0]]]
                }else if(timeForHighest.length == 1 && timeForLowest.length > 1){
                    return [[timeForHighest[0]], [timeForLowest[0], timeForLowest[timeForLowest.length - 1]]]
                }

            }*/

            const highestLowestTemp = () =>{
                const time = []
                const temps = []

                for(let j = 0; j < weatherData.forecast.forecastday[i].hour.length; j++){
                    time.push(weatherData.forecast.forecastday[i].hour[j].time)
                    temps.push(Math.round(weatherData.forecast.forecastday[i].hour[j].temp_c))
                }

                const highestTemp = Math.max(...temps)
                const lowestTemp = Math.min(...temps)

                const timesSeenHighest = [] //the amount of times the certain has appeared
                const timesSeenLowest = []
                for(let j = 0; j < temps.length; j++){
                    if(temps[j] == highestTemp){
                        timesSeenHighest.push(j)
                    }

                    if(temps[j] == lowestTemp){
                        timesSeenLowest.push(j)
                    }
                }

                const correspondingValuesHIGHEST = timesSeenHighest.map(idx => time[idx])
                const correspondingValuesLOWEST = timesSeenLowest.map(idx => time[idx])

                return [correspondingValuesHIGHEST, correspondingValuesLOWEST]
            }
            

            //console.log(highestLowestTemp()[0], highestLowestTemp()[1])
            const whichHour = () =>{
                let timeForHighest = highestLowestTemp()[0]
                let timeForLowest = highestLowestTemp()[1]

                if(timeForHighest.length > 1 && timeForLowest.length > 1){
                    //return [[timeForHighest[0], timeForHighest[timeForHighest.length - 1]], [timeForLowest[0], timeForLowest[timeForLowest.length - 1]]]
                    return `low will be ${Math.round(weatherData.forecast.forecastday[i].day.mintemp_c)}° between ${timeForLowest[0].slice("11")} and ${timeForLowest[timeForLowest.length - 1].slice("11")}, and the high will be ${Math.round(weatherData.forecast.forecastday[i].day.maxtemp_c)}° between ${timeForHighest[0].slice("11")} and ${timeForHighest[timeForHighest.length - 1].slice("11")}.`

                }else if(timeForHighest.length > 1 && timeForLowest.length == 1){
                    //return [[timeForHighest[0], timeForHighest[timeForHighest.length - 1]], [timeForLowest[0]]]
                    return `low will be ${Math.round(weatherData.forecast.forecastday[i].day.mintemp_c)}° at ${timeForLowest[0].slice("11")} , and the high will be ${Math.round(weatherData.forecast.forecastday[i].day.maxtemp_c)}° between ${timeForHighest[0].slice("11")} and ${timeForHighest[timeForHighest.length - 1].slice("11")}.`

                }else if(timeForHighest.length == 1 && timeForLowest.length == 1){
                    //return [[timeForHighest[0]], [timeForLowest[0]]]
                    return `low will be ${Math.round(weatherData.forecast.forecastday[i].day.mintemp_c)}° at ${timeForLowest[0].slice("11")}, and the high will be ${Math.round(weatherData.forecast.forecastday[i].day.maxtemp_c)}° at ${timeForHighest[0].slice("11")}.`

                }else if(timeForHighest.length == 1 && timeForLowest.length > 1){
                    //return [[timeForHighest[0]], [timeForLowest[0], timeForLowest[timeForLowest.length - 1]]]
                    return `low will be ${Math.round(weatherData.forecast.forecastday[i].day.mintemp_c)}° between ${timeForLowest[0].slice("11")} and ${timeForLowest[timeForLowest.length - 1].slice("11")}, and the high will be ${Math.round(weatherData.forecast.forecastday[i].day.maxtemp_c)}° at ${timeForHighest[0].slice("11")}.`
                }else{
                    return [timeForHighest.length, timeForLowest.length]
                }

            }
            //console.log(whichHour())
            

            let days = new Date(weatherData.forecast.forecastday[i].date)
                let fullDay = days.toLocaleDateString("default", {weekday: "long", day: "2-digit", month: "long", "year": "numeric"})
                elements[i].addEventListener("click", ()=>{
                elements.forEach(element =>{
                    element.classList.remove("active")
                })

                elements[0].addEventListener("click", ()=>{
                    mainFunctionForecast()
                })
                let weekday = days.toLocaleDateString("default", {weekday: "long"})

                //console.log(whichHour()[0][0], whichHour()[0][1], "Highest temps")
                
                const highestTempsTEXT = () =>{
                    if(whichHour()[0][1]){
                        return `between ${whichHour()[0][0].slice("11")} and ${whichHour()[0][1].slice("11")}`
                    }else{
                        return `at ${whichHour()[0][0].slice("11")}`
                    }
                }

                const lowestTempsTEXT = () =>{
                    if(whichHour()[1][1]){
                        return `between ${whichHour()[1][0].slice("11")} and ${whichHour()[1][1].slice("11")}`
                    }else{
                        return `at ${whichHour()[1][0].slice("11")}`
                    }
                }
                //console.log(lowestTempsTEXT())
                //console.log(highestTempsTEXT())

                const rainSnowPercent = () =>{
                    const daysHighestRain = []
                    const daysHighestSnow = []

                    for(let j = 0; j < weatherData.forecast.forecastday[i].hour.length; j++){
                        daysHighestRain.push(weatherData.forecast.forecastday[i].hour[j].chance_of_rain)
                        daysHighestSnow.push(weatherData.forecast.forecastday[i].hour[j].chance_of_snow)
                    }

                    if(Math.max(...daysHighestRain) < Math.max(...daysHighestSnow)){
                        return `Chance of snow: ${Math.round(Math.max(...daysHighestSnow) / 10) * 10}%`
                    }else if(Math.max(...daysHighestRain) >= Math.max(...daysHighestSnow) && Math.max(...daysHighestRain)){
                        return `Chance of rain: ${Math.round(Math.max(...daysHighestRain) / 10) * 10}%`
                    }else {
                        return `Chance of rain: 0%`
                    }
                }
                

                weatherIcon.src = `${WEATHER_PER_HOUR()}`
                textForCONDITIONS.textContent = `${weekday}'s ${whichHour()}`
                highLowpPrecip.style.color = '#36C8EB'
                highLowpPrecip.textContent = `${rainSnowPercent()}`
                lowTempForecast.textContent = `${Math.round(weatherData.forecast.forecastday[i].day.mintemp_c)}°`
                index.textContent = `${Math.round(weatherData.forecast.forecastday[i].day.maxtemp_c)}°`
                fullDate.textContent = fullDay
                elements[i].classList.add("active")
                
                const CANVAS_HOLDER = document.querySelector(".canvas-holder")
                CANVAS_HOLDER.style.marginBottom = `15px`
                CANVAS_HOLDER.innerHTML = `
                <div class="container-for-values">
                    <div class="value-hrs"></div>
                    <div class="value-hrs"></div>
                    <div class="value-hrs"></div>
                    <div class="value-hrs"></div>
                    <div class="value-hrs"></div>
                    <div class="value-hrs"></div>
                    <div class="value-hrs"></div>
                    <div class="value-hrs"></div>
                    <div class="value-hrs"></div>
                    <div class="value-hrs"></div>
                    <div class="value-hrs"></div>
                    <div class="value-hrs"></div>
                </div>
                <canvas id="canvas"></canvas>
                `
                const conditionsChartFunction = () =>{
                    const hoursArray = []
            
                    for(let i = 0; i < 24; i++){
                        hoursArray.push(i)
                    }
            
                    //the index at which the change will occur
                    let labelToChange = new Date(weatherData.current.last_updated).getHours()
            
            
                    //when will the line be dashed and stright
                    const dash = (ctx) => {
                        //console.log(ctx.p0DataIndex)
                        if(ctx.p0DataIndex < labelToChange){
                            return [8, 10]
                        }
                    }

                    const canvasElement = document.querySelector(".canvas-holder")
                    const invisibleOverlay = document.createElement("div")
                    invisibleOverlay.classList.add("blank-overlay")
                    canvasElement.appendChild(invisibleOverlay)
            
                    let ctx = document.querySelector("#canvas").getContext("2d")
            
                    
                    const tempData = () =>{
                        const tempArray = []
                        for(let d = 0; d < weatherData.forecast.forecastday[i].hour.length; d++){
                            tempArray.push(Math.round(weatherData.forecast.forecastday[i].hour[d].temp_c))
            
                        }
            
                        return tempArray
                    }
            
                    
                    
                    
                    const gradient = window['chartjs-plugin-gradient'];
                    
                    const container = document.querySelector(".container-for-values")
                    container.style.gap = `19px`
                            const all = document.querySelectorAll(".value-hrs")
                        
                            const weatherIconValues = (arg) =>{
                                const weatherCondition = weatherData.forecast.forecastday[i].hour[arg].condition.text
                                
                        
                                if(weatherData.forecast.forecastday[i].hour[arg].is_day){
                                    if(weatherCondition == 'Mist'){
                                        //console.log("Mist Day")
                                        return '<img src="fog.png">'
                                    } else if (weatherCondition == 'Sunny'){
                                        //console.log("Sunny Day")
                                        return '<img src="sunny.png">'
                                    }else if((weatherCondition == 'Partly cloudy')) {
                                        //console.log("Partly Cloudy Day")
                                        return '<img src="cloud-sun-off.png">'
                                    } else if((weatherCondition == 'Cloudy') || (weatherCondition == 'Overcast')) {
                                        //console.log("Overcast or cloudy Day")
                                        return '<img src="cloud-removebg-preview.png">'
                                    } else if ((weatherCondition == 'Heavy rain')){
                                        //console.log("Heavy Rain Day")
                                        return '<img src="rain.png">'
                                    } else if ((weatherCondition == 'Moderate rain')){
                                        //console.log("Moderate Rain Day")
                                        return '<img src="rain.png">'
                                    } else if ((weatherCondition == 'Fog' || weatherCondition.includes("fog"))){
                                        //console.log("Fog Day")
                                        return '<img src="fog.png">'
                                    } else if((weatherCondition == 'Patchy rain possible' || weatherCondition == 'Light drizzle' || weatherCondition == 'Light rain shower')){
                                        return '<img src="rain.png">'
                                    } else if (weatherCondition == 'Patchy light rain' || weatherCondition == 'Light rain' || weatherCondition == 'Moderate or heavy rain shower' || weatherCondition== 'Moderate rain at times' || weatherCondition == 'Patchy light drizzle' || weatherCondition == 'Light freezing rain'){
                                        return '<img src="rain.png">'
                                    } else if(weatherCondition == 'Thundery outbreaks possible' || weatherCondition == 'Patchy light rain with thunder' || weatherCondition == 'Moderate or heavy rain with thunder') {
                                        return '<img src="thunder.png">'
                                    } else if(weatherCondition.includes("snow")){
                                        return '<img src="snowflake.png">'
                                    }else if(weatherCondition == "Light freezing rain"){
                                        return '<img src="rain.png">'
                                    }else if(weatherCondition == "Blizzard"){
                                        return '<img src="snowflake.png">'
                                    }else{
                                        console.log((weatherCondition))
                                        return 'CONDITION NOT DEFINED'
                                    }
                                }else {
                                    
                                    if(weatherCondition == 'Mist'){
                                        //console.log("Mist Night")
                                        return '<img src="fog.png">'
                                    } else if (weatherCondition == 'Clear'){
                                        //console.log("Clear Night")
                                        return '<img src="moon.png">'
                                    }else if((weatherCondition == 'Partly cloudy')) {
                                        //console.log("Partly Cloudy Night")
                                        return '<img src="cloud-moon.png">'
                                    } else if((weatherCondition == 'Cloudy') || (weatherCondition == 'Overcast')) {
                                        //console.log("Overcast or Cloudy Night")
                                        return '<img src="cloud-removebg-preview.png">'
                                    } else if ((weatherCondition == 'Heavy rain')){
                                        //console.log("Heavy Rain Night")
                                        return '<img src="moon rain.png">'
                                    } else if ((weatherCondition == 'Moderate rain')){
                                        //console.log("Moderate Rain Night")
                                        return '<img src="moon rain.png">'
                                    } else if ((weatherCondition == 'Fog' || weatherCondition == 'Freezing fog')){
                                        //console.log("Fog Night")
                                        return '<img src="fog.png">'
                                    } else if((weatherCondition == 'Patchy rain possible' || weatherCondition == 'Light drizzle' || weatherCondition == 'Light rain shower')){
                                        return '<img src="moon rain.png">'
                                    } else if (weatherCondition == 'Patchy light rain' || weatherCondition == 'Light rain' || weatherCondition == 'Moderate or heavy rain shower' || weatherCondition == 'Moderate rain at times' || weatherCondition == 'Patchy light drizzle' || weatherCondition == 'Light freezing rain'){
                                        return '<img src="moon rain.png">'
                                    } else if(weatherCondition == 'Thundery outbreaks possible' || weatherCondition == 'Patchy light rain with thunder' || weatherCondition == 'Moderate or heavy rain with thunder') {
                                        return '<img src="thunder night.png">'
                                    } else if(weatherCondition.includes("snow")){
                                        return '<img src="snowflake.png">'
                                    }else if(weatherCondition == "Light freezing rain"){
                                        return '<img src="rain.png">'
                                    }else if(weatherCondition == "Blizzard"){
                                        return '<img src="snowflake.png">'
                                    }else{
                                        console.log((weatherCondition))
                                        return 'CONDITION NOT DEFINED'
                                    }
                                    
                                }
                            }
                            
                            all[0].innerHTML = `${weatherIconValues(0)}`
                            all[1].innerHTML = `${weatherIconValues(2)}`
                            all[2].innerHTML = `${weatherIconValues(4)}`
                            all[3].innerHTML = `${weatherIconValues(6)}`
                            all[4].innerHTML = `${weatherIconValues(8)}`
                            all[5].innerHTML = `${weatherIconValues(10)}`
                            all[6].innerHTML = `${weatherIconValues(12)}`
                            all[7].innerHTML = `${weatherIconValues(14)}`
                            all[8].innerHTML = `${weatherIconValues(16)}`
                            all[9].innerHTML = `${weatherIconValues(18)}`
                            all[10].innerHTML = `${weatherIconValues(20)}`
                            all[11].innerHTML = `${weatherIconValues(22)}`
                    
            
                    //console.log((Math.round(Math.min(...feelsLikeData()) / 10) * 10) - 5)
            
                    //BACKGROUND GRADIENTS
                    const colorsObject = () =>{
                        if((Math.round(Math.min(...tempData()) / 10) * 10) - 5 < 0){
                            return {
                                "-20": "rgba(0, 27, 70, 0.3)",
                                "-15": "rgba(0, 40, 104, 0.3)",
                                "-10": "rgba(0, 56, 145, 0.3)",
                                "-5": "rgba(1, 69, 179, 0.3)",
            
                                "0": "rgba(0, 75, 197, 0.3)",
                                "3": "rgba(0, 105, 197, 0.3)",
                                "6": "rgba(0, 144, 197, 0.3)",
                                "9": "rgba(0, 187, 197, 0.3)",
                                "12": "rgba(0, 197, 167, 0.3)", 
                                "15": "rgba(0, 197, 118, 0.3)",
                                "18": "rgba(0, 197, 59, 0.3)",
                                "21": "rgba(0, 197, 23, 0.3)",
                                "24": "rgba(0, 197, 13, 0.3)",
                                "27": "rgba(62, 197, 0, 0.3)",
                                "30": "rgba(144, 197, 0, 0.3)",
                                "33": "rgba(197, 177, 0, 0.3)",
                                "36": "rgba(197, 151, 0, 0.3)",
                                "40": "rgba(197, 105, 0, 0.3)",
                                "43": "rgba(197, 69, 0, 0.3)",
                                "46": "rgba(197, 0, 0, 0.3)",
                            }
                        }else {
                            return {
                                "0": "rgba(0, 75, 197, 0.3)",
                                "3": "rgba(0, 105, 197, 0.3)",
                                "6": "rgba(0, 144, 197, 0.3)",
                                "9": "rgba(0, 187, 197, 0.3)",
                                "12": "rgba(0, 197, 167, 0.3)", 
                                "15": "rgba(0, 197, 118, 0.3)",
                                "18": "rgba(0, 197, 59, 0.3)",
                                "21": "rgba(0, 197, 23, 0.3)",
                                "24": "rgba(0, 197, 13, 0.3)",
                                "27": "rgba(62, 197, 0, 0.3)",
                                "30": "rgba(144, 197, 0, 0.3)",
                                "33": "rgba(197, 177, 0, 0.3)",
                                "36": "rgba(197, 151, 0, 0.3)",
                                "40": "rgba(197, 105, 0, 0.3)",
                                "43": "rgba(197, 69, 0, 0.3)",
                                "46": "rgba(197, 0, 0, 0.3)",
                            }
                        }
                    }
                    //console.log(colorsObject())
            
                    const borderColorObject = () =>{
                        if((Math.round(Math.min(...tempData()) / 10) * 10) - 5 < 0){
                            return {
                                "-20": "rgba(51, 0, 204, 1)",
                                "-15": "rgba(13, 0, 193, 1)",
                                "-10": "rgba(0, 29, 215, 1)",
                                "-5": "rgba(0, 47, 215, 1)",
            
                                "0": "rgba(0, 80, 193, 1)",
                                "3": "rgba(0, 107, 193, 1)",
                                "6": "rgba(0, 135, 193, 1)",
                                "9": "rgba(0, 175, 193, 1)",
                                "12": "rgba(0, 193, 166, 1)",
                                "15": "rgba(0, 193, 130, 1)",
                                "18": "rgba(0, 193, 98, 1)",
                                "21": "rgba(0, 193, 54, 1)",
                                "24": "rgba(79, 193, 0, 1)",
                                "27": "rgba(127, 193, 0, 1)",
                                "30": "rgba(147, 193, 0, 1)",
                                "33": "rgba(193, 178, 0, 1)",
                                "36": "rgba(193, 130, 0, 1)",
                                "40": "rgba(193, 82, 0, 1)",
                                "43": "rgba(193, 50, 0, 1)",
                                "46": "rgba(218, 0, 0, 1)",
                            }
            
                        }else {
                            return {
                                "0": "rgba(0, 80, 193, 1)",
                                "3": "rgba(0, 107, 193, 1)",
                                "6": "rgba(0, 135, 193, 1)",
                                "9": "rgba(0, 175, 193, 1)",
                                "12": "rgba(0, 193, 166, 1)",
                                "15": "rgba(0, 193, 130, 1)",
                                "18": "rgba(0, 193, 98, 1)",
                                "21": "rgba(0, 193, 54, 1)",
                                "24": "rgba(79, 193, 0, 1)",
                                "27": "rgba(127, 193, 0, 1)",
                                "30": "rgba(147, 193, 0, 1)",
                                "33": "rgba(193, 178, 0, 1)",
                                "36": "rgba(193, 130, 0, 1)",
                                "40": "rgba(193, 82, 0, 1)",
                                "43": "rgba(193, 50, 0, 1)",
                                "46": "rgba(218, 0, 0, 1)",
                            }
                        }
                    }
                    //console.log(borderColorObject())
            
                    //data block
                    const chartData = {
                        labels: hoursArray,
                        datasets: [{
                            label: "",
                            data: tempData(),
                            segment: {
                                //borderDash: ctx => dash(ctx),
                            },
                            gradient: {
                                backgroundColor: {
                                  axis: 'y',
                                  colors: colorsObject()
                                },
            
                                borderColor: {
                                    axis: 'y',
                                    colors: borderColorObject()
                                }
                            },
                            borderWidth: 6.5,
                            borderColor: "red", //fix with gradient function later
                            pointBackgroundColor: "transparent",
                            pointBorderColor: "transparent",
                            borderCapStyle: 'round',
                            clip: {
                                left: 0,
                                right: 0,
                                top: false,
                                bottom: false
                            },
                            tension: 0.2,
                            fill: "stack",
                            backgroundColor: "transparent" //fix with gradient func later
                        }]
                    }
                
                    const plugin = {
                        id: 'customCanvasBackgroundColor',
                        beforeDraw: (chart, args, options) => {
                        const {ctx} = chart;
                        ctx.save();
                        ctx.globalCompositeOperation = 'destination-over';
                        ctx.fillStyle = options.color
                        ctx.fillRect(0, 0, chart.width, chart.height);
                        ctx.restore();
                        
                        }
                    };
                
                    //console.log(Math.max(...feelsLikeData()) + 5)
                    const minMaxFunc = () =>{
                        if((Math.floor(Math.min(...tempData()) / 10) * 10) - 5 <= 0){
                            return (Math.floor(Math.min(...tempData()) / 10) * 10) - 5
            
                        }else if((Math.floor(Math.min(...tempData()) / 10) * 10) - 5 <= 11){
                            return 0
                        } else {
                            return (Math.floor(Math.min(...tempData()) / 10) * 10) - 5
                        }
                    }
                    //console.log(minMaxFunc())
                    
                    
                    //console.log(Math.min(...feelsLikeData()))
                    //console.log(Math.max(...feelsLikeData()) + 5)
            
                    let minValue = (Math.floor(Math.min(...tempData()) / 10) * 10) - 5
                    let maxValue = (Math.ceil(Math.max(...tempData()) / 10) * 10) + 5
            
            
                    if(maxValue < 10){
                        container.style.width = `423px`
                    }else {
                        container.style.width = `427px`
                    }
            
                    const amplitude = () =>{
                        //console.log(maxValue)
                        //console.log(minValue)
            
                        if(maxValue - minValue == 5){
                            return 3
                        }else if(maxValue - minValue == 10){
                            return 4
                        }else if(maxValue - minValue == 15){
                            return 5
                        }else if(maxValue - minValue == 20){
                            
                            return 7
                        }else if(maxValue - minValue == 25){
                            
                            return 7
                        }else if(maxValue - minValue == 30){
                            
                            return 100
                        }else if(maxValue - minValue == 35){
                            
                            return 15
                        }else if(maxValue - minValue == 40){
                            
                            return 10
                        }
                    }
                    //console.log(amplitude())
            
                    //console.log(30)
            
                    //console.log(minMaxFunc())
                    //console.log((Math.floor(Math.min(...feelsLikeData()) / 10) * 10) - 5)
            
                    //config block
                    const config = {
                        type: "line",
                        data: chartData,  
                        options: {
                            aspectRatio: 7/4,
                            responsive: true,
                            scales: {
                                y: {
                                    min: minMaxFunc(),
                                    //beginAtZero: minMaxFunc(),
                                    max: maxValue,
                                    
            
                                    grid: {
                                        drawTicks: false,
                                        display: true,
                                        drawOnChartArea: true,
                                        color: "#302F32"
                                    },
                                    border: {
                                        display: true,
                                        color: "#302F32"
                                    },
                                    ticks: {
                                        color: "#9D9D9E",
                                        padding: 15,
                                        align: "center",
                                        crossAlign: "center", 
                                        font: {
                                            size: 13,
                                            weight: 400
                                        },
                                        maxTicksLimit: amplitude(),
                                        callback: function(value, index, values){
                                            return `${value}°`
                                        }
                                    },
                                    position: "right"
                                },
                
                                x: {
                                    border: {
                                        display: false,
                                        dash: [3, 2]
                                    },
                                    grid: {
                                        display: true,
                                        drawOnChartArea: true,
                                        drawTicks: false,
                                        color: "#302F32"
                                    },
                
                                    ticks: {
                                        color: "#9D9D9E",
                                        maxTicksLimit: 4,
                                        padding: 5,
                                        align: "start",
                                        crossAlign: "near",
                                        font: {
                                            size: 15,
                                            weight: 400
                                        },
                                        
                                    }
                                },
                
                                
                            },
                            plugins: {
                                customCanvasBackgroundColor: {
                                    color: "#202023"
                                },
                                legend: {
                                    display: false
                                },
                                autocolors: false,
                                annotation: {
                                    
                                    annotations: {
                                        
                                        
                                        point1: {
                                            yValue: Math.min(...tempData()),
                                            xValue: tempData().indexOf(Math.min(...tempData())),
            
                                            type: "point",
                                            backgroundColor: "transparent",
                                            borderWidth: 4,
                                            borderColor: "black",
                                            radius: 5.5,
                                        },
                                        point3: {
                                            yValue: Math.max(...tempData()),
                                            xValue: tempData().indexOf(Math.max(...tempData())),
            
                                            type: "point",
                                            backgroundColor: "transparent",
                                            borderWidth: 4,
                                            borderColor: "black",
                                            radius: 5.5,
                                            //callback: yValue => 
                                        },
                                        label1: {
                                            type: "label",
                                            yValue: Math.max(...tempData()) + 2.5,
                                            xValue: tempData().indexOf(Math.max(...tempData())),
                                            backgroundColor: "transparent",
                                            color: "#9D9D9E",
                                            content: "H",
                                            font: {
                                                size: 15
                                            }
                                        },
                                        label2: {
                                            type: "label",
                                            yValue: Math.min(...tempData()) + 2.5,
                                            xValue: tempData().indexOf(Math.min(...tempData())),
                                            backgroundColor: "transparent",
                                            color: "#9D9D9E",
                                            content: "L",
                                            font: {
                                                size: 15
                                            }
                                        }
                                    },
                                    clip: false
                                } 
                            },   
                        },
                        plugins: [plugin, gradient]
                    }
                    //console.log(Math.max(...feelsLikeData()))
                
                    
                    const feelsLikeChart = new Chart(ctx, config)
                }
                conditionsChartFunction()

                const SECOND_CANVAS = document.querySelector(".canvas-holder-second")
                SECOND_CANVAS.innerHTML = `
                <canvas id="canvasSecond"></canvas>
                `
                const rainFORCONDITIONSChartFunction = () =>{ 
                    const hoursArray = []
            
                    for(let i = 0; i < 24; i++){
                        hoursArray.push(i)
                    }
            
                    //the index at which the change will occur
                    let labelToChange = new Date(weatherData.current.last_updated).getHours()
                    //let labelToChange = 22
            
                    //when will the line be dashed and stright
                    const dash = (ctx) => {
                        //console.log(ctx.p0DataIndex)
                        if(ctx.p0DataIndex < labelToChange){
                            return [8, 10]
                        }
                    }
            
                    const hideBorderFunc = (ctx) =>{
                        if(ctx.p0DataIndex < labelToChange){
                            return "transparent"
                        }else {
                            return "#36C8EB"
                        }
                    }
            
                    const chartElement = document.querySelector(".canvas-holder-second")
                    const rainBlankOverlay = document.createElement("div")
                    rainBlankOverlay.classList.add("rain-blank-overlay") 
                    chartElement.appendChild(rainBlankOverlay)
            
                    let ctx = document.querySelector("#canvasSecond").getContext("2d")
                    
                    const precipData = () =>{
                        const rainArray = []
                        const snowArray = []
            
                        for(let d = 0; d < weatherData.forecast.forecastday[i].hour.length; d++){
                            rainArray.push(Math.round(weatherData.forecast.forecastday[i].hour[d].chance_of_rain / 10) * 10)
                            snowArray.push(Math.round(weatherData.forecast.forecastday[i].hour[d].chance_of_snow / 10) * 10)
                        }
            
                        if(Math.max(...snowArray) > Math.max(...rainArray)){
                            return snowArray
                        }else {
                            return rainArray
                        }
                    }
                    //console.log(weatherData.forecast.forecastday[9].hour[7])
            
                    const gradient = window['chartjs-plugin-gradient'];
                    
            
                    
            
                    const fillerColor = (ctx) => {
                        if(ctx.p0DataIndex < labelToChange){
                            return "transparent"
                        }else {
                            return "rgba(0, 163, 238, 0.3)"
                        }
                    }
            
                    //data block
                    const chartData = {
                        labels: hoursArray,
                        datasets: [{
                            label: "",
                            data: precipData(),
                            segment: {
                                //borderDash: ctx => dash(ctx),
                                //borderWidth: ctx => hideBorderFunc(ctx),
                                //borderColor: ctx => hideBorderFunc(ctx),
                                //backgroundColor: ctx => fillerColor(ctx)
                            },
                            gradient: {
                                backgroundColor: {
                                  axis: 'y',
                                  colors: {
                        
                                    
                                  }
                                },
                                borderColor: {
                                    axis: "y",
                                    colors: {
                                        
                                    }
                                }
                            },
                            
                            borderColor: "#36C8EB",
                            pointBackgroundColor: "transparent",
                            pointBorderColor: "transparent",
                            //borderCapStyle: 'round',
                            clip: {
                                left: false,
                                right: false,
                                top: false,
                                bottom: false
                            },
                            tension: 0.1,
                            fill: true,
                            backgroundColor: "rgba(0, 163, 238, 0.3)"
                            
                        }]
                    }
            
                    
                
                    const plugin = {
                        id: 'customCanvasBackgroundColor',
                        beforeDraw: (chart, args, options) => {
                        const {ctx} = chart;
                        ctx.save();
                        ctx.globalCompositeOperation = 'destination-over';
                        ctx.fillStyle = options.color
                        ctx.fillRect(0, 0, chart.width, chart.height);
                        ctx.restore();
                        
                        }
                    };
                
                    
                
                    //config block
                    const config = {
                        type: "line",
                        data: chartData,  
                        options: {
                            aspectRatio: 7/4,
                            responsive: true,
                            scales: {
                                y: {
                                
                                    beginAtZero: true,
                                    suggestedMax: 100,
                                    grid: {
                                        drawTicks: false,
                                        display: true,
                                        drawOnChartArea: true,
                                        color: "#302F32"
                                    },
                                    border: {
                                        display: true,
                                        color: "#302F32"
                                    },
                                    ticks: {
                                        color: "#9D9D9E",
                                        //maxTicksLimit: 6,
                                        padding: 15,
                                        align: "center",
                                        crossAlign: "center", 
                                        font: {
                                            size: 13,
                                            weight: 400
                                        },
                                        callback: function(value){
                                            return `${value}%`
                                        }
                                    },
                                    position: "right"
                                },
                
                                x: {
                                    border: {
                                        display: false,
                                        dash: [3, 2]
                                    },
                                    grid: {
                                        display: true,
                                        drawOnChartArea: true,
                                        drawTicks: false,
                                        color: "#302F32"
                                    },
                
                                    ticks: {
                                        color: "#9D9D9E",
                                        maxTicksLimit: 4,
                                        padding: 5,
                                        align: "start",
                                        crossAlign: "near",
                                        font: {
                                            size: 15,
                                            weight: 400
                                        }
                                    }
                                },
                
                                
                                
                            },
                            plugins: {
                                customCanvasBackgroundColor: {
                                    color: "#202023"
                                },
                                legend: {
                                    display: false
                                },
                                annotation: {
                                    
                                    annotations: {
                                        
                                        point2: {
                                            type: "point",
                                            xValue: precipData().indexOf(Math.max(...precipData())),
                                            yValue: Math.max(...precipData()),
                                            backgroundColor: "#36C8EB",
                                            borderWidth: 1,
                                            borderColor: "black",
                                            radius: 5.5,
                                            
                                        },
                                        label1: {
                                            type: "label",
                                            xValue: function(){
                                                if(precipData().indexOf(Math.max(...precipData())) == 22 || precipData().indexOf(Math.max(...precipData())) == 23){
                                                    return precipData().indexOf(Math.max(...precipData())) - 1
                                                }else {
                                                    return precipData().indexOf(Math.max(...precipData())) + 0.8
                                                }
                                            },
            
                                            yValue: Math.max(...precipData()) + 7,

                                            //yValue: precipData()[Math.max(...precipData())] + 6.5,
                                            
                                            color: "#36C8EB",
                                            content: `${Math.max(...precipData())}%`,
                                            font: {
                                                size: 15
                                            }
                                        }
                                        
                                    },
                                    
                                    clip: false,
                                    
                                }
                            },
                            
                        },
                        plugins: [plugin, gradient]
                    }
                
                    const rainFallSnowChart = new Chart(ctx, config)
            
                }
                rainFORCONDITIONSChartFunction()
            })
        }
    }
    

    



    const mainFunctionForecast = () =>{
        createElementFORECAST()
        eventFunctionFORECAST()

        const CANVAS_HOLDER = document.querySelector(".canvas-holder")
        CANVAS_HOLDER.style.marginBottom = `15px`
        //CONDITIONS CHART DEPLOYMENT 1
        const conditionsChartFunction = () =>{
            const hoursArray = []
    
            for(let i = 0; i < 24; i++){
                hoursArray.push(i)
            }
    
            //the index at which the change will occur
            let labelToChange = new Date(weatherData.current.last_updated).getHours()
    
    
            //when will the line be dashed and stright
            const dash = (ctx) => {
                //console.log(ctx.p0DataIndex)
                if(ctx.p0DataIndex < labelToChange){
                    return [8, 10]
                }
            }
    
            let ctx = document.querySelector("#canvas").getContext("2d")
    
            
            const tempData = () =>{
                const tempArray = []
                for(let i = 0; i < weatherData.forecast.forecastday[0].hour.length; i++){
                    tempArray.push(Math.round(weatherData.forecast.forecastday[0].hour[i].temp_c))
    
                }
    
                return tempArray
            }
    
            const canvasElement = document.querySelector(".canvas-holder")
            const chartOverlay = document.createElement("div")
            chartOverlay.classList.add("time-passed-overlay")

            
                    const invisibleOverlay = document.createElement("div")
                    invisibleOverlay.classList.add("blank-overlay")
                    canvasElement.appendChild(invisibleOverlay)

            const lineDivider = document.createElement("div")
            lineDivider.classList.add("line-divider")
            chartOverlay.appendChild(lineDivider)
            
            canvasElement.appendChild(chartOverlay)
            const overlayStyle = () =>{
                
                if(labelToChange == 0){
                    chartOverlay.style.width = `8px`
                    
                }else if(labelToChange == 1){
                    chartOverlay.style.width = `27px`
                    
                }else if(labelToChange == 2){
                    chartOverlay.style.width = `45px`
                    
                }else if(labelToChange == 3){
                    chartOverlay.style.width = `63px`
                    
                }else if(labelToChange == 4){
                    chartOverlay.style.width = `81px`
                    
                }else if(labelToChange == 5){
                    chartOverlay.style.width = `99px`
                    
                }else if(labelToChange == 6){
                    chartOverlay.style.width = `117px`
                    
                }else if(labelToChange == 7){
                    chartOverlay.style.width = `135px`
                    
                }else if(labelToChange == 8){
                    chartOverlay.style.width = `153px`
                    
                }else if(labelToChange == 9){

                    chartOverlay.style.width = `170px`
                    
                }else if(labelToChange == 10){
                    chartOverlay.style.width = `189px`
                    
                }else if(labelToChange == 11){
                    chartOverlay.style.width = `206px`
                    
                }else if(labelToChange == 12){
                    chartOverlay.style.width = `225px`
                    
                }else if(labelToChange == 13){
                    chartOverlay.style.width = `242px`
                    
                }else if(labelToChange == 14){
                    chartOverlay.style.width = `261px`
                    
                }else if(labelToChange == 15){
                    chartOverlay.style.width = `278px`
                    
                }else if(labelToChange == 16){
                    chartOverlay.style.width = `297px`
                    
                }else if(labelToChange == 17){
                    chartOverlay.style.width = `315px`
                    
                }else if(labelToChange == 18){
                    chartOverlay.style.width = `334px`
                    
                }else if(labelToChange == 19){
                    chartOverlay.style.width = `351px`
                    
                }else if(labelToChange == 20){
                    chartOverlay.style.width = `369px`
                    
                }else if(labelToChange == 21){
                    chartOverlay.style.width = `388px`
                    
                }else if(labelToChange == 22){
                    chartOverlay.style.width = `405px`
                    
                }else if(labelToChange == 23){
                    chartOverlay.style.width = `424px`
                    
                }

                lineDivider.style.left = chartOverlay.style.width 
            }
            overlayStyle()
            
            
            const gradient = window['chartjs-plugin-gradient'];
            
            const container = document.querySelector(".container-for-values")
            container.style.gap = `19px`
            const all = document.querySelectorAll(".value-hrs")
        
            const weatherIconValues = (arg) =>{
                const weatherCondition = weatherData.forecast.forecastday[0].hour[arg].condition.text
                
        
                if(weatherData.forecast.forecastday[0].hour[arg].is_day){
                    if(weatherCondition == 'Mist'){
                        //console.log("Mist Day")
                        return '<img src="fog.png">'
                    } else if (weatherCondition == 'Sunny'){
                        //console.log("Sunny Day")
                        return '<img src="sunny.png">'
                    }else if((weatherCondition == 'Partly cloudy')) {
                        //console.log("Partly Cloudy Day")
                        return '<img src="cloud-sun-off.png">'
                    } else if((weatherCondition == 'Cloudy') || (weatherCondition == 'Overcast')) {
                        //console.log("Overcast or cloudy Day")
                        return '<img src="cloud-removebg-preview.png">'
                    } else if ((weatherCondition == 'Heavy rain')){
                        //console.log("Heavy Rain Day")
                        return '<img src="rain.png">'
                    } else if ((weatherCondition == 'Moderate rain')){
                        //console.log("Moderate Rain Day")
                        return '<img src="rain.png">'
                    } else if ((weatherCondition == 'Fog' || weatherCondition.includes("fog"))){
                        //console.log("Fog Day")
                        return '<img src="fog.png">'
                    } else if((weatherCondition == 'Patchy rain possible' || weatherCondition == 'Light drizzle' || weatherCondition == 'Light rain shower')){
                        return '<img src="rain.png">'
                    } else if (weatherCondition == 'Patchy light rain' || weatherCondition == 'Light rain' || weatherCondition == 'Moderate or heavy rain shower' || weatherCondition== 'Moderate rain at times' || weatherCondition == 'Patchy light drizzle' || weatherCondition == 'Light freezing rain'){
                        return '<img src="rain.png">'
                    } else if(weatherCondition == 'Thundery outbreaks possible' || weatherCondition == 'Patchy light rain with thunder' || weatherCondition == 'Moderate or heavy rain with thunder') {
                        return '<img src="thunder.png">'
                    } else if(weatherCondition.includes("snow")){
                        return '<img src="snowflake.png">'
                    }else if(weatherCondition == "Light freezing rain"){
                        return '<img src="rain.png">'
                    }else if(weatherCondition == "Blizzard"){
                        return '<img src="snowflake.png">'
                    }else{
                        console.log((weatherCondition))
                        return 'CONDITION NOT DEFINED'
                    }
                }else {
                    
                    if(weatherCondition == 'Mist'){
                        //console.log("Mist Night")
                        return '<img src="fog.png">'
                    } else if (weatherCondition == 'Clear'){
                        //console.log("Clear Night")
                        return '<img src="moon.png">'
                    }else if((weatherCondition == 'Partly cloudy')) {
                        //console.log("Partly Cloudy Night")
                        return '<img src="cloud-moon.png">'
                    } else if((weatherCondition == 'Cloudy') || (weatherCondition == 'Overcast')) {
                        //console.log("Overcast or Cloudy Night")
                        return '<img src="cloud-removebg-preview.png">'
                    } else if ((weatherCondition == 'Heavy rain')){
                        //console.log("Heavy Rain Night")
                        return '<img src="moon rain.png">'
                    } else if ((weatherCondition == 'Moderate rain')){
                        //console.log("Moderate Rain Night")
                        return '<img src="moon rain.png">'
                    } else if ((weatherCondition == 'Fog' || weatherCondition == 'Freezing fog')){
                        //console.log("Fog Night")
                        return '<img src="fog.png">'
                    } else if((weatherCondition == 'Patchy rain possible' || weatherCondition == 'Light drizzle' || weatherCondition == 'Light rain shower')){
                        return '<img src="moon rain.png">'
                    } else if (weatherCondition == 'Patchy light rain' || weatherCondition == 'Light rain' || weatherCondition == 'Moderate or heavy rain shower' || weatherCondition == 'Moderate rain at times' || weatherCondition == 'Patchy light drizzle' || weatherCondition == 'Light freezing rain'){
                        return '<img src="moon rain.png">'
                    } else if(weatherCondition == 'Thundery outbreaks possible' || weatherCondition == 'Patchy light rain with thunder' || weatherCondition == 'Moderate or heavy rain with thunder') {
                        return '<img src="thunder night.png">'
                    } else if(weatherCondition.includes("snow")){
                        return '<img src="snowflake.png">'
                    }else if(weatherCondition == "Light freezing rain"){
                        return '<img src="rain.png">'
                    }else if(weatherCondition == "Blizzard"){
                        return '<img src="snowflake.png">'
                    }else{
                        console.log((weatherCondition))
                        return 'CONDITION NOT DEFINED'
                    }
                    
                }
            }
            
            all[0].innerHTML = `${weatherIconValues(0)}`
            all[1].innerHTML = `${weatherIconValues(2)}`
            all[2].innerHTML = `${weatherIconValues(4)}`
            all[3].innerHTML = `${weatherIconValues(6)}`
            all[4].innerHTML = `${weatherIconValues(8)}`
            all[5].innerHTML = `${weatherIconValues(10)}`
            all[6].innerHTML = `${weatherIconValues(12)}`
            all[7].innerHTML = `${weatherIconValues(14)}`
            all[8].innerHTML = `${weatherIconValues(16)}`
            all[9].innerHTML = `${weatherIconValues(18)}`
            all[10].innerHTML = `${weatherIconValues(20)}`
            all[11].innerHTML = `${weatherIconValues(22)}`
            
    
            //console.log((Math.round(Math.min(...feelsLikeData()) / 10) * 10) - 5)
    
            //BACKGROUND GRADIENTS
            const colorsObject = () =>{
                if((Math.round(Math.min(...tempData()) / 10) * 10) - 5 < 0){
                    return {
                        "-20": "rgba(0, 27, 70, 0.3)",
                        "-15": "rgba(0, 40, 104, 0.3)",
                        "-10": "rgba(0, 56, 145, 0.3)",
                        "-5": "rgba(1, 69, 179, 0.3)",
    
                        "0": "rgba(0, 75, 197, 0.3)",
                        "3": "rgba(0, 105, 197, 0.3)",
                        "6": "rgba(0, 144, 197, 0.3)",
                        "9": "rgba(0, 187, 197, 0.3)",
                        "12": "rgba(0, 197, 167, 0.3)", 
                        "15": "rgba(0, 197, 118, 0.3)",
                        "18": "rgba(0, 197, 59, 0.3)",
                        "21": "rgba(0, 197, 23, 0.3)",
                        "24": "rgba(0, 197, 13, 0.3)",
                        "27": "rgba(62, 197, 0, 0.3)",
                        "30": "rgba(144, 197, 0, 0.3)",
                        "33": "rgba(197, 177, 0, 0.3)",
                        "36": "rgba(197, 151, 0, 0.3)",
                        "40": "rgba(197, 105, 0, 0.3)",
                        "43": "rgba(197, 69, 0, 0.3)",
                        "46": "rgba(197, 0, 0, 0.3)",
                    }
                }else {
                    return {
                        "0": "rgba(0, 75, 197, 0.3)",
                        "3": "rgba(0, 105, 197, 0.3)",
                        "6": "rgba(0, 144, 197, 0.3)",
                        "9": "rgba(0, 187, 197, 0.3)",
                        "12": "rgba(0, 197, 167, 0.3)", 
                        "15": "rgba(0, 197, 118, 0.3)",
                        "18": "rgba(0, 197, 59, 0.3)",
                        "21": "rgba(0, 197, 23, 0.3)",
                        "24": "rgba(0, 197, 13, 0.3)",
                        "27": "rgba(62, 197, 0, 0.3)",
                        "30": "rgba(144, 197, 0, 0.3)",
                        "33": "rgba(197, 177, 0, 0.3)",
                        "36": "rgba(197, 151, 0, 0.3)",
                        "40": "rgba(197, 105, 0, 0.3)",
                        "43": "rgba(197, 69, 0, 0.3)",
                        "46": "rgba(197, 0, 0, 0.3)",
                    }
                }
            }
            //console.log(colorsObject())
    
            const borderColorObject = () =>{
                if((Math.round(Math.min(...tempData()) / 10) * 10) - 5 < 0){
                    return {
                        "-20": "rgba(51, 0, 204, 1)",
                        "-15": "rgba(13, 0, 193, 1)",
                        "-10": "rgba(0, 29, 215, 1)",
                        "-5": "rgba(0, 47, 215, 1)",
    
                        "0": "rgba(0, 80, 193, 1)",
                        "3": "rgba(0, 107, 193, 1)",
                        "6": "rgba(0, 135, 193, 1)",
                        "9": "rgba(0, 175, 193, 1)",
                        "12": "rgba(0, 193, 166, 1)",
                        "15": "rgba(0, 193, 130, 1)",
                        "18": "rgba(0, 193, 98, 1)",
                        "21": "rgba(0, 193, 54, 1)",
                        "24": "rgba(79, 193, 0, 1)",
                        "27": "rgba(127, 193, 0, 1)",
                        "30": "rgba(147, 193, 0, 1)",
                        "33": "rgba(193, 178, 0, 1)",
                        "36": "rgba(193, 130, 0, 1)",
                        "40": "rgba(193, 82, 0, 1)",
                        "43": "rgba(193, 50, 0, 1)",
                        "46": "rgba(218, 0, 0, 1)",
                    }
    
                }else {
                    return {
                        "0": "rgba(0, 80, 193, 1)",
                        "3": "rgba(0, 107, 193, 1)",
                        "6": "rgba(0, 135, 193, 1)",
                        "9": "rgba(0, 175, 193, 1)",
                        "12": "rgba(0, 193, 166, 1)",
                        "15": "rgba(0, 193, 130, 1)",
                        "18": "rgba(0, 193, 98, 1)",
                        "21": "rgba(0, 193, 54, 1)",
                        "24": "rgba(79, 193, 0, 1)",
                        "27": "rgba(127, 193, 0, 1)",
                        "30": "rgba(147, 193, 0, 1)",
                        "33": "rgba(193, 178, 0, 1)",
                        "36": "rgba(193, 130, 0, 1)",
                        "40": "rgba(193, 82, 0, 1)",
                        "43": "rgba(193, 50, 0, 1)",
                        "46": "rgba(218, 0, 0, 1)",
                    }
                }
            }
            //console.log(borderColorObject())
    
            //data block
            const chartData = {
                labels: hoursArray,
                datasets: [{
                    label: "",
                    data: tempData(),
                    segment: {
                        borderDash: ctx => dash(ctx),
                    },
                    gradient: {
                        backgroundColor: {
                          axis: 'y',
                          colors: colorsObject()
                        },
    
                        borderColor: {
                            axis: 'y',
                            colors: borderColorObject()
                        }
                    },
                    borderWidth: 6.5,
                    borderColor: "red", //fix with gradient function later
                    pointBackgroundColor: "transparent",
                    pointBorderColor: "transparent",
                    borderCapStyle: 'round',
                    clip: {
                        left: 0,
                        right: 0,
                        top: false,
                        bottom: false
                    },
                    tension: 0.2,
                    fill: "stack",
                    backgroundColor: "transparent" //fix with gradient func later
                }]
            }
        
            const plugin = {
                id: 'customCanvasBackgroundColor',
                beforeDraw: (chart, args, options) => {
                const {ctx} = chart;
                ctx.save();
                ctx.globalCompositeOperation = 'destination-over';
                ctx.fillStyle = options.color
                ctx.fillRect(0, 0, chart.width, chart.height);
                ctx.restore();
                
                }
            };
        
            //console.log(Math.max(...feelsLikeData()) + 5)
            const minMaxFunc = () =>{
                if((Math.floor(Math.min(...tempData()) / 10) * 10) - 5 <= 0){
                    return (Math.floor(Math.min(...tempData()) / 10) * 10) - 5
    
                }else if((Math.floor(Math.min(...tempData()) / 10) * 10) - 5 <= 11){
                    return 0
                } else {
                    return (Math.floor(Math.min(...tempData()) / 10) * 10) - 5
                }
            }
            //console.log(minMaxFunc())
            
            
            //console.log(Math.min(...feelsLikeData()))
            //console.log(Math.max(...feelsLikeData()) + 5)
    
            let minValue = (Math.floor(Math.min(...tempData()) / 10) * 10) - 5
            let maxValue = (Math.ceil(Math.max(...tempData()) / 10) * 10) + 5
    
    
            if(maxValue < 10){
                container.style.width = `423px`
            }else {
                container.style.width = `427px`
            }
    
            const amplitude = () =>{
                //console.log(maxValue)
                //console.log(minValue)
    
                if(maxValue - minValue == 5){
                    return 3
                }else if(maxValue - minValue == 10){
                    return 4
                }else if(maxValue - minValue == 15){
                    return 5
                }else if(maxValue - minValue == 20){
                    
                    return 7
                }else if(maxValue - minValue == 25){
                    
                    return 7
                }else if(maxValue - minValue == 30){
                    
                    return 100
                }else if(maxValue - minValue == 35){
                    
                    return 15
                }else if(maxValue - minValue == 40){
                    
                    return 10
                }
            }
            //console.log(amplitude())
    
            //console.log(30)
    
            //console.log(minMaxFunc())
            //console.log((Math.floor(Math.min(...feelsLikeData()) / 10) * 10) - 5)
    
            //config block
            const config = {
                type: "line",
                data: chartData,  
                options: {
                    aspectRatio: 7/4,
                    responsive: true,
                    scales: {
                        y: {
                            min: minMaxFunc(),
                            //beginAtZero: minMaxFunc(),
                            max: maxValue,
                            
    
                            grid: {
                                drawTicks: false,
                                display: true,
                                drawOnChartArea: true,
                                color: "#302F32"
                            },
                            border: {
                                display: true,
                                color: "#302F32"
                            },
                            ticks: {
                                color: "#9D9D9E",
                                padding: 15,
                                align: "center",
                                crossAlign: "center", 
                                font: {
                                    size: 13,
                                    weight: 400
                                },
                                maxTicksLimit: amplitude(),
                                callback: function(value, index, values){
                                    return `${value}°`
                                }
                            },
                            position: "right"
                        },
        
                        x: {
                            border: {
                                display: false,
                                dash: [3, 2]
                            },
                            grid: {
                                display: true,
                                drawOnChartArea: true,
                                drawTicks: false,
                                color: "#302F32"
                            },
        
                            ticks: {
                                color: "#9D9D9E",
                                maxTicksLimit: 4,
                                padding: 5,
                                align: "start",
                                crossAlign: "near",
                                font: {
                                    size: 15,
                                    weight: 400
                                },
                                
                            }
                        },
        
                        
                    },
                    plugins: {
                        customCanvasBackgroundColor: {
                            color: "#202023"
                        },
                        legend: {
                            display: false
                        },
                        autocolors: false,
                        annotation: {
                            
                            annotations: {
                                
                                point2: {
                                    type: "point",
                                    xValue: labelToChange,
                                    yValue: tempData()[labelToChange],
                                    backgroundColor: "#fafafa",
                                    borderWidth: 4,
                                    borderColor: "black",
                                    radius: 5.5,
                                    
                                },
                                point1: {
                                    yValue: Math.min(...tempData()),
                                    xValue: tempData().indexOf(Math.min(...tempData())),
    
                                    type: "point",
                                    backgroundColor: "transparent",
                                    borderWidth: 4,
                                    borderColor: "black",
                                    radius: 5.5,
                                },
                                point3: {
                                    yValue: Math.max(...tempData()),
                                    xValue: tempData().indexOf(Math.max(...tempData())),
    
                                    type: "point",
                                    backgroundColor: "transparent",
                                    borderWidth: 4,
                                    borderColor: "black",
                                    radius: 5.5,
                                    //callback: yValue => 
                                },
                                label1: {
                                    type: "label",
                                    yValue: Math.max(...tempData()) + 2.5,
                                    xValue: tempData().indexOf(Math.max(...tempData())),
                                    backgroundColor: "transparent",
                                    color: "#9D9D9E",
                                    content: "H",
                                    font: {
                                        size: 15
                                    }
                                },
                                label2: {
                                    type: "label",
                                    yValue: Math.min(...tempData()) + 2.5,
                                    xValue: tempData().indexOf(Math.min(...tempData())),
                                    backgroundColor: "transparent",
                                    color: "#9D9D9E",
                                    content: "L",
                                    font: {
                                        size: 15
                                    }
                                }
                            },
                            clip: false
                        } 
                    },   
                },
                plugins: [plugin, gradient]
            }
            //console.log(Math.max(...feelsLikeData()))
        
            
            const feelsLikeChart = new Chart(ctx, config)
        }
        conditionsChartFunction()

        const rainFORCONDITIONSChartFunction = () =>{ 
            const hoursArray = []
    
            for(let i = 0; i < 24; i++){
                hoursArray.push(i)
            }
    
            //the index at which the change will occur
            let labelToChange = new Date(weatherData.current.last_updated).getHours()
            

            const canvasElement = document.querySelector(".canvas-holder-second")
            const chartOverlay = document.createElement("div")
            chartOverlay.classList.add("rain-conditions-overlay")
            canvasElement.appendChild(chartOverlay)

            
            const rainBlankOverlay = document.createElement("div")
            rainBlankOverlay.classList.add("rain-blank-overlay") 
            canvasElement.appendChild(rainBlankOverlay)

            const darkOverlayRain = document.createElement("div")
            darkOverlayRain.classList.add("dark-overlay-rain")
            canvasElement.appendChild(darkOverlayRain)

            const lineDivider = document.createElement("div")
            lineDivider.classList.add("line-divider-rain")
            chartOverlay.appendChild(lineDivider)
            
            const overlayStyle = () =>{
                if(labelToChange == 0){
                    chartOverlay.style.width = `0px`
                    
                }else if(labelToChange == 1){
                    chartOverlay.style.width = `19px`
                    
                }else if(labelToChange == 2){
                    chartOverlay.style.width = `37px`
                    
                }else if(labelToChange == 3){
                    chartOverlay.style.width = `54px`
                    
                }else if(labelToChange == 4){
                    chartOverlay.style.width = `72px`
                    
                }else if(labelToChange == 5){
                    chartOverlay.style.width = `90px`
                    
                }else if(labelToChange == 6){
                    chartOverlay.style.width = `108px`
                    
                }else if(labelToChange == 7){
                    chartOverlay.style.width = `125px`
                    
                }else if(labelToChange == 8){
                    chartOverlay.style.width = `143px`
                    
                }else if(labelToChange == 9){

                    chartOverlay.style.width = `161px`
                    
                }else if(labelToChange == 10){
                    chartOverlay.style.width = `178px`
                    
                }else if(labelToChange == 11){
                    chartOverlay.style.width = `197px`
                    
                }else if(labelToChange == 12){
                    chartOverlay.style.width = `214px`
                    
                }else if(labelToChange == 13){
                    chartOverlay.style.width = `232px`
                    
                }else if(labelToChange == 14){
                    chartOverlay.style.width = `250px`
                    
                }else if(labelToChange == 15){
                    chartOverlay.style.width = `268px`
                    
                }else if(labelToChange == 16){
                    chartOverlay.style.width = `285px`
                    
                }else if(labelToChange == 17){
                    chartOverlay.style.width = `303px`
                    
                }else if(labelToChange == 18){
                    chartOverlay.style.width = `321px`
                    
                }else if(labelToChange == 19){
                    chartOverlay.style.width = `338px`
                    
                }else if(labelToChange == 20){
                    chartOverlay.style.width = `356px`
                    
                }else if(labelToChange == 21){
                    chartOverlay.style.width = `374px`
                    
                }else if(labelToChange == 22){
                    chartOverlay.style.width = `391.5px`
                    
                }else if(labelToChange == 23){
                    chartOverlay.style.width = `409px`
                    
                }

                darkOverlayRain.style.width = chartOverlay.style.width
                lineDivider.style.left = chartOverlay.style.width 
            } 
            overlayStyle()
    
            //when will the line be dashed and stright
            const dash = (ctx) => {
                //console.log(ctx.p0DataIndex)
                if(ctx.p0DataIndex < labelToChange){
                    return [8, 10]
                }
            }
    
            const hideBorderFunc = (ctx) =>{
                if(ctx.p0DataIndex < labelToChange){
                    return "transparent"
                }else {
                    return "#36C8EB"
                }
            }
    
           
    
            let ctx = document.querySelector("#canvasSecond").getContext("2d")
            
            
            const precipData = () =>{
                const rainArray = []
                const snowArray = []
    
                for(let i = 0; i < weatherData.forecast.forecastday[0].hour.length; i++){
                    rainArray.push(Math.round(weatherData.forecast.forecastday[0].hour[i].chance_of_rain / 10) * 10)
                    snowArray.push(Math.round(weatherData.forecast.forecastday[0].hour[i].chance_of_snow / 10) * 10)
                }
    
                if(Math.max(...snowArray) > Math.max(...rainArray)){
                    return snowArray
                }else {
                    return rainArray
                }
            }
            //console.log(weatherData.forecast.forecastday[9].hour[7])
    
            const gradient = window['chartjs-plugin-gradient'];
            
    
            
    
            const fillerColor = (ctx) => {
                if(ctx.p0DataIndex < labelToChange){
                    return "transparent"
                }else {
                    return "rgba(0, 163, 238, 0.3)"
                }
            }
    
            //data block
            const chartData = {
                labels: hoursArray,
                datasets: [{
                    label: "",
                    data: precipData(),
                    segment: {
                        //borderDash: ctx => dash(ctx),
                        //borderWidth: ctx => hideBorderFunc(ctx),
                        borderColor: ctx => hideBorderFunc(ctx),
                        backgroundColor: ctx => fillerColor(ctx)
                    },
                    gradient: {
                        backgroundColor: {
                          axis: 'y',
                          colors: {
                
                            
                          }
                        },
                        borderColor: {
                            axis: "y",
                            colors: {
                                
                            }
                        }
                    },
                    
                    //borderColor: "#36C8EB",
                    pointBackgroundColor: "transparent",
                    pointBorderColor: "transparent",
                    //borderCapStyle: 'round',
                    clip: {
                        left: false,
                        right: false,
                        top: false,
                        bottom: false
                    },
                    tension: 0.1,
                    fill: true,
                    //backgroundColor: "rgba(0, 163, 238, 0.3)"
                    
                }]
            }
    
            
        
            const plugin = {
                id: 'customCanvasBackgroundColor',
                beforeDraw: (chart, args, options) => {
                const {ctx} = chart;
                ctx.save();
                ctx.globalCompositeOperation = 'destination-over';
                ctx.fillStyle = options.color
                ctx.fillRect(0, 0, chart.width, chart.height);
                ctx.restore();
                
                }
            };
        
        
            //config block
            const config = {
                type: "line",
                data: chartData,  
                options: {
                    aspectRatio: 7/4,
                    responsive: true,
                    scales: {
                        y: {
                        
                            beginAtZero: true,
                            suggestedMax: 100,
                            grid: {
                                drawTicks: false,
                                display: true,
                                drawOnChartArea: true,
                                color: "#302F32"
                            },
                            border: {
                                display: true,
                                color: "#302F32"
                            },
                            ticks: {
                                color: "#9D9D9E",
                                //maxTicksLimit: 6,
                                padding: 15,
                                align: "center",
                                crossAlign: "center", 
                                font: {
                                    size: 13,
                                    weight: 400
                                },
                                callback: function(value){
                                    return `${value}%`
                                }
                            },
                            position: "right"
                        },
        
                        x: {
                            border: {
                                display: false,
                                dash: [3, 2]
                            },
                            grid: {
                                display: true,
                                drawOnChartArea: true,
                                drawTicks: false,
                                color: "#302F32"
                            },
        
                            ticks: {
                                color: "#9D9D9E",
                                maxTicksLimit: 4,
                                padding: 5,
                                align: "start",
                                crossAlign: "near",
                                font: {
                                    size: 15,
                                    weight: 400
                                }
                            }
                        },
        
                        
                        
                    },
                    plugins: {
                        customCanvasBackgroundColor: {
                            color: "#202023"
                        },
                        legend: {
                            display: false
                        },
                        annotation: {
                            
                            annotations: {
                                
                                point2: {
                                    type: "point",
                                    xValue: labelToChange,
                                    yValue: precipData()[labelToChange],
                                    backgroundColor: "#fafafa",
                                    borderWidth: 4,
                                    borderColor: "black",
                                    radius: 5.5,
                                    
                                },
                                point3: {
                                    type: "point",
                                    //xValue: precipData().indexOf(Math.max(...precipData())),
                                    xValue: function(){
                                        if(precipData().indexOf(Math.max(...precipData())) > labelToChange){
                                            return precipData().indexOf(Math.max(...precipData()))
                                        }else {
                                            return precipData().indexOf(labelToChange)
                                        }
                                    },
                                    

                                    yValue: Math.max(...precipData()),
                                    backgroundColor: "#36C8EB",
                                    borderWidth: 1,
                                    borderColor: "black",
                                    radius: 5.5 
                                },
                                label1: {
                                    type: "label",
                                    //xValue: precipData().indexOf(Math.max(...precipData())) + 0.8,
                                    xValue: function(){
                                        if(precipData().indexOf(Math.max(...precipData())) > labelToChange){
                                            return precipData().indexOf(Math.max(...precipData()))
                                        }else {
                                            return labelToChange + 0.8
                                        }
                                    },
                                    yValue: function(){
                                        if(precipData().indexOf(Math.max(...precipData())) > labelToChange){
                                            return Math.max(...precipData()) + 6.5
                                    
                                        }else {
                                            
                                            return precipData()[labelToChange] + 7
                                        }
                                    },

                                    //yValue: Math.max(...precipData()) + 6.5,
                                    color: function(){
                                        if(labelToChange == 23 || labelToChange == 22){
                                            return 'transparent'
                                        }
                                        return "#36C8EB"
                                    },
                                    //content: `${precipData()[labelToChange]}%`,
                                    content: function(){
                                        if(precipData().indexOf(Math.max(...precipData())) > labelToChange){
                                            return `${Math.max(...precipData())}%`
                                        }else {
                                            return `${precipData()[labelToChange]}%`
                                        }
                                    },
                                    font: {
                                        size: 15
                                    }
                                }
                                
                            },
                            clip: false
                        }
                    },
                    
                },
                plugins: [plugin, gradient]
            }
            //console.log(precipData().indexOf(Math.max(...precipData(), labelToChange), labelToChange))
            //console.log(precipData().indexOf(Math.max(...precipData().slice(0, labelToChange)), labelToChange))
            //console.log(precipData().indexOf(Math.max(...precipData())))
        
            const rainFallSnowChart = new Chart(ctx, config)
    
        }
        rainFORCONDITIONSChartFunction()
        
        const wrapper = document.querySelector(".forecast-days-wrap")

        let mouseDown = false //will change if mouse is clicked

        const dragging = (e)=>{
            if(!mouseDown){ //if the mouse isnt click this will not run
                return
            }
            wrapper.style.cursor = `grabbing` //styling for the cursor
            e.preventDefault() //preventing default behaviour
            wrapper.scrollLeft -= e.movementX //the scroll movement
        }

        wrapper.addEventListener("mousedown", ()=>{
            mouseDown = true //when the mouse is down change the variable value
            wrapper.style.cursor = `grabbing`
        })
        wrapper.addEventListener("mousemove", dragging) //when the mouse moves run the function

        wrapper.addEventListener("mouseup", ()=>{
            mouseDown = false //mouse is no longer clicked
            wrapper.style.cursor = `grab`
        })
        wrapper.addEventListener("mouseleave", ()=>{
            mouseDown = false //mouse leaves the element
            wrapper.style.cursor = `grab`
        })

        const selectDropdown = document.querySelector(".select")
        const littleCaret = document.querySelector(".rotated")
        let elementActive = false 
        const menuItemspWrapper = document.querySelector(".menu-wrapper")
        const eachItemMenu = document.querySelectorAll(".each-item-menu")
        const divWithTick = document.querySelectorAll(".svg-tick")

        

        eachItemMenu[0].addEventListener("click", ()=>{
            mainFunctionForecast()
            
        })

        eachItemMenu[1].addEventListener("click", ()=>{
            mainFunction()
        
        })

        eachItemMenu[2].addEventListener("click", ()=>{
            mainFunctionFORWIND()
        
        })

        eachItemMenu[3].addEventListener("click", ()=>{
            mainFunctionRAIN()
        
        })

        eachItemMenu[4].addEventListener("click", ()=>{
            mainFunctionFEELSLIKE()
            
        })

        eachItemMenu[5].addEventListener("click", ()=>{
            mainFunctionHUMIDITY()
        
        })

        eachItemMenu[6].addEventListener("click", ()=>{
            mainFunctionVISIBILITY()
        
        })

        eachItemMenu[7].addEventListener("click", ()=>{
            mainFunctionPRESSURE()
        
        })
        
    

        const functionForDropdownActivation = (e) =>{
            if(!elementActive){
                selectDropdown.style.backgroundColor = '#515154'
                littleCaret.classList.add("true")
                menuItemspWrapper.style.display = 'block'
                menuItemspWrapper.style.height = `auto`
            }else{
                selectDropdown.style.backgroundColor = '#3A3A3D'
                littleCaret.classList.remove("true")
                menuItemspWrapper.style.display = 'none'
                menuItemspWrapper.style.height = `0`
            }

            elementActive = !elementActive
            e.stopPropagation()
        }
        
        const clickAnywhereElse = () =>{
            if(elementActive){
                selectDropdown.style.backgroundColor = '#3A3A3D'
                elementActive = false
                littleCaret.classList.remove("true")
                menuItemspWrapper.style.display = 'none'
                menuItemspWrapper.style.height = `0`
            }
        }

        selectDropdown.addEventListener("click", functionForDropdownActivation)

        document.body.addEventListener("click", clickAnywhereElse)
        
    }
    //mainFunctionForecast()

    const allForecast = document.querySelectorAll(".each-day")

    allForecast[0].addEventListener("click", ()=>{
        mainFunctionForecast()
        const addInfo = document.querySelector(".additional-info")
        ADVANCED_DATA_OVERLAY.style.display = 'flex'
        
        body.style.overflow = "hidden"
    })


    for(let varible = 1; varible < allForecast.length; varible++){

        allForecast[varible].addEventListener("click", ()=>{

            
            const createElementFORECASTOtherDays = () =>{
                //const wrapper = document.querySelector(".forecast-days-wrap")
                //const WHLE_ELMNT = document.querySelector(".advanced-data")
                const PARENT_ELEMENT = document.querySelector(".additional-info")
                PARENT_ELEMENT.innerHTML = ` `
                const headline = document.createElement("div")
                headline.classList.add("headline")
                headline.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M0 336c0 79.5 64.5 144 144 144H512c70.7 0 128-57.3 128-128c0-61.9-44-113.6-102.4-125.4c4.1-10.7 6.4-22.4 6.4-34.6c0-53-43-96-96-96c-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32C167.6 32 96 103.6 96 192c0 2.7 .1 5.4 .2 8.1C40.2 219.8 0 273.2 0 336z"/></svg>
                <span>Conditions</span>
                `
                const closeX = document.createElement("div")
                closeX.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
                ` 
                headline.appendChild(closeX)
                PARENT_ELEMENT.appendChild(headline)
        
                closeX.addEventListener("click", ()=>{
                    PARENT_ELEMENT.innerHTML = ``
                    ADVANCED_DATA_OVERLAY.style.display = "none"
                    body.style.overflow = "auto"
                })
        
                
                PARENT_ELEMENT.style.marginTop = `16rem`
                
                const WHLE_ELMNT = document.createElement("div")
                WHLE_ELMNT.classList.add("advanced-data")
                PARENT_ELEMENT.appendChild(WHLE_ELMNT)
                WHLE_ELMNT.innerHTML = ``
                const wrapper = document.createElement("div")
                wrapper.classList.add("forecast-days-wrap")
                const index = document.createElement("div")
                index.classList.add("index")
                const extraText = document.createElement("div")
                extraText.classList.add("extra-text")
                WHLE_ELMNT.appendChild(wrapper)
                
                
                
        
                for(let i = 0; i < weatherData.forecast.forecastday.length; i++){
                    let days = new Date(weatherData.forecast.forecastday[i].date)
                    let daysShort = days.toLocaleDateString("default", {"weekday": "narrow"})
                    let fullDay = days.toLocaleDateString("default", {weekday: "long", day: "2-digit", month: "long", "year": "numeric"})
                    let numbersDays = days.toLocaleDateString("default", {day: "2-digit"})
                    let currentHour = new Date(weatherData.current.last_updated).getHours()
                    let sunsetToday = Number(weatherData.forecast.forecastday[i].astro.sunset.slice("0", "2")) + 12
                    
                    
        
                    //console.log(fullDay)
                    if(i == varible){

                        const WEATHER_PER_HOUR = () =>{
        
                            let forecastWeather = weatherData.forecast.forecastday[i].day.condition.text
                                
                            if(forecastWeather == 'Mist'){
                                //console.log("Mist Day")
                                return '<img src="fog.png">'
                            } else if (forecastWeather == 'Sunny'){
                                //console.log("Sunny Day")
                                return '<img src="sunny.png">'
                            }else if((forecastWeather == 'Partly cloudy')) {
                                //console.log("Partly Cloudy Day")
                                return '<img src="cloud-sun-off.png">'
                            } else if((forecastWeather == 'Cloudy') || (forecastWeather == 'Overcast')) {
                                //console.log("Overcast or cloudy Day")
                                return '<img src="cloud-removebg-preview.png">'
                            } else if ((forecastWeather == 'Heavy rain')){
                                //console.log("Heavy Rain Day")
                                return '<img src="rain.png">'
                            } else if ((forecastWeather == 'Moderate rain')){
                                //console.log("Moderate Rain Day")
                                return '<img src="rain.png">'
                            } else if ((forecastWeather == 'Fog')){
                                //console.log("Fog Day")
                                return '<img src="fog.png">'
                            } else if((forecastWeather == 'Patchy rain possible' || forecastWeather == 'Light drizzle' || forecastWeather == 'Light rain shower')){
                                return '<img src="rain.png">'
                            } else if(forecastWeather.includes("snow")){
                                return '<img src="snowflake.png">'
                            }else if(forecastWeather = "Light freezing rain"){
                                return '<img src="rain.png">'
                            }else if(forecastWeather = "Blizzard"){
                                return '<img src="snowflake.png">'
                            }else{
                                console.log((forecastWeather))
                                return 'CONDITION NOT DEFINED'
                            }
                            
                        }

                        const highestLowestTemp = () =>{
                            const time = []
                            const temps = []
            
                            for(let j = 0; j < weatherData.forecast.forecastday[i].hour.length; j++){
                                time.push(weatherData.forecast.forecastday[i].hour[j].time)
                                temps.push(Math.round(weatherData.forecast.forecastday[i].hour[j].temp_c))
                            }
            
                            const highestTemp = Math.max(...temps)
                            const lowestTemp = Math.min(...temps)
            
                            const timesSeenHighest = [] //the amount of times the certain has appeared
                            const timesSeenLowest = []
                            for(let j = 0; j < temps.length; j++){
                                if(temps[j] == highestTemp){
                                    timesSeenHighest.push(j)
                                }
            
                                if(temps[j] == lowestTemp){
                                    timesSeenLowest.push(j)
                                }
                            }
            
                            const correspondingValuesHIGHEST = timesSeenHighest.map(idx => time[idx])
                            const correspondingValuesLOWEST = timesSeenLowest.map(idx => time[idx])
            
                            return [correspondingValuesHIGHEST, correspondingValuesLOWEST]
                        }
                        
            
                        //console.log(highestLowestTemp()[0], highestLowestTemp()[1])
                        const whichHour = () =>{
                            let timeForHighest = highestLowestTemp()[0]
                            let timeForLowest = highestLowestTemp()[1]
            
                            if(timeForHighest.length > 1 && timeForLowest.length > 1){
                                //return [[timeForHighest[0], timeForHighest[timeForHighest.length - 1]], [timeForLowest[0], timeForLowest[timeForLowest.length - 1]]]
                                return `low will be ${Math.round(weatherData.forecast.forecastday[i].day.mintemp_c)}° between ${timeForLowest[0].slice("11")} and ${timeForLowest[timeForLowest.length - 1].slice("11")}, and the high will be ${Math.round(weatherData.forecast.forecastday[i].day.maxtemp_c)}° between ${timeForHighest[0].slice("11")} and ${timeForHighest[timeForHighest.length - 1].slice("11")}.`
            
                            }else if(timeForHighest.length > 1 && timeForLowest.length == 1){
                                //return [[timeForHighest[0], timeForHighest[timeForHighest.length - 1]], [timeForLowest[0]]]
                                return `low will be ${Math.round(weatherData.forecast.forecastday[i].day.mintemp_c)}° at ${timeForLowest[0].slice("11")} , and the high will be ${Math.round(weatherData.forecast.forecastday[i].day.maxtemp_c)}° between ${timeForHighest[0].slice("11")} and ${timeForHighest[timeForHighest.length - 1].slice("11")}.`
            
                            }else if(timeForHighest.length == 1 && timeForLowest.length == 1){
                                //return [[timeForHighest[0]], [timeForLowest[0]]]
                                return `low will be ${Math.round(weatherData.forecast.forecastday[i].day.mintemp_c)}° at ${timeForLowest[0].slice("11")}, and the high will be ${Math.round(weatherData.forecast.forecastday[i].day.maxtemp_c)}° at ${timeForHighest[0].slice("11")}.`
            
                            }else if(timeForHighest.length == 1 && timeForLowest.length > 1){
                                //return [[timeForHighest[0]], [timeForLowest[0], timeForLowest[timeForLowest.length - 1]]]
                                return `low will be ${Math.round(weatherData.forecast.forecastday[i].day.mintemp_c)}° between ${timeForLowest[0].slice("11")} and ${timeForLowest[timeForLowest.length - 1].slice("11")}, and the high will be ${Math.round(weatherData.forecast.forecastday[i].day.maxtemp_c)}° at ${timeForHighest[0].slice("11")}.`
                            }else{
                                return [timeForHighest.length, timeForLowest.length]
                            }
            
                        }

                        const highestTempsTEXT = () =>{
                            if(whichHour()[0][1]){
                                return `between ${whichHour()[0][0].slice("11")} and ${whichHour()[0][1].slice("11")}`
                            }else{
                                return `at ${whichHour()[0][0].slice("11")}`
                            }
                        }
        
                        const lowestTempsTEXT = () =>{
                            if(whichHour()[1][1]){
                                return `between ${whichHour()[1][0].slice("11")} and ${whichHour()[1][1].slice("11")}`
                            }else{
                                return `at ${whichHour()[1][0].slice("11")}`
                            }
                        }
                        //console.log(lowestTempsTEXT())
                        //console.log(highestTempsTEXT())

                        let days = new Date(weatherData.forecast.forecastday[i].date)
                        let weekday = days.toLocaleDateString("default", {weekday: "long"})
                        
                        const day = document.createElement("div")
                        day.classList.add("forecast-each-day")
                        day.innerHTML = `
                        <span>${daysShort}</span>
                        <span class="numbers active">${numbersDays}</span>
                        `
                        wrapper.appendChild(day)
        
                        //console.log(weatherData)
                        const rainSnowPercent = () =>{
                            const daysHighestRain = []
                            const daysHighestSnow = []
        
                            for(let j = 0; j < weatherData.forecast.forecastday[i].hour.length; j++){
                                daysHighestRain.push(weatherData.forecast.forecastday[i].hour[j].chance_of_rain)
                                daysHighestSnow.push(weatherData.forecast.forecastday[i].hour[j].chance_of_snow)
                            }
        
                            if(Math.max(...daysHighestRain) < Math.max(...daysHighestSnow)){
                                return `Chance of snow: ${Math.round(Math.max(...daysHighestSnow) / 10) * 10}%`
                            }else if(Math.max(...daysHighestRain) >= Math.max(...daysHighestSnow) && Math.max(...daysHighestRain)){
                                return `Chance of rain: ${Math.round(Math.max(...daysHighestRain) / 10) * 10}%`
                            }else {
                                return `Chance of rain: 0%`
                            }
                        }
        
                        const fullDate = document.createElement("div")
                        fullDate.classList.add("datepicked")
                        fullDate.textContent = fullDay
                        WHLE_ELMNT.appendChild(fullDate)
                        index.innerHTML = `
                        <div class="special">
                            <span>${Math.round(weatherData.forecast.forecastday[i].day.maxtemp_c)}°</span>
                            <span class="forecast-low-temp">${Math.round(weatherData.forecast.forecastday[i].day.mintemp_c)}°</span>
                            ${WEATHER_PER_HOUR()}
                        </div>
                        <span style="color: #36C8EB" class="highLow-precip ">${rainSnowPercent()}</span>

                        <div class="dropdown">

                    <div class="select">
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M0 336c0 79.5 64.5 144 144 144H512c70.7 0 128-57.3 128-128c0-61.9-44-113.6-102.4-125.4c4.1-10.7 6.4-22.4 6.4-34.6c0-53-43-96-96-96c-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32C167.6 32 96 103.6 96 192c0 2.7 .1 5.4 .2 8.1C40.2 219.8 0 273.2 0 336z"></path></svg>
                        <svg class="rotated " xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"/></svg>
                    </div>

                    <div class="menu-wrapper">
                        <div class="each-item-menu">
                            <div class="svg-tick">
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
                            </div>
                            <div>
                                <span>Conditions</span>
                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M0 336c0 79.5 64.5 144 144 144H512c70.7 0 128-57.3 128-128c0-61.9-44-113.6-102.4-125.4c4.1-10.7 6.4-22.4 6.4-34.6c0-53-43-96-96-96c-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32C167.6 32 96 103.6 96 192c0 2.7 .1 5.4 .2 8.1C40.2 219.8 0 273.2 0 336z"></path></svg>
                            </div>
                        </div>
                        <div class="each-item-menu">
                            <div class="svg-tick">
                                
                            </div>
                            <div>
                                <span>UV Index</span>
                                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24"><path d="M12,17c-2.76,0-5-2.24-5-5s2.24-5,5-5,5,2.24,5,5-2.24,5-5,5Zm1-13V1c0-.55-.45-1-1-1s-1,.45-1,1v3c0,.55,.45,1,1,1s1-.45,1-1Zm0,19v-3c0-.55-.45-1-1-1s-1,.45-1,1v3c0,.55,.45,1,1,1s1-.45,1-1ZM5,12c0-.55-.45-1-1-1H1c-.55,0-1,.45-1,1s.45,1,1,1h3c.55,0,1-.45,1-1Zm19,0c0-.55-.45-1-1-1h-3c-.55,0-1,.45-1,1s.45,1,1,1h3c.55,0,1-.45,1-1ZM6.71,6.71c.39-.39,.39-1.02,0-1.41l-2-2c-.39-.39-1.02-.39-1.41,0s-.39,1.02,0,1.41l2,2c.2,.2,.45,.29,.71,.29s.51-.1,.71-.29Zm14,14c.39-.39,.39-1.02,0-1.41l-2-2c-.39-.39-1.02-.39-1.41,0s-.39,1.02,0,1.41l2,2c.2,.2,.45,.29,.71,.29s.51-.1,.71-.29Zm-16,0l2-2c.39-.39,.39-1.02,0-1.41s-1.02-.39-1.41,0l-2,2c-.39,.39-.39,1.02,0,1.41,.2,.2,.45,.29,.71,.29s.51-.1,.71-.29ZM18.71,6.71l2-2c.39-.39,.39-1.02,0-1.41s-1.02-.39-1.41,0l-2,2c-.39,.39-.39,1.02,0,1.41,.2,.2,.45,.29,.71,.29s.51-.1,.71-.29Z"></path></svg>
                            </div>
                        </div>
                        <div class="each-item-menu">
                            <div class="svg-tick"></div>
                            <div>
                                <span>Wind</span>
                                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24"><path d="M0,12a1,1,0,0,1,1-1H7a1,1,0,0,1,0,2H1A1,1,0,0,1,0,12Zm20.886-.893A4.99,4.99,0,1,0,12,8a1,1,0,0,0,2,0,3,3,0,1,1,3,3H11a1,1,0,0,0,0,2h9a2,2,0,0,1,2,2c-.009,2.337-3.281,2.648-4.057.667a1,1,0,0,0-1.886.666C17.615,20.415,23.952,19.579,24,15A4,4,0,0,0,20.886,11.107ZM11,16H1a1,1,0,0,0,0,2H11a2,2,0,0,1,2,2c-.009,2.337-3.281,2.648-4.057.667a1,1,0,1,0-1.886.666C8.615,25.415,14.952,24.579,15,20A4,4,0,0,0,11,16ZM1,8H7a4,4,0,0,0,4-4C10.952-.581,4.613-1.414,3.057,2.667a1,1,0,0,0,1.886.666C5.72,1.351,8.991,1.663,9,4A2,2,0,0,1,7,6H1A1,1,0,0,0,1,8Z"></path></svg>
                        
                            </div>
                        </div>
                        <div class="each-item-menu">
                            <div class="svg-tick"></div>
                            <div>
                                <span>Precipitation</span>
                                <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">

                                    <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)">
                                    <path d="M2413 4898 c-779 -1184 -1258 -2187 -1394 -2918 -26 -137 -36 -428
                                    -20 -553 84 -631 499 -1151 1076 -1345 434 -147 924 -86 1305 159 472 305 750
                                    820 751 1387 0 180 -20 332 -66 522 -147 597 -468 1299 -995 2175 -196 325
                                    -495 785 -511 785 -3 0 -70 -96 -146 -212z"></path>
                                    </g>
                                    </svg>
                            </div>
                        </div>
                        <div class="each-item-menu">
                            <div class="svg-tick"></div>
                            <div>
                                <span>Feels Like</span>
                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M416 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm0 128A96 96 0 1 0 416 0a96 96 0 1 0 0 192zM96 112c0-26.5 21.5-48 48-48s48 21.5 48 48V276.5c0 17.3 7.1 31.9 15.3 42.5C217.8 332.6 224 349.5 224 368c0 44.2-35.8 80-80 80s-80-35.8-80-80c0-18.5 6.2-35.4 16.7-48.9C88.9 308.4 96 293.8 96 276.5V112zM144 0C82.1 0 32 50.2 32 112V276.5c0 .1-.1 .3-.2 .6c-.2 .6-.8 1.6-1.7 2.8C11.2 304.2 0 334.8 0 368c0 79.5 64.5 144 144 144s144-64.5 144-144c0-33.2-11.2-63.8-30.1-88.1c-.9-1.2-1.5-2.2-1.7-2.8c-.1-.3-.2-.5-.2-.6V112C256 50.2 205.9 0 144 0zm0 416c26.5 0 48-21.5 48-48c0-20.9-13.4-38.7-32-45.3V112c0-8.8-7.2-16-16-16s-16 7.2-16 16V322.7c-18.6 6.6-32 24.4-32 45.3c0 26.5 21.5 48 48 48z"></path></svg>
                        
                            </div>
                        </div>
                        <div class="each-item-menu">
                            <div class="svg-tick"></div>
                            
                            <div>
                                <span>Humidity</span>
                                <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
                        
                                    <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)">
                                    <path d="M1866 4785 c-22 -7 -49 -24 -62 -37 -39 -40 -329 -452 -499 -708
                                    -524 -791 -834 -1397 -948 -1850 -28 -113 -31 -140 -32 -285 0 -184 17 -297
                                    72 -470 91 -287 267 -550 492 -737 218 -181 456 -294 736 -350 148 -30 422
                                    -32 570 -4 199 36 431 126 582 225 77 50 108 102 100 169 -9 81 -77 142 -157
                                    142 -35 0 -60 -8 -106 -36 -234 -142 -431 -199 -694 -199 -172 0 -243 11 -396
                                    60 -201 66 -348 157 -505 314 -110 110 -181 206 -241 326 -118 234 -164 517
                                    -119 731 80 384 395 1001 916 1789 196 295 333 490 345 490 19 0 401 -565 595
                                    -880 317 -515 557 -998 633 -1273 19 -66 19 -72 4 -72 -33 0 -118 48 -177 99
                                    -83 72 -219 138 -325 157 -202 38 -404 -18 -565 -156 -78 -68 -146 -99 -238
                                    -109 -41 -5 -88 -16 -104 -26 -97 -57 -103 -201 -11 -267 47 -33 141 -36 249
                                    -9 109 27 193 71 281 144 104 88 163 112 268 112 104 -1 163 -25 260 -109 161
                                    -138 378 -194 585 -151 94 20 214 81 305 156 105 86 144 102 255 103 79 1 97
                                    -2 145 -26 31 -15 85 -53 120 -83 80 -70 201 -130 300 -151 188 -39 295 13
                                    295 144 0 101 -53 148 -182 163 -95 10 -142 32 -233 109 -126 107 -292 170
                                    -445 170 -133 0 -294 -54 -398 -133 -26 -21 -51 -37 -55 -37 -4 0 -18 35 -31
                                    78 -90 311 -364 856 -698 1391 -194 311 -635 957 -712 1045 -39 45 -116 63
                                    -175 41z"></path>
                                    <path d="M4025 4625 c-50 -18 -76 -48 -214 -244 -200 -285 -345 -546 -413
                                    -742 -30 -86 -32 -104 -32 -214 1 -100 5 -132 26 -197 39 -119 92 -204 182
                                    -294 90 -90 175 -143 294 -182 67 -22 94 -26 212 -26 118 0 145 4 212 26 119
                                    39 204 92 294 182 90 90 143 175 182 294 21 65 25 96 26 197 0 131 -13 183
                                    -89 357 -105 238 -466 792 -542 832 -45 23 -94 27 -138 11z m152 -562 c155
                                    -239 246 -409 283 -532 30 -97 23 -170 -25 -267 -42 -86 -102 -144 -193 -187
                                    -61 -29 -76 -32 -162 -32 -86 0 -101 3 -162 32 -91 43 -151 101 -193 187 -48
                                    97 -55 170 -25 267 22 75 82 202 153 324 63 109 218 345 227 345 4 0 48 -62
                                    97 -137z"></path>
                                    <path d="M2380 1725 c-91 -21 -212 -83 -300 -156 -92 -76 -139 -98 -233 -108
                                    -89 -10 -128 -29 -158 -78 -69 -111 14 -243 153 -243 140 1 288 58 418 164
                                    119 96 154 111 265 111 107 0 170 -24 252 -97 258 -230 635 -235 893 -12 99
                                    86 155 109 265 109 110 0 166 -23 265 -109 122 -106 298 -172 437 -164 43 3
                                    71 10 90 24 93 70 96 192 7 261 -26 19 -52 27 -114 34 -97 11 -149 35 -245
                                    114 -277 228 -645 217 -910 -26 -16 -15 -55 -40 -85 -56 -48 -24 -67 -27 -145
                                    -28 -107 0 -166 23 -255 99 -132 114 -264 166 -430 172 -68 2 -128 -2 -170
                                    -11z"></path>
                                    </g>
                                    </svg>
                            </div>
                        </div>
                        <div class="each-item-menu">
                            <div class="svg-tick"></div>
                            <div>
                                <span>Visibility</span>
                                <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24"><path d="M23.271,9.419C21.72,6.893,18.192,2.655,12,2.655S2.28,6.893.729,9.419a4.908,4.908,0,0,0,0,5.162C2.28,17.107,5.808,21.345,12,21.345s9.72-4.238,11.271-6.764A4.908,4.908,0,0,0,23.271,9.419Zm-1.705,4.115C20.234,15.7,17.219,19.345,12,19.345S3.766,15.7,2.434,13.534a2.918,2.918,0,0,1,0-3.068C3.766,8.3,6.781,4.655,12,4.655s8.234,3.641,9.566,5.811A2.918,2.918,0,0,1,21.566,13.534Z"></path><path d="M12,7a5,5,0,1,0,5,5A5.006,5.006,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z"></path></svg>
                        
                            </div>
                        </div>
                        <div class="each-item-menu">
                            <div class="svg-tick">
                            
                            </div>
                            
                            <div>
                                <span>Pressure</span>
                                <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
                        
                                    <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)">
                                <path d="M2300 4656 c-386 -53 -721 -190 -1022 -417 -107 -80 -317 -290 -397
                                -397 -703 -931 -529 -2240 392 -2954 366 -283 822 -438 1287 -438 809 1 1539
                                457 1896 1186 350 714 266 1566 -217 2206 -80 107 -290 317 -397 397 -278 210
                                -596 347 -946 407 -124 21 -471 27 -596 10z m100 -445 c0 -144 7 -171 53 -219
                                75 -77 199 -57 246 42 18 36 21 61 21 174 l0 132 28 0 c56 0 219 -33 330 -66
                                202 -61 389 -155 560 -281 l74 -54 -105 -108 c-83 -85 -107 -116 -112 -145
                                -28 -148 127 -250 256 -167 24 16 78 63 119 106 l75 77 28 -34 c54 -63 149
                                -213 199 -312 83 -165 154 -404 174 -583 l7 -63 -150 0 c-139 0 -152 -2 -184
                                -23 -109 -73 -105 -212 7 -267 34 -17 61 -20 183 -20 l144 0 -7 -52 c-23 -173
                                -82 -384 -146 -521 l-32 -67 -1610 2 -1609 3 -34 75 c-65 148 -120 347 -141
                                508 l-7 52 134 0 c112 0 139 3 173 20 117 57 123 215 11 277 -36 20 -54 23
                                -179 23 l-139 0 7 63 c32 285 162 607 349 860 l50 68 96 -94 c107 -105 142
                                -127 201 -127 107 0 183 105 149 207 -8 25 -45 72 -111 139 l-100 102 59 44
                                c128 99 282 186 436 247 130 52 364 108 460 110 l37 1 0 -129z m1522 -2808
                                c-51 -61 -192 -197 -257 -250 -135 -109 -347 -226 -521 -286 -209 -73 -411
                                -102 -648 -94 -342 11 -638 107 -932 302 -110 73 -281 226 -365 326 l-41 49
                                1402 0 1402 0 -40 -47z"></path>
                                <path d="M2505 3609 c-44 -12 -78 -54 -115 -139 -18 -41 -89 -196 -157 -345
                                -170 -368 -177 -390 -178 -540 0 -118 1 -121 37 -199 49 -101 148 -203 240
                                -246 252 -118 552 -18 680 227 45 85 63 171 55 267 -8 91 -35 166 -149 421
                                -50 110 -117 261 -151 335 -74 165 -89 187 -141 211 -44 20 -74 22 -121 8z
                                m110 -641 c91 -193 135 -310 135 -361 0 -77 -48 -152 -113 -176 -69 -26 -174
                                -4 -219 46 -45 50 -60 137 -34 209 24 70 168 384 176 384 4 0 29 -46 55 -102z"></path>
                                </g>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="canvas-holder">
                    <div class="container-for-values">
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                        <div class="value-hrs"></div>
                    </div>
                    <canvas id="canvas"></canvas>
                </div>

                <span class="chance">Chance of Precipitation</span>

                <div class="canvas-holder-second">
                
                    <canvas id="canvasSecond"></canvas>
                </div>
                        `
                        WHLE_ELMNT.appendChild(index)
                        extraText.innerHTML = `
                        <span class="forecast-daily-sum">Forecast</span>
                        <span class="textForCONDITIONS">${weekday}'s ${whichHour()}</span>
                        `
                        WHLE_ELMNT.appendChild(extraText)

                        const CANVAS_HOLDER = document.querySelector(".canvas-holder")
                        CANVAS_HOLDER.innerHTML = `
                        <div class="container-for-values">
                            <div class="value-hrs"></div>
                            <div class="value-hrs"></div>
                            <div class="value-hrs"></div>
                            <div class="value-hrs"></div>
                            <div class="value-hrs"></div>
                            <div class="value-hrs"></div>
                            <div class="value-hrs"></div>
                            <div class="value-hrs"></div>
                            <div class="value-hrs"></div>
                            <div class="value-hrs"></div>
                            <div class="value-hrs"></div>
                            <div class="value-hrs"></div>
                        </div>
                        <canvas id="canvas"></canvas>
                        `
                        
                        CANVAS_HOLDER.style.marginBottom = `15px`
                        const conditionsChartFunction = () =>{
                            const hoursArray = []
                    
                            for(let i = 0; i < 24; i++){
                                hoursArray.push(i)
                            }
                    
                            //the index at which the change will occur
                            let labelToChange = new Date(weatherData.current.last_updated).getHours()
                    
                    
                            //when will the line be dashed and stright
                            const dash = (ctx) => {
                                //console.log(ctx.p0DataIndex)
                                if(ctx.p0DataIndex < labelToChange){
                                    return [8, 10]
                                }
                            }
                    
                            let ctx = document.querySelector("#canvas").getContext("2d")
                    
                            
                            const tempData = () =>{
                                const tempArray = []
                                for(let d = 0; d < weatherData.forecast.forecastday[i].hour.length; d++){
                                    tempArray.push(Math.round(weatherData.forecast.forecastday[i].hour[d].temp_c))
                    
                                }
                    
                                return tempArray
                            }
                    
                            const canvasElement = document.querySelector(".canvas-holder")
                            const invisibleOverlay = document.createElement("div")
                            invisibleOverlay.classList.add("blank-overlay")
                            canvasElement.appendChild(invisibleOverlay)
                            
                            
                            const gradient = window['chartjs-plugin-gradient'];
                            
                            const container = document.querySelector(".container-for-values")
                        
                            container.style.gap = `19px`
                            const all = document.querySelectorAll(".value-hrs")
                        
                            const weatherIconValues = (arg) =>{
                                const weatherCondition = weatherData.forecast.forecastday[i].hour[arg].condition.text
                                
                        
                                if(weatherData.forecast.forecastday[i].hour[arg].is_day){
                                    if(weatherCondition == 'Mist'){
                                        //console.log("Mist Day")
                                        return '<img src="fog.png">'
                                    } else if (weatherCondition == 'Sunny'){
                                        //console.log("Sunny Day")
                                        return '<img src="sunny.png">'
                                    }else if((weatherCondition == 'Partly cloudy')) {
                                        //console.log("Partly Cloudy Day")
                                        return '<img src="cloud-sun-off.png">'
                                    } else if((weatherCondition == 'Cloudy') || (weatherCondition == 'Overcast')) {
                                        //console.log("Overcast or cloudy Day")
                                        return '<img src="cloud-removebg-preview.png">'
                                    } else if ((weatherCondition == 'Heavy rain')){
                                        //console.log("Heavy Rain Day")
                                        return '<img src="rain.png">'
                                    } else if ((weatherCondition == 'Moderate rain')){
                                        //console.log("Moderate Rain Day")
                                        return '<img src="rain.png">'
                                    } else if ((weatherCondition == 'Fog' || weatherCondition.includes("fog"))){
                                        //console.log("Fog Day")
                                        return '<img src="fog.png">'
                                    } else if((weatherCondition == 'Patchy rain possible' || weatherCondition == 'Light drizzle' || weatherCondition == 'Light rain shower')){
                                        return '<img src="rain.png">'
                                    } else if (weatherCondition == 'Patchy light rain' || weatherCondition == 'Light rain' || weatherCondition == 'Moderate or heavy rain shower' || weatherCondition== 'Moderate rain at times' || weatherCondition == 'Patchy light drizzle' || weatherCondition == 'Light freezing rain'){
                                        return '<img src="rain.png">'
                                    } else if(weatherCondition == 'Thundery outbreaks possible' || weatherCondition == 'Patchy light rain with thunder' || weatherCondition == 'Moderate or heavy rain with thunder') {
                                        return '<img src="thunder.png">'
                                    } else if(weatherCondition.includes("snow")){
                                        return '<img src="snowflake.png">'
                                    }else if(weatherCondition == "Light freezing rain"){
                                        return '<img src="rain.png">'
                                    }else if(weatherCondition == "Blizzard"){
                                        return '<img src="snowflake.png">'
                                    }else{
                                        console.log((weatherCondition))
                                        return 'CONDITION NOT DEFINED'
                                    }
                                }else {
                                    
                                    if(weatherCondition == 'Mist'){
                                        //console.log("Mist Night")
                                        return '<img src="fog.png">'
                                    } else if (weatherCondition == 'Clear'){
                                        //console.log("Clear Night")
                                        return '<img src="moon.png">'
                                    }else if((weatherCondition == 'Partly cloudy')) {
                                        //console.log("Partly Cloudy Night")
                                        return '<img src="cloud-moon.png">'
                                    } else if((weatherCondition == 'Cloudy') || (weatherCondition == 'Overcast')) {
                                        //console.log("Overcast or Cloudy Night")
                                        return '<img src="cloud-removebg-preview.png">'
                                    } else if ((weatherCondition == 'Heavy rain')){
                                        //console.log("Heavy Rain Night")
                                        return '<img src="moon rain.png">'
                                    } else if ((weatherCondition == 'Moderate rain')){
                                        //console.log("Moderate Rain Night")
                                        return '<img src="moon rain.png">'
                                    } else if ((weatherCondition == 'Fog' || weatherCondition == 'Freezing fog')){
                                        //console.log("Fog Night")
                                        return '<img src="fog.png">'
                                    } else if((weatherCondition == 'Patchy rain possible' || weatherCondition == 'Light drizzle' || weatherCondition == 'Light rain shower')){
                                        return '<img src="moon rain.png">'
                                    } else if (weatherCondition == 'Patchy light rain' || weatherCondition == 'Light rain' || weatherCondition == 'Moderate or heavy rain shower' || weatherCondition == 'Moderate rain at times' || weatherCondition == 'Patchy light drizzle' || weatherCondition == 'Light freezing rain'){
                                        return '<img src="moon rain.png">'
                                    } else if(weatherCondition == 'Thundery outbreaks possible' || weatherCondition == 'Patchy light rain with thunder' || weatherCondition == 'Moderate or heavy rain with thunder') {
                                        return '<img src="thunder night.png">'
                                    } else if(weatherCondition.includes("snow")){
                                        return '<img src="snowflake.png">'
                                    }else if(weatherCondition == "Light freezing rain"){
                                        return '<img src="rain.png">'
                                    }else if(weatherCondition == "Blizzard"){
                                        return '<img src="snowflake.png">'
                                    }else{
                                        console.log((weatherCondition))
                                        return 'CONDITION NOT DEFINED'
                                    }
                                    
                                }
                            }
                            
                            all[0].innerHTML = `${weatherIconValues(0)}`
                            all[1].innerHTML = `${weatherIconValues(2)}`
                            all[2].innerHTML = `${weatherIconValues(4)}`
                            all[3].innerHTML = `${weatherIconValues(6)}`
                            all[4].innerHTML = `${weatherIconValues(8)}`
                            all[5].innerHTML = `${weatherIconValues(10)}`
                            all[6].innerHTML = `${weatherIconValues(12)}`
                            all[7].innerHTML = `${weatherIconValues(14)}`
                            all[8].innerHTML = `${weatherIconValues(16)}`
                            all[9].innerHTML = `${weatherIconValues(18)}`
                            all[10].innerHTML = `${weatherIconValues(20)}`
                            all[11].innerHTML = `${weatherIconValues(22)}`
                    
                            //console.log((Math.round(Math.min(...feelsLikeData()) / 10) * 10) - 5)
                    
                            //BACKGROUND GRADIENTS
                            const colorsObject = () =>{
                                if((Math.round(Math.min(...tempData()) / 10) * 10) - 5 < 0){
                                    return {
                                        "-20": "rgba(0, 27, 70, 0.3)",
                                        "-15": "rgba(0, 40, 104, 0.3)",
                                        "-10": "rgba(0, 56, 145, 0.3)",
                                        "-5": "rgba(1, 69, 179, 0.3)",
                    
                                        "0": "rgba(0, 75, 197, 0.3)",
                                        "3": "rgba(0, 105, 197, 0.3)",
                                        "6": "rgba(0, 144, 197, 0.3)",
                                        "9": "rgba(0, 187, 197, 0.3)",
                                        "12": "rgba(0, 197, 167, 0.3)", 
                                        "15": "rgba(0, 197, 118, 0.3)",
                                        "18": "rgba(0, 197, 59, 0.3)",
                                        "21": "rgba(0, 197, 23, 0.3)",
                                        "24": "rgba(0, 197, 13, 0.3)",
                                        "27": "rgba(62, 197, 0, 0.3)",
                                        "30": "rgba(144, 197, 0, 0.3)",
                                        "33": "rgba(197, 177, 0, 0.3)",
                                        "36": "rgba(197, 151, 0, 0.3)",
                                        "40": "rgba(197, 105, 0, 0.3)",
                                        "43": "rgba(197, 69, 0, 0.3)",
                                        "46": "rgba(197, 0, 0, 0.3)",
                                    }
                                }else {
                                    return {
                                        "0": "rgba(0, 75, 197, 0.3)",
                                        "3": "rgba(0, 105, 197, 0.3)",
                                        "6": "rgba(0, 144, 197, 0.3)",
                                        "9": "rgba(0, 187, 197, 0.3)",
                                        "12": "rgba(0, 197, 167, 0.3)", 
                                        "15": "rgba(0, 197, 118, 0.3)",
                                        "18": "rgba(0, 197, 59, 0.3)",
                                        "21": "rgba(0, 197, 23, 0.3)",
                                        "24": "rgba(0, 197, 13, 0.3)",
                                        "27": "rgba(62, 197, 0, 0.3)",
                                        "30": "rgba(144, 197, 0, 0.3)",
                                        "33": "rgba(197, 177, 0, 0.3)",
                                        "36": "rgba(197, 151, 0, 0.3)",
                                        "40": "rgba(197, 105, 0, 0.3)",
                                        "43": "rgba(197, 69, 0, 0.3)",
                                        "46": "rgba(197, 0, 0, 0.3)",
                                    }
                                }
                            }
                            //console.log(colorsObject())
                    
                            const borderColorObject = () =>{
                                if((Math.round(Math.min(...tempData()) / 10) * 10) - 5 < 0){
                                    return {
                                        "-20": "rgba(51, 0, 204, 1)",
                                        "-15": "rgba(13, 0, 193, 1)",
                                        "-10": "rgba(0, 29, 215, 1)",
                                        "-5": "rgba(0, 47, 215, 1)",
                    
                                        "0": "rgba(0, 80, 193, 1)",
                                        "3": "rgba(0, 107, 193, 1)",
                                        "6": "rgba(0, 135, 193, 1)",
                                        "9": "rgba(0, 175, 193, 1)",
                                        "12": "rgba(0, 193, 166, 1)",
                                        "15": "rgba(0, 193, 130, 1)",
                                        "18": "rgba(0, 193, 98, 1)",
                                        "21": "rgba(0, 193, 54, 1)",
                                        "24": "rgba(79, 193, 0, 1)",
                                        "27": "rgba(127, 193, 0, 1)",
                                        "30": "rgba(147, 193, 0, 1)",
                                        "33": "rgba(193, 178, 0, 1)",
                                        "36": "rgba(193, 130, 0, 1)",
                                        "40": "rgba(193, 82, 0, 1)",
                                        "43": "rgba(193, 50, 0, 1)",
                                        "46": "rgba(218, 0, 0, 1)",
                                    }
                    
                                }else {
                                    return {
                                        "0": "rgba(0, 80, 193, 1)",
                                        "3": "rgba(0, 107, 193, 1)",
                                        "6": "rgba(0, 135, 193, 1)",
                                        "9": "rgba(0, 175, 193, 1)",
                                        "12": "rgba(0, 193, 166, 1)",
                                        "15": "rgba(0, 193, 130, 1)",
                                        "18": "rgba(0, 193, 98, 1)",
                                        "21": "rgba(0, 193, 54, 1)",
                                        "24": "rgba(79, 193, 0, 1)",
                                        "27": "rgba(127, 193, 0, 1)",
                                        "30": "rgba(147, 193, 0, 1)",
                                        "33": "rgba(193, 178, 0, 1)",
                                        "36": "rgba(193, 130, 0, 1)",
                                        "40": "rgba(193, 82, 0, 1)",
                                        "43": "rgba(193, 50, 0, 1)",
                                        "46": "rgba(218, 0, 0, 1)",
                                    }
                                }
                            }
                            //console.log(borderColorObject())
                    
                            //data block
                            const chartData = {
                                labels: hoursArray,
                                datasets: [{
                                    label: "",
                                    data: tempData(),
                                    segment: {
                                        //borderDash: ctx => dash(ctx),
                                    },
                                    gradient: {
                                        backgroundColor: {
                                          axis: 'y',
                                          colors: colorsObject()
                                        },
                    
                                        borderColor: {
                                            axis: 'y',
                                            colors: borderColorObject()
                                        }
                                    },
                                    borderWidth: 6.5,
                                    borderColor: "red", //fix with gradient function later
                                    pointBackgroundColor: "transparent",
                                    pointBorderColor: "transparent",
                                    borderCapStyle: 'round',
                                    clip: {
                                        left: 0,
                                        right: 0,
                                        top: false,
                                        bottom: false
                                    },
                                    tension: 0.2,
                                    fill: "stack",
                                    backgroundColor: "transparent" //fix with gradient func later
                                }]
                            }
                        
                            const plugin = {
                                id: 'customCanvasBackgroundColor',
                                beforeDraw: (chart, args, options) => {
                                const {ctx} = chart;
                                ctx.save();
                                ctx.globalCompositeOperation = 'destination-over';
                                ctx.fillStyle = options.color
                                ctx.fillRect(0, 0, chart.width, chart.height);
                                ctx.restore();
                                
                                }
                            };
                        
                            //console.log(Math.max(...feelsLikeData()) + 5)
                            const minMaxFunc = () =>{
                                if((Math.floor(Math.min(...tempData()) / 10) * 10) - 5 <= 0){
                                    return (Math.floor(Math.min(...tempData()) / 10) * 10) - 5
                    
                                }else if((Math.floor(Math.min(...tempData()) / 10) * 10) - 5 <= 11){
                                    return 0
                                } else {
                                    return (Math.floor(Math.min(...tempData()) / 10) * 10) - 5
                                }
                            }
                            //console.log(minMaxFunc())
                            
                            
                            //console.log(Math.min(...feelsLikeData()))
                            //console.log(Math.max(...feelsLikeData()) + 5)
                    
                            let minValue = (Math.floor(Math.min(...tempData()) / 10) * 10) - 5
                            let maxValue = (Math.ceil(Math.max(...tempData()) / 10) * 10) + 5
                    
                    
                            if(maxValue < 10){
                                container.style.width = `423px`
                            }else {
                                container.style.width = `427px`
                            }
                    
                            const amplitude = () =>{
                                //console.log(maxValue)
                                //console.log(minValue)
                    
                                if(maxValue - minValue == 5){
                                    return 3
                                }else if(maxValue - minValue == 10){
                                    return 4
                                }else if(maxValue - minValue == 15){
                                    return 5
                                }else if(maxValue - minValue == 20){
                                    
                                    return 7
                                }else if(maxValue - minValue == 25){
                                    
                                    return 7
                                }else if(maxValue - minValue == 30){
                                    
                                    return 100
                                }else if(maxValue - minValue == 35){
                                    
                                    return 15
                                }else if(maxValue - minValue == 40){
                                    
                                    return 10
                                }
                            }
                            //console.log(amplitude())
                    
                            //console.log(30)
                    
                            //console.log(minMaxFunc())
                            //console.log((Math.floor(Math.min(...feelsLikeData()) / 10) * 10) - 5)
                    
                            //config block
                            const config = {
                                type: "line",
                                data: chartData,  
                                options: {
                                    aspectRatio: 7/4,
                                    responsive: true,
                                    scales: {
                                        y: {
                                            min: minMaxFunc(),
                                            //beginAtZero: minMaxFunc(),
                                            max: maxValue,
                                            
                    
                                            grid: {
                                                drawTicks: false,
                                                display: true,
                                                drawOnChartArea: true,
                                                color: "#302F32"
                                            },
                                            border: {
                                                display: true,
                                                color: "#302F32"
                                            },
                                            ticks: {
                                                color: "#9D9D9E",
                                                padding: 15,
                                                align: "center",
                                                crossAlign: "center", 
                                                font: {
                                                    size: 13,
                                                    weight: 400
                                                },
                                                maxTicksLimit: amplitude(),
                                                callback: function(value, index, values){
                                                    return `${value}°`
                                                }
                                            },
                                            position: "right"
                                        },
                        
                                        x: {
                                            border: {
                                                display: false,
                                                dash: [3, 2]
                                            },
                                            grid: {
                                                display: true,
                                                drawOnChartArea: true,
                                                drawTicks: false,
                                                color: "#302F32"
                                            },
                        
                                            ticks: {
                                                color: "#9D9D9E",
                                                maxTicksLimit: 4,
                                                padding: 5,
                                                align: "start",
                                                crossAlign: "near",
                                                font: {
                                                    size: 15,
                                                    weight: 400
                                                },
                                                
                                            }
                                        },
                        
                                        
                                    },
                                    plugins: {
                                        customCanvasBackgroundColor: {
                                            color: "#202023"
                                        },
                                        legend: {
                                            display: false
                                        },
                                        autocolors: false,
                                        annotation: {
                                            
                                            annotations: {
                                                
                                                
                                                point1: {
                                                    yValue: Math.min(...tempData()),
                                                    xValue: tempData().indexOf(Math.min(...tempData())),
                    
                                                    type: "point",
                                                    backgroundColor: "transparent",
                                                    borderWidth: 4,
                                                    borderColor: "black",
                                                    radius: 5.5,
                                                },
                                                point3: {
                                                    yValue: Math.max(...tempData()),
                                                    xValue: tempData().indexOf(Math.max(...tempData())),
                    
                                                    type: "point",
                                                    backgroundColor: "transparent",
                                                    borderWidth: 4,
                                                    borderColor: "black",
                                                    radius: 5.5,
                                                    //callback: yValue => 
                                                },
                                                label1: {
                                                    type: "label",
                                                    yValue: Math.max(...tempData()) + 2.5,
                                                    xValue: tempData().indexOf(Math.max(...tempData())),
                                                    backgroundColor: "transparent",
                                                    color: "#9D9D9E",
                                                    content: "H",
                                                    font: {
                                                        size: 15
                                                    }
                                                },
                                                label2: {
                                                    type: "label",
                                                    yValue: Math.min(...tempData()) + 2.5,
                                                    xValue: tempData().indexOf(Math.min(...tempData())),
                                                    backgroundColor: "transparent",
                                                    color: "#9D9D9E",
                                                    content: "L",
                                                    font: {
                                                        size: 15
                                                    }
                                                }
                                            },
                                            clip: false
                                        } 
                                    },   
                                },
                                plugins: [plugin, gradient]
                            }
                            //console.log(Math.max(...feelsLikeData()))
                        
                            
                            const feelsLikeChart = new Chart(ctx, config)
                        }
                        conditionsChartFunction()

                        const SECOND_CANVAS = document.querySelector(".canvas-holder-second")
                        SECOND_CANVAS.innerHTML = `
                        
                        <canvas id="canvasSecond"></canvas>
                        
                        `
                        const rainFORCONDITIONSChartFunction = () =>{ 
                            const hoursArray = []
                    
                            for(let i = 0; i < 24; i++){
                                hoursArray.push(i)
                            }
                    
                            //the index at which the change will occur
                            let labelToChange = new Date(weatherData.current.last_updated).getHours()
                            //let labelToChange = 22
                    
                            //when will the line be dashed and stright
                            const dash = (ctx) => {
                                //console.log(ctx.p0DataIndex)
                                if(ctx.p0DataIndex < labelToChange){
                                    return [8, 10]
                                }
                            }
                    
                            const hideBorderFunc = (ctx) =>{
                                if(ctx.p0DataIndex < labelToChange){
                                    return "transparent"
                                }else {
                                    return "#36C8EB"
                                }
                            }
                    
                           
                    
                            let ctx = document.querySelector("#canvasSecond").getContext("2d")
                            
                            const precipData = () =>{
                                const rainArray = []
                                const snowArray = []
                    
                                for(let d = 0; d < weatherData.forecast.forecastday[i].hour.length; d++){
                                    rainArray.push(Math.round(weatherData.forecast.forecastday[i].hour[d].chance_of_rain / 10) * 10)
                                    snowArray.push(Math.round(weatherData.forecast.forecastday[i].hour[d].chance_of_snow / 10) * 10)
                                }
                    
                                if(Math.max(...snowArray) > Math.max(...rainArray)){
                                    return snowArray
                                }else {
                                    return rainArray
                                }
                            }
                            //console.log(weatherData.forecast.forecastday[9].hour[7])
                    
                            const gradient = window['chartjs-plugin-gradient'];
                            
                    
                            const chartElement = document.querySelector(".canvas-holder-second")
                            const rainBlankOverlay = document.createElement("div")
                            rainBlankOverlay.classList.add("rain-blank-overlay") 
                            chartElement.appendChild(rainBlankOverlay)
                    
                            const fillerColor = (ctx) => {
                                if(ctx.p0DataIndex < labelToChange){
                                    return "transparent"
                                }else {
                                    return "rgba(0, 163, 238, 0.3)"
                                }
                            }
                    
                            //data block
                            const chartData = {
                                labels: hoursArray,
                                datasets: [{
                                    label: "",
                                    data: precipData(),
                                    segment: {
                                        //borderDash: ctx => dash(ctx),
                                        //borderWidth: ctx => hideBorderFunc(ctx),
                                        //borderColor: ctx => hideBorderFunc(ctx),
                                        //backgroundColor: ctx => fillerColor(ctx)
                                    },
                                    gradient: {
                                        backgroundColor: {
                                          axis: 'y',
                                          colors: {
                                
                                            
                                          }
                                        },
                                        borderColor: {
                                            axis: "y",
                                            colors: {
                                                
                                            }
                                        }
                                    },
                                    
                                    borderColor: "#36C8EB",
                                    pointBackgroundColor: "transparent",
                                    pointBorderColor: "transparent",
                                    //borderCapStyle: 'round',
                                    clip: {
                                        left: false,
                                        right: false,
                                        top: false,
                                        bottom: false
                                    },
                                    tension: 0.1,
                                    fill: true,
                                    backgroundColor: "rgba(0, 163, 238, 0.3)"
                                    
                                }]
                            }
                    
                            
                        
                            const plugin = {
                                id: 'customCanvasBackgroundColor',
                                beforeDraw: (chart, args, options) => {
                                const {ctx} = chart;
                                ctx.save();
                                ctx.globalCompositeOperation = 'destination-over';
                                ctx.fillStyle = options.color
                                ctx.fillRect(0, 0, chart.width, chart.height);
                                ctx.restore();
                                
                                }
                            };
                        
                            
                        
                            //config block
                            const config = {
                                type: "line",
                                data: chartData,  
                                options: {
                                    aspectRatio: 7/4,
                                    responsive: true,
                                    scales: {
                                        y: {
                                        
                                            beginAtZero: true,
                                            suggestedMax: 100,
                                            grid: {
                                                drawTicks: false,
                                                display: true,
                                                drawOnChartArea: true,
                                                color: "#302F32"
                                            },
                                            border: {
                                                display: true,
                                                color: "#302F32"
                                            },
                                            ticks: {
                                                color: "#9D9D9E",
                                                //maxTicksLimit: 6,
                                                padding: 15,
                                                align: "center",
                                                crossAlign: "center", 
                                                font: {
                                                    size: 13,
                                                    weight: 400
                                                },
                                                callback: function(value){
                                                    return `${value}%`
                                                }
                                            },
                                            position: "right"
                                        },
                        
                                        x: {
                                            border: {
                                                display: false,
                                                dash: [3, 2]
                                            },
                                            grid: {
                                                display: true,
                                                drawOnChartArea: true,
                                                drawTicks: false,
                                                color: "#302F32"
                                            },
                        
                                            ticks: {
                                                color: "#9D9D9E",
                                                maxTicksLimit: 4,
                                                padding: 5,
                                                align: "start",
                                                crossAlign: "near",
                                                font: {
                                                    size: 15,
                                                    weight: 400
                                                }
                                            }
                                        },
                        
                                        
                                        
                                    },
                                    plugins: {
                                        customCanvasBackgroundColor: {
                                            color: "#202023"
                                        },
                                        legend: {
                                            display: false
                                        },
                                        annotation: {
                                            
                                            annotations: {
                                                
                                                point2: {
                                                    type: "point",
                                                    xValue: precipData().indexOf(Math.max(...precipData())),
                                                    yValue: Math.max(...precipData()),
                                                    backgroundColor: "#36C8EB",
                                                    borderWidth: 1,
                                                    borderColor: "black",
                                                    radius: 5.5,
                                                    
                                                },
                                                label1: {
                                                    type: "label",
                                                    xValue: function(){
                                                        if(precipData().indexOf(Math.max(...precipData())) == 22 || precipData().indexOf(Math.max(...precipData())) == 23){
                                                            return precipData().indexOf(Math.max(...precipData())) - 1
                                                        }else {
                                                            return precipData().indexOf(Math.max(...precipData())) + 0.8
                                                        }
                                                    },
                    
                                                    yValue: Math.max(...precipData()) + 7,                            
                                                    
                                                    color: "#36C8EB",
                                                    content: `${Math.max(...precipData())}%`,
                                                    font: {
                                                        size: 15
                                                    }
                                                }
                                                
                                            },
                                            
                                            clip: false,
                                            
                                        }
                                    },
                                    
                                },
                                plugins: [plugin, gradient]
                            }
                        
                            const rainFallSnowChart = new Chart(ctx, config)
                    
                        }
                        rainFORCONDITIONSChartFunction()
                        
                        continue
                    }
                    //console.log(daysShort, weatherData.forecast.forecastday[i].day.uv)
                    const day = document.createElement("div")
                    day.classList.add("forecast-each-day")
                    day.innerHTML = `
                    <span>${daysShort}</span>
                    <span class="numbers">${numbersDays}</span>
                    `
                    wrapper.appendChild(day)
                    
                    
                }   
                
            }
            const eventFunctionFORECASTOtherDays = () =>{
                const elements = document.querySelectorAll(".numbers")
                const fullDate = document.querySelector(".datepicked")
                const index = document.querySelector(".index .special span")
                const lowTempForecast = document.querySelector(".forecast-low-temp")
                const highLowpPrecip = document.querySelector(".highLow-precip")
                const textForCONDITIONS = document.querySelector(".textForCONDITIONS")
                const weatherIcon = document.querySelector(".special img")
        
        
                for(let i = 1; i < elements.length; i++){
        
                    const WEATHER_PER_HOUR = () =>{
        
                        let forecastWeather = weatherData.forecast.forecastday[i].day.condition.text
                            
                        if(forecastWeather == 'Mist'){
                            //console.log("Mist Day")
                            return 'fog.png'
                        } else if (forecastWeather == 'Sunny'){
                            //console.log("Sunny Day")
                            return 'sunny.png'
                        }else if((forecastWeather == 'Partly cloudy')) {
                            //console.log("Partly Cloudy Day")
                            return 'cloud-sun-off.png'
                        } else if((forecastWeather == 'Cloudy') || (forecastWeather == 'Overcast')) {
                            //console.log("Overcast or cloudy Day")
                            return 'cloud-removebg-preview.png'
                        } else if ((forecastWeather == 'Heavy rain')){
                            //console.log("Heavy Rain Day")
                            return 'rain.png'
                        } else if ((forecastWeather == 'Moderate rain')){
                            //console.log("Moderate Rain Day")
                            return 'rain.png'
                        } else if ((forecastWeather == 'Fog')){
                            //console.log("Fog Day")
                            return 'fog.png'
                        } else if((forecastWeather == 'Patchy rain possible' || forecastWeather == 'Light drizzle' || forecastWeather == 'Light rain shower')){
                            return 'rain.png'
                        }else if(forecastWeather.includes("snow")){
                            return 'snowflake.png'
                        }else if(forecastWeather = "Light freezing rain"){
                            return 'rain.png'
                        }else if(forecastWeather = "Blizzard"){
                            return 'snowflake.png'
                        }else{
                            console.log((forecastWeather))
                            return 'CONDITION NOT DEFINED'
                        }
                        
                    }
        
                    const highestLowestTemp = () =>{
                        const time = []
                        const temps = []
        
                        for(let j = 0; j < weatherData.forecast.forecastday[i].hour.length; j++){
                            time.push(weatherData.forecast.forecastday[i].hour[j].time)
                            temps.push(Math.round(weatherData.forecast.forecastday[i].hour[j].temp_c))
                        }
        
                        const highestTemp = Math.max(...temps)
                        const lowestTemp = Math.min(...temps)
        
                        const timesSeenHighest = [] //the amount of times the certain has appeared
                        const timesSeenLowest = []
                        for(let j = 0; j < temps.length; j++){
                            if(temps[j] == highestTemp){
                                timesSeenHighest.push(j)
                            }
        
                            if(temps[j] == lowestTemp){
                                timesSeenLowest.push(j)
                            }
                        }
        
                        const correspondingValuesHIGHEST = timesSeenHighest.map(idx => time[idx])
                        const correspondingValuesLOWEST = timesSeenLowest.map(idx => time[idx])
        
                        return [correspondingValuesHIGHEST, correspondingValuesLOWEST]
                    }
                    
        
                    //console.log(highestLowestTemp()[0], highestLowestTemp()[1])
                    const whichHour = () =>{
                        let timeForHighest = highestLowestTemp()[0]
                        let timeForLowest = highestLowestTemp()[1]
        
                        if(timeForHighest.length > 1 && timeForLowest.length > 1){
                            //return [[timeForHighest[0], timeForHighest[timeForHighest.length - 1]], [timeForLowest[0], timeForLowest[timeForLowest.length - 1]]]
                            return `low will be ${Math.round(weatherData.forecast.forecastday[i].day.mintemp_c)}° between ${timeForLowest[0].slice("11")} and ${timeForLowest[timeForLowest.length - 1].slice("11")}, and the high will be ${Math.round(weatherData.forecast.forecastday[i].day.maxtemp_c)}° between ${timeForHighest[0].slice("11")} and ${timeForHighest[timeForHighest.length - 1].slice("11")}.`
        
                        }else if(timeForHighest.length > 1 && timeForLowest.length == 1){
                            //return [[timeForHighest[0], timeForHighest[timeForHighest.length - 1]], [timeForLowest[0]]]
                            return `low will be ${Math.round(weatherData.forecast.forecastday[i].day.mintemp_c)}° at ${timeForLowest[0].slice("11")} , and the high will be ${Math.round(weatherData.forecast.forecastday[i].day.maxtemp_c)}° between ${timeForHighest[0].slice("11")} and ${timeForHighest[timeForHighest.length - 1].slice("11")}.`
        
                        }else if(timeForHighest.length == 1 && timeForLowest.length == 1){
                            //return [[timeForHighest[0]], [timeForLowest[0]]]
                            return `low will be ${Math.round(weatherData.forecast.forecastday[i].day.mintemp_c)}° at ${timeForLowest[0].slice("11")}, and the high will be ${Math.round(weatherData.forecast.forecastday[i].day.maxtemp_c)}° at ${timeForHighest[0].slice("11")}.`
        
                        }else if(timeForHighest.length == 1 && timeForLowest.length > 1){
                            //return [[timeForHighest[0]], [timeForLowest[0], timeForLowest[timeForLowest.length - 1]]]
                            return `low will be ${Math.round(weatherData.forecast.forecastday[i].day.mintemp_c)}° between ${timeForLowest[0].slice("11")} and ${timeForLowest[timeForLowest.length - 1].slice("11")}, and the high will be ${Math.round(weatherData.forecast.forecastday[i].day.maxtemp_c)}° at ${timeForHighest[0].slice("11")}.`
                        }else{
                            return [timeForHighest.length, timeForLowest.length]
                        }
        
                    }
        
                    
                    elements[0].addEventListener("click", ()=>{
                        mainFunctionForecast()
                        
                    })
        
                    let days = new Date(weatherData.forecast.forecastday[i].date)
                        let fullDay = days.toLocaleDateString("default", {weekday: "long", day: "2-digit", month: "long", "year": "numeric"})
                        elements[i].addEventListener("click", ()=>{
                        elements.forEach(element =>{
                            element.classList.remove("active")
                        })
        
                        
                        let weekday = days.toLocaleDateString("default", {weekday: "long"})
        
                        //console.log(whichHour()[0][0], whichHour()[0][1], "Highest temps")
                        
                        const highestTempsTEXT = () =>{
                            if(whichHour()[0][1]){
                                return `between ${whichHour()[0][0].slice("11")} and ${whichHour()[0][1].slice("11")}`
                            }else{
                                return `at ${whichHour()[0][0].slice("11")}`
                            }
                        }
        
                        const lowestTempsTEXT = () =>{
                            if(whichHour()[1][1]){
                                return `between ${whichHour()[1][0].slice("11")} and ${whichHour()[1][1].slice("11")}`
                            }else{
                                return `at ${whichHour()[1][0].slice("11")}`
                            }
                        }
                        
        
                        const rainSnowPercent = () =>{
                            const daysHighestRain = []
                            const daysHighestSnow = []
        
                            for(let j = 0; j < weatherData.forecast.forecastday[i].hour.length; j++){
                                daysHighestRain.push(weatherData.forecast.forecastday[i].hour[j].chance_of_rain)
                                daysHighestSnow.push(weatherData.forecast.forecastday[i].hour[j].chance_of_snow)
                            }
        
                            if(Math.max(...daysHighestRain) < Math.max(...daysHighestSnow)){
                                return `Chance of snow: ${Math.round(Math.max(...daysHighestSnow) / 10) * 10}%`
                            }else if(Math.max(...daysHighestRain) >= Math.max(...daysHighestSnow) && Math.max(...daysHighestRain)){
                                return `Chance of rain: ${Math.round(Math.max(...daysHighestRain) / 10) * 10}%`
                            }else {
                                return `Chance of rain: 0%`
                            }
                        }
        
                        weatherIcon.src = `${WEATHER_PER_HOUR()}`
                        textForCONDITIONS.textContent = `${weekday}'s ${whichHour()}`
                        highLowpPrecip.style.color = '#36C8EB'

                        highLowpPrecip.textContent = `${rainSnowPercent()}`
                        lowTempForecast.textContent = `${Math.round(weatherData.forecast.forecastday[i].day.mintemp_c)}°`
                        index.textContent = `${Math.round(weatherData.forecast.forecastday[i].day.maxtemp_c)}°`
                        fullDate.textContent = fullDay
                        elements[i].classList.add("active")
                        
                        const CANVAS_HOLDER = document.querySelector(".canvas-holder")
                        CANVAS_HOLDER.innerHTML = `
                        <div class="container-for-values">
                            <div class="value-hrs"></div>
                            <div class="value-hrs"></div>
                            <div class="value-hrs"></div>
                            <div class="value-hrs"></div>
                            <div class="value-hrs"></div>
                            <div class="value-hrs"></div>
                            <div class="value-hrs"></div>
                            <div class="value-hrs"></div>
                            <div class="value-hrs"></div>
                            <div class="value-hrs"></div>
                            <div class="value-hrs"></div>
                            <div class="value-hrs"></div>
                        </div>
                        <canvas id="canvas"></canvas>
                        `
                        
                        CANVAS_HOLDER.style.marginBottom = `15px`
                        const conditionsChartFunction = () =>{
                            const hoursArray = []
                    
                            for(let i = 0; i < 24; i++){
                                hoursArray.push(i)
                            }
                    
                            //the index at which the change will occur
                            let labelToChange = new Date(weatherData.current.last_updated).getHours()
                    
                    
                            //when will the line be dashed and stright
                            const dash = (ctx) => {
                                //console.log(ctx.p0DataIndex)
                                if(ctx.p0DataIndex < labelToChange){
                                    return [8, 10]
                                }
                            }

                            const canvasElement = document.querySelector(".canvas-holder")
                            const invisibleOverlay = document.createElement("div")
                            invisibleOverlay.classList.add("blank-overlay")
                            canvasElement.appendChild(invisibleOverlay)
                    
                            let ctx = document.querySelector("#canvas").getContext("2d")
                    
                            
                            const tempData = () =>{
                                const tempArray = []
                                for(let d = 0; d < weatherData.forecast.forecastday[i].hour.length; d++){
                                    tempArray.push(Math.round(weatherData.forecast.forecastday[i].hour[d].temp_c))
                    
                                }
                    
                                return tempArray
                            }
                    
                            
                            
                            
                            const gradient = window['chartjs-plugin-gradient'];
                            
                            const container = document.querySelector(".container-for-values")
                            container.style.gap = `19px`
                            const all = document.querySelectorAll(".value-hrs")
                        
                            const weatherIconValues = (arg) =>{
                                const weatherCondition = weatherData.forecast.forecastday[i].hour[arg].condition.text
                                
                        
                                if(weatherData.forecast.forecastday[i].hour[arg].is_day){
                                    if(weatherCondition == 'Mist'){
                                        //console.log("Mist Day")
                                        return '<img src="fog.png">'
                                    } else if (weatherCondition == 'Sunny'){
                                        //console.log("Sunny Day")
                                        return '<img src="sunny.png">'
                                    }else if((weatherCondition == 'Partly cloudy')) {
                                        //console.log("Partly Cloudy Day")
                                        return '<img src="cloud-sun-off.png">'
                                    } else if((weatherCondition == 'Cloudy') || (weatherCondition == 'Overcast')) {
                                        //console.log("Overcast or cloudy Day")
                                        return '<img src="cloud-removebg-preview.png">'
                                    } else if ((weatherCondition == 'Heavy rain')){
                                        //console.log("Heavy Rain Day")
                                        return '<img src="rain.png">'
                                    } else if ((weatherCondition == 'Moderate rain')){
                                        //console.log("Moderate Rain Day")
                                        return '<img src="rain.png">'
                                    } else if ((weatherCondition == 'Fog' || weatherCondition.includes("fog"))){
                                        //console.log("Fog Day")
                                        return '<img src="fog.png">'
                                    } else if((weatherCondition == 'Patchy rain possible' || weatherCondition == 'Light drizzle' || weatherCondition == 'Light rain shower')){
                                        return '<img src="rain.png">'
                                    } else if (weatherCondition == 'Patchy light rain' || weatherCondition == 'Light rain' || weatherCondition == 'Moderate or heavy rain shower' || weatherCondition== 'Moderate rain at times' || weatherCondition == 'Patchy light drizzle' || weatherCondition == 'Light freezing rain'){
                                        return '<img src="rain.png">'
                                    } else if(weatherCondition == 'Thundery outbreaks possible' || weatherCondition == 'Patchy light rain with thunder' || weatherCondition == 'Moderate or heavy rain with thunder') {
                                        return '<img src="thunder.png">'
                                    } else if(weatherCondition.includes("snow")){
                                        return '<img src="snowflake.png">'
                                    }else if(weatherCondition == "Light freezing rain"){
                                        return '<img src="rain.png">'
                                    }else if(weatherCondition == "Blizzard"){
                                        return '<img src="snowflake.png">'
                                    }else{
                                        console.log((weatherCondition))
                                        return 'CONDITION NOT DEFINED'
                                    }
                                }else {
                                    
                                    if(weatherCondition == 'Mist'){
                                        //console.log("Mist Night")
                                        return '<img src="fog.png">'
                                    } else if (weatherCondition == 'Clear'){
                                        //console.log("Clear Night")
                                        return '<img src="moon.png">'
                                    }else if((weatherCondition == 'Partly cloudy')) {
                                        //console.log("Partly Cloudy Night")
                                        return '<img src="cloud-moon.png">'
                                    } else if((weatherCondition == 'Cloudy') || (weatherCondition == 'Overcast')) {
                                        //console.log("Overcast or Cloudy Night")
                                        return '<img src="cloud-removebg-preview.png">'
                                    } else if ((weatherCondition == 'Heavy rain')){
                                        //console.log("Heavy Rain Night")
                                        return '<img src="moon rain.png">'
                                    } else if ((weatherCondition == 'Moderate rain')){
                                        //console.log("Moderate Rain Night")
                                        return '<img src="moon rain.png">'
                                    } else if ((weatherCondition == 'Fog' || weatherCondition == 'Freezing fog')){
                                        //console.log("Fog Night")
                                        return '<img src="fog.png">'
                                    } else if((weatherCondition == 'Patchy rain possible' || weatherCondition == 'Light drizzle' || weatherCondition == 'Light rain shower')){
                                        return '<img src="moon rain.png">'
                                    } else if (weatherCondition == 'Patchy light rain' || weatherCondition == 'Light rain' || weatherCondition == 'Moderate or heavy rain shower' || weatherCondition == 'Moderate rain at times' || weatherCondition == 'Patchy light drizzle' || weatherCondition == 'Light freezing rain'){
                                        return '<img src="moon rain.png">'
                                    } else if(weatherCondition == 'Thundery outbreaks possible' || weatherCondition == 'Patchy light rain with thunder' || weatherCondition == 'Moderate or heavy rain with thunder') {
                                        return '<img src="thunder night.png">'
                                    } else if(weatherCondition.includes("snow")){
                                        return '<img src="snowflake.png">'
                                    }else if(weatherCondition == "Light freezing rain"){
                                        return '<img src="rain.png">'
                                    }else if(weatherCondition == "Blizzard"){
                                        return '<img src="snowflake.png">'
                                    }else{
                                        console.log((weatherCondition))
                                        return 'CONDITION NOT DEFINED'
                                    }
                                    
                                }
                            }
                            
                            all[0].innerHTML = `${weatherIconValues(0)}`
                            all[1].innerHTML = `${weatherIconValues(2)}`
                            all[2].innerHTML = `${weatherIconValues(4)}`
                            all[3].innerHTML = `${weatherIconValues(6)}`
                            all[4].innerHTML = `${weatherIconValues(8)}`
                            all[5].innerHTML = `${weatherIconValues(10)}`
                            all[6].innerHTML = `${weatherIconValues(12)}`
                            all[7].innerHTML = `${weatherIconValues(14)}`
                            all[8].innerHTML = `${weatherIconValues(16)}`
                            all[9].innerHTML = `${weatherIconValues(18)}`
                            all[10].innerHTML = `${weatherIconValues(20)}`
                            all[11].innerHTML = `${weatherIconValues(22)}`
                            
                    
                            //console.log((Math.round(Math.min(...feelsLikeData()) / 10) * 10) - 5)
                    
                            //BACKGROUND GRADIENTS
                            const colorsObject = () =>{
                                if((Math.round(Math.min(...tempData()) / 10) * 10) - 5 < 0){
                                    return {
                                        "-20": "rgba(0, 27, 70, 0.3)",
                                        "-15": "rgba(0, 40, 104, 0.3)",
                                        "-10": "rgba(0, 56, 145, 0.3)",
                                        "-5": "rgba(1, 69, 179, 0.3)",
                    
                                        "0": "rgba(0, 75, 197, 0.3)",
                                        "3": "rgba(0, 105, 197, 0.3)",
                                        "6": "rgba(0, 144, 197, 0.3)",
                                        "9": "rgba(0, 187, 197, 0.3)",
                                        "12": "rgba(0, 197, 167, 0.3)", 
                                        "15": "rgba(0, 197, 118, 0.3)",
                                        "18": "rgba(0, 197, 59, 0.3)",
                                        "21": "rgba(0, 197, 23, 0.3)",
                                        "24": "rgba(0, 197, 13, 0.3)",
                                        "27": "rgba(62, 197, 0, 0.3)",
                                        "30": "rgba(144, 197, 0, 0.3)",
                                        "33": "rgba(197, 177, 0, 0.3)",
                                        "36": "rgba(197, 151, 0, 0.3)",
                                        "40": "rgba(197, 105, 0, 0.3)",
                                        "43": "rgba(197, 69, 0, 0.3)",
                                        "46": "rgba(197, 0, 0, 0.3)",
                                    }
                                }else {
                                    return {
                                        "0": "rgba(0, 75, 197, 0.3)",
                                        "3": "rgba(0, 105, 197, 0.3)",
                                        "6": "rgba(0, 144, 197, 0.3)",
                                        "9": "rgba(0, 187, 197, 0.3)",
                                        "12": "rgba(0, 197, 167, 0.3)", 
                                        "15": "rgba(0, 197, 118, 0.3)",
                                        "18": "rgba(0, 197, 59, 0.3)",
                                        "21": "rgba(0, 197, 23, 0.3)",
                                        "24": "rgba(0, 197, 13, 0.3)",
                                        "27": "rgba(62, 197, 0, 0.3)",
                                        "30": "rgba(144, 197, 0, 0.3)",
                                        "33": "rgba(197, 177, 0, 0.3)",
                                        "36": "rgba(197, 151, 0, 0.3)",
                                        "40": "rgba(197, 105, 0, 0.3)",
                                        "43": "rgba(197, 69, 0, 0.3)",
                                        "46": "rgba(197, 0, 0, 0.3)",
                                    }
                                }
                            }
                            //console.log(colorsObject())
                    
                            const borderColorObject = () =>{
                                if((Math.round(Math.min(...tempData()) / 10) * 10) - 5 < 0){
                                    return {
                                        "-20": "rgba(51, 0, 204, 1)",
                                        "-15": "rgba(13, 0, 193, 1)",
                                        "-10": "rgba(0, 29, 215, 1)",
                                        "-5": "rgba(0, 47, 215, 1)",
                    
                                        "0": "rgba(0, 80, 193, 1)",
                                        "3": "rgba(0, 107, 193, 1)",
                                        "6": "rgba(0, 135, 193, 1)",
                                        "9": "rgba(0, 175, 193, 1)",
                                        "12": "rgba(0, 193, 166, 1)",
                                        "15": "rgba(0, 193, 130, 1)",
                                        "18": "rgba(0, 193, 98, 1)",
                                        "21": "rgba(0, 193, 54, 1)",
                                        "24": "rgba(79, 193, 0, 1)",
                                        "27": "rgba(127, 193, 0, 1)",
                                        "30": "rgba(147, 193, 0, 1)",
                                        "33": "rgba(193, 178, 0, 1)",
                                        "36": "rgba(193, 130, 0, 1)",
                                        "40": "rgba(193, 82, 0, 1)",
                                        "43": "rgba(193, 50, 0, 1)",
                                        "46": "rgba(218, 0, 0, 1)",
                                    }
                    
                                }else {
                                    return {
                                        "0": "rgba(0, 80, 193, 1)",
                                        "3": "rgba(0, 107, 193, 1)",
                                        "6": "rgba(0, 135, 193, 1)",
                                        "9": "rgba(0, 175, 193, 1)",
                                        "12": "rgba(0, 193, 166, 1)",
                                        "15": "rgba(0, 193, 130, 1)",
                                        "18": "rgba(0, 193, 98, 1)",
                                        "21": "rgba(0, 193, 54, 1)",
                                        "24": "rgba(79, 193, 0, 1)",
                                        "27": "rgba(127, 193, 0, 1)",
                                        "30": "rgba(147, 193, 0, 1)",
                                        "33": "rgba(193, 178, 0, 1)",
                                        "36": "rgba(193, 130, 0, 1)",
                                        "40": "rgba(193, 82, 0, 1)",
                                        "43": "rgba(193, 50, 0, 1)",
                                        "46": "rgba(218, 0, 0, 1)",
                                    }
                                }
                            }
                            //console.log(borderColorObject())
                    
                            //data block
                            const chartData = {
                                labels: hoursArray,
                                datasets: [{
                                    label: "",
                                    data: tempData(),
                                    segment: {
                                        //borderDash: ctx => dash(ctx),
                                    },
                                    gradient: {
                                        backgroundColor: {
                                          axis: 'y',
                                          colors: colorsObject()
                                        },
                    
                                        borderColor: {
                                            axis: 'y',
                                            colors: borderColorObject()
                                        }
                                    },
                                    borderWidth: 6.5,
                                    borderColor: "red", //fix with gradient function later
                                    pointBackgroundColor: "transparent",
                                    pointBorderColor: "transparent",
                                    borderCapStyle: 'round',
                                    clip: {
                                        left: 0,
                                        right: 0,
                                        top: false,
                                        bottom: false
                                    },
                                    tension: 0.2,
                                    fill: "stack",
                                    backgroundColor: "transparent" //fix with gradient func later
                                }]
                            }
                        
                            const plugin = {
                                id: 'customCanvasBackgroundColor',
                                beforeDraw: (chart, args, options) => {
                                const {ctx} = chart;
                                ctx.save();
                                ctx.globalCompositeOperation = 'destination-over';
                                ctx.fillStyle = options.color
                                ctx.fillRect(0, 0, chart.width, chart.height);
                                ctx.restore();
                                
                                }
                            };
                        
                            //console.log(Math.max(...feelsLikeData()) + 5)
                            const minMaxFunc = () =>{
                                if((Math.floor(Math.min(...tempData()) / 10) * 10) - 5 <= 0){
                                    return (Math.floor(Math.min(...tempData()) / 10) * 10) - 5
                    
                                }else if((Math.floor(Math.min(...tempData()) / 10) * 10) - 5 <= 11){
                                    return 0
                                } else {
                                    return (Math.floor(Math.min(...tempData()) / 10) * 10) - 5
                                }
                            }
                            //console.log(minMaxFunc())
                            
                            
                            //console.log(Math.min(...feelsLikeData()))
                            //console.log(Math.max(...feelsLikeData()) + 5)
                    
                            let minValue = (Math.floor(Math.min(...tempData()) / 10) * 10) - 5
                            let maxValue = (Math.ceil(Math.max(...tempData()) / 10) * 10) + 5
                    
                    
                            if(maxValue < 10){
                                container.style.width = `423px`
                            }else {
                                container.style.width = `427px`
                            }
                    
                            const amplitude = () =>{
                                //console.log(maxValue)
                                //console.log(minValue)
                    
                                if(maxValue - minValue == 5){
                                    return 3
                                }else if(maxValue - minValue == 10){
                                    return 4
                                }else if(maxValue - minValue == 15){
                                    return 5
                                }else if(maxValue - minValue == 20){
                                    
                                    return 7
                                }else if(maxValue - minValue == 25){
                                    
                                    return 7
                                }else if(maxValue - minValue == 30){
                                    
                                    return 100
                                }else if(maxValue - minValue == 35){
                                    
                                    return 15
                                }else if(maxValue - minValue == 40){
                                    
                                    return 10
                                }
                            }
                            //console.log(amplitude())
                    
                            //console.log(30)
                    
                            //console.log(minMaxFunc())
                            //console.log((Math.floor(Math.min(...feelsLikeData()) / 10) * 10) - 5)
                    
                            //config block
                            const config = {
                                type: "line",
                                data: chartData,  
                                options: {
                                    aspectRatio: 7/4,
                                    responsive: true,
                                    scales: {
                                        y: {
                                            min: minMaxFunc(),
                                            //beginAtZero: minMaxFunc(),
                                            max: maxValue,
                                            
                    
                                            grid: {
                                                drawTicks: false,
                                                display: true,
                                                drawOnChartArea: true,
                                                color: "#302F32"
                                            },
                                            border: {
                                                display: true,
                                                color: "#302F32"
                                            },
                                            ticks: {
                                                color: "#9D9D9E",
                                                padding: 15,
                                                align: "center",
                                                crossAlign: "center", 
                                                font: {
                                                    size: 13,
                                                    weight: 400
                                                },
                                                maxTicksLimit: amplitude(),
                                                callback: function(value, index, values){
                                                    return `${value}°`
                                                }
                                            },
                                            position: "right"
                                        },
                        
                                        x: {
                                            border: {
                                                display: false,
                                                dash: [3, 2]
                                            },
                                            grid: {
                                                display: true,
                                                drawOnChartArea: true,
                                                drawTicks: false,
                                                color: "#302F32"
                                            },
                        
                                            ticks: {
                                                color: "#9D9D9E",
                                                maxTicksLimit: 4,
                                                padding: 5,
                                                align: "start",
                                                crossAlign: "near",
                                                font: {
                                                    size: 15,
                                                    weight: 400
                                                },
                                                
                                            }
                                        },
                        
                                        
                                    },
                                    plugins: {
                                        customCanvasBackgroundColor: {
                                            color: "#202023"
                                        },
                                        legend: {
                                            display: false
                                        },
                                        autocolors: false,
                                        annotation: {
                                            
                                            annotations: {
                                                
                                                
                                                point1: {
                                                    yValue: Math.min(...tempData()),
                                                    xValue: tempData().indexOf(Math.min(...tempData())),
                    
                                                    type: "point",
                                                    backgroundColor: "transparent",
                                                    borderWidth: 4,
                                                    borderColor: "black",
                                                    radius: 5.5,
                                                },
                                                point3: {
                                                    yValue: Math.max(...tempData()),
                                                    xValue: tempData().indexOf(Math.max(...tempData())),
                    
                                                    type: "point",
                                                    backgroundColor: "transparent",
                                                    borderWidth: 4,
                                                    borderColor: "black",
                                                    radius: 5.5,
                                                    //callback: yValue => 
                                                },
                                                label1: {
                                                    type: "label",
                                                    yValue: Math.max(...tempData()) + 2.5,
                                                    xValue: tempData().indexOf(Math.max(...tempData())),
                                                    backgroundColor: "transparent",
                                                    color: "#9D9D9E",
                                                    content: "H",
                                                    font: {
                                                        size: 15
                                                    }
                                                },
                                                label2: {
                                                    type: "label",
                                                    yValue: Math.min(...tempData()) + 2.5,
                                                    xValue: tempData().indexOf(Math.min(...tempData())),
                                                    backgroundColor: "transparent",
                                                    color: "#9D9D9E",
                                                    content: "L",
                                                    font: {
                                                        size: 15
                                                    }
                                                }
                                            },
                                            clip: false
                                        } 
                                    },   
                                },
                                plugins: [plugin, gradient]
                            }
                            //console.log(Math.max(...feelsLikeData()))
                        
                            
                            const feelsLikeChart = new Chart(ctx, config)
                        }
                        conditionsChartFunction()

                        const SECOND_CANVAS = document.querySelector(".canvas-holder-second")
                        SECOND_CANVAS.innerHTML = `
                        <canvas id="canvasSecond"></canvas>
                        `
                        const rainFORCONDITIONSChartFunction = () =>{ 
                            const hoursArray = []
                    
                            for(let i = 0; i < 24; i++){
                                hoursArray.push(i)
                            }
                    
                            //the index at which the change will occur
                            let labelToChange = new Date(weatherData.current.last_updated).getHours()
                            //let labelToChange = 22
                    
                            //when will the line be dashed and stright
                            const dash = (ctx) => {
                                //console.log(ctx.p0DataIndex)
                                if(ctx.p0DataIndex < labelToChange){
                                    return [8, 10]
                                }
                            }
                    
                            const hideBorderFunc = (ctx) =>{
                                if(ctx.p0DataIndex < labelToChange){
                                    return "transparent"
                                }else {
                                    return "#36C8EB"
                                }
                            }
                    
                           
                    
                            let ctx = document.querySelector("#canvasSecond").getContext("2d")
                            
                            const precipData = () =>{
                                const rainArray = []
                                const snowArray = []
                    
                                for(let d = 0; d < weatherData.forecast.forecastday[i].hour.length; d++){
                                    rainArray.push(Math.round(weatherData.forecast.forecastday[i].hour[d].chance_of_rain / 10) * 10)
                                    snowArray.push(Math.round(weatherData.forecast.forecastday[i].hour[d].chance_of_snow / 10) * 10)
                                }
                    
                                if(Math.max(...snowArray) > Math.max(...rainArray)){
                                    return snowArray
                                }else {
                                    return rainArray
                                }
                            }
                            //console.log(weatherData.forecast.forecastday[9].hour[7])
                    
                            const gradient = window['chartjs-plugin-gradient'];
                            
                            const chartElement = document.querySelector(".canvas-holder-second")
                            const rainBlankOverlay = document.createElement("div")
                            rainBlankOverlay.classList.add("rain-blank-overlay") 
                            chartElement.appendChild(rainBlankOverlay)
                            
                    
                            const fillerColor = (ctx) => {
                                if(ctx.p0DataIndex < labelToChange){
                                    return "transparent"
                                }else {
                                    return "rgba(0, 163, 238, 0.3)"
                                }
                            }
                    
                            //data block
                            const chartData = {
                                labels: hoursArray,
                                datasets: [{
                                    label: "",
                                    data: precipData(),
                                    segment: {
                                        //borderDash: ctx => dash(ctx),
                                        //borderWidth: ctx => hideBorderFunc(ctx),
                                        //borderColor: ctx => hideBorderFunc(ctx),
                                        //backgroundColor: ctx => fillerColor(ctx)
                                    },
                                    gradient: {
                                        backgroundColor: {
                                          axis: 'y',
                                          colors: {
                                
                                            
                                          }
                                        },
                                        borderColor: {
                                            axis: "y",
                                            colors: {
                                                
                                            }
                                        }
                                    },
                                    
                                    borderColor: "#36C8EB",
                                    pointBackgroundColor: "transparent",
                                    pointBorderColor: "transparent",
                                    //borderCapStyle: 'round',
                                    clip: {
                                        left: false,
                                        right: false,
                                        top: false,
                                        bottom: false
                                    },
                                    tension: 0.1,
                                    fill: true,
                                    backgroundColor: "rgba(0, 163, 238, 0.3)"
                                    
                                }]
                            }
                    
                            
                        
                            const plugin = {
                                id: 'customCanvasBackgroundColor',
                                beforeDraw: (chart, args, options) => {
                                const {ctx} = chart;
                                ctx.save();
                                ctx.globalCompositeOperation = 'destination-over';
                                ctx.fillStyle = options.color
                                ctx.fillRect(0, 0, chart.width, chart.height);
                                ctx.restore();
                                
                                }
                            };
                        
                            
                        
                            //config block
                            const config = {
                                type: "line",
                                data: chartData,  
                                options: {
                                    aspectRatio: 7/4,
                                    responsive: true,
                                    scales: {
                                        y: {
                                        
                                            beginAtZero: true,
                                            suggestedMax: 100,
                                            grid: {
                                                drawTicks: false,
                                                display: true,
                                                drawOnChartArea: true,
                                                color: "#302F32"
                                            },
                                            border: {
                                                display: true,
                                                color: "#302F32"
                                            },
                                            ticks: {
                                                color: "#9D9D9E",
                                                //maxTicksLimit: 6,
                                                padding: 15,
                                                align: "center",
                                                crossAlign: "center", 
                                                font: {
                                                    size: 13,
                                                    weight: 400
                                                },
                                                callback: function(value){
                                                    return `${value}%`
                                                }
                                            },
                                            position: "right"
                                        },
                        
                                        x: {
                                            border: {
                                                display: false,
                                                dash: [3, 2]
                                            },
                                            grid: {
                                                display: true,
                                                drawOnChartArea: true,
                                                drawTicks: false,
                                                color: "#302F32"
                                            },
                        
                                            ticks: {
                                                color: "#9D9D9E",
                                                maxTicksLimit: 4,
                                                padding: 5,
                                                align: "start",
                                                crossAlign: "near",
                                                font: {
                                                    size: 15,
                                                    weight: 400
                                                }
                                            }
                                        },
                        
                                        
                                        
                                    },
                                    plugins: {
                                        customCanvasBackgroundColor: {
                                            color: "#202023"
                                        },
                                        legend: {
                                            display: false
                                        },
                                        annotation: {
                                            
                                            annotations: {
                                                
                                                point2: {
                                                    type: "point",
                                                    xValue: precipData().indexOf(Math.max(...precipData())),
                                                    yValue: Math.max(...precipData()),
                                                    backgroundColor: "#36C8EB",
                                                    borderWidth: 1,
                                                    borderColor: "black",
                                                    radius: 5.5,
                                                    
                                                },
                                                label1: {
                                                    type: "label",
                                                    xValue: function(){
                                                        if(precipData().indexOf(Math.max(...precipData())) == 22 || precipData().indexOf(Math.max(...precipData())) == 23){
                                                            return precipData().indexOf(Math.max(...precipData())) - 1
                                                        }else {
                                                            return precipData().indexOf(Math.max(...precipData())) + 0.8
                                                        }
                                                    },
                    
                                                    yValue: Math.max(...precipData()) + 7,
        
                                                    //yValue: precipData()[Math.max(...precipData())] + 6.5,
                                                    
                                                    color: "#36C8EB",
                                                    content: `${Math.max(...precipData())}%`,
                                                    font: {
                                                        size: 15
                                                    }
                                                }
                                                
                                            },
                                            
                                            clip: false,
                                            
                                        }
                                    },
                                    
                                },
                                plugins: [plugin, gradient]
                            }
                        
                            const rainFallSnowChart = new Chart(ctx, config)
                    
                        }
                        rainFORCONDITIONSChartFunction()
                    })
                }
            }

            createElementFORECASTOtherDays()
            eventFunctionFORECASTOtherDays()
            

            const addInfo = document.querySelector(".additional-info")
            ADVANCED_DATA_OVERLAY.style.display = 'flex'
            
            body.style.overflow = "hidden"
            const wrapper = document.querySelector(".forecast-days-wrap")

            let mouseDown = false //will change if mouse is clicked

            const dragging = (e)=>{
                if(!mouseDown){ //if the mouse isnt click this will not run
                    return
                }
                wrapper.style.cursor = `grabbing` //styling for the cursor
                e.preventDefault() //preventing default behaviour
                wrapper.scrollLeft -= e.movementX //the scroll movement
            }

            wrapper.addEventListener("mousedown", ()=>{
                mouseDown = true //when the mouse is down change the variable value
                wrapper.style.cursor = `grabbing`
            })
            wrapper.addEventListener("mousemove", dragging) //when the mouse moves run the function

            wrapper.addEventListener("mouseup", ()=>{
                mouseDown = false //mouse is no longer clicked
                wrapper.style.cursor = `grab`
            })
            wrapper.addEventListener("mouseleave", ()=>{
                mouseDown = false //mouse leaves the element
                wrapper.style.cursor = `grab`
            })
            

            const selectDropdown = document.querySelector(".select")
        const littleCaret = document.querySelector(".rotated")
        let elementActive = false 
        const menuItemspWrapper = document.querySelector(".menu-wrapper")
        const eachItemMenu = document.querySelectorAll(".each-item-menu")
        const divWithTick = document.querySelectorAll(".svg-tick")

        

        eachItemMenu[0].addEventListener("click", ()=>{
            mainFunctionForecast()
            
        })

        eachItemMenu[1].addEventListener("click", ()=>{
            mainFunction()
        
        })

        eachItemMenu[2].addEventListener("click", ()=>{
            mainFunctionFORWIND()
        
        })

        eachItemMenu[3].addEventListener("click", ()=>{
            mainFunctionRAIN()
        
        })

        eachItemMenu[4].addEventListener("click", ()=>{
            mainFunctionFEELSLIKE()
            
        })

        eachItemMenu[5].addEventListener("click", ()=>{
            mainFunctionHUMIDITY()
        
        })

        eachItemMenu[6].addEventListener("click", ()=>{
            mainFunctionVISIBILITY()
        
        })

        eachItemMenu[7].addEventListener("click", ()=>{
            mainFunctionPRESSURE()
        
        })
        
    

        const functionForDropdownActivation = (e) =>{
            if(!elementActive){
                selectDropdown.style.backgroundColor = '#515154'
                littleCaret.classList.add("true")
                menuItemspWrapper.style.display = 'block'
                menuItemspWrapper.style.height = `auto`
            }else{
                selectDropdown.style.backgroundColor = '#3A3A3D'
                littleCaret.classList.remove("true")
                menuItemspWrapper.style.display = 'none'
                menuItemspWrapper.style.height = `0`
            }

            elementActive = !elementActive
            e.stopPropagation()
        }
        
        const clickAnywhereElse = () =>{
            if(elementActive){
                selectDropdown.style.backgroundColor = '#3A3A3D'
                elementActive = false
                littleCaret.classList.remove("true")
                menuItemspWrapper.style.display = 'none'
                menuItemspWrapper.style.height = `0`
            }
        }

        selectDropdown.addEventListener("click", functionForDropdownActivation)

        document.body.addEventListener("click", clickAnywhereElse)

        })
    }

    //console.log(weatherData)
    const alertsDisplay = () =>{
        //this is the main wrapper
        const alertsWrapper = document.querySelector(".alerts-wrapper")
        alertsWrapper.innerHTML = ``

        if(weatherData.alerts.alert.length > 0){
            
            const WHLE_ELMNT = document.querySelector(".additional-info")
            WHLE_ELMNT.style.marginTop = `0px`

            const alertsHeadlineDiv = document.createElement("div")
            alertsHeadlineDiv.classList.add("alert-headline")

            const buttonsWrap = document.createElement("div")
            buttonsWrap.classList.add("buttons-wrap")
            //this will wrap the alerts
            const carouselWrap = document.createElement("div")
            carouselWrap.classList.add("carousel")

            alertsHeadlineDiv.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/></svg>
            <span>WEATHER ALERT</span>
            `
            alertsWrapper.appendChild(alertsHeadlineDiv)
            alertsWrapper.appendChild(carouselWrap)
            alertsWrapper.appendChild(buttonsWrap)

            for(let a = 0; a < weatherData.alerts.alert.length; a++){
                //console.log(weatherData.alerts.alert[a])

                

                const areasAffected = () =>{

                    if(weatherData.alerts.alert[a].areas){
                        return weatherData.alerts.alert[a].areas
                    }else {
                        return weatherData.location.region
                    }
                }

                const alertDescription = () =>{
                    if(weatherData.alerts.alert[a].desc.length > 150){
                        return `<span>${weatherData.alerts.alert[a].desc.slice("0", "110")}</span>...`
                    }else{
                        return `<span>${weatherData.alerts.alert[a].desc}</span>`
                    }
                }
                alertDescription()

                const dateEffective = new Date(weatherData.alerts.alert[a].effective)
                const dateExpires = new Date(weatherData.alerts.alert[a].expires)

                //console.log()
                //console.log()

                const eachAlert = document.createElement("div")
                eachAlert.classList.add("each-carousel-alert")

                if(a > 0 ){
                    eachAlert.classList.add("hidden")
                }

                if(weatherData.alerts.alert.length > 1){
                    const eachButton = document.createElement("div")
                    eachButton.classList.add("button")
                    buttonsWrap.appendChild(eachButton)
                }                

                eachAlert.innerHTML = `
                    <span>${weatherData.alerts.alert[a].event}</span>
                    ${alertDescription()}
                    <span>Effective from ${dateEffective.toLocaleDateString("default", {month: "long", weekday: "long", day: "2-digit", hour: "2-digit", hourCycle: "h23", minute: "2-digit", timeZoneName: "short"})} until ${dateExpires.toLocaleDateString("default", {month: "long", weekday: "long", day: "2-digit", hour: "2-digit", hourCycle: "h23", minute: "2-digit", timeZoneName: "short"})}.</span>
                    <span>Areas: ${areasAffected()}</span>
                    `

                carouselWrap.appendChild(eachAlert)
            }
        }else{
            return
        }
    }
    

    const alertsEvents = () =>{
        const allButtons = document.querySelectorAll(".button")
        const allAlerts = document.querySelectorAll(".each-carousel-alert")
        const MAIN_WRAPPER = document.querySelector(".alerts-wrapper")

        const createElementALERTS = () =>{
            //const wrapper = document.querySelector(".forecast-days-wrap")
            //const WHLE_ELMNT = document.querySelector(".advanced-data")
            const PARENT_ELEMENT = document.querySelector(".additional-info")

            
            PARENT_ELEMENT.style.marginTop = `0px`

            PARENT_ELEMENT.innerHTML = ` `
            const headline = document.createElement("div")
            headline.classList.add("headline")
            headline.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"></path></svg>
            <span>Severe Weather Alert</span>
            `
            const closeX = document.createElement("div")
            closeX.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
            ` 
            headline.appendChild(closeX)
            PARENT_ELEMENT.appendChild(headline)
    
            closeX.addEventListener("click", ()=>{
                PARENT_ELEMENT.innerHTML = ``
                ADVANCED_DATA_OVERLAY.style.display = "none"
                body.style.overflow = "auto"
            })
    
            
            const WHLE_ELMNT = document.createElement("div")
            WHLE_ELMNT.classList.add("advanced-data")
            PARENT_ELEMENT.appendChild(WHLE_ELMNT)
            WHLE_ELMNT.innerHTML = ``
            const wrapper = document.createElement("div")
            wrapper.classList.add("forecast-days-wrap")
            const index = document.createElement("div")
            index.classList.add("index")
            
            WHLE_ELMNT.appendChild(wrapper)
            
                
    
            for(let i = 0; i < weatherData.forecast.forecastday.length; i++){
                let days = new Date(weatherData.forecast.forecastday[i].date)
                let daysShort = days.toLocaleDateString("default", {"weekday": "narrow"})
                let fullDay = days.toLocaleDateString("default", {weekday: "long", day: "2-digit", month: "long", "year": "numeric"})
                let numbersDays = days.toLocaleDateString("default", {day: "2-digit"})
                let currentHour = new Date(weatherData.current.last_updated).getHours()
                let sunsetToday = Number(weatherData.forecast.forecastday[i].astro.sunset.slice("0", "2")) + 12
                
                
            
                
    
     
    
                //console.log(fullDay)
                if(i == 0){
    
                    //console.log(weatherData)
                    //console.log("Severity:", weatherData.alerts.alert[0].severity)
                    
                    const severityDeterminer = () =>{
                        if(weatherData.alerts.alert[0].severity){
                            return weatherData.alerts.alert[0].severity
                        }else{
                            return 'Minor'
                        }
                    }

                    const areasAffected = () =>{

                        if(weatherData.alerts.alert[0].areas){
                            return weatherData.alerts.alert[0].areas
                        }else {
                            return weatherData.location.region
                        }
                    }
                    //console.log()

                    const urgencyDeterminer = () =>{
                        if(weatherData.alerts.alert[0].urgency){
                            return weatherData.alerts.alert[0].urgency
                        }else{
                            return 'Minor'
                        }
                    }

                    const descORevent = () =>{
                        if(weatherData.alerts.alert[0].desc){
                            return weatherData.alerts.alert[0].desc
                        }else{
                            return weatherData.alerts.alert[0].event
                        }
                    }

                    const dateEffective = new Date(weatherData.alerts.alert[0].effective)

                    //console.log("Weather Event Onset", weatherData.alerts.alert[0].effective)
                    //console.log("Description", weatherData.alerts.alert[0].desc)
                    //console.log("Urgency", weatherData.alerts.alert[0].urgency)
                    //console.log("Affected Areas", weatherData.alerts.alert[0].areas)
                    
                    index.innerHTML = `
                    <div class="alerts-advanced-wrap">
                        <div class="each-section">
                            <span>Severity: ${severityDeterminer()}</span>
                            
                        </div>
                        <div class="each-section">
                            <span>Weather Event Onset</span>
                            <span>${dateEffective.toLocaleDateString("default", {month: "long", weekday: "long", day: "2-digit", hour: "2-digit", hourCycle: "h23", minute: "2-digit", timeZoneName: "short"})}</span>
                        </div>
                        <div class="each-section">
                            <span>Description</span>
                            <span>${descORevent()}</span>
                        </div>
                        <div class="each-section">
                            <span>Urgency</span>
                            <span>${urgencyDeterminer()}</span>
                        </div>
                        <div class="each-section">
                            <span>Affected Areas</span>
                            <span>${areasAffected()}</span>
                        </div>
                    </div>
                    `
                    WHLE_ELMNT.appendChild(index)
                    
                    
                    break
                }
                
                
            }   
            const addInfo = document.querySelector(".additional-info")
            ADVANCED_DATA_OVERLAY.style.display = 'flex'
        
            body.style.overflow = "hidden"
        }

        MAIN_WRAPPER.addEventListener("click", createElementALERTS)

        for(let btns = 0; btns < allButtons.length; btns++){
            allButtons[btns].addEventListener("click", (e) =>{

                allAlerts.forEach(element =>{
                    element.classList.add("hidden")
                })
                allAlerts[btns].classList.remove("hidden")

                

                MAIN_WRAPPER.removeEventListener("click", createElementALERTS)
                MAIN_WRAPPER.addEventListener("click", ()=>{
                    
                    //const wrapper = document.querySelector(".forecast-days-wrap")
                    //const WHLE_ELMNT = document.querySelector(".advanced-data")
                    const PARENT_ELEMENT = document.querySelector(".additional-info")
                    PARENT_ELEMENT.style.marginTop = `0px`
                    PARENT_ELEMENT.innerHTML = ` `
                    const headline = document.createElement("div")
                    headline.classList.add("headline")
                    headline.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"></path></svg>
                    <span>Severe Weather Alert</span>
                    `
                    const closeX = document.createElement("div")
                    closeX.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
                    ` 
                    headline.appendChild(closeX)
                    PARENT_ELEMENT.appendChild(headline)
            
                    closeX.addEventListener("click", ()=>{
                        PARENT_ELEMENT.innerHTML = ``
                        ADVANCED_DATA_OVERLAY.style.display = "none"
                        body.style.overflow = "auto"
                    })
            
                    
                    const WHLE_ELMNT = document.createElement("div")
                    WHLE_ELMNT.classList.add("advanced-data")
                    PARENT_ELEMENT.appendChild(WHLE_ELMNT)
                    WHLE_ELMNT.innerHTML = ``
                    const wrapper = document.createElement("div")
                    wrapper.classList.add("forecast-days-wrap")
                    const index = document.createElement("div")
                    index.classList.add("index")
                    
                    WHLE_ELMNT.appendChild(wrapper)
                    
                        
            
                    for(let i = 0; i < weatherData.forecast.forecastday.length; i++){
                        let days = new Date(weatherData.forecast.forecastday[i].date)
                        let daysShort = days.toLocaleDateString("default", {"weekday": "narrow"})
                        let fullDay = days.toLocaleDateString("default", {weekday: "long", day: "2-digit", month: "long", "year": "numeric"})
                        let numbersDays = days.toLocaleDateString("default", {day: "2-digit"})
                        let currentHour = new Date(weatherData.current.last_updated).getHours()
                        let sunsetToday = Number(weatherData.forecast.forecastday[i].astro.sunset.slice("0", "2")) + 12
                        
                        
                    
                        
            
                
            
                        //console.log(fullDay)
                        if(i == 0){
            
                            //console.log(weatherData)
                            //console.log("Severity:", weatherData.alerts.alert[0].severity)
                            
                            const severityDeterminer = () =>{
                                if(weatherData.alerts.alert[btns].severity){
                                    return weatherData.alerts.alert[btns].severity
                                }else{
                                    return 'Minor'
                                }
                            }
        
                            const areasAffected = () =>{
        
                                if(weatherData.alerts.alert[btns].areas){
                                    return weatherData.alerts.alert[btns].areas
                                }else {
                                    return weatherData.location.region
                                }
                            }
                            //console.log()
        
                            const urgencyDeterminer = () =>{
                                if(weatherData.alerts.alert[btns].urgency){
                                    return weatherData.alerts.alert[btns].urgency
                                }else{
                                    return 'Minor'
                                }
                            }
        
                            const dateEffective = new Date(weatherData.alerts.alert[btns].effective)
        
                            //console.log("Weather Event Onset", weatherData.alerts.alert[0].effective)
                            //console.log("Description", weatherData.alerts.alert[0].desc)
                            //console.log("Urgency", weatherData.alerts.alert[0].urgency)
                            //console.log("Affected Areas", weatherData.alerts.alert[0].areas)

                            const descORevent = () =>{
                                if(weatherData.alerts.alert[btns].desc){
                                    return weatherData.alerts.alert[btns].desc
                                }else{
                                    return weatherData.alerts.alert[btns].event
                                }
                            }
                            
                            index.innerHTML = `
                            <div class="alerts-advanced-wrap">
                                <div class="each-section">
                                    <span>Severity: ${severityDeterminer()}</span>
                                    
                                </div>
                                <div class="each-section">
                                    <span>Weather Event Onset</span>
                                    <span>${dateEffective.toLocaleDateString("default", {month: "long", weekday: "long", day: "2-digit", hour: "2-digit", hourCycle: "h23", minute: "2-digit", timeZoneName: "short"})}</span>
                                </div>
                                <div class="each-section">
                                    <span>Description</span>
                                    <span>${descORevent()}</span>
                                </div>
                                <div class="each-section">
                                    <span>Urgency</span>
                                    <span>${urgencyDeterminer()}</span>
                                </div>
                                <div class="each-section">
                                    <span>Affected Areas</span>
                                    <span>${areasAffected()}</span>
                                </div>
                            </div>
                            `
                            WHLE_ELMNT.appendChild(index)
                            
                            
                            break
                        }
                        
                        
                    }   
                    const addInfo = document.querySelector(".additional-info")
                    ADVANCED_DATA_OVERLAY.style.display = 'flex'
                
                    body.style.overflow = "hidden"
                    
                })

                e.stopPropagation()
                
            })
        }
    }

    const mainFunctionALERTS = () =>{
        alertsDisplay()
        alertsEvents()
        
    }
    mainFunctionALERTS()

}



//THIS FUNCTION WILL ONLY RUN ONCE, THEN IT WILL SWITCH TO THE USER INPUT FUNCTION
//CURRENT WEATHER DATA + 14 DAY FORECAST
const fetchWeaterForecast = async () =>{
    let foundError = false
    try{
        const fetching = await fetch("https://ipinfo.io/json?token=95333c242a151f")
        const userLocation = await fetching.json()
        //console.log(userLocation.city)

        const data = await fetch(`${BASE_URL}/forecast.json?key=${API_KEY}&q=${userLocation.city}&days=14&aqi=yes&alerts=yes&lang=${userLang}`)
        const convert = await data.json()

        //ALL DATA
        const currentData = convert
        updateHtml(currentData)
    }catch (err){
        console.error(err)
        foundError = true
    }finally {
        if(foundError){
            setTimeout(() => {
                const weatherHtml = document.querySelector(".weather-display")
                weatherHtml.innerHTML = `
                <div class="not-found">
                    <span>No Internet Connecetion</span>
                </div>
                `
            }, 3000);
        }
    }
 
}
fetchWeaterForecast()


//select the input
const input = document.querySelector("input")

//make it work 
input.addEventListener("keyup", (e)=>{
    
    e.preventDefault()

    if(input.value.trim() !== '' && e.key === 'Enter'){
        fetchWeaterForecastUSERINPUT(input.value)
        
    } 
})



const fetchWeaterForecastUSERINPUT = async (userInput) =>{
    let theData 
    //if api doesnt return
    try{
        theData = await fetch(`${BASE_URL}/forecast.json?key=${API_KEY}&q=${userInput}&aqi=yes&lang=${userLang}&days=14&alerts=yes`)
        const convert = await theData.json()
        
        const currentData = await convert

        updateHtml(currentData)

    } catch (err){
        console.error(err)
    }
}





//after that we can design the alerts

//LITTLE PSA
//IF SOMETHING GOES LEFT REFFER TO THIS FUNCTION
const independant = async (input) =>{
    const data = await fetch(`${BASE_URL}/forecast.json?key=${API_KEY}&q=${input}&days=14&aqi=yes&alerts=yes&lang=${userLang}`)
    const convert = await data.json()

    const weatherData = convert
    

    

}   

//independant('beijing')


