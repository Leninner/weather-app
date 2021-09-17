let nameCity = document.getElementById('name');
let btn = document.getElementById('btn');
let imagen = document.getElementById('imgPrueba');

//Librería para guardar los climas
const climas = {
  viento: './src/assets/images/viento.png',
  soleado: './src/assets/images/soleado.png',
  torrencial: './src/assets/images/torrencial.png',
  lluvia: './src/assets/images/lluvia.png',
  llovizna: './src/assets/images/llovizna.png',
  templado: './src/assets/images/llovizna.png',
  nublado: './src/assets/images/nublado.png',
};

imagen.src = climas.soleado;

const userId = 'a4e7013a3e412c322cba4d957d4cad8d';

//Función para consultar los datos de las ciudades
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
      console.log(data.name);
      console.table(data);
    })
    .catch((error) => {
      console.error(error);
    });
}

btn.addEventListener('click', () => displayInfo(nameCity.value)); //Es importante hacer una callback para funciones, ya que de caso contrario se ejecuta inmediatamente
