async function callWeather (location) {
    try {
        const measurementUnit = document.querySelector('input[type="radio"]:checked').value;
        const TOKEN = 'C47ASJQFUY3JSJWTSHV8VT6BT';
        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${measurementUnit}&key=${TOKEN}&contentType=json`;
        const response = await fetch(url, {mode: 'cors'});
        if (!response.ok) throw new Error(`Response status: ${response.status}`);
        const data = await response.json();
        console.log(data);
        processWeatherData(data, measurementUnit);
    }
    catch (err) {
        console.log(err);
    }
}

const buttonElement = document.querySelector('#search');
buttonElement.addEventListener('click', (event) => {
    callWeather(document.querySelector('input').value);
    document.querySelector('form > .searchContainer > input').value = '';
    event.preventDefault();
})

function processWeatherData (jsonData, tempUnit) {
    const location = jsonData.resolvedAddress;
    const temp = jsonData.currentConditions.temp;
    const temperatureUnit = (tempUnit == 'us')? '°F' : '°C';
    console.log(`${location}: ${temp}${temperatureUnit}`);
    displayWeather(jsonData.resolvedAddress, jsonData.currentConditions.conditions, jsonData.currentConditions.temp);
    fetchGIF(jsonData.currentConditions.conditions);
}

async function fetchGIF (backgroundImage) {
    const gifURL = 'https://api.giphy.com/v1/gifs/translate?api_key=QFqig70RPPDEwGSYDSr9JG56tGomqwC3&s=' + backgroundImage;
    const bodyElement = document.querySelector('body');
    const response =  await fetch(gifURL, {mode: "cors"});
    const dataJSON = await response.json();
    console.log(dataJSON);
    console.log(dataJSON.data.images.original.url);
    try {
        bodyElement.setAttribute('style', `background-image: url(${dataJSON.data.images.original.url})`)
    }
    catch (err) {
        console.log(err.message);
    }
}

function displayWeather (...args) {
    const dialogElement = document.querySelector('.displayResult');
    while (dialogElement.firstElementChild) {
        dialogElement.removeChild(dialogElement.lastElementChild);
    }
    for (let i in args) {
        const divElement = createDiv();
        divElement.textContent = args[i];
        dialogElement.append(divElement);
    }
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.addEventListener ('click', () => {
        dialogElement.close();
    })
    dialogElement.appendChild(closeButton);
    dialogElement.showModal();
}

function createDiv () {
    return document.createElement('div');
}