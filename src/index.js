let nameCity = document.getElementById('name');
let prueba = document.getElementById('prueba');
let btn = document.getElementById('btn');

const userId = 'a4e7013a3e412c322cba4d957d4cad8d';

// Función para consultar los datos de las ciudades
async function getCityInfo(cityName) {
  const URL = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${userId}`;
  const response = await fetch(URL, {
    mode: 'cors',
  });
  const cityInfo = await response.json();
  return cityInfo;
}

function displayInfo(cityName) {
  getCityInfo(cityName)
    .then((data) => {
      prueba.textContent = `${data.name} ${data.main.temp}`;
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });
}

btn.addEventListener('click', () => displayInfo(nameCity.value)); //Es importante hacer una callback para funciones, ya que de caso contrario se ejecuta inmediatamente
