console.log('Client side javascript file is loaded!');


const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');
const weatherElement = document.querySelector('#weather');
const errorElement = document.querySelector('#error');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = searchElement.value
    console.log(location);

    fetch('http://127.0.0.1:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error);
                errorElement.textContent = data.error;
                weatherElement.textContent = '';
            } else {
                errorElement.textContent = '';
                weatherElement.textContent = data.location + ' ' + data.forecast;
                console.log(data.location);
                console.log(data.forecast);
            }
        });
    })
});