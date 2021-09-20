let nameCity = document.getElementById('name');
let btn = document.getElementById('btn');
let imagen = document.getElementById('imgPrueba');

//Variables definitivas

const userId = 'a4e7013a3e412c322cba4d957d4cad8d';
const temperatura = document.querySelector('#temp');
const city = document.querySelector('#cityName');
const country = document.querySelector('#countrySlug');
const temps = document.querySelector('#switch');

// Función para consultar los datos del clima de las ciudades
async function getCityInfo(cityName) {
  let URL = '';

  //Condicional para comprobar el tipo de llamada. Ya sea en modo seguro (https) o modo normal (http). Esto soluciona el problema de GithubPages
  if (location.protocol === 'http:') {
    URL = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${userId}`;
  } else {
    URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${userId}`;
  }

  const response = await fetch(URL, {
    mode: 'cors',
  });

  const cityInfo = await response.json();
  return cityInfo;
}

//Librería para guardar los climas
const climas = {
  viento: './src/assets/images/viento.png',
  soleado: './src/assets/images/soleado.png',
  torrencial: './src/assets/images/torrencial.png',
  lluvia: './src/assets/images/lluvia.png',
  Rain: './src/assets/images/llovizna.png',
  templado: './src/assets/images/llovizna.png',
  Clouds: './src/assets/images/nublado.png',
};

imagen.src = climas.soleado;

// Función para comprobar medida de temperatura
const comprobarMedidaTemp = (temps, data) => {
  if (!temps.classList.contains('active')) {
    return (temperatura.textContent = `${(parseFloat(data.main.temp) - 273.15).toFixed(2)} °C`);
  } else {
    return (temperatura.textContent = `${(((parseFloat(data.main.temp) - 273.15) * 9) / 5 + 32).toFixed(2)} °F`);
  }
};

async function getNextDays(lat, lon) {
  let URL;

  if (location.protocol === 'http:') {
    URL = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&daily&appid=${userId}`;
  } else {
    URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&daily&appid=${userId}`;
  }

  const response = await fetch(URL, {
    mode: 'cors',
  });

  const cityInfo = await response.json();
  console.log(cityInfo.current.weather[0].main);
  return cityInfo;
}

// Función para mostrar la información en el sitio
function displayInfo(cityName) {
  getCityInfo(cityName)
    .then((data) => {
      comprobarMedidaTemp(temps, data);
      city.textContent = data.name;
      country.textContent = data.sys.country;
      let source = data.weather[0].main;
      imagen.src = climas[source];
      console.log(data);
      return data.coord;
    })
    .then((data) => {
      console.log(data);
      getNextDays(data.lat, data.lon).then((data) => {
        console.log(data);
      });
    })
    .catch((error) => {
      console.error(error);
    });
}

// Método para cambiar entre unidades de temperatura
temps.addEventListener('click', () => {
  temps.classList.toggle('active');
  if (temps.classList.contains('active')) {
    displayInfo(city.textContent);
  } else {
    displayInfo(city.textContent);
  }
});

// Métodos para empezar la búsqueda de los datos de una nueva ciudad
btn.addEventListener('click', () => {
  displayInfo(nameCity.value);
  nameCity.value = '';
}); //Es importante hacer una callback para funciones, ya que de caso contrario se ejecuta inmediatamente
document.addEventListener('keydown', (e) => {
  if (nameCity.value && e.key === 'Enter') {
    displayInfo(nameCity.value);
    nameCity.value = '';
  }
});
