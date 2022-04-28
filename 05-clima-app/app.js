require ('dotenv').config();
const {leerInput, inquirerMenu, pausa, listarLugares} = require ('./helpers/inquirer');
const Busquedas = require('./models/busquedas');

const main =async() => {
    const busquedas = new Busquedas();
    let opt;


    do {
        //imprimir el menu
        opt = await inquirerMenu();
        
        switch (opt) {
            case 1: 
                //Mostrar mensaje
                const termino = await leerInput('Ciudad: ');
                
                //Buscar las ciudades
                const lugares = await busquedas.ciudad(termino);
               
                //Seleccionar el lugar
                const id = await listarLugares (lugares);

                const lugarSeleccionado = lugares.find (l => l.id ===id);

                //Guardar en DB
                busquedas.agregarHistorial (lugarSeleccionado.nombre)

                if (id === '0') continue;

                //Clima
                const clima = await busquedas.climaLugar (lugarSeleccionado.lat, lugarSeleccionado.lng)
                //Mostrar resultados
                console.clear();
                console.log ('Informacion de la ciudad'.green);
                console.log ('Ciudad: ', lugarSeleccionado.nombre);
                console.log ('Lat: ' , lugarSeleccionado.lat);
                console.log ('Lng: ' , lugarSeleccionado.lng);
                console.log ('Temperatura: ',clima.temp);
                console.log ('Minima: ',clima.min);
                console.log ('Maxima: ',clima.max);
                console.log ('Descripcion del clima: ',clima.desc);
            break;

            case 2: 
                busquedas.historialCapitalizado.forEach ((lugar,i) =>{
                    const idx = `${i+1}`.blue;
                    console.log (`${idx} ${lugar}`);
                })
            break;

        }

        if (opt !==0) await pausa();
        
        
    } while (opt!==0);
}

main()