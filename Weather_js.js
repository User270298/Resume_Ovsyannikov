let btn = document.querySelector('.btn');
let i1 = document.querySelectorAll('.i1');
let i2 = document.querySelectorAll('.i2');
let i3 = document.querySelectorAll('.i3');
let i4 = document.querySelectorAll('.i4');
let i5 = document.querySelectorAll('.i5');
let telo = document.querySelector('.telo');
let end = document.querySelector('.end');
let found = document.querySelector('.found');
let count=0;
function Cook(){
    let myCookie=document.cookie;
    myCookie=myCookie.split('; ');
    myCookie.forEach(element => {
        let temp=element.split('=');
        let temObj=JSON.parse(temp[1]);
        count=parseInt(temp[0])
        count++
    });
}

btn.addEventListener('click', () => {
    apikey = '630105ba62325eedae91a26753574d97';
    let city = document.querySelector('.inp').value;
    url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric&lang=ru`;
    let date = new Date;
    data.innerText = date.toISOString().split('T')[0];
    let req = new XMLHttpRequest();
    req.open('get', url);
    req.onload = () => {
        x = JSON.parse(req.response);
        console.log(x);
        if (x.cod === 200) {
            town.innerText = document.querySelector('input').value;
            cloud.innerText = x.weather[0].description;
            tem.innerText = x.main['temp'] + '°C';
            mintemp.innerText = x.main['temp_min'] + '°C';
            maxtemp.innerText = x.main['temp_max'] + '°C';
            windspeed.innerText = x.wind['speed'];
            sc.src = `https://openweathermap.org/img/wn/${x.weather[0].icon}@2x.png`;
            end.style.display = 'flex'
            telo.style.display = 'flex'
            found.style.display = 'none'
        } else {
            end.style.display = 'none'
            telo.style.display = 'none'
            found.style.display = 'block'
            return
        }
    }
    req.send();
    let reque = new XMLHttpRequest();
    urlhours = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}&units=metric&lang=ru`;
    reque.open('get', urlhours);
    reque.onload = () => {
        y = JSON.parse(reque.response);
        for (let i = 0; i < i1.length; i++) {
            day = y.list[i]
            i1[i].innerText = day['dt_txt']
            i2[i].src = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`
            i3[i].innerText = day.weather[0].description;
            i4[i].innerText = day.main['temp'] + '°C';
            i5[i].innerText = day.wind['speed'];
        }
    }
    reque.send();
})
