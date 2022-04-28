const fs = require('fs');
const axios = require('axios');

class Busquedas {
    historial = [];
    dbPath = './db/database.JSON'

    constructor() {
       this.leerDB();
    }

    get historialCapitalizado () {
        return this.historial.map (lugar =>{
            let palabras = lugar.split (' ');
            palabras = palabras.map (p => p[0].toUpperCase()+p.substring (1));

            return palabras.join(' ')
        })
    }



//api ciudad, lat,lon
    get paramsMapbox () {
        return {
            'language': 'es',
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5
        }
    }

    async ciudad (lugar = '') {
        //console.log ('Ciudad: ', lugar);
        
        try {
            const instance = axios.create ({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox
            });

            const resp = await instance.get ();
            return resp.data.features.map (lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1],
            }));

        } catch (error) {
            return [];
        }

    }



//api del clima
    get paramsWeather () {
        return {
            lang: 'es',
            appid: process.env.OPENWEATHER_KEY,
            units: 'metric'
        }
    }


    async climaLugar (lat, lon) {
        try {
            const instance = axios.create ({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {...this.paramsWeather, lat, lon}
            })

            const resp = await instance.get ();
            const {weather, main} = resp.data;  //Extraemos la informacion de los objetos que nos interesan (wather, main)
            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp,
            }

        } catch (error) {
            return [];
        }
    }


    agregarHistorial (lugar = '') {
        if (this.historial.includes (lugar.toLocaleLowerCase())){          //prevenir duplicados
            return;
        }
        this.historial = this.historial.splice (0,9);

        this.historial.unshift (lugar.toLocaleLowerCase());   //Agregamos objetos al inico del array con .unshift
        
        //Guardar en db
        this.guardarDB(); 
    }

    guardarDB() {
        const payload = {
            historial: this.historial
        };

        fs.writeFileSync (this.dbPath, JSON.stringify(payload));
    }


    leerDB() {

        if (!fs.existsSync (this.dbPath)) return;

        const info = fs.readFileSync(this.dbPath, {encoding:'utf-8'});
        const data = JSON.parse (info);

        this.historial = data.historial;

    }

}

module.exports = Busquedas;