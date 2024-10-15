async function callWeather (location) {
    try {
        const measurementUnit = document.querySelector('input[type="radio"]').value;
        const TOKEN = 'C47ASJQFUY3JSJWTSHV8VT6BT';
        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${measurementUnit}&key=${TOKEN}&contentType=json`;
        const response = await fetch(url, {mode: 'cors'});
        if (!response.ok) throw new Error(`Response status: ${response.status}`);
        const data = await response.json();
        console.log(data);
        // processWeatherData(data);
    }
    catch (err) {
        console.log(err);
    }
}

const buttonElement = document.querySelector('#search');
buttonElement.addEventListener('click', (event) => {
    callWeather(document.querySelector('input').value);
    document.querySelector('form').reset();
    event.preventDefault();
})

function processWeatherData (jsonData) {
    

}