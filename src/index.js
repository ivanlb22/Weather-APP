//Importamos el css
import './css/style.css';
//Llamadas a las APIS
const ubicacion_url  = (ciudad) => `https://api.opencagedata.com/geocode/v1/json?q=${ciudad}&key=9685758d81fb4626be7f0452345001bd`;
const tiempo_url     = (lat, lng) => `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=242beadf90212ef0cc908d0ca4ded28f`;



const latitud  = document.getElementById('input-latitud');
const longitud = document.getElementById('input-longitud');
const tiempo   = document.getElementById('tiempo');
const buttoncoordenadas = document.getElementById('boton-coordenadas');
const ciudad         = document.getElementById('input')


const conexionAPI = async( ) => {

    try {
        const resp = await fetch(  ubicacion_url(input.value) )
        if( !resp.ok ) {
            console.log( 'Ha habido un fallo en la conexión' );
        }
        const datos = await resp.json(); 
        const {lat, lng} = datos.results[0].geometry
        return {lat, lng};
    } catch ( error ) {
        throw( error )
    }
}

const conexionAPITIEMPO = async( lat, lng ) => {

    try {
        const resp = await fetch(  tiempo_url( lat, lng) )
        if( !resp.ok ) {
            console.log( 'Ha habido un fallo en la conexión' );
        }
        const datos = await resp.json();
        return datos
    } catch ( error ) {
        throw( error )
    }
}



buttoncoordenadas.addEventListener( 'click', async () => {
    const {lat, lng} = await conexionAPI();
    // console.log(await conexionAPITIEMPO(lat, lng))
    const tiempoLocalizacion = await conexionAPITIEMPO( lat, lng)
    const temperatura = tiempoLocalizacion.main.temp
    const temperaturaMaxima = tiempoLocalizacion.main.temp_max
    const temperaturaMinima = tiempoLocalizacion.main.temp_min
    tiempo.innerHTML= 'ºC: ' + temperatura + '<br>' + 'max ºC: ' + temperaturaMaxima + '<br>' + 'min ºC: ' + temperaturaMinima 
    console.log(temperaturaMaxima)
})



    
    
    
