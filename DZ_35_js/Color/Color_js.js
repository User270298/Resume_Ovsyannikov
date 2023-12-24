let nam = document.querySelector('#name')
let type = document.querySelector('.typ')
let code = document.querySelector('#code')
let btn = document.querySelector('#btn')
let color = document.querySelector('.color')
let app = document.querySelector('.app')
let spisok = []
let regexText = /^[A-Z]*$/
let regexCodeRGB = /^(rgb)?\(?([01]?\d\d?|2[0-4]\d|25[0-5])(\W+)([01]?\d\d?|2[0-4]\d|25[0-5])\W+(([01]?\d\d?|2[0-4]\d|25[0-5])\)?)$/;
let regexCodeRGBA = /^(rgba(\((\s+)?(([0-9])|([1-9][0-9])|([1][0-9][0-9])|([2][0-5][0-5]))(\s+)?,(\s+)?(([0-9])|([1-9][0-9])|([1][0-9][0-9])|([2][0-5][0-5]))(\s+)?,(\s+)?(([0-9])|([1-9][0-9])|([1][0-9][0-9])|([2][0-5][0-5]))(\s+)?,(\s+)?((0|(0.[0-9][0-9]?)|1)|(1?[0-9][0-9]?\%))(\s+)?\)))|rgb(\((\s+)?(([0-9])|([1-9][0-9])|([1][0-9][0-9])|([2][0-5][0-5]))(\s+)?,(\s+)?(([0-9])|([1-9][0-9])|([1][0-9][0-9])|([2][0-5][0-5]))(\s+)?,(\s+)?(([0-9])|([1-9][0-9])|([1][0-9][0-9])|([2][0-5][0-5]))(\s+)?\))$/;
let regexCodeHEX = /^#([0-9a-f]{6}|[0-9a-f]{3})$/i;
let count = 0;
function addColors() {
  let myCookie = document.cookie;
  if (myCookie.length == 0) {
    return
  }
  myCookie = myCookie.split('; ')
  myCookie.forEach(element => {
    let temp = element.split('=');
    let temObj = JSON.parse(temp[1]);
    addColor(temObj)
    count = parseInt(temp[0])
    count++;
  });
}
btn.addEventListener('click', () => {
  let inputs = document.querySelectorAll('input')
  let obj = {
    "color": inputs[0].value,
    "type": type.value,
    "code": inputs[1].value,
  }
  document.cookie = `${count}=${JSON.stringify(obj)}`;
  count++;
  exc1.innerText = ''
  exc2.innerText = ''
  let isEmpty = true;
  if (!(regexText.test(obj['color'])) && spisok.includes(obj['color'])) {
    exc1.style.color = 'red'
    spisok = spisok.concat(objColor['color'])
    exc1.innerText = 'Введите оригинальное название большим регистром или заполните пустые ячейки'
  }
  inputs.forEach(element => {
    if (element.value.length == 0) {
      isEmpty = false;
      element.style.backgroundColor = 'red'
    }
    else if (!(obj['type'] == 'RGB') && !(regexCodeRGB.test(`rgb(${obj['code']})`))) {
      exc2.style.color = 'red'
      exc2.innerText = 'Введите оригинальное название большим регистром или заполните пустые ячейки, Введите корректные данные: rgb(0-255,0-255,0-255), rgba(0-255,0-255,0-255,0-1), hex(#rrggbb)'
    }
    else if (!(obj['type'] == 'RGBA') && !(regexCodeRGBA.test(`rgba(${obj['code']})`))) {
      exc2.style.color = 'red'
      exc2.innerText = 'Введите оригинальное название большим регистром или заполните пустые ячейки, Введите корректные данные: rgb(0-255,0-255,0-255), rgba(0-255,0-255,0-255,0-1), hex(#rrggbb)'
    }
    else if (!(obj['type'] == 'HEX') && !(regexCodeHEX.test(obj['code']))) {
      exc2.style.color = 'red'
      exc2.innerText = 'Введите оригинальное название большим регистром или заполните пустые ячейки, Введите корректные данные: rgb(0-255,0-255,0-255), rgba(0-255,0-255,0-255,0-1), hex(#rrggbb)'
    }

  })
  addColor(obj);
})
function addColor(objColor) {
  let newColor = color.cloneNode(true);
  let inside = newColor.querySelectorAll('span')
  if (regexText.test(objColor['color']) && !spisok.includes(objColor['color'])) {
    inside[0].innerText = objColor['color'];
    inside[1].innerText = objColor['type'];
    if (objColor['type'] == 'RGB' && regexCodeRGB.test(`rgb(${objColor['code']})`)) {
      inside[2].innerText = objColor['code'];
      newColor.style.backgroundColor = `rgb(${objColor['code']})`
      spisok = spisok.concat(objColor['color'])
      app.appendChild(newColor)
    }
    else if (objColor['type'] == 'RGBA' && regexCodeRGBA.test(`rgba(${objColor['code']})`)) {
      inside[2].innerText = objColor['code'];
      spisok = spisok.concat(objColor['color'])
      newColor.style.backgroundColor = `rgba(${objColor['code']})`
      app.appendChild(newColor)
    }
    else if (objColor['type'] == 'HEX' && regexCodeHEX.test(objColor['code'])) {
      inside[2].innerText = objColor['code'];
      spisok = spisok.concat(objColor['color'])
      newColor.style.backgroundColor = objColor['code']
      app.appendChild(newColor)
    }
  }
};
addColors();
