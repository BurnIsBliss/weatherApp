async function callWeather (location) {
    try {
        console.log(location);
        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=`;
        const TOKEN = 'C47ASJQFUY3JSJWTSHV8VT6BT';
        const response = await fetch(url + TOKEN, {mode: 'cors'});
        if (!response.ok) throw new Error(`Response status: ${response.status}`);
        const data = await response.json();
        console.log(data);
    }
    catch (err) {
        console.log(err);
    }
}

const buttonElement = document.querySelector('button');
buttonElement.addEventListener('click', (event) => {
    callWeather(document.querySelector('input').value);
    document.querySelector('form').reset();
    event.preventDefault();
})


// callWeather('Chennai');
// callWeather('Kashmir');
// callWeather('koiulnmbubyv');